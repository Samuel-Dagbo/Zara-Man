'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-display font-bold text-gold-500/20 mb-4">!</div>
        <h1 className="text-3xl font-display font-bold text-gold-500 mb-3">Something Went Wrong</h1>
        <p className="text-gold-500/50 text-sm mb-8 leading-relaxed">
          An unexpected error occurred. Please try again.
        </p>
        <button onClick={reset} className="btn-primary text-xs">
          Try Again
        </button>
      </div>
    </div>
  );
}
