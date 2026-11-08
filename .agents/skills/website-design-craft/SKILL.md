---
name: website-design-craft
description: >-
  Design, critique, redesign, and implement distinctive, accessible, responsive,
  production-quality websites. Use for landing pages, marketing sites, portfolios,
  editorial sites, service websites, e-commerce storefronts, documentation,
  dashboards, and web applications when visual design, information architecture,
  responsive behavior, or interaction polish matters. Covers 20 common AI-generated
  design clichés and 20 purposeful animation principles from user-provided video
  references. Framework-agnostic, brand-agnostic, and suitable for Codex or other IDE agents.
---

# Website Design Craft

## Purpose

Create websites that are clear, visually intentional, specific to their audience, and satisfying to use. Treat design as a combination of information architecture, content, layout, typography, imagery, accessibility, responsive behavior, motion, and real functionality.

This skill is **general purpose**. It is not attached to any client, brand, app, website, industry, or existing project. Adapt the design system to the project instead of imposing one generic visual style.

It translates two user-supplied video references into actionable website practices:

1. **“20 AI Design Slop Indicators”** → `references/01-anti-slop-20.md`
2. **“20 Ways to Make Beautiful AI Animations”** → `references/02-motion-20.md`

The videos offer useful heuristics, **not absolute prohibitions**. A pill, serif, border, diagram, gradient, or animation can be exactly right when it serves the product, brand and user.

## The core standard

A successful website is:

- **Specific:** looks and sounds designed for this particular content, audience, and brand.
- **Useful:** the next action and essential information are easy to find.
- **Credible:** genuine content, correct details, believable imagery, clear trust cues.
- **Legible:** strong type hierarchy, readable sizes, adequate contrast and whitespace.
- **Responsive:** thoughtfully composed for narrow mobile viewports and wide desktops.
- **Accessible:** keyboard, screen reader, reduced motion, zoom and touch interactions work.
- **Fast:** restrained scripts, measured imagery and motion, minimal layout shifts.
- **Complete:** navigation, forms, loading, empty, error, success and recovery states work.
- **Alive:** subtle, useful interaction feedback and continuity, without motion for its own sake.

### Priority hierarchy

1. Product truth, accessibility, privacy, security, and genuine functionality.
2. User needs, content accuracy, information hierarchy, task completion.
3. Responsive structure, readable text, clear interaction states.
4. Visual coherence and brand expression.
5. Purposeful transitions and refined details.
6. Novelty and decorative effects, only when they add something meaningful.

Never sacrifice an earlier priority to satisfy a later one.

## How to activate this skill

**When asked to plan:** Produce a design strategy, audience/task model, sitemap, page blueprint, token direction, responsive rules, interaction and motion map, asset needs, risks, acceptance criteria. **Do not write application code.**

**When asked to design or explore:** Produce at least a strong visual direction and page composition specifications. Where the user wants alternatives, supply distinctly different directions, not superficial color swaps. Do not claim visual work was tested unless it was.

**When asked to build:** Inspect the existing repository, preserve established patterns and approved content, implement the selected direction, and verify at realistic viewport sizes. Do not invent assets or fake integrations. Prefer the project's existing tools over adding libraries.

**When asked to audit:** Review real screenshots/pages when available. Give concrete findings tied to elements, ordered by impact, and show how to correct them. Don't replace critique with vague praise or “make it modern.”

**When asked to animate:** Choose transitions for entry, response, hierarchy, continuity and feedback. Use `references/02-motion-20.md`, respect reduced motion, and check performance.

## Essential working process

### 1. Understand the context

Read the existing brief, brand guidelines, content, images, screenshots, repository and constraints. Identify:

- Site type and audience.
- Primary objective and top 1–3 user tasks.
- Existing visual identity or latitude to create one.
- Real content and assets vs placeholders.
- Pages/routes, navigation structure and calls to action.
- Technical framework, deployment, SEO, CMS, forms and integration constraints.
- Accessibility, browser and connection assumptions.

If a key fact is unknown and work can proceed responsibly, record a clearly labeled assumption. Do not invent business facts, testimonials, client logos, prices, statistics, ratings, integrations or photos presented as genuine.

### 2. Define the design direction before polishing components

Choose **one coherent design thesis**: e.g. visual editorial, architectural minimalism, vibrant festival, expressive portfolio, warm hospitality, serious public-service utility, premium commerce, or dense operational workspace. Define what makes this direction appropriate for the project.

Identify one dominant visual idea, a consistent visual rhythm, information density appropriate to the page, and how imagery or product UI provides proof.

Read: `references/03-website-foundations.md`, `references/04-page-patterns.md`, `references/09-content-and-assets.md`.

### 3. Plan the pages and user journeys

Create a sitemap. For each page capture:

- Its single primary purpose and audience question.
- Above-the-fold promise, proof and main action.
- Ordered sections with concise content guidance.
- Navigation into and out of the page.
- Forms or controls with empty, hover, focus, active, loading, success and error states.
- Mobile and wide-screen composition.
- Required authentic assets and missing content.

Prefer substantive, scannable sections to repeated template blocks. Use `references/04-page-patterns.md`.

### 4. Create a real design system

Set tokens for typography, spacing, colors, page widths, responsive breakpoints, borders/radii, surfaces, iconography and motion. **Tokens must express a design choice**, not become a sprawling set of nearly identical values.

Use `references/03-website-foundations.md` and `references/06-implementation-recipes.md`.

### 5. Run the anti-slop audit

Review all 20 items in `references/01-anti-slop-20.md`. Each time a pattern appears, decide:

- Does it support clarity, function or identity?
- Could typography, composition, content or whitespace do it better?
- Is it being repeated thoughtlessly across the whole website?
- Is it part of an approved brand style that should be retained?

Do **not** ban common elements merely because they are in the video. The issue is indiscriminate use.

### 6. Plan interaction and motion

Identify the **few moments worth animating**. Select appropriate motion recipes from `references/02-motion-20.md`. A good motion plan names trigger, changing element, duration range, easing, interruption behavior, reduced-motion fallback and success criteria.

Prefer transforms and opacity, and don't make simple actions wait for animation to finish. Animations should be interrupted or reversed cleanly.

### 7. Implement with real behavior

Use the project's current framework and conventions unless the user requests a change. Build semantic sections and accessible interactive controls. Every visible button, tab, link and form should have truthful behavior. If an endpoint is missing, use a clearly identified demo state or a suitable disabled/coming-soon design. Do not pretend to have sent a request, processed a purchase, saved a record, or completed an external transaction.

Read `references/05-responsive-accessibility-performance.md`, `references/06-implementation-recipes.md` and `references/10-component-states.md`.

### 8. Verify in a real viewport

Inspect and test at least 360, 768, 1024 and 1440 CSS px; also test a very narrow 320px viewport when practical, long content, 200% zoom, keyboard use, reduced motion and touch. Validate real form flows, navigation, layout stability and meaningful performance indicators.

Run `references/07-review-and-qa.md`. If no browser or screenshot inspection is possible, say so and do not claim pixel-level verification.

## Hard rules

1. **Planning is not permission to build.** Stop at a useful plan when that's what was requested.
2. **Do not apply a universal “AI website” template.** Brand, audience and content determine design.
3. **Do not default to a centered generic gradient hero, six floating feature cards and pills everywhere.** Use them only if justified.
4. **Do not use 9–11px body text or unreadable low-contrast labels.** Text should be comfortably legible.
5. **Do not wrap every section, heading and paragraph in a bordered or shadowed card.** Use hierarchy and spacing.
6. **Do not fill empty space with invented testimonials, awards, metrics, partner logos, reviews, maps or pseudo-functional UI.**
7. **Do not use generic placeholder images as though they were genuine photos of a specific business, person, event or product.**
8. **Do not animate everything.** Motion must serve orientation, feedback or meaning.
9. **Never hide essential information behind hover alone.** Touch and keyboard must work.
10. **Don't rely on animation or color alone to convey status.** Text, state and accessible labels also matter.
11. **Respect reduced-motion preferences and focus visibility.**
12. **Make mobile a designed composition, not a shrunk desktop page.**
13. **Don't replace working integration with fake success UI.** Mark demos or disabled states clearly.
14. **Do not remove approved branding, real assets, important content or existing product behavior without permission.**
15. **Use semantic HTML and accessible interactions rather than clickable decorative containers.**
16. **Verify before claiming completion.** Differentiate implemented, visually checked and unverified work.

## Navigation map for this skill

| Need | Read |
|---|---|
| Avoid generic AI-generated visuals | `references/01-anti-slop-20.md` |
| 20 purposeful animation techniques | `references/02-motion-20.md` |
| Visual hierarchy, layout, type, color, spacing | `references/03-website-foundations.md` |
| Page structures across website categories | `references/04-page-patterns.md` |
| Responsive, accessibility, SEO and performance | `references/05-responsive-accessibility-performance.md` |
| CSS and interaction implementation recipes | `references/06-implementation-recipes.md` |
| Comprehensive design QA and release gate | `references/07-review-and-qa.md` |
| Brief-to-delivery operating process | `references/08-workflow-and-deliverables.md` |
| Writing, imagery, authentic proof and video | `references/09-content-and-assets.md` |
| Component and interaction states | `references/10-component-states.md` |
| Source-video-to-rule crosswalk | `references/11-video-source-map.md` |
| Ready-to-paste requests for IDE agent | `examples/PROMPTS.md` |
| Project intake template | `examples/WEBSITE_DESIGN_BRIEF_TEMPLATE.md` |
| Review output example | `examples/DESIGN_AUDIT_TEMPLATE.md` |

## Output quality gate

Before handoff, the author or agent must answer:

- Does this website have a clear purpose and a recognizable identity?
- Is there a meaningful distinction between sections, rather than repeated uniform cards?
- Can users find the primary action quickly on mobile and desktop?
- Are typography and imagery appropriate to the actual content?
- Are all interactive states and links truthful and accessible?
- Does motion improve continuity and immediate feedback, with a reduced-motion fallback?
- Are layout, contrast, performance, SEO and input accessibility checked?
- Has the anti-slop review removed patterns used without intent?
- Is any unimplemented or unverified functionality explicitly called out?

If not, the work is not complete.