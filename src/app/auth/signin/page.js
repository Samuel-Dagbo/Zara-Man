'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff, HiOutlineExclamationCircle } from 'react-icons/hi';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

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
    <div className="min-h-screen flex bg-dark-950 pt-20 lg:pt-0">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/30 via-gold-600/20 to-gold-500/10 z-10" />
        <img
          src="https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.2)_0%,_transparent_70%)] z-20" />
        <div className="relative z-30 text-center px-12">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}>
            <div className="w-16 h-px bg-gold-500 mx-auto mb-8" />
            <h2 className="font-display text-5xl font-bold text-gold-500 leading-tight">Welcome Back</h2>
            <p className="text-gold-500/50 mt-4 text-lg max-w-md mx-auto leading-relaxed">
              Continue your style journey with our exclusive collection.
            </p>
            <div className="w-16 h-px bg-gold-500/40 mx-auto mt-8" />
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
          <Link
            href="/"
            className="font-display text-2xl sm:text-3xl font-bold tracking-[0.15em] block mb-10 lg:mb-12 text-gold-500 hover:text-gold-400 transition-colors"
          >
            <span className="text-gold-400">OSEBO</span> 247
          </Link>

          <motion.div variants={stagger} initial="initial" animate="animate" className="bg-dark-900/60 backdrop-blur-sm border border-gold-500/10 p-8 sm:p-10">
            <motion.div variants={fadeUp} className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-gold-500">Sign in</h1>
              <p className="text-gold-500/50 mt-2 text-sm">Access your account to manage orders and more.</p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3"
              >
                <HiOutlineExclamationCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <motion.div variants={fadeUp} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gold-500/60 tracking-[0.1em] uppercase mb-2">Email</label>
                  <div className="relative group">
                    <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30 group-focus-within:text-gold-500 transition-colors z-10" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 pl-11 pr-4 bg-dark-950/80 border border-gold-500/20 text-gold-400 text-sm outline-none transition-all duration-200 focus:bg-dark-900 focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/10 placeholder:text-gold-500/20"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gold-500/60 tracking-[0.1em] uppercase mb-2">Password</label>
                  <div className="relative group">
                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30 group-focus-within:text-gold-500 transition-colors z-10" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 pl-11 pr-12 bg-dark-950/80 border border-gold-500/20 text-gold-400 text-sm outline-none transition-all duration-200 focus:bg-dark-900 focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/10 placeholder:text-gold-500/20"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gold-500/30 hover:text-gold-500 transition-colors hover:bg-gold-500/10"
                    >
                      {showPassword ? <HiOutlineEyeOff className="w-4 h-4" /> : <HiOutlineEye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="peer sr-only" />
                      <div className="w-4 h-4 border border-gold-500/20 transition-colors peer-checked:bg-gold-500 peer-checked:border-gold-500 peer-focus:ring-2 peer-focus:ring-gold-500/20" />
                      <svg className="absolute inset-0 w-4 h-4 text-dark-950 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gold-500/40 group-hover:text-gold-500 transition-colors">Remember me</span>
                  </label>
                  <Link href="/auth/forgot-password" className="text-sm text-gold-500 hover:text-gold-400 transition-colors font-bold">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gold-500 text-dark-950 text-xs tracking-[0.1em] uppercase font-bold
                             transition-all duration-300 disabled:opacity-50 flex items-center justify-center
                             hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20"
                >
                  {loading ? (
                    <span className="flex items-center gap-2.5">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing in...
                    </span>
                  ) : 'Sign In'}
                </button>
              </motion.div>
            </form>

            <motion.div variants={fadeUp} className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gold-500/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-dark-900/60 text-[10px] text-gold-500/30 tracking-[0.1em] uppercase">or continue with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full mt-5 h-12 border border-gold-500/20 text-gold-500/60 text-sm font-bold
                           transition-all duration-200 flex items-center justify-center gap-3
                           hover:border-gold-500/40 hover:bg-gold-500/5"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Google</span>
              </button>
            </motion.div>

            <motion.p variants={fadeUp} className="text-center text-sm text-gold-500/40 mt-8">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-gold-500 font-bold hover:text-gold-400 transition-colors">
                Create one
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
