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
    <div className="min-h-screen flex bg-cream pt-20 lg:pt-0">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-espresso via-espresso/95 to-espresso/90 z-10" />
        <img
          src="https://images.pexels.com/photos/29239014/pexels-photo-29239014.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/15 via-transparent to-transparent z-20" />
        <div className="relative z-30 text-center px-12">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}>
            <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-8" />
            <h2 className="font-display text-5xl font-bold text-cream leading-tight">Join Us</h2>
            <p className="text-cream/50 mt-4 text-lg max-w-md mx-auto leading-relaxed">
              Become part of our exclusive fashion community for gentlemen.
            </p>
            <div className="w-12 h-0.5 bg-gold-500/50 mx-auto mt-8" />
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
          <Link
            href="/"
            className="font-display text-2xl sm:text-3xl font-bold text-espresso tracking-[0.15em] block mb-10 lg:mb-12 hover:text-gold-600 transition-colors"
          >
            ZARA MAN 247
          </Link>

          <motion.div variants={stagger} initial="initial" animate="animate" className="bg-white rounded-2xl shadow-xl shadow-luxury-100/50 border border-luxury-100 p-8 sm:p-10">
            <motion.div variants={fadeUp} className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-espresso">Create account</h1>
              <p className="text-luxury-500 mt-2 text-sm sm:text-base">Join us and start your style journey.</p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-3"
              >
                <HiOutlineExclamationCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-4">
                <motion.div variants={fadeUp}>
                  <label className="block text-xs font-semibold text-luxury-600 tracking-[0.1em] uppercase mb-2">Full Name</label>
                  <div className="relative group">
                    <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-300 group-focus-within:text-gold-500 transition-colors z-10" />
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full h-12 pl-11 pr-4 bg-luxury-50 border border-luxury-200 rounded-xl text-espresso text-sm outline-none transition-all duration-200 focus:bg-white focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 placeholder:text-luxury-300"
                      placeholder="John Doe"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label className="block text-xs font-semibold text-luxury-600 tracking-[0.1em] uppercase mb-2">Email</label>
                  <div className="relative group">
                    <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-300 group-focus-within:text-gold-500 transition-colors z-10" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full h-12 pl-11 pr-4 bg-luxury-50 border border-luxury-200 rounded-xl text-espresso text-sm outline-none transition-all duration-200 focus:bg-white focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 placeholder:text-luxury-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label className="block text-xs font-semibold text-luxury-600 tracking-[0.1em] uppercase mb-2">Password</label>
                  <div className="relative group">
                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-300 group-focus-within:text-gold-500 transition-colors z-10" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full h-12 pl-11 pr-12 bg-luxury-50 border border-luxury-200 rounded-xl text-espresso text-sm outline-none transition-all duration-200 focus:bg-white focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 placeholder:text-luxury-300"
                      placeholder="At least 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-luxury-300 hover:text-espresso transition-colors rounded-lg hover:bg-luxury-100"
                    >
                      {showPassword ? <HiOutlineEyeOff className="w-4 h-4" /> : <HiOutlineEye className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label className="block text-xs font-semibold text-luxury-600 tracking-[0.1em] uppercase mb-2">Confirm Password</label>
                  <div className="relative group">
                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-300 group-focus-within:text-gold-500 transition-colors z-10" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      className="w-full h-12 pl-11 pr-12 bg-luxury-50 border border-luxury-200 rounded-xl text-espresso text-sm outline-none transition-all duration-200 focus:bg-white focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 placeholder:text-luxury-300"
                      placeholder="Repeat your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-luxury-300 hover:text-espresso transition-colors rounded-lg hover:bg-luxury-100"
                    >
                      {showConfirmPassword ? <HiOutlineEyeOff className="w-4 h-4" /> : <HiOutlineEye className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-espresso text-cream text-sm tracking-[0.1em] uppercase font-semibold rounded-xl
                               transition-all duration-300 disabled:opacity-50 flex items-center justify-center
                               hover:bg-gold-500 hover:text-espresso hover:shadow-lg hover:shadow-gold-500/20 active:scale-[0.98]"
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

            <motion.p variants={fadeUp} className="text-center text-sm text-luxury-400 mt-8">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-espresso font-semibold hover:text-gold-600 transition-colors">
                Sign in
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
