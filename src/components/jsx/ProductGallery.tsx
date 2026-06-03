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
import type { ProductGalleryProps } from '@types'

export function ProductGallery({
  title,
  images,
  desktopImages,
  imageBackgroundClassName = ''
}: ProductGalleryProps) {
  if (images.length === 0) {
    return <div className='relative aspect-square w-full rounded-none md:aspect-4/3md:rounded-[1.25rem]' />
  }

  const desktopGalleryImages = desktopImages && desktopImages.length > 0 ? desktopImages : images
  const mobileImageAspectRatio = '1 / 1'
  const desktopImageAspectRatio = '4 / 3'

  return (
    <div className='w-full'>
      <Carousel
        slideCount={images.length}
        ssr={CAROUSEL_SSR.fullWidth(images.length)}
        opts={{
          align: 'start',
          loop: images.length > 1
        }}
        className='relative mx-auto w-full touch-pan-y select-none overflow-hidden rounded-none md:hidden'
        aria-label={`Produktbilder for ${title}`}
        style={{ aspectRatio: mobileImageAspectRatio }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={image.url}
              className={`relative ${imageBackgroundClassName}`}
              style={{ aspectRatio: mobileImageAspectRatio }}
            >
              <Image
                src={image.url}
                alt={image.altText || `Bilde av ${title}`}
                fill
                sizes='(min-width: 1280px) 58vw, (min-width: 1024px) 54vw, 100vw'
                quality={95}
                className='pointer-events-none select-none object-cover'
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

      <Carousel
        slideCount={desktopGalleryImages.length}
        ssr={CAROUSEL_SSR.fullWidth(desktopGalleryImages.length)}
        opts={{
          align: 'start',
          loop: desktopGalleryImages.length > 1
        }}
        className='relative mx-auto hidden w-full touch-pan-y select-none overflow-hidden rounded-[1.25rem] md:block'
        aria-label={`Produktbilder for ${title}`}
        style={{ aspectRatio: desktopImageAspectRatio }}
      >
        <CarouselContent>
          {desktopGalleryImages.map((image, index) => (
            <CarouselItem
              key={image.url}
              className={`relative rounded-[1.25rem] ${imageBackgroundClassName}`}
              style={{ aspectRatio: desktopImageAspectRatio }}
            >
              <Image
                src={image.url}
                alt={image.altText || `Bilde av ${title}`}
                fill
                sizes='(min-width: 1280px) 58vw, (min-width: 1024px) 54vw, 100vw'
                quality={95}
                className='pointer-events-none select-none rounded-[1.25rem] object-cover'
                draggable={false}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {desktopGalleryImages.length > 1 && (
          <>
            <CarouselPrevious className='left-2' />
            <CarouselNext className='right-2' />
          </>
        )}
      </Carousel>
    </div>
  )
}
