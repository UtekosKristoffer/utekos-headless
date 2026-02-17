'use client'

import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils/className'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function CinematicWord({
  children,
  className,
  delay = 0
}: {
  children: string
  className?: string
  delay?: number
}) {
  const elRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const el = elRef.current
    if (!el) return

    gsap.fromTo(
      el,
      {
        filter: 'blur(12px)',
        opacity: 0,
        y: 20,
        scale: 1.1
      },
      {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 95%'
        }
      }
    )
  }, [delay])

  return (
    <span
      ref={elRef}
      className={cn(
        'inline-block will-change-[transform,opacity,filter]',
        className
      )}
    >
      {children}
    </span>
  )
}

export function LuxuryShimmerText({
  text,
  className
}: {
  text: string
  className?: string
}) {
  return (
    <span className={cn('relative inline-block group', className)}>
      <span className='relative z-10 animate-shimmer-gold bg-gradient-to-br from-amber-100 via-amber-300 to-amber-500 bg-[length:200%_auto] bg-clip-text text-transparent'>
        {text}
      </span>

      <span className='absolute inset-0 bg-amber-400/20 blur-xl opacity-0 transition-opacity duration-700 group-hover:opacity-40' />
    </span>
  )
}

export function OrganicCircleWord({
  children,
  delay = 0
}: {
  children: string
  delay?: number
}) {
  const pathRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    if (!pathRef.current || !containerRef.current) return

    const length = pathRef.current.getTotalLength()
    gsap.set(pathRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length
    })

    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 1.5,
      delay: delay + 0.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%'
      }
    })
  }, [delay])

  return (
    <span ref={containerRef} className='relative inline-block px-1'>
      <CinematicWord
        delay={delay}
        className='relative z-10 font-medium text-white'
      >
        {children}
      </CinematicWord>

      <svg
        className='absolute left-1/2 top-1/2 h-[130%] w-[115%] -translate-x-1/2 -translate-y-[45%] overflow-visible pointer-events-none'
        viewBox='0 0 100 50'
        preserveAspectRatio='none'
      >
        <path
          ref={pathRef}
          d='M5,25 C5,8 25,5 50,5 C75,5 95,8 95,25 C95,42 75,45 50,45 C25,45 5,42 5,25 Z'
          fill='none'
          stroke='#F59E0B'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='opacity-90'
          vectorEffect='non-scaling-stroke'
        />
      </svg>
    </span>
  )
}

export function GlowWord({
  children,
  delay = 0
}: {
  children: string
  delay?: number
}) {
  return (
    <span className='relative mx-1 inline-block'>
      <span className='animate-pulse-slow absolute inset-0 rounded-full bg-white/10 blur-lg' />
      <CinematicWord
        delay={delay}
        className='relative z-10 font-medium italic text-white'
      >
        {children}
      </CinematicWord>
    </span>
  )
}
