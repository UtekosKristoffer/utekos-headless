'use client'

import { useRef } from 'react'
import { Heart } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function CreatedForSection() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Main Entrance Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // 1. Ikon Entrance (Pop & Rotate)
      tl.fromTo(
        '.gsap-icon-wrapper',
        { scale: 0, rotation: -90, autoAlpha: 0 },
        {
          scale: 1,
          rotation: 0,
          autoAlpha: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)'
        }
      )

      // 2. Tittel-linjer (Masked Reveal oppover)
      tl.fromTo(
        '.gsap-title-line',
        { y: '100%', skewY: 5 },
        {
          y: '0%',
          skewY: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power4.out'
        },
        '-=0.8'
      )

      // 3. Divider (Vokser fra midten)
      tl.fromTo(
        '.gsap-divider',
        { scaleX: 0, autoAlpha: 0 },
        { scaleX: 1, autoAlpha: 1, duration: 1, ease: 'elastic.out(1, 0.6)' },
        '-=0.6'
      )

      // 4. Brødtekst container (Fade up)
      tl.fromTo(
        '.gsap-text',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.7'
      )

      // 5. Tekst-effekter (Understrek og Marker)
      tl.to(
        '.gsap-desc-underline',
        { scaleX: 1, duration: 0.8, ease: 'expo.out' },
        '-=0.4'
      )

      tl.to(
        '.gsap-desc-highlight',
        { scaleX: 1, duration: 0.6, ease: 'circ.out' },
        '-=0.6'
      )

      // --- Continuous Animations (Living Environment) ---

      // Ikon Float & Pulse (Nøytrale farger)
      gsap.to('.gsap-icon-wrapper', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.2
      })
      gsap.to('.gsap-icon-glow', {
        boxShadow: '0 0 25px rgba(255,255,255,0.15)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // Ambient Blobs Movement (Nøytrale farger)
      gsap.to('.gsap-blob-1', {
        x: '20%',
        y: '-20%',
        scale: 1.1,
        rotation: 10,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
      gsap.to('.gsap-blob-2', {
        x: '-20%',
        y: '20%',
        scale: 0.9,
        rotation: -10,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
      })
    },
    { scope: container }
  )

  return (
    <div
      ref={container}
      className='relative mb-12 w-full overflow-hidden border-y border-white/5 bg-neutral-950 py-24 text-center md:mb-20 md:py-32'
    >
      {/* --- Bakgrunnseffekter (Nøytralisert) --- */}
      <div className='absolute inset-0 -z-10 pointer-events-none overflow-hidden'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]' />

        {/* Nøytrale Blobs */}
        <div className='gsap-blob-1 absolute left-[30%] top-[20%] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-500/10 blur-[120px] mix-blend-screen' />
        <div className='gsap-blob-2 absolute right-[30%] bottom-[20%] h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-white/5 blur-[100px] mix-blend-screen' />
      </div>

      <div className='relative z-10 container mx-auto px-4 flex flex-col items-center'>
        {/* Ikon (Nøytrale farger) */}
        <div className='gsap-icon-wrapper mb-10 will-change-transform'>
          <div className='gsap-icon-glow flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-sm'>
            <Heart className='h-7 w-7 text-slate-200 fill-slate-200/10' />
          </div>
        </div>

        {/* Overskrift */}
        <h2 className='text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl leading-tight'>
          <span className='block overflow-hidden'>
            <span className='gsap-title-line block will-change-transform'>
              Skapt for
            </span>
          </span>
          <span className='block overflow-hidden pb-2'>
            <span className='gsap-title-line block will-change-transform'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-400 to-slate-900 bg-[length:200%_auto] animate-shine py-1'>
                din Utekos
              </span>
            </span>
          </span>
        </h2>

        {/* Divider (Nøytral farge) */}
        <div className='gsap-divider h-[2px] w-32 bg-gradient-to-r from-transparent via-slate-500/30 to-transparent my-10 origin-center will-change-transform' />

        {/* Brødtekst med Effekter */}
        <p className='gsap-text opacity-0 mx-auto max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl font-light'>
          Våre komfortplagg er{' '}
          <span className='relative inline-block text-white font-medium'>
            designet
            {/* Understrek */}
            <span className='gsap-desc-underline absolute left-0 bottom-0 h-[2px] w-full bg-slate-500 origin-left scale-x-0' />
          </span>{' '}
          for å holde deg varm, slik at du kan{' '}
          <span className='relative inline-block px-1'>
            {/* Markerings-bakgrunn */}
            <span className='gsap-desc-highlight absolute inset-0 -skew-x-6 rounded bg-white/10 origin-left scale-x-0' />
            <span className='relative z-10 font-medium text-white'>nyte</span>
          </span>{' '}
          de gode øyeblikkene lenger.
        </p>
      </div>
    </div>
  )
}
