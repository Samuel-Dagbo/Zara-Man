'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineCheck } from 'react-icons/hi';

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
    <section className="py-24 bg-espresso relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 border border-gold-500/20 rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border border-gold-500/20 rounded-full" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-gold-500 tracking-[0.3em] uppercase text-sm">Stay Connected</span>
          <h2 className="font-display text-4xl md:text-5xl text-cream font-bold mt-4 mb-4">
            Join the Boutique Circle
          </h2>
          <p className="text-luxury-300 text-lg mb-8">
            Subscribe to receive exclusive offers, early access to new collections, and style inspiration.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 text-gold-500"
            >
              <HiOutlineCheck className="w-8 h-8" />
              <span className="text-lg">Thank you for subscribing!</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1 relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-luxury-600 text-cream 
                             placeholder:text-luxury-500 focus:outline-none focus:border-gold-500 
                             transition-colors rounded-none"
                />
              </div>
              <button
                type="submit"
                className="bg-gold-500 text-espresso px-8 py-4 tracking-wider uppercase text-sm 
                           font-medium hover:bg-gold-600 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
