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
    return <div className='relative aspect-[2/3] w-full rounded-[1.25rem]' />
  }

  const firstImage = images[0]
  const imageAspectRatio =
    firstImage?.width && firstImage.height ?
      `${firstImage.width} / ${firstImage.height}`
    : '2 / 3'

  return (
    <div className='w-full'>
      <Carousel
        opts={{
          loop: images.length > 1
        }}
        className='relative mx-auto w-full overflow-hidden rounded-[1.25rem]'
        aria-label={`Produktbilder for ${title}`}
        style={{ aspectRatio: imageAspectRatio }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={image.url}
              className='relative rounded-[1.25rem]'
              style={{ aspectRatio: imageAspectRatio }}
            >
              <Image
                src={image.url}
                alt={image.altText || `Bilde av ${title}`}
                fill
                sizes='(min-width: 1280px) 58vw, (min-width: 1024px) 54vw, 100vw'
                quality={95}
                className='rounded-[1.25rem] object-cover'
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
