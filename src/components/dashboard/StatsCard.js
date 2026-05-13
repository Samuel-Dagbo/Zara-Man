'use client';

import { motion } from 'framer-motion';

export default function StatsCard({ title, value, icon: Icon, color = 'gold', subtitle }) {
  const colors = {
    gold: 'bg-gradient-to-br from-gold-500/20 to-gold-500/5 text-gold-600',
    blue: 'bg-gradient-to-br from-blue-500/20 to-blue-500/5 text-blue-600',
    green: 'bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 text-emerald-600',
    purple: 'bg-gradient-to-br from-purple-500/20 to-purple-500/5 text-purple-600',
    red: 'bg-gradient-to-br from-red-500/20 to-red-500/5 text-red-600',
    yellow: 'bg-gradient-to-br from-amber-500/20 to-amber-500/5 text-amber-600',
    wine: 'bg-gradient-to-br from-red-800/20 to-red-800/5 text-red-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-card p-6 group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-luxury-500 tracking-wider uppercase font-medium">{title}</p>
          <p className="font-display text-3xl font-bold text-espresso mt-2 group-hover:text-gold-600 transition-colors">{value}</p>
          {subtitle && <p className="text-xs text-luxury-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${colors[color]} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}
