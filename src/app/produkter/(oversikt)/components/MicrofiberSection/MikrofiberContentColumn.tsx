// Path: src/app/produkter/(oversikt)/components/MicrofiberSection/MikrofiberContentColumn.tsx

'use client'

import { ArrowRight, Feather } from 'lucide-react'
import Link from 'next/link'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { BenefitCard } from '@/app/produkter/(oversikt)/components/BenefitCard'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils/className'

const benefits = [
  {
    label: '3-i-1 funksjonalitet',
    description: '— Parkas, oppfestet eller full lengde',
    glowColor: 'var(--ancient-water)',
    surface: 'maritime' as const
  },
  {
    label: 'Lettvekt og kompakt',
    description: '— Bare ca. 800g, enkel å pakke',
    glowColor: 'var(--primary-button)',
    surface: 'plum' as const
  },
  {
    label: 'YKK®-toveisglidelåser',
    description:
      '— Bransjens mest anerkjente glidelås sikrer pålitelig og enkel bruk',
    glowColor: 'var(--dusted-peri)',
    surface: 'blueberry' as const
  }
]

export function MikrofiberContentColumn() {
  const [containerRef, containerInView] = useInView({ threshold: 0.5 })
  const [badgeRef, badgeInView] = useInView({ threshold: 1 })
  const [h2Ref, h2InView] = useInView({ threshold: 1 })
  const [pRef, pInView] = useInView({ threshold: 1 })
  const [ctaRef, ctaInView] = useInView({ threshold: 1 })

  return (
    <div
      ref={containerRef}
      className={cn(
        'will-animate-fade-in-up h-full min-h-full',
        containerInView && 'is-in-view'
      )}
      style={{ '--transition-delay': '0.1s' } as React.CSSProperties}
    >
      <div className='flex h-full min-h-full flex-col justify-center lg:min-h-[34rem]'>
        <div>
          <div
            ref={badgeRef}
            className={cn(
              'will-animate-fade-in-up mb-5',
              badgeInView && 'is-in-view'
            )}
            style={{ '--transition-delay': '0.3s' } as React.CSSProperties}
          >
            <BrandBadge
              backgroundColor='var(--maritime-darkest)'
              textColor='var(--cloud-dancer)'
              className='gap-2 border border-maritime-darkest/12 px-4 py-2 font-utekos-text text-sm font-medium tracking-tight shadow-[0_16px_34px_-28px_color-mix(in_oklch,var(--maritime-darkest)_82%,transparent)]'
            >
              <Feather
                className='size-4 text-primary-button'
                aria-hidden='true'
              />
              <span>Ultralett allsidighet</span>
            </BrandBadge>
          </div>

          <h2
            ref={h2Ref}
            className={cn(
              'will-animate-fade-in-up text-balance font-brand-sans text-3xl font-bold leading-[0.95] tracking-tight text-maritime-darkest sm:text-4xl',
              h2InView && 'is-in-view'
            )}
            style={{ '--transition-delay': '0.4s' } as React.CSSProperties}
          >
            Lettvekt møter varme og allsidighet
          </h2>

          <p
            ref={pRef}
            className={cn(
              'will-animate-fade-in-up mt-6 max-w-2xl font-utekos-text text-lg leading-[1.45] tracking-tight text-maritime-darkest/82',
              pInView && 'is-in-view'
            )}
            style={{ '--transition-delay': '0.5s' } as React.CSSProperties}
          >
            Utekos Mikrofiber™ gir deg følelsen av dun med ekstra fordeler.
            Beholder varmen selv når den blir fuktig og tørker raskt. Ulike
            snorstramminger sørger for at passformen kan justeres etter behov.
            Tilgjengelig i fargene Fjellblå og Vargnatt.
          </p>

          <ul className='mt-8 space-y-3'>
            {benefits.map((benefit, idx) => (
              <BenefitCard
                key={benefit.label}
                benefit={benefit}
                delay={0.6 + idx * 0.1}
              />
            ))}
          </ul>

          <div
            ref={ctaRef}
            className={cn(
              'will-animate-fade-in-up mt-8',
              ctaInView && 'is-in-view'
            )}
            style={{ '--transition-delay': '0.9s' } as React.CSSProperties}
          >
            <BrandBadge
              asChild
              backgroundColor='var(--primary-button)'
              textColor='var(--maritime-darkest)'
              className='group min-h-12 w-full gap-2 whitespace-normal border border-primary-button/35 px-6 py-3 font-utekos-text text-base font-semibold leading-[1.35] tracking-tight shadow-[0_18px_40px_-28px_color-mix(in_oklch,var(--primary-button)_70%,transparent)] transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-button/70 focus-visible:ring-offset-2 focus-visible:ring-offset-overcast motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto sm:whitespace-nowrap'
            >
              <Link
                href='/produkter/utekos-mikrofiber'
                data-track='MikrofiberContentProductPageExploreClick'
              >
                Utforsk Utekos Mikrofiber™
                <ArrowRight className='size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none' />
              </Link>
            </BrandBadge>
          </div>
        </div>
      </div>
    </div>
  )
}
