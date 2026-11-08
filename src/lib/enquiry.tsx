import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { business, getCategory } from "@/content/site";

type Ctx = { items: string[]; has: (s: string) => boolean; toggle: (s: string) => void; remove: (s: string) => void; clear: () => void };
const EnquiryContext = createContext<Ctx | null>(null);
const KEY = "kp-enquiry";

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(v)) setItems(v.filter((s) => typeof s === "string" && getCategory(s)));
    } catch {}
  }, []);
  const save = (next: string[]) => {
    setItems(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };
  const toggle = useCallback((s: string) => save(items.includes(s) ? items.filter((i) => i !== s) : [...items, s]), [items]);
  const remove = useCallback((s: string) => save(items.filter((i) => i !== s)), [items]);
  const clear = useCallback(() => save([]), []);
  return (
    <EnquiryContext.Provider value={{ items, has: (s) => items.includes(s), toggle, remove, clear }}>
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const c = useContext(EnquiryContext);
  if (!c) throw new Error("useEnquiry outside provider");
  return c;
}

export function buildMailto(slugs: string[], name: string, note: string) {
  const list = slugs.map((s) => `- ${getCategory(s)?.name ?? s}`).join("\n");
  const body = `Hello Kalahari Pharmacy,\n\nI'd like to ask about availability in these categories:\n${list}\n\n${note ? note + "\n\n" : ""}Thank you,\n${name}`;
  return `mailto:${business.email}?subject=${encodeURIComponent("Product enquiry")}&body=${encodeURIComponent(body)}`;
}
