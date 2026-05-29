"use client";

export default function BrandLogo() {
  return (
    <a
      href="/"
      aria-label="BorgShop"
      className="flex h-[60px] w-[60px] items-center justify-center rounded-[8px] bg-[#191E29]/69 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Icon-White%202.svg"
        alt="BorgShop"
        className="h-[26px] w-[26px]"
      />
    </a>
  );
}
