'use client';

export default function LoadingSpinner({ size = 'md' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={`${sizes[size]} border border-dark-700/60 border-t-gold-500 rounded-full animate-spin`}
    />
  );
}
