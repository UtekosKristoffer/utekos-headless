// Path: src/components/about/AboutCarousel.tsx
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
    <section className='relative mx-auto overflow-hidden px-4 py-16 sm:py-32 bg-[#1F2421] text-[#F4F1EA]'>
      {/* Ambient background glow - Varm atmosfære */}
      <div className='absolute inset-0 -z-10 opacity-20'>
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
          
          {/* Badge */}
          <div
            ref={badgeRef}
            className={cn(
              'will-animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-[#E07A5F]/30 bg-[#E07A5F]/10 px-4 py-1.5',
              badgeInView && 'is-in-view'
            )}
          >
            <Camera className='h-4 w-4 text-[#E07A5F]' />
            <span className='text-xs font-bold tracking-[0.15em] uppercase text-[#E07A5F]'>
              Livet med Utekos
            </span>
          </div>

          {/* Overskrift */}
          <h2
            ref={h2Ref}
            className={cn(
              'will-animate-fade-in-up text-4xl md:text-5xl font-serif font-medium tracking-tight mb-4',
              h2InView && 'is-in-view'
            )}
            style={{ '--transition-delay': '0.1s' } as React.CSSProperties}
          >
            Et glimt av opplevelsen
          </h2>

          <p
            ref={pRef}
            className={cn(
              'will-animate-fade-in-up mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-[#F4F1EA]/70 font-light',
              pInView && 'is-in-view'
            )}
            style={{ '--transition-delay': '0.2s' } as React.CSSProperties}
          >
            Se hvordan kompromissløs komfort gir liv til dine favorittøyeblikk utendørs.
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
          {/* Karusell Ramme */}
          <div className='relative mx-auto max-w-6xl overflow-hidden rounded-sm border border-[#F4F1EA]/5 bg-[#2C2420] p-2 md:p-4 shadow-2xl shadow-black/40'>
            
            {/* Dekorativ topp-linje */}
            <div className='absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E07A5F]/50 to-transparent' />

            <Carousel
              setApi={setApi}
              plugins={[autoplayPlugin.current]}
              opts={{ loop: true, align: 'start' }}
              onMouseEnter={autoplayPlugin.current.stop}
              onMouseLeave={autoplayPlugin.current.reset}
            >
              <CarouselContent>
                {aboutImages.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className='md:basis-1/2 lg:basis-1/3'
                  >
                    <div className='group relative h-[400px] w-full overflow-hidden rounded-sm border border-[#F4F1EA]/5 transition-all duration-500 hover:border-[#E07A5F]/30 bg-[#151515]'>
                      
                      {/* Varm Hover Glow */}
                      <div
                        className='absolute -inset-1 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30'
                        style={{
                          background:
                            'radial-gradient(circle, #E07A5F 0%, transparent 70%)'
                        }}
                      />
                      
                      <div className='relative h-full w-full'>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className='object-cover transition-transform duration-1000 ease-out group-hover:scale-105'
                          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        />
                        {/* Subtil gradient i bunn for dybde */}
                        <div className='absolute inset-0 bg-gradient-to-t from-[#1F2421]/80 via-transparent to-transparent opacity-60' />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Navigasjonsknapper - Stylet */}
              <div className='hidden md:block'>
                <CarouselPrevious className='left-8 bg-[#2C2420]/80 text-[#F4F1EA] border-[#F4F1EA]/10 hover:bg-[#E07A5F] hover:text-white hover:border-[#E07A5F]' />
                <CarouselNext className='right-8 bg-[#2C2420]/80 text-[#F4F1EA] border-[#F4F1EA]/10 hover:bg-[#E07A5F] hover:text-white hover:border-[#E07A5F]' />
              </div>
            </Carousel>

            {/* Paginering / Dots */}
            <div className='absolute bottom-8 left-1/2 z-10 -translate-x-1/2'>
              <div className='flex items-center justify-center gap-3'>
                {api?.scrollSnapList().map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api.scrollTo(index)}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      current === index + 1 
                        ? 'w-8 bg-[#E07A5F]' 
                        : 'w-2 bg-[#F4F1EA]/20 hover:bg-[#F4F1EA]/40'
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