'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [resetToken, setResetToken] = useState('');

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
        setResetToken(data.token);
        toast.success('Password reset link generated');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="font-display text-4xl font-bold">Reset Your Password</h2>
          <p className="text-cream/70 mt-2">We'll help you get back into your account.</p>
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

          <h1 className="text-3xl font-display font-bold text-espresso">Forgot Password?</h1>
          <p className="text-luxury-500 mt-2">Enter your email and we'll send you a reset link.</p>

          {sent ? (
            <div className="mt-8 p-6 bg-green-50 border border-green-200">
              <p className="font-medium text-green-700">Reset link generated!</p>
              <p className="text-sm text-green-600 mt-2 mb-4">
                For testing, click the link below (in production, this would be sent to your email):
              </p>
              <Link 
                href={`/auth/reset-password?token=${resetToken}`}
                className="block w-full text-center bg-espresso text-cream py-3 text-sm font-medium hover:bg-gold-500 hover:text-espresso transition-all"
              >
                Reset Password
              </Link>
              <Link href="/auth/signin" className="block text-center mt-4 text-sm text-green-700 hover:underline">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">Email</label>
                <div className="relative">
                  <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-12"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-espresso text-cream py-4 tracking-wider uppercase text-sm font-medium 
                           hover:bg-gold-500 hover:text-espresso transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <p className="text-center text-sm text-luxury-500">
                Remember your password?{' '}
                <Link href="/auth/signin" className="text-espresso font-medium hover:text-gold-500 transition-colors">
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}