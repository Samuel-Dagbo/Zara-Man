'use client';

import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`bg-dark-900/60 border border-gold-500/10 backdrop-blur-sm hover:border-gold-500/30 transition-all duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}
