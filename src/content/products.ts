import plasters from "@/assets/example-plasters.jpg";
import bandage from "@/assets/example-gauze-bandage.jpg";
import pads from "@/assets/example-gauze-pads.jpg";
import thermometer from "@/assets/example-thermometer.jpg";
import moisturiser from "@/assets/example-moisturiser.jpg";
import sunscreen from "@/assets/example-sunscreen.jpg";
import soap from "@/assets/example-hand-soap.jpg";
import wash from "@/assets/example-body-wash.jpg";
import toothbrush from "@/assets/example-toothbrush.jpg";
import floss from "@/assets/example-dental-floss.jpg";
import balm from "@/assets/example-lip-balm.jpg";
import cloth from "@/assets/example-washcloth.jpg";
import wipes from "@/assets/example-baby-wipes.jpg";
import cotton from "@/assets/example-cotton-wool.jpg";
import pouch from "@/assets/example-first-aid-pouch.jpg";
import comb from "@/assets/example-comb.jpg";

export const catalogueNotice = "Illustrative catalogue, availability and pricing must be confirmed with the pharmacy";
export type Product = { slug: string; name: string; category: string; image: string; priceStatus: "Ask for price"; illustrative: true; medicinal: false };
const item = (slug: string, name: string, category: string, image: string): Product => ({ slug, name, category, image, priceStatus: "Ask for price", illustrative: true, medicinal: false });
export const products: Product[] = [
  item("plasters", "Adhesive plasters", "first-aid", plasters),
  item("gauze-bandage", "Gauze bandage", "first-aid", bandage),
  item("gauze-pads", "Gauze pads", "first-aid", pads),
  item("thermometer", "Digital thermometer", "first-aid", thermometer),
  item("moisturiser", "Moisturiser", "skin-beauty", moisturiser),
  item("sunscreen", "Sunscreen", "skin-beauty", sunscreen),
  item("hand-soap", "Hand soap", "personal-care", soap),
  item("body-wash", "Body wash", "personal-care", wash),
  item("toothbrush", "Toothbrush", "personal-care", toothbrush),
  item("dental-floss", "Dental floss", "personal-care", floss),
  item("lip-balm", "Lip balm", "skin-beauty", balm),
  item("washcloth", "Cotton washcloth", "personal-care", cloth),
  item("baby-wipes", "Baby wipes", "family-baby", wipes),
  item("cotton-wool", "Cotton wool", "personal-care", cotton),
  item("first-aid-pouch", "Empty first-aid pouch", "first-aid", pouch),
  item("comb", "Hair comb", "personal-care", comb),
];
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export function filterProducts(query: string, category: string, sort: string) {
  const result = products.filter((p) => (!category || p.category === category) && p.name.toLowerCase().includes(query.trim().toLowerCase()));
  if (sort === "az") result.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "za") result.sort((a, b) => b.name.localeCompare(a.name));
  return result;
}