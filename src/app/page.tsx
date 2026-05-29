import Image from "next/image";
import Link from "next/link";
import NavActions from "@/components/NavActions";
import BrandLogo from "@/components/BrandLogo";
import PerksPill from "@/components/PerksPill";
import HeroImage from "@/components/HeroImage";
import RevealHeadline from "@/components/RevealHeadline";
import BrandMorph from "@/components/BrandMorph";
import { PRODUCTS, defaultVariant } from "@/lib/products";

export default function Home() {
  return (
    <>
      {/* Fixed (sticky) navigation — floats over hero and persists on scroll */}
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 md:px-7 md:py-7">
          <BrandLogo />
          <NavActions />
        </div>
      </header>

      {/* Hero — image only */}
      <section
        data-bg="light"
        className="relative isolate z-10 flex w-full items-end bg-[#B5B7B9] text-white"
        style={{ height: "calc(100vw / 1.5751 - 50px)" }}
      >
        {/* Clip wrapper — keeps the parallax-translated image bound to the hero, doesn't leak into next section */}
        <div className="absolute inset-0 overflow-hidden">
          <HeroImage src="/hero%20cyrus.webp" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F5F2EC]/40" />
        </div>

        {/* Hero info panel — bridges the bottom of the hero into the next section */}
        <div className="absolute inset-x-4 md:inset-x-8 bottom-0 z-20 translate-y-1/2">
          <div className="mx-auto max-w-[1600px] flex items-center gap-5 rounded-[11px] bg-[#F5F2EC]/85 backdrop-blur-3xl backdrop-saturate-150 px-5 md:px-7 py-8 md:py-10 text-[#191E29] shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
            {/* Left: meta row stacked */}
            <div className="flex-1 min-w-0 flex flex-col gap-7 md:gap-9">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-[13px] md:text-[14px] font-medium tracking-tight">
                <span className="inline-flex items-center gap-2 text-[#5F697A]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/Icon-Flat%202.svg" alt="" aria-hidden className="h-4 w-4" />
                  Made for Borgers
                </span>
                <span className="inline-flex items-center gap-2 text-[#5F697A]">
                  Designed in Switzerland
                  {/* Swiss flag */}
                  <span aria-hidden className="inline-grid h-4 w-4 place-items-center rounded-full bg-[#FF0000]">
                    <svg viewBox="0 0 32 32" className="h-3 w-3" aria-hidden>
                      <rect x="13" y="6" width="6" height="20" fill="#fff" />
                      <rect x="6" y="13" width="20" height="6" fill="#fff" />
                    </svg>
                  </span>
                </span>
              </div>

              <h2 className="text-[clamp(28px,3.4vw,48px)] leading-[1.05] tracking-tight !font-medium">
                This summer stay cool like Cyrus.
              </h2>
            </div>

            {/* Right: green CTA tile */}
            <a
              href="#products"
              className="group shrink-0 hidden md:flex h-[96px] w-[260px] flex-col justify-between rounded-[8px] bg-[#01C38D] p-4 text-white"
            >
              <svg viewBox="0 0 16 16" className="h-7 w-7 self-end scroll-indicator" fill="none" aria-hidden>
                <path d="M8 2 V13 M4 9 L8 13 L12 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[14px] font-semibold leading-tight">
                Discover new<br />products & Borger perks
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Welcome / Tribe */}
      <section
        data-bg="light"
        className="bg-[#F5F2EC] pt-[160px] md:pt-[200px] pb-0 px-6"
      >
        <div className="mx-auto max-w-[1400px] text-center">
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <span className="text-[24px] md:text-[32px] font-semibold tracking-tight text-[#191E29] leading-none">
              Welcome to the
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Icon-Flat%202.svg"
              alt=""
              aria-hidden
              className="h-8 md:h-10 w-auto"
            />
            <BrandMorph />
          </div>
          <RevealHeadline
            lines={["Unlock exclusive offers", "with your Borger rank."]}
            className="mt-8 md:mt-10 text-[clamp(40px,7vw,96px)] leading-[1.05] tracking-tight text-[#01C38D] !font-medium"
          />
          <div className="mt-12 md:mt-16 flex justify-center">
            <PerksPill />
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" data-bg="light" className="section-pad bg-[#F5F2EC]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {PRODUCTS.map((p, i) => {
              const variant = defaultVariant(p);
              return (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[11px] bg-[#EFEBE3]">
                    <Image
                      src={variant.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      priority={i < 3}
                    />
                    {/* Borger perk available indicator — first product only */}
                    {i === 0 && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-[8px] bg-white px-2.5 py-1.5 text-[11px] font-semibold tracking-tight text-[#191E29]">
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3 w-3 text-[#01C38D] spin-reveal"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
                        </svg>
                        Borger perk available
                      </span>
                    )}
                  </div>
                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <h3 className="inline-flex items-center gap-2 text-xl font-bold text-[#191E29] tracking-tight">
                      {p.name}
                      <svg
                        viewBox="0 0 16 16"
                        className="h-4 w-4 text-[#191E29] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#01C38D]"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M5 11 L11 5 M6 5 H11 V10"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </h3>
                    <span className="text-sm tabular-nums text-[#01C38D] font-semibold">
                      CHF {p.priceCHF}
                    </span>
                  </div>
                </Link>
              );
            })}

          </div>
        </div>
      </section>
    </>
  );
}
