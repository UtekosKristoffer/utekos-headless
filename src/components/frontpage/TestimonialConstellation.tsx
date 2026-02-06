// Path: src/components/frontpage/TestimonialConstellation.tsx
'use client'

import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'
import { TestimonialSection } from './TestimonialSection'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function TestimonialConstellation() {
  const containerRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
            start: 'top 85%', // Starter når toppen av elementet er 85% ned på skjermen
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className='relative mx-auto py-24 md:py-32 overflow-hidden'
    >
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-sky-900/10 blur-[120px] rounded-full pointer-events-none' />

      <div className='relative z-10 mx-auto px-4 sm:px-6 lg:px-8 md:max-w-7xl'>
        <div ref={headerRef} className='mb-20 text-center max-w-3xl mx-auto'>
          {/* Trust Badge */}
          <div className='animate-header-item inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-md shadow-lg shadow-sky-900/5'>
            <div className='flex gap-0.5'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i === 4 ?
                      'fill-sky-500/50 text-sky-500' // Halv stjerne visuelt (valgfritt, eller full fill for 4.8)
                    : 'fill-sky-500 text-sky-500'
                  }`}
                />
              ))}
            </div>
            <span className='h-4 w-px bg-neutral-700 mx-2' />
            <span className='text-xs font-medium text-neutral-300 tracking-wide uppercase'>
              4.8 av 5 stjerner
            </span>
          </div>

          <h2 className='animate-header-item text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6'>
            Hva sier andre{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-white'>
              livsnytere?
            </span>
          </h2>

          <p className='animate-header-item mx-auto text-lg md:text-xl text-neutral-400 leading-relaxed font-light'>
            Ekte tilbakemeldinger fra kunder som, i likhet med deg, verdsetter{' '}
            {/* Graffiti Effect: Skewed background box */}
            <span className='relative inline-block px-2 mx-1'>
              <span className='absolute inset-0 bg-sky-500/15 -skew-y-2 -rotate-2 rounded-sm -z-10 backdrop-blur-[1px] border border-sky-500/10' />
              <span className='relative font-medium text-sky-100/90'>
                kompromissløs kvalitet
              </span>
            </span>{' '}
            og {/* Elegant Underline: Gradient bottom border */}
            <span className='relative inline-block'>
              <span className='relative z-10'>varige opplevelser utendørs</span>
              <span className='absolute left-0 -bottom-0.5 w-full h-[2px] bg-gradient-to-r from-transparent via-sky-400/60 to-transparent' />
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
