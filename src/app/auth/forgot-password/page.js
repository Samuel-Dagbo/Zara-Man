'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Something went wrong');
      } else {
        setSent(true);
        toast.success('Reset link sent to your email');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="font-display text-4xl font-bold text-gold-500">Reset Your Password</h2>
          <p className="text-gold-500/50 mt-2">We&apos;ll help you get back into your account.</p>
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

          {sent ? (
            <div className="bg-dark-900/60 backdrop-blur-sm border border-gold-500/10 p-8 text-center">
              <div className="w-16 h-16 border border-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiOutlineCheck className="w-8 h-8 text-gold-500" />
              </div>
              <h2 className="font-display text-2xl font-bold text-gold-500 mb-2">Check Your Email</h2>
              <p className="text-gold-500/50 text-sm mb-6">
                If an account exists with that email, we&apos;ve sent a password reset link.
              </p>
              <Link
                href="/auth/signin"
                className="text-gold-500 hover:text-gold-400 text-xs tracking-wider uppercase font-bold"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-display font-bold text-gold-500">Forgot Password?</h1>
              <p className="text-gold-500/50 mt-2 text-sm">Enter your email and we&apos;ll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Email</label>
                  <div className="relative">
                    <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field pl-11"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold-500 text-dark-950 py-4 tracking-[0.15em] uppercase text-xs font-bold 
                             hover:bg-gold-400 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-gold-500/20"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>

                <p className="text-center text-sm text-gold-500/40">
                  Remember your password?{' '}
                  <Link href="/auth/signin" className="text-gold-500 font-bold hover:text-gold-400 transition-colors">
                    Sign in
                  </Link>
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
