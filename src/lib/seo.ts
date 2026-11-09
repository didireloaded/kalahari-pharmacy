const origin = "https://kalahari-care-corner.lovable.app";
export function pageHead(path: string, title: string, description: string) {
  const fullTitle = `${title} — Kalahari Pharmacy`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${origin}${path}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${origin}${path}` }],
  };
}