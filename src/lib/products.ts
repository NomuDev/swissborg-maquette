const CDN = "https://www.nivisgear.com/cdn/shop";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type Variant = {
  id: string;
  name: string;
  hex: string;
  /** Image used on the home grid card (portrait aspect). */
  image: string;
  /** Optional image used on the PDP main display. Falls back to `image` if absent. */
  mainImage?: string;
};

export type Product = {
  slug: string;
  name: string;
  priceCHF: number;
  desc: string;
  rating: number;
  reviewCount: number;
  sizes: Size[];
  variants: Variant[];
  defaultVariantId: string;
  /** Bullet-point product detail copy shown in the PDP details modal. */
  details?: string[];
};

const img = (path: string, h = 900) =>
  `${CDN}/files/${path}?crop=center&height=${h}&v=1758037670&width=${h}`;

export const PRODUCTS: Product[] = [
  {
    slug: "fluffborg-tee",
    name: "FluffBorg Tee",
    priceCHF: 95,
    desc: "Heavyweight cotton tee with our embossed FluffBorg crest. Garment-dyed in Switzerland for an everyday lived-in feel.",
    rating: 4.9,
    reviewCount: 47,
    sizes: ["XS", "S", "M", "L", "XL"],
    defaultVariantId: "rose",
    details: [
      "Mineral-washed 100% cotton heavyweight T-shirt",
      "240 GSM organic cotton, pre-shrunk for a lived-in fit",
      "Embossed FluffBorg crest, hand-tufted in Lugano",
      "Garment-dyed in Switzerland — every piece is one of one",
      "Oversized boxy cut, ribbed crew neck, double-needle hem",
      "Care: machine wash cold inside out, tumble dry low",
    ],
    variants: [
      {
        id: "rose",
        name: "Faded Rose",
        hex: "#BD7C8B",
        image: "/prod%201%20landing.png",
        mainImage: "/alex%20fulll.png",
      },
      {
        id: "midnight",
        name: "Midnight",
        hex: "#191E29",
        image: "/prod%201%20landing.png",
        mainImage: "/alex%20fulll.png",
      },
      {
        id: "stone",
        name: "Stone",
        hex: "#C7BFAF",
        image: "/prod%201%20landing.png",
        mainImage: "/alex%20fulll.png",
      },
    ],
  },
  {
    slug: "protego-ski-jacket",
    name: "Protego Ski Jacket",
    priceCHF: 400,
    desc: "The perfect lightweight, stretchy, insulated ski jacket for cold powder days. Assembled in Switzerland.",
    rating: 4.9,
    reviewCount: 12,
    sizes: ["XS", "S", "M", "L", "XL"],
    defaultVariantId: "gray-black",
    variants: [
      { id: "gray-black", name: "Gray Black", hex: "#9CA4AC", image: `${CDN}/files/gallery3-ski-main-desktop-grey-black.png?crop=center&height=900&v=1751427328&width=900` },
      { id: "olive",      name: "Olive",      hex: "#6B6E4E", image: `${CDN}/files/gallery3-ski-main-desktop-grey-black.png?crop=center&height=900&v=1751427328&width=900` },
      { id: "deep-blue",  name: "Deep Blue",  hex: "#1F3A5A", image: `${CDN}/files/gallery3-ski-main-desktop-grey-black.png?crop=center&height=900&v=1751427328&width=900` },
      { id: "rust",       name: "Rust",       hex: "#C46A35", image: `${CDN}/files/gallery3-ski-main-desktop-grey-black.png?crop=center&height=900&v=1751427328&width=900` },
    ],
  },
  {
    slug: "protego-shell",
    name: "Protego Shell",
    priceCHF: 400,
    desc: "4-way stretch fabric, 20K waterproofing, superior mobility — the finest Swiss-engineered ski shell on the market.",
    rating: 4.8,
    reviewCount: 31,
    sizes: ["XS", "S", "M", "L", "XL"],
    defaultVariantId: "rusty-slate",
    variants: [
      { id: "rusty-slate", name: "Rusty Slate", hex: "#7C6E62", image: `${CDN}/files/gallery1-shell-main-desktop-rusty-slate.png?crop=center&height=900&v=1750709509&width=900` },
      { id: "black",       name: "Midnight",    hex: "#0F1620", image: `${CDN}/files/gallery1-shell-main-desktop-rusty-slate.png?crop=center&height=900&v=1750709509&width=900` },
      { id: "white",       name: "Glacier",     hex: "#E8E6DF", image: `${CDN}/files/gallery1-shell-main-desktop-rusty-slate.png?crop=center&height=900&v=1750709509&width=900` },
      { id: "olive",       name: "Olive",       hex: "#6B6E4E", image: `${CDN}/files/gallery1-shell-main-desktop-rusty-slate.png?crop=center&height=900&v=1750709509&width=900` },
    ],
  },
  {
    slug: "tendo-jacket",
    name: "Tendo Jacket",
    priceCHF: 325,
    desc: "High-performance quilted jacket with waterproof and durable stretch material — equally at home on a glacier or a tram.",
    rating: 4.7,
    reviewCount: 18,
    sizes: ["XS", "S", "M", "L", "XL"],
    defaultVariantId: "black",
    variants: [
      { id: "black",  name: "Midnight",  hex: "#0F1620", image: `${CDN}/files/gallery3-tendo-main-desktop-black.jpg?crop=center&height=900&v=1757905679&width=900` },
      { id: "navy",   name: "Navy",      hex: "#1B2840", image: `${CDN}/files/gallery3-tendo-main-desktop-black.jpg?crop=center&height=900&v=1757905679&width=900` },
      { id: "cream",  name: "Cream",     hex: "#E0D7C5", image: `${CDN}/files/gallery3-tendo-main-desktop-black.jpg?crop=center&height=900&v=1757905679&width=900` },
    ],
  },
  {
    slug: "everyday-puffy",
    name: "Everyday Puffy",
    priceCHF: 185,
    desc: "Premium recycled ripstop nylon insulates as a dependable layer for everyday use. Assembled in Switzerland.",
    rating: 4.9,
    reviewCount: 47,
    sizes: ["XS", "S", "M", "L", "XL"],
    defaultVariantId: "stratus-silver",
    variants: [
      { id: "stratus-silver", name: "Stratus Silver", hex: "#B7BEC4", image: `${CDN}/files/gallery3-puffy-main-desktop-stratus-silver.png?crop=center&height=900&v=1758037542&width=900` },
      { id: "black",          name: "Midnight",       hex: "#0F1620", image: `${CDN}/files/gallery3-puffy-main-desktop-stratus-silver.png?crop=center&height=900&v=1758037542&width=900` },
      { id: "forest",         name: "Forest",         hex: "#2F4538", image: `${CDN}/files/gallery3-puffy-main-desktop-stratus-silver.png?crop=center&height=900&v=1758037542&width=900` },
    ],
  },
];

export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const allSlugs = () => PRODUCTS.map((p) => p.slug);

export const defaultVariant = (p: Product) =>
  p.variants.find((v) => v.id === p.defaultVariantId) ?? p.variants[0];

export const PATCH_PRICE_CHF = 25;
