import { Link } from "@tanstack/react-router";
import { Clock3, MapPin, Phone } from "lucide-react";
import { business } from "@/content/site";
export function VisitUtilityStrip() {
  return <section aria-label="Quick pharmacy information" className="relative z-10 border-b border-border bg-paper px-6 py-6 md:px-14">
    <div className="grid gap-5 md:grid-cols-3">
      <a href={business.phoneHref} className="flex items-center gap-4 py-2"><Phone className="size-5 text-hero-deep"/><span><strong className="block">Call the pharmacy</strong><span className="text-sm">{business.phoneDisplay}</span></span></a>
      <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 py-2"><MapPin className="size-5 text-hero-deep"/><span><strong className="block">Directions</strong><span className="text-sm">Gustav Voigts Centre, Windhoek</span></span></a>
      <div className="flex items-center gap-4 py-2"><Clock3 className="size-5 text-hero-deep"/><span><strong className="block">Hours not yet confirmed</strong><Link to="/visit" className="text-sm underline underline-offset-4">Call ahead before visiting</Link></span></div>
    </div>
  </section>;
}
export function MobileContactBar() {
  return <aside aria-label="Quick pharmacy actions" className="mobile-contact-bar fixed inset-x-0 bottom-0 z-[60] flex gap-3 border-t border-border bg-paper p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] shadow-lg md:hidden">
    <a href={business.phoneHref} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 font-semibold text-paper"><Phone className="size-4"/>Call</a>
    <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-ink px-4 py-3 font-semibold text-ink"><MapPin className="size-4"/>Directions</a>
  </aside>;
}
