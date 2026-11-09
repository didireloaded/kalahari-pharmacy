import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { pageHead } from "@/lib/seo";
import { business } from "@/content/site";
const questions=[
  ["Blood pressure monitoring","Ask if checks and appointments are offered."],
  ["Glucose or cholesterol screening","Ask about testing, preparation and qualified staff."],
  ["Vaccinations","Ask whether vaccination services are available and who administers them."],
  ["B12 injections","Ask about availability and the required medical authorisation."],
  ["Family and infant wellness","Ask if infant weighing or consultations are available."],
];
export const Route=createFileRoute("/clinic")({head:()=>pageHead("/clinic","Clinic and screening enquiries","Examples of wellness services to enquire about; none are confirmed on this website."),component:Clinic});
function Clinic(){return <section className="information-page" data-nav="light">
  <p className="text-base font-medium text-hero-deep">Service enquiries</p><h1 className="display page-title mt-4">Ask about care.</h1>
  <p className="page-intro">These are common questions, <strong>not confirmed Kalahari Pharmacy services</strong>. No screening, injection, vaccine or appointment is booked here.</p>
  <div className="information-sections">{questions.map(([title,note])=><div key={title} className="grid gap-4 border-b border-border py-7 md:grid-cols-[1fr_1.5fr]"><h2 className="display text-3xl">{title}</h2><p className="text-lg leading-relaxed">{note}</p></div>)}</div>
  <a href={business.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-paper"><Phone className="size-4"/>Ask the pharmacy</a>
  <Link to="/services" className="editorial-link ml-5 inline-block">More service information</Link>
</section>;}
