'use client'

import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

const images = [
  {
    src: '/1080/techdown.png',
    alt: 'Utekos TechDown fullfigur, sett forfra',
    imageClassName:
      'object-contain object-center p-1 sm:p-0 md:scale-[1.16] lg:scale-[1.24] xl:scale-[1.32]'
  },
  {
    src: '/1080/utekos-techdown.png',
    alt: 'Utekos TechDown i bruk på en terrasse',
    imageClassName: 'object-cover object-center'
  },
  {
    src: '/1080/tech-halv-1080.png',
    alt: 'Nærbilde av hetten og det vannavvisende TechDown-stoffet',
    imageClassName:
      'object-contain object-center p-1 sm:p-0 md:scale-[1.12] lg:scale-[1.18] xl:scale-[1.24]'
  }
]

export function ImageColumn() {
  return (
    <figure className='relative mx-auto w-full max-w-[440px] sm:max-w-[500px] md:max-w-[560px] lg:max-w-[620px] xl:max-w-none'>
      <div className='relative'>
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
                <div className='relative aspect-square overflow-hidden rounded-[1rem] bg-transparent sm:aspect-[3/4] sm:rounded-[1.25rem]'>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={95}
                    className={image.imageClassName}
                    sizes='(max-width: 640px) calc(100vw - 56px), (max-width: 768px) 560px, (max-width: 1280px) 620px, (max-width: 1536px) 45vw, 540px'
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            aria-label='Forrige produktbilde'
            className='absolute left-2 top-1/2 z-20 size-10 -translate-y-1/2 border border-maritime-blue bg-cloud-dancer text-maritime-blue shadow-none transition-colors hover:bg-overcast hover:text-maritime-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloud-dancer sm:left-3 sm:size-11'
          />

          <CarouselNext
            aria-label='Neste produktbilde'
            className='absolute right-2 top-1/2 z-20 size-10 -translate-y-1/2 border border-maritime-blue bg-cloud-dancer text-maritime-blue shadow-none transition-colors hover:bg-overcast hover:text-maritime-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloud-dancer sm:right-3 sm:size-11'
          />
        </Carousel>
      </div>

      <figcaption className='sr-only'>
        Bildekarusell med {images.length} produktbilder av Utekos TechDown.
      </figcaption>
    </figure>
  )
}
