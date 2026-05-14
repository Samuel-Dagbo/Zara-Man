'use client';

import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'px-10 py-4 font-bold tracking-[0.15em] uppercase text-xs transition-all duration-500 inline-flex items-center justify-center gap-2 relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gold-500 text-dark-950 hover:bg-gold-400 hover:shadow-2xl hover:shadow-gold-500/40',
    secondary: 'border-2 border-gold-500/40 text-gold-500 hover:bg-gold-500 hover:text-dark-950 hover:border-gold-500 hover:shadow-xl hover:shadow-gold-500/20',
    gold: 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 hover:from-gold-400 hover:to-gold-500 shadow-lg hover:shadow-xl hover:shadow-gold-500/30',
    ghost: 'text-gold-500/60 hover:text-gold-400 hover:bg-gold-500/10 border border-transparent',
    danger: 'bg-red-600 text-white hover:bg-red-700 border border-red-500/20',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
