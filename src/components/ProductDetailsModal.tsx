"use client";

import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  productName: string;
  details: string[];
};

/**
 * Product details modal — appears on top of the PDP, "unfurls" its bullet points
 * one by one with a stagger reveal (fade up + slight blur lift).
 */
export default function ProductDetailsModal({
  open,
  onClose,
  productName,
  details,
}: Props) {
  // Latch the reveal so closing+reopening replays the unfurl.
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (open) {
      // Reset to closed state, then trigger reveal on next frame so the
      // CSS transition is observed.
      setRevealed(false);
      const raf = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(raf);
    }
    setRevealed(false);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Product details"
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 md:px-6"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close product details"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-sm animate-[fadeIn_220ms_ease-out]"
      />

      {/* Card */}
      <div
        className="relative w-full max-w-[640px] rounded-[14px] bg-[#F5F2EC] shadow-[0_30px_80px_rgba(0,0,0,0.45)] overflow-hidden animate-[modalIn_320ms_cubic-bezier(0.22,1,0.36,1)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-[#E6E1D8]">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-[#5F697A]">
              Product details
            </p>
            <p className="mt-1 text-[18px] font-semibold text-[#191E29]">
              {productName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full bg-[#EFEBE3] text-[#191E29] hover:bg-[#E6E1D8]"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
              <path
                d="M4 4 L12 12 M12 4 L4 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body — bullet unfurl */}
        <ul className="px-7 py-6 space-y-4">
          {details.map((line, i) => (
            <li
              key={i}
              className="flex items-start gap-3"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(10px)",
                filter: revealed ? "blur(0)" : "blur(3px)",
                transition: `opacity 520ms cubic-bezier(0.16,1,0.3,1) ${
                  120 + i * 90
                }ms, transform 520ms cubic-bezier(0.16,1,0.3,1) ${
                  120 + i * 90
                }ms, filter 520ms ease-out ${120 + i * 90}ms`,
              }}
            >
              <span
                aria-hidden
                className="mt-2 inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-[#01C38D]"
              />
              <span className="text-[15px] leading-relaxed text-[#191E29]">
                {line}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
