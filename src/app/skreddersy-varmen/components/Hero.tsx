// Path: src/app/skreddersy-varmen/components/Hero.tsx
'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { preload } from 'react-dom'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants
} from 'framer-motion'
import { Star, ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/className'
import CinemaOne from '@public/cinema-twilight.png'
import MobileOne from '@public/terrace-4-5.png'

const WORDMARK_URL = '/Wordmark%20Black.png'

const SCROLL_TARGETS = {
  purchase: 'purchase-section',
  solution: 'section-solution'
} as const

function smoothScrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  preload(WORDMARK_URL, { as: 'image', fetchPriority: 'high' })

  const reduced = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 80])
  const imageScale = useTransform(scrollY, [0, 600], [1, reduced ? 1 : 1.06])
  const overlayOpacity = useTransform(scrollY, [0, 400], [1, 0.55])
  const contentY = useTransform(scrollY, [0, 400], [0, reduced ? 0 : -30])
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0.4])

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.09,
        delayChildren: reduced ? 0 : 0.05
      }
    }
  }

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const headlineRise: Variants = {
    hidden: { opacity: 1, y: reduced ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const wordmarkReveal: Variants = {
    hidden: {
      opacity: 0,
      y: reduced ? 0 : 14,
      scale: reduced ? 1 : 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section
      ref={heroRef}
      aria-labelledby='hero-headline'
      className='relative w-full min-h-[calc(100svh-70px)] xl:min-h-[calc(100svh-86px)] overflow-hidden bg-[#1A1612] text-[#F4F1EA]'
    >
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
          quality={88}
          sizes='100vw'
          placeholder='blur'
          className='object-cover'
        />
      </motion.div>

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
          quality={85}
          sizes='100vw'
          placeholder='blur'
          className='object-cover'
        />
      </motion.div>

      <motion.div
        aria-hidden
        className='absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-black/40 via-50% to-[#1A1612]/95'
        style={{ opacity: overlayOpacity }}
      />
      <div
        aria-hidden
        className='absolute inset-y-0 left-0 z-[1] hidden w-1/2 bg-gradient-to-r from-black/55 via-black/15 to-transparent md:block'
      />

      <motion.div
        className='relative z-10 mx-auto flex min-h-[calc(100svh-70px)] xl:min-h-[calc(100svh-86px)] w-full max-w-[1400px] flex-col items-start justify-center px-6 pt-20 pb-16 md:px-12 md:pt-24 lg:px-20'
        style={{ y: contentY, opacity: contentOpacity }}
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <div className='max-w-2xl'>
          <motion.div
            variants={wordmarkReveal}
            role='img'
            aria-label='Utekos®'
            className='mb-5 aspect-[1281/312] h-11 bg-[#F4F1EA] sm:h-14 md:mb-6 md:h-16 lg:h-20'
            style={{
              WebkitMaskImage: `url('${WORDMARK_URL}')`,
              maskImage: `url('${WORDMARK_URL}')`,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskPosition: 'left center',
              maskPosition: 'left center',
              filter: 'drop-shadow(0 2px 20px rgba(0,0,0,0.5))'
            }}
          />

          <motion.h1
            id='hero-headline'
            variants={headlineRise}
            className='font-serif text-4xl leading-[1.02] tracking-tight text-[#F4F1EA] sm:text-5xl md:text-6xl lg:text-7xl [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]'
          >
            Skreddersy varmen.
            <span className='mt-3 block font-light italic text-[#E07A5F] text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>
              Forleng kvelden.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className='mt-7 max-w-xl text-base leading-relaxed text-[#F4F1EA]/85 md:text-lg lg:text-xl [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]'
          >
            Kompromissløs komfort <span className='text-[#F4F1EA]'> og </span>
            overlegen allsidighet.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className='mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5'
          >
            <button
              type='button'
              onClick={() => smoothScrollTo(SCROLL_TARGETS.purchase)}
              data-track='HeroCtaSkreddersyVarmen'
              className='group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#E07A5F] px-7 py-4 text-base font-semibold tracking-wide text-white shadow-[0_10px_40px_-8px_rgba(224,122,95,0.6)] transition-all duration-300 hover:bg-[#D06A4F] hover:shadow-[0_14px_50px_-8px_rgba(224,122,95,0.75)] active:scale-[0.97] md:text-lg'
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
              className='group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#F4F1EA]/85 transition-colors hover:text-[#E07A5F] md:text-base'
            >
              <ChevronDown
                className='h-4 w-4 transition-transform group-hover:translate-y-0.5'
                aria-hidden
              />
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className='mt-9 flex items-center gap-3 text-sm text-[#F4F1EA]/85 md:text-[15px]'
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
            <span className='font-semibold text-[#F4F1EA]'>4.8/5</span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className='mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs text-[#F4F1EA]/85 backdrop-blur-md'
          >
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
            <span className='text-[#F4F1EA]/45'>·</span>
            <span>Levering 2–5 dager</span>
            <span className='hidden text-[#F4F1EA]/45 sm:inline'>·</span>
            <span className='hidden sm:inline'>14 dagers retur</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        type='button'
        onClick={() => smoothScrollTo(SCROLL_TARGETS.solution)}
        aria-label='Bla videre'
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        whileHover={{ opacity: 1, y: 4 }}
        className='absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[#F4F1EA]/60 md:flex'
      >
        <span className='text-[10px] font-semibold uppercase tracking-[0.25em]'>
          Bla
        </span>
        <ChevronDown size={20} className='animate-bounce' aria-hidden />
      </motion.button>
    </section>
  )
}
