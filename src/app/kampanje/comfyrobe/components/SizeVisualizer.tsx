'use client'

import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import type { SizeProfile } from '../utils/sizeSelectorData'

interface SizeVisualizerProps {
  profile: SizeProfile
}

export function SizeVisualizer({ profile }: SizeVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shapeRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Morph formen basert på scale-prop
      gsap.to(shapeRef.current, {
        scale: profile.visualScale,
        duration: 0.6,
        ease: 'elastic.out(1, 0.6)'
      })

      gsap.fromTo(
        iconRef.current,
        { rotate: -45, opacity: 0, scale: 0.5 },
        {
          rotate: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)'
        }
      )

      const glowColor =
        profile.id === 'S' ?
          'rgba(56, 189, 248, 0.4)' // Sky Blue
        : 'rgba(249, 115, 22, 0.4)' // Orange

      gsap.to(shapeRef.current, {
        boxShadow: `0 0 60px ${glowColor}`,
        duration: 0.6
      })
    }, containerRef)

    return () => ctx.revert()
  }, [profile])

  const Icon = profile.icon

  return (
    <div
      ref={containerRef}
      className='relative w-full h-[300px] lg:h-[400px] flex items-center justify-center'
    >
      {/* Abstract Body Shape */}
      <div
        ref={shapeRef}
        className='relative w-48 h-64 lg:w-64 lg:h-80 rounded-[3rem] border-2 border-slate-700 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center will-change-transform'
      >
        {/* Inner Grid Texture */}
        <div className='absolute inset-0 opacity-20 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent)] bg-[length:30px_30px]' />

        <div ref={iconRef} className='relative z-10'>
          <Icon className='w-16 h-16 text-slate-200' />
        </div>

        {/* Height Indicators */}
        <div className='absolute -right-12 top-0 bottom-0 flex flex-col justify-between py-4 text-xs font-mono text-slate-500'>
          <span>HODE</span>
          <div className='h-full w-px bg-slate-800 mx-auto my-2 relative'>
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-2 h-px bg-slate-500'></div>
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-px bg-slate-500'></div>
          </div>
          <span>FEET</span>
        </div>
      </div>
    </div>
  )
}
