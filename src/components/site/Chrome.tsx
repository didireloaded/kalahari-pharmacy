import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Menu, Instagram, Phone, MapPin } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useEnquiry } from "@/lib/enquiry";
import { business } from "@/content/site";
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
      <nav aria-label="Main" className="mx-auto flex min-h-16 w-full max-w-[1700px] items-center justify-between gap-2 bg-paper px-3 py-2 text-ink sm:px-4 md:gap-3 md:px-[4vw]">
        <Link to="/" aria-label="Kalahari Pharmacy home" className="min-w-0 whitespace-nowrap text-[clamp(0.98rem,4.6vw,1.35rem)] sm:text-xl md:text-2xl">
          <Wordmark />
        </Link>
        <ul className="hidden gap-1 min-[1280px]:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="nav-link block rounded-lg px-3 py-3 text-sm font-medium text-ink transition-colors duration-150" activeProps={{ "aria-current": "page" }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <a href={business.phoneHref} aria-label="Call Kalahari Pharmacy"
            className="hidden size-11 shrink-0 place-items-center rounded-full bg-ice text-ink min-[360px]:grid min-[1280px]:hidden">
            <Phone className="size-5" aria-hidden="true" />
          </a>
          <a href={business.instagram} target="_blank" rel="noreferrer" aria-label="Kalahari Pharmacy on Instagram" className={`hidden h-10 w-10 place-items-center rounded-full transition-colors duration-500 sm:grid ${pill}`}>
            <Instagram className="h-4 w-4" />
          </a>
          <Link to="/cart" aria-label={`Request basket, ${basket.length} items`} className="relative grid size-11 shrink-0 place-items-center rounded-full bg-ice text-ink hover:bg-ice/80">
            <ShoppingBag className="h-4 w-4" />
            {basket.length + items.length > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-sun px-1 text-xs font-semibold text-sun-foreground">{basket.length + items.length}</span>
            )}
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={open ? "Menu open" : "Open menu"} className="size-11 shrink-0 min-[1280px]:hidden"><Menu /></Button>
            </SheetTrigger>
            <SheetContent className="w-full max-w-[440px] overflow-y-auto px-5 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-7">
              <SheetTitle className="pt-4 text-2xl">Kalahari Pharmacy</SheetTitle>
              <SheetDescription className="mt-1 text-base">Find products, services and pharmacy information.</SheetDescription>
              <nav aria-label="Mobile website navigation" className="mt-8 space-y-8">
                <div>
                  <p className="mb-3 text-sm font-semibold text-muted-foreground">Explore the website</p>
                  <div className="grid grid-cols-2 gap-1">
                    {links.map((link) => (
                      <Link key={link.to} to={link.to} onClick={() => setOpen(false)}
                        className="flex min-h-12 items-center rounded-xl px-3 text-base font-medium text-ink hover:bg-ice focus-visible:bg-ice"
                        activeProps={{ "aria-current": "page" }}>{link.label}</Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-sm font-semibold text-muted-foreground">Helpful information</p>
                  <div className="grid grid-cols-2 gap-1">
                    {extraLinks.map((link) => (
                      <Link key={link.to} to={link.to} onClick={() => setOpen(false)}
                        className="flex min-h-12 items-center rounded-xl px-3 text-sm font-medium text-ink hover:bg-ice focus-visible:bg-ice"
                        activeProps={{ "aria-current": "page" }}>{link.label}</Link>
                    ))}
                    <Link to="/enquiry" onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center rounded-xl px-3 text-sm font-medium text-ink hover:bg-ice">My enquiry list</Link>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a href={business.phoneHref} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-paper"><Phone className="size-4" aria-hidden="true" />Call</a>
                  <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink px-4 py-3 text-sm font-semibold text-ink"><MapPin className="size-4" aria-hidden="true" />Directions</a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
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
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [introScrolled, setIntroScrolled] = useState(false);

  useEffect(() => {
    if (path !== "/") return;
    const updateVisibility = () => {
      setIntroScrolled(window.scrollY > Math.max(48, window.innerHeight * 0.08));
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [path]);

  // Keep the image-first home intro. Contact actions live in the menu and content.
  const showChrome = path !== "/" || introScrolled;

  return (
    <div className="site-shell min-h-screen w-full min-w-0 overflow-x-clip bg-paper">
      <a href={path === "/" ? "#about" : "#main"} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2">Skip to content</a>
      <Nav visible={showChrome} />
      <div className="relative w-full min-w-0 overflow-clip bg-paper">
        <main id="main">{children}</main>
        <Footer />
      </div>
    </div>
  );
}