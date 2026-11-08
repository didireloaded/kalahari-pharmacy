# Reference 08 — Workflow and output contracts

## Step 1 — Site briefing

Capture: purpose, audience, business/user outcome, existing brand, approved media, content inventory, site map, competitors/reference sites, unique value, design constraints, stack and deployment constraints, accessibility and performance needs.

If the ask is a redesign, inspect the real current site and preserve effective functional patterns. If the ask is a new site, derive content hierarchy from real content rather than inventing a visual style first.

**Deliverable:** one-page brief, assumptions, missing assets, and a success definition.

## Step 2 — Content and information architecture

Create a sitemap and per-page content outline. For each page define above-the-fold proposition, main conversion action, proof, secondary exploration and footer/navigation connections.

**Deliverable:** navigation map, user journeys, page/section inventory.

## Step 3 — Visual directions

Where exploration is requested, offer 2–3 **meaningfully different** art directions:

- Typography rationale and type scale.
- Color approach based on brand.
- Layout rhythm and section variety.
- Photography/video/illustration art direction.
- Navigation and CTA treatment.
- Interaction and motion character.
- Responsive adaptation.

The options must differ in approach, not just their accent color. Recommend one based on user goals. If a direction has already been selected, honor it instead of restarting exploration.

**Deliverable:** design directions or selected design thesis.

## Step 4 — Detailed page blueprint

For each route:

```text
Page:
User goal:
Primary CTA:
Sections in order:
Required real content/assets:
Layout desktop:
Layout mobile:
Interactive controls:
Loading/empty/error/success states:
Motion triggers:
Accessibility considerations:
SEO/metadata:
Acceptance criteria:
```

**Deliverable:** annotated page specs, components and interaction states.

## Step 5 — System definition

Document typography, color and spacing tokens, grids, media treatments, component variants, interaction states and motion rules. Identify what is global versus page-specific.

**Deliverable:** design system and component behavior specification.

## Step 6 — Implementation (only if requested)

Inspect repository first. Use existing framework, linting, components, scripts and CMS/data sources. Build in sensible vertical slices: navigation, core landing experience, real page content, forms/interactions, responsive states, then polish.

Don't add animations before the underlying page and actions work. Avoid unnecessary dependencies. Keep components reusable without forcing every page into identical structures.

**Deliverable:** functioning pages, source code, tests and exact list of unimplemented integrations.

## Step 7 — Critique, test and refine

Check visuals at multiple widths; run accessibility and interaction tests; verify content claims and CTA behavior; run the full 20 anti-slop audit and purposeful motion audit. Fix highest-impact issues before micro-polish.

**Deliverable:** verified implementation with evidence and known limitations, or a prioritized audit report.

## Suggested handoff template

```text
Objective
Audience and core tasks
Chosen visual direction
Sitemap and routes
Design tokens
Page-by-page spec
Component and state inventory
Motion map
Asset and content needs
Responsive/accessibility/SEO requirements
Backend and integrations (if any)
QA plan
Decisions and open dependencies
Next implementation phase
```

## Modes of operation

### PLAN ONLY
No code changes. Use research/brief supplied and generate the full design/implementation plan. Avoid committing to unsourced product facts.

### DESIGN ONLY
Provide visual concepts or precise design guidance without claiming working functionality.

### IMPLEMENT
Make scoped code changes to the approved design and project; preserve existing behavior. Verify before completion.

### AUDIT
Review current design, collect evidence, prioritize issues, propose or apply fixes according to authorization.

### MOTION PASS
Add selected motion to existing functional UI; verify reduced-motion and performance. Do not rebuild the entire design because the user requested animations.

## Common failure modes

- Over-specifying colors and animations before understanding the website.
- Asking endless questions rather than making explicit reasonable assumptions.
- Treating mobile as just a smaller grid.
- Repeating a gradient and six-card layout across unrelated brands.
- Using fake content to make mockups look finished.
- Stopping at the happy path; forgetting errors, empty states, keyboard or low bandwidth.
- Reporting “fully responsive and accessible” without device/browser verification.