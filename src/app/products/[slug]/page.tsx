import Link from "next/link";
import { notFound } from "next/navigation";
import NavActions from "@/components/NavActions";
import BrandLogo from "@/components/BrandLogo";
import ProductView from "@/components/ProductView";
import { allSlugs, getProduct } from "@/lib/products";

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      {/* Fixed (sticky) navigation — same global pattern as the home page */}
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 md:px-7 md:py-7">
          <div className="flex items-center gap-3">
            <BrandLogo />
            <Link
              href="/"
              aria-label="Back to collection"
              className="group flex h-[60px] items-center gap-2.5 rounded-[8px] bg-[#191E29]/69 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.25)] pl-4 pr-5 text-[13px] font-bold tracking-[0.14em] text-white hover:bg-[#191E29]/80 transition-colors"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                fill="none"
                aria-hidden
              >
                <path
                  d="M11 4 L5 8 L11 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </Link>
          </div>
          <NavActions />
        </div>
      </header>

      <ProductView product={product} />
    </>
  );
}
