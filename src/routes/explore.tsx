import { createFileRoute, Link, Outlet, useMatch } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { categories, imageSrcSet } from "@/content/site";
import { useReveal } from "@/lib/motion";
import { EnquireButton, toneClass } from "@/components/site/CategoryDetail";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore categories — Kalahari Pharmacy" },
      { name: "description", content: "Browse the everyday categories you can ask Kalahari Pharmacy about: wellness, personal care, skin & beauty, first aid and family care." },
      { property: "og:title", content: "Explore categories — Kalahari Pharmacy" },
      { property: "og:description", content: "Everyday categories to enquire about at Kalahari Pharmacy, Windhoek." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExploreLayout,
});

function ExploreLayout() {
  const child = useMatch({ from: "/explore/$slug", shouldThrow: false });
  return child ? <Outlet /> : <Explore />;
}

function Explore() {
  const ref = useReveal<HTMLElement>();
  const [q, setQ] = useState("");
  const list = categories.filter((c) => (c.name + c.short + c.enquire.join(" ")).toLowerCase().includes(q.toLowerCase()));
  return (
    <section ref={ref} data-nav="light" className="px-4 pb-12 pt-28 sm:px-6 md:px-10 md:pt-36">
      <div data-reveal className="px-3">
        <p className="eyebrow text-muted-foreground">Explore</p>
        <h1 className="display mt-4 break-words text-[clamp(2.75rem,9.4vw,9rem)]">
          <span className="line-mask"><span>What you can</span></span>
          <span className="line-mask"><span style={{ transitionDelay: "120ms" }}>ask us about.</span></span>
        </h1>
        <p className="mt-6 max-w-lg text-muted-foreground">An editorial guide to categories, not a stock list. Add interests to your enquiry list and we'll let you know what's available.</p>
        <label className="mt-8 flex max-w-md items-center gap-3 rounded-full bg-muted px-5 py-3">
          <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
          <span className="sr-only">Filter categories</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter — e.g. sun, plasters, baby" className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground" />
        </label>
      </div>
      <ul className="mt-12 grid gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {list.map((c, i) => (
          <li key={c.slug} data-reveal style={{ transitionDelay: `${i * 90}ms` }} className="reveal is-in">
            <article className={`group flex h-full flex-col overflow-hidden rounded-[28px] ${toneClass[c.tone]}`}>
              <Link to="/explore/$slug" params={{ slug: c.slug }} className="block overflow-hidden">
                <img src={c.image} srcSet={imageSrcSet(c.image, [360, 640, 900])} sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" alt={`${c.name} category`} loading="lazy" decoding="async" width={1000} height={750} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="display text-4xl">
                  <Link to="/explore/$slug" params={{ slug: c.slug }} className="inline-flex items-start gap-2">{c.name}<ArrowUpRight className="nudge mt-1 h-5 w-5 shrink-0" /></Link>
                </h2>
                <p className="mt-2 text-sm opacity-85">{c.short}</p>
                <div className="mt-auto pt-6"><EnquireButton slug={c.slug} /></div>
              </div>
            </article>
          </li>
        ))}
        {list.length === 0 && <li className="px-3 text-muted-foreground">No categories match “{q}”.</li>}
      </ul>
    </section>
  );
}
