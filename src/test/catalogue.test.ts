import { describe, expect, it } from "vitest";
import { filterProducts, getProduct, products } from "@/content/products";
import { normalizeBasket, orderMailto, updateQuantity } from "@/lib/basket";

describe("illustrative store data", () => {
  it("has only unpriced, nonmedicinal example items", () => {
    expect(products.length).toBeGreaterThanOrEqual(12);
    expect(products.every((p) => p.illustrative && !p.medicinal && p.priceStatus === "Ask for price")).toBe(true);
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length);
  });
  it("resolves safe product detail pages and does not represent a sale", () => {
    const detail = getProduct("plasters");
    expect(detail?.name).toBe("Adhesive plasters");
    expect(detail?.priceStatus).toBe("Ask for price");
    expect(detail?.illustrative).toBe(true);
    expect(detail?.medicinal).toBe(false);
    expect(getProduct("not-stocked")).toBeUndefined();
  });
  it("filters and sorts by name and category", () => {
    expect(filterProducts("gauze", "", "featured").length).toBe(2);
    expect(filterProducts("", "first-aid", "featured").length).toBeGreaterThan(0);
    const sorted = filterProducts("", "", "az");
    expect(sorted[0].name.localeCompare(sorted[1].name)).toBeLessThanOrEqual(0);
  });
});
describe("request basket", () => {
  it("keeps only known item slugs and valid quantities", () => {
    expect(normalizeBasket([{ slug: "plasters", quantity: 2 }, { slug: "invalid", quantity: 1 }, { slug: "plasters", quantity: 6 }, { slug: "gauze-pads", quantity: 0 }])).toEqual([{ slug: "plasters", quantity: 2 }]);
  });
  it("updates and removes quantity without creating unknown items", () => {
    const one = updateQuantity([], "plasters", 1);
    expect(one).toEqual([{ slug: "plasters", quantity: 1 }]);
    expect(updateQuantity(one, "plasters", 0)).toEqual([]);
    expect(updateQuantity(one, "unknown", 1)).toEqual(one);
  });
  it("prepares an email request, not a charge or order confirmation", () => {
    const href = orderMailto([{ slug: "plasters", quantity: 2 }]);
    expect(href.startsWith("mailto:")).toBe(true);
    expect(decodeURIComponent(href)).toContain("2 × Adhesive plasters");
    expect(decodeURIComponent(href)).toContain("This is an enquiry, not a confirmed order.");
  });
});

describe("safe shareable enquiry text", () => {
  it("keeps the catalogue illustrative and avoids payment or verified stock", async () => {
    const { basketEnquiryText } = await import("@/lib/basket");
    const text = basketEnquiryText([{slug:"plasters",quantity:2}]);
    expect(text).toContain("2 × Adhesive plasters");
    expect(text).toContain("not a confirmed order");
    expect(text).not.toMatch(/checkout|credit card|in stock now/i);
    expect(text).not.toContain("medical-aid number");
  });
});
