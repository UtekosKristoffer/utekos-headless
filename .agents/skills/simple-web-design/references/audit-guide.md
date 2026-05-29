# Web Design Audit Guide

A structured workflow for running a design audit using the Simple Web Design framework.

---

## Audit Types

### 1. Quick Sanity Check (5 min)
Run through the 13-point Quick Audit Checklist in `SKILL.md`. Good for: PR reviews,
pre-launch checks, answering "does this look okay?" questions.

### 2. Principle Audit (20–30 min)
Score each of the 15 principles 1–3. Identify the 3 lowest-scoring principles. Write
one specific, actionable fix per principle. Good for: client deliverables, design reviews,
redesign briefs.

### 3. Full UX Audit (60+ min)
Principle audit + user flow analysis + performance metrics + accessibility scan.
Good for: comprehensive redesigns, agency work, product health checks.

---

## Audit Workflow

### Step 1: Understand Intent
Before evaluating design, ask:
- What is the primary goal of this page/site? (Conversion, information, tool usage?)
- Who is the target user?
- What does "success" look like for a visitor?

All design decisions are evaluated against this context.

### Step 2: Content Audit
- List all elements on the page (headline, subhead, images, CTAs, nav, footer, widgets...)
- Mark each as: **Core content** / **Supporting content** / **Structural** / **Decorative**
- Flag anything "Decorative" that has no functional role

### Step 3: Score Each Principle (1–3)
Use this rubric:

| Score | Meaning |
|-------|---------|
| 3 | Well executed — the principle actively helps users |
| 2 | Neutral — principle is not violated but not leveraged |
| 1 | Violated — the principle is working against the user |

Calculate total: **___ / 45**

### Step 4: Identify Top 3 Issues
Rank issues by impact:
1. **Conversion impact** — are issues blocking the primary goal?
2. **Frequency** — how often does a user hit this friction?
3. **Severity** — does it confuse, or just mildly annoy?

### Step 5: Write Actionable Recommendations
For each issue, provide:
- **What**: The specific problem (with example — screenshot reference, line of code, etc.)
- **Why**: Which principle it violates and how it harms the user
- **Fix**: A concrete, implementable solution

**Bad recommendation**: "Simplify the navigation"  
**Good recommendation**: "Remove 'Resources', 'Blog', and 'Changelog' from the primary nav —
these are low-traffic pages. Move them to the footer. This reduces nav cognitive load and
makes 'Pricing' and 'Sign up' more prominent."

---

## Common Patterns by Site Type

### Landing Page
Most common violations: #9 (Commercially Valuable), #12 (Focused), #14 (Distraction Free)
- Check: Is the headline a clear value proposition?
- Check: Is there more than one primary CTA above the fold?
- Check: Are there pop-ups, cookie banners, or chat widgets competing with the CTA?

### SaaS Product / Dashboard
Most common violations: #3 (Minimal), #13 (Clear), #15 (Productive)
- Check: Does the empty state guide the new user clearly?
- Check: Are there more than 3 primary actions visible at once?
- Check: Is the most common user task reachable in 2 clicks?

### Blog / Content Site
Most common violations: #1 (Content First), #10 (Performant), #14 (Distraction Free)
- Check: Is the reading experience interrupted by ads, related content, or social widgets?
- Check: Does the page load quickly with no layout shift?
- Check: Is body text ≥ 16px with adequate line spacing?

### E-commerce
Most common violations: #9 (Commercially Valuable), #15 (Productive), #7 (Materially Honest)
- Check: Is the "Add to cart" button the most prominent element on the product page?
- Check: How many steps from product discovery to checkout complete?
- Check: Are interactive elements (add to cart, filters) clearly distinguishable from non-interactive?

### Portfolio
Most common violations: #5 (Modest), #4 (Typographic), #12 (Focused)
- Check: Does the design compete with the work being shown?
- Check: Is there a clear hierarchy guiding visitors to the most important projects?
- Check: Is there one clear action the visitor should take (hire me, view project, contact)?

---

## Presenting Findings

### For Internal Teams
Lead with the score and top 3 issues. Use specific before/after language.
Frame around user impact, not aesthetic preference.

> "Users can't find the pricing page — it's buried as item #6 in the nav.
> This is likely costing us demos. I'd suggest moving it to position #2, right after 'Features'."

### For Clients / Stakeholders
Lead with business impact. Connect design issues to user behavior and business outcomes.
Avoid design jargon — speak in outcomes.

> "On the homepage, there are currently four different things we're asking visitors to do
> simultaneously. This creates decision paralysis. Industry data shows single-CTA pages
> convert at 2–3× the rate of multi-CTA pages. Here's what a focused version could look like."

### For Developers
Provide specific, code-level recommendations where possible.
Reference principle name and number for shared vocabulary.

> "**Principle #11 (Accessible)**: The form submit button has no `aria-label`, and the
> input fields use placeholder text instead of labels. Screen readers won't be able to
> describe this form. Fix: add `<label>` elements and `aria-label` on the button."

---

## Tools to Support Audits

- **Contrast checking**: webaim.org/resources/contrastchecker
- **Performance**: PageSpeed Insights (pagespeed.web.dev)
- **Accessibility scan**: axe DevTools browser extension
- **Font loading**: FontFace Observer or browser DevTools → Network → Fonts
- **Layout shift**: Lighthouse CLS audit in Chrome DevTools
