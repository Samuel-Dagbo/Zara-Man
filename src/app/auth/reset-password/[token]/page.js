'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineLockClosed, HiOutlineCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);

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
        setReset(true);
        toast.success('Password reset successfully');
        setTimeout(() => router.push('/auth/signin'), 2000);
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-dark-950 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-gold-500">Invalid Reset Link</h1>
          <p className="text-gold-500/50 mt-2 text-sm">This reset link is invalid or has expired.</p>
          <Link href="/auth/forgot-password" className="inline-block mt-4 text-gold-500 hover:text-gold-400 text-sm font-bold">
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  if (reset) {
    return (
      <div className="min-h-screen bg-dark-950 pt-20 flex items-center justify-center">
        <div className="text-center max-w-md px-8">
          <div className="w-16 h-16 border border-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiOutlineCheck className="w-8 h-8 text-gold-500" />
          </div>
          <h1 className="text-2xl font-display font-bold text-gold-500">Password Reset!</h1>
          <p className="text-gold-500/50 mt-2 text-sm">Redirecting you to sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-dark-950 pt-20">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg"
          alt="Men's fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 to-transparent" />
        <div className="absolute bottom-12 left-12 text-white">
          <h2 className="font-display text-4xl font-bold text-gold-500">Create New Password</h2>
          <p className="text-gold-500/50 mt-2">Enter your new password below.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="font-display text-3xl font-bold text-gold-500 tracking-wider block mb-12">
            <span className="text-gold-400">OSEBO</span> 247
          </Link>

          <h1 className="text-3xl font-display font-bold text-gold-500">Reset Password</h1>
          <p className="text-gold-500/50 mt-2 text-sm">Create a new strong password for your account.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">New Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-11"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Confirm Password</label>
              <div className="relative">
                <HiOutlineCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field pl-11"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-500 text-dark-950 py-4 tracking-[0.15em] uppercase text-xs font-bold 
                         hover:bg-gold-400 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-gold-500/20"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

            <p className="text-center text-sm text-gold-500/40">
              Remember your password?{' '}
              <Link href="/auth/signin" className="text-gold-500 font-bold hover:text-gold-400 transition-colors">
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
