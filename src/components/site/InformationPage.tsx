import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { business } from "@/content/site";
import { Button } from "@/components/ui/button";
export type InformationSection = { title: string; text: string };
export function InformationPage({ title, intro, sections, image }: { title: string; intro: string; sections: InformationSection[]; image?: string }) {
  return <section data-nav="light" className="information-page">
    <h1 className="display page-title">{title}</h1>
    <p className="page-intro">{intro}</p>
    {image && <figure className="mt-12"><img src={image} alt="Illustrative family wellness photograph; not Kalahari staff or premises" className="max-h-[560px] w-full object-cover rounded-lg" width={1800} height={1000} /><figcaption className="mt-3 text-sm text-muted-foreground">Editorial atmosphere photography — illustrative until approved by Kalahari Pharmacy.</figcaption></figure>}
    <div className="information-sections">{sections.map((s) => <section key={s.title} className="grid gap-5 md:grid-cols-[1fr_1.5fr]"><h2 className="display text-3xl md:text-4xl">{s.title}</h2><p className="text-lg leading-relaxed">{s.text}</p></section>)}</div>
    <div className="flex flex-wrap gap-4"><Button asChild size="lg"><Link to="/contact">Contact the pharmacy <ArrowUpRight /></Link></Button><Button asChild variant="outline" size="lg"><a href={business.phoneHref}>{business.phoneDisplay}</a></Button></div>
  </section>;
}