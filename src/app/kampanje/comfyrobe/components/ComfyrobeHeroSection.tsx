'use client'

import React, { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ArrowRight, ShieldCheck, Droplets, Wind } from 'lucide-react'

interface ComfyrobeHeroSectionProps {
  productImageSrc: string
  backgroundImageSrc?: string
  onCtaClick?: () => void
}

export function ComfyrobeHeroSection({
  productImageSrc,
  backgroundImageSrc,
  onCtaClick
}: ComfyrobeHeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineMainRef = useRef<HTMLHeadingElement>(null)
  const headlineHighlightBgRef = useRef<HTMLSpanElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    const container = containerRef.current

    const ctx = gsap.context(() => {
      gsap.set([headlineMainRef.current, bodyRef.current, ctaRef.current], {
        autoAlpha: 0,
        y: 50
      })
      gsap.set(badgeRef.current, { autoAlpha: 0, x: -50 })
      gsap.set('.stat-item', { autoAlpha: 0, scale: 0.8 })
      gsap.set(headlineHighlightBgRef.current, { scaleX: 0 })
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 })

      tl.to(badgeRef.current, {
        autoAlpha: 1,
        x: 0,
        duration: 1,
        ease: 'back.out(1.7)' // Gir den lille "spretten" på slutten
      })
        // 2. Hovedoverskrift kommer opp. SkewY gir en cinematisk "oppreisning"
        .to(
          headlineMainRef.current,
          {
            autoAlpha: 1,
            y: 0,
            skewY: 0,
            duration: 1,
            ease: 'power4.out'
          },
          '-=0.6'
        ) // Starter litt før badgen er ferdig

        // 3. Highlighter-effekten sveipes inn bak teksten
        .to(
          headlineHighlightBgRef.current,
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'expo.inOut',
            transformOrigin: 'left center'
          },
          '-=0.8'
        )

        // 4. Brødtekst og CTA kommer inn
        .to(
          [bodyRef.current, ctaRef.current],
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8
          },
          '-=0.4'
        )

        // 5. Ikonene popper opp med sprett
        .to(
          '.stat-item',
          {
            autoAlpha: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'back.out(2)' // Mer markant sprett
          },
          '-=0.2'
        )

      // --- DESKTOP SPESIFIKT (Beholder 3D-effekten fra forrige versjon) ---
      mm.add('(min-width: 1024px)', () => {
        gsap.fromTo(
          imageContainerRef.current,
          { scale: 0.9, opacity: 0, x: 50 },
          {
            scale: 1,
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: 'expo.out',
            delay: 0.5
          }
        )
      })

      // --- MOBIL SPESIFIKT ---
      mm.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          imageContainerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.4 }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Mouse move logic (Kun Desktop - uendret fra forrige versjon)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024 || !imageContainerRef.current) return
    const { clientX, clientY, currentTarget } = e
    const { width, height, left, top } = currentTarget.getBoundingClientRect()
    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5
    gsap.to(imageContainerRef.current, {
      rotateY: x * 8,
      rotateX: -y * 8,
      x: x * 15,
      y: y * 15,
      duration: 1,
      ease: 'power2.out',
      transformPerspective: 1000
    })
  }

  const handleMouseLeave = () => {
    if (window.innerWidth < 1024 || !imageContainerRef.current) return
    gsap.to(imageContainerRef.current, {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)'
    })
  }

  return (
    <section
      ref={containerRef}
      className='relative min-h-[100dvh] w-full overflow-hidden bg-[#0a0a0a] text-white flex flex-col lg:flex-row items-center justify-center pt-24 pb-12 px-4 lg:py-0'
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Bakgrunnsbilde med kaldere toner */}
      {backgroundImageSrc && (
        <div className='absolute inset-0 z-0 select-none pointer-events-none'>
          <Image
            src={backgroundImageSrc}
            alt=''
            fill
            priority
            className='object-cover opacity-30 grayscale hue-rotate-180' // hue-rotate for å gjøre den kaldere
            sizes='100vw'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]' />
        </div>
      )}

      <div className='container relative z-10 mx-auto h-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center'>
        {/* TEKST */}
        <div className='flex flex-col gap-6 lg:gap-8 order-1 lg:order-1 text-center lg:text-left items-center lg:items-start max-w-lg mx-auto lg:mx-0'>
          {/* NY BADGE STIL: Kaldere farger, skifer/cyan */}
          <div
            ref={badgeRef}
            className='invisible inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-sky-300 font-medium tracking-wider text-xs uppercase backdrop-blur-md shadow-xl shadow-sky-900/20'
          >
            <ShieldCheck className='w-4 h-4' />
            <span>Utekosens Skjold</span>
          </div>

          {/* NY OVERSKRIFT MED HIGHLIGHT EFFEKT */}
          <h1
            ref={headlineMainRef}
            className='invisible text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] will-change-transform skew-y-3'
          >
            Hold varmen. <br />
            <span className='relative whitespace-nowrap inline-block mt-1'>
              {/* Highlighter-bakgrunnen som sveipes inn */}
              <span
                ref={headlineHighlightBgRef}
                className='absolute inset-0 bg-gradient-to-r from-sky-900/60 to-cyan-900/60 -skew-x-6 rounded-sm -mx-2'
              />
              {/* Selve teksten med gradient */}
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

          {/* CTA knapp med ny farge */}
          <div
            ref={ctaRef}
            className='invisible flex flex-col w-full sm:w-auto gap-4 mt-2'
          >
            <button
              onClick={onCtaClick}
              className='w-full sm:w-auto group relative px-8 py-4 bg-white text-[#0a0a0a] font-bold rounded-full text-lg overflow-hidden transition-transform active:scale-95 shadow-lg shadow-sky-900/30'
            >
              {/* Hover-farge endret til sky-600 */}
              <div className='absolute inset-0 bg-gradient-to-r from-sky-500 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out' />
              <span className='relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors'>
                Kjøp nå - 999,- <ArrowRight className='w-5 h-5' />
              </span>
            </button>
            <p className='text-xs text-slate-400 text-center lg:text-left'>
              Fri frakt inkludert • Rask levering
            </p>
          </div>

          {/* Stats bar - Nye ikoner og farger */}
          <div
            ref={statsRef}
            className='flex justify-center lg:justify-start gap-8 mt-6 pt-6 border-t border-slate-800/50 w-full'
          >
            <div className='stat-item flex flex-col items-center lg:items-start gap-2 p-2 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm'>
              <Droplets className='w-6 h-6 text-sky-400' />
              <span className='font-bold text-sm text-sky-100'>8000mm</span>
            </div>
            <div className='stat-item flex flex-col items-center lg:items-start gap-2 p-2 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm'>
              <Wind className='w-6 h-6 text-slate-300' />
              <span className='font-bold text-sm text-slate-200'>Vindtett</span>
            </div>
            <div className='stat-item flex flex-col items-center lg:items-start gap-2 p-2 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm'>
              {/* Sherpa ikon - endret farge */}
              <div className='w-6 h-6 rounded-full border-2 border-slate-400 bg-slate-700/50' />
              <span className='font-bold text-sm text-slate-200'>
                SherpaCore™
              </span>
            </div>
          </div>
        </div>

        {/* BILDE */}
        <div className='relative order-2 lg:order-2 w-full flex justify-center perspective-1000 h-[40vh] sm:h-[50vh] lg:h-auto'>
          <div
            ref={imageContainerRef}
            className='relative w-full h-full max-w-[400px] lg:max-w-[600px] lg:aspect-[3/4]'
          >
            {/* Glow effect - Endret fra oransje til en kaldere, mer mystisk cyan/blå */}
            <div className='absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-sky-600/30 to-cyan-500/20 rounded-full blur-[80px] animate-pulse-slow pointer-events-none' />

            <Image
              src={productImageSrc}
              alt='Comfyrobe Waterproof Changing Robe'
              fill
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
