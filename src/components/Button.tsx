"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "outline-danger" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-[var(--text-primary)] text-white hover:opacity-85",
  secondary: "bg-[var(--surface)] text-[var(--text-primary)] hover:opacity-85",
  outline: "bg-transparent text-[var(--text-primary)] border-2 border-[var(--text-primary)]",
  "outline-danger": "bg-transparent text-[var(--danger)] border-2 border-[var(--danger)]",
  danger: "bg-[var(--danger)] text-white hover:opacity-85",
  ghost: "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3.5 py-1.5 text-[13px]",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium cursor-pointer transition-opacity active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
