import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Mail, Phone, Printer } from "lucide-react";
import { business } from "@/content/site";
import { getProduct, catalogueNotice } from "@/content/products";
import { recommendedKitSlugs, tripLengths, kitItemNames, type TravelLength } from "@/content/travel";
import { useBasket, orderMailto } from "@/lib/basket";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/travel")({
  head:()=>pageHead("/travel","Safari first-aid checklist","Build an illustrative non-medicinal first-aid enquiry for a trip in Namibia; pharmacy availability is unconfirmed."),
  component:TravelKit,
});
function TravelKit(){
  const [duration,setDuration]=useState<TravelLength>("short");
  const [overrides,setOverrides]=useState<Record<string,boolean>>({});
  const [added,setAdded]=useState(false);
  const {add}=useBasket();
  const choices=recommendedKitSlugs("remote");
  const defaults=recommendedKitSlugs(duration);
  const selected=choices.filter(slug=>overrides[slug]??defaults.includes(slug));
  const selectTrip=(next:TravelLength)=>{setDuration(next);setOverrides({});setAdded(false);};
  return <section className="information-page" data-nav="light">
    <p className="text-base font-medium text-hero-deep">Travel essentials</p><h1 className="display page-title mt-4">Pack for the road.</h1>
    <p className="page-intro">Build an everyday first-aid enquiry checklist for a drive or safari. It is not a medical assessment or stock confirmation.</p>
    <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
      <div>
        <fieldset><legend className="mb-4 text-xl font-semibold">How long is the trip?</legend>
          <div className="grid gap-3 sm:grid-cols-3">{tripLengths.map(t=><label key={t.id} className={"block cursor-pointer rounded-2xl border p-4 "+(duration===t.id?"border-hero-deep bg-ice":"border-border")}>
            <input type="radio" name="trip" checked={duration===t.id} onChange={()=>selectTrip(t.id)} className="mr-2"/>
            <strong className="block">{t.label}</strong><span className="mt-2 block text-sm text-muted-foreground">{t.detail}</span></label>)}</div>
        </fieldset>
        <fieldset className="mt-10"><legend className="mb-4 text-xl font-semibold">Choose example essentials</legend>
          <div className="divide-y divide-border border-y border-border">{choices.map(slug=>{const p=getProduct(slug);if(!p)return null;return <label key={slug} className="flex cursor-pointer items-center gap-4 py-4">
            <input type="checkbox" className="size-5" checked={selected.includes(slug)} onChange={e=>{setOverrides(old=>({...old,[slug]:e.target.checked}));setAdded(false);}}/>
            <img src={p.image} alt="" width={64} height={64} className="size-16 rounded-xl object-cover"/>
            <span className="text-base">{p.name}<span className="block text-sm text-muted-foreground">Example only · Ask for price</span></span>
          </label>})}</div>
        </fieldset>
      </div>
      <aside className="self-start rounded-[28px] bg-ice p-6 md:p-8">
        <h2 className="display text-4xl">Your checklist</h2><p className="mt-3 text-sm text-muted-foreground">{catalogueNotice}.</p>
        <ul className="my-6 list-inside list-disc space-y-2">{kitItemNames(selected).map(name=><li key={name}>{name}</li>)}</ul>
        <div className="space-y-3">
          <button type="button" disabled={selected.length===0} onClick={()=>{selected.forEach(add);setAdded(true);}} className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-paper disabled:opacity-50"><Check className="size-4"/>Add to request basket</button>
          {selected.length>0&&<a href={orderMailto(selected.map(slug=>({slug,quantity:1})))} className="flex items-center justify-center gap-2 rounded-full border border-ink px-5 py-3 font-medium"><Mail className="size-4"/>Prepare email enquiry</a>}
          <button type="button" onClick={()=>window.print()} className="flex w-full items-center justify-center gap-2 rounded-full border border-ink px-5 py-3 font-medium"><Printer className="size-4"/>Print / save PDF</button>
        </div>
        <p role="status" className="mt-3 min-h-6 text-sm">{added?"Added to your local request basket. No order has been placed.":""}</p>
        <Link to="/cart" className="editorial-link mt-5 inline-block">View request basket</Link>
      </aside>
    </div>
    <div className="mt-14 max-w-3xl border-t border-border pt-8"><h2 className="display text-3xl">Prepare for remote travel</h2>
      <p className="mt-4 text-base leading-relaxed">Plan drinking water, reliable communication and emergency arrangements. Discuss travel vaccines, malaria prevention, allergies, medicines and other health questions with a qualified professional. This checklist makes no medicine recommendations.</p>
      <a href={business.phoneHref} className="mt-5 inline-flex items-center gap-2 font-semibold underline underline-offset-4"><Phone className="size-4"/>Call to ask about availability</a>
    </div>
  </section>;
}