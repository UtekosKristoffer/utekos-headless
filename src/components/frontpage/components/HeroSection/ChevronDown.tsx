// Path: src/components/frontpage/components/HeroSection/ChevronDown.tsx
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

  useGSAP(
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

  const onEnter = () => {
    const arrow = arrowRef.current
    const text = textRef.current
    const hoverLine = container.current?.querySelector('.hover-line')

    if (!arrow || !text) {
      return
    }

    gsap.killTweensOf(arrow)
    gsap.killTweensOf(text)

    gsap.to(text, {
      color: 'var(--color-cloud-dancer)',
      letterSpacing: '0.25em',
      x: 2,
      duration: 0.5,
      ease: 'power2.out'
    })

    gsap.to(arrow, {
      x: 8,
      scale: 1.1,
      duration: 0.6,
      ease: 'back.out(1.7)',
      color: 'var(--color-cloud-dancer)'
    })

    if (hoverLine) {
      gsap.to(hoverLine, { scaleX: 1, duration: 0.4, ease: 'expo.out' })
    }
  }

  const onLeave = () => {
    const arrow = arrowRef.current
    const text = textRef.current
    const hoverLine = container.current?.querySelector('.hover-line')

    if (!arrow || !text) {
      return
    }

    gsap.to(text, {
      color: 'var(--color-cloud-dancer)',
      letterSpacing: '0.2em',
      x: 0,
      duration: 0.4,
      ease: 'power2.out'
    })

    gsap.to(arrow, {
      x: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
      color: 'var(--color-cloud-dancer)',
      onComplete: () => {
        gsap.to(arrow, {
          x: 3,
          duration: 1.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })
      }
    })

    if (hoverLine) {
      gsap.to(hoverLine, { scaleX: 0, duration: 0.4, ease: 'power2.out' })
    }
  }

  return (
    <Link
      href={'/skreddersy-varmen' as Route}
      ref={container}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className='gsap-cta group relative inline-flex items-center justify-center py-6 px-6 min-h-[44px]'
      aria-label='Gå til skreddersy varmen'
      data-track='ReadMoreHeroClick'
    >
      <div className='relative flex items-center gap-3'>
        <span
          ref={textRef}
          className='block text-xs font-medium uppercase tracking-[0.2em] text-cloud-dancer transition-colors'
        >
          Les mer
        </span>

        <ArrowRight ref={arrowRef} className='h-4 w-4 text-cloud-dancer' />
      </div>

      <span className='hover-line absolute bottom-4 left-0 h-[1px] w-full origin-center scale-x-0 bg-gradient-to-r from-transparent via-white to-transparent' />
    </Link>
  )
}
