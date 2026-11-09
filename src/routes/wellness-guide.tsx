import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { suggestWellnessCategories } from "@/lib/wellness.functions";
import { categories } from "@/content/site";
import { isSensitiveInterest } from "@/lib/wellness";
import { pageHead } from "@/lib/seo";
export const Route=createFileRoute("/wellness-guide")({
 head:()=>pageHead("/wellness-guide","Everyday wellness category guide","Describe non-sensitive everyday interests and explore enquiry categories. No medical advice or stock confirmation."),
 component:Guide,
});
function Guide(){
 const [interest,setInterest]=useState("");
 const [consent,setConsent]=useState(false);
 const [busy,setBusy]=useState(false);
 const [slugs,setSlugs]=useState<string[]>([]);
 const [message,setMessage]=useState("");
 async function submit(e:FormEvent<HTMLFormElement>){
   e.preventDefault();setMessage("");setSlugs([]);
   if(!consent){setMessage("Please agree to send this general interest to the AI service.");return;}
   if(isSensitiveInterest(interest)||interest.trim().length<8){setMessage("Enter a non-sensitive everyday interest without symptoms, medical details or contact information.");return;}
   setBusy(true);
   try{
     const result=await suggestWellnessCategories({data:{interest:interest.trim()}});
     setSlugs(result.slugs);
     setMessage(result.slugs.length?"Possible enquiry categories, not medical advice.":"No safe category match. Browse directly.");
   }catch(error){setMessage(error instanceof Error?error.message:"AI unavailable. Browse categories.");}
   finally{setBusy(false);}
 }
 return <section className="information-page" data-nav="light">
   <p className="text-base font-medium text-hero-deep">Explore everyday care</p>
   <h1 className="display page-title mt-4">Find a place to start.</h1>
   <p className="page-intro">Describe general interests like family travel essentials, skincare routines or first-aid supplies. An AI model can suggest website categories, but cannot advise on medicine, treatment or availability.</p>
   <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
    <form onSubmit={submit} className="rounded-[28px] border border-border p-6 md:p-8">
     <label htmlFor="interest" className="block text-lg font-semibold">What everyday items are you interested in?</label>
     <textarea id="interest" value={interest} onChange={e=>setInterest(e.target.value)} maxLength={160} minLength={8} rows={4} placeholder="I'm preparing some basic supplies for a family road trip" className="mt-4 w-full rounded-xl border border-input bg-muted p-4 text-base" required />
     <p className="mt-2 text-sm text-muted-foreground">{interest.length}/160 characters. No symptoms, diagnoses, medicines, names, emails, phone numbers or medical-aid details.</p>
     <label className="mt-6 flex items-start gap-3 text-sm leading-relaxed"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1 size-5" />I agree to send this non-sensitive interest to the AI service for category suggestions.</label>
     <button type="submit" disabled={busy||!consent} className="mt-6 flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-paper disabled:opacity-50"><Sparkles className="size-4"/>{busy?"Matching categories…":"Suggest categories"}</button>
     <p aria-live="polite" role="status" className="mt-5 min-h-6 text-sm">{message}</p>
    </form>
    <aside className="rounded-[28px] bg-ice p-6 md:p-8">
      <h2 className="display text-3xl">Suggested enquiries</h2>
      <p className="mt-4 text-base leading-relaxed">Only existing website categories are returned. This cannot confirm stock, prices, treatment or medical suitability.</p>
      <div className="mt-6 space-y-3">{slugs.map(slug=>{const cat=categories.find(c=>c.slug===slug);return cat?<Link key={slug} to="/explore/$slug" params={{slug}} className="flex items-center justify-between rounded-xl bg-paper p-4 font-semibold">{cat.name}<ArrowRight className="size-4"/></Link>:null;})}</div>
      <Link to="/explore" className="editorial-link mt-8 inline-flex items-center gap-2">Browse all categories <ArrowRight className="size-4"/></Link>
    </aside>
   </div>
   <p className="mt-8 max-w-3xl text-sm text-muted-foreground">For symptoms, prescriptions, medical questions or urgent care, speak directly to a pharmacist or licensed health professional. The AI provider processes the submitted interest for the response. Do not submit sensitive information.</p>
 </section>;
}
