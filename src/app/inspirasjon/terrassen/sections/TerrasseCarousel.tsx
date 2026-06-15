// Path: src/app/inspirasjon/terrassen/sections/TerrasseCarousel.tsx

'use client'

import Image from 'next/image'
import { Camera } from 'lucide-react'
import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
import { terrasseImages } from '@/app/inspirasjon/terrassen/images/terrasseImages'
import type { CarouselApi } from '@/components/ui/carousel'
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
import { createGsapDevTools } from '@/lib/gsap/createGsapDevTools'
import { loadScrollTrigger } from '@/lib/gsap/loadScrollTrigger'

function setCarouselIntroVisible(container: HTMLElement) {
  container.querySelectorAll<HTMLElement>('.gsap-header, .gsap-title, .gsap-carousel').forEach(element => {
    element.style.opacity = '1'
    element.style.visibility = 'visible'
    element.style.transform = ''
    element.style.willChange = ''
  })
}

export function TerrasseCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const containerRef = React.useRef<HTMLElement>(null)

  const autoplayPlugin = React.useRef(
    Autoplay({
      delay: 4000,
      defaultInteraction: false
    })
  )

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    let cleanup: (() => void) | null = null
    let cancelled = false

    const mountAnimation = async () => {
      const { gsap, ScrollTrigger } = await loadScrollTrigger()
      if (cancelled || !containerRef.current) {
        return
      }

      const context = gsap.context(() => {
        const query = gsap.utils.selector(container)
        const media = gsap.matchMedia()

        media.add('(prefers-reduced-motion: reduce)', () => {
          gsap.set(query('.gsap-header, .gsap-title, .gsap-carousel'), {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clearProps: 'willChange'
          })
        })

        media.add('(prefers-reduced-motion: no-preference)', () => {
          const timeline = gsap.timeline({
            id: 'terrasse-carousel-intro',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              once: true,
              toggleActions: 'play none none none'
            }
          })

          timeline.fromTo(
            '.gsap-header',
            { y: 20, autoAlpha: 0, willChange: 'transform, opacity' },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: 'power2.out',
              clearProps: 'willChange'
            }
          )

          timeline.fromTo(
            '.gsap-title',
            { y: 30, autoAlpha: 0, willChange: 'transform, opacity' },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: 'power2.out',
              clearProps: 'willChange'
            },
            '-=0.4'
          )

          timeline.fromTo(
            '.gsap-carousel',
            {
              y: 40,
              autoAlpha: 0,
              scale: 0.98,
              willChange: 'transform, opacity'
            },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              clearProps: 'willChange'
            },
            '-=0.6'
          )

          void createGsapDevTools({
            animation: timeline,
            id: 'terrasse-carousel-intro'
          })

          return () => {
            timeline.kill()
          }
        })

        ScrollTrigger.refresh(true)

        return () => {
          media.revert()
        }
      }, container)

      cleanup = () => {
        context.revert()
      }
    }

    void mountAnimation()

    return () => {
      cancelled = true
      cleanup?.()
      if (!container.isConnected) {
        return
      }
      setCarouselIntroVisible(container)
    }
  }, [])

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (!api) {
      return
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncAutoplay = () => {
      const autoplay = api.plugins().autoplay

      if (!autoplay) {
        return
      }

      if (media.matches) {
        autoplay.stop()
        return
      }

      autoplay.play()
    }

    syncAutoplay()
    media.addEventListener('change', syncAutoplay)

    return () => {
      media.removeEventListener('change', syncAutoplay)
      api.plugins().autoplay?.stop()
    }
  }, [api])

  const stopAutoplay = () => {
    api?.plugins().autoplay?.stop()
  }

  const resumeAutoplay = () => {
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (shouldReduceMotion) {
      return
    }

    api?.plugins().autoplay?.play()
  }

  return (
    <section
      ref={containerRef}
      className='relative isolate mx-auto overflow-hidden bg-havdyp px-4 py-16 sm:py-32'
    >
      <div className='pointer-events-none absolute inset-0 -z-10 opacity-22'>
        <div
          className='absolute left-[8%] top-[16%] size-124 rounded-full blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 58%, transparent) 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute bottom-[10%] right-[8%] size-124 rounded-full blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--very-peri) 42%, transparent) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='container mx-auto max-w-7xl'>
        <div className='mb-12 text-center'>
          <BrandBadge
            backgroundColor='var(--peach-fuzz)'
            textColor='var(--background)'
            className='gsap-header mb-4 gap-2 border border-ancient-water/52 px-4 py-2 text-sm leading-4 font-utekos-text   opacity-0'
          >
            <Camera className='size-4' aria-hidden='true' />
            <span className='inline-flex items-baseline gap-[0.28em] leading-none'>
              <span className='text-[0.95em]'>Terrasselivet med</span>
              <UtekosWordmark className='inline-block h-[0.78em] w-auto translate-y-[0.035em] text-background' />
            </span>
          </BrandBadge>

          <h2 className='gsap-title mt-4 text-cloud-dancer opacity-0'>Forleng dine beste øyeblikk</h2>
        </div>

        <div className='gsap-carousel relative opacity-0'>
          <div className='relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-brandied-apricot bg-peach-fuzz p-4 shadow-[0_32px_90px_-56px_color-mix(in_oklch,var(--background)_96%,transparent)] backdrop-blur-sm sm:p-6'>
            <div className='absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--peach-fuzz)_38%,transparent),transparent)]' />

            <Carousel
              setApi={setApi}
              plugins={[autoplayPlugin.current]}
              slideCount={terrasseImages.length}
              ssr={CAROUSEL_SSR.responsiveThirds(terrasseImages.length)}
              onMouseEnter={stopAutoplay}
              onMouseLeave={resumeAutoplay}
              className='w-full'
              opts={{ align: 'start', loop: true }}
            >
              <CarouselContent className='-ml-4'>
                {terrasseImages.map(image => (
                  <CarouselItem key={image.src} className='pl-4 md:basis-1/2 lg:basis-1/3'>
                    <div className='group relative overflow-hidden rounded-[1.25rem] border border-brandied-apricot bg-transparent'>
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className='object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100'
                          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        />
                        <div className='absolute inset-0 bg-linear-to-t from-peach-fuzz/72 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none' />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className='left-4 border-cloud-dancer/14 bg-background/78 text-cloud-dancer backdrop-blur-md hover:bg-background focus-visible:ring-primary/70' />
              <CarouselNext className='right-4 border-cloud-dancer/14 bg-background/78 text-cloud-dancer backdrop-blur-md hover:bg-background focus-visible:ring-primary/70' />
            </Carousel>

            <div className='mt-8 flex items-center justify-center gap-2'>
              {api?.snapList().map((_, index) => (
                <button
                  key={index}
                  type='button'
                  onClick={() => api.goTo(index)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none',
                    current === index + 1 ? 'w-6 bg-primary' : 'w-1.5 bg-overcast hover:bg-cloud-dancer'
                  )}
                  aria-current={current === index + 1 ? 'true' : undefined}
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
