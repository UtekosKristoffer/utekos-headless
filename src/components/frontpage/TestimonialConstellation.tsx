// Path: src/components/frontpage/TestimonialConstellation.tsx
'use client'

import React, { useRef, useLayoutEffect } from 'react'
import { Star } from 'lucide-react'
import { TestimonialSection } from './TestimonialSection'

type GsapContext = {
  revert: () => void
}

export function TestimonialConstellation() {
  const containerRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let ctx: GsapContext | null = null
    let cancelled = false

    const run = async () => {
      let gsap: (typeof import('gsap'))['default']
      let ScrollTrigger: (typeof import('gsap/ScrollTrigger'))['ScrollTrigger']

      try {
        const [gsapModule, scrollTriggerModule] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger')
        ])

        gsap = gsapModule.default
        ScrollTrigger = scrollTriggerModule.ScrollTrigger
      } catch {
        return
      }

      const container = containerRef.current
      if (cancelled || !container) return

      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          '.animate-header-item',
          {
            y: 30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }, container)
    }

    void run()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    <section ref={containerRef} className='relative mx-auto overflow-hidden bg-havdyp py-24 md:py-32'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-sky-900/10 blur-[120px] rounded-full pointer-events-none' />

      <div className='relative z-10 mx-auto px-4 sm:px-6 lg:px-8 md:max-w-7xl'>
        <div ref={headerRef} className='mb-20 text-center max-w-3xl mx-auto'>
          {/* Trust Badge */}
          <div className='animate-header-item mb-8 inline-flex items-center gap-2 rounded-full border border-dusted-peri/40 bg-dusted-peri px-4 py-2 shadow-lg shadow-dusted-peri/12'>
            <div className='flex gap-0.5'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`size-3.5 ${
                    i === 4 ?
                      'fill-cloud-dancer text-cloud-dancer' // Halv stjerne visuelt
                    : 'fill-cloud-dancer text-cloud-dancer/80' // Full stjerne visuelt
                  }`}
                />
              ))}
            </div>
            <span className='mx-2 h-4 w-px bg-maritime-darkest/20' />
            <span className='text-xs font-medium tracking-[-0.01em] text-maritime-darkest/75'>
              4.8 av 5 stjerner
            </span>
          </div>

          <h2 className='animate-header-item text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-cloud-dancer! mb-6'>
            Hva sier andre{' '}
            <span className='text-transparent bg-cloud-dancer bg-clip-text outline-hiddenfont-bold tracking-normal'>
              livsnytere?
            </span>
          </h2>

          <p className='animate-header-item mx-auto text-lg md:text-xl text-cloud-dancer leading-relaxed font-light'>
            Ekte tilbakemeldinger fra kunder som, i likhet med deg, verdsetter{' '}
            <span className='relative inline-flex items-center justify-center px-1'>
              <span className='absolute inset-0 -z-10 -skew-x-12 rounded-md bg-gradient-to-r from-havdyp via-dusted-peri to-havdyp blur-[1px]' />
              <span className='absolute inset-0 -z-10 -rotate-1 rounded-lg border border-dusted-peri/35 bg-gradient-to-br from-havdyp/70 via-sweet-lavender/24 to-dusted-peri' />
              <span className='relative z-10 inline-block font-medium text-cloud-dancer'>
                kompromissløs kvalitet
              </span>
            </span>{' '}
            og{' '}
            <span className='relative inline-flex items-center justify-center px-1'>
              <span className='absolute inset-0 -z-10 -skew-x-12 rounded-md bg-gradient-to-r from-havdyp via-dusted-peri to-havdyp blur-[1px]' />
              <span className='absolute inset-0 -z-10 -skew-x-16 rounded-lg border border-ancient-water bg-gradient-to-br from-country-air via-ancient-water to-country-air' />
              <span className='relative z-10 inline-block'>varige opplevelser utendørs</span>
            </span>
            .
          </p>
        </div>

        <div className='relative z-20'>
          <TestimonialSection />
        </div>
      </div>
    </section>
  )
}
