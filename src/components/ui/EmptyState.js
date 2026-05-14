'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EmptyState({ icon: Icon, title, description, actionLabel, actionHref, onAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 px-4"
    >
      {Icon && (
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-dark-700/60 flex items-center justify-center">
          <Icon className="w-8 h-8 text-dark-500" />
        </div>
      )}
      <h3 className="font-display text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-dark-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">{description}</p>
      {(actionLabel && actionHref) && (
        <Link
          href={actionHref}
          className="inline-block bg-gold-500 text-dark-950 px-8 py-3.5 tracking-[0.15em] uppercase text-xs font-semibold hover:bg-gold-400 transition-all duration-300"
        >
          {actionLabel}
        </Link>
      )}
      {(actionLabel && onAction) && (
        <button
          onClick={onAction}
          className="bg-gold-500 text-dark-950 px-8 py-3.5 tracking-[0.15em] uppercase text-xs font-semibold hover:bg-gold-400 transition-all duration-300"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
