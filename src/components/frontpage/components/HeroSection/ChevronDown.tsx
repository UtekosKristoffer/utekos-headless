// Path: src/components/frontpage/components/HeroSection/ChevronDown.tsx
'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Route } from 'next'
import { loadGsap } from '@/lib/gsap/loadGsap'

export function ChevronDownSection() {
  const container = useRef<HTMLAnchorElement>(null)
  const arrowRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const loopCleanupRef = useRef<(() => void) | null>(null)

  const startArrowLoop = async () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const arrow = arrowRef.current
    if (!arrow) {
      return
    }

    const gsap = await loadGsap()
    if (!arrowRef.current) {
      return
    }

    loopCleanupRef.current?.()
    gsap.killTweensOf(arrowRef.current)

    const tween = gsap.to(arrowRef.current, {
      x: 3,
      duration: 1.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    })

    loopCleanupRef.current = () => {
      tween.kill()
    }
  }

  useEffect(() => {
    let cancelled = false
    let idleId: number | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const scheduleLoop = () => {
      if (cancelled) {
        return
      }

      void startArrowLoop()
    }

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(scheduleLoop, { timeout: 1200 })
    } else {
      timeoutId = setTimeout(scheduleLoop, 450)
    }

    return () => {
      cancelled = true
      if (idleId !== null) {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      loopCleanupRef.current?.()
      loopCleanupRef.current = null
    }
  }, [])

  const onEnter = async () => {
    const arrow = arrowRef.current
    const text = textRef.current
    const hoverLine = container.current?.querySelector('.hover-line')

    if (!arrow || !text) {
      return
    }

    const gsap = await loadGsap()
    loopCleanupRef.current?.()
    gsap.killTweensOf(arrow)
    gsap.killTweensOf(text)

    gsap.to(text, {
      color: 'var(--cloud-dancer)',
      x: 2,
      duration: 0.5,
      ease: 'power2.out'
    })

    gsap.to(arrow, {
      x: 8,
      scale: 1.1,
      duration: 0.6,
      ease: 'back.out(1.7)',
      color: 'var(--cloud-dancer)'
    })

    if (hoverLine) {
      gsap.to(hoverLine, { scaleX: 1, duration: 0.4, ease: 'expo.out' })
    }
  }

  const onLeave = async () => {
    const arrow = arrowRef.current
    const text = textRef.current
    const hoverLine = container.current?.querySelector('.hover-line')

    if (!arrow || !text) {
      return
    }

    const gsap = await loadGsap()

    gsap.to(text, {
      color: 'var(--cloud-dancer)',
      x: 0,
      duration: 0.4,
      ease: 'power2.out'
    })

    gsap.to(arrow, {
      x: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
      color: 'var(--cloud-dancer)',
      onComplete: () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return
        }

        void startArrowLoop()
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
      onMouseEnter={() => {
        void onEnter()
      }}
      onMouseLeave={() => {
        void onLeave()
      }}
      className='gsap-cta group relative inline-flex min-h-11 items-center justify-center px-5 py-4'
      aria-label='Gå til skreddersy varmen'
      data-track='ReadMoreHeroClick'
    >
      <div className='relative flex items-center gap-3'>
        <span
          ref={textRef}
          className='block text-sm font-medium leading-none tracking-[-0.01em] text-cloud-dancer transition-colors'
        >
          Les mer
        </span>

        <ArrowRight ref={arrowRef} className='size-4 text-cloud-dancer' />
      </div>

      <span className='hover-line absolute bottom-3 left-0 h-px w-full origin-center scale-x-0 bg-gradient-to-r from-transparent via-cloud-dancer to-transparent' />
    </Link>
  )
}
