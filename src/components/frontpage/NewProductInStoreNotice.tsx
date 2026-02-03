// Path: src/components/sections/NewProductInStoreNotice.tsx
'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import IntersportLogo from '@public/logo/Intersport_logo.svg'
import { INTERSPORT_LAKSEVAG_MAPS_URL } from '@/constants/maps'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function NewProductInStoreNotice() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.5 })
      const logo = logoRef.current
      const smokeParticles = gsap.utils.toArray('.smoke-particle')
      const content = contentRef.current

      // Initial states
      gsap.set(logo, { xPercent: -400, rotation: -15, autoAlpha: 1 })
      gsap.set(smokeParticles, { scale: 0, opacity: 0.8 })
      gsap.set(content, { y: 20, autoAlpha: 0 })

      // --- Phase 1: The Approach (Shooting in) ---
      tl.to(logo, {
        xPercent: 20, // Overshoot center slightly
        rotation: 5, // Lean into speed
        duration: 1,
        ease: 'power3.in' // Accelerate
      })

      // --- Phase 2: The Brake & Smoke Effect ---
      tl.addLabel('brake')

      // Hard stop movement
      tl.to(
        logo,
        {
          xPercent: 5,
          rotation: -8, // Violent tilt back on braking
          duration: 0.25,
          ease: 'power4.out' // Hard deceleration
        },
        'brake'
      )

      // Smoke explosion occurring simultaneously at 'brake'
      tl.to(
        smokeParticles,
        {
          scale: 'random(2, 3)', // Expand greatly
          x: 'random(-150, -50)', // Drift backward (left) away from momentum
          y: 'random(-30, 30)', // Slight vertical spread
          opacity: 0, // Fade out
          duration: 'random(1, 1.8)',
          stagger: { amount: 0.2, from: 'end' }, // Randomize timings slightly
          ease: 'power2.out'
        },
        'brake-=0.1' // Start smoke just before the hardest stop finishes
      )

      // --- Phase 3: The Settle (Falling into place) ---
      tl.to(logo, {
        xPercent: 0,
        rotation: 0,
        duration: 1.2,
        // Heavy elastic ease for a solid "thud" into place
        ease: 'elastic.out(1, 0.75)'
      })

      // --- Phase 4: Reveal Content ---
      tl.to(
        content,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power2.out'
        },
        '-=0.8' // Overlap with the settle animation
      )
    },
    { scope: containerRef }
  )

  return (
    <section className='mt-12 w-full py-12'>
      <div className='container mx-auto max-w-6xl px-4 md:max-w-7xl'>
        <div
          ref={containerRef}
          className='relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8'
        >
          {/* Background Glow */}
          <div
            className='pointer-events-none absolute left-1/2 top-0 -z-20 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 opacity-15 blur-3xl'
            style={{
              background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
            }}
          />

          <div className='flex flex-col items-center gap-6 text-center'>
            {/* Container for Logo and Smoke */}
            <div className='relative flex h-24 w-full items-center justify-center'>
              {/* Smoke Particles (Hidden initially, sits behind logo) */}
              <div className='absolute left-1/2 top-1/2 z-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center'>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className='smoke-particle absolute h-16 w-16 rounded-full bg-neutral-200/30 blur-2xl'
                  />
                ))}
              </div>

              {/* The Logo Box (Animated Element) */}
              <div
                ref={logoRef}
                className='relative z-10 flex h-14 items-center justify-center rounded-xl border border-neutral-700 bg-white px-6 opacity-0 will-change-transform'
              >
                <Image
                  src={IntersportLogo}
                  alt='Intersport logo'
                  width={100}
                  height={28}
                  className='h-auto w-full max-w-[100px]'
                />
              </div>
            </div>

            {/* Text Content (Revealed after animation) */}
            <div
              ref={contentRef}
              className='flex flex-col items-center gap-6 opacity-0'
            >
              <h2 className='text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl'>
                På plass hos Intersport Laksevåg!
              </h2>

              <p className='max-w-5xl text-balance text-lg leading-relaxed text-access/30'>
                Nå kan du se, prøve og kjenne på vår splitter nye{' '}
                <strong>Utekos TechDown™</strong> hos våre gode venner på
                Intersport Laksevåg. Ta turen innom for å bli en av de første
                som får oppleve den neste generasjonen av Utekos!
              </p>

              <Button asChild size='lg' className='group mt-2'>
                <Link href={INTERSPORT_LAKSEVAG_MAPS_URL} target='_blank'>
                  Vis vei til butikken
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
