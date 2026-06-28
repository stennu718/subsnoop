"use client";

import { ReactNode } from "react";

type BadgeVariant = "active" | "soon" | "irregular";

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  active: "bg-[rgba(0,168,126,0.1)] text-[var(--success)]",
  soon: "bg-[rgba(238,126,0,0.1)] text-[var(--warning)]",
  irregular: "bg-[rgba(79,79,79,0.1)] text-[var(--text-muted)]",
};

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-[0.3px] uppercase ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
