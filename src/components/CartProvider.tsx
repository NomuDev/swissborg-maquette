"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartLine = {
  key: string;
  slug: string;
  variantId: string;
  size: string;
  qty: number;
  patch: boolean;
  // denormalised for the drawer
  name: string;
  color: string;
  image: string;
  unitPriceCHF: number;
};

type AddLineInput = Omit<CartLine, "key" | "qty">;

type CartCtx = {
  items: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
  add: (line: AddLineInput) => void;
  remove: (key: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);

const STORAGE_KEY = "borgshop-cart";

const lineKey = (l: AddLineInput) =>
  `${l.slug}:${l.variantId}:${l.size}:${l.patch ? "p" : "np"}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persist on any items change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const add = useCallback((line: AddLineInput) => {
    setItems((prev) => {
      const key = lineKey(line);
      const idx = prev.findIndex((l) => l.key === key);
      if (idx >= 0) {
        const next = prev.slice();
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { ...line, key, qty: 1 }];
    });
  }, []);

  const remove = useCallback((key: string) => {
    setItems((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((n, l) => n + l.qty, 0);
    const total = items.reduce((s, l) => s + l.unitPriceCHF * l.qty, 0);
    return {
      items,
      count,
      total,
      open,
      setOpen,
      toggle: () => setOpen((v) => !v),
      add,
      remove,
    };
  }, [items, open, add, remove]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used within <CartProvider>");
  return v;
}
