import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, MessageCircle, Phone, Mail, Instagram } from "lucide-react";
import { business, categories, featured, getCategory, images, infoCards, messages, objects, type Category } from "@/content/site";
import { useReveal } from "@/lib/motion";
import { Loader } from "@/components/site/Chrome";
import { CategoryDialog } from "@/components/site/CategoryDetail";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kalahari Pharmacy — Care that feels closer | Windhoek" },
      { name: "description", content: "Everyday essentials, practical guidance and a familiar place to turn — at Gustav Voigts Centre, Independence Avenue, Windhoek." },
      { property: "og:title", content: "Kalahari Pharmacy — Care that feels closer" },
      { property: "og:description", content: "Your everyday neighbourhood pharmacy in Windhoek, Namibia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState<Category | null>(null);
  return (
    <>
      <Loader />
      <Hero />
      <div className="relative z-10 -mt-[18vh] rounded-t-shell bg-paper md:-mt-[28vh]">
        <About />
        <Products onOpen={setOpen} />
      </div>
      <Lifestyle />
      <Editorial />
      <Visit />
      <CategoryDialog cat={open} onClose={() => setOpen(null)} />
    </>
  );
}

const Line = ({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) => (
  <span className={`line-mask ${className}`}><span style={{ transitionDelay: `${d}ms` }}>{children}</span></span>
);

function Hero() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} data-nav="dark" className="sticky top-0 h-[100svh] min-h-[640px] overflow-hidden bg-hero text-paper">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[20%] top-[10%] h-[70vh] w-[70vh] rounded-full bg-hero-deep/50 blur-3xl" />
        <div className="absolute -right-[10%] bottom-[-20%] h-[80vh] w-[80vh] rounded-full bg-ice/15 blur-3xl" />
      </div>
      <div data-reveal className="relative flex h-full flex-col items-center justify-center pt-16 text-center" data-parallax="-0.25">
        <p className="reveal eyebrow text-ice is-delay" style={{ transitionDelay: "1000ms" }} data-reveal>Your everyday neighbourhood pharmacy</p>
        <h1 className="display relative mt-6 text-[clamp(4rem,14vw,13rem)]">
          <Line d={1150}>Care that</Line>
          <span className="relative z-20 block"><Line d={1300}>feels closer.</Line></span>
        </h1>
        {/* Portrait overlapping the title */}
        <div className="absolute left-1/2 top-[52%] z-10 w-[min(52vw,300px)] -translate-x-1/2 -translate-y-1/2 md:w-[min(26vw,380px)]">
          <div data-reveal className="reveal overflow-hidden rounded-t-full rounded-b-[40px] shadow-[var(--shadow-float)]" style={{ transitionDelay: "1450ms", transitionDuration: "1.4s" }}>
            <img src={images.hero} alt="Smiling woman in a softly lit portrait" width={900} height={1100} fetchPriority="high" className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
        <img src={objects.jar} alt="" aria-hidden width={816} height={816} data-reveal style={{ ["--r" as string]: "-14deg", transitionDelay: "1650ms" }}
          className="reveal floaty absolute left-[3%] top-[58%] z-20 w-[26vw] max-w-[260px] drop-shadow-[0_30px_30px_oklch(0.2_0.05_245/0.45)] md:left-[12%] md:top-[50%]" />
        <img src={objects.pump} alt="" aria-hidden width={816} height={816} data-reveal style={{ ["--r" as string]: "12deg", transitionDelay: "1800ms", animationDelay: "-3s" }}
          className="reveal floaty absolute right-[2%] top-[20%] z-0 w-[24vw] max-w-[240px] drop-shadow-[0_30px_30px_oklch(0.2_0.05_245/0.45)] md:right-[12%]" />
        <p data-reveal className="reveal absolute bottom-[22vh] left-6 max-w-[16rem] text-left text-sm text-ice md:bottom-[32vh] md:left-14 md:text-base" style={{ transitionDelay: "1900ms" }}>
          Everyday essentials, practical guidance, and a familiar place to turn.
        </p>
      </div>
    </section>
  );
}

function About() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="relative overflow-hidden px-6 pb-24 pt-24 md:pb-40 md:pt-40" data-nav="light">
      <div className="absolute -left-10 top-24 hidden w-[22vw] max-w-[320px] md:block" aria-hidden>
        <div data-reveal className="leaf" ><img src={images.aboutLeft} alt="" loading="lazy" className="aspect-[3/4] w-full object-cover" data-parallax="-0.08" /></div>
      </div>
      <div className="absolute -right-10 bottom-16 hidden w-[22vw] max-w-[320px] md:block" aria-hidden>
        <div data-reveal className="leaf-r" style={{ transitionDelay: "200ms" }}><img src={images.aboutRight} alt="" loading="lazy" className="aspect-[3/4] w-full object-cover" data-parallax="0.08" /></div>
      </div>
      <div data-reveal className="relative mx-auto max-w-4xl text-center">
        <p className="eyebrow text-muted-foreground">Our care</p>
        <h2 className="display mt-6 text-[clamp(2.75rem,7vw,6.5rem)]">
          <Line>A familiar</Line><Line d={100}>counter in the</Line><Line d={200}>heart of</Line><Line d={300}>Windhoek.</Line>
        </h2>
        <p data-reveal className="reveal mx-auto mt-10 max-w-md text-base text-muted-foreground" style={{ transitionDelay: "400ms" }}>
          On Independence Avenue at Gustav Voigts Centre, we keep things simple: everyday products, honest answers, and time for your questions.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-3 md:hidden" aria-hidden>
        <img src={images.aboutLeft} alt="" loading="lazy" className="aspect-[3/4] w-full rounded-t-full rounded-b-3xl object-cover" />
        <img src={images.aboutRight} alt="" loading="lazy" className="mt-10 aspect-[3/4] w-full rounded-t-full rounded-b-3xl object-cover" />
      </div>
    </section>
  );
}

function ProductPanel({ cat, onOpen, delay, idx }: { cat: Category; onOpen: (c: Category) => void; delay: number; idx: number }) {
  const [t, setT] = useState({ x: 0, y: 0 });
  const move = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    setT({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };
  const sun = cat.tone === "sun";
  return (
    <article data-reveal onPointerMove={move} onPointerLeave={() => setT({ x: 0, y: 0 })} style={{ transitionDelay: `${delay}ms` }}
      className={`reveal relative flex aspect-[4/5] flex-col overflow-hidden rounded-[28px] p-6 md:aspect-[5/6] md:rounded-[36px] md:p-9 ${sun ? "bg-sun text-sun-foreground" : "bg-wine text-wine-foreground"}`}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="display max-w-[8ch] text-[clamp(2.5rem,5vw,4.75rem)]">{cat.name}</h3>
        <span className={`rounded-full px-3 py-1 text-xs ${sun ? "bg-sun-foreground/10" : "bg-paper/15"}`}>0{idx + 1}</span>
      </div>
      <img src={cat.object} alt="" aria-hidden loading="lazy" width={816} height={816}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[62%] max-w-[420px] drop-shadow-[0_40px_40px_oklch(0.15_0.04_30/0.4)] transition-transform duration-500 ease-out"
        style={{ transform: `translate(calc(-50% + ${t.x * 24}px), calc(-42% + ${t.y * 18}px)) rotate(${(sun ? -8 : 8) + t.x * 8}deg)` }} />
      <div className="relative mt-auto flex items-end justify-between gap-4">
        <p className="max-w-[16rem] text-sm opacity-85">{cat.short}</p>
        <button type="button" onClick={() => onOpen(cat)} aria-label={`Details: ${cat.name}`}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:scale-105">
          Details <ArrowRight className={`nudge h-4 w-4 ${sun ? "text-tangerine" : "text-wine"}`} />
        </button>
      </div>
    </article>
  );
}

function Products({ onOpen }: { onOpen: (c: Category) => void }) {
  const ref = useReveal<HTMLElement>();
  const feat = featured.map((s) => getCategory(s)!);
  return (
    <section ref={ref} className="px-3 pb-24 md:px-10 md:pb-32" data-nav="light" aria-labelledby="browse-h">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 px-3 md:flex-row md:items-end">
        <h2 id="browse-h" className="display text-[clamp(2.5rem,6vw,5.5rem)]"><Line>Browse what</Line><Line d={100}>we can help with.</Line></h2>
        <Link to="/explore" className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-paper">
          All {categories.length} categories <ArrowUpRight className="nudge h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-2 md:gap-5">
        {feat.map((c, i) => <ProductPanel key={c.slug} cat={c} onOpen={onOpen} delay={i * 180} idx={i} />)}
      </div>
    </section>
  );
}

const iconMap = { MapPin, MessageCircle, Phone };

function Lifestyle() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} data-nav="dark" className="relative mx-0 overflow-hidden text-paper">
      <div className="relative min-h-[110svh] md:min-h-[120vh]">
        <img src={images.lifestyle} alt="A family walking together at sunset" loading="lazy" data-parallax="0.12" data-scale="1"
          className="absolute inset-[-8%] h-[116%] w-[116%] object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/45 via-transparent to-ink/50" />
        <div className="relative px-6 pt-32 md:px-14 md:pt-44">
          <h2 className="display max-w-[11ch] text-[clamp(3rem,8vw,7.5rem)]"><Line>For the whole</Line><Line d={120}>household.</Line></h2>
        </div>
        <div className="absolute inset-x-3 bottom-6 grid gap-3 md:inset-x-10 md:bottom-12 md:grid-cols-3 md:gap-5">
          {infoCards.map((c, i) => {
            const I = iconMap[c.icon];
            return (
              <div key={c.title} data-reveal style={{ transitionDelay: `${200 + i * 150}ms` }} className="reveal rounded-3xl bg-paper p-6 text-ink shadow-[var(--shadow-card)]">
                <I className="h-5 w-5 text-hero" aria-hidden />
                <h3 className="mt-6 text-lg font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Editorial() {
  const ref = useReveal<HTMLElement>();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (d: number) => { setDir(d); setI((p) => (p + d + messages.length) % messages.length); };
  const m = messages[i];
  return (
    <section ref={ref} data-nav="light" className="px-6 py-24 md:px-14 md:py-36" aria-roledescription="carousel" aria-label="Why care matters">
      <h2 className="display mx-auto max-w-5xl text-center text-[clamp(2.75rem,7vw,6.5rem)]"><Line>Why everyday</Line><Line d={100}>care matters.</Line></h2>
      <div className="mt-16 grid items-center gap-12 md:mt-24 md:grid-cols-[minmax(0,320px)_1fr] md:gap-20">
        <div className="relative mx-auto h-[300px] w-[260px] md:h-[380px] md:w-[300px]" aria-hidden>
          <div className="absolute left-0 top-6 h-28 w-28 rounded-2xl bg-tangerine" />
          <div className="absolute bottom-0 right-2 h-32 w-32 rounded-2xl bg-ice" />
          {messages.map((x, k) => {
            const pos = (k - i + messages.length) % messages.length;
            return (
              <img key={x.label} src={x.image} alt="" loading="lazy"
                className="absolute h-36 w-36 rounded-3xl object-cover shadow-[var(--shadow-card)] transition-all duration-700 ease-[var(--ease-out)] md:h-44 md:w-44"
                style={{ left: `${[30, 120, 60, 10][pos]}px`, top: `${[40, 130, 210, 150][pos]}px`, zIndex: 10 - pos, opacity: pos === 3 ? 0 : 1, transform: `scale(${1 - pos * 0.12}) rotate(${[-3, 4, -2, 0][pos]}deg)` }} />
            );
          })}
        </div>
        <div>
          <div className="overflow-hidden" aria-live="polite">
            <blockquote key={i} className={`animate-in fade-in duration-700 ${dir > 0 ? "slide-in-from-right-12" : "slide-in-from-left-12"}`}>
              <p className="display text-[clamp(2rem,4.2vw,4rem)] leading-[0.98]">“{m.quote}”</p>
              <footer className="mt-6 text-sm text-muted-foreground">{m.label} · Kalahari Pharmacy</footer>
            </blockquote>
          </div>
          <div className="mt-10 flex items-center gap-3">
            <button type="button" onClick={() => go(-1)} aria-label="Previous message" className="group grid h-12 w-12 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-paper"><ArrowLeft className="h-4 w-4" /></button>
            <button type="button" onClick={() => go(1)} aria-label="Next message" className="group grid h-12 w-12 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-paper"><ArrowRight className="h-4 w-4" /></button>
            <span className="ml-3 text-sm tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")} / {String(messages.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Visit() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="px-3 md:px-10" data-nav="dark">
      <div data-reveal className="reveal grid gap-10 rounded-[28px] bg-hero p-8 text-paper md:grid-cols-2 md:rounded-[36px] md:p-14">
        <div>
          <p className="eyebrow text-ice">Visit</p>
          <h2 className="display mt-4 text-[clamp(2.75rem,6vw,5.5rem)]">Come say hello.</h2>
          <address className="mt-6 not-italic text-lg">{business.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
        </div>
        <div className="flex flex-col justify-end gap-3">
          <a href={business.phoneHref} className="group flex items-center justify-between rounded-full bg-paper px-6 py-4 text-ink"><span className="flex items-center gap-3"><Phone className="h-4 w-4" />{business.phoneDisplay}</span><ArrowUpRight className="nudge h-4 w-4" /></a>
          <a href={`mailto:${business.email}`} className="group flex items-center justify-between rounded-full bg-paper/15 px-6 py-4 hover:bg-paper/25"><span className="flex items-center gap-3"><Mail className="h-4 w-4" />{business.email}</span><ArrowUpRight className="nudge h-4 w-4" /></a>
          <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-full bg-paper/15 px-6 py-4 hover:bg-paper/25"><span className="flex items-center gap-3"><MapPin className="h-4 w-4" />Get directions</span><ArrowUpRight className="nudge h-4 w-4" /></a>
          <a href={business.instagram} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-full bg-paper/15 px-6 py-4 hover:bg-paper/25"><span className="flex items-center gap-3"><Instagram className="h-4 w-4" />{business.instagramHandle}</span><ArrowUpRight className="nudge h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}
