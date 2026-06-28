"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/scan", label: "Scan" },
  { href: "/subscriptions", label: "Subscriptions" },
  { href: "/settings", label: "Settings" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="h-16 border-b border-[var(--border)] sticky top-0 z-50 bg-white/92 backdrop-blur-xl">
      <div className="max-w-[1200px] mx-auto px-8 flex items-center h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[var(--text-primary)] tracking-tight no-underline">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] inline-block" />
          SubSnoop
        </Link>

        {/* Links */}
        <div className="flex gap-8 ml-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium no-underline transition-colors relative ${
                pathname === link.href
                  ? "text-[var(--text-primary)] after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-[2px] after:bg-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(0,168,126,0.1)] text-[var-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            LHV Connected
          </span>
          <Button size="sm">+ Add Bank</Button>
        </div>
      </div>
    </nav>
  );
}
