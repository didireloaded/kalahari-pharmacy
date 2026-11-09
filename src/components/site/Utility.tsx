import { Link } from "@tanstack/react-router";
import { Clock3, MapPin, Phone } from "lucide-react";
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
    <section aria-label="Quick pharmacy information" className="relative z-10 w-full border-b border-border bg-paper px-5 py-6 sm:px-8 md:px-14 md:py-8">
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
