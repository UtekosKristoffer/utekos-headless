// Path: src/components/jsx/ProductGallery.tsx

'use client'

import type { Image as GalleryImage } from '@types'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

type ProductGalleryProps = {
  title: string
  images: GalleryImage[]
}

export function ProductGallery({ title, images }: ProductGalleryProps) {
  if (images.length === 0) {
    return <div className='relative aspect-video w-full' />
  }

  return (
    <div>
      <Carousel
        opts={{
          loop: images.length > 1
        }}
        className='mx-auto w-full max-w-sm overflow-hidden rounded-2xl md:max-w-md'
        aria-label={`Produktbilder for ${title}`}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={image.url}
              className='relative aspect-[2/3] md:p-8'
            >
              <Image
                src={image.url}
                alt={image.altText || `Bilde av ${title}`}
                fill
                sizes='(min-width: 1024px) 24rem, (min-width: 768px) 20rem, 16rem'
                className='object-cover md:object-contain'
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-2' />
        <CarouselNext className='right-2' />
      </Carousel>
    </div>
  )
}
