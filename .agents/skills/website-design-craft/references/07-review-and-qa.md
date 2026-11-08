# Reference 07 — Design review and QA checklist

Use this before declaring a website ready. Give specific evidence and fixes rather than vague judgments.

## Review severity

- **Critical:** core task broken, fabricated success, severe accessibility block, dangerous misinformation, security/privacy exposure.
- **High:** primary CTA unclear, booking/contact form broken, essential content missing, mobile navigation unusable, major contrast failure.
- **Medium:** weak hierarchy, excessive repeated cards, distracting motion, overly long copy, poor tablet layout, incomplete state.
- **Low:** inconsistent radius, minor spacing/type polish, small optional transition.

## Design audit

- [ ] Main purpose and audience are clear within the first meaningful viewport.
- [ ] One dominant page idea; visual structure isn't a generic AI template.
- [ ] Primary CTA is unmistakable and truthful.
- [ ] Header, navigation, page section order and footer are coherent.
- [ ] Content hierarchy can be read without decorative badges/cards/dividers.
- [ ] Typography is brand-appropriate and readable.
- [ ] Hero is informed by genuine content and purposeful media.
- [ ] Section composition varies to match content rather than repeating an identical card format.
- [ ] All 20 anti-slop indicators checked with exceptions justified.
- [ ] Original brand identity is preserved or deliberately evolved.
- [ ] No invented testimonials, logos, case studies, ratings or data.

## Motion audit

- [ ] Motion serves a defined purpose: orientation, feedback, hierarchy or continuity.
- [ ] No unnecessary looping, long entrances or distracting bounce.
- [ ] Menus, dialogs, tabs, accordions and overlays respond promptly.
- [ ] Exit behavior, interruption and reversal work.
- [ ] Focus management works through animated interactions.
- [ ] Reduced-motion experience works without missing content.
- [ ] Large blur/mask/parallax effects are measured and justified.
- [ ] No content waits unnecessarily for animation to become available.

## Responsive audit

- [ ] At 320/360/768/1024/1440 widths, no unintended horizontal overflow.
- [ ] Content, media and primary CTA reflow purposefully rather than shrinking.
- [ ] Hero headline is readable and not clipped at narrow widths.
- [ ] Image cropping respects subject and text overlays.
- [ ] Navigation works with touch and desktop pointer.
- [ ] Buttons and links have adequate target sizes and spacing.
- [ ] Forms and fixed elements work with virtual keyboard and browser zoom.
- [ ] Long words, translated strings, addresses, currencies and data values fit.

## Accessibility audit

- [ ] Semantic landmarks and heading structure are correct.
- [ ] Focus visibly follows predictable tab order.
- [ ] All buttons, links, menus, accordions, dialogs and controls work with keyboard.
- [ ] Inputs have visible and programmatic labels, instructions and error messages.
- [ ] Contrast is checked, including selected/disabled/error states.
- [ ] Meaningful imagery has alt text and media has appropriate captions/transcripts.
- [ ] State updates are announced when needed; no motion/color-only message.
- [ ] 200% zoom and reduced motion preserve functionality.
- [ ] Hover-only information is available on touch and keyboard.

## Reliability and content audit

- [ ] Every visible action goes somewhere or explains why unavailable.
- [ ] Form success appears only after actual confirmed submission.
- [ ] Empty/loading/error/success/retry states exist.
- [ ] Slow network doesn't cause data loss or duplicate transactions.
- [ ] Images, video and fonts have sensible fallbacks.
- [ ] Prices, hours, names, addresses, dates and claims are accurate or explicitly example content.
- [ ] Privacy/consent behavior is appropriate to product context.
- [ ] Navigation and back/forward history behave as expected.

## Performance and discoverability audit

- [ ] Media is sized and compressed appropriately; below-fold media lazy loads where useful.
- [ ] Key visual content displays promptly.
- [ ] CLS is controlled by reserved space and stable UI states.
- [ ] Excessive JS, layout thrashing and animation work are avoided.
- [ ] Page titles, headings, metadata, link structure and semantic content are clear.
- [ ] No fabricated structured data, review stars or misleading SEO copy.
- [ ] Errors are logged or traceable without exposing user secrets.

## Verification and evidence

Report:

```text
Page/route:
Viewport(s):
Observed issue:
Severity:
Evidence (screenshot/interaction/DOM behavior):
Why it matters:
Proposed fix:
Implemented? [yes/no]
Retested? [yes/no]
Remaining limitation:
```

If only a static screenshot was inspected, do not claim the interaction is verified. If only code was read, do not claim visual polish was tested. Prefer screen capture and actual browser interactions where tools permit.

## Completion gate

A website is ready to hand off when real user goals are supported; all primary interactions work; semantics/keyboard/responsiveness are validated; content and imagery are truthful; the design doesn't rely on generic decoration; and performance, motion and failure cases have been reviewed.