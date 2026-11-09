import { describe, it, expect } from "vitest";
import { imageSrcSet, u } from "@/content/site";
describe("responsive editorial images", () => {
  it("generates correctly sized Unsplash variants for narrow screens", () => {
    const result=imageSrcSet(u("photo-example", 2000), [360, 640]);
    expect(result).toContain("&w=360 360w");
    expect(result).toContain("&w=640 640w");
    expect(result).not.toContain("&w=2000");
  });
  it("never rewrites local or untrusted asset URLs", () => {
    expect(imageSrcSet("/assets/example.jpg", [360])).toBeUndefined();
  });
});
