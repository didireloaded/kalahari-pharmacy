# Kalahari Pharmacy website

Editorial pharmacy website and an illustrative everyday-care catalogue for Kalahari Pharmacy in Windhoek, Namibia.

Built with **TanStack Start**, React 19, TypeScript, Vite, Tailwind CSS, TanStack Router, Radix/shadcn UI. Lovable project is connected to GitHub \`main\`.

## Local development

- Install Bun, then run \`bun install\`
- Run \`bun run dev\`
- Verify with \`bun run build\`, \`bun run test\` and \`bun run lint\`

## Website structure

| Route | Purpose |
| --- | --- |
| / | Scroll-assembled photographic intro, about, featured categories, lifestyle, editorial information and visit |
| /explore | Search and browse the five category topics |
| /store | Searchable illustrative catalogue of everyday, non-medicinal items |
| /store/:slug | Example item detail and add-to-request-basket |
| /cart | Local request basket with quantities |
| /checkout | Review a request and prepare a draft email, **not** live payment |
| /enquiry | Existing category enquiry list |
| /about, /services, /prescriptions, /faqs | Business and patient information |
| /visit, /contact | Location and contact channels |
| /privacy, /terms, /accessibility | Website information and limitations |

## Important boundaries

The product pictures are generated **illustrations** of everyday, non-medicinal objects, not photographs of real Kalahari stock. Stock, prices, opening hours, WhatsApp, medical aid relationships, delivery or collection, pharmacist details and many services are not confirmed. All prices in the illustrative store show “Ask for price.” The basket stores item names and quantities locally. Checkout opens a pre-filled email in the visitor's own mail app; **no payment, order submission, sale, reservation or fulfilment is performed by this website**.

Before enabling live commerce, the pharmacy must supply approved products, prices, stock arrangements, legally compliant advertising/medicine scope, fulfilment policies and a payment provider. No prescriptions or medical data should be collected by ordinary product/enquiry forms.

## Design direction

See \`docs/KALAHARI_WEBSITE_DESIGN_DIRECTION.md\` and the reusable skill \`.agents/skills/website-design-craft/SKILL.md\`. Maintain the existing powder blue, steel blue, yellow and wine palette, visual-led sections and restrained motion. Initial hero is a plain lifestyle photograph; native scroll assembles the blue headline/portrait/objects and expands navigation. Respect reduced-motion.

## Status and QA

Changes are synced through GitHub and Lovable. The project has not been independently verified across browsers or payment workflows. A GitHub Actions verification workflow is present, but the initial run failed before a runner executed any commands, so **do not claim the build, lint or tests passed based on that workflow**. Run the commands in a real development environment before treating this as production-ready.
