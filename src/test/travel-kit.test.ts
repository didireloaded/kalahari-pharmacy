import {describe,expect,it} from "vitest";
import { recommendedKitSlugs,kitItemNames } from "@/content/travel";
import { getProduct } from "@/content/products";
describe("safari kit builder",()=>{
  it("suggests only illustrative, nonmedicinal catalogue items",()=>{
    for(const trip of ["short","week","remote"] as const){
      const ids=recommendedKitSlugs(trip);
      expect(ids.length).toBeGreaterThan(0);
      expect(ids.every(id=>{const p=getProduct(id);return !!p&&p.illustrative&&!p.medicinal;})).toBe(true);
    }
  });
  it("increases the checklist for more remote trips",()=>expect(recommendedKitSlugs("remote").length).toBeGreaterThan(recommendedKitSlugs("short").length));
  it("removes nonexistent items",()=>expect(kitItemNames(["plasters","unknown"])).toEqual(["Adhesive plasters"]));
});
