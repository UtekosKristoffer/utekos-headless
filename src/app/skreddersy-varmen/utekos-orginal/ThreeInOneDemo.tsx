'use client'

import { useState } from 'react'
import Image from 'next/image'
import { LayoutDashboard, ArrowUpToLine, Shield } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'

type Mode = 'parkas' | 'oppfestet' | 'fulldekket'

const modes: {
  id: Mode
  title: string
  desc: string
  icon: any
  mobileSrc: string // 3:4 format (f.eks 1080x1440)
  desktopSrc: string // 16:9 format (f.eks 1920x1080)
}[] = [
  {
    id: 'parkas',
    title: 'Parkas',
    desc: 'Klassisk passform for bevegelse og aktivitet.',
    icon: LayoutDashboard,
    mobileSrc: '/classic-blue-parkas-3-4.png',
    desktopSrc: '/1080/aspect-video-parkas.png'
  },
  {
    id: 'oppfestet',
    title: 'Oppfestet',
    desc: 'Maksimal mobilitet rundt leirplassen.',
    icon: ArrowUpToLine,
    mobileSrc: '/classic-blue-jacket-3-4.png',
    desktopSrc: '/1080/aspect-video-jacket.png'
  },
  {
    id: 'fulldekket',
    title: 'Kokong',
    desc: 'Total isolasjon fra topp til tå for rolig hygge.',
    icon: Shield,
    mobileSrc: '/classic-blue-full-3-4.png',
    desktopSrc: '/1080/aspect-video-kokong-2.png'
  }
]

export function ThreeInOneDemo() {
  const [activeMode, setActiveMode] = useState<Mode>('fulldekket')

  const activeModeData = modes.find(m => m.id === activeMode)

  return (
    <section className='w-full py-16 md:py-24 bg-[#2C2420] text-[#F4F1EA] overflow-hidden'>
      <div className='max-w-6xl mx-auto px-4 md:px-6 text-center'>
        <AnimatedBlock className='animate-on-scroll mb-6 md:mb-12'>
          <span className='text-[#E07A5F] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-3 block'>
            Modulært system
          </span>
          <h3 className='font-serif text-3xl md:text-5xl mb-4 md:mb-6'>
            Ett plagg. Uendelig med muligheter.
          </h3>
          <p className='text-[#F4F1EA]/70 max-w-xl mx-auto text-base md:text-lg font-light'>
            Veksle sømløst mellom modusene for å tilpasse deg vær, aktivitet og
            humør.
          </p>
        </AnimatedBlock>
        <AnimatedBlock className='animate-on-scroll mb-6 md:mb-12' delay='0.1s'>
          <div className='inline-flex flex-nowrap w-full md:w-auto justify-center gap-1 md:gap-2 p-1 md:p-1.5 bg-black/20 rounded-full backdrop-blur-sm border border-white/5 overflow-x-auto no-scrollbar'>
            {modes.map(mode => {
              const isActive = activeMode === mode.id
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`
                    relative flex items-center justify-center gap-1.5 md:gap-2 
                    px-3 py-2 md:px-6 md:py-3 
                    rounded-full 
                    text-xs md:text-base font-medium 
                    whitespace-nowrap flex-1 md:flex-none
                    transition-all duration-300 ease-out
                    ${
                      isActive ?
                        'bg-[#E07A5F] text-white shadow-lg scale-100'
                      : 'text-[#F4F1EA]/60 hover:text-[#F4F1EA] hover:bg-white/5'
                    }
                  `}
                >
                  <mode.icon size={14} className='md:w-[18px] md:h-[18px]' />
                  <span>{mode.title}</span>
                </button>
              )
            })}
          </div>
        </AnimatedBlock>

        {/* --- IMAGE CONTAINER --- */}
        <AnimatedBlock
          className='animate-on-scroll w-full max-w-sm md:max-w-5xl mx-auto'
          delay='0.2s'
        >
          <div className='relative w-full aspect-[9/16] md:aspect-video bg-[#1F2421] rounded-2xl overflow-hidden border border-[#F4F1EA]/10 shadow-2xl transition-[aspect-ratio] duration-300'>
            {modes.map(mode => {
              const isActive = activeMode === mode.id

              return (
                <div
                  key={mode.id}
                  className={`
                    absolute inset-0 w-full h-full transition-all duration-700 ease-in-out
                    ${isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'}
                  `}
                >
                  {/* MOBILE IMAGE */}
                  <div className='block md:hidden w-full h-full relative'>
                    <Image
                      src={mode.mobileSrc}
                      alt={`Utekos ${mode.title} mobilvisning`}
                      fill
                      className='object-cover object-top'
                      sizes='(max-width: 768px) 100vw'
                      priority={mode.id === 'fulldekket'}
                      quality={90}
                    />
                  </div>

                  <div className='hidden md:block w-full h-full relative'>
                    <Image
                      src={mode.desktopSrc}
                      alt={`Utekos ${mode.title} desktopvisning`}
                      fill
                      className='object-contain'
                      sizes='80vw'
                      priority={mode.id === 'fulldekket'}
                      quality={100}
                    />
                  </div>
                  <div className='hidden md:block absolute inset-0 bg-gradient-to-t from-[#2C2420] via-transparent to-black/10 z-10 opacity-60' />

                  <div
                    className={`
                      hidden md:block
                      absolute md:bottom-12 md:left-12 md:w-auto md:max-w-md 
                      p-6 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 z-20 text-left
                      transition-all duration-500 delay-100
                      ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                    `}
                  >
                    <div className='flex items-center gap-3 mb-2 text-[#E07A5F]'>
                      <mode.icon size={20} />
                      <h4 className='text-xl font-serif font-bold tracking-wide capitalize'>
                        {mode.title}
                      </h4>
                    </div>
                    <p className='text-[#F4F1EA] text-base leading-relaxed opacity-90'>
                      {mode.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {activeModeData && (
            <div className='md:hidden mt-4 text-left p-4 bg-white/5 rounded-xl border border-white/5 animate-fade-in-up'>
              <div className='flex items-center gap-2 mb-2 text-[#E07A5F]'>
                <activeModeData.icon size={18} />
                <h4 className='text-lg font-serif font-bold tracking-wide capitalize'>
                  {activeModeData.title}
                </h4>
              </div>
              <p className='text-[#F4F1EA]/80 text-sm leading-relaxed'>
                {activeModeData.desc}
              </p>
            </div>
          )}
        </AnimatedBlock>
      </div>
    </section>
  )
}
