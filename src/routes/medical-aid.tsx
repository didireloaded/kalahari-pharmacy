import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { business } from "@/content/site";
import { pageHead } from "@/lib/seo";
export const Route=createFileRoute("/medical-aid")({head:()=>pageHead("/medical-aid","Medical aid enquiries","Medical-aid participation and co-payment details must be confirmed with the pharmacy."),component:MedicalAid});
const schemes=["PSEMAS","Namibia Health Plan (NHP)","Prosperity Health","Methealth-administered plans","Bankmed Namibia","Renaissance Health"];
function MedicalAid(){return <section className="information-page" data-nav="light">
  <p className="text-base font-medium text-hero-deep">Before your visit</p><h1 className="display page-title mt-4">Medical aid questions.</h1>
  <p className="page-intro">No direct-claims checker is connected. These are examples of schemes people might ask about, <strong>not confirmed partners or accepted schemes</strong>.</p>
  <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{schemes.map(s=><div key={s} className="rounded-2xl border border-border p-5"><strong className="block text-lg">{s}</strong><span className="mt-2 block text-sm text-muted-foreground">Acceptance unverified · Call to check</span></div>)}</div>
  <div className="mt-10 rounded-2xl bg-ice p-7"><h2 className="display text-3xl">Ask before sharing details.</h2>
    <p className="mt-4 max-w-3xl text-base leading-relaxed">Call to confirm direct claims, authorisations, documentation and co-payments. Please don't enter medical-aid membership numbers or health history in ordinary website forms.</p>
    <a href={business.phoneHref} className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-paper"><Phone className="size-4"/>Call {business.phoneDisplay}</a>
  </div><Link to="/faqs" className="editorial-link mt-8 inline-block">Frequently asked questions</Link></section>;}
