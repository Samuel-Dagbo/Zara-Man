'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineLockClosed, HiOutlineCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(null);

  useEffect(() => {
    if (token) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Something went wrong');
      } else {
        toast.success('Password reset successfully');
        setTimeout(() => router.push('/auth/signin'), 2000);
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (valid === null) {
    return <div className="min-h-screen bg-cream pt-20 flex items-center justify-center">Loading...</div>;
  }

  if (!valid) {
    return (
      <div className="min-h-screen bg-cream pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-espresso">Invalid Reset Link</h1>
          <p className="text-luxury-500 mt-2">This reset link is invalid or has expired.</p>
          <Link href="/auth/forgot-password" className="inline-block mt-4 text-espresso hover:text-gold-500">
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-cream pt-20">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg"
          alt="Men's fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 to-transparent" />
        <div className="absolute bottom-12 left-12 text-cream">
          <h2 className="font-display text-4xl font-bold">Create New Password</h2>
          <p className="text-cream/70 mt-2">Enter your new password below.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="font-display text-3xl font-bold text-espresso tracking-wider block mb-12">
            ZARA MAN 247
          </Link>

          <h1 className="text-3xl font-display font-bold text-espresso">Reset Password</h1>
          <p className="text-luxury-500 mt-2">Create a new strong password for your account.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">New Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">Confirm Password</label>
              <div className="relative">
                <HiOutlineCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field pl-12"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-espresso text-cream py-4 tracking-wider uppercase text-sm font-medium 
                         hover:bg-gold-500 hover:text-espresso transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

            <p className="text-center text-sm text-luxury-500">
              Remember your password?{' '}
              <Link href="/auth/signin" className="text-espresso font-medium hover:text-gold-500 transition-colors">
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}