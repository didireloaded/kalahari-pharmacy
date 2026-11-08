# Reference 10 — Component and interaction state inventory

Design a component only as complex as the user task requires. Use standard browser behavior when it solves the problem. Every component with an action needs observable response and an appropriate error/recovery path.

## Header and navigation

**States:** default, scrolled, current page, hover/focus, submenu open/closed, mobile drawer open/closed, optional search.

**Rules:** clear destinations, strong mobile navigation, usable keyboard order, proper focus restore, Escape to close, no hover-only links, no hidden primary CTA.

**Motion:** dropdown 150–250ms, mobile drawer ~200–280ms; don't animate the entire header on every scroll tick.

## Hero

**Contents:** real proposition, relevant media or type-led visual, primary action, supporting evidence when available.

**Variants:** photo-led, video-led, split, editorial typography, product demo. Choose content-first.

**States:** image failed/slow, video paused/reduced-motion, mobile crop, extremely long headline.

## Cards, rows and collections

**Use cards when:** one item is truly a discrete selectable/comparable unit.

**Use rows/open layout when:** content is mainly navigational, explanatory or editorial.

**States:** default, hover/focus, selected, loading/empty, missing image, unavailable.

**Motion:** subtle hover/elevation or selected feedback; shared-element detail expansion when useful.

## Forms and inputs

**States:** untouched, focused, valid, invalid, disabled, pending, submission error, success, re-entry after back navigation.

**Rules:** persistent labels, accessible descriptions, helpful validation, no premature success, preserve data when safe, keyboard and mobile form usability, no required fields without explanation.

**Motion:** small validation or status change; no screen shake as primary feedback.

## Buttons and links

**States:** idle, hover, focus-visible, active/pressed, disabled, loading, confirmed success.

**Rules:** real semantics, clear destination/action, sufficient contrast and target size, loading cannot be clicked repeatedly if it would duplicate transaction.

## Dropdowns, popovers and menus

**States:** closed, open, selected, empty results, long text, disabled option, keyboard focus.

**Rules:** origin from trigger, Escape handling, focus management, viewport collision handling, no invisible hover-only navigation.

## Dialogs, drawers, sheets

**States:** opening, open, closing, confirmed/cancelled, interrupted, content overflow.

**Rules:** proper dialog semantics, focus trap where appropriate, restore focus, mobile fit, Escape and close behavior, background interaction control.

**Motion:** short entrance from trigger or subtle opacity/translate; exit quicker.

## Tabs and segmented controls

**States:** selected, unselected, focus, loading content, empty content.

**Rules:** proper tab semantics when tabs genuinely switch panels; keyboard navigation; don't use tabs when simple links are more understandable.

## Accordions and FAQs

**States:** collapsed, expanded, focus, long content.

**Rules:** logical headings, `aria-expanded`, appropriate disclosure semantics; no need for an elaborate border box around each answer.

## Galleries and media viewers

**States:** loading, loaded, lightbox, next/previous, image absent, video paused, captions.

**Rules:** accessible controls, alt text/captions, keyboard/touch navigation, focus restoration, image sizes reserved.

**Motion:** optional thumbnail-to-detail shared element, gentle crossfade, reduced-motion fallback.

## Pricing and product selection

**States:** selection, disabled/unavailable option, quantity or variant change, loading, tax/shipping info, final confirmation.

**Rules:** costs and limitations clear, no misleading discounts/urgency, truthful inventory/availability, no fabricated rating.

## Tables, charts and stats

**States:** loading, empty, filter, sorting, error, pagination, permission-limited view.

**Rules:** accessible labels and textual data alternatives, sensible density, readable numbers, no excessive KPI cards, no invented data.

## Authentication and account flows

**States:** logged out, new account, verification pending, wrong code, rate limit, locked session, recovered account.

**Rules:** genuine auth flows; don't render a signed-in success state without token/session verification.

## Search and filters

**States:** initial, typing, suggestions, no results, partial results, loading, failure, filter applied, clear all.

**Rules:** clear query state, debounce where justified, cancellation of stale requests, preserve selected filters, announce counts if needed.

## Notifications and toasts

**States:** info, success, caution, error; dismissible/persistent depending on severity.

**Rules:** status text, no false success, enough time to read or control; do not rely on color or motion alone.

## Footer

**States:** desktop columns, stacked mobile, legal links, social links and contact details.

**Rules:** complete, accurate, accessible and consistent. Avoid oversized decorative content that pushes utility links away.

## Cross-component review

For every control answer:

```text
What does it do?
What does the user see before acting?
What changes when activated?
What happens if the service is slow or fails?
Can the user recover or undo?
What does a keyboard or screen reader user experience?
What happens at 320px, 768px, 1440px, 200% zoom?
What happens with reduced motion?
Is the displayed success real or simulated?
```