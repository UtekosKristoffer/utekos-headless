'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { CAROUSEL_SSR } from '@/components/ui/carousel-ssr'
import { createColorHexMap } from '@/lib/helpers/shared/createColorHexMap'
import { initializeCarouselProducts } from './initializeCarouselProducts'
import { ProductCard } from './ProductCard'
import type { ShopifyProduct } from 'types/product'

interface SharedProductCarouselProps {
  products: ShopifyProduct[]
}

export function SharedProductCarousel({ products }: SharedProductCarouselProps) {
  if (products.length === 0) {
    return null
  }

  const productOptionsMap = initializeCarouselProducts(products)

  return (
    <Carousel
      slideCount={products.length}
      ssr={CAROUSEL_SSR.responsiveHalvesAndThirds(products.length)}
      opts={{
        align: 'start',
        loop: products.length > 3
      }}
      className='w-full'
    >
      <CarouselContent className='-ml-8'>
        {products.map(product => {
          const colorHexMap = createColorHexMap(product)
          const initialOptions = productOptionsMap.get(product.handle) ?? ({} as Record<string, string>)

          return (
            <CarouselItem key={product.id} className='pl-8 sm:basis-1/2 lg:basis-1/3'>
              <ProductCard product={product} colorHexMap={colorHexMap} initialOptions={initialOptions} />
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
