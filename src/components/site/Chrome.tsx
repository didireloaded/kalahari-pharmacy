import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, Instagram } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useEnquiry } from "@/lib/enquiry";
import { business } from "@/content/site";
import { useParallax } from "@/lib/motion";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-extrabold tracking-[-0.03em] leading-none ${className}`} style={{ fontStretch: "80%" }}>
      Kalahari<span className="font-sans font-normal tracking-normal opacity-80"> pharmacy</span>
    </span>
  );
}

const links = [
  { to: "/explore", label: "Explore" },
  { to: "/contact", label: "Visit" },
] as const;

export function Nav() {
  const [onDark, setOnDark] = useState(false);
  const [open, setOpen] = useState(false);
  const { items } = useEnquiry();
  const path = useRouterState({ select: (s) => s.location.pathname });

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
        if (r.top <= y && r.bottom >= y) dark = s.dataset.nav === "dark";
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

  const tone = onDark ? "text-paper" : "text-ink";
  const pill = onDark ? "pill-glass text-paper hover:bg-paper/35" : "bg-ink/[0.06] text-ink hover:bg-ink/10 backdrop-blur-md";

  return (
    <header className="fixed inset-x-3 top-3 z-50 md:inset-x-[4vw] md:top-[4vw]">
      <nav aria-label="Main" className={`flex items-center justify-between px-5 py-4 transition-colors duration-500 md:px-10 md:py-6 ${tone}`}>
        <Link to="/" aria-label="Kalahari Pharmacy home" className="text-xl md:text-2xl">
          <Wordmark />
        </Link>
        <ul className="absolute left-1/2 hidden -translate-x-1/2 gap-2 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className={`rounded-full px-5 py-2 text-sm transition-colors duration-500 ${pill}`} activeProps={{ "aria-current": "page" }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={business.instagram} target="_blank" rel="noreferrer" aria-label="Kalahari Pharmacy on Instagram" className={`hidden h-10 w-10 place-items-center rounded-full transition-colors duration-500 sm:grid ${pill}`}>
            <Instagram className="h-4 w-4" />
          </a>
          <Link to="/enquiry" aria-label={`My enquiry list, ${items.length} item${items.length === 1 ? "" : "s"}`} className={`relative grid h-10 w-10 place-items-center rounded-full transition-colors duration-500 ${pill}`}>
            <ShoppingBag className="h-4 w-4" />
            {items.length > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-sun px-1 text-[11px] font-semibold text-sun-foreground">{items.length}</span>
            )}
          </Link>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} className={`grid h-10 w-10 place-items-center rounded-full md:hidden ${pill}`}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      {open && (
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
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  useParallax();
  return (
    <div className="min-h-screen p-3 md:p-[4vw]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2">Skip to content</a>
      <Nav />
      <div className="relative overflow-clip rounded-shell bg-paper">
        <main id="main">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
