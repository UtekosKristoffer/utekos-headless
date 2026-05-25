'use client'

import { ArrowRight, Shield } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { BenefitCard } from './BenefitCard'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils/className'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { useAnalytics } from '@/hooks/useAnalytics'
import type { Route } from 'next'

const benefits = [
  {
    label: 'Vanntett og vindtett',
    description: '— 8000mm vannsøyle og tapede sømmer',
    glowColor: '#475569',
    tone: 'water' as const
  },
  {
    label: 'Lammeull-fôr',
    description: '— Varm og hurtigtørkende',
    glowColor: '#d4c5b9',
    tone: 'mauve' as const
  },
  {
    label: 'Toveis YKK®-glidelås',
    description: '— Enkel av- og påkledning',
    glowColor: '#64748b',
    tone: 'overcast' as const
  }
]

interface ComfyrobeContentColumnProps {
  variantId: string
}

export function ComfyrobeContentColumn({ variantId }: ComfyrobeContentColumnProps) {
  const [containerRef, containerInView] = useInView({ threshold: 0.5 })
  const [badgeRef, badgeInView] = useInView({ threshold: 1 })
  const [h2Ref, h2InView] = useInView({ threshold: 1 })
  const [pRef, pInView] = useInView({ threshold: 1 })
  const [ctaRef, ctaInView] = useInView({ threshold: 1 })

  const { trackEvent } = useAnalytics()

  const handleCtaClick = () => {
    const contentId = cleanShopifyId(variantId) || variantId
    trackEvent('HeroInteract', {
      content_name: 'Comfyrobe Hero Button',
      destination_url: '/produkter/comfyrobe',
      location: 'Frontpage Hero Section',
      content_ids: [contentId],
      content_type: 'product'
    })
  }

  return (
    <div
      ref={containerRef}
      className={cn('will-animate-fade-in-up', containerInView && 'is-in-view')}
      style={{ '--transition-delay': '0.1s' } as React.CSSProperties}
    >
      <div
        ref={badgeRef}
        className={cn(
          'will-animate-fade-in-up mb-4 inline-flex items-center gap-2 rounded-full border border-cloud-dancer/40 bg-cloud-dancer px-4 py-2',
          badgeInView && 'is-in-view'
        )}
        style={{ '--transition-delay': '0.3s' } as React.CSSProperties}
      >
        <Shield className='size-4 text-maritime-darkest' />
        <span className='text-sm font-semibold text-maritime-darkest'>Comfyrobe™</span>
      </div>

      <h2
        ref={h2Ref}
        className={cn(
          'will-animate-fade-in-up text-balance text-3xl font-bold tracking-tight sm:text-4xl',
          h2InView && 'is-in-view'
        )}
        style={{ '--transition-delay': '0.4s' } as React.CSSProperties}
      >
        Tøff mot været, komfortabel for deg
      </h2>

      <p
        ref={pRef}
        className={cn(
          'will-animate-fade-in-up mt-4 text-lg leading-relaxed text-cloud-dancer tracking-tight font-utekos-text sm:text-xl',
          pInView && 'is-in-view'
        )}
        style={{ '--transition-delay': '0.5s' } as React.CSSProperties}
      >
        Comfyrobe™ kombinerer funksjon, tidløst design og kompromissløs komfort. Vanntett og vindtett
        ytterstoff med pustende membran holder deg tørr, mens det tykke sherpa-fôret omslutter deg med varme.
      </p>

      <ul className='mt-8 space-y-3'>
        {benefits.map((benefit, idx) => (
          <BenefitCard key={benefit.label} benefit={benefit} delay={0.6 + idx * 0.1} />
        ))}
      </ul>

      <div
        ref={ctaRef}
        className={cn('will-animate-fade-in-up', ctaInView && 'is-in-view')}
        style={{ '--transition-delay': '0.9s' } as React.CSSProperties}
      >
        <Link
          href={'/kampanje/comfyrobe' as Route}
          onClick={handleCtaClick}
          data-track='ComfyrobeMonicaArneFrontPageClick'
          className={buttonVariants({
            size: 'lg',
            className:
              'group mt-8 w-full sm:w-auto text-semibold! !bg-cloud-dancer !text-maritime-darkest hover:!bg-overcast shadow-lg shadow-cloud-dancer/20 transition-all duration-300'
          })}
        >
          Utforsk Comfyrobe™
          <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
        </Link>
      </div>
    </div>
  )
}
