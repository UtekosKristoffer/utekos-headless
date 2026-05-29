# Principles Reference

Detailed implementation guidance for all 15 simple web design principles.
Load this file when giving in-depth critiques or designing from scratch.

---

## Table of Contents
1. [Content First](#1-content-first)
2. [Wordy](#2-wordy)
3. [Minimal](#3-minimal)
4. [Typographic](#4-typographic)
5. [Modest](#5-modest)
6. [Timeless](#6-timeless)
7. [Materially Honest](#7-materially-honest)
8. [Easy to Implement](#8-easy-to-implement)
9. [Commercially Valuable](#9-commercially-valuable)
10. [Performant](#10-performant)
11. [Accessible](#11-accessible)
12. [Focused](#12-focused)
13. [Clear](#13-clear)
14. [Distraction Free](#14-distraction-free)
15. [Productive](#15-productive)

---

## 1. Content First

**Core metric**: Content-element ratio — meaningful content vs. decorative/structural elements.
A high ratio signals respect for the user. Every non-content element must justify its cost.

**Deep audit questions:**
- Does any visual element compete with the content for the user's attention?
- Is the first thing the user sees content, or decoration?
- Would the page accomplish its goal if all images were removed?

**Practical rules:**
- Strip decorative imagery unless it communicates something the text cannot
- Hero sections: the headline IS the hero — photos are optional
- Sidebars, banners, and widgets all reduce the content-element ratio

**Code pattern — before:**
```html
<section class="hero" style="background: url(stock-photo.jpg); min-height: 80vh;">
  <div class="overlay">
    <h1>We help businesses grow</h1>
  </div>
</section>
```

**Code pattern — after:**
```html
<section class="hero">
  <h1>Accounting software for freelancers who hate spreadsheets</h1>
  <p>Join 12,000 freelancers who closed their books in under 10 minutes.</p>
  <a href="/start" class="btn">Start free — no credit card</a>
</section>
```

---

## 2. Wordy

**Core metric**: Label coverage — percentage of interactive elements with clear text labels.
Target: 100%. Every icon-only action is a potential point of confusion.

**Deep audit questions:**
- Can a user describe what every button does without hovering?
- Are there any tooltips that reveal what an action does? (→ make it the label)
- Is the page's value proposition expressed in plain language?

**Practical rules:**
- Verb + noun for button labels: "Save draft", "Delete account", "Export CSV"
- Navigation labels: use the words users say, not internal team jargon
- Marketing copy: if you removed all images, would the copy alone explain the product?

**Code pattern — before:**
```html
<nav>
  <button aria-label="menu"><svg>...</svg></button>
  <button aria-label="search"><svg>...</svg></button>
  <button aria-label="profile"><svg>...</svg></button>
</nav>
```

**Code pattern — after:**
```html
<nav>
  <a href="/pricing">Pricing</a>
  <a href="/docs">Docs</a>
  <a href="/login">Sign in</a>
  <a href="/start" class="btn-primary">Start free</a>
</nav>
```

---

## 3. Minimal

**Core metric**: Element count per viewport — how many distinct elements compete for attention?
Fewer is almost always better. Each added element raises the cognitive floor for all others.

**The "earn your place" test**: For every element, ask:
1. What does this communicate to the user?
2. What would happen if it were removed?
3. Could this information live somewhere less prominent?

If you can't answer #1 clearly, remove the element.

**Typical removal candidates:**
- Tag clouds, category lists, archive widgets
- Social follower counts (unless impressive and credible)
- "As featured in" logo strips (unless from tier-1 publications)
- Related content widgets before the user finishes the primary content
- Cookie/GDPR banners larger than a single line

**Progressive disclosure pattern:**
Show the minimum needed to make a decision. Reveal detail on demand.
```
Landing page: headline + CTA + 3 key benefits
  → "See how it works" expands to feature details
    → "View pricing" goes to dedicated page
```

---

## 4. Typographic

**Core metric**: Readability score — font size, line height, line length, contrast, and hierarchy.
Typography alone can make or break a design. Get this right before anything else.

**Non-negotiable baseline:**
```css
body {
  font-family: system-ui, -apple-system, sans-serif; /* or 1 web font */
  font-size: 1.125rem;    /* 18px — minimum for comfortable reading */
  line-height: 1.65;      /* breathing room between lines */
  max-width: 68ch;        /* ~65–70 characters per line */
  color: #1a1a1a;         /* not pure black — slightly softer */
}
```

**Hierarchy rules:**
```css
h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; line-height: 1.1; }
h2 { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 600; line-height: 1.2; }
h3 { font-size: 1.25rem; font-weight: 600; }
/* Body: 1.125rem / 1.65 (set on body above) */
/* Caption: 0.875rem / 1.5 */
```

**System font stack** (zero performance cost, renders natively):
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont,
             "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

**Violation checklist:**
- [ ] Body text below 16px → increase to at least 18px
- [ ] Line height below 1.5 → increase to 1.6–1.7
- [ ] Lines longer than 90 characters → constrain with max-width
- [ ] More than 2 typefaces → consolidate to 1–2
- [ ] Hierarchy communicated by color alone → add size/weight difference

---

## 5. Modest

**Core metric**: Motion index — count of CSS animations and JS-driven effects per page.
Target: 0 decorative animations. Motion budget reserved for functional feedback only.

**Functional motion (keep):**
- Loading spinners and progress indicators
- Skeleton screens while content loads
- Accordion expand/collapse
- Modal open/close (subtle, < 200ms)
- Toast/notification slide-in

**Decorative motion (remove):**
- Scroll-triggered entrance animations on content sections
- Parallax backgrounds
- Cursor follower effects
- Continuous looping animations on static content
- "Floating" elements with perpetual keyframe animation

**CSS audit:**
```css
/* Flag these patterns for removal */
@keyframes float { ... }           /* perpetual decoration */
.section { animation: fadeInUp ... } /* scroll-triggered content entrance */
.hero { transform: translateZ(0); } /* parallax setup */
```

---

## 6. Timeless

**Core metric**: Trend dependency — how many design decisions require a specific aesthetic moment to make sense?
Timeless design uses patterns that worked in 2010 and will work in 2030.

**Timeless patterns (safe to use):**
- Single-column content layout
- Left-aligned body text
- Black text on white background
- Underlined links in body copy
- Sticky header with logo + nav links + CTA
- Card grids with consistent padding

**Trend-dependent patterns (use with caution):**
| Pattern | Risk | Alternative |
|---|---|---|
| Bento grid layout | Already dated | Standard card grid |
| Glassmorphism cards | Very trend-specific | Solid background with border |
| Gradient mesh backgrounds | 2021–2023 peak | Flat color or subtle gradient |
| Rounded blob shapes | 2020–2022 | Geometric shapes |
| Loud gradient text | 2022–present | Single solid color |

---

## 7. Materially Honest

**Core metric**: Affordance accuracy — do interactive elements look interactive, and non-interactive elements look static?

**The affordance checklist:**
```
Links in body copy:     colored + underlined (not just colored)
Standalone CTAs:        background color + border-radius (clearly a button)
Icon buttons:           visible border or background, not floating icons
Cards (clickable):      cursor: pointer + hover state
Cards (non-clickable):  no hover state, no pointer cursor
Disabled states:        visually distinct, cursor: not-allowed
```

**Code pattern — honest button:**
```css
.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.25rem;
  background: #1a1a1a;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 150ms;
}
.btn:hover { background: #333; }
.btn:focus-visible { outline: 2px solid #1a1a1a; outline-offset: 2px; }
```

---

## 8. Easy to Implement

**Core metric**: Maintenance complexity — could a solo developer maintain this design in 6 months?

**Complexity red flags in code:**
```css
/* Red flag: absolute positioning for layout */
.card { position: absolute; left: calc(50% - 180px); }

/* Better: flexbox/grid */
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
```

**Design system basics that reduce complexity:**
```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;
  --space-16: 4rem;
  --color-text: #1a1a1a;
  --color-bg: #ffffff;
  --color-accent: #0066cc;
  --radius: 6px;
}
```

---

## 9. Commercially Valuable

**Core metric**: Time-to-CTA — seconds until a visitor can take the primary action without scrolling.
Target: 0 seconds. The CTA should be visible on page load.

**Landing page hierarchy:**
```
1. Headline (who is this for + what do they get)
2. Sub-headline (how, or the key differentiator)
3. Primary CTA (one button, action verb)
4. Social proof (specific: "12,000 freelancers", not "Trusted by thousands")
5. Feature details
6. Secondary CTAs
```

**Headline formula**: [Verb] + [outcome] + [for whom] + [timeframe/differentiator]
- "File your taxes in under 30 minutes — no accountant needed"
- "Turn Figma designs into production React in one click"

---

## 10. Performant

**Core metric**: Core Web Vitals — LCP, CLS, INP.
Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms.

**Performance budget for landing pages:**
| Asset type | Budget |
|---|---|
| Total page weight | < 1MB |
| Hero image | < 200KB (WebP) |
| Web fonts | ≤ 2 families, ≤ 2 weights each |
| Third-party scripts | < 5 total |
| JavaScript (parsed) | < 150KB |

**Quick wins:**
```html
<!-- Preload hero image -->
<link rel="preload" as="image" href="hero.webp">

<!-- Lazy load below-fold images -->
<img src="feature.webp" loading="lazy" alt="...">

<!-- Defer non-critical scripts -->
<script src="analytics.js" defer></script>

<!-- System font fallback (zero load time) -->
<style>
  body { font-family: system-ui, sans-serif; }
</style>
```

---

## 11. Accessible

**Core metric**: WCAG 2.1 AA compliance — the minimum standard for professional web design.

**Contrast requirements:**
```
Normal text (< 18px regular, < 14px bold): 4.5:1 minimum
Large text (≥ 18px regular, ≥ 14px bold): 3:1 minimum
UI components and graphics: 3:1 minimum
```

**Test contrast**: webaim.org/resources/contrastchecker

**Keyboard navigation requirements:**
```css
/* Never remove focus styles — customize them instead */
:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
  border-radius: 2px;
}
```

**Semantic HTML baseline:**
```html
<header role="banner">
  <nav aria-label="Main navigation">...</nav>
</header>
<main>
  <h1>Page title</h1>
  ...
</main>
<footer role="contentinfo">...</footer>
```

---

## 12. Focused

**Core metric**: Primary action clarity — can a user state the page's primary goal within 5 seconds?

**One-page, one-goal mapping:**
| Page | Primary goal | Secondary (subordinate) |
|---|---|---|
| Landing | Sign up / Start trial | Learn more, Watch demo |
| Pricing | Choose a plan | Compare features, Talk to sales |
| Blog post | Read the article | Subscribe, Share |
| Product detail | Add to cart | Save for later, View reviews |

**Progressive disclosure implementation:**
```
Above fold:     headline + primary CTA only
First scroll:   top 3 benefits (not 10)
Second scroll:  social proof
Third scroll:   feature details
Bottom:         secondary CTAs, FAQ, footer
```

---

## 13. Clear

**Core metric**: Time-to-orientation — how long does it take a new visitor to understand: where am I, what can I do, what should I do first?

**Visual hierarchy system:**
```
Size:     H1 (2.5–3.5rem) > H2 (1.75–2.25rem) > H3 (1.25rem) > Body (1.125rem)
Weight:   700 > 600 > 400
Color:    #1a1a1a > #4a4a4a > #8a8a8a (use sparingly)
Space:    Large gaps signal section breaks; small gaps signal related content
```

**Error message pattern:**
```
✗ "An error occurred"
✗ "Invalid input"
✓ "Email already in use — try signing in instead"
✓ "Password must be at least 8 characters including one number"
```

---

## 14. Distraction Free

**Core metric**: Distraction count — number of elements that compete with the primary action per viewport.
Target: 0 competing distractions above the fold.

**Severity ranking (remove in this order):**
1. Autoplay video/audio — immediate and involuntary
2. Pop-ups on page load — interrupts before engagement
3. Sticky top banners (cookie, announcements) — persistent real estate cost
4. Live chat bubbles — persistent visual competitor
5. Social share widgets mid-content — pulls out of flow
6. "Related content" before primary content ends

**Timed pop-up best practice:**
```javascript
// Don't show until 60 seconds or 80% scroll depth
let scrolled = false;
window.addEventListener('scroll', () => {
  if ((window.scrollY / document.body.scrollHeight) > 0.8 && !scrolled) {
    scrolled = true;
    setTimeout(showPopup, 2000);
  }
});
```

---

## 15. Productive

**Core metric**: Task completion steps — total clicks + page loads + form fields to complete the primary task.
Benchmark against competitors. Every step you remove is a conversion advantage.

**Form optimization:**
```
Ask only for what's required at this stage:
  Sign up:     email + password (2 fields)
  Checkout:    shipping → payment → confirm (staged)
  Contact:     name + email + message (3 fields)

Smart defaults:
  Country: auto-detect from IP
  Currency: based on locale
  Date: today or most common selection
```

**Step reduction patterns:**
- Social login (Google/GitHub) — removes password creation friction
- "Try before you sign up" — delays registration until value is demonstrated
- Inline editing — removes "click → navigate → edit → save → navigate back"
- Persistent filters — remember user's last selections
