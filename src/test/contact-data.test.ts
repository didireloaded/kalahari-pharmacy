import {describe,expect,it} from "vitest";
import {business} from "@/content/site";
describe("offline contact content",()=>{
  it("has a callable telephone number and no made-up opening hours",()=>{
    expect(business.phoneHref.startsWith("tel:")).toBe(true);
    expect(business.addressLines.join(" ")).toContain("Windhoek");
    expect("hours" in business).toBe(false);
  });
});
