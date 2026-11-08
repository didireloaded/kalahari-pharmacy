# Kalahari Pharmacy website design direction

## Goal and status

The Kalahari Pharmacy website is a visual, motion-led neighbourhood pharmacy website for Windhoek. The user has explicitly selected a supplied approximately 19-second animated wellness-site video as the **visual and motion reference**. The site must be recognizable as Kalahari Pharmacy, not copied brand artwork. This document records the selected direction, not a fresh design exploration.

The current Lovable project lives at https://lovable.dev/projects/18cae026-e2db-408e-b580-5445b49cd690. This GitHub repository uses two-way Lovable sync on `main`. Maintain a working branch and avoid force pushes.

## Verified or user-provided content currently used

- Brand: Kalahari Pharmacy
- Instagram: https://www.instagram.com/kalahari_pharmacy/
- Public listings associated with the pharmacy: Gustav Voigts Centre, Independence Avenue, Windhoek; phone +264 61 252 448; email kalpharm@iway.na.
- These contact details should still be confirmed with the business before launch.
- Business hours, operating licences, personnel, product inventory, service scope, prices, medical aid terms and official logo have **not** been confirmed for this build.

## Art direction

- Editorial rather than app-dashboard: a pale powder-blue page canvas with a large inset rounded site frame.
- Muted cornflower/steel-blue image-led hero. Large well-kerned bold sans display text, high contrast and convincing portrait composition.
- Hero portrait and two restrained floating everyday-care objects overlap the typography. These are conceptual illustrations, not verified stock products. Replace with approved photography once available.
- A large white rounded section rises over the hero on scroll, giving a layered curtain/reveal transition.
- White editorial about section with generous negative space and organic portrait mask shapes at the left/right edges.
- Two oversized colorful visual category panels side by side on desktop: warm golden yellow and deep wine/magenta, each with a real affordance for viewing category details.
- Full-bleed family/lifestyle photographic panel with a small set of useful floating information blocks.
- Spacious carousel-like editorial messages instead of fabricated testimonials. Never quote or attribute invented customers.
- Navigation stays minimal, readable on dark and light backgrounds, and works on keyboard and touch.
- Content should feel warm and grounded, not clinical stock-photo heavy, pseudo-medical or desert themed.

## Motion map

| Moment | Visual behavior | Reduced-motion alternative |
|---|---|---|
| First load | Short, nonblocking layered entrance of title, portrait and floating objects | Everything immediately visible |
| Hero to about | Rounded white panel moves over blue hero in response to scroll; natural stacking continuity | Static clean section boundary |
| About | Portrait cut-out shapes and editorial copy reveal subtly | Static imagery and text |
| Product categories | Intentional stagger on reveal, gentle interactive object lift, details panel responds promptly | No movement, clear focus/pressed state |
| Lifestyle | Restrained image parallax/scale and info blocks enter | Fixed image, normal content |
| Editorial messages | Quick crossfade or slide between items with accessible arrows | Instant or low-motion switch |
| Navigation | Quiet state change based on section background | Immediate contrast-correct state |

Prioritize user agency, performance and visible content. Do not implement forced scroll, hover-only actions, or elaborate loaders before key content. Use transform/opacity and test on real mobile widths.

## Site architecture

- **Home**: hero, about, featured categories, lifestyle feature, editorial messages, visit details and footer.
- **Explore**: editorial category discovery and clear navigation to individual categories; categories are not claims of specific in-stock products.
- **Category**: description and ability to add a category interest to an enquiry list.
- **Enquiry**: clear list and truthful email-based contact. No payment, prescription upload, health history or fake success state.
- **Contact**: address, click-to-call, available email/Instagram and map directions. No invented trading hours.

## Design rejection tests

Reject generic AI SaaS/healthcare templates, gradient-based replacement for the supplied photographic hero, repetitive grids of near-identical border cards, redundant micro-eyebrows, text smaller than readable body sizes, invented stats/reviews, arbitrary monochrome icons on every card, gratuitous glassmorphism, and animations without interaction purpose. The 20-indicator checklist in `01-anti-slop-20.md` contains nuance: design elements are not prohibited when justified.

## Content and asset priorities

1. Obtain actual Kalahari Pharmacy logo and brand guidelines.
2. Confirm the official business address, contact channels, hours and offered services with the owner.
3. Obtain approved genuine pharmacy/shop photographs and product/catalogue images; do not misrepresent models as employees.
4. Check licensing and performance of every remote/stock image and provide local optimized versions where feasible.
5. If adding regulated medicine-related functionality, separately verify Namibian legal and privacy requirements before allowing any transactions or uploads.

## Acceptance criteria

- Clear purpose in the first viewport, honest copy, meaningful CTA and navigation.
- Reference-consistent visual hierarchy, large image-led composition, varied sections, subtle purposeful motion.
- No unsupported medicines, medical claims, personnel, prices, ratings or service promises.
- 320/360/768/1024/1440px reflow without clipping or overflow, 200% zoom, keyboard/touch and reduced-motion support.
- Functionality and form states tested and no false submission success.
- Run `bun run lint`, `bun run test`, `bun run build` where available. Report actual results only.

See `.agents/skills/website-design-craft/references/07-review-and-qa.md` for the full verification gate.
