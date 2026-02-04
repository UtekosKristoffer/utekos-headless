'use client'

import { useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export function ProductsPageHeader() {
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
        '.gsap-badge',
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: 'back.out(1.7)' },
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

      tl.fromTo(
        '.gsap-underline',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'expo.out' },
        '-=0.6'
      )

      tl.fromTo(
        '.gsap-highlight',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'circ.out' },
        '-=0.6'
      )

      gsap.to('.gsap-star', {
        y: -20,
        opacity: 0.4,
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 2,
          from: 'random'
        },
        ease: 'sine.inOut'
      })
    },
    { scope: container }
  )

  return (
    <header
      ref={container}
      onMouseMove={handleMouseMove}
      className='relative w-full overflow-hidden border-b border-white/5 bg-neutral-950 pt-20 pb-16 md:pt-32 md:pb-24 mb-12'
    >
      <div className='absolute inset-0 -z-10 overflow-hidden pointer-events-none'>
        <div className='gsap-grid absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]' />

        <div className='absolute left-1/2 top-0 h-[800px] w-[1000px] -translate-x-1/2 opacity-20 mix-blend-screen'>
          <div
            className='gsap-spotlight h-full w-full bg-gradient-to-b from-sky-500 via-sky-900/20 to-transparent blur-[120px] will-change-transform'
            style={{
              transform: 'translate(0, 0)'
            }}
          />
        </div>

        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className='gsap-star absolute h-1 w-1 rounded-full bg-white opacity-10'
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px rgba(255,255,255,0.5)'
            }}
          />
        ))}
      </div>

      <div className='container mx-auto px-4 text-center relative z-10'>
        <div className='gsap-badge opacity-0 mb-8 inline-flex items-center justify-center'>
          <div className='group relative flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-5 py-2 backdrop-blur-md transition-all duration-300 hover:border-sky-500/40 hover:bg-sky-500/10 hover:shadow-[0_0_20px_-5px_rgba(14,165,233,0.3)]'>
            <div className='absolute inset-0 overflow-hidden rounded-full'>
              <div className='absolute top-0 -left-[100%] h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transition-all duration-1000 group-hover:left-[100%]' />
            </div>
            <Sparkles className='h-3.5 w-3.5 text-sky-400 animate-pulse' />
            <span className='text-xs font-bold uppercase tracking-[0.2em] text-sky-400'>
              Utekos®
            </span>
          </div>
        </div>

        <h1 className='mx-auto max-w-5xl text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl perspective-1000'>
          <span className='block overflow-hidden'>
            <span className='gsap-title-line block'>Kolleksjonen for</span>
          </span>
          <span className='block overflow-hidden pt-2'>
            <span className='gsap-title-line block bg-gradient-to-r from-slate-900 via-slate-500 to-slate-900 bg-clip-text text-transparent bg-[length:200%_auto] animate-shine leading-tight py-1'>
              kompromissløs komfort.
            </span>
          </span>
        </h1>

        <p className='gsap-desc opacity-0 mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl'>
          Vi har{' '}
          <span className='relative inline-block text-white font-medium'>
            redefinert
            <span className='gsap-underline absolute left-0 bottom-0 h-[2px] w-full bg-sky-500 origin-left' />
          </span>{' '}
          utekosen gjennom teknologi og funksjonalitet.
          <br className='hidden md:block' />
          Utforsk vår kolleksjon og{' '}
          <span className='relative inline-block px-1'>
            <span className='gsap-highlight absolute inset-0 -skew-x-6 rounded bg-sky-500/20 origin-left' />
            <span className='relative z-10 font-medium text-sky-300'>
              skreddersy
            </span>
          </span>{' '}
          din egen varme.
        </p>
      </div>

      <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent pointer-events-none' />
    </header>
  )
}
