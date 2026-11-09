import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, Instagram } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useEnquiry } from "@/lib/enquiry";
import { business } from "@/content/site";
import { useParallax } from "@/lib/motion";
import { useBasket } from "@/lib/basket";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-extrabold leading-none ${className}`}>
      Kalahari<span className="font-sans font-normal tracking-normal opacity-80"> pharmacy</span>
    </span>
  );
}

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/store", label: "Store" },
  { to: "/services", label: "Services" },
  { to: "/prescriptions", label: "Prescriptions" },
  { to: "/about", label: "About" },
  { to: "/faqs", label: "FAQs" },
  { to: "/visit", label: "Visit" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [onDark, setOnDark] = useState(false);
  const [introStage, setIntroStage] = useState(false);
  const [open, setOpen] = useState(false);
  const { items } = useEnquiry();
  const { items: basket } = useBasket();
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const update = () => setIntroStage(path === "/" && window.scrollY < window.innerHeight * 0.16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [path]);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const y = 56;
      const secs = document.querySelectorAll<HTMLElement>("[data-nav]");
      let dark = false;
      secs.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= y && r.bottom >= y) dark = s.dataset['nav'] === "dark";
      });
      setOnDark(dark);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    const t = setTimeout(check, 100);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); clearTimeout(t); };
  }, [path]);

  const tone = "text-ink";
  const pill = onDark ? "bg-ice text-ink hover:bg-ice/90" : "bg-ice text-ink hover:bg-ice/90";

  return (
    <header className={`site-header ${introStage ? "intro-stage" : ""} fixed inset-x-3 top-3 z-50 md:inset-x-[4vw] md:top-[4vw] ${path === '/' ? 'home-header' : ''}`}>
      <nav aria-label="Main" className={`flex items-center justify-between gap-3 rounded-lg bg-paper px-4 py-3 text-ink ${tone}`}>
        <Link to="/" aria-label="Kalahari Pharmacy home" className="text-xl md:text-2xl">
          <Wordmark />
        </Link>
        <ul className="hidden gap-1 min-[1440px]:flex">
          {!introStage && links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="block px-2 py-3 text-sm font-medium text-ink hover:underline" activeProps={{ "aria-current": "page" }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={business.instagram} target="_blank" rel="noreferrer" aria-label="Kalahari Pharmacy on Instagram" className={`hidden h-10 w-10 place-items-center rounded-full transition-colors duration-500 sm:grid ${pill}`}>
            <Instagram className="h-4 w-4" />
          </a>
          <Link to="/cart" aria-label={`Request basket, ${basket.length} items`} className="relative grid h-10 w-10 place-items-center rounded-full bg-ice text-ink">
            <ShoppingBag className="h-4 w-4" />
            {basket.length + items.length > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-sun px-1 text-xs font-semibold text-sun-foreground">{basket.length + items.length}</span>
            )}
          </Link>
          <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Open menu" className={introStage ? "" : "min-[1440px]:hidden"}><Menu /></Button></SheetTrigger><SheetContent className="w-full max-w-md overflow-y-auto"><SheetTitle>Kalahari Pharmacy</SheetTitle><SheetDescription>Pages and enquiry lists</SheetDescription><nav aria-label="All pages" className="mt-6">{[...links, { to: '/enquiry', label: 'My enquiry list' }, { to: '/cart', label: 'Request basket' }].map((l) => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-3 text-xl font-medium">{l.label}</Link>)}</nav></SheetContent></Sheet>
        </div>
      </nav>
      {false && open && (
        <div id="mobile-menu" className="mx-2 rounded-3xl bg-paper p-6 text-ink shadow-[var(--shadow-card)] animate-in fade-in slide-in-from-top-2 md:hidden">
          <ul className="space-y-1">
            {[{ to: "/", label: "Home" }, ...links, { to: "/enquiry", label: "My enquiry list" }].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="display block py-2 text-4xl">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export function Loader() {
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setHide(true), 900);
    const t2 = setTimeout(() => setGone(true), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (gone) return null;
  return (
    <div aria-hidden className={`fixed inset-0 z-[100] grid place-items-center bg-hero transition-[clip-path] duration-700 ease-[var(--ease-out)] ${hide ? "[clip-path:inset(0_0_100%_0)]" : "[clip-path:inset(0_0_0_0)]"}`}>
      <svg viewBox="0 0 60 60" className="h-14 w-14 text-paper" style={{ animation: "spin-seg 1.6s linear infinite" }}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d="M30 6 A24 24 0 0 1 50.8 18" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeDasharray="60"
            transform={`rotate(${i * 60} 30 30)`} style={{ animation: `seg-in 0.5s ${i * 0.08}s both` }} opacity={0.4 + i * 0.1} />
        ))}
      </svg>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="px-6 pb-10 pt-20 md:px-14">
      <div className="flex flex-col gap-10 border-t border-border pt-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Wordmark className="text-4xl md:text-6xl" />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Information on this site is general and not medical advice. Please speak to a pharmacist or doctor about your health.
          </p>
        </div>
        <div className="grid gap-1 text-sm">
          {business.addressLines.map((l) => <span key={l}>{l}</span>)}
          <a href={business.phoneHref} className="underline-offset-4 hover:underline">{business.phoneDisplay}</a>
          <a href={`mailto:${business.email}`} className="underline-offset-4 hover:underline">{business.email}</a>
        </div>
      </div>
      <p className="mt-10 text-xs text-muted-foreground">© {new Date().getFullYear()} Kalahari Pharmacy, Windhoek.</p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 text-base">{[...links, {to:'/privacy',label:'Privacy'}, {to:'/terms',label:'Terms'}, {to:'/accessibility',label:'Accessibility'}, {to:'/enquiry',label:'Enquiry list'}].map((l) => <Link key={l.to} to={l.to} className="underline underline-offset-4">{l.label}</Link>)}</div>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  useParallax();
  return (
    <div className="site-shell min-h-screen p-3 md:p-[4vw]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2">Skip to content</a>
      <Nav />
      <div className="relative overflow-clip rounded-shell bg-paper">
        <main id="main">{children}</main>
        <Footer />
      </div>
    </div>
  );
}