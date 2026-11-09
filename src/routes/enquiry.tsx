import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, X, ShieldCheck } from "lucide-react";
import { getCategory } from "@/content/site";
import { buildMailto, useEnquiry } from "@/lib/enquiry";
import { toneClass } from "@/components/site/CategoryDetail";
import { Button } from "@/components/ui/button";
import { enquiryPrintText } from "@/lib/export-enquiry";

export const Route = createFileRoute("/enquiry")({
  head: () => ({
    meta: [
      { title: "My enquiry list — Kalahari Pharmacy" },
      { name: "description", content: "Collect the categories you'd like to ask Kalahari Pharmacy about and send one email enquiry." },
      { property: "og:title", content: "My enquiry list — Kalahari Pharmacy" },
      { property: "og:description", content: "Send an availability enquiry to Kalahari Pharmacy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Enquiry,
});

function Enquiry() {
  const { items, remove, clear } = useEnquiry();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const copyList = async () => {
    try { await navigator.clipboard.writeText(enquiryPrintText(items)); setCopyStatus("List copied. No enquiry has been sent."); }
    catch { setCopyStatus("Could not copy the list. Use Print / Save PDF instead."); }
  };
  return (
    <section data-nav="light" className="px-6 pb-10 pt-32 md:px-14 md:pt-44">
      <p className="eyebrow text-muted-foreground">Enquiry — not a purchase</p>
      <h1 className="display mt-4 text-[clamp(3.5rem,10vw,8.5rem)]">My enquiry list.</h1>
      {items.length === 0 ? (
        <div className="mt-10">
          <p className="text-muted-foreground">Your list is empty. Add categories you'd like to ask about.</p>
          <Link to="/explore" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm text-paper">Explore categories</Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <ul className="space-y-3">
            {items.map((s) => {
              const c = getCategory(s);
              if (!c) return null;
              return (
                <li key={s} className={`flex items-center justify-between rounded-3xl px-6 py-5 animate-in fade-in slide-in-from-left-4 ${toneClass[c.tone]}`}>
                  <span className="display text-3xl">{c.name}</span>
                  <button type="button" onClick={() => remove(s)} aria-label={`Remove ${c.name}`} className="grid h-10 w-10 place-items-center rounded-full bg-paper/20 hover:bg-paper/40"><X className="h-4 w-4" /></button>
                </li>
              );
            })}
            <li className="flex flex-wrap gap-3"><button type="button" onClick={copyList} className="text-sm underline underline-offset-4">Copy list</button><button type="button" onClick={() => window.print()} className="text-sm underline underline-offset-4">Print / Save PDF</button></li>
            <li role="status" aria-live="polite" className="text-sm text-muted-foreground">{copyStatus}</li>
            <li><button type="button" onClick={clear} className="text-sm text-muted-foreground underline underline-offset-4">Clear list</button></li>
          </ul>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = buildMailto(items, name, note); }}>
            <label className="block">
              <span className="text-sm font-medium">Your name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} className="mt-2 w-full rounded-2xl bg-muted px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Short note (optional)</span>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={400} rows={4} placeholder="e.g. Please confirm pack sizes" className="mt-2 w-full rounded-2xl bg-muted px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <p className="flex gap-2 rounded-2xl bg-ice p-4 text-sm"><ShieldCheck className="h-5 w-5 shrink-0 text-hero" aria-hidden />Please don't include health history or prescriptions. This opens your email app with a pre-filled message — nothing is stored on our side.</p>
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-paper"><Mail className="h-4 w-4" />Open email to send</button>
          </form>
        </div>
      )}
      <Button asChild variant="outline" className="mt-10"><Link to="/store">Browse illustrative store items</Link></Button>
    </section>
  );
}
