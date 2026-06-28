"use client";

interface ToggleProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-block w-12 h-[26px] rounded-full transition-colors duration-200 ${
        checked ? "bg-[var(--accent)]" : "bg-[var(--border)]"
      }`}
    >
      <span
        className={`absolute top-[3px] w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-[22px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}
