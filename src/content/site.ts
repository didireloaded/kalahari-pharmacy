// Editable content. Swap business data, images, categories and messages here.
import jar from "@/assets/obj-jar.png";
import type { OpeningSchedule } from "@/lib/hours";
import pump from "@/assets/obj-pump.png";
import kit from "@/assets/obj-kit.png";

export const u = (id: string, w = 1200, h?: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75&w=${w}${h ? `&h=${h}` : ""}`;

export const business = {
  name: "Kalahari Pharmacy",
  addressLines: ["Gustav Voigts Centre", "Independence Avenue", "Windhoek, Namibia"],
  phoneDisplay: "+264 61 252 448",
  phoneHref: "tel:+26461252448",
  email: "kalpharm@iway.na",
  instagram: "https://www.instagram.com/kalahari_pharmacy/",
  instagramHandle: "@kalahari_pharmacy",
  // Add an owner-approved schedule here to activate the live Windhoek status.
  openingHours: undefined as OpeningSchedule | undefined,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Kalahari+Pharmacy+Gustav+Voigts+Centre+Independence+Avenue+Windhoek",
  // Hours intentionally omitted until confirmed by the pharmacy.
};

export const objects = { jar, pump, kit };

/** Responsive image URLs for the existing Unsplash editorial photography. */
export function imageSrcSet(src: string, widths: readonly number[]): string | undefined {
  if (!src.startsWith("https://images.unsplash.com/")) return undefined;
  return widths.map((width) => [src.replace(/([?&]w=)\d+/, `$1${width}`), width + "w"].join(" ")).join(", ");
}

export const images = {
  hero: u("photo-1531123897727-8f129e1688ce", 900, 1100),
  aboutLeft: u("photo-1580489944761-15a19d654956", 700, 900),
  aboutRight: u("photo-1609220136736-443140cffec6", 700, 900),
  lifestyle: u("photo-1511895426328-dc8714191300", 2000),
};

export type Category = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  enquire: string[];
  image: string;
  object?: string;
  tone: "sun" | "wine" | "hero" | "ice" | "ink";
};

export const categories: Category[] = [
  {
    slug: "everyday-wellness",
    name: "Everyday Wellness",
    short: "Vitamins, supplements and daily-routine basics.",
    intro:
      "Ask our team about general vitamins, supplements and everyday wellness items, and whether something suits your routine.",
    enquire: ["General vitamins & minerals", "Supplements for daily routines", "Cold & flu season basics", "Questions about suitability"],
    image: u("photo-1607619056574-7b8d3ee536b2", 1000),
    object: jar,
    tone: "sun",
  },
  {
    slug: "skin-beauty",
    name: "Skin & Beauty",
    short: "Cleansers, moisturisers, sun care and cosmetics.",
    intro:
      "Enquire about skincare and sun care for Windhoek's dry climate, and everyday beauty products.",
    enquire: ["Cleansers & moisturisers", "Sun protection", "Lip & hand care", "Cosmetics"],
    image: u("photo-1631729371254-42c2892f0e6e", 1000),
    object: pump,
    tone: "wine",
  },
  {
    slug: "personal-care",
    name: "Personal Care",
    short: "Hygiene, oral care and daily essentials.",
    intro: "The everyday essentials that keep a household running — ask what we currently carry.",
    enquire: ["Oral care", "Body wash & soaps", "Deodorants", "Hair care"],
    image: u("photo-1607006344380-b6775a0824a7", 1000),
    tone: "hero",
  },
  {
    slug: "first-aid",
    name: "First-Aid Essentials",
    short: "Plasters, dressings and home kit basics.",
    intro: "Put together or restock a home, car or travel first-aid kit. For injuries needing care, contact a medical professional.",
    enquire: ["Plasters & dressings", "Antiseptics", "Thermometers", "Kit restocking"],
    image: u("photo-1603398938378-e54eab446dde", 1000),
    object: kit,
    tone: "ice",
  },
  {
    slug: "family-baby",
    name: "Family & Baby Care",
    short: "Gentle care for little ones and the whole family.",
    intro: "Enquire about baby care basics and family essentials, and talk to the pharmacist about what's appropriate.",
    enquire: ["Nappy & changing care", "Baby skincare", "Feeding accessories", "Family essentials"],
    image: u("photo-1515488042361-ee00e0ddd4e4", 1000),
    tone: "ink",
  },
];

export const featured = ["everyday-wellness", "skin-beauty"];

export const infoCards = [
  { icon: "MapPin", title: "In the city centre", text: "Find us at Gustav Voigts Centre on Independence Avenue." },
  { icon: "MessageCircle", title: "Ask before you buy", text: "Talk to the team about everyday products and what suits you." },
  { icon: "Phone", title: "Call ahead", text: "Phone to check availability before you visit." },
] as const;

// Brand messages shown in the editorial carousel. Replace with genuine, approved testimonials later.
// These are editorial information prompts, not attributed customer reviews or unverified promises.
export const messages = [
  {
    quote: "Our online examples are a place to start a conversation. Ask the pharmacy which actual items and prices are available.",
    label: "Product enquiries",
    image: u("photo-1607619056574-7b8d3ee536b2", 400, 400),
  },
  {
    quote: "Opening hours are not yet confirmed here. Please call ahead before travelling into the city centre.",
    label: "Before visiting",
    image: u("photo-1580489944761-15a19d654956", 400, 400),
  },
  {
    quote: "For prescriptions, repeat medication or personal health concerns, speak directly with the pharmacy about the appropriate process.",
    label: "Prescription questions",
    image: u("photo-1609220136736-443140cffec6", 400, 400),
  },
  {
    quote: "You can browse first-aid, personal care and family-care examples, then use the request basket to prepare an enquiry.",
    label: "Explore categories",
    image: u("photo-1631729371254-42c2892f0e6e", 400, 400),
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);