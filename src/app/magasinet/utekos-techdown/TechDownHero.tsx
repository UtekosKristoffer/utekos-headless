'use client'

import { useRef } from 'react'
import Image from 'next/image'
import TechHeroImage from '@public/magasinet/helene.png'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export function TechDownHero() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '.gsap-hero-image',
        { scale: 1.15, filter: 'brightness(0.5)' },
        { scale: 1, filter: 'brightness(1)', duration: 2.5, ease: 'power2.out' }
      )

      tl.fromTo(
        '.gsap-badge',
        { autoAlpha: 0, x: -20 },
        { autoAlpha: 1, x: 0, duration: 0.8 },
        '-=2'
      )

      tl.fromTo(
        '.gsap-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'expo.out' },
        '-=1.8'
      )

      tl.fromTo(
        '.gsap-title-word',
        { y: 50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, stagger: 0.15, ease: 'power4.out' },
        '-=1.5'
      )

      tl.fromTo(
        '.gsap-subtitle',
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8 },
        '-=0.8'
      )

      tl.to(
        '.gsap-highlight',
        { scaleX: 1, duration: 0.8, ease: 'circ.out' },
        '-=0.6'
      )
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className='relative flex min-h-[90vh] w-full justify-center bg-black pt-4 md:pt-8'
    >
      <div className='relative mx-4 h-full w-full max-w-7xl overflow-hidden rounded-3xl md:mx-0'>
        <div className='absolute inset-0 z-0'>
          <Image
            src={TechHeroImage}
            alt='Utekos TechDown på fjelltopp'
            fill
            className='gsap-hero-image object-cover'
            sizes='(max-width: 1280px) 100vw, 1280px'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90' />
          <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent opacity-60' />
        </div>

        <div className='relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-24 lg:px-20'>
          <div className='mb-6 flex items-center gap-4'>
            <span className='gsap-badge text-sm font-bold uppercase tracking-[0.2em] text-yellow-400 opacity-0'>
              Nyhet
            </span>
            <span className='gsap-line h-[2px] w-16 origin-left scale-x-0 bg-yellow-400/80 md:w-24' />
          </div>

          <h1 className='mb-6 max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl'>
            <span className='block overflow-hidden'>
              <span className='gsap-title-word inline-block'>Utekos</span>{' '}
              <span className='gsap-title-word inline-block text-transparent bg-clip-text bg-gradient-to-br from-white via-sky-100 to-sky-300'>
                TechDown™
              </span>
            </span>
          </h1>

          <p className='gsap-subtitle max-w-2xl text-lg font-light leading-relaxed text-gray-200 opacity-0 md:text-2xl'>
            Vår{' '}
            <span className='relative inline-block px-1 font-medium text-white'>
              <span className='gsap-highlight absolute inset-0 -skew-x-12 origin-left scale-x-0 rounded-sm bg-sky-600/30' />
              <span className='relative'>varmeste</span>
            </span>{' '}
            og mest{' '}
            <span className='relative inline-block font-medium text-white'>
              allsidige
              <span className='gsap-highlight absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-yellow-400' />
            </span>{' '}
            modell noensinne.
          </p>
        </div>
      </div>
    </section>
  )
}
