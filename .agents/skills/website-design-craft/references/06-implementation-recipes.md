# Reference 06 — Implementation recipes and design tokens

These examples are framework-agnostic. Follow the current repository's architecture and design system where one exists. The examples are starting points, not an instruction to replace a working codebase.

## Foundation CSS variables

```css
:root {
  /* Replace with the actual project's approved palette. */
  --color-canvas: #faf9f7;
  --color-surface: #ffffff;
  --color-text: #181c1d;
  --color-muted: #566061;
  --color-border: #dce0e0;
  --color-action: #174c54;
  --color-on-action: #ffffff;
  --color-focus: #126f92;

  --space-1: .25rem;
  --space-2: .5rem;
  --space-3: .75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;

  --radius-sm: .375rem;
  --radius-md: .75rem;
  --radius-lg: 1.125rem;

  --container: 76rem;
  --gutter: clamp(1rem, 3.5vw, 3rem);
  --section-space: clamp(3.5rem, 8vw, 8rem);

  --ease-out: cubic-bezier(.16, 1, .3, 1);
  --ease-move: cubic-bezier(.4, 0, .2, 1);
  --motion-fast: 140ms;
  --motion-ui: 210ms;
  --motion-page: 340ms;
}

/* These are generic defaults, not a required final art direction. */
html { scroll-behavior: smooth; }
body { margin: 0; color: var(--color-text); background: var(--color-canvas); }
img, video { display: block; max-width: 100%; }
.container { width: min(calc(100% - 2 * var(--gutter)), var(--container)); margin-inline: auto; }
.section { padding-block: var(--section-space); }
.reading-measure { max-width: 70ch; }
.hero-title { font-size: clamp(2.5rem, 5vw, 5.75rem); line-height: 1.04; letter-spacing: -.025em; }

:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 3px; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```

Do not copy the palette as a universal brand. Customize it and verify contrast. If a global reduced-motion reset causes component issues, write scoped accessible fallbacks instead.

## Responsive editorial split

```css
.feature-split {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(20rem, .9fr);
  gap: clamp(1.5rem, 5vw, 5rem);
  align-items: center;
}
.feature-split__copy { max-width: 58ch; }
@media (max-width: 52rem) {
  .feature-split { grid-template-columns: 1fr; }
  .feature-split__media { order: -1; }
}
```

When reading order matters, keep DOM order semantically correct and avoid using CSS reordering in a way that confuses keyboard/screen-reader reading flow.

## Intentional responsive grid

```css
.work-grid {
  display: grid;
  gap: clamp(1rem, 2vw, 1.75rem);
  grid-template-columns: repeat(12, minmax(0, 1fr));
}
.work-grid > * { grid-column: span 4; min-width: 0; }
.work-grid > .feature { grid-column: span 8; }
@media (max-width: 60rem) {
  .work-grid > *, .work-grid > .feature { grid-column: span 6; }
}
@media (max-width: 40rem) {
  .work-grid > *, .work-grid > .feature { grid-column: 1 / -1; }
}
```

Do not make every grid equal-height just because a layout library makes it easy. Let content and images guide rhythm.

## Hover/focus affordance

```css
.interactive-card {
  transition: transform var(--motion-ui) var(--ease-out),
              box-shadow var(--motion-ui) var(--ease-out);
}
@media (hover: hover) {
  .interactive-card:hover { transform: translateY(-3px); }
}
.interactive-card:focus-within { outline: 2px solid var(--color-focus); outline-offset: 3px; }
```

Use a real anchor/button inside the card. Don't make nested controls ambiguous or put onclick on every wrapper.

## Button feedback

```css
.button {
  transition: transform var(--motion-fast) var(--ease-out),
              background-color var(--motion-fast) var(--ease-move);
}
.button:active { transform: scale(.97); }
.button:disabled { cursor: not-allowed; opacity: .55; }
```

A tiny scale movement is optional. Loading/success is a semantic state, not just an animation.

## Popover motion

```css
.popover {
  transform-origin: var(--popover-origin, center top);
  animation: pop-in 190ms var(--ease-out) both;
}
@keyframes pop-in {
  from { opacity: 0; transform: translateY(-5px) scale(.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .popover { animation: none; }
}
```

Popover logic still requires correct focus, close, Escape and outside-click behavior. CSS alone does not provide these semantics.

## State continuity

To transition content without a blank flash:

1. Keep the last valid result visible while new data is loading, with a subtle pending indicator.
2. When new data arrives, update text and result count truthfully.
3. Crossfade content for ~150–200ms only if it remains accessible.
4. Cancel an outdated request when search/filter criteria change rapidly.
5. Do not leave multiple interactive duplicates or broken focus order during overlap.

## Using a motion library

If the project already uses a motion library, use its supported primitives for presence, layout transitions and reduced motion. Do not install a heavy dependency solely for one dropdown or hover effect. Generic CSS is often enough.

## Images and video

```html
<picture>
  <source srcset="/images/hero.avif" type="image/avif" />
  <img src="/images/hero.jpg" width="1600" height="900"
       alt="Descriptive real scene, if the image is informative"
       fetchpriority="high" decoding="async" />
</picture>
```

Use a real image and responsive derivatives in production. Noncritical images can load lazily. Don't lazily load the key LCP image if it delays display.

```html
<video controls playsinline preload="metadata" poster="/images/video-poster.jpg">
  <source src="/videos/feature.mp4" type="video/mp4" />
  <track kind="captions" src="/captions/feature.vtt" srclang="en" label="English" />
</video>
```

For ambient background video, use muted/playsinline when appropriate, provide pause/stop controls and still poster fallback, and disable nonessential autoplay under reduced motion or data-saving conditions where feasible.

## Performance and verification commands

Use the project's scripts and tooling. Typical checks may include lint, typecheck, unit/component tests, production build, browser smoke tests and page inspection. Record the actual commands run and whether they passed. Do not claim Lighthouse, accessibility or device scores that have not been measured.