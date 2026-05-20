'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ArrowRight, Gift, Zap } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { TechDownfeatures } from './TechDownFeatures'
import { TechDownImages } from './TechDownImages'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export const TechDownFeatureSection = () => {
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
        boxShadow: '0 0 20px rgba(175, 190, 203, 0.32)',
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
      className='relative my-24 overflow-hidden rounded-3xl border border-cloud-dancer/10 bg-[linear-gradient(135deg,color-mix(in_oklch,var(--maritime-blue)_82%,rgba(13,21,31,0.96))_0%,color-mix(in_oklch,var(--maritime-darkest)_92%,rgba(10,16,24,0.98))_52%,color-mix(in_oklch,var(--maritime-blue)_84%,rgba(13,21,31,0.96))_100%)] py-16 md:my-32 md:py-24'
    >
      <div className='gsap-glow pointer-events-none absolute -left-[10%] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-ancient-water/12 blur-[120px]' />
      <div className='gsap-glow pointer-events-none absolute -right-[10%] bottom-0 h-[500px] w-[500px] rounded-full bg-soft-warm/10 blur-[100px]' />

      <div className='container mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20'>
        <div className='gsap-visual w-full opacity-0'>
          <div className='relative rounded-2xl border border-cloud-dancer/10 bg-cloud-dancer/[0.04] p-2 backdrop-blur-sm shadow-[0_32px_80px_-44px_rgba(8,15,24,0.92)]'>
            <div className='absolute top-4 right-4 z-20 rotate-6 md:-top-4 md:-right-4 md:rotate-3'>
              <div className='flex h-24 w-24 flex-col items-center justify-center rounded-[2rem] bg-dusted-peri p-4 text-maritime-darkest shadow-[0_20px_45px_-24px_rgba(32,28,54,0.58)] ring-1 ring-maritime-darkest/8'>
                <span className='text-xs font-bold'>Kun</span>
                <span className='text-xl font-bold tracking-tight'>1790,-</span>
              </div>
            </div>

            <Carousel className='w-full' opts={{ loop: true }}>
              <CarouselContent>
                {TechDownImages.map((image, index) => (
                  <CarouselItem key={image.src.src} className='p-3 sm:p-4'>
                    <div className='relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-cloud-dancer/[0.04] p-3 sm:p-4'>
                      <div className='relative h-full w-full overflow-hidden rounded-[1.15rem]'>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className='object-cover object-center drop-shadow-2xl'
                          sizes='(max-width: 1024px) 100vw, 42vw'
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='left-4 border-cloud-dancer/12 bg-maritime-darkest/72 text-cloud-dancer backdrop-blur-md hover:bg-maritime-darkest/88 hover:text-overcast' />
              <CarouselNext className='right-4 border-cloud-dancer/12 bg-maritime-darkest/72 text-cloud-dancer backdrop-blur-md hover:bg-maritime-darkest/88 hover:text-overcast' />
            </Carousel>
          </div>
        </div>

        <div className='flex flex-col items-start px-4 lg:px-0'>
          <div className='gsap-content opacity-0 mb-8 flex flex-wrap gap-3'>
            <BrandBadge
              backgroundColor='color-mix(in oklch, var(--ancient-water) 72%, rgba(255,255,255,0.08))'
              textColor='var(--color-maritime-darkest)'
              className='gsap-pulse-badge gap-2 border border-ancient-water/30 px-4 py-2 text-xs font-semibold tracking-normal shadow-[0_16px_30px_-24px_rgba(201,214,224,0.45)]'
            >
              <Zap className='h-3.5 w-3.5 fill-current text-maritime-darkest' />
              <span>Vårtilbud</span>
            </BrandBadge>

            <BrandBadge
              backgroundColor='var(--color-dusted-peri)'
              textColor='var(--color-maritime-darkest)'
              className='gap-2 border border-dusted-peri/24 px-4 py-2 text-xs font-semibold tracking-normal shadow-[0_16px_30px_-24px_rgba(32,28,54,0.48)]'
            >
              <Gift className='h-3.5 w-3.5 text-maritime-darkest' />
              <span>Spar kr 200,-</span>
            </BrandBadge>
          </div>

          <h2 className='gsap-content opacity-0 mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl'>
            Møt Utekos <br />
            <span className='bg-gradient-to-r from-ancient-water via-sweet-lavender to-overcast bg-clip-text text-transparent'>
              TechDown™
            </span>
          </h2>

          <p className='gsap-content opacity-0 mb-8 max-w-lg text-lg leading-relaxed text-overcast/82'>
            Vi har ikke bare kombinert det beste fra dunens letthet og
            mikrofiberens slitestyrke – vi har utviklet en helt ny kategori av
            personlig komfort.
          </p>

          <div className='gsap-content opacity-0 mb-10 flex items-end gap-3 rounded-xl border border-cloud-dancer/10 bg-cloud-dancer/[0.05] p-4 backdrop-blur-sm'>
            <div className='flex flex-col'>
              <span className='mb-1 text-sm font-medium text-overcast/58 line-through'>
                Før 1990,-
              </span>
              <div className='flex items-baseline gap-2'>
                <span className='text-3xl font-bold text-cloud-dancer'>
                  1790,-
                </span>
                <span className='text-sm text-overcast/62'>inkl. mva</span>
              </div>
            </div>
            <div className='mx-2 h-8 w-[1px] bg-cloud-dancer/10'></div>
            <div className='text-sm font-medium text-ancient-water'>
              Spar 200,-
            </div>
          </div>

          <ul className='mb-10 w-full space-y-3'>
            {TechDownfeatures.map((feature, index) => (
              <li
                key={index}
                className='gsap-feature-item opacity-0 group flex items-center gap-4 rounded-xl border border-transparent bg-cloud-dancer/[0.03] p-3 transition-all duration-300 hover:translate-x-1 hover:border-cloud-dancer/14 hover:bg-cloud-dancer/[0.08]'
              >
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ancient-water/12 text-ancient-water transition-transform group-hover:scale-110'>
                  <feature.icon className='h-5 w-5' />
                </div>
                <span className='font-medium text-overcast/88 transition-colors group-hover:text-cloud-dancer'>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          <div className='gsap-content opacity-0'>
            <BrandBadge
              asChild
              backgroundColor='var(--color-primary-button)'
              textColor='var(--color-maritime-darkest)'
              className='group h-14 px-8 text-base font-medium shadow-[0_20px_46px_-28px_rgba(20,30,40,0.56)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95'
            >
              <Link
                href='/produkter/utekos-techdown'
                data-track='TechDownProductPageSectionShopNowClick'
              >
                Benytt tilbudet nå
                <ArrowRight className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
              </Link>
            </BrandBadge>
            <p className='mt-4 text-xs italic text-overcast/56'>
              *Tilbudet gjelder i en begrenset periode.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
