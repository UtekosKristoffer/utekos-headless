// Path: src/app/(products)/products/(handle)/page.tsx
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ProductPageController } from '@/components/ProductPageController'
import { productOptions } from '@/lib/helpers/products/productOptions'
import { fetchProductByHandle } from '@/lib/helpers/products/fetchProductByHandle'
import { getQueryClient } from '@/clients/getQueryClient'
import { ProductPageSkeleton } from '@/components/skeletons/ProductPageSkeleton'
import type { Metadata } from 'next'
import type { ShopifyProduct } from '../../../types'

export function generateStaticParams() {
  return [
    { product: 'utekos-dun' },
    { product: 'utekos-mikrofiber' },
    { product: 'comfyrobe' },
    { product: 'utekos-special-edition' }
  ]
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const product: ShopifyProduct | null = await fetchProductByHandle(handle)

  if (!product) {
    notFound()
  }

  const queryClient = getQueryClient()

  queryClient.prefetchQuery(productOptions([product.id]))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductPageController productId={product.id} />
      </Suspense>
    </HydrationBoundary>
  )
}
