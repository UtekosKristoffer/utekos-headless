// Path: src/components/about/AboutCarousel.tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Camera } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'
import { aboutImages } from './aboutImages'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { type CarouselApi } from '@/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { CAROUSEL_SSR } from '@/components/ui/carousel-ssr'
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

  const autoplayPlugin = useRef(Autoplay({ delay: 4000, defaultInteraction: false }))

  useGSAP(
    () => {
      const animatedElements = gsap.utils.toArray<HTMLElement>(
        '.gsap-header, .gsap-title, .gsap-desc, .gsap-carousel'
      )

      if (!containerRef.current || animatedElements.length === 0) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(animatedElements, { y: 0, autoAlpha: 1, scale: 1 })
        return
      }

      gsap.set(animatedElements, { autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
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

    setCurrent(api.selectedSnap() + 1)

    const onSelect = () => {
      setCurrent(api.selectedSnap() + 1)
    }

    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <section
      ref={containerRef}
      className='relative isolate mx-auto overflow-hidden bg-background px-4 py-16 text-foreground sm:py-32'
    >
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-[18%] top-[18%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--very-peri)_20%,transparent)_0%,transparent_70%)] blur-[110px]' />
        <div className='absolute bottom-[10%] right-[14%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ancient-water)_16%,transparent)_0%,transparent_72%)] blur-[110px]' />
      </div>

      <div className='container mx-auto max-w-7xl'>
        <div className='mb-16 text-center'>
          <BrandBadge
            backgroundColor='var(--very-peri)'
            textColor='var(--background)'
            className='gsap-header mb-6 gap-2 shadow-[0_18px_44px_-28px_color-mix(in_oklab,var(--very-peri)_80%,transparent)]'
          >
            <Camera className='size-5' strokeWidth={1.6} />
            <span>Livet med Utekos</span>
          </BrandBadge>

          <h2 className='gsap-title text-foreground mb-6'>Et glimt av opplevelsen</h2>

          <p className='gsap-desc text-foreground mx-auto utekos-section-lead'>
            Se hvordan kompromissløs komfort gir liv til dine favorittøyeblikk utendørs.
          </p>
        </div>

        <div className='gsap-carousel relative'>
          <div className='relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-cloud-dancer/10 bg-[color-mix(in_oklab,var(--cloud-dancer)_8%,transparent)] p-3 shadow-2xl shadow-black/35 backdrop-blur-sm md:p-5'>
            <div className='absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-very-peri/55 to-transparent' />

            <Carousel
              setApi={setApi}
              plugins={[autoplayPlugin.current]}
              slideCount={aboutImages.length}
              ssr={CAROUSEL_SSR.responsiveThirds(aboutImages.length)}
              opts={{ loop: true, align: 'start' }}
              onMouseEnter={autoplayPlugin.current.stop}
              onMouseLeave={autoplayPlugin.current.reset}
              className='w-full'
            >
              <CarouselContent className='-ml-4'>
                {aboutImages.map((image, index) => (
                  <CarouselItem key={index} className='pl-4 md:basis-1/2 lg:basis-1/3'>
                    <div className='group relative overflow-hidden rounded-[1.25rem] border border-cloud-dancer/8 bg-background'>
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className='object-cover transition-transform duration-1000 ease-out group-hover:scale-105'
                          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-background/62 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className='hidden md:block'>
                <CarouselPrevious className='left-8 border-cloud-dancer/12 bg-background/80 text-foreground backdrop-blur-md hover:border-very-peri hover:bg-very-peri hover:text-background' />
                <CarouselNext className='right-8 border-cloud-dancer/12 bg-background/80 text-foreground backdrop-blur-md hover:border-very-peri hover:bg-very-peri hover:text-background' />
              </div>
            </Carousel>

            <div className='mt-8 flex items-center justify-center gap-2'>
              {api?.snapList().map((_, index) => (
                <button
                  key={index}
                  onClick={() => api.goTo(index)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    current === index + 1 ?
                      'w-8 bg-very-peri'
                    : 'w-2 bg-cloud-dancer/22 hover:bg-cloud-dancer/45'
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
