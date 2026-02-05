'use client'

import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { Check, Ruler, User } from 'lucide-react'
import type { SizeProfile } from '../utils/sizeSelectorData'

interface SizeInfoPanelProps {
  profile: SizeProfile
}

export function SizeInfoPanel({ profile }: SizeInfoPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.anim-text',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [profile])

  return (
    <div ref={containerRef} className='flex flex-col h-full justify-center'>
      <div className='anim-text mb-2 text-sky-400 font-mono text-xs uppercase tracking-widest'>
        Anbefalt Profil
      </div>

      <h3 className='anim-text text-4xl lg:text-5xl font-bold text-white mb-2'>
        {profile.label}
      </h3>

      <p className='anim-text text-xl text-slate-400 mb-8 font-light italic'>
        "{profile.tagline}"
      </p>

      {/* Stats Grid */}
      <div className='anim-text grid grid-cols-2 gap-4 mb-8'>
        <div className='bg-slate-900/50 p-4 rounded-xl border border-slate-800'>
          <div className='flex items-center gap-2 mb-1 text-slate-400'>
            <Ruler className='w-4 h-4' />
            <span className='text-xs uppercase'>Høyde</span>
          </div>
          <div className='text-xl font-bold text-white'>
            {profile.heightRange}
          </div>
        </div>
        <div className='bg-slate-900/50 p-4 rounded-xl border border-slate-800'>
          <div className='flex items-center gap-2 mb-1 text-slate-400'>
            <User className='w-4 h-4' />
            <span className='text-xs uppercase'>Målgruppe</span>
          </div>
          <div className='text-sm font-bold text-white leading-tight'>
            {profile.idealFor[0]}
          </div>
        </div>
      </div>

      <div className='space-y-6'>
        {profile.benefits.map((benefit, i) => (
          <div key={i} className='anim-text flex gap-4'>
            <div className='mt-1 w-6 h-6 rounded-full bg-sky-900/30 flex items-center justify-center shrink-0 border border-sky-500/30'>
              <Check className='w-3 h-3 text-sky-400' />
            </div>
            <div>
              <h4 className='font-bold text-white text-lg'>{benefit.title}</h4>
              <p className='text-slate-400 text-sm leading-relaxed'>
                {benefit.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className='anim-text mt-10 pt-8 border-t border-slate-800'>
        {/* Endret knappetekst til å bruke fullName (Small/Large) */}
        <button className='w-full bg-white text-black font-bold py-4 rounded-full hover:scale-[1.02] transition-transform active:scale-95 text-lg lg:text-base xl:text-lg whitespace-nowrap'>
          Velg {profile.fullName} - 999,-
        </button>
        <p className='text-center text-xs text-slate-500 mt-3'>
          Utsolgt for Medium? {profile.fullName} er det smarte valget.
        </p>
      </div>
    </div>
  )
}
