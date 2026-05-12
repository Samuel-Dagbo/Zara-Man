'use client';

export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-espresso tracking-wide uppercase">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border border-luxury-200 bg-white rounded-none
          focus:ring-2 focus:ring-gold-500 focus:border-gold-500 
          transition-all duration-200 outline-none text-espresso
          placeholder:text-luxury-400 ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
