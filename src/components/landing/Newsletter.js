'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineCheck, HiOutlineSparkles } from 'react-icons/hi';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-28 bg-espresso relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gradient-radial from-gold-500/8 to-transparent rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-gold-500/5 to-transparent rounded-full" />
        <div className="absolute top-20 -left-20 w-64 h-64 border border-gold-500/10 rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-80 h-80 border border-gold-500/10 rounded-full" />
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
          
          <span className="text-gold-500 tracking-[0.3em] uppercase text-sm font-medium">Stay Connected</span>
          
          <h2 className="font-display text-4xl md:text-5xl text-cream font-bold mt-6 mb-4 leading-tight">
            Join the Zara Man 247 Circle
          </h2>
          <p className="text-luxury-300 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Subscribe to receive exclusive offers, early access to new collections, and style inspiration.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-4 bg-white/5 border border-gold-500/20 px-8 py-6"
            >
              <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center">
                <HiOutlineCheck className="w-6 h-6 text-gold-500" />
              </div>
              <div className="text-left">
                <p className="text-gold-500 font-display text-xl font-semibold">You&apos;re In!</p>
                <p className="text-luxury-400 text-sm">Welcome to the Zara Man 247 circle.</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="flex-1 relative group">
                <HiOutlineMail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-500 group-focus-within:text-gold-500 transition-colors duration-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-14 pr-6 py-4 bg-white/5 border border-luxury-600 text-cream 
                             placeholder:text-luxury-500 focus:outline-none focus:border-gold-500 
                             transition-all duration-300 rounded-none text-sm focus:bg-white/10"
                />
              </div>
              <button
                type="submit"
                className="bg-gold-500 text-espresso px-10 py-4 tracking-[0.2em] uppercase text-sm 
                           font-medium hover:bg-gold-400 transition-all duration-300 whitespace-nowrap
                           relative overflow-hidden group/btn"
              >
                <span className="relative z-10">Subscribe</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
