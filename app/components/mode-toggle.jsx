"use client";
import { motion } from "motion/react";

const OPTIONS = [
  { id: "creative", label: "Creative" },
  { id: "professional", label: "Professional" },
];

export default function ModeToggle({ mode, onChange }) {
  const pro = mode === "professional";
  return (
    <div className="no-print fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div
        role="tablist"
        aria-label="Portfolio view"
        className={`flex items-center gap-1 rounded-full p-1 text-sm font-medium shadow-lg backdrop-blur-xl ${
          pro ? "border border-zinc-200 bg-white/90 shadow-zinc-200/60" : "border border-white/10 bg-white/[0.06] shadow-black/40"
        }`}
      >
        {OPTIONS.map((o) => {
          const active = mode === o.id;
          return (
            <button
              key={o.id}
              role="tab"
              aria-selected={active}
              onClick={() => onChange(o.id)}
              className={`relative rounded-full px-4 py-2 transition-colors ${
                active ? (pro ? "text-white" : "text-black") : pro ? "text-zinc-500 hover:text-zinc-900" : "text-zinc-400 hover:text-white"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="mode-pill"
                  className={`absolute inset-0 rounded-full ${pro ? "bg-zinc-900" : "bg-[var(--c-accent)]"}`}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{o.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
