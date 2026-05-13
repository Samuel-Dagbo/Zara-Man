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
      <div className="mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-espresso leading-tight">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}
        </h1>
        <p className="text-sm lg:text-base text-luxury-500 mt-1">Here is your account overview.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
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

      <div className="premium-card overflow-hidden">
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-luxury-100 flex items-center justify-between bg-gradient-to-r from-luxury-50/50 to-transparent">
          <h2 className="font-display text-base sm:text-lg font-semibold text-espresso">Recent Orders</h2>
          <Link href="/dashboard/user/orders" className="text-xs tracking-wider uppercase text-gold-500 hover:text-gold-600 font-medium transition-colors">
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
                    <td>
                      <span className="text-sm font-medium text-espresso">#{order._id.slice(-6).toUpperCase()}</span>
                    </td>
                    <td className="text-sm text-luxury-600">{order.items.length} item(s)</td>
                    <td className="text-sm font-semibold">{formatPrice(order.totalAmount)}</td>
                    <td>
                      <span className={`badge ${
                        order.status === 'delivered' ? 'badge-green' :
                        order.status === 'cancelled' ? 'badge-red' :
                        order.status === 'shipped' ? 'badge-purple' :
                        'badge-yellow'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="text-sm text-luxury-500">
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
