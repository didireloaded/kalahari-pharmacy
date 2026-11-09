import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { isSensitiveInterest, normaliseCategorySlugs, wellnessCategories } from "@/lib/wellness";
const validator=z.object({interest:z.string().min(8).max(160)});
export const suggestWellnessCategories=createServerFn({method:"POST"})
  .validator(validator)
  .handler(async ({data})=>{
    const interest=data.interest.trim();
    if(isSensitiveInterest(interest))throw new Error("Please enter non-sensitive everyday interests only. No medical or identifying details.");
    const key=process.env.LOVABLE_API_KEY;
    if(!key)throw new Error("AI Gateway is not configured. Browse our categories instead.");
    const instructions="You match everyday, non-sensitive interests to categories on a pharmacy website. Return ONLY JSON object with property slugs, with 1-3 slugs selected from: "+JSON.stringify(wellnessCategories)+". Never diagnose, prescribe, advise on clinical care, medicine suitability, allergies, symptoms, stock or prices. For health-related questions return an empty slugs array.";
    let response:Response;
    try{
      response=await fetch("https://ai.gateway.lovable.dev/v1/chat/completions",{
        method:"POST",
        headers:{"Authorization":"Bearer "+key,"Content-Type":"application/json"},
        body:JSON.stringify({model:"google/gemini-2.5-flash",temperature:0.1,max_tokens:150,messages:[{role:"system",content:instructions},{role:"user",content:interest}]}),
        signal:AbortSignal.timeout(12000)
      });
    }catch{throw new Error("AI guide unavailable. Please browse categories.");}
    if(!response.ok)throw new Error(response.status===402?"AI credits unavailable. Browse categories instead.":"AI guide is temporarily unavailable.");
    const payload:unknown=await response.json();
    const typed=payload&&typeof payload==="object" ? payload as {choices?:Array<{message?:{content?:unknown}}>} : null;
    const content=typed?.choices?.[0]?.message?.content;
    if(typeof content!=="string")throw new Error("AI returned no categories. Browse directly.");
    let decoded:unknown;
    try{const fragment=content.match(/\{[\s\S]*\}/);decoded=JSON.parse(fragment?.[0]||"{}");}
    catch{throw new Error("AI returned an unreadable suggestion. Browse directly.");}
    const slugs=decoded&&typeof decoded==="object"&&"slugs" in decoded?(decoded as {slugs:unknown}).slugs:[];
    return {slugs:normaliseCategorySlugs(slugs)};
  });
