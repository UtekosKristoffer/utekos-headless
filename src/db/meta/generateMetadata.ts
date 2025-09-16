import { notFound } from 'next/navigation'

import { getProduct } from '@/api/lib/products/getProduct'
import type { ShopifyProduct } from '@types'

export async function generateMetadata({
  params
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const productId = handle
  const product: ShopifyProduct | undefined = await getProduct(productId)
  if (!product) {
    notFound()
  }

  return {
    title: product.title,
    description: product.descriptionHtml,
    openGraph: {
      title: product.title,
      description: product.descriptionHtml,
      images: product.variants.edges[0]?.node.variantProfile?.reference?.images
    }
  }
}
