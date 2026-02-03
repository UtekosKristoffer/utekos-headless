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
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function NewProductInStoreNotice() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoBoxRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const logoBox = logoBoxRef.current
      const smokeParticles = gsap.utils.toArray('.smoke-particle')
      const sparkParticles = gsap.utils.toArray('.spark-particle')
      const content = contentRef.current

      // --- SETUP INITIAL STATES ---
      gsap.set(logoBox, {
        xPercent: -500, // Start way off screen
        rotation: -15, // Lean forward ready to sprint
        scaleX: 1.2, // Artificial "motion stretch"
        autoAlpha: 1
      })
      gsap.set(smokeParticles, { scale: 0, opacity: 0 })
      gsap.set(sparkParticles, { scale: 0, opacity: 0 })
      gsap.set(content, { y: 30, autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%', // Start litt tidligere så man ser det komme
          toggleActions: 'play none none reverse'
        }
      })

      // --- PHASE 1: THE APPROACH (Maximum Velocity) ---
      tl.to(logoBox, {
        xPercent: 30, // Overshoot center significantly (sliding past)
        rotation: 5, // Lean into speed
        duration: 0.8,
        ease: 'power4.in' // Violent acceleration
      })

      // --- PHASE 2: THE IMPACT BRAKE (The "Oh sh*t" moment) ---
      tl.addLabel('brake')

      // 2a. The physical slide and tilt
      tl.to(
        logoBox,
        {
          xPercent: 15, // Still sliding forward while braking
          rotation: -25, // Violent tilt back (nose dive)
          scaleX: 0.9, // "Squash" on impact
          duration: 0.3,
          ease: 'power3.out' // Rapid deceleration
        },
        'brake'
      )

      // 2b. Camera Rumble Effect
      tl.add(() => {
        gsap.fromTo(
          containerRef.current,
          { x: -4 },
          { x: 4, duration: 0.04, repeat: 5, yoyo: true, ease: 'sine.inOut' }
        )
      }, 'brake')

      // 2c. Smoke Explosion (Big, puffy, lingering)
      tl.to(
        smokeParticles,
        {
          scale: 'random(2.5, 4)', // Huge expansion
          x: 'random(-100, -20)', // Drift backward along momentum
          y: 'random(-50, 0)', // Rise up like smoke
          opacity: 'random(0.4, 0.8)', // Visible puff
          duration: 0.2, // Explode out instantly
          stagger: { amount: 0.1, from: 'center' },
          ease: 'expo.out'
        },
        'brake'
      )

      // Smoke dissipation (slow fade out after explosion)
      tl.to(
        smokeParticles,
        {
          opacity: 0,
          scale: '+=1', // Continue expanding slowly while fading
          duration: 'random(1.5, 2.5)',
          ease: 'power1.out'
        },
        'brake+=0.2'
      )

      // 2d. Sparks Flying (Fast, bright, short-lived)
      tl.to(
        sparkParticles,
        {
          scale: 'random(0.5, 1)',
          x: 'random(20, 100)', // Shoot forward from friction
          y: 'random(10, 50)', // Fall down towards "ground"
          opacity: 1,
          duration: 0.3,
          stagger: { amount: 0.1, from: 'random' },
          ease: 'power3.out'
        },
        'brake'
      )
      tl.to(
        sparkParticles,
        {
          opacity: 0,
          duration: 0.2
        },
        'brake+=0.3'
      )

      // --- PHASE 3: THE RECOIL & SETTLE (Heavy Physics) ---
      // Snap back from the overshoot position to the center
      tl.to(logoBox, {
        xPercent: 0,
        rotation: 0,
        scaleX: 1, // Back to normal shape
        duration: 1.5,
        // Very heavy, wobbly elastic ease to simulate heavy weight settling
        ease: 'elastic.out(1, 0.5)'
      })

      // --- PHASE 4: REVEAL TEXT CONTENT ---
      tl.to(
        content,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power2.out'
        },
        '-=1'
      ) // Start revealing before settle finishes
    },
    { scope: containerRef }
  )

  return (
    <section className='mt-24 w-full py-12'>
      <div className='container mx-auto max-w-6xl px-4 md:max-w-7xl'>
        <div
          ref={containerRef}
          className='relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/80 p-10 shadow-2xl'
        >
          {/* Background Glow */}
          <div
            className='pointer-events-none absolute left-1/2 top-0 -z-20 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[100px]'
            style={{
              background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
            }}
          />

          <div className='flex flex-col items-center gap-8 text-center'>
            <div className='relative flex h-32 w-full items-center justify-center overflow-visible'>
              <div className='absolute left-1/2 top-1/2 z-0 flex h-1 w-1 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-visible'>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`smoke-${i}`}
                    className={`smoke-particle absolute h-20 w-20 rounded-full blur-xl ${i % 2 === 0 ? 'bg-neutral-200/40' : 'bg-sky-200/30'}`}
                    style={{ left: i * 5, top: i * 2 }}
                  />
                ))}

                {[...Array(8)].map((_, i) => (
                  <div
                    key={`spark-${i}`}
                    className={`spark-particle absolute h-1 w-1 rounded-full blur-[1px] ${i % 2 === 0 ? 'bg-amber-300' : 'bg-orange-400'}`}
                    style={{ left: i * 2, top: i * 2 }}
                  />
                ))}
              </div>

              <div
                ref={logoBoxRef}
                className='relative z-10 flex h-16 items-center justify-center rounded-2xl border-2 border-white/90 bg-white px-8 shadow-[0_0_30px_rgba(255,255,255,0.2)] opacity-0 will-change-transform'
              >
                <Image
                  src={IntersportLogo}
                  alt='Intersport logo'
                  width={120}
                  height={34}
                  className='h-auto w-full max-w-[120px]'
                  priority
                />
              </div>
            </div>

            <div
              ref={contentRef}
              className='flex flex-col items-center gap-6 opacity-0'
            >
              <h2 className='text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl'>
                På plass hos Intersport Laksevåg!
              </h2>

              <p className='max-w-4xl text-balance text-lg leading-relaxed text-neutral-300'>
                Nå kan du se, prøve og kjenne på vår splitter nye{' '}
                <strong className='text-white'>Utekos TechDown™</strong> hos
                våre gode venner på Intersport Laksevåg. Ta turen innom for å
                bli en av de første som får oppleve den neste generasjonen av
                Utekos!
              </p>

              <Button
                asChild
                size='lg'
                className='group mt-4 h-12 rounded-full px-8 text-base'
              >
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
