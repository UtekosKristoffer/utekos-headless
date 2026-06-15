/**
 * Grillkvelden — seksjonsbakgrunn og typografi.
 *
 * Seksjonene veksler lys/mørk i rekkefølgen de står i `page.tsx`:
 * 1. Hero — `GrillHeroSection` (bg-background, egen fil)
 * 2. UseCasesGrid — light
 * 3. BenefitsGrid — dark
 * 4. GrillSeasonsSection — light
 * 5. HostTipsGrid — dark
 * 6. GrillMasterSection — light
 * 7. CTASection — dark
 *
 * Endre farger her — ikke spredt i hver seksjonsfil.
 * Kort/faner/CTA: theme/grillInspirationTheme.ts
 */
export const grillSectionSurfaces = {
  light: {
    section: 'bg-overcast py-24 text-background',
    heading: 'text-background',
    lead: 'text-background/82',
    body: 'text-background/82',
    muted: 'text-ancient-water'
  },
  dark: {
    section: 'bg-maritime-darkest py-24 text-foreground',
    heading: 'text-foreground',
    lead: 'text-foreground',
    body: 'text-foreground',
    muted: 'text-ancient-water'
  }
} as const
