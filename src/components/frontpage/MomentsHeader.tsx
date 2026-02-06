'use client'

import React from 'react'
import {
  CinematicWord,
  LuxuryShimmerText,
  OrganicCircleWord,
  GlowWord
} from '@/components/frontpage/TextReveal'

export function MomentsHeader() {
  return (
    <div className='mb-24 text-center mx-auto max-w-5xl px-4'>
      {/* Overskrift */}
      <h2 className='text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-10 leading-[1.1]'>
        <div className='flex flex-wrap justify-center gap-x-3 md:gap-x-5 items-baseline'>
          <CinematicWord delay={0.1}>Skapt</CinematicWord>
          <CinematicWord delay={0.15}>for</CinematicWord>
          <CinematicWord delay={0.2}>dine</CinematicWord>

          {/* THE HERO WORD: "Øyeblikk" i gull-shimmer */}
          <span className='inline-block pb-2'>
            <LuxuryShimmerText
              text='øyeblikk'
              className='font-serif italic tracking-wide'
            />
          </span>
        </div>
      </h2>

      {/* Brødtekst */}
      <div className='max-w-3xl mx-auto'>
        <p className='text-lg md:text-2xl text-neutral-400 leading-relaxed flex flex-wrap justify-center gap-x-2 items-center'>
          <CinematicWord className='font-light' delay={0.4}>
            Uansett
          </CinematicWord>
          <CinematicWord className='font-light' delay={0.45}>
            hvor
          </CinematicWord>
          <CinematicWord className='font-light' delay={0.5}>
            du
          </CinematicWord>
          <CinematicWord className='font-light' delay={0.55}>
            finner
          </CinematicWord>

          {/* "Roen" - Organisk sirkel som tegnes */}
          <OrganicCircleWord delay={0.6}>roen,</OrganicCircleWord>

          <CinematicWord className='font-light' delay={0.7}>
            er
          </CinematicWord>
          <CinematicWord className='font-light' delay={0.75}>
            Utekos
          </CinematicWord>
          <CinematicWord className='font-light' delay={0.8}>
            designet
          </CinematicWord>
          <CinematicWord className='font-light' delay={0.85}>
            for
          </CinematicWord>
          <CinematicWord className='font-light' delay={0.9}>
            å
          </CinematicWord>
          <CinematicWord className='font-light' delay={0.95}>
            gjøre
          </CinematicWord>

          {/* "Opplevelsen" - Glødende og eksklusiv */}
          <GlowWord delay={1.0}>opplevelsen</GlowWord>

          <CinematicWord className='font-light' delay={1.1}>
            bedre.
          </CinematicWord>
        </p>
      </div>
    </div>
  )
}
