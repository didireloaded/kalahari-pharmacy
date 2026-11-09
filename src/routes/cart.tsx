import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { basketEnquiryText, useBasket } from "@/lib/basket";
import { getProduct } from "@/content/products";
import { pageHead } from "@/lib/seo";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/cart")({ head: () => pageHead("/cart", "Request basket", "Review illustrative items and quantities before requesting confirmed availability and pricing. No payment or confirmed sale."), component: Cart });
function Cart() {
  const { items, setQuantity, clear, storageError } = useBasket();
  const [shareStatus, setShareStatus] = useState("");
  const share = async () => {
    const text = basketEnquiryText(items);
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: "Kalahari Pharmacy enquiry", text });
        setShareStatus("Please confirm delivery in the app you chose. No order has been placed on this site.");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setShareStatus("Enquiry copied. Paste it into WhatsApp or your preferred messaging app; it has not been sent.");
      } else setShareStatus("Sharing is unavailable here. Use Print / Save PDF or the email option.");
    } catch (error) {
      setShareStatus(error instanceof Error && error.name === "AbortError" ? "Sharing cancelled. Nothing was sent by this website." : "Could not share the list. Use Print / Save PDF instead.");
    }
  };
  return <section className="information-page" data-nav="light"><h1 className="display page-title">Request basket</h1><p className="page-intro">An enquiry, not a purchase. The pharmacy must confirm actual items, prices, stock and collection or delivery arrangements.</p>{storageError && <p role="status" className="catalogue-notice">Your browser could not save the basket. It will remain available on this page, but may not survive a refresh.</p>}
  {items.length === 0 ? <div className="py-12"><p className="text-xl">Your request basket is empty.</p><Button asChild className="mt-6"><Link to="/store">Browse illustrative items</Link></Button></div> : <><ul className="mt-10 divide-y divide-border">{items.map((row) => { const p = getProduct(row.slug); if (!p) return null; return <li key={row.slug} className="grid grid-cols-[80px_minmax(0,1fr)] items-start gap-x-4 gap-y-4 py-5 sm:grid-cols-[96px_minmax(0,1fr)] lg:grid-cols-[96px_minmax(0,1fr)_auto] lg:items-center"><Link to="/store/$slug" params={{ slug: p.slug }} className="block self-start"><img src={p.image} alt={`Illustrative ${p.name}`} loading="lazy" decoding="async" className="size-20 rounded-lg object-cover sm:size-24" width={96} height={96} /></Link><div className="min-w-0 flex-1"><Link to="/store/$slug" params={{ slug: p.slug }} className="text-lg font-semibold hover:underline">{p.name}</Link><p className="mt-2 text-muted-foreground">Ask for price</p></div><div className="col-span-2 flex min-w-0 flex-wrap items-center gap-2 lg:col-span-1 lg:justify-end"><Button variant="outline" size="icon" className="size-11 shrink-0" aria-label={`Decrease ${p.name} quantity`} onClick={() => setQuantity(p.slug, row.quantity - 1)}><Minus /></Button><label><span className="sr-only">Quantity for {p.name}</span><input className="h-11 w-16 rounded-lg border border-input bg-paper px-2 text-center text-base" type="number" inputMode="numeric" min={1} step={1} value={row.quantity} onChange={(e) => { const n = Number(e.target.value); if (n >= 1) setQuantity(p.slug, n); }} /></label><Button variant="outline" size="icon" className="size-11 shrink-0" aria-label={`Increase ${p.name} quantity`} onClick={() => setQuantity(p.slug, row.quantity + 1)}><Plus /></Button><Button variant="ghost" size="icon" className="size-11 shrink-0" aria-label={`Remove ${p.name}`} onClick={() => setQuantity(p.slug, 0)}><Trash2 /></Button></div></li>; })}</ul><div className="mt-8 flex flex-wrap justify-between gap-4"><div className="flex flex-wrap gap-3"><Button variant="ghost" onClick={clear}>Clear basket</Button><Button variant="outline" onClick={share}>Share enquiry list</Button><Button variant="outline" onClick={() => window.print()}>Print / Save PDF</Button></div><Button asChild size="lg"><Link to="/checkout">Request an order <ArrowRight /></Link></Button></div><p role="status" aria-live="polite" className="mt-4 text-sm text-muted-foreground">{shareStatus}</p><p className="mt-3 text-sm text-muted-foreground">On supported phones, the share sheet lets you choose WhatsApp. No message or prescription is sent automatically.</p></>}
  <div className="mt-10 flex flex-wrap gap-6"><Link to="/store" className="editorial-link">Continue browsing</Link><Link to="/enquiry" className="editorial-link">My category enquiry list</Link></div></section>;
}