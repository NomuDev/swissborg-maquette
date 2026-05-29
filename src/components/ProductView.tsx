"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { type Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";

export default function ProductView({ product }: { product: Product }) {
  const { add, setOpen } = useCart();

  const [variantId, setVariantId] = useState(product.defaultVariantId);
  const [size, setSize] = useState<string | null>(null);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const details = product.details ?? [product.desc];

  const variant = useMemo(
    () => product.variants.find((v) => v.id === variantId) ?? product.variants[0],
    [product, variantId],
  );

  function pickSize(s: string) {
    setSize(s);
    setSizeError(false);
    setSizeOpen(false);
  }

  function handleAdd() {
    if (!size) {
      setSizeError(true);
      setSizeOpen(true);
      return;
    }
    add({
      slug: product.slug,
      variantId: variant.id,
      size,
      patch: false,
      name: product.name,
      color: variant.name,
      image: variant.image,
      unitPriceCHF: product.priceCHF,
    });
    setOpen(true);
  }

  // Error only displays while no size is selected
  const showSizeError = sizeError && !size;

  return (
    <main data-bg="light" className="relative h-screen overflow-hidden bg-[#B5B7B9]">
      {/* Full-bleed hero image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={variant.mainImage ?? variant.image}
          alt={`${product.name} — ${variant.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover scale-[1.15]"
          style={{ objectPosition: "center 65%" }}
          key={variant.id}
        />
      </div>


      {/* Action bar — fixed, full-width with section dividers */}
      <div className="fixed inset-x-3 md:inset-x-6 bottom-3 md:bottom-6 z-30">
        <div className="mx-auto max-w-[1800px] rounded-[11px] bg-[#191E29]/85 backdrop-blur-md text-white shadow-[0_30px_80px_rgba(0,0,0,0.45)] overflow-hidden">
          {/* Expandable panel — emerges from inside the bar, shares its background + blur */}
          {sizeOpen && (
            <div className="px-7 py-6 border-b border-white/10 animate-[panelDown_280ms_cubic-bezier(0.22,1,0.36,1)]">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[12px] tracking-[0.18em] text-white/70">Select size</p>
                <button
                  type="button"
                  onClick={() => setSizeOpen(false)}
                  aria-label="Close size selector"
                  className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"
                >
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden>
                    <path d="M4 4 L12 12 M12 4 L4 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => pickSize(s)}
                    aria-pressed={size === s}
                    className={`h-12 min-w-[64px] rounded-[8px] border px-5 text-[14px] font-semibold transition-colors ${
                      size === s
                        ? "border-[#01C38D] bg-[#01C38D] text-[#00231C]"
                        : "border-white/20 bg-transparent text-white hover:border-white/50 hover:bg-white/5"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {detailsOpen && (
            <div className="px-7 py-6 border-b border-white/10 animate-[panelDown_280ms_cubic-bezier(0.22,1,0.36,1)]">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[12px] tracking-[0.18em] text-white/70">Product details</p>
                <button
                  type="button"
                  onClick={() => setDetailsOpen(false)}
                  aria-label="Close product details"
                  className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"
                >
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden>
                    <path d="M4 4 L12 12 M12 4 L4 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <ul className="space-y-2.5">
                {details.map((line, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[14px] leading-relaxed text-white/85"
                    style={{
                      animation: `panelDown 420ms cubic-bezier(0.22,1,0.36,1) ${
                        80 + i * 60
                      }ms both`,
                    }}
                  >
                    <span aria-hidden className="mt-2 inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-[#01C38D]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col xl:flex-row xl:items-stretch xl:[&>*+*]:border-l xl:[&>*+*]:border-white/10">
            {/* 1. Name + reviews */}
            <div className="px-5 md:px-6 py-5 flex flex-col justify-center min-w-0 xl:basis-[200px] xl:shrink-0">
              <h1 className="text-[clamp(20px,1.6vw,26px)] font-bold leading-[1.05] tracking-tight">
                <span className="block">{product.name.split(" ")[0]}</span>
                <span className="block">{product.name.split(" ").slice(1).join(" ")}</span>
              </h1>
              <button
                type="button"
                onClick={() => {
                  setDetailsOpen((v) => !v);
                  if (sizeOpen) setSizeOpen(false);
                }}
                aria-expanded={detailsOpen}
                className="mt-2 inline-flex w-fit text-[12px] font-semibold text-[#01C38D] underline underline-offset-4 hover:text-white"
              >
                Product details
              </button>
            </div>

            {/* 2. Colour swatches */}
            <div className="px-5 md:px-6 py-5 flex items-center min-w-0 xl:basis-[200px] xl:shrink-0">
              <div className="flex items-center gap-2" aria-label={`Colour: ${variant.name}`}>
                {product.variants.map((v) => {
                  const selected = v.id === variantId;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVariantId(v.id)}
                      title={v.name}
                      aria-label={v.name}
                      aria-pressed={selected}
                      className={`h-7 w-7 rounded-[5px] transition-all ${
                        selected
                          ? "ring-2 ring-[#01C38D] ring-offset-2 ring-offset-[#191E29]"
                          : "ring-1 ring-white/20 hover:ring-white/50"
                      }`}
                      style={{ background: v.hex }}
                    />
                  );
                })}
              </div>
            </div>

            {/* 3. Size dropdown */}
            <div className="px-5 md:px-6 py-5 flex items-center min-w-0 xl:basis-[210px] xl:shrink-0">
              <div className="relative w-full">
                <button
                  type="button"
                  onClick={() => {
                    setSizeOpen((v) => !v);
                    if (detailsOpen) setDetailsOpen(false);
                  }}
                  aria-expanded={sizeOpen}
                  className={`flex h-[44px] w-full items-center justify-between gap-3 rounded-[8px] border bg-transparent px-4 text-[14px] font-semibold transition-colors ${
                    showSizeError
                      ? "border-[#01C38D] ring-2 ring-[#01C38D]/30 text-white"
                      : "border-white/25 text-white hover:border-white/50"
                  }`}
                >
                  {size ? `Size: ${size}` : "Select Size"}
                  <svg viewBox="0 0 16 16" className={`h-3 w-3 transition-transform ${sizeOpen ? "rotate-180" : ""}`} fill="none" aria-hidden>
                    <path d="M3 6 L8 11 L13 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {showSizeError && (
                  <p className="absolute left-0 top-full mt-1 text-[11px] text-[#01C38D]">
                    Select a size first
                  </p>
                )}
              </div>
            </div>

            {/* 4. Size guide link */}
            <div className="px-5 md:px-6 py-5 flex items-center justify-center xl:basis-[130px] xl:shrink-0">
              <button
                type="button"
                className="text-[13px] font-semibold text-[#01C38D] underline underline-offset-4 hover:text-white"
              >
                Size guide
              </button>
            </div>

            {/* 5. Borger perks module */}
            <div className="px-5 md:px-6 py-4 flex items-center min-w-0 flex-1 xl:basis-0">
              <a
                href="#"
                aria-label="View Borger perks"
                className="group flex items-center gap-3 min-w-0 w-full rounded-[10px] border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#01C38D]/40 transition-colors px-3 py-2.5"
              >
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-[8px] bg-gradient-to-br from-[#01C38D] to-[#019C71] shadow-[0_4px_14px_rgba(1,195,141,0.35)]"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#00231C] spin-reveal" fill="currentColor" aria-hidden>
                    <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-white leading-tight truncate">
                    Borger perks available
                  </p>
                  <p className="text-[11px] text-[#01C38D] leading-tight mt-0.5 truncate">
                    Hold $BORG · 15% off
                  </p>
                </div>
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="h-4 w-4 shrink-0 text-[#01C38D] transition-transform group-hover:translate-x-0.5"
                  fill="none"
                >
                  <path d="M6 4 L10 8 L6 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* 6. Price + Add to Cart */}
            <div className="px-5 md:px-6 py-5 flex items-center gap-5 xl:basis-[380px] xl:shrink-0">
              <div className="flex flex-col whitespace-nowrap">
                <span className="text-[10px] tracking-[0.18em] text-white/50">Price</span>
                <span className="text-2xl font-bold tabular-nums leading-none mt-1">
                  CHF {product.priceCHF}
                </span>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="ml-auto inline-flex h-[58px] shrink-0 items-center gap-3 rounded-[8px] bg-white px-6 text-[13px] font-bold tracking-[0.14em] text-[#191E29] hover:bg-[#F5F2EC] active:scale-[0.99]"
              >
                Add to cart
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                  <path d="M4 12 L12 4 M6 4 H12 V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
