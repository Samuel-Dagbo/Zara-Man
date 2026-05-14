'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import StatsCard from '@/components/dashboard/StatsCard';
import { StatsCardSkeleton, TableSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import {
  HiOutlineCollection, HiOutlineShoppingBag, HiOutlineUser, HiOutlineMail,
  HiOutlineExclamationCircle, HiOutlineChartBar, HiOutlineTrendingUp,
  HiOutlineArrowRight
} from 'react-icons/hi';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0, lowStock: 0, outOfStock: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [ordersRes, productsRes, usersRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/products'),
        fetch('/api/auth/users'),
      ]);

      if (!ordersRes.ok || !productsRes.ok || !usersRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const orders = await ordersRes.json();
      const products = await productsRes.json();
      const users = await usersRes.json();

      setStats({
        products: products.length || 0,
        orders: orders.length || 0,
        users: users.length || 0,
        revenue: orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.totalAmount : 0), 0),
        lowStock: products.filter(p => p.quantity > 0 && p.quantity <= 5).length || 0,
        outOfStock: products.filter(p => !p.inStock).length || 0,
      });
      setRecentOrders(orders.slice(0, 5));
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
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-gold-500">Admin Dashboard</h1>
        <p className="text-sm lg:text-base text-gold-500/50 mt-1">Manage your boutique at a glance.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <StatsCardSkeleton key={i} />)
        ) : (
          <>
            <StatsCard title="Products" value={stats.products} icon={HiOutlineCollection} color="gold" />
            <StatsCard title="Orders" value={stats.orders} icon={HiOutlineShoppingBag} color="blue" />
            <StatsCard title="Users" value={stats.users} icon={HiOutlineUser} color="green" />
            <StatsCard title="Revenue" value={formatPrice(stats.revenue)} icon={HiOutlineTrendingUp} color="purple" />
            <Link href="/dashboard/admin/menu" className="group">
              <StatsCard title="Low Stock" value={stats.lowStock} icon={HiOutlineExclamationCircle} color="red" />
            </Link>
            <StatsCard title="Out of Stock" value={stats.outOfStock} icon={HiOutlineChartBar} color="wine" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card overflow-hidden"
        >
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
              <EmptyState
                icon={HiOutlineShoppingBag}
                title="No orders yet"
                description="Orders will appear here once customers start purchasing."
              />
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
                      <td>
                        <span className="text-sm font-bold text-gold-400">#{order._id?.slice(-6).toUpperCase()}</span>
                      </td>
                      <td className="text-sm text-gold-500/50">{order.shippingAddress?.fullName || 'N/A'}</td>
                      <td className="text-sm font-bold text-gold-500">{formatPrice(order.totalAmount)}</td>
                      <td>
                        <span className={`badge ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${order.paymentStatus === 'paid' ? 'badge-green' : 'badge-yellow'}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="premium-card overflow-hidden"
        >
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gold-500/10 flex items-center justify-between bg-dark-900/30">
            <h2 className="font-display text-base sm:text-lg font-bold text-gold-500">Inventory Alerts</h2>
            <Link href="/dashboard/admin/menu" className="text-[10px] tracking-wider uppercase text-gold-500 hover:text-gold-400 flex items-center gap-1 font-bold">
              Manage <HiOutlineArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {loading ? (
            <TableSkeleton rows={4} cols={3} />
          ) : lowStockProducts.length === 0 ? (
            <EmptyState
              icon={HiOutlineCollection}
              title="All stocked up"
              description="No inventory alerts. All products are well-stocked."
            />
          ) : (
            <div className="divide-y divide-gold-500/10">
              {lowStockProducts.map((product) => (
                <div key={product._id} className="p-4 flex items-center justify-between hover:bg-gold-500/5 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-14 bg-dark-800/60 flex-shrink-0 overflow-hidden border border-gold-500/10">
                      {product.images?.[0] && (
                        <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gold-400 truncate">{product.name}</p>
                      <p className="text-[10px] text-gold-500/40 capitalize tracking-wider uppercase">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className={`text-sm font-bold ${product.inStock && product.quantity <= 5 ? 'text-red-400' : 'text-red-400'}`}>
                      {product.inStock ? `${product.quantity} left` : 'Out of stock'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="premium-card bg-gradient-to-br from-gold-500/5 via-gold-500/[0.02] to-transparent border-gold-500/20 p-4 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-gold-500">Quick Actions</h3>
            <p className="text-xs sm:text-sm text-gold-500/40 mt-1">Common tasks to keep your store running.</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
            <Link href="/dashboard/admin/menu" className="btn-primary text-[10px] px-4 sm:px-6 py-2.5 sm:py-3 flex-1 sm:flex-initial text-center shadow-gold-500/20">
              Add Product
            </Link>
            <Link href="/dashboard/admin/orders" className="btn-secondary text-[10px] px-4 sm:px-6 py-2.5 sm:py-3 flex-1 sm:flex-initial text-center">
              View Orders
            </Link>
            <Link href="/dashboard/admin/users" className="btn-ghost text-[10px] px-4 sm:px-6 py-2.5 sm:py-3 flex-1 sm:flex-initial text-center border border-gold-500/10 hover:border-gold-500/30">
              Manage Users
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
