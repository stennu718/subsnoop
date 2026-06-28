"use client";

import { useState, useRef, DragEvent } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast";
import { EmptyState } from "@/components/EmptyState";

type ScanState = "upload" | "loading" | "results";

const banks = [
  { id: "lhv", name: "LHV", color: "#0033A0", letter: "L" },
  { id: "swedbank", name: "Swedbank", color: "#00A651", letter: "S", selected: true },
  { id: "seb", name: "SEB", color: "#003F7F", letter: "S" },
  { id: "coop", name: "Coop", color: "#E6007E", letter: "C" },
  { id: "luminor", name: "Luminor", color: "#6E4E9B", letter: "LU" },
  { id: "bigbank", name: "Bigbank", color: "#003F7F", letter: "B" },
];

const mockSubscriptions = [
  { name: "Netflix", iconBg: "#E50914", iconLetter: "N", amount: 15.99, variant: "monthly" as const },
  { name: "Spotify", iconBg: "#1DB954", iconLetter: "S", amount: 9.99, variant: "monthly" as const },
  { name: "GitHub Pro", iconBg: "#24292e", iconLetter: "G", amount: 4.0, variant: "monthly" as const },
  { name: "Adobe CC", iconBg: "#FF0000", iconLetter: "A", amount: 59.99, variant: "monthly" as const },
  { name: "YouTube Premium", iconBg: "#FF0000", iconLetter: "Y", amount: 11.99, variant: "irregular" as const },
  { name: "Telia 5G", iconBg: "#0099DE", iconLetter: "T", amount: 44.95, variant: "monthly" as const },
  { name: "Fitness360", iconBg: "#FF6B00", iconLetter: "F", amount: 29.99, variant: "unused" as const },
  { name: "Google One", iconBg: "#4285F4", iconLetter: "G", amount: 1.99, variant: "monthly" as const },
];

export default function ScanPage() {
  const [state, setState] = useState<ScanState>("upload");
  const [selectedBank, setSelectedBank] = useState("swedbank");
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  const handleScan = () => {
    setState("loading");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setState("results");
            addToast("Scan complete! Found 8 subscriptions.", "success");
          }, 300);
          return 100;
        }
        return p + 20;
      });
    }, 600);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(file.size);
      addToast(`File "${file.name}" ready to scan`, "info");
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.name.endsWith(".csv")) {
      setFileName(file.name);
      setFileSize(file.size);
      addToast(`File "${file.name}" uploaded successfully`, "success");
    } else {
      addToast("Please upload a .csv file", "error");
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  if (state === "loading") {
    return (
      <div className="flex flex-col min-h-full">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-20">
          {/* Skeleton shimmer instead of spinner */}
          <div className="shimmer w-12 h-12 rounded-full mb-6" />
          <div className="text-base font-medium text-[var(--text-primary)] mb-2">
            Scanning your transactions…
          </div>
          <div className="text-sm text-[var(--text-muted)]">
            Analyzing 847 transactions from the last 90 days
          </div>
          <div className="w-80 h-1 bg-[var(--border)] rounded-full mt-6 overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (state === "results") {
    return (
      <div className="flex flex-col min-h-full">
        <Navigation />
        <main id="main-content" className="flex-1 max-w-[800px] mx-auto px-4 md:px-8 py-16 text-center">
          <h1 className="text-3xl md:text-[40px] font-semibold tracking-[-0.8px] leading-tight">
            Found {mockSubscriptions.length} subscriptions!
          </h1>
          <p className="text-base md:text-lg text-[var(--text-secondary)] mt-3 max-w-md mx-auto">
            Here&apos;s what we detected in your transaction history. Review and save to track.
          </p>

          <div className="flex justify-center gap-10 mt-10 mb-10">
            <div>
              <div className="text-2xl md:text-[36px] font-bold tracking-[-0.72px]">
                €{mockSubscriptions.reduce((s, x) => s + x.amount, 0).toFixed(2).replace(".", ",")}
              </div>
              <div className="text-[13px] text-[var(--text-muted)] mt-1">Monthly total</div>
            </div>
            <div>
              <div className="text-2xl md:text-[36px] font-bold tracking-[-0.72px]">
                {mockSubscriptions.length}
              </div>
              <div className="text-[13px] text-[var(--text-muted)] mt-1">Subscriptions found</div>
            </div>
            <div>
              <div className="text-2xl md:text-[36px] font-bold tracking-[-0.72px]">
                €{(mockSubscriptions.reduce((s, x) => s + x.amount, 0) * 12).toFixed(0)}
              </div>
              <div className="text-[13px] text-[var(--text-muted)] mt-1">Yearly estimate</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="secondary">Review All</Button>
            <Button>Save to Dashboard</Button>
          </div>
        </main>
      </div>
    );
  }

  // Upload state
  return (
    <div className="flex flex-col min-h-full">
      <Navigation />

      <main id="main-content" className="flex-1 max-w-[800px] mx-auto px-4 md:px-8 py-8 md:py-16 text-center">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--success)] text-white flex items-center justify-center text-[13px] font-semibold">
              ✓
            </div>
            <span className="text-[13px] font-medium text-[var(--text-muted)]">Connect</span>
          </div>
          <div className="w-8 md:w-16 h-0.5 bg-[var(--success)] mx-1 md:mx-3" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--text-primary)] text-white flex items-center justify-center text-[13px] font-semibold">
              2
            </div>
            <span className="text-[13px] font-medium text-[var(--text-primary)]">Upload</span>
          </div>
          <div className="w-8 md:w-16 h-0.5 bg-[var(--border)] mx-1 md:mx-3" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--surface)] text-[var(--text-muted)] flex items-center justify-center text-[13px] font-semibold border-2 border-[var(--border)]">
              3
            </div>
            <span className="text-[13px] font-medium text-[var(--text-muted)]">Detect</span>
          </div>
          <div className="w-8 md:w-16 h-0.5 bg-[var(--border)] mx-1 md:mx-3" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--surface)] text-[var(--text-muted)] flex items-center justify-center text-[13px] font-semibold border-2 border-[var(--border)]">
              4
            </div>
            <span className="text-[13px] font-medium text-[var(--text-muted)]">Review</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-[40px] font-semibold tracking-[-0.8px] leading-tight">
          Upload your bank statement
        </h1>
        <p className="text-base md:text-lg text-[var(--text-secondary)] mt-3 max-w-md mx-auto">
          We scan your transactions and detect all recurring payments. Works with any Estonian bank.
        </p>

        {/* Bank Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-10">
          {banks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => setSelectedBank(bank.id)}
              aria-label={`Select ${bank.name} bank`}
              aria-pressed={selectedBank === bank.id}
              className={`flex items-center gap-3 p-4 md:p-5 border-2 rounded-xl cursor-pointer transition-all ${
                selectedBank === bank.id
                  ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-white"
                  : "border-[var(--border)] hover:border-[var(--text-primary)]"
              }`}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[16px] font-bold text-white shrink-0"
                style={{ background: selectedBank === bank.id ? "rgba(255,255,255,0.15)" : bank.color }}
              >
                {bank.letter}
              </div>
              <div className="text-left">
                <div className="text-[15px] font-semibold">{bank.name}</div>
                <div className={`text-[13px] ${selectedBank === bank.id ? "text-white/70" : "text-[var(--text-muted)]"}`}>
                  Connect via Open Banking
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* CSV Drag-and-Drop Upload Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload CSV file. Drag and drop or click to browse."
          className={`mt-8 border-2 rounded-[20px] p-8 md:p-12 cursor-pointer transition-all ${
            dragOver
              ? "border-[var(--success)] bg-[rgba(0,168,126,0.05)] scale-[1.01]"
              : fileName
              ? "border-[var(--success)] bg-[rgba(0,168,126,0.02)]"
              : "border-dashed border-[var(--border)] hover:border-[var(--accent)] hover:bg-[rgba(73,79,223,0.02)]"
          }`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          {fileName ? (
            <>
              <div className="text-3xl mb-3">📄</div>
              <div className="text-lg font-semibold mb-1">{fileName}</div>
              <div className="text-sm text-[var(--text-muted)] mb-2">
                {fileSize !== null && formatFileSize(fileSize)} · Ready to scan
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFileName(null);
                  setFileSize(null);
                  addToast("File removed", "info");
                }}
                aria-label="Remove uploaded file"
                className="text-sm text-[var(--danger)] hover:underline"
              >
                Remove file
              </button>
            </>
          ) : (
            <>
              <div className="text-3xl mb-3">📁</div>
              <div className="text-lg font-semibold mb-2">Drop your CSV file here</div>
              <div className="text-sm text-[var(--text-muted)]">or click to browse</div>
              <div className="flex justify-center gap-2 mt-4 flex-wrap">
                <span className="px-2.5 py-1 rounded-full text-[12px] font-medium bg-[var(--surface)] text-[var(--text-secondary)]">
                  .CSV only
                </span>
              </div>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          aria-hidden="true"
          className="hidden"
        />

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 mt-6 text-[13px] text-[var(--text-muted)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Data stays in your browser. Server is zero-knowledge. No PII stored.
        </div>

        {/* CTA */}
        <Button size="lg" onClick={handleScan} className="mt-10">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          Scan Transactions
        </Button>
      </main>
    </div>
  );
}
