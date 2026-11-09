import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Plus, ArrowUpRight } from "lucide-react";
import { getProduct, catalogueNotice } from "@/content/products";
import { getCategory } from "@/content/site";
import { useBasket } from "@/lib/basket";
import { pageHead } from "@/lib/seo";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/store/$slug")({
  loader: ({ params }) => { const product = getProduct(params.slug); if (!product) throw notFound(); return { product }; },
  head: ({ loaderData }) => pageHead(`/store/${loaderData?.product.slug ?? "unavailable"}`, loaderData?.product.name ?? "Item unavailable", "Illustrative item only. Availability, actual product and price must be confirmed with Kalahari Pharmacy. No online payment."),
  component: ProductPage,
});
function ProductPage() {
  const { product } = Route.useLoaderData(); const { add } = useBasket(); const [added, setAdded] = useState(false);
  return <section className="information-page" data-nav="light"><Button asChild variant="link" className="px-0"><Link to="/store"><ArrowLeft />All illustrative items</Link></Button><div className="mt-8 grid items-center gap-10 md:grid-cols-2"><figure><img src={product.image} alt={`Generated illustrative ${product.name.toLowerCase()}`} width={480} height={480} className="aspect-square w-full rounded-lg object-cover" /><figcaption className="mt-3 text-sm text-muted-foreground">Generated example — not a photograph of pharmacy stock.</figcaption></figure><div><p className="text-muted-foreground">{getCategory(product.category)?.name}</p><h1 className="display mt-4 text-5xl md:text-6xl">{product.name}</h1><p className="mt-8 text-2xl">Ask for price</p><p className="mt-4 leading-relaxed">{catalogueNotice}. Brand, size, specifications and suitability are not confirmed by this example.</p><div className="mt-8 flex flex-wrap gap-4"><Button size="lg" onClick={() => { add(product.slug); setAdded(true); }}><Plus />Add to request basket</Button><Button asChild variant="outline" size="lg"><Link to="/cart">View basket <ArrowUpRight /></Link></Button></div><p className="mt-4 min-h-6" aria-live="polite">{added ? "Added to your request basket. No order has been sent." : "An enquiry only — no payment or reservation."}</p></div></div></section>;
}