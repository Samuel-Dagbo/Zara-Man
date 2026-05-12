'use client';

import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'px-8 py-3 rounded-none font-medium tracking-wider uppercase text-sm transition-all duration-300 inline-flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-espresso text-cream hover:bg-gold-500 hover:text-espresso',
    secondary: 'border-2 border-espresso text-espresso hover:bg-espresso hover:text-cream',
    gold: 'bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-600 hover:to-gold-700 shadow-lg hover:shadow-xl',
    ghost: 'text-espresso hover:bg-luxury-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
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
