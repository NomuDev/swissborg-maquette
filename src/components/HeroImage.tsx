"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  /** Parallax intensity 0–1. 0 = no effect, 1 = stays in place as you scroll. */
  speed?: number;
};

export default function HeroImage({ src, alt = "", speed = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const apply = () => {
      raf = 0;
      el.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 -z-10 will-change-transform"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover scale-[1.08]"
        style={{ objectPosition: "center -150px" }}
      />
    </div>
  );
}
