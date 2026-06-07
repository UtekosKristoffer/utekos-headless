'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ArrowRight, Droplets, Thermometer, Wind, AlertCircle } from 'lucide-react'
import type { Route } from 'next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ComfyrobeOriginal from '@public/comfyrobe-full.webp'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function FrontpageIceBathingSection() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(
        '.gsap-mask-image',
        { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
        {
          clipPath: 'inset(0% 0 0 0)',
          scale: 1,
          duration: 1.5,
          ease: 'power4.out'
        }
      )

      tl.fromTo(
        '.gsap-content',
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out'
        },
        '-=1.0'
      )

      tl.fromTo(
        '.gsap-feature-card',
        { x: -20, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        },
        '-=0.8'
      )

      gsap.to('.gsap-badge-pulse', {
        scale: 1.05,
        opacity: 1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    },
    { scope: container }
  )

  return (
    <section ref={container} className='py-24 overflow-hidden'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='grid items-center gap-12 lg:grid-cols-2 lg:gap-24'>
          <div className='flex flex-col justify-center order-2 lg:order-1'>
            <div className='gsap-content opacity-0 inline-flex items-center self-start rounded-full bg-mountain-view px-4 py-1.5 mb-8 backdrop-blur-md'>
              <span className='relative flex h-2 w-2 mr-3'>
                <span className='gsap-badge-pulse absolute inline-flex h-full w-full rounded-full bg-mountain-view opacity-75'></span>
                <span className='relative inline-flex rounded-full bg-cloud-dancer h-2 w-2'></span>
              </span>
              <span className='text-foreground outline-hidden'>Siste sjanse</span>
            </div>

            <h2 className='gsap-content opacity-0 mb-6 text-4xl bg-linear-to-r from-slate-900 via-slate-500 to-slate-900 bg-clip-text outline-hiddenfont-bold   text-white sm:text-5xl lg:text-6xl'>
              Vi rydder plass til <br />
              <span className='text-transparent text-left bg-clip-text bg-linear-to-r from-very-peri via-sweet-lavender to-very-peri'>
                sesongens nyheter
              </span>
            </h2>

            <p className='gsap-content p-1 text-left text-foreground rounded-lg opacity-0 text-lg mb-10 leading-relaxed max-w-lg'>
              Begrenset antall og størrelser – førstemann til mølla!
            </p>

            <div className='grid grid-cols-1 gap-4 mb-10 w-full'>
              {[
                {
                  icon: Thermometer,
                  title: 'SherpaCore™',
                  desc: '250 GSM fôr som gir umiddelbar isolering.',
                  color: 'text-background',
                  bg: 'bg-overcast'
                },
                {
                  icon: Droplets,
                  title: 'Tørker deg opp',
                  desc: 'Fôret absorberer restfuktighet effektivt.',
                  color: 'text-comfrey',
                  bg: 'bg-mountain-view'
                },
                {
                  icon: Wind,
                  title: 'Stopper vinden',
                  desc: 'HydroGuard™ skall med 8000mm vannsøyle.',
                  color: 'text-foreground',
                  bg: 'bg-very-peri'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className='gsap-feature-card opacity-0 group flex items-center gap-5 p-4 rounded-xl border border-cloud-dancer/70 bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.05] hover:border-cloud-dancer/40 hover:translate-x-1'
                >
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/5 ${item.bg} transition-transform group-hover:scale-110`}
                  >
                    <item.icon className={`size-7 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className='text-base font-semibold text-white mb-0.5 group-hover:text-amber-100 transition-colors'>
                      {item.title}
                    </h3>
                    <p className='text-sm text-ancient-water group-hover:text-overcast transition-colors'>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className='gsap-content opacity-0 flex flex-col sm:flex-row gap-4'>
              <BrandBadge
                asChild
                backgroundColor='var(--color-primary)'
                textColor='var(--color-background)'
                className='group h-14 w-full justify-center px-8 text-base font-medium shadow-[0_18px_42px_-26px_rgba(27,53,74,0.42)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 sm:w-auto'
              >
                <Link
                  href={'/kampanje/comfyrobe' as Route}
                  data-track='FrontpageIceBathingSectionShopNowClick'
                >
                  Sikre deg din nå
                  <ArrowRight className='ml-2 size-5 transition-transform group-hover:translate-x-1' />
                </Link>
              </BrandBadge>
              <BrandBadge
                asChild
                backgroundColor='var(--color-overcast)'
                textColor='var(--color-background)'
                className='group h-14 w-full justify-center px-8 text-base font-medium ring-1 ring-background/10 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 sm:w-auto md:w-[162px] lg:w-[182px]'
              >
                <Link
                  href={'/kampanje/comfyrobe' as Route}
                  data-track='FrontpageIceBathingSectionGetInspoClick'
                >
                  Les mer
                  <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
                </Link>
              </BrandBadge>
            </div>

            <div className='gsap-content opacity-0 mt-6 flex items-center gap-2 text-sm text-ancient-water'>
              <AlertCircle className='h-4 w-4 text-primary' />
              <span className='italic'>OBS: Begrenset antall igjen på lager.</span>
            </div>
          </div>

          <div className='relative order-1 w-full lg:order-2 lg:flex lg:justify-end'>
            <div className='w-full max-w-[30rem] mx-auto lg:mx-0'>
              <div className='gsap-mask-image relative aspect-[2/3] overflow-hidden rounded-3xl border border-white/10 bg-transparent shadow-2xl'>
                <Image
                  src={ComfyrobeOriginal}
                  alt='En isbader står ved en iskant og ser utover vannet, pakket inn i en varm Comfyrobe etter badet.'
                  fill
                  className='object-cover object-bottom transition-transform duration-[2s] hover:scale-105'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent pointer-events-none' />

                <BrandBadge
                  backgroundColor='var(--color-ancient-water)'
                  textColor='var(--color-background)'
                  className='absolute right-6 top-6 px-4 py-2 text-sm font-medium shadow-[0_16px_32px_-24px_rgba(18,24,29,0.45)] ring-1 ring-background/10'
                >
                  Comfyrobe™
                </BrandBadge>
              </div>
            </div>

            <div className='absolute -bottom-10 -right-10 w-64 h-64 bg-ancient-water rounded-full blur-[100px] -z-10 pointer-events-none' />
          </div>
        </div>
      </div>
    </section>
  )
}
