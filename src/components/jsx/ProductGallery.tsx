'use client'

import type { Image as SwiperImage } from '@types'
import Image from 'next/image'
import { A11y, Navigation } from 'swiper/modules'
import 'swiper/modules/a11y.css'
import 'swiper/modules/navigation.css'
import 'swiper/modules/swiper.css'
import { Swiper, SwiperSlide } from 'swiper/react'
 
type ProductGalleryProps = {
  title: string
  images: SwiperImage[]
}

export function ProductGallery({ title, images }: ProductGalleryProps) {
  if (images.length === 0) {
    return (
      <div className='relative aspect-video w-full overflow-hidden rounded-lg md:max-h-[600px] bg-surface-raised/40' />
    )
  }

  return (
    <div className='space-y-4'>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={10}
        navigation
        loop={images.length > 1}
        className='w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto overflow-hidden rounded-lg'
        aria-label={`Produktbilder for ${title}`}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={image.id}
            className='aspect-[2/3] flex items-center justify-center mx-auto'
          >
            <Image
              src={image.url}
              alt={image.altText || `Bilde av ${title}`}
              fill
              sizes='(min-width: 1024px) 24rem, (min-width: 768px) 20rem, 16rem'
              className='object-contain md:max-w-[300px] md:max-h-[450px] mx-auto place-self-center'
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductGallery
