'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Gift, Zap } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import AutoHeight from 'embla-carousel-auto-height'
import { TechDownfeatures } from './TechDownFeatures'
import { TechDownImages } from './TechDownImages'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export const TechDownFeatureSection = () => {
  const container = useRef<HTMLElement>(null)
  const autoHeight = React.useRef(AutoHeight())

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
        '.gsap-visual',
        { x: -50, autoAlpha: 0, scale: 0.95 },
        { x: 0, autoAlpha: 1, scale: 1, duration: 1, ease: 'power3.out' }
      )

      tl.fromTo(
        '.gsap-content',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        '-=0.6'
      )

      tl.fromTo(
        '.gsap-feature-item',
        { x: 20, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.2)'
        },
        '-=0.4'
      )

      gsap.to('.gsap-pulse-badge', {
        scale: 1.05,
        boxShadow: '0 0 20px rgba(14, 165, 233, 0.4)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to('.gsap-glow', {
        opacity: 0.3,
        scale: 1.2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    },
    { scope: container }
  )

  return (
    <section
      ref={container}
      className='relative my-24 overflow-hidden rounded-3xl border border-white/5 bg-neutral-950/50 py-16 md:my-32 md:py-24'
    >
      <div className='gsap-glow absolute -left-[10%] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px] pointer-events-none' />
      <div className='gsap-glow absolute -right-[10%] bottom-0 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none' />

      <div className='container mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20'>
        <div className='gsap-visual w-full opacity-0'>
          <div className='relative rounded-2xl border border-white/5 bg-white/[0.02] p-2 backdrop-blur-sm shadow-2xl'>
            <div className='absolute top-4 right-4 z-20 rotate-6 md:-top-4 md:-right-4 md:rotate-3'>
              <div className='flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-600 p-4 text-white shadow-lg shadow-sky-900/40'>
                <span className='text-xs font-bold uppercase'>Kun</span>
                <span className='text-xl font-bold tracking-tighter'>
                  1790,-
                </span>
              </div>
            </div>

            <Carousel
              plugins={[autoHeight.current]}
              className='w-full'
              opts={{ loop: true }}
            >
              <CarouselContent>
                {TechDownImages.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className='flex items-center justify-center p-4'
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={600}
                      className='h-auto w-auto max-h-[500px] object-contain drop-shadow-2xl'
                      style={{ width: 'auto', height: 'auto' }}
                      priority={index === 0}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='left-4 border-white/10 bg-black/50 text-white backdrop-blur-md hover:bg-black/70' />
              <CarouselNext className='right-4 border-white/10 bg-black/50 text-white backdrop-blur-md hover:bg-black/70' />
            </Carousel>
          </div>
        </div>

        <div className='flex flex-col items-start px-4 lg:px-0'>
          <div className='gsap-content opacity-0 mb-8 flex flex-wrap gap-3'>
            <div className='gsap-pulse-badge inline-flex items-center gap-2 rounded-full border border-sky-400/50 bg-sky-500/20 px-4 py-1.5 backdrop-blur-md'>
              <Zap className='h-3.5 w-3.5 text-sky-400 fill-sky-400' />
              <span className='text-xs font-bold uppercase tracking-wider text-sky-300'>
                Lanseringstilbud
              </span>
            </div>

            <div className='inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md'>
              <Gift className='h-3.5 w-3.5 text-emerald-400' />
              <span className='text-xs font-bold uppercase tracking-wider text-emerald-300'>
                Spar kr 200,-
              </span>
            </div>
          </div>

          <h2 className='gsap-content opacity-0 mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl'>
            Møt Utekos <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-sky-200'>
              TechDown™
            </span>
          </h2>

          <p className='gsap-content opacity-0 mb-8 max-w-lg text-lg leading-relaxed text-neutral-400'>
            Vi har ikke bare kombinert det beste fra dunens letthet og
            mikrofiberens slitestyrke – vi har utviklet en helt ny kategori av
            personlig komfort.
          </p>

          <div className='gsap-content opacity-0 mb-10 flex items-end gap-3 rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm'>
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-neutral-400 line-through mb-1'>
                Før 1990,-
              </span>
              <div className='flex items-baseline gap-2'>
                <span className='text-3xl font-bold text-white'>1790,-</span>
                <span className='text-sm text-neutral-500'>inkl. mva</span>
              </div>
            </div>
            <div className='h-8 w-[1px] bg-white/10 mx-2'></div>
            <div className='text-sm font-medium text-sky-400'>Spar 200,-</div>
          </div>

          <ul className='mb-10 w-full space-y-3'>
            {TechDownfeatures.map((feature, index) => (
              <li
                key={index}
                className='gsap-feature-item opacity-0 group flex items-center gap-4 rounded-xl border border-transparent bg-white/[0.02] p-3 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05] hover:translate-x-1'
              >
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform'>
                  <feature.icon className='h-5 w-5' />
                </div>
                <span className='font-medium text-neutral-300 group-hover:text-white transition-colors'>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          <div className='gsap-content opacity-0'>
            <Button
              asChild
              size='lg'
              className='group h-14 rounded-full bg-white px-8 text-neutral-950 hover:bg-sky-50 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all'
            >
              <Link
                href='/produkter/utekos-techdown'
                data-track='TechDownProductPageSectionShopNowClick'
              >
                Benytt tilbudet nå
                <ArrowRight className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
              </Link>
            </Button>
            <p className='mt-4 text-xs text-neutral-500 italic'>
              *Tilbudet gjelder i en begrenset periode.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
