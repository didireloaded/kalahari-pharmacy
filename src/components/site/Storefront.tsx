import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Plus, Search } from "lucide-react";
import { products, filterProducts, catalogueNotice, type Product } from "@/content/products";
import { getCategory, categories } from "@/content/site";
import { useBasket } from "@/lib/basket";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useBasket();
  const [added, setAdded] = useState(false);
  return <article className="product-card"><Link to="/store/$slug" params={{ slug: product.slug }} className="block"><img src={product.image} alt={`Illustrative ${product.name.toLowerCase()}`} loading="lazy" width={480} height={480} className="aspect-square w-full object-cover" /><h2 className="mt-5 text-xl font-semibold">{product.name}</h2></Link><p className="mt-1 text-sm text-muted-foreground">{getCategory(product.category)?.name}</p><div className="mt-4 flex items-center justify-between gap-2"><span>{product.priceStatus}</span><Button variant="secondary" onClick={() => { add(product.slug); setAdded(true); }} aria-label={`Add ${product.name} to basket`}><Plus />Add</Button></div><p aria-live="polite" className="mt-2 min-h-5 text-sm text-muted-foreground">{added ? "Added to your request basket" : "Illustrative item"}</p></article>;
}
export function Storefront() {
  const [query, setQuery] = useState(""); const [category, setCategory] = useState(""); const [sort, setSort] = useState("featured");
  const list = filterProducts(query, category, sort);
  return <section data-nav="light" className="information-page"><div className="flex flex-wrap items-end justify-between gap-6"><h1 className="display page-title">Everyday<br />essentials</h1><Button asChild variant="outline"><Link to="/cart">Request basket <ArrowUpRight /></Link></Button></div><p className="catalogue-notice">{catalogueNotice}. Images are generated, unbranded examples, not photographs of Kalahari stock. No online payment.</p>
    <div className="store-filters"><label className="flex-1"><span className="block mb-2 font-medium">Search items</span><span className="flex items-center gap-3 rounded-lg border border-input bg-muted px-4"><Search className="size-5 shrink-0" /><input className="min-w-0 w-full bg-transparent py-3 outline-none" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. plasters" /></span></label><label><span className="block mb-2 font-medium">Category</span><select className="store-select" value={category} onChange={(e) => setCategory(e.target.value)}><option value="">All categories</option>{categories.filter((c) => products.some((p) => p.category === c.slug)).map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label><label><span className="block mb-2 font-medium">Sort</span><select className="store-select" value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="az">Name: A–Z</option><option value="za">Name: Z–A</option></select></label></div>
    <p aria-live="polite" className="my-6 text-muted-foreground">{list.length} illustrative items</p><div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map((p) => <ProductCard key={p.slug} product={p} />)}</div>{list.length === 0 && <div className="py-12"><p className="text-xl">No items match your search.</p><Button className="mt-4" variant="outline" onClick={() => { setQuery(""); setCategory(""); setSort("featured"); }}>Clear filters</Button></div>}
  </section>;
}