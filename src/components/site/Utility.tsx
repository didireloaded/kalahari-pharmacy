import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock3, ClipboardList, HeartPulse, MapPin, Phone, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { getWindhoekStatus, type OpeningStatus } from "@/lib/hours";
import { business } from "@/content/site";

export function VisitUtilityStrip() {
  const [status, setStatus] = useState<OpeningStatus>({ state: "unknown", text: "Opening hours not confirmed" });
  useEffect(() => {
    const update = () => setStatus(getWindhoekStatus(new Date(), business.openingHours));
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="quick-actions" tabIndex={-1} aria-label="Quick pharmacy information" className="relative z-10 w-full scroll-mt-20 border-b border-border bg-paper px-5 py-6 sm:px-8 md:px-14 md:py-8">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:items-center md:gap-8">
        <a href={business.phoneHref}
          className="flex min-h-14 min-w-0 items-center justify-center gap-2 rounded-xl bg-ink px-3 py-3 text-center text-paper md:justify-start md:rounded-none md:bg-transparent md:px-0 md:text-left md:text-ink">
          <Phone className="size-5 shrink-0 text-paper md:text-hero-deep" aria-hidden="true" />
          <span className="min-w-0 text-sm font-semibold sm:text-base">
            Call pharmacy
            <span className="mt-1 hidden text-sm font-normal text-muted-foreground md:block">{business.phoneDisplay}</span>
          </span>
        </a>
        <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer"
          className="flex min-h-14 min-w-0 items-center justify-center gap-2 rounded-xl border border-ink bg-paper px-3 py-3 text-center text-ink md:justify-start md:border-0 md:px-0 md:text-left">
          <MapPin className="size-5 shrink-0 text-hero-deep" aria-hidden="true" />
          <span className="min-w-0 text-sm font-semibold sm:text-base">
            Directions
            <span className="mt-1 hidden text-sm font-normal text-muted-foreground md:block">Gustav Voigts Centre, Windhoek</span>
          </span>
        </a>
        <div className="col-span-2 flex min-w-0 items-center gap-3 border-t border-border pt-5 md:col-span-1 md:border-0 md:pt-0">
          <Clock3 className="size-5 shrink-0 text-hero-deep" aria-hidden="true" />
          <div className="min-w-0">
            <strong className="block text-sm font-semibold text-ink sm:text-base" role="status">{status.text}</strong>
            <Link to="/visit" className="mt-1 inline-block text-sm text-muted-foreground underline underline-offset-4">
              Confirm hours before visiting
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


const patientLinks = [
  { to: "/prescriptions", title: "Prescriptions", subtitle: "Ask how to prepare before visiting", icon: ClipboardList },
  { to: "/medical-aid", title: "Medical aid", subtitle: "Check claims and co-payment questions", icon: ShieldCheck },
  { to: "/clinic", title: "Screening enquiries", subtitle: "Ask which services are available", icon: HeartPulse },
  { to: "/travel", title: "Safari first aid", subtitle: "Make a non-medicinal kit checklist", icon: Truck },
] as const;

/** Patient utility, immediately after the image-led hero and primary contact strip. */
export function PatientQuickLinks() {
  return (
    <section aria-labelledby="patient-links" data-nav="light" className="border-b border-border bg-paper px-5 py-10 sm:px-8 md:px-14 md:py-14">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-semibold text-hero-deep">Here for something specific?</p>
        <h2 id="patient-links" className="display mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-tight text-ink">Start with what you need.</h2></div>
        <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline underline-offset-4">All enquiries <ArrowUpRight className="size-4" /></Link>
      </div>
      <div className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {patientLinks.map(({ to, title, subtitle, icon: Icon }, i) => (
          <Link key={to} to={to} className={`group flex min-h-36 flex-col justify-between gap-5 border-b border-border px-3 py-6 transition-colors hover:bg-ice focus-visible:bg-ice sm:px-5 lg:border-r lg:last:border-r-0 ${i % 2 === 0 ? "sm:border-r" : ""}`}>
            <div className="flex items-center justify-between gap-3"><Icon className="size-6 text-hero-deep" aria-hidden="true" /><ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></div>
            <div><h3 className="text-lg font-semibold text-ink">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p></div>
          </Link>
        ))}
      </div>
      <p className="mt-5 max-w-3xl text-sm text-muted-foreground">Information and enquiry topics only. Service availability, opening hours, stock and medical-aid participation must be confirmed directly with Kalahari Pharmacy.</p>
    </section>
  );
}
