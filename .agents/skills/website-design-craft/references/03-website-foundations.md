# Reference 03 — Website design foundations

## Start from content, not components

Before designing a hero or selecting colors, collect the content that has to exist: product, service, story, case studies, product photos, staff details, actual prices, legal terms and contact methods. A website with attractive components but weak or inaccurate content remains a weak website.

Define for each page: **audience**, **user question**, **one primary action**, **supporting proof**, **content sequence**, **success state**.

## Information hierarchy

The layout should answer, in order:

1. What is this place/product/service?
2. Is it relevant to me?
3. Why should I believe it?
4. What can I see, compare or learn?
5. What do I do next?

A homepage may solve these with a hero, a meaningful visual, proof or demonstration, differentiated sections and a strong final action. Not every site needs all these blocks. Do not repeat the same CTA in every module.

Use **one dominant idea per viewport region**. Vary density intentionally: a bold visual moment can be followed by a quiet explanatory section, a comparison, and a real-world proof point.

## Layout and grid

- Use a fluid outer frame with appropriate max-width. Choose content columns based on readability rather than arbitrary symmetry.
- Wide desktop: often a 12-column conceptual grid or robust CSS grid layout; do not force 12 columns into markup.
- Text paragraphs: constrain line length to roughly 55–80 characters when possible; editorial leads can differ.
- Vertical rhythm: create meaningful transitions between content types rather than applying the same padding to every section.
- Long sites: navigation and footer should orient users. Useful in-page navigation may help on documentation or complex services.
- Use a mix of full-bleed media, open whitespace, split layouts, text-led sections and practical content, chosen per page.
- Do not arbitrarily constrain desktop to a narrow center strip or stretch sentences across ultra-wide displays.

### Suggested responsive starting points

| Viewport width | Composition goal |
|---|---|
| 320–375px | Clear single column, compact header, natural content priority, readable controls |
| 376–767px | Mobile single column, occasional two-up items only when content remains usable |
| 768–1023px | Tablet layouts, adaptable two-column areas, intermediate navigation |
| 1024–1439px | Desktop navigation, controlled page width, selected multi-column sections |
| 1440px+ | Strong grid and whitespace, more confident media placement without microscopic content |

Do not treat breakpoints as device labels or create extra breakpoints without a content reason. Prefer `clamp()`, CSS grid, flex and container queries for fluid layout.

## Typography

- Use a readable font for body copy, with sufficient glyph/language support and available weights.
- Make typography feel designed using size, weight, line length, leading and spacing before introducing font variety.
- Typical body size: 16–18px, adjusted by typeface and context. Small supporting text should remain accessible; avoid tiny 9–11px UI text.
- Headlines: use fluid scale appropriate to content. Don't mechanically make every hero 96px.
- Line height: body about 1.45–1.7 depending on font and line length; display heads tighter if readable.
- Avoid forced negative tracking for all headings. Never fake typographic prestige with ubiquitous italic and tracked micro-labels.
- Use consistent numeric presentation, including tabular figures for financial or data-heavy displays.
- Test large text/zoom. Avoid rigid heights that clip translations or wrapped headings.

## Color and surfaces

Define semantic roles rather than creating random shade variants:

```text
--color-canvas
--color-surface
--color-surface-raised
--color-text
--color-text-muted
--color-border
--color-action
--color-on-action
--color-success
--color-warning
--color-error
--color-focus
```

Use a true palette for the actual brand. It might be restrained and monochrome, warm and editorial, brightly festival-oriented, or technical and dense. Don't force every brand into navy+teal, purple+blue, black+gold or beige+serif.

Use contrast-tested combinations for body and controls. Color cannot be the only signifier of selected, error or success state.

## Spacing

Start from a small scale such as 4, 8, 12, 16, 24, 32, 48, 64, 96px; fluidize section spacing where appropriate. These are starting points, not universal design measurements. Consistent spatial logic matters more than sticking to exact numbers.

Space should reflect **relationship**: tight inside a label-control group, moderate between sibling elements, larger between unrelated page sections.

## Borders, shadows and radii

- Use borders to separate selectable or dense components, not as decoration around every sentence.
- Shadows communicate elevation, not prestige. Avoid stacked glowing shadows.
- Radius depends on brand and component role. A 3px radius and 18px radius can coexist only if there is a reason; avoid random values.
- Preserve visual simplicity where open layout works better.

## Imagery and video

- Use authentic, licensed photos of real work, people, events, places or products when possible.
- Compose image crops deliberately: focal point, subject position, breathing room, contrast with overlaid text, portrait vs landscape.
- Use `object-fit`, appropriate focal points and responsive `srcset`/`sizes` where available.
- Reserve media dimensions to avoid layout jumps.
- Use autoplay video only where it genuinely demonstrates atmosphere/product and can be muted, paused or replaced by a poster. Respect reduced motion and data constraints.
- Never use generated imagery as undisclosed documentary proof of a real person, business, event or result.

See `09-content-and-assets.md`.

## Navigation architecture

- Organize around user goals, not internal department names.
- Choose straightforward labels. When navigation expands, group information logically.
- Desktop navigation may use a horizontal primary menu, with a mega menu only if complexity justifies it.
- Mobile navigation should open predictably, preserve scroll appropriately and support Escape/focus behavior.
- Provide clear current-page indication and a useful footer, including legal and contact information where relevant.
- Search, filters and breadcrumbs are for content that benefits from them; do not add them as decoration.

## Buttons, links and actions

- Primary actions use descriptive verbs and a clear resulting expectation.
- Secondary actions should not compete equally with the primary action on every screen.
- Text links should read as links without relying entirely on color; ensure clear focus and hover.
- Button states: default, hover, focus-visible, pressed, disabled, loading, success/error as applicable.
- External navigation and downloads should be clear when relevant.

## Productive asymmetry

Asymmetry can create hierarchy without chaos: a photographic column larger than its text partner, an intentional offset caption, an editorial full-bleed insert. But alignment, rhythm and reading order must remain coherent, and responsive reflow should preserve meaning.

## Visual originality test

Ask:

- If we remove the logo, could this page belong to dozens of unrelated companies?
- Is the hero showing actual differentiation or just generic claims?
- Do sections change rhythm and medium where the content changes?
- Could a reader mistake invented data or visuals for real proof?
- Are our interactions conventional where they should be and distinctive where that is useful?

If the site fails, revise the actual content hierarchy and art direction before adding decoration.