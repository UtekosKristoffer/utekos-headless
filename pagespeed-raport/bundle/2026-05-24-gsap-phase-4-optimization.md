# 2026-05-24 Bundle Report: GSAP Phase 4 Optimization

## Status

Partial. Source-level bundle hygiene is improved, but a fresh production bundle
could not be produced in this run.

## Source-Level Findings

- Dynamic GSAP entrypoints now live under `src/lib/gsap/`.
- `GSDevTools` is development-gated in `createGsapDevTools.ts` and dynamically
  imported from `gsap/GSDevTools`.
- `ScrollToPlugin` is dynamically imported only by `loadScrollToPlugin.ts`,
  reached through `scrollToElement.ts`.
- Optimized homepage files no longer statically import `gsap`, `@gsap/react`, or
  `gsap/ScrollTrigger`.
- Optimized active-route files no longer statically import `framer-motion`;
  relevant components use `motion/react`.

## Verification Commands

- `npx tsc --noEmit --pretty false`: passed.
- Targeted `npm run lint -- <changed phase-4 files>`: passed.
- Follow-up serialization fix for `MomentsSection`:
  - `npx tsc --noEmit --pretty false`: passed.
  - `npm run lint -- src/components/frontpage/MomentCardsGrid.tsx src/components/frontpage/MomentsSection.tsx src/components/frontpage/MomentCard.tsx`:
    passed.
  - `npx playwright screenshot --wait-for-timeout=1500 --viewport-size=1440,1100 http://localhost:3000/ /private/tmp/utekos-home-phase4-fixed.png`:
    passed.
- `rg` source check: passed for optimized phase-4 files.

## Blocked Bundle Checks

The following checks were blocked because `npm run build` hung for more than 10
minutes at `Creating an optimized production build ...`:

- Verify `/` first-load chunks do not contain `ScrollTrigger`.
- Verify `GSDevTools` is absent from production bundle.
- Verify `ScrollToPlugin` is only in a lazy chunk.
- `npm run analyze`.
- `npx next experimental-analyze --output`.

The hung build was stopped and exited with code `143`.

## Next Verification Step

Run a clean production build in an environment where Next.js 16/Turbopack can
finish, then inspect the emitted `.next/static/chunks` and analyzer output for:

- `ScrollTrigger`
- `ScrollToPlugin`
- `GSDevTools`
- homepage first-load chunk membership
