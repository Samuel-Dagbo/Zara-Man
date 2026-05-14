'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import StatsCard from '@/components/dashboard/StatsCard';
import EmptyState from '@/components/ui/EmptyState';
import { formatPrice } from '@/lib/utils';
import { HiOutlineShoppingBag, HiOutlineSearch, HiOutlinePrinter, HiOutlineX } from 'react-icons/hi';

export default function SalesPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [receipt, setReceipt] = useState(null);

  useEffect(() => { fetchSales(); }, [page, paymentFilter, dateFrom, dateTo]);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '15');
      if (paymentFilter) params.append('paymentMethod', paymentFilter);
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);
      if (search) params.append('search', search);

      const res = await fetch(`/api/pos?${params}`);
      const data = await res.json();
      setOrders(data.orders || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch (err) {
      toast.error('Failed to load sales');
    } finally {
      setLoading(false);
    }
  };

  const handlePrintReceipt = (order) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Receipt #${order._id?.slice(-8).toUpperCase()}</title>
      <style>
        body { font-family: monospace; font-size: 12px; padding: 20px; max-width: 300px; margin: 0 auto; }
        h2 { text-align: center; margin-bottom: 5px; }
        .line { border-top: 1px dashed #000; margin: 10px 0; }
        .item { display: flex; justify-content: space-between; margin: 4px 0; }
        .total { font-weight: bold; font-size: 14px; }
        .center { text-align: center; }
      </style></head><body>
        <h2>OSEBO 247</h2>
        <p class="center" style="font-size:10px">Premium Boutique</p>
        <p class="center" style="font-size:10px">Receipt #${order._id?.slice(-8).toUpperCase()}</p>
        <div class="line"></div>
        <p style="font-size:10px">Customer: ${order.customerName || 'Walk-in Customer'}</p>
        <div class="line"></div>
        ${order.items?.map(item => `<div class="item"><span>${item.name} x${item.quantity}</span><span>${formatPrice(item.price * item.quantity)}</span></div>`).join('')}
        <div class="line"></div>
        <div class="item total"><span>TOTAL</span><span>${formatPrice(order.totalAmount)}</span></div>
        <div class="line"></div>
        <p style="font-size:10px">Payment: ${order.paymentMethod}</p>
        <p style="font-size:10px">${new Date(order.createdAt).toLocaleString()}</p>
        <div class="line"></div>
        <p class="center" style="font-size:10px">Thank you for your purchase!</p>
      </body></html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  const paymentMethods = [
    { id: '', label: 'All' },
    { id: 'cash', label: 'Cash' },
    { id: 'card', label: 'Card' },
    { id: 'mobile_money', label: 'Mobile Money' },
  ];

  const totalRevenue = orders.reduce((s, o) => s + o.totalAmount, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-gold-500">Sales History</h1>
        <p className="text-sm text-gold-500/50 mt-1">View all point-of-sale transactions.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Sales" value={orders.length} icon={HiOutlineShoppingBag} color="gold" />
        <StatsCard title="Revenue" value={formatPrice(totalRevenue)} icon={HiOutlineShoppingBag} color="gold" />
      </div>

      <div className="flex flex-wrap gap-3 mb-6 items-end">
        <div className="relative flex-1 min-w-[200px]">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchSales()} placeholder="Search by customer or product..." className="input-field pl-10 text-sm" />
        </div>
        <div className="flex gap-2">
          {paymentMethods.map(pm => (
            <button key={pm.id} onClick={() => setPaymentFilter(pm.id)} className={`px-3 py-2 text-[10px] tracking-wider uppercase font-bold transition-all ${paymentFilter === pm.id ? 'bg-gold-500 text-dark-950' : 'border border-gold-500/20 text-gold-500/60 hover:border-gold-500/50'}`}>
              {pm.label}
            </button>
          ))}
        </div>
        <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="input-field text-xs max-w-[150px]" />
        <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="input-field text-xs max-w-[150px]" />
      </div>

      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-dark-900/60 border border-gold-500/10 p-5 animate-pulse">
              <div className="h-5 bg-gold-500/10 w-48 mb-3" />
              <div className="h-4 bg-gold-500/10 w-64" />
            </div>
          ))
        ) : orders.length === 0 ? (
          <EmptyState icon={HiOutlineShoppingBag} title="No sales yet" description="POS transactions will appear here." />
        ) : (
          orders.map((order) => (
            <motion.div key={order._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[11px] text-gold-500/40 font-mono">#{order._id?.slice(-8).toUpperCase()}</span>
                    <span className="badge badge-green">{order.paymentStatus}</span>
                    <span className="text-[10px] text-gold-500/40">{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-sm font-bold text-gold-400 mt-1">{order.customerName || 'Walk-in Customer'}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                    {order.items?.map((item, i) => (
                      <span key={i} className="text-xs text-gold-500/50">
                        {item.name} <span className="text-gold-500/30">x{item.quantity}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-display text-lg font-bold text-gold-500">{formatPrice(order.totalAmount)}</p>
                  <p className="text-[10px] text-gold-500/40 uppercase tracking-wider mt-1">{order.paymentMethod}</p>
                </div>
              </div>
              <div className="flex justify-end mt-3 pt-3 border-t border-gold-500/10">
                <button onClick={() => handlePrintReceipt(order)} className="text-[10px] tracking-wider uppercase font-bold text-gold-500/60 hover:text-gold-400 flex items-center gap-1.5 transition-colors">
                  <HiOutlinePrinter className="w-3.5 h-3.5" />
                  Print Receipt
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 text-[10px] tracking-wider uppercase font-bold border border-gold-500/20 text-gold-500/60 hover:border-gold-500/50 disabled:opacity-30 transition-all">Previous</button>
          <span className="text-xs text-gold-500/40">Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 text-[10px] tracking-wider uppercase font-bold border border-gold-500/20 text-gold-500/60 hover:border-gold-500/50 disabled:opacity-30 transition-all">Next</button>
        </div>
      )}
    </div>
  );
}
