// Path: src/components/ProductCard/ProductCarousel.tsx
'use client'

import { useQuery } from '@tanstack/react-query' // Endret fra useSuspenseQuery
import { getFeaturedProducts } from '@/api/lib/products/getFeaturedProducts'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { createColorHexMap } from '@/lib/helpers/shared/createColorHexMap'
import { ProductCard } from './ProductCard'

export function ProductCarousel() {
  const { data: products } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts
  })

  if (!products || products.length === 0) {
    return null
  }

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
          return (
            <CarouselItem
              key={product.id}
              className='pl-8 sm:basis-1/2 lg:basis-1/3'
            >
              <ProductCard product={product} colorHexMap={colorHexMap} />
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious className='hidden lg:inline-flex' />
      <CarouselNext className='hidden lg:inline-flex' />
    </Carousel>
  )
}
