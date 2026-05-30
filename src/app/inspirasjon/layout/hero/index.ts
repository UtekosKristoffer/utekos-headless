/**
 * Gjenbrukbart hero-system for alle sider under `src/app/inspirasjon`.
 *
 * Tier 1 (granulære primitiver): `InspirationHeroSection`,
 * `InspirationHeroHeading`, `HeroHighlight`, `InspirationHeroFeatureGrid`,
 * `InspirationHeroFeatureCard`.
 *
 * Tier 2 (drop-in composer): `InspirationHero`.
 *
 * Gjenbruk også `InspirationHeroBreadcrumb` og `InspirationHeroActions` fra
 * `../InspirationHeroBreadcrumb` / `../InspirationHeroActions`.
 */
export { InspirationHero } from './InspirationHero'
export { InspirationHeroSection } from './InspirationHeroSection'
export { InspirationHeroHeading } from './InspirationHeroHeading'
export { HeroHighlight } from './HeroHighlight'
export { InspirationHeroFeatureGrid } from './InspirationHeroFeatureGrid'
export { InspirationHeroFeatureCard } from './InspirationHeroFeatureCard'
export type { InspirationHeroFeature, InspirationHeroAlign } from './types'
