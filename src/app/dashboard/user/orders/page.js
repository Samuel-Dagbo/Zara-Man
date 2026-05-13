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
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-espresso">My Orders</h1>
        <p className="text-luxury-500 mt-1">Track and view your order history.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 text-xs tracking-wider uppercase transition-all duration-200 ${
              statusFilter === status
                ? 'bg-espresso text-cream'
                : 'bg-white border border-luxury-200 text-luxury-600 hover:border-espresso'
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
              className="bg-white border border-luxury-100 p-6 hover:border-luxury-200 transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-lg font-semibold text-espresso">
                      Order #{order._id?.slice(-8).toUpperCase()}
                    </h3>
                    <span className={`inline-block px-3 py-1 text-xs tracking-wider uppercase ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-luxury-500 mt-1">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl font-bold text-espresso">{formatPrice(order.totalAmount)}</p>
                  <p className={`text-xs tracking-wider uppercase ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {order.paymentStatus}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-luxury-100 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-12 h-14 bg-luxury-100 flex-shrink-0 overflow-hidden">
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

              <div className="mt-4 pt-4 border-t border-luxury-100">
                <p className="text-xs text-luxury-500">
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
