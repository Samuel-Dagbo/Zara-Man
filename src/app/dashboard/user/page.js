'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '@/components/dashboard/StatsCard';
import { StatsCardSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineClock, HiOutlineUser, HiOutlineExclamationCircle, HiOutlineArrowRight, HiOutlineStar } from 'react-icons/hi';
import { formatPrice } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function UserDashboard() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      const ordersArr = Array.isArray(data) ? data : [];
      setOrders(ordersArr);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'confirmed');
  const deliveredOrders = orders.filter(o => o.status === 'delivered');

  const getStatusBadge = (status) => {
    const map = {
      delivered: 'badge-green',
      cancelled: 'badge-red',
      shipped: 'badge-purple',
      confirmed: 'badge-blue',
      processing: 'badge-indigo',
      pending: 'badge-yellow',
    };
    return map[status] || 'bg-dark-700 text-gold-500/40';
  };

  if (error) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gold-500">Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}</h1>
          <p className="text-gold-500/50 mt-1 text-sm">Here is your account overview.</p>
        </div>
        <EmptyState icon={HiOutlineExclamationCircle} title="Failed to load data" description={error} actionLabel="Retry" onAction={() => { setLoading(true); setError(''); fetchOrders(); }} />
      </div>
    );
  }

  return (
    <div>
      {/* Welcome Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-6 premium-card bg-gradient-to-br from-gold-500/5 to-transparent border-gold-500/20">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full border-2 border-gold-500/30 flex items-center justify-center">
            <HiOutlineUser className="w-7 h-7 text-gold-500" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-gold-500 leading-tight">
              Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}
            </h1>
            <p className="text-sm text-gold-500/50 mt-1">Here is your account overview.</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <StatsCardSkeleton key={i} />)
        ) : (
          <>
            <StatsCard title="Total Orders" value={orders.length} icon={HiOutlineShoppingBag} color="gold" />
            <StatsCard title="Total Spent" value={formatPrice(totalSpent)} icon={HiOutlineHeart} color="blue" />
            <StatsCard title="Pending" value={pendingOrders.length} icon={HiOutlineClock} color="purple" />
            <StatsCard title="Delivered" value={deliveredOrders.length} icon={HiOutlineStar} color="green" />
          </>
        )}
      </div>

      {/* Recent Orders */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card overflow-hidden">
        <div className="px-6 py-5 border-b border-gold-500/10 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-gold-500">Recent Orders</h2>
            <p className="text-xs text-gold-500/40 mt-0.5">Your latest purchases</p>
          </div>
          <Link href="/dashboard/user/orders" className="text-[10px] tracking-wider uppercase text-gold-500 hover:text-gold-400 font-bold flex items-center gap-1 transition-colors">
            View All <HiOutlineArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 space-y-4 animate-pulse">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-6">
                  <div className="h-5 bg-gold-500/10 w-28 rounded" />
                  <div className="h-5 bg-gold-500/10 w-20 rounded" />
                  <div className="h-5 bg-gold-500/10 w-24 rounded" />
                  <div className="h-5 bg-gold-500/10 w-20 rounded" />
                  <div className="h-5 bg-gold-500/10 w-28 rounded" />
                </div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <EmptyState icon={HiOutlineShoppingBag} title="No orders yet" description="Place your first order to see it here." actionHref="/shop" actionLabel="Start Shopping" />
          ) : (
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id}>
                    <td><span className="text-sm font-bold text-gold-400">#{order._id.slice(-6).toUpperCase()}</span></td>
                    <td className="text-sm text-gold-500/50">{order.items?.length || 0} item(s)</td>
                    <td className="text-sm font-bold text-gold-500">{formatPrice(order.totalAmount)}</td>
                    <td><span className={`badge ${getStatusBadge(order.status)}`}>{order.status}</span></td>
                    <td className="text-sm text-gold-500/50">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Link href="/shop" className="premium-card p-5 flex flex-col items-center gap-3 hover:border-gold-500/30 transition-all group">
          <div className="w-12 h-12 border border-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/10 transition-colors">
            <HiOutlineShoppingBag className="w-6 h-6 text-gold-500" />
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-gold-400">Continue Shopping</p>
            <p className="text-[9px] text-gold-500/40 mt-0.5">Browse our collection</p>
          </div>
        </Link>
        <Link href="/dashboard/user/orders" className="premium-card p-5 flex flex-col items-center gap-3 hover:border-gold-500/30 transition-all group">
          <div className="w-12 h-12 border border-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/10 transition-colors">
            <HiOutlineClock className="w-6 h-6 text-gold-500" />
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-gold-400">My Orders</p>
            <p className="text-[9px] text-gold-500/40 mt-0.5">Track all orders</p>
          </div>
        </Link>
        <Link href="/dashboard/user/profile" className="premium-card p-5 flex flex-col items-center gap-3 hover:border-gold-500/30 transition-all group">
          <div className="w-12 h-12 border border-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/10 transition-colors">
            <HiOutlineUser className="w-6 h-6 text-gold-500" />
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-gold-400">My Profile</p>
            <p className="text-[9px] text-gold-500/40 mt-0.5">Update details</p>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
