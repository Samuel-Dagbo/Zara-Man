'use client';

export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-dark-300 tracking-[0.15em] uppercase mb-2">
          {label}
        </label>
      )}
      <input
        className={`input-field ${error ? 'input-field-error' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-[11px] text-red-400 tracking-wider">{error}</p>
      )}
    </div>
  );
}
