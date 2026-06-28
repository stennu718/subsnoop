"use client";

import { useState } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="h-16 border-b border-[var(--border)] sticky top-0 z-50 bg-white/92 backdrop-blur-xl"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex items-center h-full">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-[var(--text-primary)] tracking-tight no-underline"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] inline-block" />
          SubSnoop
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 ml-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium no-underline transition-colors relative ${
                pathname === link.href
                  ? "text-[var(--text-primary)] after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-[2px] after:bg-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger Button (mobile) */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden ml-auto w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-[var(--surface)] transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-[var(--text-primary)] transition-transform ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[var(--text-primary)] transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[var(--text-primary)] transition-transform ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>

        {/* Right side (desktop only) */}
        <div className="hidden md:flex ml-auto items-center gap-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(0,168,126,0.1)] text-[var(--success)] text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            LHV Connected
          </span>
          <Button size="sm">+ Add Bank</Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-[var(--border)] z-40 shadow-lg">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-6 py-4 text-sm font-medium no-underline border-b border-[var(--border)] last:border-0 transition-colors ${
                  pathname === link.href
                    ? "text-[var(--text-primary)] bg-[var(--surface-2)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface)]"
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-6 py-4">
              <Button size="sm" className="w-full">
                + Add Bank
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
