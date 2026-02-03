// Path: src/components/about/AboutCarousel.tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Camera } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'
import { aboutImages } from './aboutImages'
import { type CarouselApi } from '@/components/ui/carousel'
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

export function AboutCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const containerRef = useRef<HTMLElement>(null)

  const autoplayPlugin = useRef(
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
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' }
      )

      tl.fromTo(
        '.gsap-title',
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )

      tl.fromTo(
        '.gsap-desc',
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )

      tl.fromTo(
        '.gsap-carousel',
        { y: 50, autoAlpha: 0, scale: 0.98 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.4'
      )
    },
    { scope: containerRef }
  )

  useEffect(() => {
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
      className='relative mx-auto overflow-hidden px-4 py-16 sm:py-32 bg-[#1F2421] text-[#F4F1EA]'
    >
      <div className='absolute inset-0 -z-10 opacity-20 pointer-events-none'>
        <div
          className='absolute left-1/4 top-1/4 h-[500px] w-[500px] blur-[100px]'
          style={{
            background: 'radial-gradient(circle, #E07A5F 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/4 bottom-1/4 h-[500px] w-[500px] blur-[100px]'
          style={{
            background: 'radial-gradient(circle, #2C2420 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='container mx-auto max-w-7xl'>
        <div className='mb-16 text-center'>
          <div className='gsap-header opacity-0 mb-6 inline-flex items-center gap-2 rounded-full border border-[#E07A5F]/30 bg-[#E07A5F]/10 px-4 py-1.5'>
            <Camera className='h-4 w-4 text-[#E07A5F]' />
            <span className='text-xs font-bold tracking-[0.15em] uppercase text-[#E07A5F]'>
              Livet med Utekos
            </span>
          </div>

          <h2 className='gsap-title opacity-0 text-4xl md:text-5xl font-serif font-medium tracking-tight mb-4'>
            Et glimt av opplevelsen
          </h2>

          <p className='gsap-desc opacity-0 mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-[#F4F1EA]/70 font-light'>
            Se hvordan kompromissløs komfort gir liv til dine favorittøyeblikk
            utendørs.
          </p>
        </div>

        <div className='gsap-carousel opacity-0 relative'>
          <div className='relative mx-auto max-w-6xl overflow-hidden rounded-sm border border-[#F4F1EA]/5 bg-[#2C2420] p-4 md:p-6 shadow-2xl shadow-black/40'>
            <div className='absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E07A5F]/50 to-transparent' />

            <Carousel
              setApi={setApi}
              plugins={[autoplayPlugin.current]}
              opts={{ loop: true, align: 'start' }}
              onMouseEnter={autoplayPlugin.current.stop}
              onMouseLeave={autoplayPlugin.current.reset}
              className='w-full'
            >
              <CarouselContent className='-ml-4'>
                {aboutImages.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className='pl-4 md:basis-1/2 lg:basis-1/3'
                  >
                    <div className='group relative overflow-hidden rounded-sm border border-[#F4F1EA]/5 bg-[#151515]'>
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className='object-cover transition-transform duration-1000 ease-out group-hover:scale-105'
                          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-[#1F2421]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className='hidden md:block'>
                <CarouselPrevious className='left-8 bg-[#2C2420]/80 text-[#F4F1EA] border-[#F4F1EA]/10 hover:bg-[#E07A5F] hover:text-white hover:border-[#E07A5F] backdrop-blur-md' />
                <CarouselNext className='right-8 bg-[#2C2420]/80 text-[#F4F1EA] border-[#F4F1EA]/10 hover:bg-[#E07A5F] hover:text-white hover:border-[#E07A5F] backdrop-blur-md' />
              </div>
            </Carousel>

            <div className='mt-8 flex items-center justify-center gap-2'>
              {api?.scrollSnapList().map((_, index) => (
                <button
                  key={index}
                  onClick={() => api.scrollTo(index)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    current === index + 1 ?
                      'w-8 bg-[#E07A5F]'
                    : 'w-2 bg-[#F4F1EA]/20 hover:bg-[#F4F1EA]/40'
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
