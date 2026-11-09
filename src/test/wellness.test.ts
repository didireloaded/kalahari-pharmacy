import { describe,expect,it } from "vitest";
import { isSensitiveInterest,normaliseCategorySlugs } from "@/lib/wellness";
describe("AI category safety",()=>{
 it("rejects obvious identifying and health details",()=>{
  expect(isSensitiveInterest("I have a fever")).toBe(true);
  expect(isSensitiveInterest("My prescription")).toBe(true);
  expect(isSensitiveInterest("john@example.com")).toBe(true);
  expect(isSensitiveInterest("12345678")).toBe(true);
  expect(isSensitiveInterest("A".repeat(161))).toBe(true);
 });
 it("allows a non-sensitive interest",()=>{
  expect(isSensitiveInterest("Basic skin and beauty items")).toBe(false);
 });
 it("only allows existing categories",()=>{
  expect(normaliseCategorySlugs(["first-aid","not-a-category","first-aid","skin-beauty"])).toEqual(["first-aid","skin-beauty"]);
 });
});
