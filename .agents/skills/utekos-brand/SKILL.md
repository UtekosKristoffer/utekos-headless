---
name: utekos-brand
description:
  Enforce Utekos brand standards (color, typography, motion, voice, layout)
  across all code and UI generation in this workspace. Use whenever writing or
  editing `.tsx`, `.css`, marketing copy, JSON-LD, badges, buttons, pills,
  hero/landing sections, or anything affecting the rendered look-and-feel of
  utekos.no. Combines AGENTS.md brand rules with evidence-based marketing
  science (Ehrenberg-Bass, Binet & Field, Kahneman, Cialdini) and web
  performance science (Core Web Vitals, RAIL, WCAG 2.2 AA).
applyTo: 'src/**/*.{tsx,ts,css,mdx,md}'
---

# Utekos Brand & Performance Guard

> **Mandate:** Every UI surface, copy line and rendered pixel must reinforce
> Utekos' distinctive brand assets (DBA), respect WCAG 2.2 AA, hit Core Web
> Vitals "Good", and convert. No exceptions, no improvisation.

You MUST read [/AGENTS.md](../../../AGENTS.md) as the canonical source for
colors, typography, motion and voice. This skill explains **why** those rules
exist, **how** to apply them in code, and **when** to delegate to companion
skills.

---

## 1. Why these rules exist (the science)

Apply these mental models before you write code. They are not opinions; they are
the empirical foundation of modern brand & performance work.

### 1.1 Brand growth law (Ehrenberg-Bass / Byron Sharp)

- Brands grow through **mental availability** (being thought of) and **physical
  availability** (being easy to find/buy). Source: Sharp, _How Brands Grow_
  (2010), Ehrenberg-Bass Institute.
- **Distinctive Brand Assets (DBAs)** — colors, typography, wordmark, recurring
  shapes — are how System‑1 memory recognises the brand without cognitive effort
  (Romaniuk, _Building Distinctive Brand Assets_, 2018).
- **Consequence for code:** Never substitute the palette, font, wordmark or
  badge shape "just this once". Every off-brand pixel weakens recall. The
  `BrandBadge` and `UtekosWordmark` components are the DBAs — use them.

### 1.2 60/40 rule (Binet & Field, IPA)

- Long-term growth requires ≈ 60 % brand-building (emotional, broad-reach) and ≈
  40 % activation (rational, conversion-oriented). Source: Binet & Field, _The
  Long and the Short of It_ (IPA, 2013).
- **Consequence:** Hero sections, magasinet/inspirasjon and storytelling pages
  prioritise emotional/atmospheric design (Cloud Dancer on Maritime Blue,
  generous spacing, image-led). PDP, cart and checkout prioritise clarity and a
  single dominant CTA (`--primary-button`).

### 1.3 Dual-process cognition (Kahneman)

- System 1 is fast, visual, pattern-based; System 2 is slow and analytical
  (Kahneman, _Thinking, Fast and Slow_, 2011).
- Consistent color, typography and motion let System 1 recognise Utekos in < 400
  ms. Visual noise (mixed casing, extra borders, decorative gradients) forces
  System 2 and lowers conversion.
- **Consequence:** Restraint beats decoration. Default to one accent per
  viewport.

### 1.4 Persuasion principles (Cialdini)

- Social proof, authority, scarcity, reciprocity, commitment, liking, unity
  (Cialdini, _Influence_, rev. 2021).
- **Consequence for copy/UI:** Show review counts and "anbefalt"-pills (social
  proof), expose return/garanti badges (authority + reciprocity), avoid
  manufactured urgency that breaks trust.

### 1.5 Web performance ↔ revenue

- Google/SOASTA: a 0.1 s improvement in mobile site speed raised retail
  conversions by **+8.4 %** and AOV by **+9.1 %** ("Milliseconds make millions",
  Deloitte/Google 2020).
- Akamai: every additional 100 ms of latency reduced conversion by **~7 %**
  (Akamai Online Retail Performance Report, 2017).
- Core Web Vitals (Google, 2020 → ongoing) thresholds at the 75th percentile:
  - **LCP ≤ 2.5 s** · **INP ≤ 200 ms** · **CLS ≤ 0.1**.
- RAIL model: response < 100 ms, animation budget 16 ms/frame, idle work in ≤ 50
  ms chunks, load interactive < 5 s on mid-tier mobile (web.dev/rail).
- Doherty Threshold: feedback under 400 ms keeps users in flow (IBM, 1982).
- **Consequence:** Performance is a brand asset. A slow Utekos is an off-brand
  Utekos.

### 1.6 Accessibility = reach (WCAG 2.2 AA)

- ~16 % of the global population has a disability (WHO, _World Report on
  Disability_). Norwegian _Likestillings- og diskrimineringsloven_ + EU EAA
  require WCAG 2.2 AA for commerce.
- Contrast: **4.5:1** for normal text, **3:1** for large text and non-text UI
  (WCAG 2.2 §1.4.3, §1.4.11).
- **Consequence:** Always validate text/background pairs from the AGENTS.md
  palette against AA before shipping. Use the `mcp_wcag_*` tools when in doubt.

---

## 2. Hard rules (non-negotiable)

These are derived directly from AGENTS.md and the science above. Violating any
of them is a defect.

### 2.1 Color

1. Use **only** OKLCH tokens defined in AGENTS.md / `src/globals.css`. Never
   inline hex/rgb literals, never `bg-blue-600` style ad-hoc Tailwind palette
   utilities for brand surfaces.
2. Background distribution per page (approx., adjust for harmony):
   `maritime-blue` 40 % · `maritime-darkest` 30 % · `overcast` 20 % ·
   `demitasse`/`mountain-view` 5–10 %.
3. CTA "Add to cart" / primary commerce action MUST use `--primary-button`. No
   other element competes with it in the same viewport (DBA reinforcement +
   Hick's Law).
4. Text color is chosen for contrast first, harmony second. Verify 4.5:1
   (normal) / 3:1 (large) before commit.
5. Pills: text is always `maritime-darkest`. See
   [public/pill.png](../../../public/pill.png) for layout reference.

### 2.2 Typography

1. **Google Sans** is the **Heading** Font Family.

2. Headlines: Google Sans **Bold**, **sentence case** — never UPPERCASE on
   badges/pills/headlines.

Leading 80–95 %, tracking 0 to −1 %. 3. Body:

**Utekos Text Medium/Regular:**

-Leading: 140–150 %

-Tracking: 0 to −3 %

...But `tracking-tighter` is usually the sweet spot for Utekos Text body-sizes.
Comvine it with font-base.

4. Heading hierarchy must be semantic (`h1` → `h2` → `h3` …). No skipping for
   visual reasons — use Tailwind size utilities instead. 5. When the word
   "Utekos" appears in headlines or titles, render it through
   [`src/components/BrandComponents/utils/UtekosWordmark.tsx`](../../../src/components/BrandComponents/utils/UtekosWordmark.tsx).
   This is a DBA — do not retype it as plain text.

**Sizing:** inline inside running text, render at `1.05em` of the surrounding
text size with a baseline-aligned vertical offset (the SVG renders inside its
viewBox top- to-bottom, so a small `translateY` is usually needed to sit on the
text baseline rather than its cap-line). Standalone (hero/lockup) use sets an
explicit `height` or `width` via Tailwind utilities; never use intrinsic SVG
size.

### 2.3 Components & DBA

1. Buttons and badges: use
   [`src/components/BrandComponents/utils/BrandBadge.tsx`](../../../src/components/BrandComponents/utils/BrandBadge.tsx).
   Do not hand-roll button styles.
2. `className` is for **layout** (`flex`, `grid`, `gap-*`, `m-*`, `p-*`,
   `size-*`). It is NOT for restyling brand color, border, radius or typography.
   If a designsystem variant is missing, extend the component — do not override
   at the call site.
3. Use shorthand `size-x` instead of `h-x w-x` when h equals w (Tailwind v4
   idiom). Same for `inset-*`, `px-*`/`py-*`.

### 2.4 Voice & copy

Follow AGENTS.md "Customer centric writing" rigorously:

- Active voice, short words, positive framing, value first.
- No corporate jargon, no manufactured urgency.
- Norwegian (bokmål) on customer-facing surfaces unless explicitly otherwise.
  Sentence case in headlines.
- For longer copy work, delegate to the [`copywriting`](../copywriting/SKILL.md)
  and [`brand-voice`](../brand-voice/SKILL.md) skills.

### 2.5 Motion

Three principles: **Simple · Purposeful · Playful** (AGENTS.md). Concretely:

1. Respect `prefers-reduced-motion`. Wrap GSAP/Motion animations in a guard or
   use `gsap.matchMedia`.
2. Keep animation budget under 16 ms/frame; animate only `transform` and
   `opacity` (compositor-only properties — see
   [`gsap-performance`](../gsap-performance/SKILL.md)).
3. Entry/scroll animations use GSAP + ScrollTrigger or `motion/react`. For
   implementation patterns delegate to
   [`gsap-framer-scroll-animation`](../gsap-framer-scroll-animation/SKILL.md).
4. No bouncy/cartoony easing on commerce-critical surfaces. Reserve playful
   motion for storytelling pages.

### 2.6 Performance (Next.js 15 / React 19 / Cache Components)

`next.config.ts` has `cacheComponents: true`. This has major consequences (see
AGENTS.md).

**Definitions (resolve borderline cases with these — not intuition):**

- **Interactivity** = code that _cannot run on the server_. Concretely: DOM
  event handlers (`onClick`, `onChange`, `onSubmit` on a controlled input),
  browser-only APIs (`window`, `document`, `localStorage`,
  `IntersectionObserver`, `matchMedia`), React hooks that depend on user
  behaviour or browser state (`useState` driven by input, `useEffect` for
  browser side-effects, `useRef` on DOM nodes, `useLayoutEffect`,
  `useSyncExternalStore` over a browser store), and third-party libs that touch
  any of the above (GSAP, Motion, Embla, Tiptap, Zustand client store).
- **Request-time content** = anything resolvable on the server from `cookies()`,
  `headers()`, route params, `searchParams`, cached `fetch` (Shopify
  Storefront), DB, file system or static config — _without_ depending on
  post-render user behaviour. If the value is knowable when the response is
  generated, it is request-time content.

**Composition rule:** Default to RSC. Push `'use client'` to the _smallest
interactive leaf_. Pass server-resolved data into client islands as **props** or
as **`children`** — never refetch it on the client. A form, modal or gallery is
_not_ automatically a client component; only the interactive leaf inside it is.

**Borderline cases:**

| Surface                                          | Verdict                                                                                                                                                                                    |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Form with default values from Shopify/DB         | RSC renders the form shell + defaults. Submit via Server Action + `useActionState`. Mark a leaf client only if a field needs live JS validation beyond `required`/`pattern`.               |
| Search input with suggestions                    | Client island for the input (typing state + debounce). Suggestions/results come from a Server Action or RSC re-render keyed by `searchParams`. Never fetch the catalogue from the browser. |
| Filter / sort UI                                 | Encode state in `searchParams` and let RSC re-render. Use a client island only if filtering an already-loaded in-memory list with no server round-trip.                                    |
| Modal / drawer / accordion                       | Client wrapper owns open/close state; its `children` is server-rendered content. Do not move the content itself to the client.                                                             |
| Product gallery / carousel                       | RSC for images and metadata. Client island wraps only the swipe/zoom/lightbox layer.                                                                                                       |
| Cart drawer                                      | Client (Zustand + cart actions), but line-item rendering accepts server-resolved product data via props.                                                                                   |
| Auth / personalised greeting                     | RSC reads `cookies()` / session and renders directly. Never fetch the user on the client for first paint.                                                                                  |
| Cookie banner, analytics gtag, A/B flicker guard | Client (depends on `document` / consent state). Keep tiny and lazy.                                                                                                                        |

**Hard rules:**

1. Server Components are the default. Add `'use client'` only when the file
   contains _interactivity_ per the definition above.
2. Use `'use cache'`, `cacheLife()`, `cacheTag()` per
   [`cache-components`](../cache-components/SKILL.md) and
   [`next-cache-components`](../next-cache-components/SKILL.md).
3. Trust React Compiler — do not add `useMemo` / `useCallback` manually.
4. Images: always `next/image` with explicit `width`/`height` (prevents CLS),
   `priority` only on the LCP element, `sizes` set realistically.
5. Fonts: load Google Sans via `next/font` with `display: 'swap'`. One subset,
   one weight per usage where possible.
6. Never fetch _request-time content_ from the client. Fetch in RSC and stream
   with Suspense; mutate via Server Actions and revalidate with
   `revalidateTag()`.
7. Validate inputs with Zod returning `Either` — never throw inside validators
   (see AGENTS.md §5).

### 2.7 SEO / GEO

1. Every route that renders meaningful content must export `generateMetadata`.
2. Structured data lives in route-level `JsonLd` components, not in `layout.tsx`
   (see `/memories/repo/next-route-jsonld-layout.md`).
3. `og:image` and Twitter card present for shareable pages.
4. For deep audits delegate to [`seo`](../seo/SKILL.md),
   [`seo-geo`](../seo-geo/SKILL.md) or [`roier-seo`](../roier-seo/SKILL.md).

---

## 3. Decision checklist (run BEFORE writing code)

Walk this list in order. If you cannot answer "yes" honestly, stop and ask the
user (per `copilot-instructions.md` §"DE VIKTIGSTE PRINSIPPENE").

1. Have I read the relevant section of `AGENTS.md`?
2. Is this a Server Component by default, with `'use client'` only where
   interactivity is required?
3. Are all colors from the OKLCH token set? Do text/background pairs pass WCAG
   AA?
4. Does the largest CTA in the viewport use `--primary-button`, and is it the
   _only_ primary action?
5. Are headlines sentence case, in Google Sans Bold, semantically correct?
6. Does the word "Utekos" use `UtekosWordmark` where it appears as a brand
   mention?
7. Are images served via `next/image` with explicit dimensions and correct
   `priority`/`sizes`?
8. Will this change keep LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 on mid-tier
   mobile?
9. Does motion respect `prefers-reduced-motion` and animate only compositor
   properties?
10. Is copy active-voice, value-first, positive, and free of jargon?

---

## 4. Anti-patterns (refuse on sight)

**Conflict handling — when the user requests an anti-pattern:** Do not silently
comply, and do not refuse outright. In one sentence, name the rule it violates
(token, casing, font, motion, perf budget…), propose the closest on-brand
alternative, and proceed with the alternative. Only revert to the user's
original request if they explicitly insist after seeing the conflict.

> Example — user says _"make this CTA red and uppercase"_: _"`bg-red-*` and
> UPPERCASE break §2.1/§2.2 (OKLCH tokens, sentence case). Using
> `--primary-button` with sentence-case label instead — say the word if you want
> the literal red/uppercase version."_

| Anti-pattern                                                        | Why it's wrong                                            | Correct move                        |
| ------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------- |
| `className="bg-blue-600 text-white rounded-lg ..."` on a CTA        | Bypasses DBA + design system                              | Use `<BrandBadge>` / brand `Button` |
| UPPERCASE on badges, pills, headlines                               | Violates AGENTS.md and reduces readability (NN/g studies) | Sentence case                       |
| Hand-typing "UTEKOS" or "Utekos" as a brand mention in headers      | Wastes a DBA opportunity                                  | `<UtekosWordmark />`                |
| `useMemo` / `useCallback` around plain values                       | React Compiler handles this; adds noise                   | Remove                              |
| `useEffect` for derived state or data fetching in RSC-eligible code | Stale UI + bundle bloat                                   | Derive in render or fetch in RSC    |
| `<img>` instead of `next/image`                                     | Hurts LCP & CLS                                           | `next/image` with dims + `sizes`    |
| Inline hex/rgb colors                                               | Token drift, fails dark/light alignment                   | OKLCH token from `globals.css`      |
| `h-7 w-7`                                                           | Outdated                                                  | `size-7`                            |
| Animating `top`/`left`/`width`/`height`                             | Triggers layout, drops frames                             | `transform` (`x`, `y`, `scale`)     |
| Negative copy ("Ikke gå glipp av…", "Du må…")                       | Lowers trust, fights Cialdini-liking                      | Positive value-first framing        |

---

## 5. When to delegate to companion skills

**Precedence:** When a companion skill conflicts with this one, `utekos-brand`
wins. Companion skills supply _patterns_ (how to implement); this skill supplies
_constraints_ (what is allowed). AGENTS.md outranks both. If a companion skill
suggests a token, font, motion curve, copy tone or DOM structure that
contradicts §2 here, ignore the suggestion and follow §2.

**Delegation threshold — do NOT read companion skills for small edits.**

- **≤ 20 changed lines _or_ a single-token / one-line edit:** apply §2 rules
  directly. No companion SKILL.md read.
- **> 20 changed lines in one domain, _or_ introducing a new pattern (new
  ScrollTrigger setup, new cached data source, new schema graph, new component
  family):** read the one most relevant companion SKILL.md before writing code.
  Read a second only if the task genuinely spans two domains.
- **Never read more than two companion SKILL.md files for a single task.** If
  you think you need three, the task is too large — stop and split it.
- **Exception:** Context7 lookup for a library API is always allowed and does
  not count against the threshold.

Read the relevant SKILL.md (subject to the threshold above) when the task
crosses these domains:

- **Tailwind v4 / utility patterns:**
  [`tailwindcss-skill`](../tailwindcss-skill/SKILL.md),
  [`tailwind-best-practices`](../tailwind-best-practices/SKILL.md)
- **CSS architecture:** [`css-skill`](../css-skill/SKILL.md)
- **React 19 patterns:** [`react-19`](../react-19/SKILL.md),
  [`react-useeffect`](../react-useeffect/SKILL.md),
  [`react-ui-patterns`](../react-ui-patterns/SKILL.md)
- **Next.js / caching:** [`nextjs`](../nextjs/SKILL.md),
  [`next-best-practices`](../next-best-practices/SKILL.md),
  [`next-cache-components`](../next-cache-components/SKILL.md),
  [`cache-components`](../cache-components/SKILL.md)
- **Performance:** [`core-web-vitals`](../core-web-vitals/SKILL.md),
  [`performance`](../performance/SKILL.md),
  [`vercel-react-best-practices`](../vercel-react-best-practices/SKILL.md)
- **Animation:**
  [`gsap-framer-scroll-animation`](../gsap-framer-scroll-animation/SKILL.md),
  [`gsap-performance`](../gsap-performance/SKILL.md)
- **Copy / voice:** [`copywriting`](../copywriting/SKILL.md),
  [`brand-voice`](../brand-voice/SKILL.md)
- **Persuasion & decision psychology:**
  [`marketing-psychology`](../marketing-psychology/SKILL.md) (Cialdini,
  Kahneman, Ehrenberg-Bass, Binet & Field applied to Utekos surfaces)
- **SEO & GEO:** [`seo`](../seo/SKILL.md), [`seo-geo`](../seo-geo/SKILL.md),
  [`seo-audit`](../seo-audit/SKILL.md), [`roier-seo`](../roier-seo/SKILL.md)
- **Conversion / CRO:** [`cro`](../cro/SKILL.md)
- **Accessibility verification:** the `mcp_wcag_*` tools (success criteria,
  techniques, contrast)
- **Live docs lookup:** Context7 MCP (`mcp_context7_resolve-library-id` →
  `mcp_context7_get-library-docs`) for any framework/library API. Per
  `/Users/kristofferohnstadhjelmeland/.claude/rules/context7.md`, prefer
  Context7 over training memory for library docs.
- **Simple web design philosophy:**
  [`simple-web-design`](../simple-web-design/SKILL.md) (Anthony Hobday's 15
  principles — strong alignment with Utekos' restraint).

---

## 6. Operating procedure for every change

1. **Read AGENTS.md** sections relevant to the surface being edited (colors,
   typography, motion, voice, layout).
2. **State the contract** in your reasoning: which DBAs are reinforced, which
   CWV are at risk, which WCAG criteria apply.
3. **Pick tokens and components**, not raw values.
4. **Implement** the smallest change that satisfies §3 checklist.
5. **Self-audit** against §4 anti-patterns.
6. **Verify** types compile (`next-compile` skill if uncertain), then check the
   rendered surface mentally against §3 items 7–9.
7. **If unsure, ask** — never invent palette, typography, motion or copy (per
   `copilot-instructions.md`).

---

## 7. Quick reference

```text
LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.1     (Core Web Vitals "Good")
Contrast: 4.5:1 normal · 3:1 large       (WCAG 2.2 §1.4.3)
Animation budget: 16ms/frame             (RAIL)
Feedback under 400ms feels instant       (Doherty Threshold)
Brand : Activation ≈ 60 : 40             (Binet & Field, IPA)
```

**One sentence to remember:** _Distinctive brand assets, used consistently and
rendered fast, are the cheapest growth lever Utekos has._
