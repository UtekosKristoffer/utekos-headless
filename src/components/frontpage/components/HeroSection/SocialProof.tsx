'use client'

import { useRef } from 'react'
import { KlarnaLogo } from '@/components/logo/payments/KlarnaLogo'
import { VippsLogo } from '@/components/logo/payments/VippsLogo'
import { Truck, Smile, ShieldCheck } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function SocialProof() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.gsap-card')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%', // Starter animasjonen når toppen av seksjonen er 85% ned på skjermen
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(
        cards,
        {
          x: -100, // Starter 100px til venstre for sin posisjon
          autoAlpha: 0, // Helt usynlig
          skewX: 10 // Liten skew for å simulere fart/bevegelse
        },
        {
          x: 0,
          autoAlpha: 1,
          skewX: 0,
          duration: 0.8,
          stagger: 0.2, // Tydelig pause mellom hvert kort for "en etter en" følelse
          ease: 'back.out(1.2)' // "Skytes" inn og bremser med en liten sprett
        }
      )

      // Ikonene popper opp litt etter at kortet har landet
      tl.fromTo(
        '.gsap-icon',
        { scale: 0, rotation: -90, autoAlpha: 0 },
        {
          scale: 1,
          rotation: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'elastic.out(1, 0.5)'
        },
        '-=0.6'
      )

      // Evigvarende shimmer-effekt (Living UI)
      cards.forEach(card => {
        const shine = card.querySelector('.gsap-shine')
        if (shine) {
          gsap.fromTo(
            shine,
            { xPercent: -100, autoAlpha: 0 },
            {
              xPercent: 200,
              autoAlpha: 0.3, // Litt mer subtil
              duration: 2,
              ease: 'power2.inOut',
              repeat: -1,
              repeatDelay: 4 + Math.random() * 4
            }
          )
        }
      })
    },
    { scope: container }
  )

  return (
    <div ref={container} className='mx-auto max-w-4xl px-4 md:px-0'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6'>
        <div className='gsap-card group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md transition-colors duration-500 hover:border-sky-500/20 hover:bg-white/[0.04]'>
          <div className='gsap-shine absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none' />

          <div className='relative flex flex-col items-center text-center'>
            <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10 shadow-[0_0_15px_rgba(14,165,233,0.15)]'>
              <Truck className='gsap-icon h-6 w-6 text-sky-400' />
            </div>
            <p className='text-lg font-bold text-white tracking-tight'>
              Rask levering
            </p>
            <p className='mt-1 text-sm font-medium text-sky-200/60'>
              2-5 dager
            </p>
          </div>
        </div>

        <div className='gsap-card group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md transition-colors duration-500 hover:border-emerald-500/20 hover:bg-white/[0.04]'>
          <div className='gsap-shine absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none' />

          <div className='relative flex flex-col items-center text-center'>
            <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]'>
              <Smile className='gsap-icon h-6 w-6 text-emerald-400' />
            </div>
            <p className='text-lg font-bold text-white tracking-tight'>2000+</p>
            <p className='mt-1 text-sm font-medium text-emerald-200/60'>
              Fornøyde kunder
            </p>
          </div>
        </div>

        <div className='gsap-card group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md transition-colors duration-500 hover:border-violet-500/20 hover:bg-white/[0.04]'>
          <div className='gsap-shine absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none' />

          <div className='relative flex flex-col items-center text-center'>
            <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10 shadow-[0_0_15px_rgba(139,92,246,0.15)]'>
              <ShieldCheck className='gsap-icon h-6 w-6 text-violet-400' />
            </div>
            <p className='text-lg font-bold text-white tracking-tight'>
              Trygg handel
            </p>

            <div className='mt-2 flex items-center justify-center gap-3 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0'>
              <VippsLogo className='h-5 w-auto' />
              <div className='h-4 w-[1px] bg-white/10' />
              <KlarnaLogo className='h-5 w-auto' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
