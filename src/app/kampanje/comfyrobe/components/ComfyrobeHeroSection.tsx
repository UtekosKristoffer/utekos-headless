// Path: src/app/kampanje/comfyrobe/components/ComfyrobeHeroSection.tsx

'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { HeroBackground } from './HeroBackground'
import { HeroStats } from './HeroStats'
import { useHeroAnimation } from '../utils/useHeroAnimation'
import { useHero3D } from '../utils/useHero3D'

interface ComfyrobeHeroSectionProps {
  productImageSrc: string
  backgroundImageSrc?: string
}

export function ComfyrobeHeroSection({
  productImageSrc,
  backgroundImageSrc
}: ComfyrobeHeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineMainRef = useRef<HTMLHeadingElement>(null)
  const headlineHighlightBgRef = useRef<HTMLSpanElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useHeroAnimation({
    containerRef,
    imageContainerRef,
    badgeRef,
    headlineMainRef,
    headlineHighlightBgRef,
    bodyRef,
    ctaRef
  })

  const { handleMouseMove, handleMouseLeave } = useHero3D(imageContainerRef)

  const handleScrollToShop = () => {
    const shopSection = document.getElementById('size-selector')
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={containerRef}
      className='relative min-h-[100dvh] w-full overflow-hidden bg-[#0a0a0a] text-white flex flex-col lg:flex-row items-center justify-center pt-24 pb-12 px-4 lg:py-0'
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <HeroBackground src={backgroundImageSrc} />

      <div className='container relative z-10 mx-auto h-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center'>
        <div className='flex flex-col gap-6 lg:gap-8 order-1 lg:order-1 text-center lg:text-left items-center lg:items-start max-w-lg mx-auto lg:mx-0'>
          <div
            ref={badgeRef}
            className='invisible inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-sky-300 font-medium tracking-wider text-xs uppercase backdrop-blur-md shadow-xl shadow-sky-900/20'
          >
            <ShieldCheck className='w-4 h-4' />
            <span>Utekosens Skjold</span>
          </div>

          <h1
            ref={headlineMainRef}
            className='invisible text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] will-change-transform skew-y-3'
          >
            Hold varmen. <br />
            <span className='relative whitespace-nowrap inline-block mt-1'>
              <span
                ref={headlineHighlightBgRef}
                className='absolute inset-0 bg-gradient-to-r from-sky-900/60 to-cyan-900/60 -skew-x-6 rounded-sm -mx-2'
              />
              <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-cyan-200 to-slate-300 drop-shadow-sm'>
                Erobre været.
              </span>
            </span>
          </h1>

          <p
            ref={bodyRef}
            className='invisible text-base sm:text-lg text-slate-300 leading-relaxed max-w-sm sm:max-w-md'
          >
            Comfyrobe™ er din festning mot kulda. 8000mm vanntett skall møter
            myk SherpaCore™ innside.
          </p>

          <div
            ref={ctaRef}
            className='invisible flex flex-col w-full sm:w-auto gap-4 mt-2'
          >
            <button
              onClick={handleScrollToShop}
              className='w-full sm:w-auto group relative px-8 py-4 bg-white text-[#0a0a0a] font-bold rounded-full text-lg overflow-hidden transition-transform active:scale-95 shadow-lg shadow-sky-900/30'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-sky-500 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out' />
              <span className='relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors'>
                Kjøp nå - 999,- <ArrowRight className='w-5 h-5' />
              </span>
            </button>
            <p className='text-xs text-slate-400 text-center lg:text-left'>
              Fri frakt inkludert • Rask levering
            </p>
          </div>

          <HeroStats ref={statsRef} />
        </div>

        <div className='relative order-2 lg:order-2 w-full flex justify-center perspective-1000 h-[40vh] sm:h-[50vh] lg:h-auto'>
          <div
            ref={imageContainerRef}
            className='relative w-full h-full max-w-[400px] lg:max-w-[600px] lg:aspect-[3/4]'
          >
            <div className='absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-sky-600/30 to-cyan-500/20 rounded-full blur-[80px] animate-pulse-slow pointer-events-none' />

            <Image
              src={productImageSrc}
              alt='Comfyrobe Waterproof Changing Robe'
              fill
              quality={95}
              priority
              className='object-contain lg:object-cover drop-shadow-2xl z-10'
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
