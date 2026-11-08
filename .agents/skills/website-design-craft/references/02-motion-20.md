# Reference 02 — 20 purposeful website animation techniques

Source: user-provided video **“20 Ways to Make Beautiful AI Animations”**. Names and numbered patterns reflect the video. Apply the techniques selectively. **The video demonstrates concise heuristics, not mandatory timings or interaction standards.**

## Motion philosophy

Motion is a navigation and feedback tool. Prioritize responsiveness, user control and continuity over choreography. Use more animation in expressive storytelling when there is a clear benefit; use less in forms, checkout, booking, settings, dense tables and data entry.

**Starting ranges, not universal rules:**

- Press feedback: 70–140ms.
- Hover or small state transition: 120–200ms.
- Dropdown, tooltip and popover: ~150–250ms.
- Dialog, drawer, section reveal: ~180–300ms.
- Shared-element/page transition: ~220–450ms, only when it preserves continuity.
- Scroll entrance: ~300–550ms, usually once, only for content where it helps.
- Exit often 15–25% shorter than entry.

Use easing that settles naturally, e.g. `cubic-bezier(0.16, 1, 0.3, 1)` for entrances and `cubic-bezier(0.4, 0, 0.2, 1)` for spatial moves. Do not turn these into an inflexible global animation template.

## The complete 20 techniques

### 1. Ease-out for entrances
New content should decelerate into its resting position. Use for dialogs, menu panels, cards revealed by explicit action and short page transitions. Avoid large movement distances. Reduced motion: opacity change or instant display.

### 2. Dropdowns at 150–250ms
Open and close dropdowns quickly. Anchor them to their trigger; maintain keyboard navigation, focus management and correct `aria-expanded`. Long animations make menus feel slow.

### 3. Stagger list rows by 30ms
On initial reveal, small sets of related rows may appear with ~20–35ms offsets. Avoid staggering huge lists, search results on every keystroke, paginated tables and content that users need immediately.

### 4. Scale to 0.97 on press
A button or action tile may compress slightly on pointer down. Ensure there is also a clear non-motion pressed/focus state. Don't scale all inline links, input fields or whole pages.

### 5. Stretch moving knobs 12%
A slider thumb or switch handle may subtly elongate in the direction of movement. Only consider when direct manipulation benefits and the control remains readable and accessible. Not necessary for normal web forms.

### 6. Stagger as details settle
When opening a modal, reveal the container and then logically related title, body and actions with slight overlap. Avoid long waterfall entrance sequences before users can act.

### 7. Arcs for object movement
In creative direct-manipulation interfaces, an object may travel along an arc toward a destination, e.g. adding an item to a basket. Use only when it teaches spatial relationships and the object is clearly related to its source/target. Don't arc whole pages.

### 8. Pulse to confirm success
After a **real success state**, one understated pulse can acknowledge completion. Don't animate success before the network response or imply that an unverified action succeeded. Also show accessible text.

### 9. Ease-in-out for moves
Use for elements relocating within a layout, such as a selected navigation indicator, reordered rows or an expanding card. Keep movement predictable and interruptible.

### 10. Start popovers at 0.95
Popover appears near its final position at ~95% scale and fades in. Set transform origin near its trigger. Avoid on large sheets where subtle slide/fade is better.

### 11. Enter from the trigger
A panel, card or detail view can expand from the clicked element, strengthening continuity. Good for galleries, media lightboxes or project preview expansion.

### 12. Exit to the trigger
A modal or expanded detail can shrink/return toward the origin control. Restore keyboard focus to the trigger. Avoid when the trigger has disappeared or moved offscreen.

### 13. No bounce on everyday UI
Routine menus, buttons, filtering and navigation should settle without overshooting. Bounce is occasionally suitable for playful products or explicitly branded scenes, but not the default.

### 14. Don't tween while held
Dragging, scrubbing and sliders should follow the pointer immediately. Interpolation during active manipulation introduces lag. Use easing only after release or snap-to-position.

### 15. Make exits 20% shorter
A dismissing panel or toast should typically leave faster than it enters. Ensure an interrupted exit can reverse and restore its state.

### 16. Overlap old & new states
Briefly crossfade outgoing and incoming content instead of leaving a blank flash. Great for tabs, thumbnail swaps, charts and filtered search states. Maintain correct screen-reader updates and avoid two interactive copies staying focusable.

### 17. Masks for reveals & colour
Use a clip/mask reveal or color wipe to clarify a selected state, before/after image or thematic scene. Avoid full-screen reveals that block reading or perform poorly on mobile hardware.

### 18. Crossfade icons + blur
For icon transitions such as menu ↔ close or play ↔ pause, crossfade and shift subtly. Blur is optional and may cost performance; don't blur small text or essential signals.

### 19. Rubber band past bounds
Directly dragged objects can resist when crossing their bounds, then return. Only for actual dragging and direct manipulation, not scroll hijacking. Never hide essential controls past a rubber-band boundary.

### 20. Reuse the same layoutId
Maintain shared visual identity across views so a clicked project tile can expand into its detail page smoothly. This is a conceptual pattern; use whatever layout-identity technique your stack supports. Provide reduced-motion fallback and keep navigation functional without the effect.

## Practical website motion recipes

### Site navigation
- Hover/focus: subtle color, underline or background transition (120–180ms).
- Dropdown: fade/translate/scale over ~160–220ms, anchored to the menu item.
- Mobile drawer: slide/fade ~200–280ms with appropriate focus trap, Escape handling and backdrop dismissal.
- Active navigation indicator: subtle travel; no bouncing tabs.

### Hero and page load
- First paint should reveal the core headline and primary CTA quickly.
- If animating, use one restrained title/visual entrance; don't stagger ten separate words.
- Never delay critical content for an intro sequence; avoid faux-loading screens.
- Avoid moving text under the pointer during interaction.

### Scrolling
- Motion should reveal content, not make users work to access it.
- Use scroll effects only on meaningful sections or an expressive art-directed story.
- Reduce or disable parallax for small screens and reduced-motion preference.
- Avoid scroll-jacking, forced pinning or hiding normal browser scroll without strong reason.

### Cards, galleries and product browsing
- Hover can clarify clickability with a subtle elevation, crop/zoom or reveal.
- Detail view may expand from thumbnail using shared-element continuity.
- Image dimensions should remain reserved before loading to avoid layout shifts.
- Always support click/tap and keyboard. Don't hide the only title on hover.

### Filters and tabs
- Move selection indicator ~150–220ms.
- Crossfade/swap result content without delaying new content unnecessarily.
- Announce updated result counts when needed; preserve current keyboard focus.
- Skip entrance stagger on frequently refreshed results.

### Forms and checkout
- Label, validation and success states should appear close to the relevant input.
- Use feedback, not decorative shaking. Provide field-level errors in text.
- Pending state continues until server-confirmed success.
- Avoid layout shift when errors appear by reserving or accommodating space.

### Accordions
- Animate expansion only when smooth and inexpensive, usually ~180–250ms.
- Update `aria-expanded`, and ensure hidden content isn't focusable.
- Allow rapid toggling without getting stuck in an intermediate state.

### Confirmation
- Show clear text confirmation and next steps, with at most a tiny success accent.
- No fake confetti, pulse, checkmark or celebratory UI before the action actually succeeds.

## Implementation constraints

1. Prefer animating `opacity` and `transform` for frequent or large effects.
2. Avoid transition of `all`; enumerate properties to prevent unintended motion.
3. Reserve image/video aspect ratios and layout space to minimize CLS.
4. Use `prefers-reduced-motion: reduce` and keep all functionality available.
5. Pause or omit nonessential motion outside viewport; avoid continuous animations on large surfaces.
6. Do not hide essential information in an opacity-0 state that requires JS to reveal it; have a robust no-JS fallback.
7. Check hardware and battery cost for filters, backdrop blur, masks and large composited layers.
8. Provide focus handling for entering/leaving overlays and dialogs.
9. Remove animations that impair comprehension, create motion sickness or slow task completion.
10. Test both pointer and touch; hover is an enhancement, never the only interaction path.

## Motion specification worksheet

For each effect record:

| Item | Example |
|---|---|
| Interaction | Product card → quick-view modal |
| Trigger | Click, Enter or Space |
| Start/end | Thumbnail rect → modal image rect |
| Duration | 260ms entrance, 210ms exit |
| Easing | ease-out in; ease-in-out spatial movement |
| Focus | Trap in modal; restore to source on close |
| Reduced motion | Instant modal or short opacity fade |
| Failure cases | Trigger removed, asset missing, quick close |
| Validation | Keyboard, touch, 320–1440px, 200% zoom |