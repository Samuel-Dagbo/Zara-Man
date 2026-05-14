'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiOutlineShoppingBag, HiOutlineCheck, HiOutlineArrowLeft } from 'react-icons/hi';
import Link from 'next/link';

export default function CheckoutPage() {
  const { data: session } = useSession();
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    notes: '',
  });

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cart.length) return;

    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          shippingAddress: form,
          paymentMethod: 'paypal',
          notes: form.notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Checkout failed');
        setLoading(false);
        return;
      }

      setOrderNumber(data._id?.slice(-8).toUpperCase() || '');
      setOrderComplete(true);
      clearCart();
      toast.success('Order placed successfully!');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  if (orderComplete) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen bg-dark-950">
          <div className="max-w-lg mx-auto px-4 py-24 text-center">
            <div className="w-20 h-20 border border-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiOutlineCheck className="w-10 h-10 text-gold-500" />
            </div>
            <h1 className="font-display text-4xl font-bold text-gold-500 mb-4">Order Placed!</h1>
            <p className="text-gold-500/50 mb-2">Order #{orderNumber}</p>
            <p className="text-gold-500/40 text-sm mb-8">We&apos;ll send you a confirmation once your order ships.</p>
            <div className="flex gap-4 justify-center">
              <Link href="/dashboard/user/orders" className="btn-primary">
                View Orders
              </Link>
              <Link href="/shop" className="btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-dark-950">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <Link href="/shop" className="inline-flex items-center gap-2 text-gold-500/60 hover:text-gold-400 text-xs tracking-wider uppercase font-bold mb-8 transition-colors">
            <HiOutlineArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          <h1 className="font-display text-4xl font-bold text-gold-500 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="premium-card p-6">
                  <h2 className="font-display text-xl font-bold text-gold-400 mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gold-500/60 uppercase tracking-wider mb-2">Full Name</label>
                      <input type="text" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="input-field" placeholder="John Doe" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gold-500/60 uppercase tracking-wider mb-2">Street Address</label>
                      <input type="text" required value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} className="input-field" placeholder="123 Main St" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gold-500/60 uppercase tracking-wider mb-2">City</label>
                      <input type="text" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input-field" placeholder="New York" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gold-500/60 uppercase tracking-wider mb-2">State</label>
                      <input type="text" required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="input-field" placeholder="NY" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gold-500/60 uppercase tracking-wider mb-2">ZIP Code</label>
                      <input type="text" required value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className="input-field" placeholder="10001" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gold-500/60 uppercase tracking-wider mb-2">Phone</label>
                      <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gold-500/60 uppercase tracking-wider mb-2">Order Notes (optional)</label>
                      <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input-field resize-none" placeholder="Special instructions..." />
                    </div>
                  </div>
                </div>

                <div className="premium-card p-6">
                  <h2 className="font-display text-xl font-bold text-gold-400 mb-6">Payment Method</h2>
                  <div className="flex items-center gap-4 p-4 border border-gold-500/20 bg-gold-500/5">
                    <div className="w-10 h-7 bg-blue-500 rounded flex items-center justify-center text-white text-[8px] font-bold">PayPal</div>
                    <span className="text-gold-400 text-sm font-semibold">PayPal / Credit Card</span>
                    <span className="text-gold-500/40 text-[10px] ml-auto">Recommended</span>
                  </div>
                  <p className="text-gold-500/30 text-[10px] mt-3 tracking-wider">
                    You&apos;ll be redirected to PayPal to complete your purchase securely.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || !cart.length}
                  className="w-full bg-gold-500 text-dark-950 py-4 tracking-[0.2em] uppercase text-xs font-bold 
                             hover:bg-gold-400 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-gold-500/20"
                >
                  {loading ? 'Processing...' : `Place Order - ${formatPrice(cartTotal)}`}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className="premium-card p-6 sticky top-28">
                <h2 className="font-display text-xl font-bold text-gold-400 mb-6">Order Summary</h2>
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <HiOutlineShoppingBag className="w-12 h-12 text-gold-500/20 mx-auto mb-4" />
                    <p className="text-gold-500/50 text-sm">Your cart is empty</p>
                    <Link href="/shop" className="text-gold-500 text-xs font-bold mt-2 inline-block hover:text-gold-400">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.cartItemId} className="flex gap-3 pb-4 border-b border-gold-500/10">
                          <div className="w-16 h-20 bg-dark-800/80 flex-shrink-0 overflow-hidden border border-gold-500/10">
                            {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gold-400 truncate">{item.name}</p>
                            {item.size && <p className="text-[10px] text-gold-500/40">Size: {item.size}</p>}
                            {item.color && <p className="text-[10px] text-gold-500/40">Color: {item.color}</p>}
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-gold-500/50">Qty: {item.quantity}</span>
                              <span className="text-sm font-bold text-gold-500">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 border-t border-gold-500/10 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gold-500/50">Subtotal ({cartCount} items)</span>
                        <span className="text-gold-400 font-semibold">{formatPrice(cartTotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gold-500/50">Shipping</span>
                        <span className="text-gold-400 font-semibold">Calculated at next step</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t border-gold-500/10 pt-3">
                        <span className="text-gold-500">Total</span>
                        <span className="text-gold-500">{formatPrice(cartTotal)}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
