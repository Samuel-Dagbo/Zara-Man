'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import StatsCard from '@/components/dashboard/StatsCard';
import EmptyState from '@/components/ui/EmptyState';
import { HiOutlineMail, HiOutlineExclamationCircle, HiOutlineCheck, HiOutlineX } from 'react-icons/hi';

export default function AdminContactsPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact');
      if (!res.ok) throw new Error('Failed to fetch messages');
      setMessages(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id, currentRead) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !currentRead }),
      });
      if (res.ok) {
        setMessages(prev => prev.map(m => m._id === id ? { ...m, read: !currentRead } : m));
        toast.success(currentRead ? 'Marked as unread' : 'Marked as read');
      }
    } catch {
      toast.error('Failed to update');
    }
  };

  if (error) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gold-500">Contact Messages</h1>
          <p className="text-gold-500/50 mt-1 text-sm">View customer inquiries.</p>
        </div>
        <EmptyState icon={HiOutlineExclamationCircle} title="Failed to load messages" description={error} actionLabel="Retry" onAction={() => { setLoading(true); setError(''); fetchMessages(); }} />
      </div>
    );
  }

  const unread = messages.filter(m => !m.read).length;

  return (
    <div>
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-gold-500">Contact Messages</h1>
        <p className="text-sm lg:text-base text-gold-500/50 mt-1">View and manage customer inquiries.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatsCard title="Total" value={messages.length} icon={HiOutlineMail} color="gold" />
        <StatsCard title="Unread" value={unread} icon={HiOutlineExclamationCircle} color="red" />
      </div>

      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-dark-900/60 border border-gold-500/10 p-6 animate-pulse">
              <div className="h-5 bg-gold-500/10 w-48 mb-3" />
              <div className="h-4 bg-gold-500/10 w-64" />
            </div>
          ))
        ) : messages.length === 0 ? (
          <EmptyState icon={HiOutlineMail} title="No messages yet" description="Customer inquiries will appear here." />
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`premium-card p-6 ${!msg.read ? 'border-gold-500/30 bg-gold-500/[0.02]' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-display text-lg font-bold text-gold-400">{msg.name}</h3>
                    {!msg.read && <span className="badge-gold text-[9px]">New</span>}
                  </div>
                  <div className="flex gap-4 mt-1 text-xs text-gold-500/50">
                    <span>{msg.email}</span>
                    {msg.phone && <span>{msg.phone}</span>}
                    <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-gold-500/70 font-bold uppercase tracking-wider mt-3">{msg.subject}</p>
                  <p className="text-sm text-gold-500/50 mt-1 leading-relaxed">{msg.message}</p>
                </div>
                <button
                  onClick={() => toggleRead(msg._id, msg.read)}
                  className={`p-2 transition-colors flex-shrink-0 ${msg.read ? 'text-gold-500/30 hover:text-gold-500' : 'text-gold-500 hover:text-gold-400'}`}
                  title={msg.read ? 'Mark as unread' : 'Mark as read'}
                >
                  {msg.read ? <HiOutlineX className="w-5 h-5" /> : <HiOutlineCheck className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
