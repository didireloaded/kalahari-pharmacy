import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Menu, Instagram } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useEnquiry } from "@/lib/enquiry";
import { business } from "@/content/site";
import { useParallax } from "@/lib/motion";
import { useBasket } from "@/lib/basket";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { MobileContactBar } from "@/components/site/Utility";

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
  { to: "/about", label: "About" },
  { to: "/faqs", label: "FAQs" },
  { to: "/visit", label: "Visit" },
  { to: "/contact", label: "Contact" },
] as const;
const extraLinks = [
  { to: "/prescriptions", label: "Prescriptions" },
  { to: "/medical-aid", label: "Medical aid" },
  { to: "/clinic", label: "Screenings" },
  { to: "/travel", label: "Safari kit builder" },
  { to: "/wellness-guide", label: "Wellness AI guide" },
] as const;

export function Nav({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false);
  const { items } = useEnquiry();
  const { items: basket } = useBasket();
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [path]);
  const pill = "bg-ice text-ink hover:bg-ice/90";

  return (
    <header inert={!visible} aria-hidden={!visible} className={`site-header fixed inset-x-0 top-0 z-[80] w-full border-b border-border bg-paper shadow-[0_6px_24px_rgba(0,0,0,0.08)] transition-[opacity,transform] duration-300 ease-out ${visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"}`}>
      <nav aria-label="Main" className="mx-auto flex w-full max-w-[1700px] items-center justify-between gap-3 bg-paper px-4 py-3 text-ink md:px-[4vw]">
        <Link to="/" aria-label="Kalahari Pharmacy home" className="text-xl md:text-2xl">
          <Wordmark />
        </Link>
        <ul className="hidden gap-1 min-[1440px]:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="nav-link block rounded-lg px-3 py-3 text-sm font-medium text-ink transition-colors duration-150" activeProps={{ "aria-current": "page" }}>
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
          <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Open menu" className="min-[1440px]:hidden"><Menu /></Button></SheetTrigger><SheetContent className="w-full max-w-md overflow-y-auto"><SheetTitle>Kalahari Pharmacy</SheetTitle><SheetDescription>Pages and enquiry lists</SheetDescription><nav aria-label="All pages" className="mt-6">{[...links, ...extraLinks, { to: '/enquiry', label: 'My enquiry list' }, { to: '/cart', label: 'Request basket' }].map((l) => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-3 text-xl font-medium">{l.label}</Link>)}</nav></SheetContent></Sheet>
        </div>
      </nav>

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
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground" aria-label="Website policies"><Link to="/privacy" className="hover:text-ink">Privacy</Link><Link to="/terms" className="hover:text-ink">Terms</Link><Link to="/accessibility" className="hover:text-ink">Accessibility</Link></div>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  useParallax();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [introScrolled, setIntroScrolled] = useState(false);
  const [introSceneFinished, setIntroSceneFinished] = useState(false);

  useEffect(() => {
    if (path !== "/") return;
    const updateVisibility = () => {
      setIntroScrolled(window.scrollY > Math.max(48, window.innerHeight * 0.08));
      const hero = document.querySelector<HTMLElement>(".scroll-hero");
      const endOfScene = hero ? hero.offsetHeight - window.innerHeight * 1.05 : window.innerHeight;
      setIntroSceneFinished(window.scrollY > endOfScene);
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [path]);

  // The homepage opens as an uninterrupted photograph. Navigation and mobile
  // contact actions emerge on scroll; other pages have navigation immediately.
  const showChrome = path !== "/" || introScrolled;
  const showMobileContact = path !== "/" || introSceneFinished;

  return (
    <div className="site-shell min-h-screen w-full min-w-0 overflow-x-clip bg-paper pb-24 md:pb-0">
      <a href={path === "/" ? "#about" : "#main"} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2">Skip to content</a>
      <Nav visible={showChrome} />
      <div className="relative w-full min-w-0 overflow-clip bg-paper">
        <main id="main">{children}</main>
        <Footer />
      </div>
      <MobileContactBar visible={showMobileContact} />
    </div>
  );
}