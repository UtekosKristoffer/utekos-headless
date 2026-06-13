'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { CAROUSEL_SSR } from '@/components/ui/carousel-ssr'
import { ProductListTracking } from '@/components/analytics/ProductListTracking'
import { createColorHexMap } from '@/lib/helpers/shared/createColorHexMap'
import { initializeCarouselProducts } from './initializeCarouselProducts'
import { ProductCard } from './ProductCard'
import type { ShopifyProduct } from 'types/product'
import type { MetaEventType } from 'types/tracking/meta/event'

interface SharedProductCarouselProps {
  products: ShopifyProduct[]
  trackingEventName?: Extract<MetaEventType, 'ViewCategory' | 'ViewItemList'>
  itemListId?: string
  itemListName?: string
  contentCategory?: string
}

export function SharedProductCarousel({
  products,
  trackingEventName = 'ViewItemList',
  itemListId = 'product-carousel',
  itemListName = 'Product carousel',
  contentCategory = 'Utekos products'
}: SharedProductCarouselProps) {
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
      <ProductListTracking
        products={products}
        eventName={trackingEventName}
        itemListId={itemListId}
        itemListName={itemListName}
        contentCategory={contentCategory}
      />
      <CarouselContent className='-ml-8'>
        {products.map((product, index) => {
          const colorHexMap = createColorHexMap(product)
          const initialOptions = productOptionsMap.get(product.handle) ?? ({} as Record<string, string>)

          return (
            <CarouselItem key={product.id} className='pl-8 sm:basis-1/2 lg:basis-1/3'>
              <ProductCard
                product={product}
                colorHexMap={colorHexMap}
                initialOptions={initialOptions}
                listTrackingContext={{
                  itemListId,
                  itemListName,
                  index
                }}
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
