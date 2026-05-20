'use client'

import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { AspectRatio } from '@/components/ui/aspect-ratio'

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
  return (
    <figure className='relative mx-auto w-full max-w-[500px] md:max-w-none'>
      <div className='overflow-hidden rounded-[1.5rem] border border-cloud-dancer/25 bg-transparent p-2'>
        <Carousel
          opts={{ loop: true }}
          className='group w-full'
          role='group'
          aria-roledescription='bildekarusell'
          aria-label='Produktbilder av Utekos TechDown'
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={image.src}>
                <AspectRatio
                  ratio={3 / 4}
                  className='overflow-hidden rounded-[1.25rem] bg-transparent'
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={95}
                    className='object-cover'
                    sizes='(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 540px'
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            aria-label='Forrige produktbilde'
            className='absolute left-3 top-1/2 z-20 h-11 w-11 -translate-y-1/2 border border-maritime-blue bg-cloud-dancer text-maritime-blue shadow-none transition-colors hover:bg-overcast hover:text-maritime-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloud-dancer'
          />

          <CarouselNext
            aria-label='Neste produktbilde'
            className='absolute right-3 top-1/2 z-20 h-11 w-11 -translate-y-1/2 border border-maritime-blue bg-cloud-dancer text-maritime-blue shadow-none transition-colors hover:bg-overcast hover:text-maritime-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloud-dancer'
          />
        </Carousel>
      </div>

      <figcaption className='sr-only'>
        Bildekarusell med {images.length} produktbilder av Utekos TechDown.
      </figcaption>
    </figure>
  )
}
