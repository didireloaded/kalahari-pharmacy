import { categories } from "@/content/site";
export const wellnessCategories = categories.map(c=>({slug:c.slug,name:c.name}));
export const isSensitiveInterest = (value:string):boolean => {
  const text=value.trim();
  if(!text||text.length>160) return true;
  if(/@|(?:\+?264|0)\d{8}|\b\d{7,}\b/i.test(text)) return true;
  return /\b(prescription|diagnos(?:is|ed)|doctor|patient|medical aid|membership number|pregnan(?:t|cy)|symptom|fever|infection|bleed(?:ing)?|medicine|dose|dosage|chronic illness|allerg(?:y|ies)|pain|cancer|depression|hiv)\b/i.test(text);
};
export function normaliseCategorySlugs(input:unknown):string[]{
  if(!Array.isArray(input))return [];
  const approved=new Set(wellnessCategories.map(c=>c.slug));
  return [...new Set(input.filter((v):v is string=>typeof v==="string"&&approved.has(v)))].slice(0,3);
}
