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
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
      shipped: 'bg-purple-100 text-purple-700',
      confirmed: 'bg-blue-100 text-blue-700',
      processing: 'bg-indigo-100 text-indigo-700',
      pending: 'bg-yellow-100 text-yellow-700',
    };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  if (error) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-espresso">Admin Dashboard</h1>
          <p className="text-luxury-500 mt-1">Manage your boutique at a glance.</p>
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
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-espresso">Admin Dashboard</h1>
        <p className="text-luxury-500 mt-1">Manage your boutique at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-luxury-100"
        >
          <div className="p-6 border-b border-luxury-100 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-espresso">Recent Orders</h2>
            <Link href="/dashboard/admin/orders" className="text-xs tracking-wider uppercase text-gold-500 hover:text-gold-600 flex items-center gap-1">
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
              <table className="w-full">
                <thead>
                  <tr className="bg-luxury-50">
                    <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Order</th>
                    <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Customer</th>
                    <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Total</th>
                    <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Status</th>
                    <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="border-t border-luxury-50 hover:bg-luxury-50/50 transition-colors">
                      <td className="p-4 text-sm font-medium text-espresso">#{order._id?.slice(-6).toUpperCase()}</td>
                      <td className="p-4 text-sm text-luxury-600">{order.shippingAddress?.fullName || 'N/A'}</td>
                      <td className="p-4 text-sm font-semibold">{formatPrice(order.totalAmount)}</td>
                      <td className="p-4">
                        <span className={`inline-block px-3 py-1 text-xs tracking-wider uppercase ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-block px-3 py-1 text-xs tracking-wider uppercase ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
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
          className="bg-white border border-luxury-100"
        >
          <div className="p-6 border-b border-luxury-100 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-espresso">Inventory Alerts</h2>
            <Link href="/dashboard/admin/menu" className="text-xs tracking-wider uppercase text-gold-500 hover:text-gold-600 flex items-center gap-1">
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
            <div className="divide-y divide-luxury-100">
              {lowStockProducts.map((product) => (
                <div key={product._id} className="p-4 flex items-center justify-between hover:bg-luxury-50/50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-12 bg-luxury-100 flex-shrink-0 overflow-hidden">
                      {product.images?.[0] && (
                        <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-espresso truncate">{product.name}</p>
                      <p className="text-xs text-luxury-500 capitalize">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className={`text-sm font-semibold ${product.inStock && product.quantity <= 5 ? 'text-red-600' : 'text-red-600'}`}>
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
        className="bg-gold-500/5 border border-gold-500/20 p-6"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-espresso">Quick Actions</h3>
            <p className="text-sm text-luxury-500 mt-1">Common tasks to keep your store running.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/admin/menu" className="px-6 py-3 bg-espresso text-cream text-sm tracking-wider uppercase font-medium hover:bg-gold-500 hover:text-espresso transition-all duration-300">
              Add Product
            </Link>
            <Link href="/dashboard/admin/orders" className="px-6 py-3 border border-espresso text-espresso text-sm tracking-wider uppercase font-medium hover:bg-espresso hover:text-cream transition-all duration-300">
              View Orders
            </Link>
            <Link href="/dashboard/admin/users" className="px-6 py-3 border border-espresso text-espresso text-sm tracking-wider uppercase font-medium hover:bg-espresso hover:text-cream transition-all duration-300">
              Manage Users
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
