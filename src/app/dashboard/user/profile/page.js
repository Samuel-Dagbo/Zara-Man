'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

export default function UserProfilePage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    address: { fullName: '', street: '', city: '', state: '', zip: '' },
  });

  useEffect(() => {
    if (session?.user) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/auth/user');
      if (!res.ok) throw new Error('Failed to load profile');
      const data = await res.json();
      if (data) {
        setForm({
          name: data.name || session?.user?.name || '',
          email: data.email || session?.user?.email || '',
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
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/auth/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Profile updated successfully');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="mb-8 animate-pulse">
          <div className="h-8 bg-gold-500/10 w-48 mb-2" />
          <div className="h-4 bg-gold-500/10 w-64" />
        </div>
        <div className="bg-dark-900/60 border border-gold-500/10 p-8">
          <div className="space-y-6 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <div className="h-3 bg-gold-500/10 w-24 mb-2" />
                <div className="h-10 bg-gold-500/10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-gold-500">My Profile</h1>
        <p className="text-sm lg:text-base text-gold-500/50 mt-1">Manage your personal information and address.</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="premium-card p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8"
      >
        <div>
          <h2 className="font-display text-base sm:text-lg font-bold text-gold-400 mb-3 sm:mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Full Name</label>
              <div className="relative">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30" />
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field pl-11" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Email</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30" />
                <input type="email" value={form.email} className="input-field pl-11 opacity-60" disabled />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Phone</label>
              <div className="relative">
                <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30" />
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field pl-11" placeholder="+233 XX XXX XXXX" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gold-500/10 pt-6 sm:pt-8">
          <h2 className="font-display text-base sm:text-lg font-bold text-gold-400 mb-3 sm:mb-4">Shipping Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Full Name</label>
              <div className="relative">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30" />
                <input type="text" value={form.address.fullName} onChange={(e) => setForm({ ...form, address: { ...form.address, fullName: e.target.value } })} className="input-field pl-11" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Street Address</label>
              <div className="relative">
                <HiOutlineLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30" />
                <input type="text" value={form.address.street} onChange={(e) => setForm({ ...form, address: { ...form.address, street: e.target.value } })} className="input-field pl-11" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">City</label>
              <input type="text" value={form.address.city} onChange={(e) => setForm({ ...form, address: { ...form.address, city: e.target.value } })} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">State / Region</label>
              <input type="text" value={form.address.state} onChange={(e) => setForm({ ...form, address: { ...form.address, state: e.target.value } })} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">ZIP / Postal Code</label>
              <input type="text" value={form.address.zip} onChange={(e) => setForm({ ...form, address: { ...form.address, zip: e.target.value } })} className="input-field" />
            </div>
          </div>
        </div>

        <div className="border-t border-gold-500/10 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-gold-500 text-dark-950 px-8 sm:px-10 py-3 sm:py-4 tracking-[0.15em] uppercase text-xs font-bold hover:bg-gold-400 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-gold-500/20 hover:shadow-xl w-full sm:w-auto"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
