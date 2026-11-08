# Reference 05 — Responsive behavior, accessibility, SEO and performance

## Responsive design is a layout decision, not shrink-to-fit

Plan the content and CTA hierarchy at narrow and wide widths. One desktop art direction may become an entirely different mobile composition while maintaining the same hierarchy and function.

### Responsive test matrix

| Test | What to inspect |
|---|---|
| 320px | No horizontal overflow, no clipped buttons, headings wrap properly, accessible menu |
| 360px | Comfortable type, thumb-friendly forms, image crops, single-column flow |
| 390–430px | Common mobile widths, fixed/sticky CTAs and overlay collisions |
| 768px | Tablet navigation, image/text pairs, no awkward dead zones |
| 1024px | Desktop or tablet transition, dense sections and modals |
| 1440px | Reading widths, grid rhythm, image sharpness, whitespace distribution |
| 1920px+ | Max width and focal-point handling, no giant text lines |
| 200% zoom | Text reflow, no clipped overlays, no inaccessible offscreen controls |

Use content-driven breakpoints. Containers should be fluid within sane limits. Prefer `minmax`, `repeat(auto-fit)`, `clamp`, flex, grid, container queries and correct image aspect ratios.

### Mobile-first interaction principles

- Primary actions are accessible without precise tiny taps.
- Menus do not rely on hover; touch closes/opens predictably.
- Date pickers, galleries, tabs and accordions support keyboard and touch.
- Fixed mobile CTA/footer never covers forms or OS safe areas.
- Hero copy remains readable over different image crops.
- Long titles, prices, addresses and localized strings wrap or truncate safely with access to full text.

## Accessibility target

Aim for WCAG 2.2 AA when relevant to project constraints. Key practices:

- Use semantic regions: `header`, `nav`, `main`, `section`, `article`, `footer` appropriately.
- Provide one meaningful `h1` per primary page, followed by logical headings.
- Every form control has a persistent, programmatically associated label.
- Interactive elements are buttons or links with correct semantics, not generic `div` click handlers.
- Keyboard: Tab order, Enter/Space activation, Escape on dismissible overlays, proper focus return.
- Focus indicator must be clearly visible; don't remove outlines without equivalent styling.
- Overlays: trap focus in modal dialogs when appropriate; restore focus when closed; prevent background interaction.
- Images: informative alt text; decorative images empty alt; captions/transcripts for essential audiovisual information.
- Color contrast: normal text generally at least 4.5:1; large text often 3:1, and non-text interface components need sufficient contrast. Verify actual palettes.
- Text remains usable when resized/zoomed. Avoid hard-coded heights that clip text.
- `prefers-reduced-motion` must meaningfully reduce nonessential movement.
- Error messages identify the problem and the fix; don't rely on red outlines alone.
- Live updates announce changes appropriately without overwhelming screen readers.
- Hover content must be accessible by keyboard and touch and should not obstruct important information.

Touch target guidance: reasonably large targets with separation. WCAG 2.2 AA target-size requirements allow exceptions, but 40–48px practical targets are a strong default for key controls.

## Performance budgets (proposed, not guarantees)

Set measurable project goals appropriate to traffic and hosting:

- Monitor LCP, INP and CLS in field or lab. Aim for good Core Web Vitals on actual target devices.
- Reserve media/aspect ratios and use stable placeholders to reduce layout shift.
- Compress and resize images, deliver modern formats where supported; avoid loading giant images into tiny cards.
- Use responsive `srcset`/`sizes`, consider lazy loading below fold, and carefully prioritize the LCP asset.
- Use poster frames and selective loading for video; avoid background autoplay on slow or data-constrained connections when it adds little.
- Limit heavy animation libraries and JavaScript for simple site transitions.
- Prefer opacity and transform over repeated layout recalculation.
- Avoid infinite animated gradients, large blurred backdrops and full-screen compositing unless measured and justified.
- Prevent layout shifts from web fonts and async content; use sensible fallbacks and preload only critical resources.
- Paginate or virtualize genuinely large lists and tables where appropriate.
- Test with throttled network and mid-tier mobile hardware, not only a desktop on broadband.

## SEO and discoverability basics

- Unique, meaningful page titles and meta descriptions.
- Semantic content headings and useful copy matching real search intent.
- Crawlable links and understandable URLs.
- Correct canonical strategy where relevant; redirects for changed URLs.
- Sitemap and robots behavior appropriate to public/private pages.
- Structured data only when accurate, relevant and validated. Do not fabricate business ratings, reviews, products or events in schema.
- Open Graph/social previews for important public pages.
- Descriptive media captions/alt text when informative.
- No hiding core content inside images that search or assistive technology cannot read.

For dynamic sites, choose rendering/caching consistent with discoverability and data freshness. Avoid assuming one framework automatically solves SEO.

## Privacy, forms and integration integrity

- Collect the smallest amount of user data needed for the task.
- Use HTTPS and secure form handling; never expose secrets in frontend code.
- Don't silently inject marketing tracking before required consent where applicable.
- Label examples and placeholders as examples when they resemble real records.
- Confirm a payment/booking/form submission only after trusted success from the server or relevant provider.
- Build clear failure and retry flows; handle duplicate submits idempotently where possible.
- Avoid dark patterns: hidden opt-ins, forced consent, false urgency or misleading scarcity.

## Browser and interaction QA

Check modern Chrome, Safari and Firefox behavior where feasible. Test keyboard, touch, pointer, landscape orientation, browser back/forward, network loss, font loading, media failures and session expiry. Document actual coverage rather than claiming blanket cross-browser support.