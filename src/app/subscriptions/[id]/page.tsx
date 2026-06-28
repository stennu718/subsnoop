"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/Button";

const mockDetail = {
  name: "Adobe Creative Cloud",
  iconBg: "#FF0000",
  iconLetter: "A",
  plan: "All Apps plan",
  billing: "Monthly",
  firstCharged: "Apr 8, 2024",
  lastCharged: "Jun 8, 2026",
  nextRenewal: "Jul 8, 2026",
  daysUntil: 10,
  totalTracking: "2 years, 2 months",
  totalSpent: "€1,439.76",
  yearlyCost: "€719.88",
  weeklyEquivalent: "€13.84",
  rank: "#1 (39% of total)",
  costTrend: "↑ 12%",
  confidence: "High (50 cycles)",
};

const mockTransactions = [
  { date: "Jun 8, 2026", amount: "€59.99", source: "LHV · TXN-8842", charged: true },
  { date: "May 8, 2026", amount: "€59.99", source: "LHV · TXN-8790", charged: true },
  { date: "Apr 8, 2026", amount: "€59.99", source: "LHV · TXN-8712", charged: true },
  { date: "Mar 8, 2026", amount: "€59.99", source: "LHV · TXN-8644", charged: true },
];

export default function SubscriptionDetailPage() {
  const [tracked, setTracked] = useState(true);

  return (
    <div className="flex flex-col min-h-full">
      <Navigation />

      <main id="main-content" className="flex-1 max-w-[900px] w-full mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-6 no-underline">
          ← Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-start gap-6 mb-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0"
            style={{ background: mockDetail.iconBg }}
          >
            {mockDetail.iconLetter}
          </div>
          <div className="flex-1">
            <div className="text-[28px] font-semibold tracking-[-0.56px] leading-tight">
              {mockDetail.name}
            </div>
            <div className="text-[15px] text-[var(--text-secondary)] mt-1">
              {mockDetail.plan} · {mockDetail.billing} billing
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-[0.3px] uppercase bg-[rgba(0,168,126,0.1)] text-[var(--success)] mt-2">
              Active
            </span>
          </div>
          <div className="text-right">
            <div className="text-[36px] font-bold tracking-[-0.72px] leading-none">
              59,99 €
            </div>
            <div className="text-sm text-[var(--text-muted)] mt-1">
              Renews every 1st of the month
            </div>
            <div className="flex gap-2 mt-3 justify-end">
              <Button variant="ghost" size="sm" aria-label="Open Adobe account">
                Open in Adobe
              </Button>
              <Button variant="outline-danger" size="sm" onClick={() => setTracked(!tracked)} aria-label={tracked ? "Cancel tracking this subscription" : "Resume tracking this subscription"}>
                {tracked ? "Cancel Track" : "Resume Tracking"}
              </Button>
            </div>
          </div>
        </div>

        {/* Detail Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left: Info */}
          <div className="border border-[var(--border)] rounded-[20px] p-6">
            <div className="text-[14px] font-semibold uppercase tracking-[0.4px] text-[var(--text-muted)] mb-4">
              Subscription Info
            </div>
            {[
              { key: "Plan", val: mockDetail.plan },
              { key: "Billing Cycle", val: mockDetail.billing },
              { key: "First Charged", val: mockDetail.firstCharged },
              { key: "Last Charged", val: mockDetail.lastCharged },
              { key: "Next Renewal", val: `${mockDetail.nextRenewal} — in ${mockDetail.daysUntil} days`, accent: true },
              { key: "Total Time Tracking", val: mockDetail.totalTracking },
              { key: "Total Spent", val: mockDetail.totalSpent },
            ].map((row) => (
              <div key={row.key} className="flex justify-between items-center py-3 border-b border-[var(--border)] last:border-0">
                <span className="text-sm text-[var(--text-secondary)]">{row.key}</span>
                <span className={`text-sm font-semibold ${row.accent ? "text-[var(--warning)]" : ""}`}>
                  {row.val}
                </span>
              </div>
            ))}
          </div>

          {/* Right: Cost Analysis */}
          <div className="border border-[var(--border)] rounded-[20px] p-6">
            <div className="text-[14px] font-semibold uppercase tracking-[0.4px] text-[var(--text-muted)] mb-4">
              Cost Analysis
            </div>
            {[
              { key: "Yearly Cost", val: mockDetail.yearlyCost },
              { key: "Weekly Equivalent", val: mockDetail.weeklyEquivalent },
              { key: "Rank by Cost", val: mockDetail.rank },
              { key: "Cost Trend", val: mockDetail.costTrend, danger: true },
              { key: "Usage Confidence", val: mockDetail.confidence },
            ].map((row) => (
              <div key={row.key} className="flex justify-between items-center py-3 border-b border-[var(--border)] last:border-0">
                <span className="text-sm text-[var(--text-secondary)]">{row.key}</span>
                <span className={`text-sm font-semibold ${row.danger ? "text-[var(--danger)]" : ""}`}>
                  {row.val}
                </span>
              </div>
            ))}

            {/* Savings Tip */}
            <div className="flex gap-3 p-4 rounded-xl border border-[rgba(238,126,0,0.2)] bg-[rgba(238,126,0,0.05)] mt-4">
              <div className="w-6 h-6 rounded-full bg-[var(--warning)] text-white flex items-center justify-center text-[13px] font-bold shrink-0">
                !
              </div>
              <div>
                <div className="text-[14px] font-semibold">Save €120/year</div>
                <div className="text-[13px] text-[var(--text-secondary)] mt-1 leading-relaxed">
                  Switch to annual billing (€54.78/mo) to save 10%. Or consider Photography Plan at €11.99/mo if you only need Photoshop + Lightroom.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Timeline */}
        <div className="border border-[var(--border)] rounded-[20px] p-6 mt-6">
          <div className="text-[14px] font-semibold uppercase tracking-[0.4px] text-[var(--text-muted)] mb-4">
            Billing History
          </div>
          <div className="relative pl-6">
            <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-[var(--border)]" />
            {mockTransactions.map((tx, i) => (
              <div key={i} className="flex items-start gap-5 py-3 relative">
                <div className="absolute left-[-18px] w-[18px] h-[18px] rounded-full bg-[var(--success)] border-4 border-white" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{tx.date}</div>
                  <div className="text-[16px] font-bold mt-0.5">{tx.amount}</div>
                  <div className="text-[12px] text-[var(--text-muted)] mt-0.5">{tx.source}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-[var(--border)]">
            <button aria-label="Show all billing history transactions" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              Show All
            </button>
            <span className="text-[12px] text-[var(--text-muted)]">Showing 4 of 26</span>
          </div>
        </div>

        {/* Renewal Calendar */}
        <div className="border border-[var(--border)] rounded-[20px] p-6 mt-6">
          <div className="text-[14px] font-semibold uppercase tracking-[0.4px] text-[var(--text-muted)] mb-4">
            Renewal Calendar
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["Jun 2026", "Jul 2026"].map((month) => (
              <div key={month}>
                <div className="text-[13px] font-semibold mb-2">{month}</div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {["E", "T", "K", "N", "R", "L", "P"].map((d, i) => (
                    <div key={i} className="text-[10px] text-[var(--text-muted)] py-1">
                      {d}
                    </div>
                  ))}
                  {Array.from({ length: 30 }, (_, i) => {
                    const day = i + 1;
                    const isCharged = month === "Jun 2026" && day === 8;
                    const isUpcoming = month === "Jul 2026" && day === 8;
                    return (
                      <div
                        key={i}
                        className={`text-[12px] py-1 rounded ${
                          isCharged
                            ? "bg-[var(--success)] text-white"
                            : isUpcoming
                            ? "bg-[var(--warning)] text-white"
                            : ""
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3 text-[12px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[var(--success)] rounded-sm inline-block" /> Charged
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[var(--warning)] rounded-sm inline-block" /> Upcoming
            </span>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border border-[rgba(226,59,74,0.2)] rounded-[20px] p-6 mt-6 bg-[rgba(226,59,74,0.02)]">
          <div className="text-[16px] font-semibold text-[var(--danger)] mb-2">
            Stop Tracking
          </div>
          <div className="text-sm text-[var(--text-secondary)] mb-4">
            This will stop notifications and remove from dashboard. You can re-add anytime.
          </div>
          <Button variant="outline-danger" size="sm">Remove from SubSnoop</Button>
        </div>
      </main>
    </div>
  );
}
