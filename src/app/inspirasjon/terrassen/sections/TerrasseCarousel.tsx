'use client'

import Image from 'next/image'
import { Camera } from 'lucide-react'
import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { terrasseImages } from '@/app/inspirasjon/terrassen/images/terrasseImages'
import type { CarouselApi } from '@/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils/className'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function TerrasseCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const containerRef = React.useRef<HTMLElement>(null)

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(
        '.gsap-header',
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.out' }
      )

      tl.fromTo(
        '.gsap-title',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )

      tl.fromTo(
        '.gsap-carousel',
        { y: 40, autoAlpha: 0, scale: 0.98 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.6'
      )
    },
    { scope: containerRef }
  )

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1)
    }

    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <section
      ref={containerRef}
      className='relative mx-auto overflow-hidden px-4 py-16 sm:py-32'
    >
      <div className='absolute inset-0 -z-10 opacity-25 pointer-events-none'>
        <div
          className='absolute left-1/4 top-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/4 bottom-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='container mx-auto max-w-7xl'>
        <div className='mb-12 text-center'>
          <div className='gsap-header mb-4 inline-flex items-center gap-2 rounded-full border border-sky-800/30 bg-sky-900/10 px-4 py-2 opacity-0'>
            <Camera className='h-4 w-4 text-sky-800' />
            <span className='text-sm font-medium text-sky-800'>
              Terrasselivet med Utekos
            </span>
          </div>

          <h2 className='gsap-title mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl opacity-0'>
            Forleng dine beste øyeblikk
          </h2>
        </div>

        <div className='gsap-carousel relative opacity-0'>
          <div className='relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/5 bg-neutral-900/50 p-6 shadow-2xl backdrop-blur-sm'>
            <div className='absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent' />

            <Carousel
              setApi={setApi}
              plugins={[autoplayPlugin.current]}
              onMouseEnter={autoplayPlugin.current.stop}
              onMouseLeave={autoplayPlugin.current.reset}
              className='w-full'
              opts={{ align: 'start', loop: true }}
            >
              <CarouselContent className='-ml-4'>
                {terrasseImages.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className='pl-4 md:basis-1/2 lg:basis-1/3'
                  >
                    <div className='group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900'>
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className='object-cover transition-transform duration-700 will-change-transform group-hover:scale-110'
                          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='left-4 border-white/10 bg-black/50 text-white backdrop-blur-md hover:bg-black/70' />
              <CarouselNext className='right-4 border-white/10 bg-black/50 text-white backdrop-blur-md hover:bg-black/70' />
            </Carousel>

            <div className='mt-8 flex items-center justify-center gap-2'>
              {api?.scrollSnapList().map((_, index) => (
                <button
                  key={index}
                  onClick={() => api.scrollTo(index)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    current === index + 1 ?
                      'w-6 bg-sky-500'
                    : 'w-1.5 bg-neutral-700 hover:bg-neutral-600'
                  )}
                  aria-label={`Gå til bilde ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
