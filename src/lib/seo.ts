// Public canonical URLs are intentionally omitted until the pharmacy confirms its production domain.
export function pageHead(path: string, title: string, description: string) {
  void path;
  const fullTitle = title + " — Kalahari Pharmacy";
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
