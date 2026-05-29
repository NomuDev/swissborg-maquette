"use client";

import Image from "next/image";
import { useCart } from "@/components/CartProvider";

export default function NavActions() {
  const { items, count, total, open, setOpen, remove } = useCart();

  const buttons = (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex h-[52px] items-center gap-2 rounded-[8px] px-5 text-[13px] font-semibold tracking-tight transition-colors ${
          open
            ? "bg-[#01C38D] text-white hover:brightness-110"
            : "bg-white text-[#191E29] hover:bg-[#F5F2EC]"
        }`}
        aria-expanded={open}
        aria-controls="cart-drawer"
      >
        Cart{" "}
        <span className="tabular-nums opacity-70">
          {String(count).padStart(2, "0")}
        </span>
      </button>
      <a
        href="#"
        className="flex h-[52px] items-center gap-2 rounded-[8px] bg-[#F5F2EC] px-5 text-[13px] font-semibold tracking-tight text-[#191E29] hover:bg-white"
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 spin-reveal text-[#01C38D]" fill="currentColor" aria-hidden>
          <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
        </svg>
        Perks
      </a>
      <a
        href="#"
        className="flex h-[52px] items-center rounded-[8px] bg-[#01C38D] px-5 text-[13px] font-semibold tracking-tight text-white hover:brightness-110"
      >
        Connect with app
      </a>
    </>
  );

  return (
    <div className="relative h-[64px]">
      {/* Backdrop — close on outside click */}
      {open && (
        <button
          type="button"
          aria-label="Close cart"
          className="fixed inset-0 z-30 cursor-default bg-transparent"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Container: button tray when closed, expanded panel containing tray + drawer when open */}
      {open ? (
        <div
          id="cart-drawer"
          role="dialog"
          aria-label="Items in your cart"
          className="absolute right-0 top-0 z-40 w-[min(96vw,640px)] rounded-[11px] bg-[#191E29]/69 backdrop-blur-md text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] overflow-hidden"
        >
          {/* Top: buttons, right-aligned inside the expanded container */}
          <div className="flex items-stretch gap-[6px] justify-end p-[6px]">
            {buttons}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mx-7" />

          {/* Items header */}
          <div className="flex items-center justify-between px-7 pt-5 pb-3">
            <span className="text-[12px] tracking-[0.18em] text-white/80">
              {String(count).padStart(2, "0")} item{count === 1 ? "" : "s"} in your cart
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] text-white/80 hover:text-white"
            >
              Close
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                <path d="M4 4 L12 12 M12 4 L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="px-7 pb-5">
            {items.length === 0 ? (
              <p className="py-8 text-center text-sm text-white/60">Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={item.key} className="flex items-stretch gap-5 py-3">
                  <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-[6px] bg-[#232936]">
                    <Image src={item.image} alt={item.name} fill sizes="120px" className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <p className="text-lg font-bold text-white">{item.name}</p>
                      <p className="mt-1 text-sm text-white/80">
                        CHF {item.unitPriceCHF.toFixed(2)}
                        {item.qty > 1 && (
                          <span className="ml-2 text-white/50">× {item.qty}</span>
                        )}
                      </p>
                    </div>
                    <div className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[11px] tracking-[0.18em]">
                      <span className="text-white/50">Colour:</span>
                      <span className="text-white">{item.color}</span>
                      <span className="text-white/50">Size:</span>
                      <span className="text-white">{item.size}</span>
                      {item.patch && (
                        <>
                          <span className="text-white/50">Patch:</span>
                          <span className="text-[#01C38D]">Included</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.key)}
                    aria-label={`Remove ${item.name}`}
                    className="grid w-10 place-items-center rounded-[6px] bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                      <path d="M4 4 L12 12 M12 4 L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Total */}
          <div className="border-t border-white/10 px-7 py-6">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">Total</span>
              <span className="text-3xl font-bold tabular-nums">CHF {total.toFixed(2)}</span>
            </div>
            <p className="mt-2 text-xs text-white/50">
              Taxes, discounts and shipping calculated at checkout.
            </p>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-2 gap-2 px-3 pb-3">
            <a
              href="#"
              className="group flex h-[64px] items-center justify-between rounded-[8px] bg-white px-5 text-[13px] font-semibold tracking-tight text-[#191E29] hover:bg-[#F5F2EC]"
            >
              View cart
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                <path d="M4 12 L12 4 M6 4 H12 V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#"
              className="group flex h-[64px] items-center justify-between rounded-[8px] bg-[#01C38D] px-5 text-[13px] font-semibold tracking-tight text-white hover:brightness-110"
            >
              Check out
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                <path d="M4 12 L12 4 M6 4 H12 V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      ) : (
        <div className="flex items-stretch gap-[6px] rounded-[11px] bg-[#191E29]/69 backdrop-blur-md p-[6px] shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
          {buttons}
        </div>
      )}
    </div>
  );
}
