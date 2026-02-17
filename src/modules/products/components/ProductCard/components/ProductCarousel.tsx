// Path: src/components/ProductCard/ProductCarousel.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { getFeaturedProducts } from '@/modules/products/services/getFeaturedProducts'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { createColorHexMap } from '@/lib/helpers/shared/createColorHexMap'
import { initializeCarouselProducts } from './initializeCarouselProducts'
import { ProductCard } from './ProductCard'

export function ProductCarousel() {
  const { data: products } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts
  })

  if (!products || products.length === 0) {
    return null
  }

  const productOptionsMap = initializeCarouselProducts(products)

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: products.length > 3
      }}
      className='w-full'
    >
      <CarouselContent className='-ml-8'>
        {products.map(product => {
          const colorHexMap = createColorHexMap(product)
          const initialOptions =
            productOptionsMap.get(product.handle)
            ?? ({} as Record<string, string>)

          return (
            <CarouselItem
              key={product.id}
              className='pl-8 sm:basis-1/2 lg:basis-1/3'
            >
              <ProductCard
                product={product}
                colorHexMap={colorHexMap}
                initialOptions={initialOptions}
              />
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
