// Path: src/components/jsx/ProductGallery.tsx
'use client'

import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import type { ProductGalleryProps } from '@types'

export function ProductGallery({ title, images }: ProductGalleryProps) {
  if (images.length === 0) {
    return <div className='relative w-full rounded-2xl aspect-[2/3]' />
  }

  return (
    <div className='w-full'>
      <Carousel
        opts={{
          loop: images.length > 1
        }}
        className='relative w-full max-w-lg mx-auto rounded-2xl aspect-[2/3] overflow-hidden'
        aria-label={`Produktbilder for ${title}`}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={image.url}
              className='relative rounded-2xl aspect-[2/3]'
            >
              <Image
                src={image.url}
                alt={image.altText || `Bilde av ${title}`}
                fill
                sizes='(min-width: 1024px) 50vw, 100vw'
                quality={95}
                className='object-cover md:object-contain rounded-2xl'
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className='left-2' />
            <CarouselNext className='right-2' />
          </>
        )}
      </Carousel>
    </div>
  )
}
