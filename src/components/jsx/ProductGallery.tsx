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
import { CAROUSEL_SSR } from '@/components/ui/carousel-ssr'
import { cn } from '@/lib/utils/className'
import type { ProductGalleryProps } from '@types'

export function ProductGallery({ title, images, imageBackgroundClassName = '' }: ProductGalleryProps) {
  if (images.length === 0) {
    return null
  }

  return (
    <Carousel
      slideCount={images.length}
      ssr={CAROUSEL_SSR.fullWidth(images.length)}
      opts={{
        align: 'start',
        loop: images.length > 1
      }}
      className={cn(
        'absolute inset-0 touch-pan-y select-none overflow-hidden rounded-none',
        imageBackgroundClassName
      )}
      aria-label={`Produktbilder for ${title}`}
    >
      <CarouselContent className='ml-0 h-full'>
        {images.map((image, index) => (
          <CarouselItem key={image.url} className='relative h-full basis-full pl-0'>
            <Image
              src={image.url}
              alt={image.altText || `Bilde av ${title}`}
              fill
              sizes='(min-width: 1280px) 58vw, (min-width: 1024px) 54vw, 100vw'
              quality={100}
              className='pointer-events-none select-none object-cover object-top'
              draggable={false}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              loading={index === 0 ? 'eager' : 'lazy'}
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
  )
}
