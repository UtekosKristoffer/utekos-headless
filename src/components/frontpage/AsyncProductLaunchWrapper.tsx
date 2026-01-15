import { cacheTag } from 'next/cache'
import { getFeaturedProducts } from '@/api/lib/products/getFeaturedProducts'
import { NewProductLaunchSection } from '@/components/frontpage/components/NewProductLaunchSection/NewProductLaunchSection'
import { QueryClient } from '@tanstack/react-query'

export async function AsyncProductLaunchWrapper() {
  'use cache'
  cacheTag('products')

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts
  })

  const featuredProducts = queryClient.getQueryData([
    'products',
    'featured'
  ]) as any[]

  const techDownProduct = featuredProducts?.find(
    product => product.handle === 'utekos-techdown'
  )

  const techDownId =
    techDownProduct?.variants?.edges?.find(
      (edge: any) => edge.node.availableForSale
    )?.node?.id
    || techDownProduct?.variants?.edges?.[0]?.node?.id
    || ''

  if (!techDownId) return null

  return <NewProductLaunchSection variantId={techDownId} />
}
