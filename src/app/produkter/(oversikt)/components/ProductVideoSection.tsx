'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sun, Layers, Snowflake } from 'lucide-react'
import type { Route } from 'next'
import { VIDEO_URL, VIDEO_POSTER_URL } from '@/api/constants'
import { ProductVideoPlayer } from './ProductVideoPlayer'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function ProductVideoSection() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      // 1. Video Player Entrance
      tl.fromTo(
        '.gsap-video-container',
        { y: 50, autoAlpha: 0, scale: 0.95 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 1, ease: 'power3.out' }
      )

      // 2. Title Stagger
      tl.fromTo(
        '.gsap-title-word',
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.5'
      )

      // 3. "Fryse" Underline Animation
      tl.fromTo(
        '.gsap-underline',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'expo.out' },
        '-=0.4'
      )

      // 4. "Nyte" Highlight Animation (Marker effect)
      tl.fromTo(
        '.gsap-highlight',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'circ.out' },
        '-=0.6'
      )

      // 5. Rest of content
      tl.fromTo(
        '.gsap-content',
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      )
    },
    { scope: container }
  )

  return (
    <section
      ref={container}
      className='bg-neutral-950 py-20 sm:py-32 overflow-hidden'
    >
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 items-center gap-x-16 gap-y-16 lg:grid-cols-2'>
          {/* VIDEO COLUMN */}
          <div className='gsap-video-container relative mx-auto max-w-sm w-full opacity-0'>
            {/* Ambient Glow behind video */}
            <div className='absolute -inset-4 bg-gradient-to-tr from-sky-500/20 to-purple-500/20 blur-3xl -z-10 rounded-[2.5rem]' />

            {/* Phone/Card Frame */}
            <div className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 shadow-2xl ring-1 ring-white/5'>
              <div className='absolute inset-0 z-10 pointer-events-none rounded-[2rem] shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]' />
              <ProductVideoPlayer src={VIDEO_URL} poster={VIDEO_POSTER_URL} />
            </div>
          </div>

          {/* TEXT COLUMN */}
          <div className='text-center lg:text-left'>
            <h2 className='text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight'>
              <span className='gsap-title-word inline-block'>Slutt</span>{' '}
              <span className='gsap-title-word inline-block'>å</span>{' '}
              <span className='relative inline-block whitespace-nowrap gsap-title-word'>
                fryse.
                {/* Underline effect */}
                <span className='gsap-underline absolute left-0 bottom-1 h-[3px] w-full bg-red-500/80 rounded-full origin-left' />
              </span>
              <br />
              <span className='gsap-title-word inline-block'>Begynn</span>{' '}
              <span className='gsap-title-word inline-block'>å</span>{' '}
              <span className='relative inline-block whitespace-nowrap px-2 gsap-title-word'>
                {/* Highlight/Tag effect */}
                <span className='gsap-highlight absolute inset-0 -skew-x-6 rounded bg-sky-500/20 origin-left' />
                <span className='relative z-10 text-sky-400'>nyte.</span>
              </span>
            </h2>

            <p className='gsap-content opacity-0 mt-8 text-lg leading-relaxed text-neutral-400 max-w-xl mx-auto lg:mx-0'>
              Er du lei av å la kulden ødelegge de gode øyeblikkene ute? Enten
              du er på fjellet, i hagen, på hytten eller i båten, er Utekos
              løsningen som holder deg varm og komfortabel.
            </p>

            <div className='mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start'>
              <div className='gsap-content opacity-0 group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.05] hover:border-white/10'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform'>
                  <Sun className='h-5 w-5' />
                </div>
                <div className='text-left'>
                  <p className='font-semibold text-white text-sm'>
                    Garantert varm
                  </p>
                  <p className='text-xs text-neutral-500'>Uansett værforhold</p>
                </div>
              </div>

              <div className='gsap-content opacity-0 group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.05] hover:border-white/10'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform'>
                  <Layers className='h-5 w-5' />
                </div>
                <div className='text-left'>
                  <p className='font-semibold text-white text-sm'>
                    3-i-1 Design
                  </p>
                  <p className='text-xs text-neutral-500'>
                    Jakke, parkas & pose
                  </p>
                </div>
              </div>
            </div>

            <div className='gsap-content opacity-0 mt-10'>
              <Button
                asChild
                size='lg'
                className='group h-12 rounded-full bg-white px-8 text-neutral-950 hover:bg-sky-50 w-full sm:w-auto'
              >
                <Link href={'/produkter/utekos-dun' as Route} data-track>
                  Opplev Utekos selv
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
