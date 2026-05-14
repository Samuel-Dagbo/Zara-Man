'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import StatsCard from '@/components/dashboard/StatsCard';
import { StatsCardSkeleton, TableSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import {
  HiOutlineCollection, HiOutlineShoppingBag, HiOutlineUser,
  HiOutlineExclamationCircle, HiOutlineChartBar, HiOutlineTrendingUp,
  HiOutlineArrowRight, HiOutlineCash, HiOutlineClock, HiOutlineChartSquareBar
} from 'react-icons/hi';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0, lowStock: 0, outOfStock: 0 });
  const [posStats, setPosStats] = useState({ todaySales: 0, todayRevenue: 0, totalPosSales: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentPosSales, setRecentPosSales] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [ordersRes, productsRes, usersRes, posRes, analyticsRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/products?all=true'),
        fetch('/api/auth/users'),
        fetch('/api/pos?limit=5'),
        fetch('/api/analytics?period=today'),
      ]);

      if (!ordersRes.ok) throw new Error('Failed to fetch orders');
      if (!productsRes.ok) throw new Error('Failed to fetch products');
      if (!usersRes.ok) throw new Error('Failed to fetch users');

      const ordersData = await ordersRes.json();
      const productsData = await productsRes.json();
      const usersData = await usersRes.json();
      const posData = posRes.ok ? await posRes.json() : null;
      const analytics = analyticsRes.ok ? await analyticsRes.json() : null;

      const orders = Array.isArray(ordersData) ? ordersData : [];
      const products = Array.isArray(productsData) ? productsData : (Array.isArray(productsData?.products) ? productsData.products : []);
      const users = Array.isArray(usersData) ? usersData : [];
      const posOrders = Array.isArray(posData?.orders) ? posData.orders : [];
      const posTotal = posData?.pagination?.total || posOrders.length;

      const totalRevenue = orders
        .filter(o => o.paymentStatus === 'paid')
        .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

      setStats({
        products: products.length,
        orders: orders.length + posOrders.length,
        users: users.length,
        revenue: totalRevenue + (analytics?.revenue || 0),
        lowStock: products.filter(p => p.quantity > 0 && p.quantity <= 5).length,
        outOfStock: products.filter(p => !p.inStock).length,
      });

      setPosStats({
        todaySales: analytics?.orderCount || 0,
        todayRevenue: analytics?.revenue || 0,
        totalPosSales: posTotal,
      });

      setRecentOrders(orders.slice(0, 5));
      setRecentPosSales(posOrders.slice(0, 5));
      setLowStockProducts(products.filter(p => (p.quantity <= 5 || !p.inStock)).slice(0, 5));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-3xl font-display font-bold text-gold-500">Admin Dashboard</h1>
          <p className="text-gold-500/50 mt-1 text-sm">Manage your boutique at a glance.</p>
        </div>
        <EmptyState
          icon={HiOutlineExclamationCircle}
          title="Failed to load data"
          description={error}
          actionLabel="Retry"
          onAction={() => { setLoading(true); setError(''); fetchDashboardData(); }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-gold-500">Dashboard</h1>
        <p className="text-sm lg:text-base text-gold-500/50 mt-1">Your boutique at a glance.</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <StatsCardSkeleton key={i} />)
        ) : (
          <>
            <StatsCard title="Products" value={stats.products} icon={HiOutlineCollection} color="gold" />
            <StatsCard title="All Orders" value={stats.orders} icon={HiOutlineShoppingBag} color="blue" />
            <StatsCard title="Users" value={stats.users} icon={HiOutlineUser} color="green" />
            <StatsCard title="Total Revenue" value={formatPrice(stats.revenue)} icon={HiOutlineTrendingUp} color="purple" />
            <Link href="/dashboard/admin/menu" className="group">
              <StatsCard title="Low Stock" value={stats.lowStock} icon={HiOutlineExclamationCircle} color="red" />
            </Link>
            <StatsCard title="Out of Stock" value={stats.outOfStock} icon={HiOutlineChartBar} color="wine" />
          </>
        )}
      </div>

      {/* POS Today Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 lg:mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="premium-card p-5 border-gold-500/20 bg-gradient-to-br from-gold-500/5 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-gold-500/20 flex items-center justify-center">
              <HiOutlineCash className="w-6 h-6 text-gold-500" />
            </div>
            <div>
              <p className="text-[10px] text-gold-500/40 tracking-[0.2em] uppercase font-bold">Today&apos;s POS Sales</p>
              <p className="font-display text-2xl font-bold text-gold-500">{posStats.todaySales}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="premium-card p-5 border-gold-500/20 bg-gradient-to-br from-gold-500/5 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-gold-500/20 flex items-center justify-center">
              <HiOutlineTrendingUp className="w-6 h-6 text-gold-500" />
            </div>
            <div>
              <p className="text-[10px] text-gold-500/40 tracking-[0.2em] uppercase font-bold">Today&apos;s Revenue</p>
              <p className="font-display text-2xl font-bold text-gold-500">{formatPrice(posStats.todayRevenue)}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="premium-card p-5 border-gold-500/20 bg-gradient-to-br from-gold-500/5 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-gold-500/20 flex items-center justify-center">
              <HiOutlineChartSquareBar className="w-6 h-6 text-gold-500" />
            </div>
            <div>
              <p className="text-[10px] text-gold-500/40 tracking-[0.2em] uppercase font-bold">Total POS Sales</p>
              <p className="font-display text-2xl font-bold text-gold-500">{posStats.totalPosSales}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
        {/* Recent Online Orders */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="premium-card overflow-hidden">
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gold-500/10 flex items-center justify-between bg-dark-900/30">
            <h2 className="font-display text-base sm:text-lg font-bold text-gold-500">Recent Orders</h2>
            <Link href="/dashboard/admin/orders" className="text-[10px] tracking-wider uppercase text-gold-500 hover:text-gold-400 flex items-center gap-1 font-bold">
              View All <HiOutlineArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <TableSkeleton rows={4} cols={5} />
            ) : recentOrders.length === 0 ? (
              <EmptyState icon={HiOutlineShoppingBag} title="No orders yet" description="Orders will appear here once customers start purchasing." />
            ) : (
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td><span className="text-sm font-bold text-gold-400">#{order._id?.slice(-6).toUpperCase()}</span></td>
                      <td className="text-sm text-gold-500/50">{order.shippingAddress?.fullName || 'N/A'}</td>
                      <td className="text-sm font-bold text-gold-500">{formatPrice(order.totalAmount)}</td>
                      <td><span className={`badge ${getStatusBadge(order.status)}`}>{order.status}</span></td>
                      <td><span className={`badge ${order.paymentStatus === 'paid' ? 'badge-green' : 'badge-yellow'}`}>{order.paymentStatus}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>

        {/* Recent POS Sales */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="premium-card overflow-hidden">
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gold-500/10 flex items-center justify-between bg-dark-900/30">
            <h2 className="font-display text-base sm:text-lg font-bold text-gold-500">Recent POS Sales</h2>
            <Link href="/dashboard/admin/sales" className="text-[10px] tracking-wider uppercase text-gold-500 hover:text-gold-400 flex items-center gap-1 font-bold">
              View All <HiOutlineArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gold-500/10">
            {loading ? (
              <div className="p-6 space-y-4 animate-pulse">
                {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-12 bg-gold-500/10" />)}
              </div>
            ) : recentPosSales.length === 0 ? (
              <EmptyState icon={HiOutlineCash} title="No POS sales yet" description="Use the POS terminal to record in-store sales." actionHref="/dashboard/admin/pos" actionLabel="Open POS" />
            ) : (
              recentPosSales.map((sale) => (
                <div key={sale._id} className="p-4 flex items-center justify-between hover:bg-gold-500/5 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 border border-gold-500/10 flex items-center justify-center flex-shrink-0">
                      <HiOutlineCash className="w-5 h-5 text-gold-500/60" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gold-400 truncate">{sale.customerName || 'Walk-in Customer'}</p>
                      <p className="text-[10px] text-gold-500/40">{sale.items?.length || 0} items · {new Date(sale.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-sm font-bold text-gold-500">{formatPrice(sale.totalAmount)}</p>
                    <p className="text-[9px] text-gold-500/30 uppercase tracking-wider">{sale.paymentMethod}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="premium-card overflow-hidden">
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gold-500/10 flex items-center justify-between bg-dark-900/30">
            <h2 className="font-display text-base sm:text-lg font-bold text-gold-500">Inventory Alerts</h2>
            <Link href="/dashboard/admin/menu" className="text-[10px] tracking-wider uppercase text-gold-500 hover:text-gold-400 flex items-center gap-1 font-bold">
              Manage <HiOutlineArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {loading ? (
            <TableSkeleton rows={4} cols={3} />
          ) : lowStockProducts.length === 0 ? (
            <EmptyState icon={HiOutlineCollection} title="All stocked up" description="No inventory alerts. All products are well-stocked." />
          ) : (
            <div className="divide-y divide-gold-500/10">
              {lowStockProducts.map((product) => (
                <div key={product._id} className="p-4 flex items-center justify-between hover:bg-gold-500/5 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-14 bg-dark-800/60 flex-shrink-0 overflow-hidden border border-gold-500/10">
                      {product.images?.[0] && <img src={product.images[0]} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gold-400 truncate">{product.name}</p>
                      <p className="text-[10px] text-gold-500/40 capitalize tracking-wider uppercase">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className={`text-sm font-bold ${product.inStock ? 'text-red-400' : 'text-red-400'}`}>
                      {product.inStock ? `${product.quantity} left` : 'Out of stock'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="premium-card bg-gradient-to-br from-gold-500/5 via-gold-500/[0.02] to-transparent border-gold-500/20 p-6">
          <h2 className="font-display text-base sm:text-lg font-bold text-gold-500 mb-2">Quick Actions</h2>
          <p className="text-xs text-gold-500/40 mb-6">Common tasks to keep your store running.</p>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/dashboard/admin/pos"
              className="flex flex-col items-center justify-center gap-2 p-5 border border-gold-500/20 hover:border-gold-500/50 bg-gold-500/5 hover:bg-gold-500/10 transition-all group">
              <HiOutlineCash className="w-7 h-7 text-gold-500" />
              <span className="text-[10px] tracking-wider uppercase font-bold text-gold-500">New POS Sale</span>
            </Link>
            <Link href="/dashboard/admin/menu"
              className="flex flex-col items-center justify-center gap-2 p-5 border border-gold-500/20 hover:border-gold-500/50 bg-gold-500/5 hover:bg-gold-500/10 transition-all group">
              <HiOutlineCollection className="w-7 h-7 text-gold-500" />
              <span className="text-[10px] tracking-wider uppercase font-bold text-gold-500">Add Product</span>
            </Link>
            <Link href="/dashboard/admin/sales"
              className="flex flex-col items-center justify-center gap-2 p-5 border border-gold-500/20 hover:border-gold-500/50 bg-gold-500/5 hover:bg-gold-500/10 transition-all group">
              <HiOutlineChartBar className="w-7 h-7 text-gold-500" />
              <span className="text-[10px] tracking-wider uppercase font-bold text-gold-500">Sales History</span>
            </Link>
            <Link href="/dashboard/admin/analytics"
              className="flex flex-col items-center justify-center gap-2 p-5 border border-gold-500/20 hover:border-gold-500/50 bg-gold-500/5 hover:bg-gold-500/10 transition-all group">
              <HiOutlineTrendingUp className="w-7 h-7 text-gold-500" />
              <span className="text-[10px] tracking-wider uppercase font-bold text-gold-500">Analytics</span>
            </Link>
            <Link href="/dashboard/admin/orders"
              className="flex flex-col items-center justify-center gap-2 p-5 border border-gold-500/20 hover:border-gold-500/50 bg-gold-500/5 hover:bg-gold-500/10 transition-all group">
              <HiOutlineShoppingBag className="w-7 h-7 text-gold-500" />
              <span className="text-[10px] tracking-wider uppercase font-bold text-gold-500">All Orders</span>
            </Link>
            <Link href="/dashboard/admin/contacts"
              className="flex flex-col items-center justify-center gap-2 p-5 border border-gold-500/20 hover:border-gold-500/50 bg-gold-500/5 hover:bg-gold-500/10 transition-all group">
              <HiOutlineClock className="w-7 h-7 text-gold-500" />
              <span className="text-[10px] tracking-wider uppercase font-bold text-gold-500">Messages</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
