'use client'

import Image from 'next/image'
import { Camera } from 'lucide-react'
import * as React from 'react'
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
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils/className'

export function AboutCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  const [badgeRef, badgeInView] = useInView({ threshold: 1 })
  const [h2Ref, h2InView] = useInView({ threshold: 1 })
  const [pRef, pInView] = useInView({ threshold: 1 })
  const [carouselRef, carouselInView] = useInView({ threshold: 0.2 })

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
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
    <section className='relative mx-auto overflow-hidden px-4 py-16 sm:py-32'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 opacity-25'>
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
          <div
            ref={badgeRef}
            className={cn(
              'will-animate-fade-in-up mb-4 inline-flex items-center gap-2 rounded-full border border-sky-800/30 bg-sky-900/10 px-4 py-2',
              badgeInView && 'is-in-view'
            )}
          >
            <Camera className='h-4 w-4 text-sky-800' />
            <span className='text-sm font-medium text-sky-800'>
              Livet med Utekos
            </span>
          </div>

          <h2
            ref={h2Ref}
            className={cn(
              'will-animate-fade-in-up text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl',
              h2InView && 'is-in-view'
            )}
            style={{ '--transition-delay': '0.1s' } as React.CSSProperties}
          >
            Et glimt av Utekos
          </h2>

          <p
            ref={pRef}
            className={cn(
              'will-animate-fade-in-up mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-access/80',
              pInView && 'is-in-view'
            )}
            style={{ '--transition-delay': '0.2s' } as React.CSSProperties}
          >
            Se hvordan kompromissløs komfort gir liv til dine favorittøyeblikk
            utendørs.
          </p>
        </div>

        <div
          ref={carouselRef}
          className={cn(
            'will-animate-fade-in-up relative',
            carouselInView && 'is-in-view'
          )}
          style={{ '--transition-delay': '0.3s' } as React.CSSProperties}
        >
          <div className='relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 shadow-2xl'>
            <div className='absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent' />

            <Carousel
              setApi={setApi}
              plugins={[autoplayPlugin.current]}
              opts={{ loop: true }}
              onMouseEnter={autoplayPlugin.current.stop}
              onMouseLeave={autoplayPlugin.current.reset}
            >
              <CarouselContent>
                {aboutImages.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className='md:basis-1/2 lg:basis-1/3'
                  >
                    <div className='group relative h-[350px] w-full overflow-hidden rounded-xl border border-neutral-800 transition-all duration-300 hover:border-neutral-700'>
                      <div
                        className='absolute -inset-1 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-30'
                        style={{
                          background:
                            'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)'
                        }}
                      />
                      <div className='relative h-full w-full'>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className='object-cover transition-transform duration-700 group-hover:scale-110'
                          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='left-4' />
              <CarouselNext className='right-4' />
            </Carousel>

            <div className='absolute bottom-6 left-1/2 z-10 -translate-x-1/2'>
              <div className='flex items-center justify-center gap-2'>
                {api?.scrollSnapList().map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api.scrollTo(index)}
                    className={cn(
                      'h-2 w-2 rounded-full transition-all duration-300',
                      current === index + 1 ? 'w-4 bg-white' : 'bg-white/40'
                    )}
                    aria-label={`Gå til bilde ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
