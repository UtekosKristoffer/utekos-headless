'use client'
import { ArrowRight, Feather } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { BenefitCard } from '@/app/produkter/(oversikt)/components/BenefitCard'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils/className'

const benefits = [
  {
    label: '3-i-1 funksjonalitet',
    description: '— Parkas, oppfestet eller full lengde',
    glowColor: '#f97316'
  },
  {
    label: 'Lettvekt og kompakt',
    description: '— Bare ca. 800g, enkel å pakke',
    glowColor: '#fb923c'
  },
  {
    label: 'YKK®-toveisglidelåser',
    description:
      '— Bransjens mest anerkjente glidelås sikrer pålitelig og enkel bruk',
    glowColor: '#fdba74'
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
      className={cn('will-animate-fade-in-up', containerInView && 'is-in-view')}
      style={{ '--transition-delay': '0.1s' } as React.CSSProperties}
    >
      <div
        ref={badgeRef}
        className={cn(
          'will-animate-fade-in-up mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-900/20 px-4 py-2',
          badgeInView && 'is-in-view'
        )}
        style={{ '--transition-delay': '0.3s' } as React.CSSProperties}
      >
        <Feather className='h-4 w-4 text-orange-400' />
        <span className='text-sm font-semibold text-orange-400'>
          Ultralett allsidighet
        </span>
      </div>

      <h2
        ref={h2Ref}
        className={cn(
          'will-animate-fade-in-up text-balance text-3xl font-bold tracking-tight sm:text-4xl',
          h2InView && 'is-in-view'
        )}
        style={{ '--transition-delay': '0.4s' } as React.CSSProperties}
      >
        Lettvekt møter varme og allsidighet
      </h2>

      <p
        ref={pRef}
        className={cn(
          'will-animate-fade-in-up mt-4 text-lg leading-relaxed text-neutral-200',
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
        className={cn('will-animate-fade-in-up', ctaInView && 'is-in-view')}
        style={{ '--transition-delay': '0.9s' } as React.CSSProperties}
      >
        <Link
          href='/produkter/utekos-mikrofiber'
          data-track='MikrofiberContentProductPageExploreClick'
          className={buttonVariants({
            size: 'lg',
            className:
              'group mt-8 w-full sm:w-auto bg-orange-600 text-white hover:bg-orange-500 shadow-lg shadow-orange-600/20 hover:shadow-orange-500/40 transition-all duration-300'
          })}
        >
          Utforsk Utekos Mikrofiber™
          <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
        </Link>
      </div>
    </div>
  )
}
