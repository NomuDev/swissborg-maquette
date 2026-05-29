"use client";

import { useState } from "react";
import Image from "next/image";

const PERK_THUMB =
  "https://www.nivisgear.com/cdn/shop/files/gallery3-puffy-main-desktop-stratus-silver.png?crop=center&height=200&v=1758037542&width=200";

export default function PerksPill() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="perks-card"
        className="inline-flex h-[52px] items-center gap-3 rounded-full border-2 border-[#191E29] bg-transparent pl-4 pr-2 text-[14px] font-semibold text-[#191E29] hover:bg-[#191E29]/5 transition-colors"
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4 spin-reveal text-[#01C38D]" fill="currentColor" aria-hidden>
          <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
        </svg>
        <span>1 perk available</span>
        <span aria-hidden className="h-5 w-px bg-[#191E29]/30" />
        <span
          className={`grid h-8 w-8 place-items-center rounded-full transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
            <path
              d="M4 6 L8 10 L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div
          id="perks-card"
          className="flex w-[min(96vw,560px)] flex-col gap-3 rounded-[12px] border border-dashed border-[#E6E1D8] bg-white/40 backdrop-blur-sm p-3 animate-[fade-in_180ms_ease-out]"
        >
          <div className="flex items-center gap-4 pr-2">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[8px] bg-[#EFEBE3]">
              <Image
                src={PERK_THUMB}
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-[#191E29] leading-tight">
                Free shipping
              </p>
              <p className="text-[12px] text-[#5F697A] leading-tight mt-1">
                For Gold+ ranks
              </p>
            </div>
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 shrink-0 text-[#8F96A1]"
              fill="none"
              aria-hidden
            >
              <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M5 7 V5 a3 3 0 0 1 6 0 V7" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </div>
          <a
            href="#"
            className="self-center inline-flex h-[40px] items-center gap-2 rounded-[8px] bg-[#01C38D] px-4 text-[12px] font-semibold tracking-tight text-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Icon-White%202.svg" alt="" aria-hidden className="h-3.5 w-3.5" />
            Connect with SwissBorg app
          </a>
        </div>
      )}
    </div>
  );
}
