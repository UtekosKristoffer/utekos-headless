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
      className='w-full bg-mountain-view text-cloud-dancer'
    >
      {/* Intro header */}
      <div className='gsap-three-intro mx-auto max-w-4xl px-6 py-16 text-center md:py-24'>
        <span className='gsap-three-eyebrow mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-overcast!'>
          Adaptiv funksjonalitet
        </span>
        <h2
          id='threeinone-heading'
          className='gsap-three-title mb-6 font-google-sans font-semibold text-[clamp(2rem,7.5vw,4rem)] leading-[0.92] tracking-[-0.01em]'
        >
          Friheten til å velge
        </h2>
        <p className='gsap-three-subtitle mx-auto max-w-2xl text-balance text-base font-light leading-[1.45] tracking-[-0.02em] text-cloud-dancer md:text-xl'>
          Det unike med Utekos<span className='text-overcast'>®</span> er
          transformasjonen. Fra en isolerende kokong til en elegant parkas på
          sekunder. Juster, form og nyt.
        </p>
      </div>

      {/* MOBILE: stacked cards */}
      <div className='flex flex-col pb-20 xl:hidden'>
        {Steps.map(step => (
          <div
            key={step.id}
            className='gsap-mobile-step-panel mb-12 flex flex-col last:mb-0'
          >
            <div
              className={cn(
                'relative w-full border-y border-white/5 bg-mountain-view',
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
                sizes='(min-width: 1280px) 0px, 100vw'
              />
              <div className='gsap-step-badge absolute left-4 top-4 border border-white/10 bg-black/60 px-3 py-1 font-google-sans text-xs font-bold tracking-[0.15em] text-cloud-dancer backdrop-blur-md'>
                {step.stepNumber}
              </div>
            </div>

            <div className='px-6 pt-6'>
              <div className='gsap-step-eyebrow mb-2 flex items-center gap-2 text-overcast'>
                <span className='gsap-step-icon inline-flex shrink-0 text-overcast'>
                  {step.icon}
                </span>
                <span className='font-google-sans text-xs font-bold uppercase tracking-[0.15em]'>
                  {step.modeName}
                </span>
              </div>
              <h3 className='gsap-step-title mb-3 font-google-sans font-semibold text-2xl leading-[0.92] tracking-[-0.01em] text-cloud-dancer'>
                {step.title}
              </h3>
              <p className='gsap-step-desc text-base font-light leading-[1.45] tracking-[-0.02em] text-cloud-dancer/70'>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP: scroll-pinned storytelling */}
      <div className='hidden w-full xl:flex'>
        {/* Sticky image column */}
        <div className='sticky top-0 flex h-screen w-1/2 items-center justify-center overflow-hidden border-r border-white/5 bg-mountain-view'>
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
                sizes='(max-width: 1279px) 0px, 50vw'
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
                  activeStep === i ? 'w-8 bg-overcast' : 'w-2 bg-white/20'
                )}
              />
            ))}
          </div>
        </div>

        {/* Scrolling text column */}
        <div className='flex w-1/2 flex-col bg-mountain-view'>
          {Steps.map(step => (
            <div
              key={step.id}
              className='gsap-desktop-step-panel flex min-h-screen flex-col justify-center border-b border-white/5 px-20 last:border-0'
            >
              <div className='will-change-transform'>
                <div className='gsap-step-eyebrow mb-4 flex items-center gap-3 font-google-sans text-sm uppercase tracking-[0.15em] text-overcast'>
                  <span className='gsap-step-icon inline-flex shrink-0 text-overcast'>
                    {step.icon}
                  </span>
                  <span>
                    {step.stepNumber} — {step.modeName}
                  </span>
                </div>

                <h3 className='gsap-step-title mb-6 font-google-sans font-semibold text-5xl leading-[0.92] tracking-[-0.01em] text-cloud-dancer'>
                  {step.title}
                </h3>

                <p className='gsap-step-desc max-w-lg text-xl font-light leading-[1.45] tracking-[-0.02em] text-cloud-dancer/70'>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
