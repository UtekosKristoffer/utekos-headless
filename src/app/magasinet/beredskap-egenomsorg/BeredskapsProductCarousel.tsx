'use client'

import { useQuery } from '@tanstack/react-query'
import { getBeredskapsProducts } from '@/api/lib/products/getBeredskapsProducts'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { initializeCarouselProducts } from '@/components/ProductCard/initializeCarouselProducts'
import { BeredskapsProductGridCard } from './BeredskapsProductGridCard'

export function BeredskapsProductCarousel() {
  const { data: products } = useQuery({
    queryKey: ['products', 'beredskaps'],
    queryFn: getBeredskapsProducts
  })

  if (!products || products.length === 0) {
    return null
  }

  const productOptionsMap = initializeCarouselProducts(products)

  return (
    <section className='container md:max-w-4xl mx-auto py-12'>
      <h1 className='text-3xl md:text-4xl font-bold tracking-tight text-center text-foreground mb-8 px-4'>
        Anbefalte produkter for din egenberedskap
      </h1>
      <Carousel
        opts={{
          align: 'start',
          slidesToScroll: 1
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-4'>
          {products.map((product, index) => {
            const initialOptions =
              productOptionsMap.get(product.handle)
              ?? ({} as Record<string, string>)

            return (
              <CarouselItem
                key={product.id}
                className='basis-1/1 pl-4 md:basis-1/3'
              >
                <BeredskapsProductGridCard
                  product={product}
                  initialOptions={initialOptions}
                  isPriority={index < 3} // Prioriter lasting av de første bildene
                  colorHexMap={new Map<string, string>()}
                />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className='left-2 md:hidden' />
        <CarouselNext className='right-2 md:hidden' />
      </Carousel>
    </section>
  )
}
