"use client";

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/Button";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { SubscriptionRow } from "@/components/SubscriptionRow";
import {
  subscriptions,
  stats,
  spendingTrend,
  categories,
  healthScore,
  upcomingAlerts,
} from "@/lib/mock-data";

function formatEur(value: number): string {
  return value.toFixed(2).replace(".", ",") + " €";
}

function StatCard({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  if (highlight) {
    return (
      <div className="bg-[var(--text-primary)] rounded-[20px] p-6">
        <div className="text-[13px] font-medium uppercase tracking-[0.4px] text-white/60 mb-2">
          {label}
        </div>
        <div className="text-[28px] font-semibold tracking-[-0.56px] text-white leading-tight">
          {value}
        </div>
        <div className="text-[13px] font-medium text-[var(--danger)] mt-1.5">
          {sub}
        </div>
      </div>
    );
  }
  return (
    <div className="border border-[var(--border)] rounded-[20px] bg-white p-6">
      <div className="text-[13px] font-medium uppercase tracking-[0.4px] text-[var(--text-muted)] mb-2">
        {label}
      </div>
      <div className="text-[28px] font-semibold tracking-[-0.56px] leading-tight">
        {value}
      </div>
      <div className="text-[13px] text-[var(--text-muted)] mt-1.5">{sub}</div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navigation />

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-8 py-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="text-[32px] font-semibold tracking-[-0.64px] leading-tight">
              Dashboard
            </h1>
            <p className="text-base text-[var(--text-secondary)] mt-1.5">
              Your subscription overview — June 2026
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary">Export CSV</Button>
            <Button>Scan Now</Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-5 mb-10">
          <StatCard
            label="Monthly Burn"
            value={formatEur(stats.monthlyBurn)}
            sub="↑ €12,99 vs last month"
            highlight
          />
          <StatCard
            label="Active Subscriptions"
            value={String(stats.activeCount)}
            sub="2 added this month"
          />
          <StatCard
            label="Yearly Estimate"
            value={formatEur(stats.yearlyEstimate)}
            sub="€152,88/mo average"
          />
          <StatCard
            label="Potential Savings"
            value={formatEur(stats.potentialSavings)}
            sub="3 unused subscriptions"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-[1fr_380px] gap-8">
          {/* Left: Subscription List */}
          <Card>
            <CardHeader>
              <span className="text-base font-semibold tracking-[-0.16px]">
                Active Subscriptions
              </span>
              <div className="flex gap-3">
                {["All", "Monthly", "Yearly"].map((f, i) => (
                  <button
                    key={f}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      i === 0
                        ? "bg-[var(--text-primary)] text-white"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </CardHeader>
            <div>
              {subscriptions.map((sub) => (
                <SubscriptionRow key={sub.id} subscription={sub} />
              ))}
            </div>
          </Card>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Health Score */}
            <Card>
              <CardBody className="text-center py-5">
                <div className="text-[14px] font-semibold uppercase tracking-[0.4px] text-[var(--text-muted)] mb-4">
                  Subscription Health
                </div>
                <div className="relative w-[120px] h-[120px] mx-auto mb-3">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="var(--border)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="var(--success)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="326.7"
                      strokeDashoffset={326.7 * (1 - healthScore / 100)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[28px] font-bold tracking-[-0.56px]">
                    {healthScore}%
                  </div>
                </div>
                <div className="text-[13px] text-[var(--text-muted)]">
                  Good — {subscriptions.filter((s) => s.variant === "soon").length} subscriptions may be unused
                </div>
              </CardBody>
            </Card>

            {/* Spending Trend */}
            <Card>
              <CardBody>
                <div className="text-[14px] font-semibold uppercase tracking-[0.4px] text-[var(--text-muted)] mb-4">
                  Spending Trend
                </div>
                <div className="flex items-end gap-2 h-32 py-4">
                  {spendingTrend.map((bar, i) => (
                    <div
                      key={bar.month}
                      className="flex-1 rounded-t cursor-pointer transition-opacity hover:opacity-80"
                      style={{
                        height: `${(bar.amount / 140) * 100}%`,
                        background: i >= 10 ? "var(--accent)" : "var(--text-primary)",
                        opacity: i >= 10 ? 0.7 : 0.15,
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {spendingTrend.map((bar) => (
                    <span key={bar.month} className="text-[10px] text-[var(--text-muted)] flex-1 text-center">
                      {bar.month}
                    </span>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Categories */}
            <Card>
              <CardBody>
                <div className="text-[14px] font-semibold uppercase tracking-[0.4px] text-[var(--text-muted)] mb-4">
                  By Category
                </div>
                <div>
                  {categories.map((cat) => (
                    <div
                      key={cat.name}
                      className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: cat.color }}
                        />
                        <span className="">{cat.name}</span>
                      </div>
                      <span className="text-sm font-semibold">
                        {formatEur(cat.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Upcoming Alerts */}
            <Card>
              <CardBody>
                <div className="text-[14px] font-semibold uppercase tracking-[0.4px] text-[var(--text-muted)] mb-4">
                  Upcoming Renewals
                </div>
                <div className="space-y-3">
                  {upcomingAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex gap-3 p-4 rounded-xl border border-[rgba(238,126,0,0.2)] bg-[rgba(238,126,0,0.05)]"
                    >
                      <div className="w-5 h-5 rounded-full bg-[var(--warning)] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                        !
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold">
                          {alert.title}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                          {alert.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
