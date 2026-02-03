'use client'

import { useRef } from 'react'
import { Award } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ChevronDownSection } from './ChevronDown'

gsap.registerPlugin(useGSAP)

export function MotionContent() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'circ.out', duration: 1.2 }
      })

      tl.fromTo(
        '.gsap-badge',
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8 }
      )
        .fromTo(
          '.gsap-title-span',
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.15 },
          '-=0.6'
        )
        .fromTo(
          '.gsap-text',
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1 },
          '-=0.8'
        )
        .fromTo(
          '.gsap-chevron',
          { autoAlpha: 0, y: -10 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.5'
        )
    },
    { scope: container }
  )

  return (
    <div ref={container} className='mb-8 text-center'>
      <div className='gsap-badge invisible mb-6 inline-flex items-center gap-2 rounded-full border border-sky-800/30 bg-sky-900/10 px-4 py-2'>
        <Award className='h-4 w-4 text-slate-600' />
        <span className='bg-gradient-to-r from-slate-900 via-slate-500 to-slate-900 bg-clip-text text-sm font-medium text-transparent'>
          Funksjonell varme - siden 2020
        </span>
      </div>

      <h1 className='mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl'>
        <span className='gsap-title-span invisible relative inline-block'>
          Utekos®
        </span>
        <span className='gsap-title-span invisible mt-2 block bg-gradient-to-r from-slate-900 via-slate-500 to-slate-900 bg-clip-text text-transparent'>
          Skreddersy varmen
        </span>
      </h1>

      <p
        data-nosnippet='false'
        className='gsap-text invisible mx-auto mt-6 mb-12 max-w-2xl text-lg leading-relaxed text-foreground/80 md:max-w-4xl lg:text-2xl'
      >
        Kompromissløs komfort. Overlegen allsidighet. Juster, form og nyt.
      </p>
      <div
        data-nosnippet
        className='gsap-chevron invisible hidden justify-center md:flex'
      >
        <ChevronDownSection />
      </div>
    </div>
  )
}
