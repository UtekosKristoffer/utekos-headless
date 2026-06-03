'use client'

import { BadgeCheckIcon } from '@/components/animate-icons/icons/badge-check'
import { ClockIcon } from '@/components/animate-icons/icons/clock'
import { CompassIcon } from '@/components/animate-icons/icons/compass'
import { MoveRightIcon } from '@/components/animate-icons/icons/move-right'
import { Button } from '@/components/ui/button'
import heroImage from '@public/nbcc-retro-master.webp'
import nbccLogo from '@public/NBCC_logo_RGB_lys_bg.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

import { NBCC_HERO_CONTENT_SELECTOR } from '../constants'
import { nbccHeroTracking } from '../utils/nbccLandingPageContent'
import { NbccAiSummaryButton } from './NbccAiSummaryButton'

gsap.registerPlugin(useGSAP)

export function NbccHeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = sectionRef.current
      if (!root) return

      const blocks = gsap.utils.toArray<HTMLElement>(NBCC_HERO_CONTENT_SELECTOR, root)

      const clearWillChange = () => {
        blocks.forEach(el => {
          el.style.removeProperty('will-change')
        })
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(blocks, { autoAlpha: 1, y: 0, clearProps: 'willChange' })
        return
      }

      blocks.forEach(el => {
        el.style.willChange = 'opacity, transform'
      })

      gsap.set(blocks, { autoAlpha: 0, y: 14, force3D: true })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out', duration: 0.58 },
        onComplete: clearWillChange
      })

      tl.to(blocks, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.085
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className='relative isolate overflow-hidden bg-background'>
      <div className='absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent' />

      <div className='relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-x-16 lg:gap-y-0 lg:px-8 lg:py-28'>
        <div
          data-nbcc-hero
          data-nbcc-animate
          data-nbcc-hero-content
          className='md:mb-8 flex flex-wrap items-center gap-3 lg:col-start-1'
        >
          <span className='inline-flex items-center gap-3 rounded-md border border-white/[0.18] bg-white/[0.92] px-3 py-2 shadow-sm'>
            <Image
              src={nbccLogo}
              alt='NBCC logo'
              width={150}
              height={60}
              className='h-9 w-auto object-contain'
            />
            <span className='h-8 w-px bg-neutral-300' aria-hidden />
            <span className='text-sm font-semibold text-neutral-950'>Medlemsfordel</span>
          </span>
        </div>

        <h1
          data-nbcc-hero
          data-nbcc-animate
          data-nbcc-hero-content
          className='text-balance text-5xl font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-6xl sm:leading-[1.06] lg:col-start-1 lg:text-7xl lg:leading-[1.05]'
        >
          NBCC-medlemsfordel hos Utekos
        </h1>

        <div
          data-nbcc-hero-content
          className='relative aspect-[2184/1920] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 lg:col-start-2 lg:row-span-5 lg:row-start-1'
        >
          <Image
            src={heroImage}
            alt='Historisk NBCC-bilde'
            fill
            priority
            sizes='(max-width: 1024px) 100vw, 50vw'
            className='object-cover'
          />
        </div>

        <p
          data-nbcc-hero
          data-nbcc-animate
          data-nbcc-hero-content
          className='text-pretty text-lg md:py-2 leading-8   text-foreground sm:text-xl lg:col-start-1'
        >
          Helt siden 1960 har Norsk Bobil og Caravan Club samlet folk rundt de gode opplevelsene og gleden av
          å treffe andre campingelskere. Utekos deler lidenskapen for denne type sosiale og komfortable
          utendørsøyeblikk. Derfor gir vi deg en hyggelig medlemsrabatt, slik at du kan ta med deg enda mer
          varme og komfort ut i de sene kveldstimene.
        </p>

        <div
          data-nbcc-hero
          data-nbcc-animate
          data-nbcc-hero-content
          className='grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start lg:col-start-1 lg:mt-9'
        >
          <Button
            asChild
            size='lg'
            className='h-12 w-full justify-center rounded-md bg-primary px-6 text-[15px] font-semibold text-[#19140d] hover:bg-[#ffd886] sm:w-auto'
          >
            <Link
              href='#produkter'
              data-track='NbccHeroProductsClick'
              data-track-data={JSON.stringify(nbccHeroTracking.primary)}
            >
              Finn din favoritt
              <MoveRightIcon size={18} animateOnHover='default' />
            </Link>
          </Button>

          <NbccAiSummaryButton
            intent='how-to-use'
            idleLabel='Få rabattveiledning'
            completedLabel='Vis rabattveiledningen'
            trackingName='NbccHeroHowToAiClick'
            trackingData={nbccHeroTracking.secondary}
            containerClassName='min-w-0 w-full'
            panelClassName='w-full sm:max-w-[32rem]'
            buttonClassName='h-12 w-full justify-center gap-2 rounded-md border-white/25 bg-cloud-dancer px-6 text-[15px] font-semibold text-background hover:bg-overcast sm:w-auto'
          />
        </div>

        <div
          data-nbcc-hero
          data-nbcc-animate
          data-nbcc-hero-content
          className='grid gap-4 border-t border-white/[0.16] pt-6 text-sm text-foreground sm:grid-cols-3 lg:col-start-1 lg:mt-12'
        >
          <div className='flex items-start gap-3'>
            <BadgeCheckIcon size={22} animate='check' className='mt-0.5 shrink-0 text-primary' aria-hidden />
            <span>Et beskyttende ytre forent med en silkemyk og tilpasningsdyktig kjerne.</span>
          </div>
          <div className='flex items-start gap-3'>
            <CompassIcon
              size={22}
              animate='default-loop'
              loop
              loopDelay={2400}
              className='mt-0.5 shrink-0 text-[#c7e6c9]'
              aria-hidden
            />
            <span>Lar deg ta regien over egen komfort. Helt friksjonsfritt.</span>
          </div>
          <div className='flex items-start gap-3'>
            <ClockIcon size={22} animate='default' className='mt-0.5 shrink-0 text-[#d8e7ff]' aria-hidden />
            <span>Fra morgenkaffe til kveldsamling. Bare justér, form og nyt.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
