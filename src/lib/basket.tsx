import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { business } from "@/content/site";
import { getProduct } from "@/content/products";

export type BasketItem = { slug: string; quantity: number };
export function normalizeBasket(value: unknown): BasketItem[] {
  if (!Array.isArray(value)) return [];
  const result: BasketItem[] = [];
  for (const row of value) {
    if (row && typeof row.slug === "string" && getProduct(row.slug) && Number.isSafeInteger(row.quantity) && row.quantity > 0 && !result.some((r) => r.slug === row.slug)) result.push({ slug: row.slug, quantity: row.quantity });
  }
  return result;
}
export function updateQuantity(items: BasketItem[], slug: string, quantity: number): BasketItem[] {
  if (!getProduct(slug) || !Number.isSafeInteger(quantity)) return items;
  const others = items.filter((p) => p.slug !== slug);
  return quantity > 0 ? [...others, { slug, quantity }] : others;
}
export function basketEnquiryText(items: BasketItem[]): string {
  const list = items.filter((p) => getProduct(p.slug)).map((p) => `${p.quantity} × ${getProduct(p.slug)?.name} — ask for price`).join("\n");
  return `Hello Kalahari Pharmacy,\n\nI would like to enquire about these illustrative items:\n${list}\n\nPlease confirm actual product names, availability, pricing and any collection or delivery options. This is an enquiry, not a confirmed order.\n\nThank you.`;
}
export function orderMailto(items: BasketItem[]) {
  return `mailto:${business.email}?subject=${encodeURIComponent("Product enquiry — confirm availability and pricing")}&body=${encodeURIComponent(basketEnquiryText(items))}`;
}
type Basket = { items: BasketItem[]; add: (slug: string) => void; setQuantity: (slug: string, n: number) => void; clear: () => void; storageError: boolean };
const Context = createContext<Basket | null>(null);
export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => { try { setItems(normalizeBasket(JSON.parse(localStorage.getItem("kp-basket") || "[]"))); } catch { setStorageError(true); } }, []);
  const save = (next: BasketItem[]) => { try { localStorage.setItem("kp-basket", JSON.stringify(next)); } catch { setStorageError(true); } };
  const setQuantity = (slug: string, n: number) => setItems((old) => { const next = updateQuantity(old, slug, n); save(next); return next; });
  const add = (slug: string) => setItems((old) => { const next = updateQuantity(old, slug, (old.find((p) => p.slug === slug)?.quantity ?? 0) + 1); save(next); return next; });
  return <Context.Provider value={{ items, add, setQuantity, clear: () => { setItems([]); save([]); }, storageError }}>{children}</Context.Provider>;
}
export function useBasket() { const ctx = useContext(Context); if (!ctx) throw new Error("BasketProvider missing"); return ctx; }