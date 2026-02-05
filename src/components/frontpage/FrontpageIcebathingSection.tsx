'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Droplets,
  Thermometer,
  Wind,
  AlertCircle
} from 'lucide-react'
import type { Route } from 'next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
            <div className='gsap-content opacity-0 inline-flex items-center self-start rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 mb-8 backdrop-blur-md'>
              <span className='relative flex h-2 w-2 mr-3'>
                <span className='gsap-badge-pulse absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-amber-500'></span>
              </span>
              <span className='text-xs font-bold uppercase tracking-widest text-amber-500'>
                Siste sjanse
              </span>
            </div>

            <h2 className='gsap-content opacity-0 mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl'>
              Vi rydder plass til <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200'>
                sesongens nyheter
              </span>
            </h2>

            <p className='gsap-content opacity-0 text-lg text-neutral-400 mb-10 leading-relaxed max-w-lg'>
              Sikre deg Comfyrobe™ til svært redusert pris.{' '}
              <br className='hidden sm:block' />
              Begrenset antall og størrelser – førstemann til mølla!
            </p>

            <div className='grid grid-cols-1 gap-4 mb-10 w-full'>
              {[
                {
                  icon: Thermometer,
                  title: 'SherpaCore™',
                  desc: '250 GSM fôr som gir umiddelbar isolering.',
                  color: 'text-orange-400',
                  bg: 'bg-orange-500/10'
                },
                {
                  icon: Droplets,
                  title: 'Tørker deg opp',
                  desc: 'Fôret absorberer restfuktighet effektivt.',
                  color: 'text-cyan-400',
                  bg: 'bg-cyan-500/10'
                },
                {
                  icon: Wind,
                  title: 'Stopper vinden',
                  desc: 'HydroGuard™ skall med 8000mm vannsøyle.',
                  color: 'text-blue-400',
                  bg: 'bg-blue-500/10'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className='gsap-feature-card opacity-0 group flex items-center gap-5 p-4 rounded-xl border border-white/5 bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.05] hover:border-white/10 hover:translate-x-1'
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/5 ${item.bg} transition-transform group-hover:scale-110`}
                  >
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className='text-base font-semibold text-white mb-0.5 group-hover:text-amber-100 transition-colors'>
                      {item.title}
                    </h3>
                    <p className='text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors'>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className='gsap-content opacity-0 flex flex-col sm:flex-row gap-4'>
              <Button
                asChild
                size='lg'
                className='bg-amber-600 text-white hover:bg-amber-500 border-0 ring-0 h-14 px-8 text-base font-semibold rounded-full shadow-[0_0_20px_-5px_rgba(217,119,6,0.4)] transition-all hover:scale-105 active:scale-95'
              >
                <Link
                  href={'/produkter/comfyrobe' as Route}
                  data-track='FrontpageIceBathingSectionShopNowClick'
                >
                  Sikre deg din nå
                  <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
                </Link>
              </Button>
              <Button
                variant='outline'
                size='lg'
                asChild
                className='h-14 px-8 text-base rounded-full border-white/10 bg-transparent text-white hover:bg-white/5 hover:text-white hover:border-white/20'
              >
                <Link
                  href={'/kampanje/comfyrobe' as Route}
                  data-track='FrontpageIceBathingSectionGetInspoClick'
                >
                  Les mer
                </Link>
              </Button>
            </div>

            <div className='gsap-content opacity-0 mt-6 flex items-center gap-2 text-sm text-neutral-500'>
              <AlertCircle className='h-4 w-4 text-amber-500/80' />
              <span className='italic'>
                OBS: Begrenset antall igjen på lager.
              </span>
            </div>
          </div>

          <div className='relative h-[500px] lg:h-[750px] w-full order-1 lg:order-2'>
            <div className='gsap-mask-image relative h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-neutral-900'>
              <Image
                src='/comfyrobe/comfy-isbading-to-1080.png'
                alt='En isbader står ved en iskant og ser utover vannet, pakket inn i en varm Comfyrobe etter badet.'
                fill
                className='object-cover transition-transform duration-[2s] hover:scale-105'
                sizes='(max-width: 1024px) 100vw, 50vw'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent pointer-events-none' />

              <div className='absolute top-6 right-6 backdrop-blur-md bg-black/30 border border-white/10 rounded-full px-4 py-2 text-xs font-medium text-white/90'>
                Comfyrobe™
              </div>
            </div>

            <div className='absolute -bottom-10 -right-10 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px] -z-10 pointer-events-none' />
          </div>
        </div>
      </div>
    </section>
  )
}
