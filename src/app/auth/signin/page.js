'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff, HiOutlineExclamationCircle } from 'react-icons/hi';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      window.location.href = '/auth/callback';
    }
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/auth/callback' });
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-cream via-cream to-luxury-50 pt-20">
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-espresso via-espresso/95 to-espresso/90 z-10" />
        <img
          src="https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg"
          alt="Men's fashion"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent z-20" />
        <div className="absolute bottom-12 left-12 z-30">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-1 bg-gold-500 mb-6" />
            <h2 className="font-display text-5xl font-bold text-cream leading-tight">Welcome Back</h2>
            <p className="text-cream/60 mt-3 text-lg max-w-sm">Continue your style journey with Zara Man 247.</p>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="font-display text-3xl font-bold text-espresso tracking-wider block mb-12 hover:text-gold-600 transition-colors">
            ZARA MAN 247
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold text-espresso">Sign In</h1>
            <p className="text-luxury-500 mt-2">Access your account and manage your orders.</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-3"
            >
              <HiOutlineExclamationCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">Email</label>
              <div className="relative group">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400 group-focus-within:text-gold-500 transition-colors z-10" />
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

            <div>
              <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">Password</label>
              <div className="relative group">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400 group-focus-within:text-gold-500 transition-colors z-10" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12 pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-400 hover:text-espresso transition-colors z-10"
                >
                  {showPassword ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-luxury-300 text-gold-500 focus:ring-gold-500/30 transition-colors" />
                <span className="text-sm text-luxury-500 group-hover:text-espresso transition-colors">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-espresso hover:text-gold-600 transition-colors font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-espresso text-cream py-4 tracking-wider uppercase text-sm font-medium rounded-lg
                         hover:bg-gold-500 hover:text-espresso transition-all duration-300 disabled:opacity-50 
                         shadow-lg shadow-espresso/20 hover:shadow-xl hover:shadow-gold-500/20 hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-luxury-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-cream text-luxury-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border-2 border-luxury-200 text-espresso py-4 tracking-wider uppercase text-sm rounded-lg
                         font-medium hover:border-espresso hover:bg-white transition-all duration-300 
                         flex items-center justify-center gap-3 hover:shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>

            <p className="text-center text-sm text-luxury-500">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-espresso font-medium hover:text-gold-600 transition-colors">
                Create one
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}