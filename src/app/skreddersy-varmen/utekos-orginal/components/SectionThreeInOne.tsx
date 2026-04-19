// Path: src/app/skreddersy-varmen/utekos-orginal/components/SectionThreeInOne.tsx
'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils/className'
import { Steps } from './Steps'
import { useThreeInOneAnimations } from '@/hooks/useThreeInOneAnimations'

export function SectionThreeInOne() {
  const { containerRef, activeStep } = useThreeInOneAnimations()

  return (
    <section
      ref={containerRef}
      aria-labelledby='threeinone-heading'
      className='w-full bg-[#1F2421] text-[#F4F1EA]'
    >
      {/* Intro header */}
      <div className='gsap-three-intro mx-auto max-w-4xl px-6 py-16 text-center md:py-24'>
        <span className='gsap-three-eyebrow mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-[#E07A5F]'>
          Adaptiv funksjonalitet
        </span>
        <h2
          id='threeinone-heading'
          className='gsap-three-title mb-6 font-serif text-[clamp(2rem,7.5vw,4rem)] leading-tight'
        >
          Friheten til å velge.
        </h2>
        <p className='gsap-three-subtitle mx-auto max-w-2xl text-balance text-base font-light leading-relaxed text-[#F4F1EA]/70 md:text-xl'>
          Det unike med Utekos<span className='text-[#E07A5F]'>®</span> er
          transformasjonen. Fra en isolerende kokong til en elegant parkas på
          sekunder. Juster, form og nyt.
        </p>
      </div>

      {/* MOBILE: stacked cards */}
      <div className='flex flex-col pb-20 lg:hidden'>
        {Steps.map(step => (
          <div
            key={step.id}
            className='gsap-step-panel mb-12 flex flex-col last:mb-0'
          >
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
              <div className='gsap-step-badge absolute left-4 top-4 border border-white/10 bg-black/60 px-3 py-1 text-xs font-bold tracking-widest text-white backdrop-blur-md'>
                {step.stepNumber}
              </div>
            </div>

            <div className='px-6 pt-6'>
              <div className='gsap-step-eyebrow mb-2 flex items-center gap-2 text-[#E07A5F]'>
                {step.icon}
                <span className='text-xs font-bold uppercase tracking-widest'>
                  {step.modeName}
                </span>
              </div>
              <h3 className='gsap-step-title mb-3 font-serif text-2xl text-[#F4F1EA]'>
                {step.title}
              </h3>
              <p className='gsap-step-desc text-base font-light leading-relaxed text-[#F4F1EA]/70'>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP: scroll-pinned storytelling */}
      <div className='hidden w-full lg:flex'>
        {/* Sticky image column */}
        <div className='sticky top-0 flex h-screen w-1/2 items-center justify-center overflow-hidden border-r border-white/5 bg-[#151515]'>
          {Steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                'absolute inset-0 h-full w-full transition-all duration-1000 ease-in-out',
                activeStep === index ?
                  'z-10 scale-100 opacity-100'
                : 'z-0 scale-105 opacity-0'
              )}
            >
              <Image
                src={step.image}
                alt={step.title}
                fill
                priority={index === 0}
                className={cn(
                  'gsap-step-image will-change-transform',
                  step.desktopObjectFit === 'contain' ?
                    'object-contain p-20'
                  : 'object-cover'
                )}
                style={{
                  objectPosition: step.desktopObjectPosition || 'center'
                }}
                sizes='50vw'
              />
              <div className='absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#151515] to-transparent opacity-50' />
            </div>
          ))}

          <div className='absolute bottom-8 left-8 z-20 flex gap-3'>
            {Steps.map((_, i) => (
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

        {/* Scrolling text column */}
        <div className='flex w-1/2 flex-col bg-[#1F2421]'>
          {Steps.map(step => (
            <div
              key={step.id}
              className='gsap-step-panel flex min-h-screen flex-col justify-center border-b border-white/5 px-20 last:border-0'
            >
              <div className='will-change-transform'>
                <span className='gsap-step-eyebrow mb-4 block font-mono text-sm uppercase tracking-widest text-[#E07A5F]'>
                  {step.stepNumber} — {step.modeName}
                </span>

                <h3 className='gsap-step-title mb-6 font-serif text-5xl text-[#F4F1EA]'>
                  {step.title}
                </h3>

                <p className='gsap-step-desc max-w-lg text-xl font-light leading-relaxed text-[#F4F1EA]/70'>
                  {step.description}
                </p>

                <div className='gsap-step-icon mt-8 w-fit rounded-full border border-white/5 bg-white/5 p-4 text-[#E07A5F]'>
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
