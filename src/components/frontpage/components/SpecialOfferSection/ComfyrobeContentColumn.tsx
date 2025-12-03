// Path: src/components/ComfyrobeSection/ComfyrobeContentColumn.tsx
'use client'
import { ArrowRight, Shield } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { BenefitCard } from './BenefitCard'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils/className'
import { generateEventID } from '@/components/jsx/CheckoutButton/generateEventID'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import { sendJSON } from '@/components/jsx/CheckoutButton/sendJSON'
import type { MetaUserData } from '@types'

const benefits = [
  {
    label: 'Vanntett og vindtett',
    description: '— 8000mm vannsøyle og tapede sømmer',
    glowColor: '#475569'
  },
  {
    label: 'Lammeull-fôr',
    description: '— Varm og hurtigtørkende',
    glowColor: '#d4c5b9'
  },
  {
    label: 'Toveis YKK®-glidelås',
    description: '— Enkel av- og påkledning',
    glowColor: '#64748b'
  }
]

const handleCtaClick = () => {
  const eventID = generateEventID().replace('evt_', 'click_')
  const externalId = getCookie('ute_ext_id')
  const fbc = getCookie('_fbc')
  const fbp = getCookie('_fbp')
  const sourceUrl = window.location.href

  const customData = {
    content_name: 'Comfyrobe Hero Button',
    destination_url: '/produkter/comfyrobe',
    location: 'Frontpage Hero Section'
  }

  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'HeroInteract', customData, { eventID })
  }

  const userData: MetaUserData = {}
  if (externalId) userData.external_id = externalId
  if (fbc) userData.fbc = fbc
  if (fbp) userData.fbp = fbp

  const capiPayload = {
    eventName: 'HeroInteract',
    eventId: eventID,
    eventSourceUrl: sourceUrl,
    eventData: customData,
    userData
  }

  sendJSON('/api/meta-events', capiPayload)
}

export function ComfyrobeContentColumn() {
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
          'will-animate-fade-in-up mb-4 inline-flex items-center gap-2 rounded-full border border-slate-500/30 bg-slate-900/20 px-4 py-2',
          badgeInView && 'is-in-view'
        )}
        style={{ '--transition-delay': '0.3s' } as React.CSSProperties}
      >
        <Shield className='h-4 w-4 text-slate-400' />
        <span className='text-sm font-semibold text-slate-400'>
          Comfyrobe™
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
        Tøff mot været, komfortabel for deg
      </h2>

      <p
        ref={pRef}
        className={cn(
          'will-animate-fade-in-up mt-4 text-lg leading-relaxed text-neutral-400',
          pInView && 'is-in-view'
        )}
        style={{ '--transition-delay': '0.5s' } as React.CSSProperties}
      >
        Comfyrobe™ kombinerer funksjon, tidløst design og kompromissløs
        komfort. Vanntett og vindtett ytterstoff med pustende membran holder deg
        tørr, mens det tykke sherpa-fôret omslutter deg med varme.
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
          href='/produkter/comfyrobe'
          onClick={handleCtaClick}
          className={buttonVariants({
            size: 'lg',
            className:
              'group mt-8 w-full sm:w-auto bg-slate-700 text-white hover:bg-slate-600 shadow-lg shadow-slate-700/20 hover:shadow-slate-600/40 transition-all duration-300'
          })}
        >
          Utforsk Comfyrobe™
          <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
        </Link>
      </div>
    </div>
  )
}
