// Path: src/app/skreddersy-varmen/utekos-orginal/components/TechDownSlider.tsx

'use client'

import Image from 'next/image'
import { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { ChevronsLeftRight, ShieldCheck, Waves } from 'lucide-react'
import TechDownDryFiber from '@public/techdown-dry-macro.png'
import TechDownWetFiber from '@public/techdown-wet-macro.png'
import { cn } from '@/lib/utils/className'

export function TechDownSlider() {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const content = {
    dry: {
      label: 'Tørt klima',
      title: 'Optimal isolasjon',
      desc: 'Slik ser Utekos TechDown™ ut under ideelle forhold. Tusenvis av mikroskopiske luftlommer fanger kroppsvarmen din og skaper en lun, beskyttende barriere mot omgivelsene.',
      highlight: 'Maksimal loft',
      icon: <ShieldCheck className='w-6 h-6 text-[#E07A5F]' />
    },
    wet: {
      label: 'Fuktig klima',
      title: 'Uendret beskyttelse',
      desc: 'Her skiller teknologien seg fra tradisjonell dun. Under fuktige forhold og når regnet treffer, kollapser ikke fibrene. De er hydrofobe (vannavstøtende) og fortsetter å isolere deg.',
      highlight: 'Beholder varmen',
      icon: <Waves className='w-6 h-6 text-[#E07A5F]' />
    }
  }

  const isDryView = position > 50
  const currentContent = isDryView ? content.dry : content.wet

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
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
    window.addEventListener('touchend', handleUp)
    return () => {
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('touchend', handleUp)
    }
  }, [])

  return (
    <section className='w-full py-24 bg-[#F9F8F6] text-[#2C2420] border-t border-[#2C2420]/5'>
      <div className='max-w-5xl mx-auto px-6'>
        <AnimatedBlock className='text-center mb-16'>
          <span className='text-[#E07A5F] font-bold tracking-[0.2em] uppercase text-xs block mb-3'>
            Teknologi
          </span>
          <h2 className='font-serif text-4xl md:text-5xl text-[#2C2420] mb-6'>
            Når været snur, består varmen.
          </h2>
          <p className='text-lg md:text-xl text-[#2C2420]/70 max-w-2xl mx-auto font-light leading-relaxed'>
            Dra linjen for å se forskjellen på hvordan vanlig dun og Utekos
            TechDown™ håndterer fuktighet.
          </p>
        </AnimatedBlock>
        <AnimatedBlock className='animate-on-scroll' delay='0.2s'>
          <div className='relative p-2 md:p-4 bg-white border border-[#2C2420]/10 shadow-2xl rounded-sm'>
            <div
              ref={containerRef}
              className='relative w-full aspect-[4/3] md:aspect-[21/9] rounded-sm overflow-hidden cursor-ew-resize select-none touch-none bg-[#111]'
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              onMouseMove={onMouseMove}
              onTouchMove={onTouchMove}
            >
              <div className='absolute inset-0 w-full h-full'>
                <Image
                  src={TechDownWetFiber}
                  alt='TechDown fiber i fuktig vær'
                  fill
                  sizes='(max-width: 1024px) 100vw, 80vw'
                  className='object-cover opacity-90'
                  draggable={false}
                />
                <div className='absolute inset-0 bg-black/20' />{' '}
              </div>
              <div
                className='absolute inset-0 overflow-hidden z-20 border-r-2 border-white/50'
                style={{ width: `${position}%` }}
              >
                <div
                  className='relative w-full h-full'
                  style={{
                    width:
                      containerRef.current ?
                        containerRef.current.offsetWidth
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
              <div className='absolute top-6 right-6 z-10 pointer-events-none'>
                <span className='bg-[#2C2420]/80 backdrop-blur-md text-white px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm border border-white/10'>
                  Fuktig vær
                </span>
              </div>
              <div className='absolute top-6 left-6 z-30 pointer-events-none'>
                <span className='bg-white/90 backdrop-blur-md text-[#2C2420] px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm shadow-lg'>
                  Tørt vær
                </span>
              </div>
              <div
                className='absolute top-0 bottom-0 w-1 bg-white z-40 cursor-ew-resize flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]'
                style={{ left: `${position}%` }}
              >
                <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.3)] text-[#E07A5F] transform transition-transform duration-200 hover:scale-110 active:scale-95 border border-[#E5E0D6]'>
                  <ChevronsLeftRight size={28} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>
        </AnimatedBlock>
        <AnimatedBlock className='animate-on-scroll mt-12' delay='0.3s'>
          <div className='bg-white p-8 md:p-12 border border-[#2C2420]/5 shadow-xl rounded-sm transition-all duration-500'>
            <div className='flex flex-col md:flex-row gap-8 md:gap-16 items-start'>
              <div className='md:w-1/3 flex flex-col items-start'>
                <div className='flex items-center gap-3 mb-4 text-[#E07A5F] bg-[#E07A5F]/10 px-4 py-2 rounded-full'>
                  {currentContent.icon}
                  <span className='text-xs font-bold uppercase tracking-widest'>
                    Status: {currentContent.label}
                  </span>
                </div>
                <h3 className='text-3xl font-serif text-[#2C2420] leading-tight'>
                  {currentContent.title}
                </h3>
              </div>
              <div className='md:w-2/3'>
                <p className='text-lg text-[#2C2420]/70 leading-relaxed mb-8'>
                  {currentContent.desc}
                </p>
                <div className='border-t border-[#2C2420]/10 pt-6'>
                  <div className='flex justify-between items-end mb-2'>
                    <span className='text-xs uppercase tracking-widest text-[#2C2420]/50 font-bold'>
                      Isolasjonsevne
                    </span>
                    <span className='text-xl font-serif text-[#2C2420]'>
                      {isDryView ? '100%' : '98%'}
                    </span>
                  </div>
                  <div className='w-full h-1 bg-[#2C2420]/5 rounded-full overflow-hidden'>
                    <div
                      className={cn(
                        'h-full bg-[#E07A5F] transition-all duration-1000 ease-out',
                        isDryView ? 'w-full' : 'w-[98%]'
                      )}
                    />
                  </div>
                  <p className='text-xs text-[#2C2420]/50 mt-2 italic'>
                    *Beholder nær full effekt selv i ekstrem fuktighet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedBlock>
      </div>
    </section>
  )
}
