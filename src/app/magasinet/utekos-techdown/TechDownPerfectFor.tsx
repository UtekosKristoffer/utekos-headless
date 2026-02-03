'use client'

import { useRef } from 'react'
import { Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function TechDownPerfectFor() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(
        '.gsap-heading',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' }
      )

      tl.fromTo(
        '.gsap-text',
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )

      tl.to(
        '.gsap-highlight-bg',
        { scaleX: 1, duration: 0.8, ease: 'circ.out' },
        '-=0.6'
      )

      tl.to(
        '.gsap-underline',
        { scaleX: 1, duration: 0.8, ease: 'expo.out' },
        '-=0.6'
      )

      tl.fromTo(
        '.gsap-tip-box',
        { x: -20, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: 'back.out(1.2)' },
        '-=0.4'
      )
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className='mx-auto max-w-4xl px-6 pb-16 pt-4'>
      <h2 className='gsap-heading mb-8 text-3xl font-light text-white opacity-0'>
        Perfekt for hyttekosen
      </h2>

      <p className='gsap-text mb-8 text-lg leading-relaxed text-gray-300 opacity-0'>
        TechDown™ har selvfølgelig vår anerkjente{' '}
        <span className='relative inline-block px-1 font-medium text-white'>
          <span className='gsap-highlight-bg absolute inset-0 -skew-x-6 origin-left scale-x-0 rounded bg-white/10' />
          <span className='relative z-10'>3-i-1-funksjon</span>
        </span>
        . Fra morgenkaffen på terrassen til kveldskosen rundt bålet – ett plagg,{' '}
        <span className='relative inline-block text-white'>
          uendelige muligheter
          <span className='gsap-underline absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-yellow-400' />
        </span>{' '}
        for komfort.
      </p>

      <div className='gsap-tip-box relative overflow-hidden rounded-r-lg border-l-4 border-yellow-500 bg-yellow-500/5 p-6 opacity-0'>
        <div className='absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-yellow-500/10 blur-3xl' />

        <div className='relative z-10 flex items-center gap-3 mb-3'>
          <Sparkles className='h-5 w-5 text-yellow-400' />
          <h3 className='text-lg font-semibold text-yellow-400'>
            Livsnyter-tips:
          </h3>
        </div>
        <p className='relative z-10 text-gray-300'>
          Hold alltid en TechDown™ hengende i båten eller bobilen. Den tåler
          fuktighet bedre og er perfekt når kveldene blir kjølige til sjøs!
        </p>
      </div>
    </section>
  )
}
