"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SwissBorg wordmark → BorgShop wordmark glitch morph.
 *
 * Renders the two wordmark assets stacked in a single relative slot whose width
 * is generous enough to hold the wider of the two, so the welcome row doesn't
 * reflow during the animation. When the slot enters the viewport, the SwissBorg
 * wordmark plays `.glitch-out` (smooth fade + subtle chromatic flicker), and the
 * BorgShop wordmark plays `.glitch-in` after a 450ms head-start, settling into
 * the final visible mark.
 *
 * Honours `prefers-reduced-motion: reduce` — snaps to end state with no transitions.
 */
export default function BrandMorph() {
  const ref = useRef<HTMLSpanElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRun(true);
      return;
    }

    // Trigger only when the element has actually scrolled into the viewport —
    // not on initial mount when it might be partially visible at the very edge.
    // rootMargin shrinks the effective viewport bottom by 120px, so the morph
    // fires only after the user has scrolled the slot ~120px above the fold.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -120px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      data-run={run ? "on" : "off"}
      className="relative inline-flex items-center justify-start align-middle h-6 md:h-[30px] w-[144px] md:w-[178px]"
    >
      {/* SwissBorg wordmark — visible at first, glitches out */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/swissborg%20wordmark.svg"
        alt="SwissBorg"
        className={`absolute left-0 h-6 md:h-[30px] w-auto ${run ? "glitch-out" : ""}`}
      />
      {/* BorgShop wordmark — same slot, glitches in to take its place */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/BorgShop%20wordmark.svg"
        alt="BorgShop"
        className={`absolute left-0 h-6 md:h-[30px] w-auto ${run ? "glitch-in" : "opacity-0"}`}
      />
    </span>
  );
}
