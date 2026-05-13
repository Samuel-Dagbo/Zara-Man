import Link from 'next/link';

export default function EmptyState({ icon: Icon, title, description, actionLabel, actionHref, onAction }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-luxury-100 to-luxury-50 flex items-center justify-center shadow-inner">
        {Icon && <Icon className="w-10 h-10 text-luxury-400" />}
      </div>
      <p className="font-display text-xl text-espresso mb-2">{title}</p>
      <p className="text-luxury-500 text-sm max-w-md mx-auto">{description}</p>
      {(actionHref || onAction) && (
        actionHref ? (
          <Link
            href={actionHref}
            onClick={onAction}
            className="mt-6 inline-block bg-espresso text-cream px-8 py-3 tracking-wider uppercase text-sm font-medium rounded-lg hover:bg-gold-500 hover:text-espresso transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="mt-6 bg-espresso text-cream px-8 py-3 tracking-wider uppercase text-sm font-medium rounded-lg hover:bg-gold-500 hover:text-espresso transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
}
