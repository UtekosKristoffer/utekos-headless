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
    src: '/utekos-techdown-diagonalt-fullfigur.webp',
    alt: 'Utekos TechDown diagonalt fullfigur',
    imageClassName: 'object-contain object-center p-1 sm:p-0'
  },
  {
    src: '/kvinne-nyter-terrasselivet-med-utekos-techdown.webp',
    alt: 'Utekos TechDown i bruk på en terrasse',
    imageClassName: 'object-cover object-center'
  },
  {
    src: '/utekos-techdown-bakside-fullmodus-1600-1793.webp',
    alt: 'Utekos TechDown sett bakfra',
    imageClassName: 'object-contain object-center p-1 sm:p-0'
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
              <CarouselItem key={image.src} className='h-auto'>
                <div className='relative aspect-square overflow-hidden rounded-[1rem] bg-transparent sm:aspect-[3/4] sm:rounded-[1.25rem]'>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={80}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    decoding='async'
                    className={image.imageClassName}
                    sizes='(max-width: 640px) calc(100vw - 56px), (max-width: 768px) 560px, (max-width: 1280px) 620px, (max-width: 1536px) 45vw, 540px'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            aria-label='Forrige produktbilde'
            className='absolute left-2 top-1/2 z-20 size-10 -translate-y-1/2 border border-havdyp bg-cloud-dancer text-havdyp shadow-none transition-colors hover:bg-overcast hover:text-havdyp focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloud-dancer sm:left-3 sm:size-11'
          />

          <CarouselNext
            aria-label='Neste produktbilde'
            className='absolute right-2 top-1/2 z-20 size-10 -translate-y-1/2 border border-havdyp bg-cloud-dancer text-havdyp shadow-none transition-colors hover:bg-overcast hover:text-havdyp focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloud-dancer sm:right-3 sm:size-11'
          />
        </Carousel>
      </div>

      <figcaption className='sr-only'>
        Bildekarusell med {images.length} produktbilder av Utekos TechDown.
      </figcaption>
    </figure>
  )
}
