// Path: src/app/produkter/[handle]/RelatedProducts/RelatedProducts.tsx
'use client'

import { ProductCard } from '@/components/ProductCard/ProductCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { createColorHexMap } from '@/lib/helpers/shared/createColorHexMap'
import type { RelatedProductsProps } from '@types'

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className='container mb-16 mt-24'>
      <h2 className='mb-8 text-center text-3xl font-bold'>
        Favoritter blant andre livsnytere
      </h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-4'>
          {products.map((product, index) => {
            const colorHexMap = createColorHexMap(product)
            return (
              <CarouselItem
                key={product.id}
                className='h-auto pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
              >
                <ProductCard
                  product={product}
                  colorHexMap={colorHexMap}
                  isPriority={index < 4}
                />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className='left-2' />
        <CarouselNext className='right-2' />
      </Carousel>
    </section>
  )
}
