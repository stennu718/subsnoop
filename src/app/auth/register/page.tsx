"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { CardBody } from "@/components/Card";
import { register } from "@/lib/api";

type Status = "idle" | "loading" | "success" | "error";

interface FormErrors {
  email?: string;
  password?: string;
  confirm?: string;
  general?: string;
}

function validate(email: string, password: string, confirm: string): FormErrors {
  const errors: FormErrors = {};
  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "Enter a valid email address";
  }
  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  if (password && confirm !== password) {
    errors.confirm = "Passwords do not match";
  }
  return errors;
}

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = validate(email, password, confirm);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setStatus("idle");
    setErrors({});
    setStatus("loading");

    register({ email: email.trim(), password })
      .then(() => {
        setStatus("success");
        // Brief pause so the user sees the success state before redirect.
        setTimeout(() => router.push("/"), 1400);
      })
      .catch((err) => {
        setStatus("error");
        setErrors({ general: err?.message ?? "Something went wrong" });
      });
  }

  const disabled = status === "loading" || status === "success";

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
      <p className="text-sm text-[var(--text-secondary)] mt-2">
        Find your forgotten subscriptions in 30 seconds.
      </p>

      {status === "success" ? (
        <div className="mt-8 rounded-xl bg-[rgba(0,168,126,0.08)] border border-[rgba(0,168,126,0.3)] px-5 py-4">
          <p className="font-medium text-[var(--success)]">Account created 🎉</p>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Redirecting you to your dashboard…
          </p>
        </div>
      ) : (
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
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1.5"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
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

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirm"
              className="block text-sm font-medium mb-1.5"
            >
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter your password"
              aria-invalid={!!errors.confirm}
              aria-describedby={errors.confirm ? "confirm-error" : undefined}
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-[var(--text-muted)] transition-colors focus:outline-none focus:border-[var(--accent)] ${
                errors.confirm
                  ? "border-[var(--danger)]"
                  : "border-[var(--border)]"
              }`}
            />
            {errors.confirm && (
              <p
                id="confirm-error"
                className="text-xs text-[var(--danger)] mt-1.5"
              >
                {errors.confirm}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={disabled}
          >
            {status === "loading" ? "Creating account…" : "Create account"}
          </Button>
        </form>
      )}

      <p className="text-sm text-[var(--text-secondary)] text-center mt-6">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-[var(--accent)] font-medium hover:underline no-underline"
        >
          Sign in →
        </Link>
      </p>
    </>
  );
}
