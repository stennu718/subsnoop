"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { login } from "@/lib/api";

type Status = "idle" | "loading" | "error";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

function validate(email: string, password: string): FormErrors {
  const errors: FormErrors = {};
  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "Enter a valid email address";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  return errors;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = validate(email, password);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setStatus("loading");
    setErrors({});

    login({ email: email.trim(), password })
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        setStatus("error");
        // Map 401/403 to a friendly message.
        const code = err?.status;
        if (code === 401 || code === 403) {
          setErrors({ general: "Incorrect email or password. Please try again." });
        } else {
          setErrors({ general: err?.message ?? "Something went wrong" });
        }
      });
  }

  const disabled = status === "loading";

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      <p className="text-sm text-[var(--text-secondary)] mt-2">
        Sign in to see your subscriptions.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        {errors.general && (
          <div
            role="alert"
            className="rounded-xl bg-[rgba(226,59,74,0.08)] border border-[rgba(226,59,74,0.3)] px-5 py-3 text-sm font-medium text-[var(--danger)]"
          >
            {errors.general}
          </div>
        )}

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-[var(--text-muted)] transition-colors focus:outline-none focus:border-[var(--accent)] ${
              errors.email ? "border-[var(--danger)]" : "border-[var(--border)]"
            }`}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-[var(--danger)] mt-1.5">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Link
              href="/auth/login"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] no-underline"
            >
              Forgot?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-[var(--text-muted)] transition-colors focus:outline-none focus:border-[var(--accent)] ${
              errors.password
                ? "border-[var(--danger)]"
                : "border-[var(--border)]"
            }`}
          />
          {errors.password && (
            <p
              id="password-error"
              className="text-xs text-[var(--danger)] mt-1.5"
            >
              {errors.password}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={disabled}
        >
          {status === "loading" ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="text-sm text-[var(--text-secondary)] text-center mt-6">
        No account yet?{" "}
        <Link
          href="/auth/register"
          className="text-[var(--accent)] font-medium hover:underline no-underline"
        >
          Create one →
        </Link>
      </p>
    </>
  );
}
