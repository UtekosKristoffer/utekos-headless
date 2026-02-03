'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Route } from 'next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function ChevronDownSection() {
  const container = useRef<HTMLAnchorElement>(null)
  const arrowRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  const { contextSafe } = useGSAP(
    () => {
      gsap.to(arrowRef.current, {
        x: 3,
        duration: 1.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      })
    },
    { scope: container }
  )

  const onEnter = contextSafe(() => {
    gsap.killTweensOf(arrowRef.current)
    gsap.killTweensOf(textRef.current)

    gsap.to(textRef.current, {
      color: '#ffffff',
      letterSpacing: '0.25em',
      x: 2,
      duration: 0.5,
      ease: 'power2.out'
    })

    gsap.to(arrowRef.current, {
      x: 8,
      scale: 1.1,
      duration: 0.6,
      ease: 'back.out(1.7)',
      color: '#ffffff'
    })

    gsap.to('.hover-line', { scaleX: 1, duration: 0.4, ease: 'expo.out' })
  })

  const onLeave = contextSafe(() => {
    gsap.to(textRef.current, {
      color: 'rgba(255, 255, 255, 0.6)',
      letterSpacing: '0.2em',
      x: 0,
      duration: 0.4,
      ease: 'power2.out'
    })

    gsap.to(arrowRef.current, {
      x: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
      color: 'rgba(255, 255, 255, 0.6)',
      onComplete: () => {
        gsap.to(arrowRef.current, {
          x: 3,
          duration: 1.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })
      }
    })

    gsap.to('.hover-line', { scaleX: 0, duration: 0.4, ease: 'power2.out' })
  })

  return (
    <Link
      href={'/skreddersy-varmen' as Route}
      ref={container}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className='gsap-cta group relative inline-flex items-center justify-center py-6 px-6 min-h-[44px]'
      aria-label='Gå til skreddersy varmen'
    >
      <div className='relative flex items-center gap-3'>
        <span
          ref={textRef}
          className='block text-xs font-medium uppercase tracking-[0.2em] text-white/60 transition-colors'
        >
          Les mer
        </span>

        <ArrowRight ref={arrowRef} className='h-4 w-4 text-white/60' />
      </div>

      <span className='hover-line absolute bottom-4 left-0 h-[1px] w-full origin-center scale-x-0 bg-gradient-to-r from-transparent via-white to-transparent' />
    </Link>
  )
}
