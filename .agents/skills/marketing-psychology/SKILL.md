---
name: marketing-psychology
description:
  Apply evidence-based behavioural science, persuasion principles, and decision
  psychology to Utekos copy, UI, pricing, and CRO work. Use when the user
  mentions psychology, mental models, cognitive bias, persuasion, behavioural
  science, why people buy, decision-making, consumer behaviour, anchoring,
  social proof, scarcity, loss aversion, framing, nudge, mental availability, or
  System 1/System 2.
metadata:
  version: 1.0.0
  scope: workspace
  companion: utekos-brand
---

# Marketing Psychology (Utekos edition)

A working library of decision-psychology and persuasion principles, scoped to
Utekos e-commerce (headless Shopify, Norwegian DTC, ro-og-komfort positioning).
The goal is operational reuse — not a textbook. Every principle is tied to a
concrete copy/UI/CRO move that fits the
[`utekos-brand`](../utekos-brand/SKILL.md) rules.

If a principle conflicts with the AGENTS.md brand rules or `utekos-brand`, **the
brand rules win**. Psychology is a lens, not a license to manipulate.

---

## 1. When to activate

- Writing or reviewing PDP, PLP, cart, checkout, popup, email, or hero copy.
- Reviewing pricing pages, bundle structures, or discount mechanics.
- Diagnosing a CRO problem ("why don't they convert?").
- Designing a campaign, landing page, or onboarding flow.
- Auditing whether persuasion is honest (no manufactured urgency, no dark
  patterns).

Pair this skill with: [`copywriting`](../copywriting/SKILL.md),
[`brand-voice`](../brand-voice/SKILL.md), [`seo-audit`](../seo-audit/SKILL.md),
[`cro`](../cro/SKILL.md) (if present).

---

## 2. Scientific foundations (what we trust)

These are the load-bearing sources. Cite them when justifying a decision.

| Source                                                    | Core claim                                                                                               | Operational consequence                                              |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Ehrenberg-Bass / Sharp, _How Brands Grow_ (2010, 2016)    | Growth = mental + physical availability across light buyers.                                             | Build Distinctive Brand Assets (DBAs); reach broadly, refresh often. |
| Binet & Field, _The Long and the Short of It_ (IPA, 2013) | ~60 % long-term brand / ~40 % short-term activation is optimal for most categories.                      | Don't starve brand for performance, or vice versa.                   |
| Kahneman, _Thinking, Fast and Slow_ (2011)                | Two systems: fast/intuitive (S1), slow/deliberate (S2). Friction taxes S2.                               | Reduce cognitive load. Default to clarity, not cleverness.           |
| Cialdini, _Influence: New & Expanded_ (2021)              | Seven principles: reciprocity, commitment/consistency, social proof, authority, liking, scarcity, unity. | Stack ethically; never fake.                                         |
| Thaler & Sunstein, _Nudge_ (2008, 2021)                   | Choice architecture changes behaviour without restricting choice.                                        | Pre-select sensible defaults; order options for clarity.             |
| Fogg, _Tiny Habits_ / B = MAP (2019)                      | Behaviour = Motivation × Ability × Prompt.                                                               | Missing any one = no action.                                         |
| Tversky & Kahneman, _Prospect Theory_ (1979)              | Losses ≈ 2× the pain of equivalent gains.                                                                | Frame around what is preserved, not just gained.                     |
| Iyengar & Lepper, _Choice Overload_ (2000)                | More options can reduce conversion.                                                                      | Curate; recommend a default.                                         |

---

## 3. The dual-process lens (always start here)

Most Utekos visitors are in **System 1**: skimming on mobile, low attention,
deciding by feel. Every page must be legible to S1 before it rewards S2.

- **S1 cues:** strong visual hierarchy, one CTA, recognisable DBA (wordmark,
  cloud-dancer text on maritime-blue), familiar layout, high-contrast price.
- **S2 rewards:** specs, materials, fit, garanti, return policy, reviews —
  accessible _after_ S1 has committed to scroll.

**Anti-pattern:** Burying the value prop behind a clever headline. If the user
has to translate, you've taxed S2 before earning it.

---

## 4. Principles → moves (the working catalogue)

Each entry: principle → 1-line mechanism → concrete Utekos move.

### 4.1 Social proof (Cialdini)

> People look to others' behaviour to decide their own — strongest under
> uncertainty.

- Surface review **count** + average on PDP above the fold.
- Show "X bestilte i dag/denne uka" _only if real_.
- Cluster testimonials by use case (hytte, terrasse, kveldstur) so the reader
  sees themselves.
- Avoid generic "Loved by thousands". Norwegian-language receipts beat English
  boasts.

### 4.2 Authority (Cialdini)

> Credentials and recognisable endorsements lower perceived risk.

- Lead with garanti, returrett, materialspesifikasjon — these are authority
  signals in the comfort/outdoor space.
- Press logos / award badges go _near the price_, not in the footer.

### 4.3 Reciprocity (Cialdini)

> Genuine, asymmetric giving creates obligation to return.

- Free shipping above threshold, no-questions returns, fit-guide PDF, a real
  care-tip email — all reciprocity assets.
- The newsletter popup must offer something concrete (guide, kode, early access)
  — never just "stay updated".

### 4.4 Commitment & consistency (Cialdini)

> Small public commitments predict larger ones.

- A wishlist, a saved cart, a "reservér min størrelse" micro-step makes the
  eventual purchase consistent with prior behaviour.
- Onboarding email: ask one easy question (use case) — the answer locks in a
  self-image that the next email rewards.

### 4.5 Scarcity (Cialdini) — handle with care

> Limited supply increases perceived value; **fake scarcity destroys trust**.

- Allowed: real low-stock, real seasonal end date, real limited drop.
- Banned: rolling countdowns, fake "only 2 left", urgency on evergreen SKUs.
  These violate AGENTS.md voice rules and Forbrukertilsynet guidance.

### 4.6 Unity & liking (Cialdini)

> Shared identity > similarity > liking.

- Voice should sound like _one of us_ (Norwegian, dry, concrete) — see
  [`brand-voice`](../brand-voice/SKILL.md).
- Show the product in Norwegian contexts (fjord, terrasse, bål), not stock-photo
  abstractions.

### 4.7 Loss aversion (Prospect Theory)

> Losses feel ~2× the magnitude of equivalent gains.

- "Behold varmen" beats "Bli varm." The reference point is comfort already
  owned.
- Frame guarantees as removing loss ("30 dagers åpent kjøp") rather than
  offering a perk.
- On cart: "Du mister fri frakt hvis du fjerner …" works; reverse framing rarely
  does.

### 4.8 Anchoring (Tversky & Kahneman)

> The first number seen biases all subsequent judgement.

- Show original price → discounted price (only with real reference price, per
  markedsføringsloven §26).
- In bundles, show per-unit savings against the most expensive single SKU first.
- For premium tiers, present the high-end first; the standard tier looks
  reasonable by contrast.

### 4.9 Framing (Tversky & Kahneman)

> Identical facts, different perception depending on frame.

- "Inkludert frakt" feels different from "+0 kr frakt".
- "30 dagers åpent kjøp" beats "Du kan returnere innen 30 dager" — the noun
  frames the right.
- Positive frames for benefits, loss frames for _protections_ (garanti,
  returrett).

### 4.10 Mental accounting

> People bucket money by source/use; the same kr feels different in different
> buckets.

- "Mindre enn 10 kr per kveld den varmer" reframes a 700 kr plagg into a
  daily-comfort account.
- Don't do this for high prices where the daily figure feels manipulative — S2
  will catch it.

### 4.11 Decoy effect (asymmetric dominance)

> A clearly inferior third option makes the target option look obviously better.

- Bundle structure: small / **medium (target)** / large where the medium
  dominates the small on €/value.
- Never invent decoys that aren't real options — that is a dark pattern.

### 4.12 Default effect (Nudge)

> Pre-selected options are accepted disproportionately often.

- Default the recommended size or most-popular variant on PDP.
- Default to _opt-in for transactional_ + opt-out / explicit-opt-in for
  marketing emails (GDPR-compliant per Datatilsynet).

### 4.13 Choice overload (Iyengar & Lepper)

> More than ~5–7 comparable options reduces decision rates.

- PLP: filter by use case, not by every attribute at once.
- PDP variant pickers: collapse rarely-used options behind "vis flere".

### 4.14 Goal-gradient effect

> Effort accelerates as a goal feels close.

- Free-shipping progress: "Du er 150 kr unna fri frakt."
- Checkout step indicator (3 of 4) — but only if the steps are real.

### 4.15 Peak-end rule

> Experiences are remembered by the emotional peak and the ending.

- Order confirmation page is the _ending_. Treat it as brand real estate —
  wordmark, warm thank-you, what happens next, and one delight (care tip, fit
  story).
- Unboxing copy on the inside of the polybag is a cheap peak.

### 4.16 Zeigarnik effect

> Unfinished tasks occupy attention.

- Abandoned-cart email leverages this honestly — "Du la igjen X i kurven" beats
  "Vi savner deg."
- Profile completion / wishlist progress on account page.

### 4.17 Mere-exposure effect

> Repeated exposure → preference (Zajonc, 1968).

- DBAs (wordmark, cloud-dancer palette, pill shape) must appear consistently
  across paid, organic, packaging, email. Refresh the _content_, not the
  _codes_.

### 4.18 Hick's Law

> Decision time ∝ log(n options).

- One primary CTA per viewport (AGENTS.md already mandates this for
  `--primary-button`).
- Navigation: max ~7 top-level items.

### 4.19 Fogg's B = MAP

> Behaviour requires Motivation × Ability × Prompt — all three.

- Diagnose stalled conversion by asking: motivation low (wrong value prop),
  ability low (friction, unclear), or prompt missing (no CTA in viewport, wrong
  moment)?
- The fix targets the _weakest_ of the three.

### 4.20 Doherty Threshold & Response budget

> < 400 ms feedback keeps users in flow (IBM, 1982); RAIL response < 100 ms.

- Performance is psychology. Optimistic UI on add-to-cart, instant route
  transitions, no janky CLS. See `utekos-brand` §1.5 for the numbers that
  matter.

---

## 5. Mental availability & DBAs (Ehrenberg-Bass)

Brand growth comes from being **easy to recall in buying situations** ("Category
Entry Points") and **easy to find** (physical availability).

For Utekos this means:

- **CEPs to own:** kveldskaffe på terrassen, hyttetur i grenseland-sesong, sen
  høst i hagen, fjelltur når det blir kjølig. Map content and ads to these
  moments, not to demographics.
- **DBAs to drill:** the wordmark, cloud-dancer text on maritime-blue, the pill
  shape, the badge motion, Google Sans bold sentence-case headlines. Every
  touchpoint must carry ≥ 1 DBA.
- **Reach > frequency to existing buyers.** Don't over-target. Light buyers
  drive growth.

---

## 6. The 60/40 rule (Binet & Field)

For an e-commerce brand at Utekos' stage:

- Roughly **60 %** of marketing investment → brand-building (broad reach,
  emotional, long-term).
- Roughly **40 %** → activation (search, retargeting, promo).
- Activation-only spending decays. Brand-only spending starves quarterly
  results. Both, in sequence, compound.

When asked "should we cut brand spend to fund a sale?" — the answer is almost
always _no, fund it from activation experiments that aren't paying back_.

---

## 7. Ethical guardrails (non-negotiable)

These rules outrank any persuasion tactic.

1. **No fabricated scarcity.** Counters, "only N left", time pressure must
   reflect reality.
2. **No fabricated social proof.** No fake reviews, no fake "trending", no
   inflated counts.
3. **No reference price unless real** (markedsføringsloven §26;
   Forbrukertilsynet guidance).
4. **No dark patterns** (confirm-shaming, hidden costs, forced continuity, roach
   motel). See Brignull's taxonomy and EU DSA Art. 25.
5. **WCAG 2.2 AA** is a persuasion principle in disguise — inaccessible UI
   excludes ~16 % of buyers.
6. **GDPR / Datatilsynet:** explicit opt-in for marketing, granular consent,
   easy withdrawal.
7. **Voice rules from AGENTS.md** ("Customer centric writing") override any
   tactic that produces hype, jargon, or manufactured urgency.

If a tactic requires breaking any of these, the tactic is wrong — find another
one.

---

## 8. Decision checklist (use before shipping persuasive copy/UI)

1. **What behaviour** are we trying to produce? (Be specific: add-to-cart,
   newsletter opt-in, finish checkout, return visit.)
2. **Where is the user** in the journey (awareness, consideration, decision,
   retention)?
3. **What is the dominant system** at this moment — S1 or S2? Have we matched
   it?
4. **Which 1–2 principles** from §4 are doing the work? (More than two and it
   becomes noise.)
5. **What is the honest version** of the tactic? Can we defend it to a sceptical
   customer?
6. **Does it carry a DBA?** (palette, wordmark, voice, shape.)
7. **Is there exactly one primary CTA** in the viewport?
8. **Performance budget intact?** (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.)
9. **Accessibility check** passed? (contrast, focus, keyboard, screen reader.)
10. **Does it match the [`brand-voice`](../brand-voice/SKILL.md) and
    [`utekos-brand`](../utekos-brand/SKILL.md) rules?**

If any answer is "no" or "I don't know", fix that before shipping.

---

## 9. Quick lookup

| Symptom                      | First principles to check                                                       |
| ---------------------------- | ------------------------------------------------------------------------------- |
| High traffic, low conversion | Hick's Law, choice overload, B = MAP (ability), S1 legibility                   |
| Cart abandonment             | Loss aversion framing, free-shipping goal gradient, default variants, Zeigarnik |
| Price objections             | Anchoring, framing, mental accounting, reference-price legality                 |
| Low trust                    | Social proof, authority, reciprocity, garanti placement                         |
| Stalled growth               | Mental availability, DBA refresh, 60/40 reallocation, reach to light buyers     |
| Newsletter underperforming   | Reciprocity (real offer), peak-end of last touch, clearer prompt                |
| Returns too high             | Sizing clarity (S2 reward), expectation framing, peak-end of unboxing           |

---

## 10. Things this skill deliberately does _not_ cover

- Concrete copy generation → [`copywriting`](../copywriting/SKILL.md)
- Voice profile derivation → [`brand-voice`](../brand-voice/SKILL.md)
- Visual hierarchy and tokens → [`utekos-brand`](../utekos-brand/SKILL.md)
- SEO/GEO mechanics → [`seo`](../seo/SKILL.md), [`seo-geo`](../seo-geo/SKILL.md)
- Animation cadence →
  [`gsap-framer-scroll-animation`](../gsap-framer-scroll-animation/SKILL.md)

Use this skill to _decide what to do_. Use the others to _do it_.
