"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardBody } from "@/components/Card";
import { Toggle } from "@/components/Toggle";
import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast";
import { EmptyState } from "@/components/EmptyState";

const connectedBanks = [
  { name: "LHV", color: "#0033A0", letter: "L", detail: "3 accounts", connected: true },
  { name: "Swedbank", color: "#00A651", letter: "S", detail: "2 accounts", connected: true },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="text-[14px] font-semibold uppercase tracking-[0.4px] text-[var(--text-muted)] mb-4">
        {title}
      </div>
      <Card>{children}</Card>
    </div>
  );
}

function SettingRow({
  name,
  desc,
  control,
}: {
  name: string;
  desc?: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-5 px-4 md:px-6 border-b border-[var(--border)] last:border-0">
      <div className="flex-1 mr-4">
        <div className="text-[15px] font-medium">{name}</div>
        {desc && <div className="text-[13px] text-[var(--text-muted)] mt-1">{desc}</div>}
      </div>
      {control}
    </div>
  );
}

export default function SettingsPage() {
  const [renewalAlerts, setRenewalAlerts] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);
  const [autoDetect, setAutoDetect] = useState(true);
  const [showNoBanks, setShowNoBanks] = useState(false);
  const { addToast } = useToast();

  const handleSave = () => {
    addToast("Settings saved successfully", "success");
  };

  return (
    <div className="flex flex-col min-h-full">
      <Navigation />

      <main id="main-content" className="flex-1 max-w-[720px] w-full mx-auto px-4 md:px-8 py-6 md:py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-[32px] font-semibold tracking-[-0.64px] leading-tight">
              Settings
            </h1>
            <p className="text-sm md:text-base text-[var(--text-secondary)] mt-1.5">
              Manage your subscription tracking preferences
            </p>
          </div>
          <Button onClick={handleSave} size="sm">
            Save Settings
          </Button>
        </div>

        {/* Connected Accounts */}
        <Section title="Connected Accounts">
          {showNoBanks ? (
            <EmptyState
              icon="🏦"
              title="No bank connections"
              description="Connect your bank to automatically detect subscriptions from your transactions."
              actionLabel="Connect Bank"
              onAction={() => {
                setShowNoBanks(false);
                addToast("Bank connection feature coming soon", "info");
              }}
            />
          ) : (
            <>
              {connectedBanks.map((bank) => (
                <div
                  key={bank.name}
                  className="flex items-center gap-3 py-5 px-4 md:px-6 border-b border-[var(--border)] last:border-0"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-[14px] font-bold text-white shrink-0"
                    style={{ background: bank.color }}
                  >
                    {bank.letter}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-medium">{bank.name}</div>
                    <div className="text-[13px] text-[var(--text-muted)] truncate">
                      {bank.connected ? `Connected via Open Banking · ${bank.detail}` : "Disconnected"}
                    </div>
                  </div>
                  {bank.connected && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(0,168,126,0.1)] text-[var(--success)] text-[12px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      Connected
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`${bank.connected ? "Disconnect" : "Connect"} ${bank.name}`}
                  >
                    {bank.connected ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              ))}
              {/* Add new */}
              <div className="flex items-center gap-3 py-5 px-4 md:px-6">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[16px] font-bold text-[var(--text-muted)] bg-[var(--surface)]">
                  +
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium">Add New Bank</div>
                  <div className="text-[13px] text-[var(--text-muted)]">Connect via Open Banking or upload CSV</div>
                </div>
                <Button variant="primary" size="sm" aria-label="Connect a new bank">
                  Connect
                </Button>
              </div>
              <div className="px-4 md:px-6 pb-4">
                <button
                  onClick={() => setShowNoBanks(true)}
                  aria-label="Show empty bank connections state demo"
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                >
                  [Demo: show empty state]
                </button>
              </div>
            </>
          )}
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
          <SettingRow
            name="Renewal Alerts"
            desc="Get notified 3 days before subscription renews"
            control={<Toggle checked={renewalAlerts} onChange={setRenewalAlerts} />}
          />
          <SettingRow
            name="Price Increase Alerts"
            desc="Notify when a subscription amount changes"
            control={<Toggle checked={priceAlerts} onChange={setPriceAlerts} />}
          />
          <SettingRow
            name="Weekly Summary"
            desc="Receive weekly email with subscription overview"
            control={<Toggle checked={weeklySummary} onChange={setWeeklySummary} />}
          />
          <SettingRow
            name="New Subscription Detection"
            desc="Auto-detect new subscriptions on bank sync"
            control={<Toggle checked={autoDetect} onChange={setAutoDetect} />}
          />
        </Section>

        {/* Detection Preferences */}
        <Section title="Detection Preferences">
          <SettingRow
            name="Detection Sensitivity"
            desc="How aggressively we detect subscriptions"
            control={
              <select
                className="px-3 py-2 border border-[var(--border)] rounded-lg text-sm font-medium bg-white cursor-pointer min-w-[160px]"
                aria-label="Detection sensitivity level"
              >
                <option>High (detect everything)</option>
                <option>Normal</option>
                <option>Conservative</option>
              </select>
            }
          />
          <SettingRow
            name="Minimum Amount"
            desc="Ignore charges below this amount"
            control={
              <select
                className="px-3 py-2 border border-[var(--border)] rounded-lg text-sm font-medium bg-white cursor-pointer min-w-[160px]"
                aria-label="Minimum charge amount to track"
              >
                <option>€0.00</option>
                <option>€1.00</option>
                <option>€2.99</option>
                <option>€5.00</option>
                <option>€10.00</option>
              </select>
            }
          />
          <SettingRow
            name="Scan Frequency"
            desc="How often we check for new transactions"
            control={
              <select
                className="px-3 py-2 border border-[var(--border)] rounded-lg text-sm font-medium bg-white cursor-pointer min-w-[160px]"
                aria-label="How often to scan for new transactions"
              >
                <option>Daily</option>
                <option>Every 6 hours</option>
                <option>Manual only</option>
              </select>
            }
          />
        </Section>

        {/* Data Management */}
        <Section title="Data Management">
          <SettingRow
            name="Export All Data"
            desc="Download all subscription data as CSV"
            control={
              <Button
                variant="outline"
                size="sm"
                onClick={() => addToast("Exporting data...", "info")}
              >
                Export CSV
              </Button>
            }
          />
          <SettingRow
            name="Purge Transaction Cache"
            desc="Remove cached bank data (keeps subscriptions)"
            control={
              <Button
                variant="outline"
                size="sm"
                onClick={() => addToast("Cache purged successfully", "success")}
              >
                Purge Cache
              </Button>
            }
          />
          <SettingRow
            name="Delete All Data"
            desc="Permanently delete all tracked subscriptions"
            control={
              <Button variant="outline-danger" size="sm">
                Delete All
              </Button>
            }
          />
        </Section>

        {/* Referral Program */}
        <Section title="Referral Program">
          <div className="p-6 bg-[var(--text-primary)] text-white rounded-none">
            <div className="text-[24px] font-bold tracking-[-0.48px] mb-2">
              Give €5, Get €5
            </div>
            <div className="text-sm opacity-80 leading-relaxed mb-5">
              Share SubSnoop with friends. They get €5 credit, you get €5 when they connect their first bank.
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                readOnly
                value="https://subsnoop.app/r/STEN718"
                aria-label="Your referral link"
                className="flex-1 px-4 py-2.5 rounded-full bg-[rgba(255,255,255,0.12)] text-white text-[13px] font-mono border-0 outline-none"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => addToast("Referral link copied!", "success")}
              >
                Copy Link
              </Button>
            </div>
          </div>
        </Section>

        {/* Current Plan */}
        <Section title="Current Plan">
          <div className="flex items-center justify-between py-5 px-4 md:px-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[16px] font-semibold">Free Plan</span>
                <span className="px-2 py-0.5 rounded-full bg-[var(--surface)] text-[11px] font-semibold uppercase">
                  Current
                </span>
              </div>
              <div className="text-[13px] text-[var(--text-muted)]">
                Up to 5 subscriptions · CSV import only · Basic detection
              </div>
            </div>
            <Button variant="primary" size="sm">
              Upgrade
            </Button>
          </div>
        </Section>
      </main>
    </div>
  );
}
