import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Welcome to SubSnoop",
  description: "Create an account or sign in to SubSnoop.",
};

/** SubSnoop wordmark — shared by both auth pages. */
function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 no-underline group mb-8"
      aria-label="SubSnoop home"
    >
      <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] inline-block group-hover:opacity-80 transition-opacity" />
      <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
        SubSnoop
      </span>
    </Link>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex items-center justify-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="border border-[var(--border)] rounded-[20px] bg-white px-6 sm:px-10 py-8 sm:py-10">
          <Logo />
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[var(--text-muted)] mt-8">
          By continuing you agree to our{" "}
          <Link
            href="/legal/terms"
            className="text-[var(--accent)] hover:underline no-underline"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/legal/privacy"
            className="text-[var(--accent)] hover:underline no-underline"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
