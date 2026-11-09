import { describe, expect, it } from "vitest";
import { getWindhoekStatus } from "@/lib/hours";
import { isSensitiveInterest, normaliseCategorySlugs } from "@/lib/wellness";
import { recommendedKitSlugs } from "@/content/travel";

const hours = { Mon: { open: "08:00", close: "18:00" }, Tue: { open: "08:00", close: "18:00" }, Sun: null } as const;
describe("Windhoek opening status without invented business hours", () => {
  it("returns unknown until a schedule has been verified", () => {
    expect(getWindhoekStatus(new Date("2026-11-09T07:00:00Z")).state).toBe("unknown");
  });
  it("interprets configured weekday hours in Africa/Windhoek timezone", () => {
    expect(getWindhoekStatus(new Date("2026-11-09T07:00:00Z"), hours).state).toBe("open");
    expect(getWindhoekStatus(new Date("2026-11-09T16:00:00Z"), hours).state).toBe("closed");
  });
});
describe("non-sensitive AI category boundaries", () => {
  it("rejects medical and identifying information", () => {
    expect(isSensitiveInterest("I have a fever and need medication")).toBe(true);
    expect(isSensitiveInterest("Here is my medical aid membership number")).toBe(true);
    expect(isSensitiveInterest("I am preparing family travel essentials")).toBe(false);
  });
  it("only retains established catalogue categories", () => {
    expect(normaliseCategorySlugs(["first-aid","first-aid","made-up","skin-beauty"])).toEqual(["first-aid","skin-beauty"]);
  });
});
describe("safari checklist", () => {
  it("adds non-medicinal examples for longer remote journeys", () => {
    expect(recommendedKitSlugs("remote").length).toBeGreaterThan(recommendedKitSlugs("short").length);
    expect(recommendedKitSlugs("short")).toContain("plasters");
  });
});
