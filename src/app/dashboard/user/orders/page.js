'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import StatsCard from '@/components/dashboard/StatsCard';
import { StatsCardSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import { HiOutlineShoppingBag, HiOutlineExclamationCircle } from 'react-icons/hi';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function UserOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (!res.ok) throw new Error('Failed to fetch orders');
      setOrders(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = statusFilter === 'all'
    ? orders : orders.filter(o => o.status === statusFilter);

  if (error) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-espresso">My Orders</h1>
          <p className="text-luxury-500 mt-1">Track and view your order history.</p>
        </div>
        <EmptyState
          icon={HiOutlineExclamationCircle}
          title="Failed to load orders"
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
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-espresso">My Orders</h1>
        <p className="text-sm lg:text-base text-luxury-500 mt-1">Track and view your order history.</p>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
              className={`px-2.5 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs tracking-wider uppercase rounded-lg transition-all duration-200 font-medium ${
              statusFilter === status
                ? 'bg-espresso text-cream shadow-lg shadow-espresso/20'
                : 'bg-white border border-luxury-200 text-luxury-600 hover:border-espresso hover:text-espresso hover:shadow-sm'
            }`}
          >
            {status === 'all' ? 'All' : status}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white border border-luxury-100 p-6 animate-pulse">
                <div className="flex justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="h-5 bg-luxury-200 w-48 rounded" />
                    <div className="h-4 bg-luxury-200 w-64 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-6 bg-luxury-200 w-24 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <EmptyState
            icon={HiOutlineShoppingBag}
            title={statusFilter === 'all' ? 'No orders yet' : `No ${statusFilter} orders`}
            description={statusFilter === 'all' ? 'Place your first order to see it here.' : `No orders with status "${statusFilter}".`}
            actionHref="/shop"
            actionLabel="Start Shopping"
          />
        ) : (
          filteredOrders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="premium-card p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                <div className="w-full sm:w-auto">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <h3 className="font-display text-base sm:text-lg font-semibold text-espresso">
                      Order #{order._id?.slice(-8).toUpperCase()}
                    </h3>
                    <span className={`badge ${
                      order.status === 'delivered' ? 'badge-green' :
                      order.status === 'cancelled' ? 'badge-red' :
                      order.status === 'shipped' ? 'badge-purple' :
                      'badge-yellow'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-luxury-500 mt-1">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-end gap-2 sm:gap-0">
                  <p className="font-display text-lg sm:text-xl font-bold text-espresso">{formatPrice(order.totalAmount)}</p>
                  <p className={`badge mt-0 sm:mt-1 ${order.paymentStatus === 'paid' ? 'badge-green' : 'badge-yellow'}`}>
                    {order.paymentStatus}
                  </p>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 border-t border-luxury-100 pt-3 sm:pt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex gap-3 p-2 rounded-lg hover:bg-luxury-50 transition-colors">
                      <div className="w-12 h-14 bg-luxury-100 flex-shrink-0 overflow-hidden rounded-md">
                        {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-espresso truncate">{item.name}</p>
                        <p className="text-xs text-luxury-500">Qty: {item.quantity}</p>
                        {item.size && <p className="text-xs text-luxury-500">Size: {item.size}</p>}
                        <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-luxury-100">
                <p className="text-[10px] sm:text-xs text-luxury-500">
                  Ship to: {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}
                </p>
                {order.trackingNumber && (
                  <p className="text-xs text-luxury-500 mt-1">Tracking: {order.trackingNumber}</p>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
