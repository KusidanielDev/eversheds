"use client";
import * as React from "react";
// reuse ref pattern
import { cx } from "@/lib/utils";
export default function Dropdown({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, set] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const on = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) set(false);
    };
    document.addEventListener("mousedown", on);
    return () => document.removeEventListener("mousedown", on);
  }, []);
  return (
    <div ref={ref} className="relative inline-block">
      <button
        className={cx(
          "px-3 py-2 rounded border",
          open && "bg-[var(--brand-orange)] text-white"
        )}
        onClick={() => set((v) => !v)}
      >
        {label}
      </button>
      {open && (
        <div className="absolute left-0 mt-1 panel p-3 rounded">{children}</div>
      )}
    </div>
  );
}
