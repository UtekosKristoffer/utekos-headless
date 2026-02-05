'use client'

import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  CloudRain,
  ThermometerSnowflake,
  Flame,
  Shield,
  Wind
} from 'lucide-react'

export function ProblemSolutionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const warmLayerRef = useRef<HTMLDivElement>(null)
  const coldTextRef = useRef<HTMLDivElement>(null)
  const warmTextRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      })

      tl.fromTo(
        warmLayerRef.current,
        { clipPath: 'circle(0% at 50% 50%)' },
        { clipPath: 'circle(150% at 50% 50%)', ease: 'none', duration: 10 }
      )

      tl.to(coldTextRef.current, { autoAlpha: 0, scale: 0.9, duration: 3 }, 0)

      tl.fromTo(
        warmTextRef.current,
        { autoAlpha: 0, scale: 1.1 },
        { autoAlpha: 1, scale: 1, duration: 4 },
        2
      )

      gsap.to('.rain-drop', {
        y: '100vh',
        ease: 'none',
        repeat: -1,
        duration: 2,
        stagger: {
          amount: 10,
          from: 'random'
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className='relative bg-[#0a0a0a]'>
      <div
        ref={triggerRef}
        className='relative h-screen w-full overflow-hidden'
      >
        <div className='absolute inset-0 bg-slate-900 flex items-center justify-center z-10'>
          <div className='absolute inset-0 opacity-20'>
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className='rain-drop absolute w-[1px] h-20 bg-blue-400/50'
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  opacity: Math.random()
                }}
              />
            ))}
          </div>

          <div
            ref={coldTextRef}
            className='relative z-20 text-center px-4 max-w-2xl'
          >
            <div className='flex justify-center gap-4 mb-6'>
              <CloudRain className='w-12 h-12 text-slate-400 animate-bounce-slow' />
              <Wind className='w-12 h-12 text-slate-500 animate-pulse' />
            </div>
            <h2 className='text-4xl md:text-6xl font-bold text-slate-200 mb-6 tracking-tight'>
              Når naturen <br />
              <span className='text-slate-400'>biter fra seg.</span>
            </h2>
            <p className='text-lg text-slate-400 leading-relaxed'>
              Vindkast som skjærer gjennom marg og bein. Regn som finner veien
              inn overalt. Den norske kulden tar ingen pauser.
            </p>
          </div>
        </div>

        <div
          ref={warmLayerRef}
          className='absolute inset-0 bg-gradient-to-br from-slate-800 to-[#0f172a] flex items-center justify-center z-30'
          style={{ clipPath: 'circle(0% at 50% 50%)' }}
        >
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-900/50 to-slate-900 z-0' />

          <div
            ref={warmTextRef}
            className='relative z-20 text-center px-4 max-w-2xl'
          >
            <div className='flex justify-center gap-4 mb-6'>
              <Shield className='w-12 h-12 text-sky-400' />
              <Flame className='w-12 h-12 text-amber-500/80' />
            </div>
            <h2 className='text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight'>
              Total{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-white'>
                Isolasjon.
              </span>
            </h2>
            <p className='text-xl text-slate-300 leading-relaxed font-light mb-8'>
              Fra storm til stillhet på et sekund. Comfyrobe™ stenger verden
              ute og holder varmen inne. Din personlige festning.
            </p>

            <div className='grid grid-cols-2 gap-4 max-w-md mx-auto mt-8'>
              <div className='bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-lg text-left'>
                <ThermometerSnowflake className='w-6 h-6 text-sky-400 mb-2' />
                <p className='text-sm text-slate-400 uppercase tracking-wider text-[10px]'>
                  Temperaturkontroll
                </p>
                <p className='font-semibold text-white'>SherpaCore™ Heat</p>
              </div>
              <div className='bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-lg text-left'>
                <Shield className='w-6 h-6 text-sky-400 mb-2' />
                <p className='text-sm text-slate-400 uppercase tracking-wider text-[10px]'>
                  Ytre Beskyttelse
                </p>
                <p className='font-semibold text-white'>HydroGuard™ 8K</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
