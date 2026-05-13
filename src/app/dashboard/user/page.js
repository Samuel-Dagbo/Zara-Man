'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import StatsCard from '@/components/dashboard/StatsCard';
import { StatsCardSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineClock, HiOutlineUser, HiOutlineExclamationCircle } from 'react-icons/hi';
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
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'confirmed');
  const deliveredOrders = orders.filter(o => o.status === 'delivered');

  if (error) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-espresso">Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}</h1>
          <p className="text-luxury-500 mt-1">Here is your account overview.</p>
        </div>
        <EmptyState
          icon={HiOutlineExclamationCircle}
          title="Failed to load data"
          description={error}
          actionLabel="Retry"
          onAction={() => { setLoading(true); setError(''); fetchOrders(); }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-espresso">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}
        </h1>
        <p className="text-luxury-500 mt-1">Here is your account overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <StatsCardSkeleton key={i} />)
        ) : (
          <>
            <StatsCard title="Total Orders" value={orders.length} icon={HiOutlineShoppingBag} color="gold" />
            <StatsCard title="Total Spent" value={formatPrice(totalSpent)} icon={HiOutlineHeart} color="blue" />
            <StatsCard title="Pending" value={pendingOrders.length} icon={HiOutlineClock} color="purple" />
            <StatsCard title="Delivered" value={deliveredOrders.length} icon={HiOutlineUser} color="green" />
          </>
        )}
      </div>

      <div className="bg-white border border-luxury-100">
        <div className="p-6 border-b border-luxury-100 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-espresso">Recent Orders</h2>
          <Link href="/dashboard/user/orders" className="text-sm text-gold-500 hover:text-gold-600 tracking-wider uppercase transition-colors">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8">
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-4 animate-pulse">
                    <div className="h-4 bg-luxury-200 w-24 rounded" />
                    <div className="h-4 bg-luxury-200 w-16 rounded" />
                    <div className="h-4 bg-luxury-200 w-20 rounded" />
                    <div className="h-4 bg-luxury-200 w-16 rounded" />
                    <div className="h-4 bg-luxury-200 w-24 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : orders.length === 0 ? (
            <EmptyState
              icon={HiOutlineShoppingBag}
              title="No orders yet"
              description="Place your first order to see it here."
              actionHref="/shop"
              actionLabel="Start Shopping"
            />
          ) : (
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
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="border-t border-luxury-50 hover:bg-luxury-50/50 transition-colors">
                    <td className="p-4 text-sm font-medium text-espresso">#{order._id.slice(-6).toUpperCase()}</td>
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
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
