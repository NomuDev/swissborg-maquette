"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** One array entry per visual line — words inside each entry stagger sequentially, then the next line. */
  lines: string[];
  /** Per-word stagger in ms. */
  staggerMs?: number;
  /** Per-word transition duration in ms. */
  durationMs?: number;
  className?: string;
};

/**
 * Scroll-triggered word-by-word reveal for headlines.
 * Each word starts at opacity:0 + translateY(28px) + blur, then slides + fades to neutral.
 * Uses IntersectionObserver so it fires once when the headline enters the viewport.
 */
export default function RevealHeadline({
  lines,
  staggerMs = 80,
  durationMs = 700,
  className = "",
}: Props) {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Respect reduced-motion preference — show immediately, no transition.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pre-tokenise lines into words so we can assign per-word delays globally.
  let wordIdx = 0;
  return (
    <h2 ref={rootRef} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, lineIdx) => {
        const words = line.split(" ");
        return (
          <span key={lineIdx} className="block">
            {words.map((w, i) => {
              const delay = wordIdx * staggerMs;
              wordIdx += 1;
              return (
                <span
                  key={`${lineIdx}-${i}`}
                  className="inline-block will-change-transform"
                  style={{
                    opacity: shown ? 1 : 0,
                    transform: shown
                      ? "translateY(0) scale(1)"
                      : "translateY(28px) scale(0.96)",
                    filter: shown ? "blur(0)" : "blur(6px)",
                    transition: `opacity ${durationMs}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${durationMs}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter ${durationMs}ms ease-out ${delay}ms`,
                  }}
                >
                  {w}
                </span>
              );
            }).reduce<React.ReactNode[]>((acc, el, i) => {
              if (i > 0) acc.push(<span key={`sp-${lineIdx}-${i}`}> </span>);
              acc.push(el);
              return acc;
            }, [])}
          </span>
        );
      })}
    </h2>
  );
}
