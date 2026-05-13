'use client';

import { motion } from 'framer-motion';

export default function StatsCard({ title, value, icon: Icon, color = 'gold', subtitle }) {
  const colors = {
    gold: 'bg-gold-500/10 text-gold-600',
    blue: 'bg-blue-500/10 text-blue-600',
    green: 'bg-green-500/10 text-green-600',
    purple: 'bg-purple-500/10 text-purple-600',
    red: 'bg-red-500/10 text-red-600',
    yellow: 'bg-yellow-500/10 text-yellow-600',
    wine: 'bg-red-800/10 text-red-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-luxury-100 p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-luxury-500 tracking-wider uppercase">{title}</p>
          <p className="font-display text-3xl font-bold text-espresso mt-2">{value}</p>
          {subtitle && <p className="text-xs text-luxury-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}
