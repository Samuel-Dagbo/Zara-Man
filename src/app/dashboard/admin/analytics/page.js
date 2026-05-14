'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '@/components/dashboard/StatsCard';
import { formatPrice } from '@/lib/utils';
import { HiOutlineTrendingUp, HiOutlineShoppingBag, HiOutlineClock, HiOutlineChartBar } from 'react-icons/hi';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');

  useEffect(() => { fetchAnalytics(); }, [period]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics?period=${period}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="mb-8 animate-pulse"><div className="h-8 bg-gold-500/10 w-48 mb-2" /><div className="h-4 bg-gold-500/10 w-64" /></div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 bg-gold-500/10" />)}
        </div>
        <div className="h-64 bg-gold-500/10" />
      </div>
    );
  }

  if (!data) return null;

  const maxDailyRevenue = Math.max(...data.dailyRevenue.map(d => d.total), 1);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-gold-500">Analytics</h1>
          <p className="text-sm text-gold-500/50 mt-1">Sales performance and insights.</p>
        </div>
        <div className="flex gap-2">
          {[
            { id: 'today', label: 'Today' },
            { id: 'week', label: '7 Days' },
            { id: 'month', label: '30 Days' },
            { id: 'year', label: 'Year' },
          ].map(p => (
            <button key={p.id} onClick={() => setPeriod(p.id)} className={`px-4 py-2 text-[10px] tracking-wider uppercase font-bold transition-all ${period === p.id ? 'bg-gold-500 text-dark-950' : 'border border-gold-500/20 text-gold-500/60 hover:border-gold-500/50'}`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Revenue" value={formatPrice(data.revenue)} icon={HiOutlineTrendingUp} color="gold" />
        <StatsCard title="Orders" value={data.orderCount} icon={HiOutlineShoppingBag} color="gold" />
        <StatsCard title="Total Orders" value={data.totalOrders} icon={HiOutlineChartBar} color="blue" />
        <StatsCard title="Pending" value={data.pendingOrders} icon={HiOutlineClock} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-bold text-gold-400 mb-6">Daily Revenue</h2>
          {data.dailyRevenue.length === 0 ? (
            <p className="text-gold-500/40 text-sm text-center py-8">No data for this period</p>
          ) : (
            <div className="space-y-2">
              {data.dailyRevenue.map((day) => (
                <div key={day._id} className="flex items-center gap-4">
                  <span className="text-[10px] text-gold-500/40 w-20 flex-shrink-0">{new Date(day._id).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                  <div className="flex-1 h-6 bg-dark-800/60 rounded-sm overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gold-500/60 to-gold-500 rounded-sm transition-all" style={{ width: `${(day.total / maxDailyRevenue) * 100}%` }} />
                  </div>
                  <div className="flex gap-4 flex-shrink-0">
                    <span className="text-xs font-bold text-gold-400 w-20 text-right">{formatPrice(day.total)}</span>
                    <span className="text-[10px] text-gold-500/40 w-8 text-right">{day.count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="premium-card p-6">
          <h2 className="font-display text-lg font-bold text-gold-400 mb-6">Payment Methods</h2>
          {data.paymentMethods.length === 0 ? (
            <p className="text-gold-500/40 text-sm text-center py-8">No data</p>
          ) : (
            <div className="space-y-4">
              {data.paymentMethods.map((pm) => {
                const pct = data.revenue > 0 ? ((pm.total / data.revenue) * 100).toFixed(0) : 0;
                return (
                  <div key={pm._id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gold-400 font-bold capitalize">{pm._id.replace('_', ' ')}</span>
                      <span className="text-gold-500/50">{pct}%</span>
                    </div>
                    <div className="h-2 bg-dark-800/60 rounded-full overflow-hidden">
                      <div className="h-full bg-gold-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-[10px] text-gold-500/40 mt-0.5">{formatPrice(pm.total)} ({pm.count} sales)</p>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="premium-card p-6">
        <h2 className="font-display text-lg font-bold text-gold-400 mb-6">Top Selling Products</h2>
        {data.topProducts.length === 0 ? (
          <p className="text-gold-500/40 text-sm text-center py-8">No data for this period</p>
        ) : (
          <div className="space-y-3">
            {data.topProducts.map((product, i) => {
              const maxQty = data.topProducts[0]?.quantity || 1;
              return (
                <div key={product._id} className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-gold-500/30 w-5">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-gold-400 truncate">{product._id}</span>
                      <span className="text-xs font-bold text-gold-500 ml-4">{formatPrice(product.total)}</span>
                    </div>
                    <div className="h-2 bg-dark-800/60 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gold-500/40 to-gold-500 rounded-full transition-all" style={{ width: `${(product.quantity / maxQty) * 100}%` }} />
                    </div>
                    <p className="text-[10px] text-gold-500/40 mt-0.5">{product.quantity} units sold</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
