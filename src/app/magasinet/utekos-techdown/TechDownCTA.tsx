'use client'

import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, PartyPopper } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function TechDownCTA() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(
        '.gsap-badge',
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'back.out(1.7)' }
      )

      tl.fromTo(
        '.gsap-title',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )

      tl.fromTo(
        '.gsap-desc',
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )

      tl.fromTo(
        '.gsap-button',
        { y: 20, autoAlpha: 0 },
        { 
          y: 0, 
          autoAlpha: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'back.out(1.2)' 
        },
        '-=0.4'
      )

      tl.fromTo(
        '.gsap-stat-item',
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out'
        },
        '-=0.2'
      )
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className='relative px-6 pb-24 pt-12 overflow-hidden'>
      <div className='absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]' />

      <div className='mx-auto max-w-4xl text-center'>
        <div className='gsap-badge mb-8 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 opacity-0'>
          <PartyPopper className='h-4 w-4 text-yellow-400' />
          <span className='text-sm font-bold uppercase tracking-wider text-yellow-400'>
            Lansering
          </span>
        </div>

        <h2 className='gsap-title mb-6 text-4xl font-light text-white opacity-0 md:text-5xl'>
          Opplev den <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">nye standarden</span> for komfort
        </h2>

        <p className='gsap-desc mx-auto mb-12 max-w-2xl text-xl text-gray-400 opacity-0'>
          Utekos TechDown™ er nå tilgjengelig. Bli med tusenvis av nordmenn som
          har forlenget utesesongen.
        </p>

        <div className='flex flex-col justify-center gap-4 sm:flex-row'>
          <Link
            href='/produkter/utekos-techdown'
            className='gsap-button group inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-medium text-black transition-all duration-200 hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] opacity-0'
          >
            Utforsk TechDown™
            <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
          </Link>

          <Link
            href='/produkter'
            className='gsap-button inline-flex items-center justify-center rounded-full border border-gray-700 px-8 py-4 font-medium text-white transition-colors duration-200 hover:border-white hover:bg-white/5 opacity-0'
          >
            Se hele kolleksjonen
          </Link>
        </div>

        <div className='mt-16 border-t border-gray-800 pt-16'>
          <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
            <div className='gsap-stat-item opacity-0'>
              <div className='mb-2 text-3xl font-light text-white'>2.000+</div>
              <div className='text-sm text-gray-500'>Fornøyde kunder</div>
            </div>
            <div className='gsap-stat-item opacity-0'>
              <div className='mb-2 text-3xl font-light text-white'>
                Trygg handel
              </div>
              <div className='text-sm text-gray-500'>
                Vi tilbyr betaling med Klarna og Vipps
              </div>
            </div>
            <div className='gsap-stat-item opacity-0'>
              <div className='mb-2 text-3xl font-light text-white'>
                Fri frakt
              </div>
              <div className='text-sm text-gray-500'>
                På bestillinger over 999kr
              </div>
            </div>
            <div className='gsap-stat-item opacity-0'>
              <div className='mb-2 text-3xl font-light text-white'>
                Rask levering
              </div>
              <div className='text-sm text-gray-500'>2-5 dager</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}