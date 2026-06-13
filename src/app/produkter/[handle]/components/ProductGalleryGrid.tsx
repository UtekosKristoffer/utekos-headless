'use client'

import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import type { ProductGalleryProps } from '@types'

const DESKTOP_GRID_IMAGE_COUNT = 6

export function ProductGalleryGrid({ title, images }: ProductGalleryProps) {
  const gridImages = images.slice(0, DESKTOP_GRID_IMAGE_COUNT)

  if (gridImages.length < DESKTOP_GRID_IMAGE_COUNT) {
    return null
  }

  return (
    <div className='size-full bg-havdyp'>
      <div
        className='grid size-full grid-cols-2 grid-rows-3 gap-3 bg-havdyp p-4 md:gap-4 md:p-8'
        role='group'
        aria-label={`Produktbilder for ${title}`}
      >
        {gridImages.map((image, index) => (
          <div key={image.url} className='flex min-h-0 overflow-hidden rounded-lg bg-very-peri p-3'>
            <AspectRatio ratio={4 / 5} className='w-full'>
              <Image
                src={image.url}
                alt={image.altText || `Bilde av ${title}`}
                fill
                sizes='(min-width: 1024px) 27vw, 30vw'
                quality={95}
                className='pointer-events-none select-none rounded-lg object-cover object-top'
                draggable={false}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  )
}
