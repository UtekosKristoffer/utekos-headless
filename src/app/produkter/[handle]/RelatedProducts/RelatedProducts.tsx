// Path: src/app/produkter/%5Bhandle%5D/RelatedProducts/RelatedProducts.tsx
'use client'

import { ProductCard } from '@/components/ProductCard/ProductCard'
import { createColorHexMap } from '@/lib/helpers/shared/createColorHexMap'
import type { RelatedProductsProps } from '@types'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className='container mt-24 mb-16'>
      <h2 className='text-3xl font-bold text-center mb-8'>
        Andre har også sett på
      </h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={24}
        slidesPerView={1.5}
        breakpoints={{
          768: {
            slidesPerView: 2.5,
            spaceBetween: 30
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 30
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30
          }
        }}
        className='!pb-4'
      >
        {products.map(product => {
          const colorHexMap = createColorHexMap(product)
          return (
            <SwiperSlide key={product.id} className='flex h-auto'>
              {/* STEG 3: Send colorHexMap videre som en prop */}
              <ProductCard product={product} colorHexMap={colorHexMap} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </section>
  )
}
