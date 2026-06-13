// Path: src/app/om-oss/Sections/PhilosophiesSection.tsx
'use client'

import { useRef } from 'react'
import { corePhilosophies } from '@/constants/corePhilosophies'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const philosophyToneStyles = [
  {
    card: 'border-ancient-water/24 bg-ancient-water',
    glow: 'bg-[radial-gradient(circle,color-mix(in_oklab,var(--cloud-dancer)_58%,transparent)_0%,transparent_72%)]',
    icon: 'border-havdyp/14 bg-havdyp text-foreground',
    title: 'text-havdyp',
    text: 'text-havdyp/80'
  },
  {
    card: 'border-very-peri/16 bg-[color-mix(in_oklab,var(--bleached-mauve)_74%,var(--cloud-dancer))]',
    glow: 'bg-[radial-gradient(circle,color-mix(in_oklab,var(--very-peri)_50%,transparent)_0%,transparent_72%)]',
    icon: 'border-havdyp/14 bg-havdyp text-foreground',
    title: 'text-havdyp',
    text: 'text-havdyp/78'
  },
  {
    card: 'border-mountain-view/16 bg-mountain-view',
    glow: 'bg-[radial-gradient(circle,color-mix(in_oklab,var(--mountain-view)_36%,transparent)_0%,transparent_72%)]',
    icon: 'border-cloud-dancer/16 bg-cloud-dancer text-mountain-view',
    title: 'text-foreground',
    text: 'text-foreground/82'
  },
  {
    card: 'border-chocolate-plum/16 bg-chocolate-plum',
    glow: 'bg-[radial-gradient(circle,color-mix(in_oklab,var(--chocolate-plum)_26%,transparent)_0%,transparent_72%)]',
    icon: 'border-cloud-dancer/16 bg-cloud-dancer text-chocolate-plum',
    title: 'text-foreground',
    text: 'text-foreground/82'
  }
] as const

export function PhilosophiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRowRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-philosophy-card]')

      if (!cards.length) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(cards, { y: 0, autoAlpha: 1, rotate: 0, scale: 1 })
        return
      }

      cards.forEach(card => {
        card.style.willChange = 'transform, opacity'
      })

      gsap.set(cards, {
        y: 36,
        autoAlpha: 0,
        rotate: 0.8,
        scale: 0.98,
        transformOrigin: 'center center'
      })

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: cardRowRef.current,
          start: 'top 76%',
          end: 'bottom 24%',
          toggleActions: 'play none none reverse'
        },
        onComplete: () => {
          cards.forEach(card => {
            card.style.removeProperty('will-change')
          })
        }
      })

      timeline.to(cards, {
        y: 0,
        autoAlpha: 1,
        rotate: 0,
        scale: 1,
        duration: 0.82,
        stagger: 0.14
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className='relative overflow-hidden bg-overcast py-24 sm:py-32'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-[8%] top-16 size-64 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ancient-water)_70%,transparent)_0%,transparent_72%)] blur-3xl' />
        <div className='absolute right-[10%] top-24 size-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--very-peri)_30%,transparent)_0%,transparent_72%)] blur-3xl' />
        <div className='absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklab,var(--cloud-dancer)_55%,transparent)_100%)]' />
      </div>

      <div className='container mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto mb-20 max-w-3xl text-center'>
          <AnimatedBlock className='will-animate-fade-in-up' delay='0s' threshold={0.2}>
            <BrandBadge
              label='Vårt DNA'
              backgroundColor='var(--bleached-mauve)'
              textColor='var(--background)'
              className='mb-6 font-utekos-text-medium shadow-[0_18px_44px_-28px_color-mix(in_oklab,var(--bleached-mauve)_80%,transparent)]'
            />
            <h2 className='mb-6 text-5xl leading-[0.95] font-bold font-google-sans   text-background md:text-6xl lg:text-7xl'>
              Kjernen i alt vi gjør
            </h2>
            <p className='text-lg leading-text-paragraph font-utekos-text-medium text-background'>
              Fire ufravikelige prinsipper som sikrer at du alltid får den opplevelsen du fortjener.
            </p>
          </AnimatedBlock>
        </div>

        <div ref={cardRowRef} className='mx-auto flex max-w-4xl flex-col gap-6 sm:gap-7 lg:gap-8'>
          {corePhilosophies.map((item, i) => (
            <div
              key={item.title}
              data-philosophy-card
              className='relative w-full'
              style={{ zIndex: corePhilosophies.length - i }}
            >
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-7 shadow-[0_22px_60px_-40px_color-mix(in_oklab,var(--havdyp)_28%,transparent)] transition-all duration-500 hover:-translate-y-1 sm:p-8 ${philosophyToneStyles[i]?.card}`}
              >
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 size-32 opacity-0 blur-[50px] transition-opacity duration-700 group-hover:opacity-30 ${philosophyToneStyles[i]?.glow}`}
                />

                <div className='relative z-10 flex h-full flex-col'>
                  <div className='mb-5 flex items-center gap-5'>
                    <div
                      className={`flex size-14 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-105 sm:size-16 ${philosophyToneStyles[i]?.icon}`}
                    >
                      <item.icon className='size-6 sm:size-7' strokeWidth={1.5} />
                    </div>

                    <h3
                      className={`text-2xl leading-nonefont-semibold font-google-sans   ${philosophyToneStyles[i]?.title}`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <p
                    className={`text-lg leading-text-paragraph tracking-[-0.01em] ${philosophyToneStyles[i]?.text}`}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
