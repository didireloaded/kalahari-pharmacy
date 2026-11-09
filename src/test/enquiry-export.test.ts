import {describe,expect,it} from "vitest";
import {enquiryPrintText} from "@/lib/export-enquiry";
describe("enquiry export",()=>{
 it("exports only known category labels",()=>{
   const text=enquiryPrintText(["first-aid","unknown","skin-beauty"]);
   expect(text).toContain("First-Aid Essentials");
   expect(text).toContain("Skin & Beauty");
   expect(text).not.toContain("unknown");
   expect(text).toContain("not an order");
 });
});
