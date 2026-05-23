# Plan

## Current Session: `/skreddersy-varmen` Purchase Section Brand, WCAG, and Checkout Flow

- Status: Completed.
- Documentation: Confirmed via the local `utekos-brand` skill/AGENTS
  instructions, Context7 for Next.js, Vercel documentation search, and Next
  DevTools MCP for the running Next.js app. Klarna usage was checked against
  local Klarna guideline assets already present in the repository.
- Decision: Keep `PurchaseClientViewLanding.tsx` as a client component because
  it owns purchase interactions, while tightening the section around one
  primary action: `Kjøp nå`. Use the Utekos wordmark in the product headline,
  calmer value-led copy, higher contrast brand color pairings, visible color
  labels, and a compact Klarna note near price with the larger Klarna banner
  moved below the CTA cluster.
- Accessibility: Main color pairs were checked for WCAG AA contrast. The color
  selector no longer relies on swatches alone, focus indicators now work across
  light and dark surfaces, and active states include non-color cues.
- Verification: Targeted ESLint passed, full `tsc --noEmit` passed, browser
  rendering of `/skreddersy-varmen#purchase-section` completed, and Next
  DevTools reported no session or config errors before final handoff.

## Current Session: `/skreddersy-varmen` Purchase Section Visual Correction

- Status: Completed.
- Documentation: No new external API documentation was required. The correction
  used the already confirmed Utekos brand instructions, local Klarna assets, and
  live browser verification through Next DevTools.
- Root cause: The previous iteration over-added visual elements and trusted
  technical checks too much. Feature badges received decorative dots that broke
  their recognizable badge form, Klarna appeared in two places, and the checkout
  area had competing actions.
- Decision: Restore the feature badges to text-only badge forms, remove the
  decorative product-badge dot, keep only one Klarna component placement below
  the primary checkout action, and remove the secondary `Legg i kurv` button
  from this landing section. Size choices now render as equal-width controls,
  and the color selector is separated into its own calm row.
- Verification: ESLint passed, full `tsc --noEmit` passed, `git diff --check`
  passed, Next DevTools reported `configErrors: []` and `sessionErrors: []`,
  browser console had zero errors/warnings, and live DOM checks confirmed one
  CTA, one visible Klarna placement, no feature-badge dots, equal size-button
  dimensions, and no horizontal overflow.

## Current Session: `/skreddersy-varmen` Mobile Choice Grid Correction

- Status: Completed.
- Documentation: No new external documentation was required; this was a
  responsive layout correction against the existing Utekos brand constraints.
- Root cause: The feature badges and size buttons used different responsive
  layout systems. Feature badges used nowrap horizontal scrolling, while size
  buttons used a two-column mobile grid before `sm`, causing inconsistent
  placement and visual rhythm on small screens.
- Decision: Use the same shared three-column choice grid and pill class for
  both groups. On narrow screens the pills keep equal width and height, use
  smaller mobile text, and avoid horizontal scrolling.
- Verification: ESLint passed, full `tsc --noEmit` passed, `git diff --check`
  passed, and Chrome CDP checks at 390, 360, and 320 px confirmed no horizontal
  overflow. At 320 px, all three feature badges and all three size buttons
  measured `85x48` with matching x positions, one row, and one child per
  feature badge.

## Current Session: `/skreddersy-varmen` Klarna Price Row Placement

- Status: Completed.
- Documentation: No new external documentation was required. The requested
  Klarna asset existed locally at
  `public/klarna/Choose Klarna at checkout/White (secondary)/300x100.png`.
- Decision: Replace the CTA-area Klarna note with the local Klarna image in the
  product price row. The image is right-aligned in the available space and
  vertically centered against the price.
- Verification: ESLint passed, full `tsc --noEmit` passed, `git diff --check`
  passed, Next DevTools reported `configErrors: []` and `sessionErrors: []`,
  and browser checks confirmed the Klarna image is right of the `1790,-` price,
  centered on the same row, with one visible Klarna image, one CTA, and no
  horizontal overflow on desktop or 320 px mobile.

## Current Session: `/skreddersy-varmen` Responsive Klarna Asset Selection

- Status: Completed.
- Documentation: No new external documentation was required; the work used
  local Klarna assets already present under `public/klarna`.
- Decision: Replace the single `300x100` Klarna image with a responsive
  `picture` element. Mobile widths use the longer `320x50` asset, `sm` and up
  use `728x90 - Left`, and wide desktop uses `970x90 - Left`.
- Verification: ESLint passed, full `tsc --noEmit` passed, Next DevTools
  reported `configErrors: []` and `sessionErrors: []`, and browser checks
  confirmed desktop selected `970x90 - Left`, 320/390 px selected `320x50`,
  the image stayed right of the price on the same row, and no horizontal
  overflow was introduced.

## Current Session: AI Chat Empty Message Diagnosis

- Status: Completed.
- Documentation: Confirmed via Context7 for Vercel AI SDK 5 (`/vercel/ai/ai_5_0_0`)
  and local `node_modules/ai` source/types for installed `ai@5.0.68`.
- Root cause: The chat route passed incoming `messages` directly to
  `convertToModelMessages`. AI SDK 5 expects `UIMessage.parts` text parts, while
  older/custom callers can send text in `content` or as a single `message`
  string. When a message arrives with empty `parts` and text in `content`, the
  model receives an effectively empty user message.
- Decision: Normalize and Zod-validate chat request payloads at the route
  boundary. Preserve valid AI SDK 5 `parts` messages, and convert legacy
  `content`/single-string payloads into `{ type: 'text', text }` parts before
  calling `convertToModelMessages`.
- Verification: Targeted ESLint passed, full `tsc --noEmit` passed, and a
  runtime `tsx` check confirmed both legacy `content` and modern `parts`
  payloads normalize to non-empty text parts.

## Current Session: `/skreddersy-varmen` Tablet/Mobile Reveal Stability

- Status: Completed.
- Documentation: Confirmed via local GSAP skill files, Context7 for GSAP and
  `@gsap/react`, and Next DevTools documentation for Next.js 16.
- Root cause: Post-hero tablet/mobile layouts still depended on ScrollTrigger
  `fromTo` reveals that initialize text with `autoAlpha: 0`. On smaller
  viewports, text can enter the viewport before the trigger-driven reveal has
  completed, so it appears missing until later scroll interaction.
- Decision: For all viewports below `1280px`, post-hero content must render
  visible-first. Desktop (`>=1280px`) keeps the stronger GSAP reveal/parallax
  treatment.
- Verification: Browser checks at `390x844`, `820x1180`, and `1024x1366`
  returned `hiddenCount: 0` while scrolling downward. Next DevTools reports
  `configErrors: []` and `sessionErrors: []`. Targeted ESLint passed; production
  build passed with the existing Google Sans fallback warning.
