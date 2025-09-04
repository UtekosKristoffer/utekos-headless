// Path: src/app/(products)/products/(handle)/page.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { getQueryClient } from '@/clients/getQueryClient'
import { ProductPageController } from '@/components/ProductPageController'
import { ProductPageSkeleton } from '@/components/skeletons/ProductPageSkeleton'
import { fetchProductByHandle } from '@/lib/helpers/products/fetchProductByHandle'
import { productOptions } from '@/lib/helpers/products/productOptions'
export default async function ProductPage({
  params
}: {
  params: Promise<{ handle: string }>
}) {
  const product = await params

  const productHandle = await fetchProductByHandle(product.handle)

  if (!productHandle) {
    notFound()
  }

  const queryClient = getQueryClient()

  queryClient.prefetchQuery(productOptions([productHandle.id]))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductPageController productId={productHandle.id} />
      </Suspense>
    </HydrationBoundary>
  )
}
