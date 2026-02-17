// Path: src/components/ProductCard/AllProductsCarousel.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { getProductsAction } from '@/api/lib/products/actions'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { createColorHexMap } from '@/lib/helpers/shared/createColorHexMap'
import { initializeCarouselProducts } from '@/components/ProductCard/initializeCarouselProducts'
import { ProductCard } from './ProductCard'
import type { ShopifyProduct } from 'types/product'
import { useMemo } from 'react'

export function AllProductsCarousel() {
  const { data: products } = useQuery({
    queryKey: ['products', 'all'],
    queryFn: async () => {
      const response = await getProductsAction()
      if (!response.success || !response.body) {
        return []
      }
      return response.body
    }
  })

  const sortedProducts = useMemo(() => {
    if (!products) return []

    return [...products].sort((a, b) => {
      if (a.handle === 'utekos-mikrofiber') return -1
      if (b.handle === 'utekos-mikrofiber') return 1
      return 0
    })
  }, [products])

  if (!sortedProducts || sortedProducts.length === 0) {
    return null
  }

  const productOptionsMap = initializeCarouselProducts(sortedProducts)

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: sortedProducts.length > 3
      }}
      className='w-full'
    >
      <CarouselContent className='-ml-8'>
        {sortedProducts.map((product: ShopifyProduct) => {
          const colorHexMap = createColorHexMap(product)
          const initialOptions = productOptionsMap.get(product.handle)

          return (
            <CarouselItem
              key={product.id}
              className='pl-8 sm:basis-1-2 lg:basis-1/3'
            >
              <ProductCard
                product={product}
                colorHexMap={colorHexMap}
                initialOptions={initialOptions ?? {}}
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
