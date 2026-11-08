<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->
## Kalahari Pharmacy design and engineering standards

These instructions apply to every edit of this website, including edits made in Lovable, Codex, or a local IDE.

1. Before planning, designing, coding or auditing the UI, read `.agents/skills/website-design-craft/SKILL.md` and its relevant references. The anti-slop catalogue, motion playbook, accessibility and QA rules are working standards, not optional inspiration.
2. Read `docs/KALAHARI_WEBSITE_DESIGN_DIRECTION.md` for the **approved** high-fidelity animated editorial direction. Do not replace it with a generic pharmacy, SaaS, wellness or medical template. Keep the composition and animation character derived from the supplied reference while using Kalahari's own brand and honest content.
3. Keep the existing functional TanStack Start, React, TypeScript, Tailwind and Lovable architecture. Inspect before refactoring. Never edit a generated file by hand. Do not modify the Lovable-managed AGENTS block above.
4. Avoid AI-generated UI clichés: default gradient hero, cards around every paragraph, arbitrary pills and eyebrows, tiny microcopy, overused shadows, unnecessary glassmorphism, decorative pseudo-dashboards, unnatural type choices, repetitive equal-width section grids, and invented marketing claims. Exceptions must have a specific user or brand reason.
5. Build deliberate motion: layered hero entrance, a scroll-linked rounded curtain transition, subtle portrait mask reveals, editorial product-card interactions, and purposeful content changes. No bouncy everyday UI, long artificial loaders, scroll-jacking, or motion that blocks the user. Honor `prefers-reduced-motion`.
6. Design mobile independently. Test at 320, 360, 768, 1024, 1440px, keyboard-only, touch, reduced motion and 200% zoom. Ensure legible typography, accessible contrast, correct focus behavior, stable image crops and no horizontal overflow.
7. Business details must be independently verified or explicitly client-approved. No invented products, availability, prices, health claims, opening hours, medical services, testimonials, staff identities, reviews or successful submissions. An enquiry list is not an e-commerce basket; avoid collecting sensitive medical data in unprotected forms.
8. Keep every visible button, link, filter, drawer, gallery control and form truthful and functional with loading, empty, success and error behavior as appropriate. Do not present a fake confirmation screen or claim external submission without a real backend response.
9. Prefer approved genuine photography/product imagery, optimize responsive images and label atmosphere photography appropriately. Existing illustrative assets are placeholders, not evidence of products Kalahari sells.
10. Before claiming a change is finished, run the relevant checks in `references/07-review-and-qa.md`, record what actually passed, and disclose untested visual or interaction states.

Do not publish the website or change sensitive business data without the user's explicit request and appropriate confirmation.
