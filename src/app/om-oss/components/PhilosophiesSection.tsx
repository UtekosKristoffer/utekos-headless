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
    icon: 'border-maritime-blue/14 bg-maritime-blue text-cloud-dancer',
    title: 'text-maritime-blue',
    text: 'text-maritime-blue/80'
  },
  {
    card: 'border-dusted-peri/16 bg-[color-mix(in_oklab,var(--bleached-mauve)_74%,white)]',
    glow: 'bg-[radial-gradient(circle,color-mix(in_oklab,var(--dusted-peri)_50%,transparent)_0%,transparent_72%)]',
    icon: 'border-maritime-blue/14 bg-maritime-blue text-cloud-dancer',
    title: 'text-maritime-blue',
    text: 'text-maritime-blue/78'
  },
  {
    card: 'border-mountain-view/16 bg-mountain-view',
    glow: 'bg-[radial-gradient(circle,color-mix(in_oklab,var(--mountain-view)_36%,transparent)_0%,transparent_72%)]',
    icon: 'border-cloud-dancer/16 bg-cloud-dancer text-mountain-view',
    title: 'text-cloud-dancer',
    text: 'text-cloud-dancer/82'
  },
  {
    card: 'border-chocolate-plum/16 bg-chocolate-plum',
    glow: 'bg-[radial-gradient(circle,color-mix(in_oklab,var(--chocolate-plum)_26%,transparent)_0%,transparent_72%)]',
    icon: 'border-cloud-dancer/16 bg-cloud-dancer text-chocolate-plum',
    title: 'text-cloud-dancer',
    text: 'text-cloud-dancer/82'
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
    <section
      ref={sectionRef}
      className='relative overflow-hidden bg-overcast py-24 sm:py-32'
    >
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-[8%] top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ancient-water)_70%,transparent)_0%,transparent_72%)] blur-3xl' />
        <div className='absolute right-[10%] top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--dusted-peri)_30%,transparent)_0%,transparent_72%)] blur-3xl' />
        <div className='absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklab,var(--cloud-dancer)_55%,transparent)_100%)]' />
      </div>

      <div className='container mx-auto max-w-7xl px-6 lg:px-8'>
        {/* HEADER */}
        <div className='mx-auto mb-20 max-w-3xl text-center'>
          <AnimatedBlock
            className='will-animate-fade-in-up'
            delay='0s'
            threshold={0.2}
          >
            <BrandBadge
              label='Vårt DNA'
              backgroundColor='var(--bleached-mauve)'
              textColor='var(--maritime-darkest)'
              className='mb-6 shadow-[0_18px_44px_-28px_color-mix(in_oklab,var(--primary-button)_80%,transparent)]'
            />
            <h2 className='mb-6 text-4xl font-serif text-maritime-blue md:text-5xl'>
              Kjernen i alt vi gjør
            </h2>
            <p className='text-xl font-light leading-relaxed text-maritime-blue/82'>
              Fire ufravikelige prinsipper som sikrer at du alltid får den
              opplevelsen du fortjener.
            </p>
          </AnimatedBlock>
        </div>

        {/* GRID */}
        <div
          ref={cardRowRef}
          className='mx-auto flex max-w-4xl flex-col gap-6 sm:gap-7 lg:gap-8'
        >
          {corePhilosophies.map((item, i) => (
            <div
              key={item.title}
              data-philosophy-card
              className='relative w-full'
              style={{ zIndex: corePhilosophies.length - i }}
            >
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-7 shadow-[0_22px_60px_-40px_rgba(22,37,48,0.28)] transition-all duration-500 hover:-translate-y-1 sm:p-8 ${philosophyToneStyles[i]?.card}`}
              >
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 opacity-0 blur-[50px] transition-opacity duration-700 group-hover:opacity-30 ${philosophyToneStyles[i]?.glow}`}
                />

                <div className='relative z-10 flex h-full flex-col'>
                  <div className='mb-5 flex items-center gap-5'>
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16 ${philosophyToneStyles[i]?.icon}`}
                    >
                      <item.icon
                        className='h-6 w-6 sm:h-7 sm:w-7'
                        strokeWidth={1.5}
                      />
                    </div>

                    <h3
                      className={`text-2xl font-serif font-medium ${philosophyToneStyles[i]?.title}`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <p
                    className={`text-lg font-light leading-relaxed ${philosophyToneStyles[i]?.text}`}
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
