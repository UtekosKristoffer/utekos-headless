[![Oathe Security](https://img.shields.io/endpoint?url=https%3A%2F%2Faudit-engine.oathe.ai%2Fapi%2Fbadge%2Fnomideusz%2Fsimple-web-design&style=for-the-badge&logo=data:image/svg%2Bxml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nd2hpdGUnPjxwYXRoIGQ9J00xMiAyQzkuMjQgMiA3IDQuMjQgNyA3djNINmMtMS4xIDAtMiAuOS0yIDJ2OGMwIDEuMS45IDIgMiAyaDEyYzEuMSAwIDItLjkgMi0ydi04YzAtMS4xLS45LTItMi0yaC0xVjdjMC0yLjc2LTIuMjQtNS01LTV6bTMgMTBIOVY3YzAtMS42NiAxLjM0LTMgMy0zczMgMS4zNCAzIDN2M3onLz48L3N2Zz4=&labelColor=000000&cacheSeconds=3600)](https://oathe.ai/report/nomideusz/simple-web-design)

# simple-web-design

> An agent skill for auditing, critiquing, and building better websites — grounded in Anthony Hobday's 15 principles of simple web design.

## Install

**skills.sh (Claude Code, Cursor, Windsurf, Copilot, Codex...)**
```bash
npx skills add nomideusz/simple-web-design
```

**Context7**
```bash
npx ctx7 skills install nomideusz/simple-web-design
```

---

## What it does

This skill teaches your AI agent to apply **15 battle-tested web design principles** whenever you ask for:

- Design feedback on a website, landing page, or app
- A UX or UI audit (with optional 1–45 score)
- Help designing a web page or component from scratch
- A code review of HTML/CSS/JS for design quality violations

The skill is grounded in Anthony Hobday's book [*Simple Web Design*](https://anthonyhobday.com/books/simpledesign/) — a practical, opinionated framework that prioritizes **content, clarity, and longevity** over visual complexity and trend-chasing.

---

## Example prompts

Once installed, use any of these with your agent:

**Audit a live site**
```
Review https://example.com and score it against the 15 simple design principles.
Give me the top 3 violations with specific fixes.
```

**Score a page**
```
Score my landing page at <YOUR_URL> on all 15 principles from 1–3.
Give me a total out of 45 and prioritize the worst issues.
```

**Audit a screenshot or Figma file**
```
Here's a screenshot of my homepage. Audit it for visual clutter
and tell me what's competing with the main CTA.
```

**Code review**
```
Review this HTML/CSS and flag anything that violates simple web design principles:
[paste your code]
```

**Build from scratch**
```
Help me design a simple SaaS pricing page.
Start with the content structure, then suggest the layout.
```

**Single principle check**
```
Is my navigation too cluttered? Apply the Minimal and Focused
principles and tell me what to cut.
```

**Nuanced / override**
```
My brand requires a trend-forward visual style — I can't change that.
Apply the other 14 simple design principles to improve everything else.
```

---

## The 15 Principles

| # | Principle | Core question |
|---|-----------|---------------|
| 1 | **Content First** | Does anything compete with the content for attention? |
| 2 | **Wordy** | Are there unlabeled icons or ambiguous interactions? |
| 3 | **Minimal** | Does every element earn its place? |
| 4 | **Typographic** | Is type doing the heavy lifting, with clear hierarchy? |
| 5 | **Modest** | Does the design show off, or does it serve the user? |
| 6 | **Timeless** | Will this feel dated in 2 years? |
| 7 | **Materially Honest** | Do clickable things look clickable? |
| 8 | **Easy to Implement** | Is this simple enough for a small team to maintain? |
| 9 | **Commercially Valuable** | Can users immediately understand the value and act? |
| 10 | **Performant** | Does every asset, script, and font earn its weight? |
| 11 | **Accessible** | Can anyone use this, regardless of ability or device? |
| 12 | **Focused** | Does each page have one clear purpose? |
| 13 | **Clear** | Does visual hierarchy guide the eye to what matters most? |
| 14 | **Distraction Free** | Is anything pulling attention from the user's goal? |
| 15 | **Productive** | How many steps does it take to do what the user came to do? |

---

## What's inside

```
simple-web-design/
├── SKILL.md                    # Core skill: principles, example prompts, checklist
└── references/
    ├── principles.md           # Deep breakdown of all 15 principles with code examples
    └── audit-guide.md          # Structured audit workflow, by site type, for teams/clients
```

The skill uses **progressive disclosure** — the agent loads reference files only when needed, keeping context lean for quick checks and comprehensive for full audits.

---

## Based on

Anthony Hobday — [Simple Web Design](https://anthonyhobday.com/books/simpledesign/)

---

## License

MIT
