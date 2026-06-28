"use client";

import { Badge } from "./Badge";

interface Subscription {
  id: string;
  name: string;
  iconBg: string;
  iconLetter: string;
  lastCharged: string;
  nextCharge: string;
  amount: number;
  period: "month" | "year";
  variant: "active" | "soon" | "irregular";
}

interface SubscriptionRowProps {
  subscription: Subscription;
  onClick?: () => void;
}

export function SubscriptionRow({ subscription, onClick }: SubscriptionRowProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center py-4 px-6 border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-2)] cursor-pointer transition-colors"
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold text-white shrink-0"
        style={{ background: subscription.iconBg }}
      >
        {subscription.iconLetter}
      </div>

      {/* Info */}
      <div className="ml-4 flex-1 min-w-0">
        <div className="text-[15px] font-medium text-[var(--text-primary)] truncate">
          {subscription.name}
        </div>
        <div className="text-[13px] text-[var(--text-muted)] mt-0.5">
          Last charged: {subscription.lastCharged} · Next: {subscription.nextCharge}
        </div>
      </div>

      {/* Badge */}
      <Badge variant={subscription.variant}>
        {subscription.variant === "active" ? "Active" : subscription.variant === "soon" ? "Unused?" : "Irregular"}
      </Badge>

      {/* Amount */}
      <div className="text-right ml-4 shrink-0">
        <div className="text-[15px] font-semibold text-[var(--text-primary)]">
          {subscription.amount.toFixed(2).replace(".", ",")} €
        </div>
        <div className="text-[12px] text-[var(--text-muted)]">
          /{subscription.period}
        </div>
      </div>
    </div>
  );
}
