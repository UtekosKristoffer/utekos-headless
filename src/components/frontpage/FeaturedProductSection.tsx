// Path: src/components/frontpage/FeaturedProductSection.tsx
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query'
import { cacheTag } from 'next/cache'
import { getFeaturedProducts } from '@/api/lib/products/getFeaturedProducts'
import { ProductCarousel } from '@/components/ProductCard/ProductCarousel'

export async function FeaturedProductsSection() {
  'use cache'
  cacheTag('products')

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <article className='container md:max-w-7xl mx-auto px-4 py-12 lg:pt-16 md:mt-20 md:pb-8 sm:py-16'>
        <h2 className='mb-8 text-center md:mb-12'>Kundenes favoritter</h2>
        <ProductCarousel />
      </article>
    </HydrationBoundary>
  )
}
