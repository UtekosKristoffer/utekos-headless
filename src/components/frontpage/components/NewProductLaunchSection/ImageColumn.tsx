'use client'

import { useRef } from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const images = [
  {
    src: '/1080/techdown.png',
    alt: 'Utekos TechDown fullfigur, sett forfra'
  },
  {
    src: '/1080/utekos-techdown.png',
    alt: 'Utekos TechDown fullfigur, sett bakfra'
  },
  {
    src: '/1080/tech-halv-1080.png',
    alt: 'Nærbilde av det slitesterke og vannavvisende stoffet på jakken'
  }
]

export function ImageColumn() {
  const container = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Parallax effect on the image container
      gsap.fromTo(
        parallaxRef.current,
        { y: -30 },
        {
          y: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      )
    },
    { scope: container }
  )

  return (
    <div
      ref={container}
      className='relative w-full max-w-[500px] mx-auto md:max-w-none'
    >
      {/* Decorative backdrop elements */}
      <div className='absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-transparent opacity-50 blur-3xl -z-10 rounded-full scale-90' />

      <div ref={parallaxRef} className='will-change-transform'>
        <div className='relative overflow-hidden rounded-3xl border border-white/5 shadow-2xl shadow-sky-900/20'>
          <Carousel
            opts={{
              loop: true
            }}
            className='w-full'
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={3 / 4} className='bg-neutral-900/50'>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      quality={95}
                      className='object-cover'
                      sizes='(max-width: 768px) 100vw, 50vw'
                      fetchPriority='high'
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Minimalist controls */}
            <CarouselPrevious className='left-4 border-white/10 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hidden sm:inline-flex' />
            <CarouselNext className='right-4 border-white/10 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hidden sm:inline-flex' />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
