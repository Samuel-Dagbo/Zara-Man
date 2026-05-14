'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineCheck, HiOutlineSparkles } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
        toast.success('Subscribed successfully!');
      } else {
        toast.error(data.error || 'Failed to subscribe');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-28 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-gradient-radial from-gold-500/8 to-transparent rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-gold-500/5 to-transparent rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.03)_0%,_transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="inline-flex mb-6"
          >
            <HiOutlineSparkles className="w-8 h-8 text-gold-500/60" />
          </motion.div>
          
          <span className="text-gold-500 tracking-[0.3em] uppercase text-xs font-bold">Stay Connected</span>
          
          <h2 className="font-display text-4xl md:text-5xl text-gold-500 font-bold mt-6 mb-4 leading-tight">
            Join the Circle
          </h2>
          <p className="text-gold-500/50 text-base mb-10 max-w-lg mx-auto leading-relaxed">
            Subscribe to receive exclusive offers, early access to new collections, and style inspiration.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-4 bg-dark-900/60 backdrop-blur-sm border border-gold-500/20 px-8 py-6"
            >
              <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20">
                <HiOutlineCheck className="w-6 h-6 text-gold-500" />
              </div>
              <div className="text-left">
                <p className="text-gold-500 font-display text-lg font-bold">You&apos;re In!</p>
                <p className="text-gold-500/40 text-xs tracking-wider uppercase">Welcome to the exclusive circle.</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="flex-1 relative group">
                <HiOutlineMail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500/30 group-focus-within:text-gold-500 transition-colors duration-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-14 pr-6 py-4 bg-dark-900/80 border border-gold-500/20 text-gold-400 
                           placeholder:text-gold-500/30 focus:outline-none focus:border-gold-500/50 
                           transition-all duration-300 text-sm focus:bg-dark-900"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-gold-500 text-dark-950 px-10 py-4 tracking-[0.2em] uppercase text-xs 
                           font-bold hover:bg-gold-400 transition-all duration-300 whitespace-nowrap
                           relative overflow-hidden group/btn shadow-lg shadow-gold-500/20"
              >
                <span className="relative z-10">{loading ? 'Subscribing...' : 'Subscribe'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
