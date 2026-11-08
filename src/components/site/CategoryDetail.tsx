import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Category } from "@/content/site";
import { useEnquiry } from "@/lib/enquiry";

export const toneClass: Record<Category["tone"], string> = {
  sun: "bg-sun text-sun-foreground",
  wine: "bg-wine text-wine-foreground",
  hero: "bg-hero text-paper",
  ice: "bg-ice text-ink",
  ink: "bg-ink text-paper",
};

export function EnquireButton({ slug, className = "" }: { slug: string; className?: string }) {
  const { has, toggle } = useEnquiry();
  const on = has(slug);
  return (
    <button type="button" onClick={() => toggle(slug)} aria-pressed={on}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors ${on ? "bg-ink text-paper" : "bg-paper text-ink ring-1 ring-ink/15 hover:bg-ice"} ${className}`}>
      {on ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      {on ? "In your enquiry list" : "Add to enquiry list"}
    </button>
  );
}

export function CategoryDialog({ cat, onClose }: { cat: Category | null; onClose: () => void }) {
  return (
    <Dialog open={!!cat} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl overflow-hidden rounded-[28px] border-0 p-0 sm:rounded-[28px]">
        {cat && (
          <div className="grid md:grid-cols-2">
            <div className={`relative min-h-56 ${toneClass[cat.tone]}`}>
              <img src={cat.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90 animate-in zoom-in-110 duration-700" />
            </div>
            <div className="p-7 md:p-9 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="eyebrow text-muted-foreground">Category</p>
              <DialogTitle className="display mt-2 text-5xl">{cat.name}</DialogTitle>
              <DialogDescription className="mt-4 text-base text-muted-foreground">{cat.intro}</DialogDescription>
              <ul className="mt-5 space-y-2 text-sm">
                {cat.enquire.map((e) => <li key={e} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hero" />{e}</li>)}
              </ul>
              <p className="mt-5 text-xs text-muted-foreground">Enquiry only — availability varies. Not a purchase or medical consultation.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <EnquireButton slug={cat.slug} />
                <Link to="/explore/$slug" params={{ slug: cat.slug }} className="inline-flex items-center gap-1 rounded-full px-4 py-3 text-sm underline-offset-4 hover:underline">
                  Full page <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
