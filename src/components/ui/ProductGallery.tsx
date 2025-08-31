'use client'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y } from 'swiper/modules'
import type { Image as Imgs } from '@/types'
type ProductGalleryProps = {
  title: string
  images: Imgs[]
}

export function ProductGallery({ title, images }: ProductGalleryProps) {
  if (images.length === 0) {
    return <div className='relative aspect-video w-full overflow-hidden rounded-lg md:max-h-[600px] bg-surface-raised/40' />
  }

  return (
    <div className='space-y-4'>
      <Swiper modules={[Navigation, A11y]} spaceBetween={10} navigation loop={images.length > 1} className='w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto overflow-hidden rounded-lg' aria-label={`Produktbilder for ${title}`}>
        {images.map((mediaImage, index) => (
          <SwiperSlide key={mediaImage.id} className='aspect-[2/3] flex items-center justify-center mx-auto'>
            <Image src={mediaImage.url} alt={mediaImage.altText || `Bilde av ${title}`} fill sizes='(min-width: 1024px) 24rem, (min-width: 768px) 20rem, 16rem' className='object-contain md:max-w-[300px] md:max-h-[450px] mx-auto place-self-center' priority={index === 0} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductGallery
