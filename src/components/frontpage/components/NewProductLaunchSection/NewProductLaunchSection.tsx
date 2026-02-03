'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Gift, Sparkles } from 'lucide-react'
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

      // Image entrance
      tl.fromTo(
        '.gsap-image-col',
        { x: -50, autoAlpha: 0, scale: 0.95 },
        { x: 0, autoAlpha: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
      )

      // Content staggered entrance
      tl.fromTo(
        '.gsap-fade-up',
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        },
        '-=0.8'
      )

      // Feature cards sliding in
      tl.fromTo(
        '.gsap-feature',
        { x: 30, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.2)'
        },
        '-=0.6'
      )

      // Badge subtle float animation (Living UI)
      gsap.to('.gsap-badge-float', {
        y: -4,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.5,
          from: 'random'
        }
      })
    },
    { scope: container }
  )

  return (
    <>
      <section
        id='featured-product'
        ref={container}
        className='relative mx-auto mt-12 md:mt-24 max-w-[98%] md:max-w-7xl overflow-hidden rounded-3xl border border-white/5 bg-neutral-950/50 py-12 md:py-24 shadow-2xl'
      >
        <AmbientBackgroundGlow />

        <div className='container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 lg:gap-20'>
          {/* Left Column: Image with Parallax */}
          <div className='gsap-image-col opacity-0'>
            <ImageColumn />
          </div>

          {/* Right Column: Content */}
          <div className='flex flex-col items-start'>
            {/* Badges - Scrollable on mobile for premium app feel */}
            <div className='gsap-fade-up opacity-0 mb-8 w-full'>
              <div className='flex items-center gap-3 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 snap-x hide-scrollbar'>
                {/* Badge 1: Nyhet */}
                <div className='gsap-badge-float shrink-0 snap-start'>
                  <div className='inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 backdrop-blur-md'>
                    <Sparkles className='h-3.5 w-3.5 text-sky-400' />
                    <span className='text-xs font-bold uppercase tracking-wider text-sky-300'>
                      Nyhet
                    </span>
                  </div>
                </div>

                {/* Badge 2: Gratis Buff */}
                <div className='gsap-badge-float shrink-0 snap-start'>
                  <div className='inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md'>
                    <Gift className='h-3.5 w-3.5 text-emerald-400' />
                    <span className='text-xs font-bold uppercase tracking-wider text-emerald-300'>
                      Gratis Buff (Verdi 249,-)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <h2 className='gsap-fade-up opacity-0 mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl'>
              Introduserer <br className='hidden md:block' />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-300'>
                {productName}
              </span>
            </h2>

            <p className='gsap-fade-up opacity-0 mb-10 max-w-lg text-lg leading-relaxed text-neutral-400 md:text-xl'>
              Vår varmeste og mest allsidige modell noensinne.
            </p>

            {/* Feature Cards Grid */}
            <div className='mb-10 w-full grid gap-3'>
              {newProductFeatures.map((feature, idx) => (
                <div key={feature.title} className='gsap-feature opacity-0'>
                  <FeatureCard feature={feature} delay={idx * 0.1} />
                </div>
              ))}
            </div>

            {/* Price & Actions */}
            <div className='gsap-fade-up opacity-0 w-full rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm'>
              <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
                <div className='flex flex-col'>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-3xl font-bold text-white'>
                      {currentPrice},-
                    </span>
                    <span className='text-sm text-neutral-500'>inkl. mva</span>
                  </div>
                  <p className='text-sm font-medium text-emerald-400 flex items-center gap-1.5 mt-1'>
                    <Gift className='h-3 w-3' />
                    Inkluderer gratis Utekos Buff™
                  </p>
                </div>

                <div className='flex flex-col gap-3 sm:flex-row'>
                  <Button
                    asChild
                    size='lg'
                    className='group relative overflow-hidden bg-sky-600 text-white hover:bg-sky-500 border-0 ring-0'
                  >
                    <Link href={productUrl} onClick={handleDiscoverClick}>
                      <span className='relative z-10 flex items-center'>
                        Se alle detaljer
                        <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                      </span>
                    </Link>
                  </Button>

                  <Button
                    size='lg'
                    variant='outline'
                    onClick={handleQuickViewClick}
                    className='border-white/10 bg-transparent text-white hover:bg-white/5 hover:text-white'
                  >
                    Kjøp nå
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
