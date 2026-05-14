'use client';

export default function Skeleton({ className = '' }) {
  return (
    <div
      className={`bg-dark-800/60 animate-pulse ${className}`}
    />
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="p-6 space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 animate-pulse">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-4 bg-dark-800/60 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="bg-dark-900/60 border border-dark-700/40 p-6 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div className="h-3 bg-dark-800/60 w-20" />
          <div className="h-8 bg-dark-800/60 w-16" />
        </div>
        <div className="w-12 h-12 bg-dark-800/60" />
      </div>
    </div>
  );
}
