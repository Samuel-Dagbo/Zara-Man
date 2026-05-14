'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineEye, HiOutlineEyeOff, HiOutlineExclamationCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.07 } },
};

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        toast.success('Account created! Please sign in.');
        router.push('/auth/signin');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-dark-950 pt-20 lg:pt-0">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/30 via-gold-600/20 to-gold-500/10 z-10" />
        <img
          src="https://images.pexels.com/photos/29239014/pexels-photo-29239014.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.2)_0%,_transparent_70%)] z-20" />
        <div className="relative z-30 text-center px-12">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}>
            <div className="w-16 h-px bg-gold-500 mx-auto mb-8" />
            <h2 className="font-display text-5xl font-bold text-gold-500 leading-tight">Join Us</h2>
            <p className="text-gold-500/50 mt-4 text-lg max-w-md mx-auto leading-relaxed">
              Become part of our exclusive fashion community for gentlemen.
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
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-gold-500">Create account</h1>
              <p className="text-gold-500/50 mt-2 text-sm">Join us and start your style journey.</p>
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
              <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-4">
                <motion.div variants={fadeUp}>
                  <label className="block text-xs font-bold text-gold-500/60 tracking-[0.1em] uppercase mb-2">Full Name</label>
                  <div className="relative group">
                    <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30 group-focus-within:text-gold-500 transition-colors z-10" />
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full h-12 pl-11 pr-4 bg-dark-950/80 border border-gold-500/20 text-gold-400 text-sm outline-none transition-all duration-200 focus:bg-dark-900 focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/10 placeholder:text-gold-500/20"
                      placeholder="John Doe"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label className="block text-xs font-bold text-gold-500/60 tracking-[0.1em] uppercase mb-2">Email</label>
                  <div className="relative group">
                    <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30 group-focus-within:text-gold-500 transition-colors z-10" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full h-12 pl-11 pr-4 bg-dark-950/80 border border-gold-500/20 text-gold-400 text-sm outline-none transition-all duration-200 focus:bg-dark-900 focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/10 placeholder:text-gold-500/20"
                      placeholder="your@email.com"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label className="block text-xs font-bold text-gold-500/60 tracking-[0.1em] uppercase mb-2">Password</label>
                  <div className="relative group">
                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30 group-focus-within:text-gold-500 transition-colors z-10" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full h-12 pl-11 pr-12 bg-dark-950/80 border border-gold-500/20 text-gold-400 text-sm outline-none transition-all duration-200 focus:bg-dark-900 focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/10 placeholder:text-gold-500/20"
                      placeholder="At least 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gold-500/30 hover:text-gold-500 transition-colors hover:bg-gold-500/10"
                    >
                      {showPassword ? <HiOutlineEyeOff className="w-4 h-4" /> : <HiOutlineEye className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label className="block text-xs font-bold text-gold-500/60 tracking-[0.1em] uppercase mb-2">Confirm Password</label>
                  <div className="relative group">
                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30 group-focus-within:text-gold-500 transition-colors z-10" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      className="w-full h-12 pl-11 pr-12 bg-dark-950/80 border border-gold-500/20 text-gold-400 text-sm outline-none transition-all duration-200 focus:bg-dark-900 focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/10 placeholder:text-gold-500/20"
                      placeholder="Repeat your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gold-500/30 hover:text-gold-500 transition-colors hover:bg-gold-500/10"
                    >
                      {showConfirmPassword ? <HiOutlineEyeOff className="w-4 h-4" /> : <HiOutlineEye className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="pt-2">
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
                        Creating account...
                      </span>
                    ) : 'Create Account'}
                  </button>
                </motion.div>
              </motion.div>
            </form>

            <motion.p variants={fadeUp} className="text-center text-sm text-gold-500/40 mt-8">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-gold-500 font-bold hover:text-gold-400 transition-colors">
                Sign in
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
