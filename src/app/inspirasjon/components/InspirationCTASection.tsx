import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { inspirationSurfaces } from '../theme/surfaces'
import { cn } from '@/lib/utils/className'

import type { Route } from 'next'

interface InspirationCTASectionProps {
  title: string
  lead: string
  primaryHref?: Route
  secondaryHref?: Route
  primaryLabel?: string
  secondaryLabel?: string
  primaryTrackId?: string
  secondaryTrackId?: string
  /** Dekor-glow accent token for radial gradient */
  accentGlow?: string
  showAccentGlow?: boolean
  primaryButtonBg?: string
  primaryButtonText?: string
  secondaryButtonBg?: string
  secondaryButtonText?: string
  primaryButtonClassName?: string
  secondaryButtonClassName?: string
  sectionClassName?: string
  titleClassName?: string
  leadClassName?: string
}

export function InspirationCTASection({
  title,
  lead,
  primaryHref = '/produkter' as Route,
  secondaryHref = '/handlehjelp/storrelsesguide' as Route,
  primaryLabel = 'Se alle produkter',
  secondaryLabel = 'Finn din størrelse',
  primaryTrackId,
  secondaryTrackId,
  accentGlow = 'var(--ancient-water)',
  showAccentGlow = true,
  primaryButtonBg = 'var(--flame-orange)',
  primaryButtonText = 'var(--black-beauty)',
  secondaryButtonBg = 'var(--mountain-view)',
  secondaryButtonText = 'var(--cloud-dancer)',
  primaryButtonClassName,
  secondaryButtonClassName,
  sectionClassName,
  titleClassName,
  leadClassName
}: InspirationCTASectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-t border-cloud-dancer/12 py-24',
        inspirationSurfaces.darkSection,
        sectionClassName
      )}
    >
      <div
        className={cn('absolute inset-0', showAccentGlow ? 'opacity-[0.18]' : 'opacity-0')}
        style={
          showAccentGlow ?
            {
              background: `radial-gradient(circle at 18% 12%, ${accentGlow} 0%, transparent 32%), radial-gradient(circle at 82% 20%, var(--color-soft-warm) 0%, transparent 28%)`
            }
          : undefined
        }
      />
      <div className='container relative mx-auto px-4 text-center'>
        <AnimatedBlock className='will-animate-fade-in-scale'>
          <h2 className={cn('mb-6', 'text-cloud-dancer', titleClassName)}>{title}</h2>
          <p
            className={cn('mx-auto mb-8 max-w-2xl utekos-section-lead', 'text-ancient-water', leadClassName)}
          >
            {lead}
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <BrandBadge
              asChild
              backgroundColor={primaryButtonBg}
              textColor={primaryButtonText}
              className={cn(
                'group min-h-14 border border-primary/24 px-8 py-4 text-base leading-4 font-bold tracking-normal shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105',
                primaryButtonClassName
              )}
            >
              <Link href={primaryHref} data-track={primaryTrackId}>
                {primaryLabel}
                <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </BrandBadge>
            <BrandBadge
              asChild
              backgroundColor={secondaryButtonBg}
              textColor={secondaryButtonText}
              className={cn(
                'min-h-14 border border-background/14 px-8 py-4 text-base leading-4 font-bold tracking-normal shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105',
                secondaryButtonClassName
              )}
            >
              <Link href={secondaryHref} data-track={secondaryTrackId}>
                {secondaryLabel}
              </Link>
            </BrandBadge>
          </div>
        </AnimatedBlock>
      </div>
    </section>
  )
}
