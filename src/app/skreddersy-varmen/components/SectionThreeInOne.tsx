'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils/className'
import { Steps } from './Steps'
import { useThreeInOneAnimations } from '@/hooks/useThreeInOneAnimations'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'

export function SectionThreeInOne() {
  const { containerRef, activeStep } = useThreeInOneAnimations()

  return (
    <section
      ref={containerRef}
      aria-labelledby='threeinone-heading'
      className='w-full bg-mountain-view text-foreground'
    >
      {/* Intro header */}
      <div className='gsap-three-intro mx-auto max-w-4xl px-6 py-16 text-center md:py-24'>
        <span className='gsap-three-eyebrow mb-3 block font-utekos-text-medium tracking-wide text-base leading-4 text-foreground'>
          Adaptiv funksjonalitet
        </span>
        <h2
          id='threeinone-heading'
          className='gsap-three-title mb-6 font-google-sans text-[clamp(2rem,7.5vw,4rem)] font-bold leading-[0.92] tracking-[-0.01em]'
        >
          Friheten til å velge
        </h2>
        <p className='gsap-three-subtitle mx-auto max-w-2xl text-balance font-utekos-text leading-text-paragraph   text-foreground/95'>
          Det unike med Utekos<span className='text-overcast'>®</span> er transformasjonen. Fra en isolerende
          kokong til en elegant parkas på sekunder. Juster, form og nyt.
        </p>
      </div>

      {/* MOBILE: stacked cards */}
      <div className='flex flex-col pb-20 xl:hidden'>
        {Steps.map(step => (
          <div key={step.id} className='gsap-mobile-step-panel mb-12 flex flex-col last:mb-0'>
            <div className='relative aspect-square w-full overflow-hidden border-y border-cloud-dancer/10 bg-mountain-view'>
              <Image
                src={step.image}
                alt={step.title}
                fill
                loading='lazy'
                quality={75}
                className={cn(
                  'gsap-step-image',
                  step.desktopObjectFit === 'contain' ?
                    'object-contain p-12 min-[1536px]:p-16'
                  : 'object-cover'
                )}
                sizes='(max-width: 1279px) 100vw, 0px'
              />
              <BrandBadge
                backgroundColor='var(--color-background)'
                textColor='var(--color-cloud-dancer)'
                className='gsap-step-badge absolute left-4 top-4 h-7 px-3 py-0 text-xs font-medium leading-none backdrop-blur-md'
              >
                {step.stepNumber}
              </BrandBadge>
            </div>

            <div className='mx-auto w-full max-w-xl px-6 pt-6 md:px-8]'>
              <div className='gsap-step-eyebrow mb-2 flex items-center gap-2 text-overcast'>
                <span className='gsap-step-icon inline-flex shrink-0 text-overcast'>{step.icon}</span>
                <span className='  text-sm font-medium leading-4'>{step.modeName}</span>
              </div>
              <h3 className='gsap-step-title mb-3 font-google-sans text-3xl md:text-4xl font-bold leading-[0.92] tracking-[-0.01em] text-foreground'>
                {step.title}
              </h3>
              <p className='gsap-step-desc font-utekos-text mt-2 tracking-wide md:text-2xl! leading-text-paragraph text-foreground'>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP: scroll-pinned storytelling */}
      <div className='gsap-three-desktop hidden w-full xl:flex'>
        {/* Sticky image column */}
        <div className='sticky top-0 flex h-screen w-1/2 items-center justify-center overflow-hidden border-r border-cloud-dancer/10 bg-mountain-view'>
          {Steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                'absolute inset-0 flex h-full w-full items-center justify-center p-6 transition-all duration-1000 ease-in-out min-[1536px]:p-10',
                activeStep === index ? 'z-10 scale-100 opacity-100' : 'z-0 scale-105 opacity-0'
              )}
            >
              <div className='relative aspect-square w-[min(86%,82vh)] overflow-hidden rounded-3xl border border-cloud-dancer/10 bg-background/18 shadow-2xl'>
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  loading='lazy'
                  quality={75}
                  className={cn(
                    'gsap-step-image',
                    step.desktopObjectFit === 'contain' ?
                      'object-contain p-12 min-[1536px]:p-16'
                    : 'object-cover'
                  )}
                  sizes='(max-width: 1279px) 0px, min(43vw, 82vh)'
                />
                <div className='absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-background to-transparent opacity-45' />
              </div>
            </div>
          ))}

          <div className='absolute bottom-8 left-8 z-20 flex gap-3'>
            {Steps.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1 rounded-full transition-all duration-500',
                  activeStep === i ? 'w-8 bg-overcast' : 'w-2 bg-cloud-dancer/20'
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
              className='gsap-desktop-step-panel flex min-h-screen flex-col justify-center border-b border-cloud-dancer/10 px-20 last:border-0'
            >
              <div className='will-change-transform'>
                <div className='gsap-step-eyebrow mb-4 font-utekos-textflex items-center gap-3 text-base md:text-lg font-medium leading-4 text-overcast'>
                  <span className='gsap-step-icon inline-flex shrink-0 text-foreground'>{step.icon}</span>
                  <span className='text-base md:text-lg font-utekos-text-medium leading-4 text-foreground'>
                    {step.stepNumber} — {step.modeName}
                  </span>
                </div>

                <h3 className='gsap-step-title mb-6 font-google-sans text-5xl md:text-6xl font-bold leading-[0.92] tracking-[-0.01em] text-foreground'>
                  {step.title}
                </h3>

                <p className='gsap-step-desc max-w-lg text-base font-utekos-text md:text-2xl leading-text-paragraph text-foreground'>
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
