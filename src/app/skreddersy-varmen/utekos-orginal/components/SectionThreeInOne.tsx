// Path: src/components/frontpage/SectionThreeInOne.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils/className'
import { Maximize2, Move, User } from 'lucide-react'
import KateLinnKikkertImage from '@public/kate-linn-kikkert-4-5.png'
import TechDownFrontImage from '@public/fiberdun/techdawn-front.png'
import ClassicGeminiCouple45 from '@public/classic-gemeni-4-5.png'

const steps = [
  {
    id: 'fullengde',
    stepNumber: '01',
    modeName: 'Fullengdemodus',
    title: 'Maksimal isolasjon',
    description:
      'Utgangspunktet for selve utekosen. Pakk deg inn i en isolerende kokong for komplett komfort. Perfekt i hytteveggen, utenfor bobilen eller lange kvelder på terrassen hvor roen senker seg.',
    icon: <Maximize2 className='w-5 h-5' />,
    image: ClassicGeminiCouple45,
    isProduct: false,
    desktopObjectFit: 'cover',
    desktopObjectPosition: 'center 30%'
  },
  {
    id: 'oppjustert',
    stepNumber: '02',
    modeName: 'Oppjustert modus',
    title: 'Umiddelbar mobilitet',
    description:
      'Nyter du total omfavnelse av Utekos, men må plutselig en rask tur på kjøkkenet eller svare på telefonen som ringer fra andre siden av huset? Heis opp plagget til ønsket lengde, stram med den utvendige snoren i livet og vær mobil på få sekunder. Beveg deg uten snublefare og subbefritt - uten å miste varmen.',
    icon: <Move className='w-5 h-5' />,
    image: TechDownFrontImage,
    isProduct: true,
    desktopObjectFit: 'contain',
    desktopObjectPosition: 'center center'
  },
  {
    id: 'parkas',
    stepNumber: '03',
    modeName: 'Parkasmodus',
    title: 'Selvformet eleganse',
    description:
      'Planlagt bevegelse over tid. Forvandle Utekos til en selvformet parkas. Full bevegelsesfrihet med et elegant snitt.',
    icon: <User className='w-5 h-5' />,
    image: KateLinnKikkertImage,
    isProduct: false,
    desktopObjectFit: 'cover',
    desktopObjectPosition: 'center center'
  }
]

export function SectionThreeInOne() {
  const [activeStep, setActiveStep] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-step-index'))
            setActiveStep(index)
          }
        })
      },
      {
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0
      }
    )

    stepRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section className='bg-[#1F2421] text-[#F4F1EA] w-full'>
      {/* HEADER (Felles) */}
      <div className='py-16 px-6 md:py-24 text-center max-w-4xl mx-auto'>
        <span className='text-[#E07A5F] font-bold tracking-[0.2em] uppercase text-xs block mb-3'>
          Adaptiv funksjonalitet
        </span>
        <h2 className='font-serif text-4xl md:text-6xl mb-6 leading-tight'>
          Friheten til å velge.
        </h2>
        <p className='text-[#F4F1EA]/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto'>
          Det unike med Utekos® er transformasjonen. Fra en isolerende kokong
          til en elegant parkas på sekunder. Juster, form og nyt.
        </p>
      </div>

      {/* =========================================
          MOBILE LAYOUT
      ========================================= */}
      <div className='lg:hidden flex flex-col w-full pb-20'>
        {steps.map((step, index) => (
          <div key={step.id} className='flex flex-col mb-12 last:mb-0'>
            <div
              className={cn(
                'relative w-full border-y border-white/5 bg-[#151515]',
                step.isProduct ? 'aspect-[4/5]' : 'aspect-square'
              )}
            >
              <Image
                src={step.image}
                alt={step.title}
                fill
                className={
                  step.isProduct ? 'object-contain p-8' : 'object-cover'
                }
                sizes='100vw'
              />
              <div className='absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-bold text-white tracking-widest border border-white/10'>
                {step.stepNumber}
              </div>
            </div>

            <div className='px-6 pt-6'>
              <div className='flex items-center gap-2 mb-2 text-[#E07A5F]'>
                {step.icon}
                <span className='text-xs font-bold uppercase tracking-widest'>
                  {step.modeName}
                </span>
              </div>
              <h3 className='text-2xl font-serif text-[#F4F1EA] mb-3'>
                {step.title}
              </h3>
              <p className='text-[#F4F1EA]/70 text-base leading-relaxed font-light'>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* =========================================
          DESKTOP LAYOUT (FIXED BLUR)
      ========================================= */}
      <div className='hidden lg:flex w-full'>
        {/* Venstre: Sticky Image */}
        <div className='w-1/2 h-screen sticky top-0 flex items-center justify-center bg-[#151515] overflow-hidden border-r border-white/5'>
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                'absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out',
                activeStep === index ?
                  'opacity-100 scale-100 z-10'
                : 'opacity-0 scale-105 z-0'
              )}
            >
              <Image
                src={step.image}
                alt={step.title}
                fill
                priority={index === 0}
                className={
                  step.desktopObjectFit === 'contain' ?
                    'object-contain p-20'
                  : 'object-cover'
                }
                style={{
                  objectPosition: step.desktopObjectPosition || 'center'
                }}
                sizes='50vw'
              />
              <div className='absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#151515] to-transparent opacity-50' />
            </div>
          ))}

          <div className='absolute left-8 bottom-8 z-20 flex gap-3'>
            {steps.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1 rounded-full transition-all duration-500',
                  activeStep === i ? 'w-8 bg-[#E07A5F]' : 'w-2 bg-white/20'
                )}
              />
            ))}
          </div>
        </div>

        {/* Høyre: Text Scroll */}
        <div className='w-1/2 flex flex-col bg-[#1F2421]'>
          {steps.map((step, index) => (
            <div
              key={step.id}
              data-step-index={index}
              ref={el => {
                stepRefs.current[index] = el
              }}
              className='min-h-screen flex flex-col justify-center px-20 border-b border-white/5 last:border-0'
            >
              <div
                className={cn(
                  'transition-all duration-700 delay-200 transform will-change-transform',
                  activeStep === index ?
                    'opacity-100 translate-y-0 blur-0'
                  : 'opacity-20 translate-y-8 blur-sm'
                )}
              >
                <span className='text-[#E07A5F] font-mono text-sm tracking-widest uppercase mb-4 block'>
                  {step.stepNumber} — {step.modeName}
                </span>

                <h3 className='text-5xl font-serif text-[#F4F1EA] mb-6'>
                  {step.title}
                </h3>

                <p className='text-xl text-[#F4F1EA]/70 leading-relaxed font-light max-w-lg'>
                  {step.description}
                </p>

                <div className='mt-8 p-4 bg-white/5 rounded-full w-fit text-[#E07A5F] border border-white/5'>
                  {step.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
