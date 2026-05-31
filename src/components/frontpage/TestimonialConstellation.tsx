// Path: src/components/frontpage/TestimonialConstellation.tsx
'use client'

import { useRef, useLayoutEffect } from 'react'
import { Star, StarHalf } from 'lucide-react'
import { TestimonialSection } from './TestimonialSection'
import { color } from 'framer-motion'

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
    <article ref={containerRef} className='relative mx-auto overflow-hidden bg-havdyp py-24 md:py-32'>
      <hgroup className='absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-sky-900/10 blur-[120px] rounded-full pointer-events-none'>
        <h2 className='animate-header-item text-cloud-dancer! text-center'>Hva sier andre livsnytere?</h2>
        <p className='animate-header-item text-cloud-dancer! text-center'>
          Ekte tilbakemeldinger fra ekte mennesker, som verdsetter kompromissløs kvalitet og varige
          opplevelser utendørs
        </p>
      </hgroup>

      <div className='relative z-10 mx-auto px-4 sm:px-6 lg:px-8 md:max-w-7xl'>
        <div ref={headerRef} className='mb-20 text-center max-w-3xl mx-auto'>
          <div className='animate-header-item mb-8 inline-flex items-center gap-2 rounded-full border border-dusted-peri/40 bg-dusted-peri px-4 py-2 shadow-lg shadow-dusted-peri/12'>
            <div className='flex gap-0.5'>
              {[...Array(5)].map((_, i) =>
                i < 4 ?
                  <Star size={16} color='var(--color-primary)' fill='var(--color-primary)' key={i} />
                : <StarHalf size={16} color='var(--color-primary)' fill='var(--color-primary)' key={i} />
              )}
            </div>
            <small className='text-background'>4.8</small>
            <small className='text-background'>/ 5</small>
          </div>

          <h2 className='animate-header-item text-cloud-dancer! mb-6'>
            Hva sier andre{' '}
            <span className='text-transparent bg-cloud-dancer bg-clip-text outline-hidden font-bold'>
              livsnytere?
            </span>
          </h2>

          <p className='animate-header-item mx-auto text-cloud-dancer'>
            Ekte tilbakemeldinger fra ekte mennesker, som verdsetter kompromissløs kvalitet og varige
            opplevelser utendørs
          </p>
        </div>

        <div className='relative z-20'>
          <TestimonialSection />
        </div>
      </div>
    </article>
  )
}
