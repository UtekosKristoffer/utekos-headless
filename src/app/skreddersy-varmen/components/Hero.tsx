// Path: src/app/skreddersy-varmen/components/Hero.tsx
'use client'

import Image from 'next/image'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from 'framer-motion'
import { Star, ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/className'
import CinemaOne from '@public/cinema-twilight.png'
import MobileOne from '@public/terrace-4-5.png'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'

gsap.registerPlugin(useGSAP)

const SCROLL_TARGETS = {
  purchase: 'purchase-section',
  solution: 'section-solution'
} as const

function smoothScrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
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

  useGSAP(
    () => {
      if (reduced) {
        gsap.set(
          [
            '.sv-headline-1',
            '.sv-headline-2',
            '.sv-body',
            '.sv-cta-row',
            '.sv-trust',
            '.sv-badge',
            '.sv-scroll-hint'
          ],
          { clearProps: 'all' }
        )
        return
      }

      const tl = gsap.timeline()

      // 1. UTEKOS — letters materialize from below, one by one
      tl.fromTo(
        '.gsap-char',
        { yPercent: 120, rotationX: -55, opacity: 0 },
        {
          yPercent: 0,
          rotationX: 0,
          opacity: 1,
          duration: 1.5,
          stagger: { each: 0.065, ease: 'power2.out' },
          ease: 'power4.out'
        }
      )

      // 2. "Skreddersy varmen." — clips up from below through overflow container
      tl.fromTo(
        '.sv-headline-1',
        { yPercent: 105, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1.1,
          ease: 'power3.out'
        },
        '-=0.85'
      )

      // 3. "Forleng kvelden." — italic sweep with tilt correction
      tl.fromTo(
        '.sv-headline-2',
        { yPercent: 100, rotationZ: 1.6, autoAlpha: 0 },
        {
          yPercent: 0,
          rotationZ: 0,
          autoAlpha: 1,
          duration: 1.0,
          ease: 'power3.out'
        },
        '-=0.7'
      )

      // 4. Body copy — blur fade up
      tl.fromTo(
        '.sv-body',
        { y: 22, autoAlpha: 0, filter: 'blur(6px)' },
        {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 1.0,
          ease: 'power2.out'
        },
        '-=0.6'
      )

      // 5. CTA buttons — spring entrance
      tl.fromTo(
        '.sv-cta-row',
        { y: 22, autoAlpha: 0, scale: 0.97 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.95,
          ease: 'back.out(1.7)'
        },
        '-=0.5'
      )

      // 6. Trust signals — slide in from left
      tl.fromTo(
        '.sv-trust',
        { x: -18, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power2.out'
        },
        '-=0.4'
      )

      // 7. Stock badge — scale fade up
      tl.fromTo(
        '.sv-badge',
        { y: 10, autoAlpha: 0, scale: 0.94 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out'
        },
        '-=0.35'
      )

      // 8. Bottom scroll hint — final reveal
      tl.fromTo(
        '.sv-scroll-hint',
        { opacity: 0, y: -8 },
        {
          opacity: 0.6,
          y: 0,
          duration: 0.9,
          ease: 'power2.out'
        },
        '-=0.15'
      )
    },
    { scope: heroRef }
  )

  return (
    <section
      ref={heroRef}
      aria-labelledby='hero-headline'
      className='relative w-full min-h-[calc(100svh-70px)] xl:min-h-[calc(100svh-86px)] overflow-hidden bg-[#1A1612] text-cloud-dancer font-google-sans'
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
          priority
          fetchPriority='high'
          quality={80}
          sizes='(min-width: 768px) 0px, 100vw'
          placeholder='blur'
          className='object-cover'
        />
      </motion.div>

      {/* Gradient overlays */}
      <motion.div
        aria-hidden
        className='absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-black/40 via-50% to-[#1A1612]/95'
        style={{ opacity: overlayOpacity }}
      />
      <div
        aria-hidden
        className='absolute inset-y-0 left-0 z-[1] hidden w-1/2 bg-gradient-to-r from-black/55 via-black/15 to-transparent md:block'
      />

      {/* Main content — scroll parallax via framer-motion, entrance via GSAP */}
      <motion.div
        className='relative z-10 mx-auto flex min-h-[calc(100svh-70px)] xl:min-h-[calc(100svh-86px)] w-full max-w-[1400px] flex-col items-start justify-center px-6 pt-20 pb-16 md:px-12 md:pt-24 lg:px-20'
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className='max-w-2xl'>
          {/* Utekos wordmark — letter-by-letter GSAP entrance */}
          <div
            className='mb-5 aspect-[1281/312] text-overcast h-11 sm:h-14 md:mb-6 md:h-16 lg:h-20 drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]'
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
            className='font-google-sans text-4xl leading-[0.92] tracking-[-0.01em]  font-semibold sm:text-5xl md:text-6xl lg:text-7xl [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]'
          >
            <div className='overflow-hidden'>
              <span className='sv-headline-1 text-ancient-water block whitespace-nowrap'>
                Skreddersy varmen.
              </span>
            </div>
            <div className='overflow-hidden mt-3'>
              <span className='sv-headline-2 block text-bleached-mauve italic font-google-sans font-semibold max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>
                Forleng kvelden.
              </span>
            </div>
          </h1>

          {/* Body copy */}
          <p className='sv-body font-google-sans mt-7 max-w-xl text-base leading-[1.45] text-cloud-dancer md:text-lg lg:text-xl [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]'>
            Kompromissløs komfort{' '}
            <span className='text-cloud-dancer'> og </span>
            overlegen allsidighet.
          </p>

          {/* CTA row */}
          <div className='sv-cta-row mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5'>
            <button
              type='button'
              onClick={() => smoothScrollTo(SCROLL_TARGETS.purchase)}
              data-track='HeroCtaSkreddersyVarmen'
              className='group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-maritime-blue px-7 py-4 text-base font-semibold tracking-wide text-cloud-dancer shadow-[0_10px_40px_-8px_rgba(60,80,160,0.5)] transition-all duration-300 hover:bg-maritime-blue-cmyk-coated hover:shadow-[0_14px_50px_-8px_rgba(60,80,160,0.72)] active:scale-[0.97] md:text-lg'
            >
              <span className='relative z-10'>Finn din favoritt</span>
              <ArrowRight
                className='relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5'
                aria-hidden
              />
              <span
                aria-hidden
                className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full'
              />
            </button>

            <button
              type='button'
              onClick={() => smoothScrollTo(SCROLL_TARGETS.solution)}
              data-track='HeroSecondaryCtaSkreddersyVarmen'
              className='group inline-flex items-center gap-2 text-sm font-google-sans font-semibold uppercase text-cloud-dancer/85 transition-colors hover:text-primary-button md:text-base'
            >
              <ChevronDown
                className='h-4 w-4 transition-transform group-hover:translate-y-0.5'
                aria-hidden
              />
            </button>
          </div>

          {/* Trust signals */}
          <div
            className='sv-trust mt-9 flex items-center gap-3 text-sm text-cloud-dancer/85 md:text-[15px]'
            aria-label='Kundeanmeldelser'
          >
            <div
              className='flex gap-0.5 text-[#FFD56B] [filter:drop-shadow(0_1px_4px_rgba(0,0,0,0.5))]'
              aria-hidden
            >
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} fill='currentColor' size={15} strokeWidth={0} />
              ))}
            </div>
            <span className='font-semibold text-cloud-dancer'>4.8/5</span>
          </div>

          {/* Stock badge */}
          <div className='sv-badge mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs text-cloud-dancer/85 backdrop-blur-md'>
            <span className='relative flex h-2 w-2' aria-hidden>
              <span
                className={cn(
                  'absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70',
                  !reduced && 'animate-ping'
                )}
              />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-400' />
            </span>
            <span className='font-medium'>På lager</span>
            <span className='text-cloud-dancer/45'>·</span>
            <span>Levering 2–5 dager</span>
            <span className='hidden text-cloud-dancer/45 sm:inline'>·</span>
            <span className='hidden sm:inline'>14 dagers retur</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom scroll hint */}
      <button
        type='button'
        onClick={() => smoothScrollTo(SCROLL_TARGETS.solution)}
        aria-label='Bla videre'
        className='sv-scroll-hint absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cloud-dancer/60 transition-[opacity,transform] duration-300 hover:opacity-100 hover:translate-y-1 md:flex'
      >
        <span className='text-[10px] font-semibold uppercase tracking-[0.25em]'>
          Bla
        </span>
        <ChevronDown size={20} className='animate-bounce' aria-hidden />
      </button>
    </section>
  )
}
