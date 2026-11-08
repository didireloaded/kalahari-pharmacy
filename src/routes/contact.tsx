import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { business } from "@/content/site";
import { useReveal } from "@/lib/motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Visit & contact — Kalahari Pharmacy, Windhoek" },
      { name: "description", content: "Find Kalahari Pharmacy at Gustav Voigts Centre, Independence Avenue, Windhoek. Call +264 61 252 448 or email kalpharm@iway.na." },
      { property: "og:title", content: "Visit Kalahari Pharmacy" },
      { property: "og:description", content: "Gustav Voigts Centre, Independence Avenue, Windhoek, Namibia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const ref = useReveal<HTMLElement>();
  const rows = [
    { icon: Phone, label: "Call", value: business.phoneDisplay, href: business.phoneHref },
    { icon: Mail, label: "Email", value: business.email, href: `mailto:${business.email}` },
    { icon: MapPin, label: "Directions", value: "Open in Google Maps", href: business.mapsUrl, ext: true },
    { icon: Instagram, label: "Instagram", value: business.instagramHandle, href: business.instagram, ext: true },
  ];
  return (
    <section ref={ref}>
      <div data-nav="dark" className="bg-hero px-6 pb-20 pt-32 text-paper md:px-14 md:pb-28 md:pt-44">
        <p className="eyebrow text-ice">Visit</p>
        <h1 data-reveal className="display mt-4 text-[clamp(3.5rem,11vw,10rem)]">
          <span className="line-mask"><span>Find us in</span></span>
          <span className="line-mask"><span style={{ transitionDelay: "120ms" }}>the city centre.</span></span>
        </h1>
        <address className="mt-10 not-italic text-xl md:text-2xl">{business.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
      </div>
      <ul data-nav="light" className="px-3 py-10 md:px-10 md:py-16">
        {rows.map((r, i) => (
          <li key={r.label} data-reveal className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
            <a href={r.href} {...(r.ext ? { target: "_blank", rel: "noreferrer" } : {})}
              className="group flex items-center justify-between gap-4 border-b border-border px-3 py-7 transition-colors hover:bg-muted md:py-10">
              <span className="flex items-center gap-4 text-sm text-muted-foreground"><r.icon className="h-5 w-5" aria-hidden />{r.label}</span>
              <span className="display flex items-center gap-3 text-right text-[clamp(1.5rem,4vw,3.5rem)]">{r.value}<ArrowUpRight className="nudge h-6 w-6 shrink-0" /></span>
            </a>
          </li>
        ))}
      </ul>
      <p className="px-6 text-sm text-muted-foreground md:px-14">Opening hours will be added once confirmed — please call ahead before visiting.</p>
    </section>
  );
}
