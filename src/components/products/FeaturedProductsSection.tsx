import {
  HydrationBoundary,
  dehydrate,
  QueryClient
} from '@tanstack/react-query'
import { getFeaturedProducts } from '@/api/lib/products/getFeaturedProducts'
import { ProductCarousel } from '@/components/ProductCard/ProductCarousel'
export async function FeaturedProductsSection() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className='container md:max-w-7xl max-w-[95%] mx-auto py-12 lg:py-16 sm:py-16'>
        <h1 className='mb-8 md:mb-12 text-center text-3xl font-bold'>
          Våre kunders favoritter{' '}
        </h1>
        <ProductCarousel />
      </section>
    </HydrationBoundary>
  )
}
