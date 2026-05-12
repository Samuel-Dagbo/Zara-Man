'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

export default function UserProfilePage() {
  const { data: session, update } = useSession();
  const [form, setForm] = useState({
    name: '', phone: '',
    address: { fullName: '', street: '', city: '', state: '', zip: '' },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`/api/auth/user?id=${session.user.id}`);
      const data = await res.json();
      if (data) {
        setForm({
          name: data.name || '',
          phone: data.phone || '',
          address: {
            fullName: data.address?.fullName || '',
            street: data.address?.street || '',
            city: data.address?.city || '',
            state: data.address?.state || '',
            zip: data.address?.zip || '',
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, userId: session.user.id }),
      });
      if (res.ok) {
        toast.success('Profile updated successfully');
        update();
      } else {
        toast.error('Failed to update profile');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-espresso">My Profile</h1>
        <p className="text-luxury-500 mt-1">Manage your personal information and shipping details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <form onSubmit={handleSubmit} className="bg-white border border-luxury-100 p-8 space-y-6">
            <h2 className="font-display text-xl font-semibold text-espresso">Personal Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">Full Name</label>
              <div className="relative">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">Email</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
                <input
                  type="email"
                  value={session?.user?.email || ''}
                  disabled
                  className="input-field pl-12 bg-luxury-50 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">Phone</label>
              <div className="relative">
                <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-field pl-12"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <h2 className="font-display text-xl font-semibold text-espresso pt-4 border-t border-luxury-100">
              Shipping Address
            </h2>

            <div>
              <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">Full Name</label>
              <input
                type="text"
                value={form.address.fullName}
                onChange={(e) => setForm({ ...form, address: { ...form.address, fullName: e.target.value } })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">Street Address</label>
              <div className="relative">
                <HiOutlineLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
                <input
                  type="text"
                  value={form.address.street}
                  onChange={(e) => setForm({ ...form, address: { ...form.address, street: e.target.value } })}
                  className="input-field pl-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">City</label>
                <input
                  type="text"
                  value={form.address.city}
                  onChange={(e) => setForm({ ...form, address: { ...form.address, city: e.target.value } })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">State</label>
                <input
                  type="text"
                  value={form.address.state}
                  onChange={(e) => setForm({ ...form, address: { ...form.address, state: e.target.value } })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">ZIP Code</label>
                <input
                  type="text"
                  value={form.address.zip}
                  onChange={(e) => setForm({ ...form, address: { ...form.address, zip: e.target.value } })}
                  className="input-field"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white border border-luxury-100 p-8 text-center">
            <div className="w-24 h-24 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiOutlineUser className="w-12 h-12 text-gold-500" />
            </div>
            <h3 className="font-display text-xl font-semibold text-espresso">{session?.user?.name}</h3>
            <p className="text-sm text-luxury-500 mt-1">{session?.user?.email}</p>
            <span className="inline-block mt-3 px-4 py-1 bg-gold-500/10 text-gold-600 text-xs tracking-wider uppercase">
              {session?.user?.role}
            </span>
          </div>

          <div className="bg-white border border-luxury-100 p-6">
            <h3 className="font-display text-lg font-semibold text-espresso mb-4">Account Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-luxury-500">Member since</span>
                <span className="text-espresso font-medium">2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-luxury-500">Role</span>
                <span className="text-espresso font-medium capitalize">{session?.user?.role}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
