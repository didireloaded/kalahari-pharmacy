# Website Design Craft

A reusable, **brand-agnostic website design skill** built from two user-provided videos:

- Video 1: **20 AI Design Slop Indicators**
- Video 2: **20 Ways to Make Beautiful AI Animations**

This package is for general websites, not a specific app or client. It includes full visual principles, desktop/mobile responsiveness, 20 anti-patterns with corrections, 20 motion patterns, design tokens, page recipes, copy and asset guidance, accessibility, performance, testing and example prompts.

## Codex installation

Copy this directory into the project at:

```text
.agents/skills/website-design-craft/
  SKILL.md
  references/
  examples/
```

You can alternatively place it in the directory your agent supports for skills. Do not assume all IDEs have identical skill discovery rules.

Add an instruction to your project's `AGENTS.md` (or equivalent), for example:

```md
For website and web UI design, read and apply `.agents/skills/website-design-craft/SKILL.md` and its referenced material. Preserve our real brand and product requirements. Don't build code if the request is only for planning. Follow the anti-slop, motion, accessibility and verification guidance.
```

## Use it

Prompt your IDE agent:

> Read `website-design-craft/SKILL.md`. Audit this website using the 20 anti-slop indicators, then propose a responsive design direction and a purposeful motion plan. Do not modify files yet.

Or:

> Read `website-design-craft/SKILL.md`. Implement the approved website design using the existing stack, including all responsive and accessibility states. Inspect mobile and desktop layouts before calling it complete.

See `examples/PROMPTS.md` for more prompts.

## What's included

- Main `SKILL.md` with priorities and operating rules
- Eleven in-depth references, including all 20+20 source tips
- Three workflow templates and copy-ready prompts
- An optional media-inclusive edition containing the two user-supplied source videos

**Important:** The original videos are inspirational heuristics. They do not constitute standards or universal bans. WCAG and browser behavior should take priority where there is a conflict.

The lightweight package omits the videos. The full package includes them in `source-videos/` to make them available for manual review; the text instructions work without them.