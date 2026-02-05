'use client'

import React, { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import type { SizeProfile } from '../utils/sizeSelectorData'

interface SizeVisualizerProps {
  profile: SizeProfile
}

export function SizeVisualizer({ profile }: SizeVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shapeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Morph formen basert på scale-prop
      gsap.to(shapeRef.current, {
        scale: profile.visualScale,
        duration: 0.6,
        ease: 'elastic.out(1, 0.6)'
      })

      // Fade/Scale content ved bytte
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.4 }
      )

      // Endre fargeglød basert på profil (Active = Cyan, Max = Orange)
      const glowColor =
        profile.id === 'S' ?
          'rgba(6, 182, 212, 0.4)' // Cyan/Active
        : 'rgba(249, 115, 22, 0.4)' // Orange/Warm

      gsap.to(shapeRef.current, {
        boxShadow: `0 0 80px ${glowColor}`,
        borderColor:
          profile.id === 'S' ? 'rgba(6,182,212,0.3)' : 'rgba(249,115,22,0.3)',
        duration: 0.6
      })
    }, containerRef)

    return () => ctx.revert()
  }, [profile])

  const Icon = profile.icon

  return (
    <div
      ref={containerRef}
      className='relative w-full h-[400px] lg:h-[500px] flex items-center justify-center'
    >
      {/* Dynamic Shape Container */}
      <div
        ref={shapeRef}
        className='relative w-64 h-96 rounded-[4rem] border-2 border-slate-700 bg-slate-900/80 backdrop-blur-md flex items-center justify-center will-change-transform overflow-hidden shadow-2xl'
      >
        {/* Grid Texture Background */}
        <div className='absolute inset-0 opacity-30 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent)] bg-[length:40px_40px]' />

        {/* Content: Image OR Icon */}
        <div
          ref={contentRef}
          className='relative z-10 w-full h-full flex items-center justify-center p-6'
        >
          {profile.imageSrc ?
            <div className='relative w-full h-full'>
              {/* Placeholder for faktisk silhuett-bilde */}
              <Image
                src={profile.imageSrc}
                alt={profile.label}
                fill
                className='object-contain drop-shadow-2xl'
              />
            </div>
          : <div className='flex flex-col items-center gap-4 text-slate-200'>
              <Icon className='w-24 h-24 stroke-[1.5]' />
              <div className='text-xs font-mono uppercase tracking-widest opacity-50'>
                {profile.id === 'S' ? 'Active Mode' : 'Max Mode'}
              </div>
            </div>
          }
        </div>

        {/* Height Indicators - Norsk */}
        <div className='absolute right-4 top-8 bottom-8 flex flex-col justify-between py-2 text-[10px] font-mono text-slate-500 pointer-events-none'>
          <span className='writing-vertical-rl'>HODE</span>
          <div className='h-full w-px bg-slate-800 mx-auto my-2 relative'>
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-3 h-px bg-sky-500/50'></div>
            {/* Dynamisk indikator for lengde */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-3 h-px bg-sky-500 transition-all duration-500 ${profile.id === 'S' ? 'bottom-[15%]' : 'bottom-0'}`}
            />
          </div>
          <span className='writing-vertical-rl'>FØTTER</span>
        </div>
      </div>
    </div>
  )
}
