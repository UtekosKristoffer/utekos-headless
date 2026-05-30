// Path: src/app/inspirasjon/bobil/sections/InspirationGallerySection.tsx

import Image from 'next/image'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { galleryImages } from '../utils/galleryImages'

export function InspirationGallerySection() {
  return (
    <section className='bg-havdyp py-24 text-cloud-dancer'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl md:max-w-4xl text-center'>
          <h2 className='text-cloud-dancer inline-flex items-baseline justify-center gap-x-[0.18em] whitespace-nowrap'>
            <UtekosWordmark className='h-[0.82em] w-auto shrink-0 translate-y-[0.06em]' />
            <span>i sitt rette element</span>
          </h2>
          <p className='mx-auto my-8 utekos-section-lead max-w-2xl text-cloud-dancer'>
            Fra morgenkaffen i soloppgang til sene kvelder under stjernene. La deg inspirere av ekte øyeblikk
            fra bobillivet.
          </p>
        </div>

        <Carousel
          opts={{
            loop: true,
            align: 'start'
          }}
          className='mx-auto w-full max-w-5xl'
        >
          <CarouselContent className='-ml-4'>
            {galleryImages.map(image => (
              <CarouselItem key={image.src} className='pl-4 md:basis-1/2 lg:basis-1/3'>
                <div className='group flex h-full flex-col p-1'>
                  <div className='relative aspect-[4/5] shrink-0 overflow-hidden rounded-lg border border-cloud-dancer/12 bg-maritime-darkest'>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={500}
                      className='size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                  </div>
                  <div className='flex-1 pt-4 text-left'>
                    <h3 className='font-google-sans font-bold leading-[0.95]   text-cloud-dancer'>
                      {image.title}
                    </h3>
                    <p className='mt-2   text-sm leading-[1.45]   text-cloud-dancer/90'>
                      {image.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            aria-label='Forrige bilde'
            className='left-2 hidden border-cloud-dancer/20 bg-maritime-darkest/90 text-cloud-dancer hover:bg-maritime-darkest focus-visible:ring-2 focus-visible:ring-cloud-dancer/70 focus-visible:ring-offset-2 focus-visible:ring-offset-havdyp md:inline-flex'
          />
          <CarouselNext
            aria-label='Neste bilde'
            className='right-2 hidden border-cloud-dancer/20 bg-maritime-darkest/90 text-cloud-dancer hover:bg-maritime-darkest focus-visible:ring-2 focus-visible:ring-cloud-dancer/70 focus-visible:ring-offset-2 focus-visible:ring-offset-havdyp md:inline-flex'
          />
        </Carousel>
      </div>
    </section>
  )
}
