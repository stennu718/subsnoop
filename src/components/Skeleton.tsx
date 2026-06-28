"use client";

export function StatCardSkeleton() {
  return (
    <div className="border border-[var(--border)] rounded-[20px] bg-white p-6">
      <div className="shimmer h-3 w-20 rounded mb-3" />
      <div className="shimmer h-7 w-28 rounded mb-2" />
      <div className="shimmer h-3 w-32 rounded" />
    </div>
  );
}

export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function SubscriptionRowSkeleton() {
  return (
    <div className="flex items-center py-4 px-6 border-b border-[var(--border)] last:border-0">
      <div className="shimmer w-10 h-10 rounded-lg shrink-0" />
      <div className="ml-4 flex-1 min-w-0 space-y-2">
        <div className="shimmer h-4 w-32 rounded" />
        <div className="shimmer h-3 w-48 rounded" />
      </div>
      <div className="shimmer h-5 w-16 rounded-full ml-4" />
      <div className="ml-4 shrink-0 space-y-1 text-right">
        <div className="shimmer h-4 w-16 rounded" />
        <div className="shimmer h-3 w-8 rounded" />
      </div>
    </div>
  );
}

export function SubscriptionListSkeleton() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, i) => (
        <SubscriptionRowSkeleton key={i} />
      ))}
    </div>
  );
}
