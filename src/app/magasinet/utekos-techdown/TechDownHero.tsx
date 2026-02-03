'use client'

import { useRef } from 'react'
import Image from 'next/image'
import TechHeroImage from '@public/magasinet/helene.png'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function TechDownHero() {
  const containerRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      // Entrance Animations
      tl.fromTo(
        imageRef.current,
        { scale: 1.15, filter: 'brightness(0.6)' },
        { scale: 1, filter: 'brightness(1)', duration: 2, ease: 'power2.out' }
      )

      tl.fromTo(
        '.gsap-content-wrapper',
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1 },
        '-=1.5'
      )

      tl.fromTo(
        '.gsap-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'expo.out' },
        '-=0.8'
      )

      tl.to(
        '.gsap-highlight',
        { scaleX: 1, duration: 1, ease: 'circ.out' },
        '-=0.6'
      )
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className='relative mx-auto mt-8 w-full max-w-5xl px-4 md:px-0'
    >
      <div className='relative h-[70vh] w-full overflow-hidden rounded-3xl shadow-2xl md:h-[80vh]'>
        <div className='absolute inset-0 z-0 h-[120%] w-full'>
          <Image
            ref={imageRef}
            src={TechHeroImage}
            alt='Utekos TechDown i norsk natur'
            fill
            className='object-cover object-center'
            sizes='(max-width: 1024px) 100vw, 1200px'
            priority
          />
        </div>

        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent opacity-80' />

        <div className='gsap-content-wrapper absolute bottom-0 left-0 z-10 w-full p-8 opacity-0 md:p-16'>
          <div className='max-w-xl'>
            <div className='mb-6 flex items-center gap-4'>
              <span className='text-xs font-bold uppercase tracking-[0.2em] text-yellow-400'>
                Nyhet
              </span>
              <span className='gsap-line h-[2px] w-16 origin-left scale-x-0 bg-yellow-400/80 md:w-24' />
            </div>

            <h1 className='mb-4 text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl'>
              Utekos <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400'>
                TechDown™
              </span>
            </h1>

            <p className='text-lg font-light leading-relaxed text-gray-200 md:text-2xl'>
              Vår{' '}
              <span className='relative inline-block px-1 font-medium text-white'>
                <span className='gsap-highlight absolute inset-0 -skew-x-12 origin-left scale-x-0 rounded-sm bg-sky-600/40' />
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
      </div>
    </section>
  )
}
