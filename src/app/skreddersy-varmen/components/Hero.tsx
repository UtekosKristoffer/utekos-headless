// Path: src/app/skreddersy-varmen/components/Hero.tsx
'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Star, ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/className'
import CinemaOne from '@public/cinema-twilight.png'
import MobileOne from '@public/terrace-4-5.png'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
import { createGsapDevTools } from '@/lib/gsap/createGsapDevTools'
import { loadGsap } from '@/lib/gsap/loadGsap'
import { scrollToElement } from '@/lib/gsap/scrollToElement'

const SCROLL_TARGETS = {
  purchase: 'purchase-section',
  solution: 'section-solution'
} as const

function smoothScrollTo(id: string, reducedMotion: boolean | null) {
  void scrollToElement(id, {
    offsetY: 72,
    reducedMotion
  })
}

export function Hero() {
  const reduced = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 80])
  const imageScale = useTransform(scrollY, [0, 600], [1, reduced ? 1 : 1.06])
  const overlayOpacity = useTransform(scrollY, [0, 400], [1, 0.55])
  const contentY = useTransform(scrollY, [0, 400], [0, reduced ? 0 : -30])
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0.4])

  useEffect(() => {
    let cleanup: (() => void) | null = null
    let cancelled = false

    const mountAnimation = async () => {
      const gsap = await loadGsap()
      if (cancelled || !heroRef.current) {
        return
      }

      const context = gsap.context(() => {
        if (reduced) {
          gsap.set(
            [
              '.sv-headline-1',
              '.sv-headline-2',
              '.sv-body',
              '.sv-cta-row',
              '.sv-trust',
              '.sv-availability',
              '.sv-scroll-hint'
            ],
            { clearProps: 'all' }
          )
          return
        }

        const tl = gsap.timeline({ id: 'skreddersy-varmen-hero' })

        // 1. UTEKOS — letters materialize from below, one by one
        tl.fromTo(
          '.gsap-char',
          {
            yPercent: 120,
            rotationX: -55,
            opacity: 0,
            willChange: 'transform, opacity'
          },
          {
            yPercent: 0,
            rotationX: 0,
            opacity: 1,
            duration: 1.5,
            stagger: { each: 0.065, ease: 'power2.out' },
            ease: 'power4.out',
            clearProps: 'willChange'
          }
        )

        // 2. "Skreddersy varmen." — clips up from below through overflow container
        tl.fromTo(
          '.sv-headline-1',
          {
            yPercent: 105,
            autoAlpha: 0,
            willChange: 'transform, opacity'
          },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.1,
            ease: 'power3.out',
            clearProps: 'willChange'
          },
          '-=0.85'
        )

        // 3. "Forleng kvelden." — italic sweep with tilt correction
        tl.fromTo(
          '.sv-headline-2',
          {
            yPercent: 100,
            rotationZ: 1.6,
            autoAlpha: 0,
            willChange: 'transform, opacity'
          },
          {
            yPercent: 0,
            rotationZ: 0,
            autoAlpha: 1,
            duration: 1.0,
            ease: 'power3.out',
            clearProps: 'willChange'
          },
          '-=0.7'
        )

        // 4. Body copy — blur fade up
        tl.fromTo(
          '.sv-body',
          {
            y: 22,
            autoAlpha: 0,
            filter: 'blur(6px)',
            willChange: 'transform, opacity, filter'
          },
          {
            y: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 1.0,
            ease: 'power2.out',
            clearProps: 'willChange'
          },
          '-=0.6'
        )

        // 5. CTA buttons — spring entrance
        tl.fromTo(
          '.sv-cta-row',
          {
            y: 22,
            autoAlpha: 0,
            scale: 0.97,
            willChange: 'transform, opacity'
          },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.95,
            ease: 'power3.out',
            clearProps: 'willChange'
          },
          '-=0.5'
        )

        // 6. Trust signals — slide in from left
        tl.fromTo(
          '.sv-trust',
          { x: -18, autoAlpha: 0, willChange: 'transform, opacity' },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power2.out',
            clearProps: 'willChange'
          },
          '-=0.4'
        )

        // 7. Availability line — scale fade up
        tl.fromTo(
          '.sv-availability',
          {
            y: 10,
            autoAlpha: 0,
            scale: 0.94,
            willChange: 'transform, opacity'
          },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            clearProps: 'willChange'
          },
          '-=0.35'
        )

        // 8. Bottom scroll hint — final reveal
        tl.fromTo(
          '.sv-scroll-hint',
          { opacity: 0, y: -8, willChange: 'transform, opacity' },
          {
            opacity: 0.6,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            clearProps: 'willChange'
          },
          '-=0.15'
        )

        void createGsapDevTools({
          animation: tl,
          id: 'skreddersy-varmen-hero'
        })
      }, heroRef.current)

      cleanup = () => {
        context.revert()
      }
    }

    void mountAnimation()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [reduced])

  return (
    <section
      ref={heroRef}
      aria-labelledby='hero-headline'
      className='relative w-full min-h-[calc(100svh-70px)] xl:min-h-[calc(100svh-86px)] overflow-hidden bg-maritime-darkest text-cloud-dancer font-google-sans'
    >
      {/* Background — desktop */}
      <motion.div
        className='absolute inset-0 z-0 hidden md:block'
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={CinemaOne}
          alt='Utekos kveldsstemning på terrassen'
          fill
          priority
          fetchPriority='high'
          quality={90}
          sizes='(max-width: 767px) 0px, 100vw'
          placeholder='blur'
          className='object-cover'
        />
      </motion.div>

      {/* Background — mobile */}
      <motion.div
        className='absolute inset-0 z-0 block md:hidden'
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={MobileOne}
          alt='Utekos kveldsstemning'
          fill
          loading='eager'
          quality={80}
          sizes='(min-width: 768px) 0px, 100vw'
          placeholder='blur'
          className='object-cover'
        />
      </motion.div>

      {/* Gradient overlays */}
      <motion.div
        aria-hidden
        className='absolute inset-0 z-[1] bg-gradient-to-b from-maritime-darkest/35 via-maritime-darkest/55 via-50% to-maritime-darkest/95'
        style={{ opacity: overlayOpacity }}
      />
      <div
        aria-hidden
        className='absolute inset-y-0 left-0 z-[1] hidden w-1/2 bg-gradient-to-r from-maritime-darkest/80 via-maritime-darkest/20 to-transparent md:block'
      />

      {/* Main content — scroll parallax via motion/react, entrance via GSAP */}
      <motion.div
        className='relative z-10 mx-auto flex min-h-[calc(100svh-70px)] xl:min-h-[calc(100svh-86px)] w-full max-w-[1400px] flex-col items-start justify-center px-6 pt-20 pb-16 md:px-12 md:pt-24 lg:px-20'
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className='max-w-2xl'>
          {/* Utekos wordmark — letter-by-letter GSAP entrance */}
          <div
            className='mb-5 aspect-[1281/312] text-overcast h-11 drop-shadow-lg sm:h-14 md:mb-6 md:h-16 lg:h-20'
            style={{ perspective: '900px' }}
          >
            <UtekosWordmark
              animated={true}
              className='size-full text-overcast will-change-transform'
            />
          </div>

          {/* Headlines — overflow-hidden parents for clip reveal effect */}
          <h1
            id='hero-headline'
            aria-label='Skreddersy varmen. Forleng kvelden.'
            className='font-google-sans text-4xl font-bold leading-[0.92] tracking-[-0.01em] drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl'
          >
            <div className='overflow-hidden'>
              <span className='sv-headline-1 block whitespace-nowrap text-cloud-dancer'>
                Skreddersy varmen.
              </span>
            </div>
            <div className='overflow-hidden mt-3'>
              <span className='sv-headline-2 block max-w-4xl text-3xl font-google-sans font-bold italic text-overcast sm:text-4xl md:text-5xl lg:text-6xl'>
                Forleng kvelden.
              </span>
            </div>
          </h1>

          {/* Body copy */}
          <p className='sv-body mt-7 max-w-xl font-google-sans text-base leading-[1.45] text-cloud-dancer drop-shadow-md md:text-lg lg:text-xl'>
            Kompromissløs komfort{' '}
            <span className='text-cloud-dancer'> og </span>
            overlegen allsidighet.
          </p>

          {/* CTA row */}
          <div className='sv-cta-row mt-9 flex w-full max-w-[19rem] flex-col items-stretch gap-3'>
            <BrandBadge
              asChild
              backgroundColor='var(--color-cloud-dancer)'
              textColor='var(--color-maritime-darkest)'
              className='h-12 w-full px-5 py-0 text-sm font-semibold leading-none tracking-normal shadow-xl transition-[filter,transform] hover:brightness-95 active:scale-[0.97] md:h-14 md:text-base'
            >
              <button
                type='button'
                onClick={() => smoothScrollTo(SCROLL_TARGETS.purchase, reduced)}
                data-track='HeroCtaSkreddersyVarmen'
                className='group inline-flex items-center gap-2 leading-none'
              >
                <span className='block leading-none'>Finn din favoritt</span>
                <ArrowRight
                  className='size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1'
                  aria-hidden
                />
              </button>
            </BrandBadge>

            <BrandBadge
              asChild
              backgroundColor='var(--color-overcast)'
              textColor='var(--color-maritime-darkest)'
              className='h-12 w-full px-5 py-0 text-sm font-semibold leading-none tracking-normal shadow-sm transition-[filter,transform] hover:brightness-95 active:scale-[0.97] md:h-14 md:text-base'
            >
              <button
                type='button'
                onClick={() => smoothScrollTo(SCROLL_TARGETS.solution, reduced)}
                data-track='HeroSecondaryCtaSkreddersyVarmen'
                className='group inline-flex items-center gap-2 leading-none'
              >
                <span className='block leading-none'>Se løsningen</span>
                <ChevronDown className='size-4 shrink-0' aria-hidden />
              </button>
            </BrandBadge>
          </div>

          {/* Trust signals */}
          <div
            className='sv-trust mt-9 flex items-center gap-3 text-sm text-cloud-dancer/85 md:text-[15px]'
            aria-label='Kundeanmeldelser'
          >
            <div
              className='flex gap-0.5 text-primary-button drop-shadow-md'
              aria-hidden
            >
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} fill='currentColor' size={15} strokeWidth={0} />
              ))}
            </div>
            <span className='font-semibold text-cloud-dancer'>4.8/5</span>
          </div>

          {/* Availability */}
          <p
            className='sv-availability mt-5 flex w-fit max-w-full flex-nowrap items-center whitespace-nowrap font-google-sans text-xs font-medium leading-[1.45] tracking-normal text-cloud-dancer/85 md:text-sm'
            aria-label='På lager, levering 2 til 5 dager, 14 dagers retur'
          >
            <span>På lager</span>
            <span className='mx-2 text-cloud-dancer/45'>·</span>
            <span>Levering 2–5 dager</span>
            <span className='mx-2 hidden text-cloud-dancer/45 lg:inline'>
              ·
            </span>
            <span className='hidden lg:inline'>14 dagers retur</span>
          </p>
        </div>
      </motion.div>

      {/* Bottom scroll hint */}
      <button
        type='button'
        onClick={() => smoothScrollTo(SCROLL_TARGETS.solution, reduced)}
        aria-label='Bla videre'
        className='sv-scroll-hint absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cloud-dancer/60 transition-[opacity,transform] duration-300 hover:opacity-100 hover:translate-y-1 md:flex'
      >
        <span className='text-[10px] font-semibold tracking-normal'>
          Bla videre
        </span>
        <ChevronDown
          size={20}
          className={cn(!reduced && 'animate-bounce')}
          aria-hidden
        />
      </button>
    </section>
  )
}
