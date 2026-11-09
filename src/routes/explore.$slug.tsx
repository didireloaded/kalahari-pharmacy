import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Phone } from "lucide-react";
import { business, categories, getCategory , imageSrcSet } from "@/content/site";
import { useReveal } from "@/lib/motion";
import { EnquireButton, toneClass } from "@/components/site/CategoryDetail";

export const Route = createFileRoute("/explore/$slug")({
  loader: ({ params }) => {
    const cat = getCategory(params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cat.name} — Kalahari Pharmacy` },
          { name: "description", content: loaderData.cat.intro },
          { property: "og:title", content: `${loaderData.cat.name} — Kalahari Pharmacy` },
          { property: "og:description", content: loaderData.cat.short },
          { property: "og:image", content: loaderData.cat.image },
          { name: "twitter:image", content: loaderData.cat.image },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Category unavailable — Kalahari Pharmacy" }, { name: "robots", content: "noindex" }],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const ref = useReveal<HTMLElement>();
  const others = categories.filter((c) => c.slug !== cat.slug).slice(0, 3);
  return (
    <section ref={ref} key={cat.slug}>
      <div data-nav="dark" className={`relative overflow-hidden px-6 pb-16 pt-32 md:px-14 md:pb-24 md:pt-44 ${toneClass[cat.tone]}`}>
        <Link to="/explore" className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100"><ArrowLeft className="h-4 w-4" /> All categories</Link>
        <div className="mt-8 grid items-end gap-10 md:grid-cols-2">
          <h1 data-reveal className="display text-[clamp(3.5rem,9vw,8rem)]"><span className="line-mask"><span>{cat.name}</span></span></h1>
          <div data-reveal className="leaf overflow-hidden"><img src={cat.image} srcSet={imageSrcSet(cat.image, [480, 900, 1200])} sizes="(max-width: 767px) 100vw, 50vw" alt={`${cat.name}`} loading="lazy" decoding="async" width={1000} height={750} className="aspect-[4/3] w-full object-cover" /></div>
        </div>
      </div>
      <div data-nav="light" className="grid gap-12 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:px-14 md:py-28">
        <div data-reveal className="reveal">
          <p className="text-xl leading-relaxed md:text-2xl">{cat.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <EnquireButton slug={cat.slug} />
            <a href={business.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-hero px-5 py-3 text-sm text-paper"><Phone className="h-4 w-4" />Call to check availability</a>
          </div>
          <p className="mt-6 max-w-md text-xs text-muted-foreground">This is an enquiry, not a purchase or medical consultation. Please don't share health history by email — speak to the pharmacist in person.</p>
        </div>
        <div data-reveal className="reveal" style={{ transitionDelay: "150ms" }}>
          <h2 className="eyebrow text-muted-foreground">You can ask about</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {cat.enquire.map((e) => <li key={e} className="py-4 text-lg">{e}</li>)}
          </ul>
        </div>
      </div>
      <div data-nav="light" className="px-6 pb-10 md:px-14">
        <h2 className="display text-4xl">Keep exploring</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {others.map((o) => (
            <Link key={o.slug} to="/explore/$slug" params={{ slug: o.slug }} className={`group rounded-3xl p-6 ${toneClass[o.tone]}`}>
              <span className="display text-3xl">{o.name}</span>
              <span className="mt-2 block text-sm opacity-80">{o.short}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
