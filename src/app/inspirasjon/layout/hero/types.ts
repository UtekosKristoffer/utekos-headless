import type { LucideIcon } from 'lucide-react'

/**
 * Normalisert datamodell for ett "høydepunkt"-kort i en inspirasjons-hero.
 *
 * Modellen dekker begge de etablerte visuelle stilene i prosjektet:
 * - "theme"-stil (solid flate + topp-hairline): sett `surface` (solid farge),
 *   `border`, `marker`, `iconSurface`, `iconColor`.
 * - "gradient"-stil (gradient-flate + glød + skinn): sett `surface` (gradient),
 *   `border`, `glow`, `sheen: true`, `iconColor`.
 *
 * Alle visuelle felter er valgfrie. Verdier er rå CSS (brand-tokens via
 * `var(--…)`, `color-mix(…)` eller gradienter) fordi de ikke kan uttrykkes
 * som Tailwind-klasser. Utelatte felter faller tilbake til brand-defaults.
 */
export interface InspirationHeroFeature {
  /** Kort-tittel (rendres som `<h3>`). */
  title: string
  /** Kort-beskrivelse (rendres som `<p>`). */
  description: string
  /** Lucide-ikon-komponent (sendes som komponent, ikke streng). */
  icon: LucideIcon
  /** Kort-flate: solid farge ELLER gradient (CSS `background`). */
  surface?: string
  /** Kantfarge (CSS `border-color`). */
  border?: string
  /** Slagskygge (CSS `box-shadow`). */
  shadow?: string
  /** Topp-hairline-aksent (theme-stil). Rendres kun når satt. */
  marker?: string
  /** Radial hover-glød (gradient-stil). Rendres kun når satt. */
  glow?: string | null
  /** Topp-skinn-overlay (gradient-stil). */
  sheen?: boolean
  /** Bakgrunn på ikon-boksen (CSS `background-color`). */
  iconSurface?: string
  /** Fyll/strek-farge på selve ikonet (CSS `color`). */
  iconColor?: string
  /** Kantfarge på ikon-boksen. Faller tilbake til `border`. */
  iconBorder?: string
  /** Tittelfarge på kortet. Overstyrer default brand-token. */
  titleColor?: string
  /** Beskrivelsesfarge på kortet. Overstyrer default brand-token. */
  descriptionColor?: string
}

/** Horisontal justering for hero-innhold. */
export type InspirationHeroAlign = 'left' | 'center'
