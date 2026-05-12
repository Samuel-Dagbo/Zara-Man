'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '@/components/dashboard/StatsCard';
import { HiOutlineShoppingBag, HiOutlineClock, HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import { formatPrice, orderStatuses } from '@/lib/utils';

export default function UserOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

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

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(o => o.status === statusFilter);

  const getStatusStyle = (status) => {
    const s = orderStatuses.find(os => os.value === status);
    return s?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-espresso">My Orders</h1>
        <p className="text-luxury-500 mt-1">Track and manage your purchases.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard title="All Orders" value={orders.length} icon={HiOutlineShoppingBag} color="gold" />
        <StatsCard title="Active" value={orders.filter(o => ['pending', 'confirmed', 'processing'].includes(o.status)).length} icon={HiOutlineClock} color="blue" />
        <StatsCard title="Delivered" value={orders.filter(o => o.status === 'delivered').length} icon={HiOutlineCheck} color="green" />
        <StatsCard title="Cancelled" value={orders.filter(o => o.status === 'cancelled').length} icon={HiOutlineX} color="red" />
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
          <div className="text-center py-12 text-luxury-500">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <HiOutlineShoppingBag className="w-16 h-16 text-luxury-300 mx-auto mb-4" />
            <p className="text-luxury-500">No orders found.</p>
          </div>
        ) : (
          filteredOrders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-luxury-100 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-lg font-semibold text-espresso">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h3>
                    <span className={`px-3 py-1 text-xs tracking-wider uppercase ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-luxury-500 mt-1">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl font-bold text-espresso">{formatPrice(order.totalAmount)}</p>
                  <p className="text-xs text-luxury-500">{order.items.length} items</p>
                </div>
              </div>

              <div className="mt-4 border-t border-luxury-100 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-16 h-16 bg-luxury-100 flex-shrink-0">
                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-espresso">{item.name}</p>
                        <p className="text-xs text-luxury-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-espresso mt-1">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {order.trackingNumber && (
                <div className="mt-4 pt-4 border-t border-luxury-100">
                  <p className="text-xs text-luxury-500 tracking-wider uppercase">Tracking Number</p>
                  <p className="text-sm font-medium text-espresso">{order.trackingNumber}</p>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
