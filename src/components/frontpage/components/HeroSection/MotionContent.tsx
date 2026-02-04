'use client'

import { useRef } from 'react'
import { Award } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ChevronDownSection } from './ChevronDown'

gsap.registerPlugin(useGSAP)

export function MotionContent() {
  const container = useRef<HTMLDivElement>(null)
  const titleLetters = 'Utekos®'.split('')

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' }
      })

      tl.set('.gsap-badge-container', { autoAlpha: 1 })
      tl.fromTo(
        '.gsap-badge-bg',
        { width: 0, autoAlpha: 0 },
        { width: '100%', autoAlpha: 1, duration: 1.2, ease: 'power3.inOut' }
      ).fromTo(
        '.gsap-badge-content',
        { autoAlpha: 0, x: -10 },
        { autoAlpha: 1, x: 0, duration: 0.8 },
        '-=0.4'
      )

      tl.fromTo(
        '.gsap-char',
        {
          yPercent: 120,
          rotationX: -50,
          opacity: 0
        },
        {
          yPercent: 0,
          rotationX: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.05,
          ease: 'power4.out'
        },
        '-=1.0'
      )

      tl.fromTo(
        '.gsap-subtitle',
        { yPercent: 100, filter: 'blur(10px)', autoAlpha: 0 },
        {
          yPercent: 0,
          filter: 'blur(0px)',
          autoAlpha: 1,
          duration: 1.4
        },
        '-=1.2'
      )

      tl.fromTo(
        '.gsap-desc',
        { y: 20, autoAlpha: 0, filter: 'blur(5px)' },
        {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power2.out'
        },
        '-=1.0'
      )

      tl.fromTo(
        '.gsap-splash',
        { scaleX: 0, opacity: 0, skewX: -20 },
        {
          scaleX: 1,
          opacity: 1,
          skewX: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.8)'
        },
        '-=0.6'
      )

      tl.fromTo(
        '.gsap-chevron',
        { autoAlpha: 0, y: -20 },
        { autoAlpha: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
        '-=0.8'
      )
    },
    { scope: container }
  )

  return (
    <div ref={container} className='mb-8 text-center'>
      <div className='gsap-badge-container invisible relative mx-auto mb-6 inline-flex h-10 items-center justify-center'>
        <div className='gsap-badge-bg absolute inset-0 rounded-full border border-sky-800/30 bg-sky-900/10' />
        <div className='gsap-badge-content relative flex items-center gap-2 px-4'>
          <Award className='h-4 w-4 text-sky-400' />
          <span className='bg-gradient-to-r from-sky-200 via-white to-sky-200 bg-clip-text text-sm font-medium text-transparent'>
            Funksjonell varme - siden 2020
          </span>
        </div>
      </div>

      <h1 className='mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl'>
        <span
          className='relative inline-block overflow-hidden pb-4 px-2 -mx-2'
          aria-label='Utekos'
        >
          {titleLetters.map((char, index) => (
            <span
              key={index}
              className='gsap-char inline-block origin-bottom will-change-transform'
            >
              {char}
            </span>
          ))}
        </span>

        <div className='overflow-hidden'>
          <span className='gsap-subtitle mt-2 block bg-gradient-to-r from-slate-900 via-slate-500 to-slate-900 bg-clip-text text-transparent outline-hidden'>
            Skreddersy varmen
          </span>
        </div>
      </h1>

      <div className='mx-auto mt-6 mb-12 max-w-2xl md:max-w-4xl'>
        <p
          data-nosnippet='false'
          className='gsap-desc invisible text-lg leading-relaxed text-foreground/80 lg:text-2xl'
        >
          Kompromissløs komfort. Overlegen allsidighet.{' '}
          <span className='relative inline-block whitespace-nowrap px-3 py-1'>
            <svg
              viewBox='0 0 200 40'
              preserveAspectRatio='none'
              className='gsap-splash absolute inset-0 -z-10 h-full w-full fill-sky-500/20 stroke-sky-400/30 stroke-1'
              style={{ transformOrigin: 'left center' }}
            >
              <path d='M0,20 Q5,5 20,8 T50,12 T80,5 T110,15 T140,8 T170,12 T200,10 L195,35 Q180,38 160,35 T120,32 T80,38 T40,34 T5,36 Z' />
            </svg>
            <span className='relative inline-block -rotate-1 font-semibold text-sky-100'>
              Juster, form og nyt.
            </span>
          </span>
        </p>
      </div>

      <div
        data-nosnippet
        className='gsap-chevron invisible justify-center md:flex'
      >
        <ChevronDownSection />
      </div>
    </div>
  )
}
