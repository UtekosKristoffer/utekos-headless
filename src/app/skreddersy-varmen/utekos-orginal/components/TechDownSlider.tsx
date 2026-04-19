// Path: src/app/skreddersy-varmen/utekos-orginal/components/TechDownSlider.tsx
'use client'

import Image from 'next/image'
import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronsLeftRight, ShieldCheck, Waves } from 'lucide-react'
import TechDownDryFiber from '@public/techdown-dry-macro.png'
import TechDownWetFiber from '@public/techdown-wet-macro.png'
import {
  useTechDownSliderAnimations,
  useTechDownContentSwap
} from '@/hooks/useTechDownSliderAnimations'

const content = {
  dry: {
    label: 'Tørt klima',
    title: 'Maksimal isolasjon',
    desc: 'Slik ser Utekos TechDown™ ut under ideelle forhold. Tusenvis av mikroskopiske luftlommer fanger kroppsvarmen din og skaper en lun, beskyttende barriere mot omgivelsene.',
    icon: <ShieldCheck className='h-6 w-6 text-[#E07A5F]' aria-hidden />
  },
  wet: {
    label: 'Fuktig klima',
    title: 'Uendret beskyttelse',
    desc: 'Her skiller teknologien seg fra tradisjonell dun. Under fuktige forhold og når regnet treffer, kollapser ikke fibrene. De er hydrofobe (vannavstøtende) og fortsetter å isolere deg.',
    icon: <Waves className='h-6 w-6 text-[#E07A5F]' aria-hidden />
  }
} as const

export function TechDownSlider() {
  const containerRef = useTechDownSliderAnimations()
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const sliderImageRef = useRef<HTMLDivElement>(null)

  const isDryView = position > 50
  const currentContent = isDryView ? content.dry : content.wet

  // Animate content swap when dry/wet toggles
  useTechDownContentSwap(isDryView, {
    badge: '.gsap-tech-status-badge',
    title: '.gsap-tech-card-title',
    desc: '.gsap-tech-card-desc',
    stat: '.gsap-tech-stat'
  })

  const handleMove = useCallback((clientX: number) => {
    if (!sliderImageRef.current) return
    const rect = sliderImageRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100)
    setPosition(percentage)
  }, [])

  const onMouseMove = (e: React.MouseEvent) =>
    isDragging && handleMove(e.clientX)

  const onTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX)
    }
  }

  useEffect(() => {
    const handleUp = () => setIsDragging(false)
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('touchend', handleUp, { passive: true })
    return () => {
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('touchend', handleUp)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      aria-labelledby='techdown-heading'
      className='w-full border-t border-[#2C2420]/5 bg-[#F9F8F6] py-24 text-[#2C2420]'
    >
      <div className='mx-auto max-w-5xl px-6'>
        {/* Intro header */}
        <div className='gsap-tech-intro mb-16 text-center'>
          <span className='gsap-tech-eyebrow mb-3 inline-block text-xs font-bold uppercase tracking-[0.22em] text-[#E07A5F]'>
            Teknologi
          </span>
          <h2
            id='techdown-heading'
            className='gsap-tech-title mb-6 font-serif text-4xl text-[#2C2420] text-balance md:text-5xl lg:text-6xl'
          >
            Når været snur, består varmen.
          </h2>
          <p className='gsap-tech-subtitle mx-auto max-w-2xl text-lg font-light leading-relaxed text-[#2C2420]/70 md:text-xl'>
            Dra linjen for å se forskjellen på hvordan vanlig dun og Utekos
            TechDown™ håndterer fuktighet.
          </p>
        </div>

        {/* Slider card */}
        <div className='gsap-tech-slider relative rounded-sm border border-[#2C2420]/10 bg-white p-2 shadow-2xl md:p-4'>
          <div
            ref={sliderImageRef}
            className='relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-sm bg-[#111] touch-none md:aspect-[21/9]'
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
          >
            <div className='absolute inset-0 h-full w-full'>
              <Image
                src={TechDownWetFiber}
                alt='TechDown fiber i fuktig vær'
                fill
                sizes='(max-width: 1024px) 100vw, 80vw'
                className='object-cover opacity-90'
                draggable={false}
              />
              <div className='absolute inset-0 bg-black/20' />
            </div>
            <div
              className='absolute inset-0 z-20 overflow-hidden border-r-2 border-white/50'
              style={{ width: `${position}%` }}
            >
              <div
                className='relative h-full w-full'
                style={{
                  width:
                    sliderImageRef.current ?
                      sliderImageRef.current.offsetWidth
                    : '100%'
                }}
              >
                <Image
                  src={TechDownDryFiber}
                  alt='TechDown fiber i tørt vær'
                  fill
                  sizes='(max-width: 1024px) 100vw, 80vw'
                  className='object-cover'
                  draggable={false}
                  priority
                />
                <div className='absolute inset-0 bg-black/10' />
              </div>
            </div>
            <div className='pointer-events-none absolute right-6 top-6 z-10'>
              <span className='rounded-sm border border-white/10 bg-[#2C2420]/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md'>
                Fuktig vær
              </span>
            </div>
            <div className='pointer-events-none absolute left-6 top-6 z-30'>
              <span className='rounded-sm bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#2C2420] shadow-lg backdrop-blur-md'>
                Tørt vær
              </span>
            </div>
            <div
              className='absolute bottom-0 top-0 z-40 flex w-1 cursor-ew-resize items-center justify-center bg-white shadow-[0_0_30px_rgba(0,0,0,0.5)]'
              style={{ left: `${position}%` }}
            >
              <div className='gsap-tech-handle flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full border border-[#E5E0D6] bg-white text-[#E07A5F] shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:scale-110 active:scale-95'>
                <ChevronsLeftRight size={28} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Content card — animated swap on slider change */}
        <div className='gsap-tech-card mt-12 rounded-sm border border-[#2C2420]/5 bg-white p-8 shadow-xl md:p-12'>
          <div className='flex flex-col items-start gap-8 md:flex-row md:gap-16'>
            <div className='flex flex-col items-start md:w-1/3'>
              <div className='gsap-tech-status-badge mb-4 flex items-center gap-3 rounded-full bg-[#E07A5F]/10 px-4 py-2 text-[#E07A5F]'>
                {currentContent.icon}
                <span className='text-xs font-bold uppercase tracking-widest'>
                  Status: {currentContent.label}
                </span>
              </div>

              <h3 className='gsap-tech-card-title font-serif text-3xl leading-tight text-[#2C2420]'>
                {currentContent.title}
              </h3>
            </div>

            <div className='md:w-2/3'>
              <p className='gsap-tech-card-desc mb-8 text-lg leading-relaxed text-[#2C2420]/70'>
                {currentContent.desc}
              </p>

              <div className='border-t border-[#2C2420]/10 pt-6'>
                <div className='mb-2 flex items-end justify-between'>
                  <span className='text-xs font-bold uppercase tracking-widest text-[#2C2420]/50'>
                    Isolasjonsevne
                  </span>
                  <span className='gsap-tech-stat font-serif text-xl text-[#2C2420]'>
                    {isDryView ? '100%' : '98%'}
                  </span>
                </div>
                <div className='h-1 w-full overflow-hidden rounded-full bg-[#2C2420]/5'>
                  <div
                    className='gsap-tech-progress h-full bg-[#E07A5F] transition-[width] duration-1000 ease-out'
                    style={{ width: isDryView ? '100%' : '98%' }}
                  />
                </div>
                <p className='mt-2 text-xs italic text-[#2C2420]/50'>
                  *Beholder nær full effekt selv i ekstrem fuktighet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
