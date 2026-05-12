'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import StatsCard from '@/components/dashboard/StatsCard';
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineClock, HiOutlineUser } from 'react-icons/hi';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function UserDashboard() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'confirmed');
  const deliveredOrders = orders.filter(o => o.status === 'delivered');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-espresso">Welcome back, {session?.user?.name}</h1>
        <p className="text-luxury-500 mt-1">Here is your account overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Orders"
          value={orders.length}
          icon={HiOutlineShoppingBag}
          color="gold"
        />
        <StatsCard
          title="Total Spent"
          value={formatPrice(totalSpent)}
          icon={HiOutlineHeart}
          color="blue"
        />
        <StatsCard
          title="Pending"
          value={pendingOrders.length}
          icon={HiOutlineClock}
          color="purple"
        />
        <StatsCard
          title="Delivered"
          value={deliveredOrders.length}
          icon={HiOutlineUser}
          color="green"
        />
      </div>

      <div className="bg-white border border-luxury-100">
        <div className="p-6 border-b border-luxury-100 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-espresso">Recent Orders</h2>
          <Link href="/dashboard/user/orders" className="text-sm text-gold-500 hover:text-gold-600 tracking-wider uppercase">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-luxury-50">
                <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Order</th>
                <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Items</th>
                <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Total</th>
                <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Status</th>
                <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-luxury-500">Loading...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-luxury-500">No orders yet.</td></tr>
              ) : (
                orders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="border-t border-luxury-50 hover:bg-luxury-50/50">
                    <td className="p-4 text-sm font-medium">#{order._id.slice(-6).toUpperCase()}</td>
                    <td className="p-4 text-sm text-luxury-600">{order.items.length} item(s)</td>
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
                    <td className="p-4 text-sm text-luxury-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
