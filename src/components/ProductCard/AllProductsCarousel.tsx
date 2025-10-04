// Path: src/components/ProductCard/AllProductsCarousel.tsx
'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getProducts } from '@/api/lib/products/getProducts'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { createColorHexMap } from '@/lib/helpers/shared/createColorHexMap'
import { ProductCard } from './ProductCard'
import type { ShopifyProduct } from '@types'

export function AllProductsCarousel() {
  const { data: products } = useSuspenseQuery({
    queryKey: ['products', 'all'],
    queryFn: async () => {
      const response = await getProducts()
      if (!response.success || !response.body) {
        return []
      }
      return response.body
    }
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
        {products.map((product: ShopifyProduct) => {
          const colorHexMap = createColorHexMap(product)
          return (
            <CarouselItem
              key={product.id}
              className='pl-8 sm:basis-1-2 lg:basis-1/3'
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
