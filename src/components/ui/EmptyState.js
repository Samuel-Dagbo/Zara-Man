import Link from 'next/link';

export default function EmptyState({ icon: Icon, title, description, actionLabel, actionHref, onAction }) {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-luxury-100 flex items-center justify-center">
        {Icon && <Icon className="w-10 h-10 text-luxury-400" />}
      </div>
      <p className="font-display text-xl text-espresso mb-2">{title}</p>
      <p className="text-luxury-500 text-sm max-w-md mx-auto">{description}</p>
      {actionHref && (
        <Link
          href={actionHref}
          onClick={onAction}
          className="mt-6 inline-block bg-espresso text-cream px-8 py-3 tracking-wider uppercase text-sm font-medium hover:bg-gold-500 hover:text-espresso transition-all duration-300"
        >
          {actionLabel}
        </Link>
      )}
      {!actionHref && onAction && (
        <button
          onClick={onAction}
          className="mt-6 bg-espresso text-cream px-8 py-3 tracking-wider uppercase text-sm font-medium hover:bg-gold-500 hover:text-espresso transition-all duration-300"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
