/**
 * Grillkvelden — kort, faner og CTA (samme palett som UseCasesGrid / HostTips).
 *
 * Kort: demitasse · ikonbakgrunn: amphora · ikon/aktiv tekst: almost-mauve
 */
export const grillSeasonsCardTheme = {
  tabTriggerClassName:
    'border-cloud-dancer/18 bg-demitasse hover:border-cloud-dancer/28 hover:bg-demitasse/90 data-active:border-amphora/35 data-active:bg-amphora data-active:text-almost-mauve',
  tabActiveClassName: 'text-almost-mauve',
  tabInactiveClassName: 'text-ancient-water',
  contentCardClassName: 'border-cloud-dancer/18 bg-demitasse',
  contentIconClassName: 'border-cloud-dancer/18 bg-amphora',
  contentIconGlyphClassName: 'text-almost-mauve',
  contentTitleClassName: 'text-cloud-dancer',
  contentTextClassName: 'text-ancient-water'
} as const

/** Matcher GrillHeroSection-knappene — ingen gradient på seksjonsbakgrunn. */
export const grillCtaTheme = {
  showAccentGlow: false,
  primaryButtonBg: 'var(--checkout-button)',
  primaryButtonText: 'var(--black-beauty)',
  secondaryButtonBg: 'var(--blueberry)',
  secondaryButtonText: 'var(--foreground)',
  primaryButtonClassName:
    'group min-h-14 border border-primary/35 px-8 py-4 text-base leading-4 font-bold tracking-normal shadow-[0_18px_38px_-28px_color-mix(in_oklch,var(--demitasse)_72%,transparent)] transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105',
  secondaryButtonClassName:
    'min-h-14 border border-cloud-dancer/35 px-8 py-4 text-base leading-4 font-bold tracking-normal shadow-[0_18px_38px_-30px_color-mix(in_oklch,var(--background)_48%,transparent)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-cloud-dancer/90'
} as const
