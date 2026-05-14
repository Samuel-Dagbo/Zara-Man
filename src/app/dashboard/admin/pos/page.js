'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { formatPrice } from '@/lib/utils';
import { HiOutlineSearch, HiOutlineX, HiOutlinePlus, HiOutlineMinus, HiOutlinePrinter, HiOutlineShoppingBag, HiOutlineCash, HiOutlineCreditCard } from 'react-icons/hi';

export default function POSPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const receiptRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    fetchProducts();
    searchRef.current?.focus();
  }, []);

  const fetchProducts = async (q = '') => {
    try {
      const params = new URLSearchParams();
      params.append('all', 'true');
      if (q) params.append('search', q);
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data.products || data || []);
    } catch (err) {
      toast.error('Failed to load products');
    }
  };

  useEffect(() => {
    if (search) {
      const timer = setTimeout(() => fetchProducts(search), 300);
      return () => clearTimeout(timer);
    } else {
      fetchProducts();
    }
  }, [search]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || '',
        quantity: 1,
        size: product.sizes?.[0] || '',
        color: product.colors?.[0] || '',
      }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item =>
      item._id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    if (!cart.length) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/pos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          customerName: customerName || 'Walk-in Customer',
          paymentMethod,
          paymentStatus: 'paid',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      setLastOrder(data);
      setShowReceipt(true);
      setCart([]);
      setCustomerName('');
      toast.success('Sale completed!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const receipt = document.getElementById('receipt-content')?.innerHTML || '';
    printWindow.document.write(`
      <html><head><title>Receipt</title>
      <style>
        body { font-family: monospace; font-size: 12px; padding: 20px; max-width: 300px; margin: 0 auto; }
        h2 { text-align: center; margin-bottom: 5px; }
        .line { border-top: 1px dashed #000; margin: 10px 0; }
        .item { display: flex; justify-content: space-between; margin: 4px 0; }
        .total { font-weight: bold; font-size: 14px; }
        .center { text-align: center; }
        @media print { body { margin: 0; padding: 10px; } }
      </style></head><body>${receipt}</body></html>
    `);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  const paymentMethods = [
    { id: 'cash', label: 'Cash', icon: HiOutlineCash },
    { id: 'card', label: 'Card', icon: HiOutlineCreditCard },
    { id: 'mobile_money', label: 'Mobile Money', icon: HiOutlineShoppingBag },
  ];

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row gap-0">
      {showReceipt && lastOrder ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-sm w-full text-center">
            <div id="receipt-content" ref={receiptRef} className="bg-white text-black p-6 rounded-lg font-mono text-sm">
              <h2 className="text-lg font-bold text-center">OSEBO 247</h2>
              <p className="text-center text-[10px] mb-1">Premium Boutique</p>
              <p className="text-center text-[10px] mb-3">Receipt #{lastOrder._id?.slice(-8).toUpperCase()}</p>
              <div className="line" />
              <p className="text-[10px] mb-2">Customer: {lastOrder.customerName || 'Walk-in Customer'}</p>
              <div className="line" />
              {lastOrder.items?.map((item, i) => (
                <div key={i} className="item text-[11px]">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="line" />
              <div className="item total text-sm">
                <span>TOTAL</span>
                <span>{formatPrice(lastOrder.totalAmount)}</span>
              </div>
              <div className="line" />
              <p className="text-[10px]">Payment: {lastOrder.paymentMethod}</p>
              <p className="text-[10px]">{new Date(lastOrder.createdAt).toLocaleString()}</p>
              <div className="line" />
              <p className="text-[10px] text-center mt-2">Thank you for your purchase!</p>
            </div>
            <div className="flex gap-3 mt-6 justify-center">
              <button onClick={handlePrint} className="btn-primary flex items-center gap-2 text-xs">
                <HiOutlinePrinter className="w-4 h-4" />
                Print Receipt
              </button>
              <button onClick={() => { setShowReceipt(false); setLastOrder(null); }} className="btn-secondary text-xs">
                New Sale
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 flex flex-col overflow-hidden border-r border-gold-500/10">
            <div className="p-4 border-b border-gold-500/10">
              <div className="relative">
                <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="input-field pl-11 text-sm w-full"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-500/30 hover:text-gold-500">
                    <HiOutlineX className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {products.map((product) => (
                  <button
                    key={product._id}
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className="bg-dark-800/60 border border-gold-500/10 hover:border-gold-500/30 p-3 text-left transition-all disabled:opacity-40 group"
                  >
                    <div className="aspect-square bg-dark-900/80 overflow-hidden mb-2">
                      <img src={product.images?.[0] || ''} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-[11px] font-bold text-gold-400 truncate">{product.name}</p>
                    <p className="text-xs font-bold text-gold-500 mt-0.5">{formatPrice(product.price)}</p>
                    {!product.inStock && <p className="text-[9px] text-red-400 mt-0.5">Out of stock</p>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-96 flex flex-col bg-dark-900/30">
            <div className="p-4 border-b border-gold-500/10">
              <h2 className="font-display text-lg font-bold text-gold-500">Current Sale</h2>
              <p className="text-xs text-gold-500/50">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
            </div>

            <div className="p-4 border-b border-gold-500/10">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer name..."
                className="input-field text-sm w-full"
              />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <HiOutlineShoppingBag className="w-10 h-10 text-gold-500/20 mx-auto mb-3" />
                  <p className="text-xs text-gold-500/40">Select products to start a sale</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item._id} className="flex items-center gap-3 bg-dark-800/40 p-3 border border-gold-500/10 group">
                    <div className="w-12 h-14 bg-dark-900/80 flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gold-400 truncate">{item.name}</p>
                      <p className="text-[10px] text-gold-500/50">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => updateQty(item._id, -1)} className="w-5 h-5 flex items-center justify-center border border-gold-500/20 text-gold-500/60 hover:bg-gold-500/10"><HiOutlineMinus className="w-3 h-3" /></button>
                        <span className="text-xs font-bold text-gold-400 w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQty(item._id, 1)} className="w-5 h-5 flex items-center justify-center border border-gold-500/20 text-gold-500/60 hover:bg-gold-500/10"><HiOutlinePlus className="w-3 h-3" /></button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-gold-500">{formatPrice(item.price * item.quantity)}</p>
                      <button onClick={() => removeFromCart(item._id)} className="text-[9px] text-gold-500/30 hover:text-red-400 transition-colors">Remove</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-gold-500/10 space-y-4">
              <div className="flex gap-2">
                {paymentMethods.map(pm => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`flex-1 py-2 text-[10px] tracking-wider uppercase font-bold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === pm.id
                        ? 'bg-gold-500 text-dark-950'
                        : 'border border-gold-500/20 text-gold-500/60 hover:border-gold-500/50'
                    }`}
                  >
                    <pm.icon className="w-3.5 h-3.5" />
                    {pm.label}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gold-500/50">Total</span>
                <span className="font-display text-2xl font-bold text-gold-500">{formatPrice(cartTotal)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={!cart.length || submitting}
                className="w-full bg-gold-500 text-dark-950 py-4 tracking-[0.15em] uppercase text-xs font-bold hover:bg-gold-400 transition-all disabled:opacity-40 shadow-lg shadow-gold-500/20"
              >
                {submitting ? 'Processing...' : `Complete Sale ${cart.length ? `- ${formatPrice(cartTotal)}` : ''}`}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
