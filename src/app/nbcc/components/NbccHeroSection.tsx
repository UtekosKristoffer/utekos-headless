'use client'

import { BadgeCheckIcon } from '@/components/animate-icons/icons/badge-check'
import { ClockIcon } from '@/components/animate-icons/icons/clock'
import { CompassIcon } from '@/components/animate-icons/icons/compass'
import { MoveRightIcon } from '@/components/animate-icons/icons/move-right'
import { Button } from '@/components/ui/button'
import heroImage from '@public/nbcc-master-video.png'
import heroImageMobile from '@public/nbcc-mobile-master-2.png'
import nbccLogo from '@public/NBCC_logo_RGB_lys_bg.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

import { nbccHeroTracking } from '../data/nbccLandingPageContent'
import { NbccAiSummaryButton } from './NbccAiSummaryButton'

gsap.registerPlugin(useGSAP)

/** Kun tekst / innhold — ikke fullskjerms-bilder (tung scale + opacity konflikt med Tailwind 0.72). */
const CONTENT_SELECTOR = '[data-nbcc-hero-content]'

export function NbccHeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = sectionRef.current
      if (!root) return

      const blocks = gsap.utils.toArray<HTMLElement>(CONTENT_SELECTOR, root)

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
    <section
      ref={sectionRef}
      className='relative isolate min-h-[76svh] overflow-hidden bg-[#15120e]'
    >
      <Image
        src={heroImageMobile}
        alt='Historisk NBCC-bilde'
        fill
        priority
        sizes='100vw'
        className='object-cover object-[center_65%] opacity-[0.72] md:hidden'
      />
      <Image
        src={heroImage}
        alt='Historisk NBCC-bilde'
        fill
        priority
        sizes='100vw'
        className='hidden object-cover object-center opacity-[0.72] md:block'
      />
      <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,7,0.94)_0%,rgba(12,10,7,0.78)_38%,rgba(12,10,7,0.28)_72%,rgba(12,10,7,0.64)_100%)]' />
      <div className='absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent' />

      <div className='relative mx-auto flex min-h-[76svh] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8'>
        <div className='w-full max-w-[calc(100vw-2rem)] min-w-0 md:max-w-3xl'>
          <div
            data-nbcc-hero
            data-nbcc-animate
            data-nbcc-hero-content
            className='mb-8 flex flex-wrap items-center gap-3'
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
              <span className='text-sm font-semibold text-neutral-950'>
                Medlemsfordel
              </span>
            </span>
          </div>

          <h1
            data-nbcc-hero
            data-nbcc-animate
            data-nbcc-hero-content
            className='max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-1rem)] text-balance text-5xl font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:max-w-2xl sm:text-6xl sm:leading-[1.06] lg:text-7xl lg:leading-[1.05]'
          >
            NBCC-medlemsfordel hos Utekos
          </h1>

          <p
            data-nbcc-hero
            data-nbcc-animate
            data-nbcc-hero-content
            className='mt-7 max-w-[calc(100vw-2rem)] text-pretty text-lg leading-8 text-[#f5efe4]/[0.9] sm:max-w-2xl sm:text-xl sm:leading-relaxed'
          >
            Helt siden 1960 har Norsk Bobil og Caravan Club samlet folk rundt de
            gode opplevelsene og gleden av å treffe andre campingelskere. Utekos
            deler lidenskapen for denne type sosiale og komfortable
            utendørsøyeblikk. Derfor gir vi deg en hyggelig medlemsrabatt, slik
            at du kan ta med deg enda mer varme og komfort ut i de sene
            kveldstimene.
          </p>

          <div
            data-nbcc-hero
            data-nbcc-animate
            data-nbcc-hero-content
            className='mt-9 flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-start'
          >
            <Button
              asChild
              size='lg'
              className='h-12 w-full justify-center rounded-md bg-[#f0c36a] px-6 text-[15px] font-semibold text-[#19140d] hover:bg-[#ffd886] sm:w-auto'
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
              containerClassName='w-full sm:w-auto'
              panelClassName='w-full sm:w-[32rem]'
              buttonClassName='h-12 w-full justify-center gap-2 rounded-md border-white/25 bg-utekos-brown/90 px-6 text-[15px] font-semibold text-white hover:bg-utekos-brown/60 sm:w-auto'
            />
          </div>

          <div
            data-nbcc-hero
            data-nbcc-animate
            data-nbcc-hero-content
            className='mt-12 grid max-w-3xl gap-4 border-t border-white/[0.16] pt-6 text-sm text-[#f5efe4]/[0.82] sm:grid-cols-3'
          >
            <div className='flex items-start gap-3'>
              <BadgeCheckIcon
                size={22}
                animate='check'
                className='mt-0.5 shrink-0 text-[#f0c36a]'
                aria-hidden
              />
              <span>
                Et beskyttende ytre forent med en silkemyk og tilpasningsdyktig
                kjerne.
              </span>
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
              <span>
                Lar deg ta regien over egen komfort. Helt friksjonsfritt.
              </span>
            </div>
            <div className='flex items-start gap-3'>
              <ClockIcon
                size={22}
                animate='default'
                className='mt-0.5 shrink-0 text-[#d8e7ff]'
                aria-hidden
              />
              <span>
                Fra morgenkaffe til kveldsamling. Bare justér, form og nyt.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
