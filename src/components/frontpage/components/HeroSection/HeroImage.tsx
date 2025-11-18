'use client'
import heroImage from '@public/linn-kate-kikkert.png'
import heroImage2 from '@public/arne-monica-masterpng.webp'
import heroImage3 from '@public/kate-linn-orginal.webp'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

export function HeroImage() {
  return (
    <div className='group relative mx-auto mb-8 max-w-7xl md:max-w-6xl overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl'>
      <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent' />

      <Carousel
        opts={{
          loop: true
        }}
        plugins={[
          Autoplay({
            delay: 3500
          })
        ]}
        className='w-full'
      >
        <CarouselContent>
          <CarouselItem>
            <AspectRatio
              ratio={3 / 2}
              className='relative transition-transform duration-300 will-change-transform motion-safe:group-hover:scale-[1.02]'
            >
              <Image
                src={heroImage}
                alt='To kvinner i Utekos-plagg sitter på en terassen og nyter ost og vin.'
                fill
                quality={100}
                sizes='(min-width: 1280px) 1280px, 100vw'
                className='object-cover'
                priority
              />
            </AspectRatio>
          </CarouselItem>
          <CarouselItem>
            <AspectRatio
              ratio={3 / 2}
              className='relative transition-transform duration-300 will-change-transform motion-safe:group-hover:scale-[1.02]'
            >
              <Image
                src={heroImage2}
                alt='To personer i Utekos-plagg nyter naturen sammen'
                fill
                quality={100}
                sizes='(min-width: 1280px) 1280px, 100vw'
                className='object-cover'
              />
            </AspectRatio>
          </CarouselItem>
          <CarouselItem>
            <AspectRatio
              ratio={3 / 2}
              className='relative transition-transform duration-300 will-change-transform motion-safe:group-hover:scale-[1.02]'
            >
              <Image
                src={heroImage3}
                alt='To personer i Utekos-plagg nyter naturen sammen'
                fill
                quality={100}
                sizes='(min-width: 1280px) 1280px, 100vw'
                className='object-cover object-bottom'
              />
            </AspectRatio>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  )
}
