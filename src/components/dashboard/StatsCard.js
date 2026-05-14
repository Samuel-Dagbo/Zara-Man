'use client';

import { motion } from 'framer-motion';

export default function StatsCard({ title, value, icon: Icon, color = 'gold', subtitle }) {
  const colors = {
    gold: 'border-gold-500/20 text-gold-500 bg-gold-500/5',
    blue: 'border-blue-500/20 text-blue-400 bg-blue-500/5',
    green: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5',
    purple: 'border-purple-500/20 text-purple-400 bg-purple-500/5',
    red: 'border-red-500/20 text-red-400 bg-red-500/5',
    wine: 'border-rose-800/20 text-rose-400 bg-rose-800/5',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-card p-6 group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] text-dark-400 tracking-[0.2em] uppercase font-medium">{title}</p>
          <p className="font-display text-3xl font-bold text-white mt-2 group-hover:text-gold-500 transition-colors">{value}</p>
          {subtitle && <p className="text-[10px] text-dark-500 mt-1 tracking-wider">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 flex items-center justify-center border ${colors[color]} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}
