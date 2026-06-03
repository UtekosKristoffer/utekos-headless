import type { CSSProperties } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import type { InspirationHeroFeature } from './types'

interface InspirationHeroFeatureCardProps {
  feature: InspirationHeroFeature
}

/**
 * Ett "høydepunkt"-kort. Rendres som `<li>` (skal stå inne i en `<ul>`).
 *
 * Dekker begge brand-stilene via betinget rendring:
 * - `marker` -> topp-hairline (theme-stil).
 * - `glow` -> radial hover-glød (gradient-stil).
 * - `sheen` -> hvitt topp-skinn (gradient-stil).
 *
 * Alle farger settes via `style` (rå CSS/tokens). Tekstfarger har brand-token
 * defaults i klassenavn og overstyres kun når en eksplisitt farge er gitt.
 * Ren Server Component.
 */
export function InspirationHeroFeatureCard({ feature }: InspirationHeroFeatureCardProps) {
  const {
    title,
    description,
    icon: Icon,
    surface,
    border,
    shadow,
    marker,
    glow,
    sheen,
    iconSurface,
    iconColor,
    iconBorder,
    titleColor,
    descriptionColor
  } = feature

  const cardStyle: CSSProperties = {
    background: surface,
    borderColor: border,
    boxShadow: shadow
  }

  const iconBoxStyle: CSSProperties = {
    backgroundColor: iconSurface,
    borderColor: iconBorder ?? border,
    color: iconColor
  }

  return (
    <li>
      <Card
        className='group relative flex aspect-[2/1] w-full flex-col overflow-hidden rounded-xl border py-0 text-foreground transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
        style={cardStyle}
      >
        {glow ?
          <div
            className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20 motion-reduce:transition-none'
            style={{ background: glow }}
            aria-hidden='true'
          />
        : null}

        {sheen ?
          <div
            className='pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.08)_34%,transparent_100%)]'
            aria-hidden='true'
          />
        : null}

        {marker ?
          <span
            className='absolute inset-x-4 top-0 h-px transition-opacity duration-300 group-hover:opacity-70 motion-reduce:transition-none'
            style={{ background: marker }}
            aria-hidden='true'
          />
        : null}

        <CardContent className='relative flex h-full flex-col gap-3 p-5'>
          <div className='flex items-center gap-3'>
            <span
              className='flex size-10 shrink-0 items-center justify-center rounded-lg border'
              style={iconBoxStyle}
              aria-hidden='true'
            >
              <Icon className='size-5' focusable='false' />
            </span>

            <h3
              className='inspirational-page-hero-card-heading whitespace-nowrap text-foreground'
              style={titleColor ? { color: titleColor } : undefined}
            >
              {title}
            </h3>
          </div>

          <p
            className='inspirational-page-hero-card-description pr-2 text-foreground/90'
            style={descriptionColor ? { color: descriptionColor } : undefined}
          >
            {description}
          </p>
        </CardContent>
      </Card>
    </li>
  )
}
