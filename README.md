# Kalahari Pharmacy

PROJECT NAME: Kalahari Pharmacy
Create the actual working, polished, responsive multi-section website for Kalahari Pharmacy, an existing pharmacy in Windhoek, Namibia. Build now, do not stop at a plan. Treat this as a high-fidelity editorial art-direction implementation based on a 19-second animated website reference supplied to the user in ChatGPT. A visual analysis of the reference follows. Priority #1 is recreating the reference's extraordinary layout and MOTION LANGUAGE, not an ordinary healthcare SaaS or pharmacy template.

BUSINESS FACTS VERIFIED VIA PUBLIC LISTINGS:
- Brand: Kalahari Pharmacy
- Address: Gustav Voigts Centre, Independence Avenue, Windhoek, Namibia. Listed on the centre's official tenant directory.
- Phone: +264 61 252 448.
- Contact email in Methealth provider listing: kalpharm@iway.na.
- Instagram: https://www.instagram.com/kalahari_pharmacy/
- Do not fabricate business hours, free delivery, product inventory, prices, insurance partnerships, certifications, pharmacists' names, team photos, services or testimonials. Exact details and brand assets may be replaced later. Do not claim 24-hour care or prescribe medicines.

VISUAL REFERENCE FRAME-BY-FRAME DESCRIPTION (critical):
Original reference: “Xefag” branded wellness brand motion design. The page sits on a clean, PALE POWDER BLUE full-browser canvas (#D8EAF5 approximate) with generous 5-6vw outer gutters and a huge inset website container, corner-radius ~40px on desktop, clipped at corners. Hero is a BEAUTIFUL muted cornflower/steel BLUE (#4F86AA), with subtle oversized abstract organic tonal shadows. Navigation is integrated at top and remains visible while scrolling: small refined white wordmark at left, small centered ice-blue/pale translucent pill navigation buttons (Products, Contact), two tiny circular icon controls at right. Editorial very large condensed-feeling grotesk/sans typography, sophisticated tight tracking, not a conventional font stack. White black type, lots of breathing room.
0-1s HERO: tall blue panel, eyebrow, huge stacked white text 'Powerful / Boost' centered and partly visually overlapped by a smiling female studio portrait, with two floating photographed supplement bottle packshots angled at left and right. They have polished, restrained drop shadows and motion. For OUR pharmacy translate this into a caring, grounded headline e.g. 'Better / Every Day' or 'Care, / Closer' and a REAL high-quality lifestyle portrait with dynamic crops and a subtle visual array of everyday wellness objects (non-branded, no fake medicine labels). Retain the precise composition and artistic overlap. Do not recreate Xefag brand assets, logo, or fake pharmaceutical packs.
1.5-2.5s SCROLL SECTION REVEAL: a MASSIVE WHITE ROUNDED RECTANGULAR PANEL rises from the bottom, overlays the blue hero, leaving blue visible above for part of the transition, then settles. White editorial About section, tiny centered eyebrow, centrally aligned extremely bold black headline occupying 4-5 lines, left and right photographic PORTRAITS cropped into organic leaf/curved sweeping masks at the margins, people partly off-canvas. Centered small quiet paragraph.
3.5-5s PRODUCTS: pristine white full-width section, two big side-by-side saturated-color product panels with large rounded corners (left GOLDEN YELLOW #F8B500, right DEEP WINE/MAGENTA #900B32). Large text top-left, tiny badge top-right, immense isolated product object/photos in middle, restrained microdescription bottom-left and small white pill 'Details' bottom-right with tiny colored arrow. High contrast editorial. For pharmacy represent REALISTIC broad OTC category / wellness / skincare / personal care visuals and categories, NO nonexistent brands, medical claims, or prescription sales. A user should be able to open details and enquire about availability, not buy prescription medication.
5-7s FULL-BLEED LIFESTYLE PANEL: rich color-graded photo of a happy family in autumn among trees, edge-to-edge inside the large rounded web shell, headline in upper left, three floating elevated white rectangular info cards aligned near bottom. Use credible warm, authentic lifestyle / family photography fitting Namibia and pharmacy, avoid the generic white coat doctor stock-photo look. Site may use images sourced from licensed/Unsplash assets (no broken remote random URLs).
7-9s TESTIMONIAL/EDITORIAL WHITE PANEL: huge centered black 'Customer Experiences and Feedback'; on left a stack of small rounded portrait thumbnails offset in a column, overlapping orange/pale blue squares; on right a large bold black quote and tiny author details, plus delicate previous/next circular outline arrow controls. For our site maintain the exact layout and carousel feel but DO NOT publish fabricated customer quotes or people; replace with an editorial 'Why care matters' message layout until genuine approved testimonials are available, or clearly labeled sample content inside a non-public admin editing layer.
9-19s the recording repeatedly switches sections showing multi-layered sliding overlays, a brand-colored full-page loader with a segmented circular mark rotating/assembling, organically masked photo wipes, product panels scrolling under a translucent pill navigation bar, moving image layers and text reveal. Treat motion as a major feature, not a couple of standard fades.

MOTION IMPLEMENTATION:
Use GSAP with ScrollTrigger where appropriate, or smooth lightweight Framer Motion CSS/IntersectionObserver equivalents if better. Editorial choreography:
- Initial page load: brief restrained circular spinner then hero layers smoothly stagger in (eyebrow->huge title->portrait->floating objects), portrait rises subtly and text comes from below with masked overflow, ~0.5-0.9s stagger, not cheesy bounces.
- Blue hero to about: white overlaid rounded container slides vertically like a curtain over hero with scrubbed scroll position and slight parallax, while corner radius and overlapping hero remain visible during transition.
- About photo cut-outs reveal via organic clip-path / mask shapes, moving subtly with scroll.
- Products reveal via two large cards staggered sliding gently upward, product objects subtle lift/rotation on pointer, Details pills animated arrows; reveal content inside on open with animated focused detail panel.
- Lifestyle image has gentle scale and parallax, translucent floating feature mini-cards drift in with stagger.
- Testimonial/editorial arrows animate horizontally through content/portrait stack, transitions carefully controlled.
- Navigation glass/pill variant changes its text/icon colors over dark versus white sections, sticky and usable.
- Smooth section and page transitions with intentional timing and layered continuity, but DO NOT hijack scroll, trap focus, make animations lag, or use gratuitous blur/3D/spinning everywhere.
- CSS respects prefers-reduced-motion with no motion and no parallax. Mobile motions simplified.

IDENTITY AND COPY:
Brand as 'Kalahari Pharmacy' typographic custom wordmark for now until authentic logo supplied. Calm and human, practical, trustworthy and contemporary. Not 'desert gimmicks' (no cactus, dunes, medical crosses repeated in every card). Reference's muted blue outer background and blue hero, vivid yellow/wine color panels, white editorial sections take precedence over usual healthcare turquoise gradients. Visually driven, few words per screen. Proposed hero: eyebrow 'Your everyday neighbourhood pharmacy'; headline 'Care that / feels closer.' Subcopy 'Everyday essentials, practical guidance, and a familiar place to turn.' All factual service language remain modest. Use 14-16px body minimum and large 64-110px responsive display headings. Typography should feel like high-end brand direction, with careful kerning. Lucide icons only. NO default shadcn cards everywhere, no generic glassmorphism, no neon/purple gradients, no generic templates, no fake statistics or AI slop.

SITE STRUCTURE / FUNCTIONAL CONTENT:
1. Home immersive reference-style single long page (hero, our care/about editorial, browse categories in big yellow/wine panels, lifestyle full-bleed feature, three small benefits/info cards, editorial carousel section with verified brand messages instead of fake reviews, visit/contact, understated footer).
2. Shop/Explore categories (browse and filter an editorial catalogue of CATEGORIES only, not fabricated in-stock SKUs): Everyday Wellness, Personal Care, Skin & Beauty, First-Aid Essentials, Family & Baby Care. Clicking categories yields well-designed category detail pages or modals explaining what visitors can enquire about, not invented availability.
3. Contact / Visit page: formatted physical address, click-to-call +26461252448, email kalpharm@iway.na, Instagram link, Google Maps external directions. Do not display hours until confirmed.
4. Minimal functional enquiry/list interaction inspired by the basket icon in the reference: 'My enquiry list' where users add category interests and can send their enquiry through pre-filled email link; clearly label as enquiry not purchase or medical consultation. For health privacy DO NOT collect health history, prescription uploads or sensitive patient data. If implementing a server form requires additional secure configuration, keep inquiry via email rather than a pretend success toast.
5. All navigation, detail pills, controls, carousels, links, menus and mobile navigation must have real functionality, keyboard semantics, and accessibility labels.

RESPONSE/QA REQUIREMENTS:
- Mobile-first responsive, but desktop must reproduce reference's large inset shell and floating layered imagery precisely. On mobile smaller shell gutter/radius, editorial vertical stacking and no overlapping unreadable text.
- Polish from first viewport to footer. Work with credible real photography (avoid obviously AI-generated portraits). Use robust image loading and image alt. Correct nav, accessible contrast, SEO title/meta/OG, fast load, no console errors.
- Save content in easy-to-edit arrays for swapping real pharmacy logo, products, business data and testimonials later.
- Do not publish/deploy automatically without an explicit request.
- Build actual components/styles/animations now, in the workspace. Do not just explain the plan.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/18cae026-e2db-408e-b580-5445b49cd690).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
