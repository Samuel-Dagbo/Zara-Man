'use client';

import { useState, useEffect } from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import { HiOutlineCollection, HiOutlineShoppingBag, HiOutlineUser, HiOutlineMail } from 'react-icons/hi';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [ordersRes, productsRes, usersRes, contactsRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/products'),
        fetch('/api/auth/users'),
        fetch('/api/contact'),
      ]);

      const orders = await ordersRes.json();
      const products = await productsRes.json();
      const users = await usersRes.json();

      setStats({
        products: products.length || 0,
        orders: orders.length || 0,
        users: users.length || 0,
        revenue: orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.totalAmount : 0), 0),
      });
      setRecentOrders(orders.slice(0, 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-espresso">Admin Dashboard</h1>
        <p className="text-luxury-500 mt-1">Manage your boutique at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Products" value={stats.products} icon={HiOutlineCollection} color="gold" />
        <StatsCard title="Orders" value={stats.orders} icon={HiOutlineShoppingBag} color="blue" />
        <StatsCard title="Users" value={stats.users} icon={HiOutlineUser} color="green" />
        <StatsCard title="Revenue" value={formatPrice(stats.revenue)} icon={HiOutlineMail} color="purple" />
      </div>

      <div className="bg-white border border-luxury-100">
        <div className="p-6 border-b border-luxury-100">
          <h2 className="font-display text-xl font-semibold text-espresso">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-luxury-50">
                <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Order ID</th>
                <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Customer</th>
                <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Items</th>
                <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Total</th>
                <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Status</th>
                <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Payment</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order._id} className="border-t border-luxury-50 hover:bg-luxury-50/50">
                  <td className="p-4 text-sm font-medium">#{order._id?.slice(-6).toUpperCase()}</td>
                  <td className="p-4 text-sm text-luxury-600">{order.shippingAddress?.fullName || 'N/A'}</td>
                  <td className="p-4 text-sm text-luxury-600">{order.items?.length || 0}</td>
                  <td className="p-4 text-sm font-semibold">{formatPrice(order.totalAmount)}</td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 text-xs tracking-wider uppercase ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 text-xs tracking-wider uppercase ${
                      order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
