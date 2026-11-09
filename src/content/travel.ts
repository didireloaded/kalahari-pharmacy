import { products } from "@/content/products";
export type TravelLength = "short" | "week" | "remote";
export const tripLengths: {id:TravelLength,label:string,detail:string}[] = [
  {id:"short",label:"Day trip",detail:"A short journey"},
  {id:"week",label:"Several days",detail:"A few days on the road"},
  {id:"remote",label:"Remote trip",detail:"Farther between services"},
];
const plans: Record<TravelLength,string[]> = {
  short:["plasters","gauze-pads","sunscreen","first-aid-pouch"],
  week:["plasters","gauze-pads","sunscreen","first-aid-pouch","gauze-bandage","thermometer","baby-wipes"],
  remote:["plasters","gauze-pads","sunscreen","first-aid-pouch","gauze-bandage","thermometer","baby-wipes","cotton-wool","hand-soap","washcloth"],
};
export const recommendedKitSlugs = (duration:TravelLength) => plans[duration].filter(slug=>products.some(p=>p.slug===slug));
export const kitItemNames = (slugs:string[]) => slugs.map(slug=>products.find(p=>p.slug===slug)?.name).filter((name):name is string=>!!name);
