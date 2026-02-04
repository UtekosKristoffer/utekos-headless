'use client'

import { useRef, useState } from 'react'
import { Sparkles, Scale } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export function CompareModelsPageHero() {
  const container = useRef<HTMLElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!container.current) return
    const rect = container.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })

    gsap.to('.gsap-spotlight', {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      duration: 1.5,
      ease: 'power3.out'
    })
  }

  useGSAP(
    () => {
      const tl = gsap.timeline()
      tl.fromTo(
        '.gsap-grid',
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 2, ease: 'power3.out' }
      )

      tl.fromTo(
        '.gsap-icon-wrapper',
        { scale: 0, rotation: -45, autoAlpha: 0 },
        {
          scale: 1,
          rotation: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'back.out(1.7)'
        },
        '-=1.5'
      )

      tl.fromTo(
        '.gsap-title-line',
        { y: '100%', rotateX: -20, opacity: 0 },
        {
          y: '0%',
          rotateX: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out'
        },
        '-=0.6'
      )
      tl.fromTo(
        '.gsap-desc',
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' },
        '-=0.8'
      )
      tl.to(
        '.gsap-underline',
        { scaleX: 1, duration: 0.8, ease: 'expo.out' },
        '-=0.6'
      )
      tl.to(
        '.gsap-highlight',
        { scaleX: 1, duration: 0.6, ease: 'circ.out' },
        '-=0.6'
      )

      gsap.to('.gsap-icon-wrapper', {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    },
    { scope: container }
  )

  return (
    <section
      ref={container}
      onMouseMove={handleMouseMove}
      className='relative w-full overflow-hidden border-b border-white/5 bg-neutral-950 pt-24 pb-20 md:pt-32 md:pb-24'
    >
      <div className='absolute inset-0 -z-10 overflow-hidden pointer-events-none'>
        <div className='gsap-grid absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]' />

        <div className='absolute left-1/2 top-0 h-[800px] w-[1000px] -translate-x-1/2 opacity-20 mix-blend-screen'>
          <div
            className='gsap-spotlight h-full w-full bg-gradient-to-b from-sky-500 via-sky-900/20 to-transparent blur-[120px] will-change-transform'
            style={{ transform: 'translate(0, 0)' }}
          />
        </div>
      </div>

      <div className='container mx-auto px-4 text-center relative z-10 flex flex-col items-center'>
        <div className='gsap-icon-wrapper mb-8 will-change-transform'>
          <div className='flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] backdrop-blur-sm'>
            <Scale className='h-6 w-6 text-slate-200' />
          </div>
        </div>

        <h1 className='max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl perspective-1000'>
          <span className='block overflow-hidden'>
            <span className='gsap-title-line block'>Hvilken</span>
          </span>
          <span className='block overflow-hidden pt-1 pb-2'>
            <span className='gsap-title-line block'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-400 to-slate-900 bg-[length:200%_auto] animate-shine py-1'>
                Utekos
              </span>{' '}
              er du?
            </span>
          </span>
        </h1>

        <p className='gsap-desc opacity-0 mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl font-light'>
          Alle våre modeller er skapt for kompromissløs komfort, men de har{' '}
          <span className='relative inline-block text-white font-medium'>
            unike styrker
            <span className='gsap-underline absolute left-0 bottom-0 h-[2px] w-full bg-slate-500 origin-left scale-x-0' />
          </span>
          . Denne guiden hjelper deg å finne den som er{' '}
          <span className='relative inline-block px-1'>
            <span className='gsap-highlight absolute inset-0 -skew-x-6 rounded bg-white/10 origin-left scale-x-0' />
            <span className='relative z-10 font-medium text-white'>
              perfekt
            </span>
          </span>{' '}
          for akkurat dine øyeblikk.
        </p>
      </div>
      <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none' />
    </section>
  )
}
