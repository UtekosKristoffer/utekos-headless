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
import { initializeCarouselProducts } from '@/components/ProductCard/initializeCarouselProducts'
import type { RelatedProductsProps } from 'types/product/ProductTypes'

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null
  }

  const productOptionsMap = initializeCarouselProducts(products)

  return (
    <section className='px-6 py-12 md:py-16 rounded-[1.75rem] bg-transparent'>
      <div className='mb-8 text-center'>
        <h2 className='text-havdyp'>Favoritter blant andre livsnytere</h2>
      </div>
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
            const initialOptions = productOptionsMap.get(product.handle)

            return (
              <CarouselItem
                key={product.id}
                className='h-auto pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4'
              >
                <ProductCard
                  product={product}
                  colorHexMap={colorHexMap}
                  isPriority={index < 4}
                  initialOptions={initialOptions ?? {}}
                />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className='left-2 border-cloud-dancer/80 bg-cloud-dancer/92 text-havdyp shadow-md hover:border-dusted-peri hover:bg-dusted-peri hover:text-maritime-darkest' />
        <CarouselNext className='right-2 border-cloud-dancer/80 bg-cloud-dancer/92 text-havdyp shadow-md hover:border-dusted-peri hover:bg-dusted-peri hover:text-maritime-darkest' />
      </Carousel>
    </section>
  )
}
