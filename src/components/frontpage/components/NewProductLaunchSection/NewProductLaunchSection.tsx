'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Gift } from 'lucide-react'
import { AmbientBackgroundGlow } from './AmbientBackgroundGlow'
import { FeatureCard } from './FeatureCard'
import { ImageColumn } from './ImageColumn'
import { newProductFeatures } from './newProductFeatures'
import { QuickViewModal } from '@/components/products/QuickViewModal'
import { Activity } from 'react'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import {
  productName,
  productHandle,
  productUrl,
  originalPrice,
  currentPrice
} from '@/api/constants'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { MetaUserData, MetaEventPayload, MetaEventType } from '@types'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface NewProductLaunchSectionProps {
  variantId: string
}

export function NewProductLaunchSection({
  variantId
}: NewProductLaunchSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const container = useRef<HTMLElement>(null)

  const getUserData = (): MetaUserData => {
    return {
      external_id: getCookie('ute_ext_id') || undefined,
      fbc: getCookie('_fbc') || undefined,
      fbp: getCookie('_fbp') || undefined,
      email_hash: getCookie('ute_user_hash') || undefined,
      client_user_agent:
        typeof navigator !== 'undefined' ? navigator.userAgent : undefined
    }
  }

  const trackEvent = (eventName: string, customEventName: string) => {
    const contentId = cleanShopifyId(variantId) || variantId
    const eventID = generateEventID().replace(
      'evt_',
      `${eventName.toLowerCase().substring(0, 3)}_`
    )
    const sourceUrl = window.location.href

    const eventData = {
      content_name: `${eventName} ${productName}`,
      content_ids: [contentId],
      content_type: 'product' as const,
      value: currentPrice,
      currency: 'NOK'
    }

    if (typeof window !== 'undefined' && (window as any).fbq) {
      ;(window as any).fbq('trackCustom', customEventName, eventData, {
        eventID
      })
    }

    const capiPayload: MetaEventPayload = {
      eventName: customEventName as MetaEventType,
      eventId: eventID,
      eventSourceUrl: sourceUrl,
      eventTime: Math.floor(Date.now() / 1000),
      actionSource: 'website',
      userData: getUserData(),
      eventData: eventData
    }

    fetch('/api/tracking-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(capiPayload),
      keepalive: true
    }).catch(console.error)
  }

  const handleDiscoverClick = () => trackEvent('Discover', 'HeroInteract')
  const handleQuickViewClick = () => {
    setIsModalOpen(true)
    trackEvent('QuickView', 'OpenQuickView')
  }

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(
        '.gsap-image-col',
        { x: -30, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: 'power3.out' }
      )

      tl.fromTo(
        '.gsap-content-col',
        { x: 30, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )

      tl.fromTo(
        '.gsap-item',
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.6'
      )

      tl.fromTo(
        '.gsap-feature',
        { x: 20, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.2)'
        },
        '-=0.4'
      )
    },
    { scope: container }
  )

  return (
    <>
      <section
        id='featured-product'
        ref={container}
        className='relative mx-auto mt-16 max-w-[95%] overflow-hidden rounded-xl border border-neutral-800 py-16 md:max-w-7xl'
      >
        <AmbientBackgroundGlow />
        <div className='container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2'>
          <div className='gsap-image-col opacity-0'>
            <ImageColumn />
          </div>

          <div className='gsap-content-col opacity-0 flex flex-col items-start'>
            <div className='mb-6'>
              <div className='flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3 md:hidden'>
                <div className='gsap-item opacity-0 inline-flex items-center gap-2.5 rounded-full border border-sky-800/30 bg-sky-900/20 px-4 py-2'>
                  <span className='relative flex h-2.5 w-2.5 shrink-0'>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'></span>
                    <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-500'></span>
                  </span>
                  <span className='whitespace-nowrap text-sm font-semibold text-sky-400'>
                    Lanseringstilbud 🎉
                  </span>
                </div>

                <div className='gsap-item opacity-0 inline-flex items-center gap-2.5 rounded-full border border-emerald-800/30 bg-emerald-900/20 px-4 py-2'>
                  <Gift className='h-4 w-4 shrink-0 text-emerald-400' />
                  <span className='text-sm font-semibold text-emerald-400'>
                    Gratis Buff™ (verdi 249,-)
                  </span>
                </div>

                <div className='gsap-item opacity-0 inline-flex items-center gap-2 rounded-full border border-amber-800/30 bg-amber-900/20 px-4 py-2'>
                  <svg
                    className='h-4 w-4 shrink-0 text-amber-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <span className='whitespace-nowrap text-sm font-bold text-amber-400'>
                    Spar 449 kr totalt
                  </span>
                </div>
              </div>

              <div className='hidden md:inline-flex'>
                <div className='gsap-item opacity-0 inline-flex items-center gap-3 rounded-full border border-sky-800/30 bg-sky-900/20 px-5 py-2.5'>
                  <span className='relative flex h-2.5 w-2.5 shrink-0'>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'></span>
                    <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-500'></span>
                  </span>
                  <span className='whitespace-nowrap text-base font-semibold text-sky-400'>
                    Tilbud
                  </span>
                  <span>🎉</span>{' '}
                  <span className='whitespace-nowrap text-base font-semibold text-sky-400'>
                    Få gratis Utekos Buff™ og spar 449 kr!
                  </span>
                </div>
              </div>
            </div>

            <h2 className='gsap-item opacity-0 mb-4 text-4xl font-bold leading-tight text-accent/80 sm:text-5xl'>
              Nyhet!
            </h2>

            <p className='gsap-item opacity-0 mb-8 max-w-prose text-lg leading-relaxed text-access/80'>
              Vi introduserer {productName} – vår varmeste og mest allsidige
              modell. Perfekt for deg som stiller de høyeste kravene til komfort
              og funksjonalitet.
            </p>

            <div className='mb-8 w-full space-y-3 text-access/80'>
              {newProductFeatures.map((feature, idx) => (
                <div key={feature.title} className='gsap-feature opacity-0'>
                  <FeatureCard feature={feature} delay={0} />
                </div>
              ))}
            </div>

            <div className='gsap-item opacity-0 w-full'>
              <div className='flex w-full flex-col gap-6'>
                <div className='flex flex-col gap-3'>
                  <div className='flex flex-wrap items-baseline gap-3'>
                    <p className='bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-5xl font-bold text-transparent'>
                      {currentPrice},-
                    </p>
                    <span className='text-sm text-access/80'>inkl. mva</span>
                    <span className='line-through rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-400 ring-1 ring-emerald-500/20'>
                      {originalPrice},-
                    </span>
                  </div>
                  <p className='text-sm text-access/80'>
                    Begrenset tilbud ved lansering
                  </p>
                </div>

                <div className='flex flex-wrap gap-3'>
                  <Button asChild size='lg' className='group flex-1'>
                    <Link href={productUrl} onClick={handleDiscoverClick}>
                      Oppdag {productName}
                      <ArrowRight className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
                    </Link>
                  </Button>
                  <Button
                    size='lg'
                    variant='secondary'
                    onClick={handleQuickViewClick}
                    className='group flex-1 bg-button text-access hover:bg-button/80 hover:scale-105 active:scale-95'
                  >
                    Legg i handlekurv
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Activity>
        <QuickViewModal
          productHandle={productHandle}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </Activity>
    </>
  )
}
