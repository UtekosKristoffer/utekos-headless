// Path: src/app/produkter/[handle]/page.tsx
import { getProduct } from '@/api/lib/products/getProduct'
import { ProductPageController } from '@/app/produkter/[handle]/ProductPageController/ProductPageController'
import { ProductPageSkeleton } from '@/app/produkter/[handle]/ProductPageSkeleton/ProductPageSkeleton'
import { ProductProvider } from '@/components/providers/ProductProvider'
import { reshapeMetaobject } from '@/lib/utils/reshapeMetaobject'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
export default async function ProductPage(props: {
  params: Promise<{ handle: string }>
}) {
  const params = await props.params
  const product = await getProduct(params.handle)

  if (!product) return notFound()

  const productWithTransformedMetafields = {
    ...product,
    variants: {
      ...product.variants,
      edges: product.variants.edges.map(edge => ({
        ...edge,
        node: {
          ...edge.node,

          variantProfileData: reshapeMetaobject(
            edge.node.metafield?.reference?.fields
          )
        }
      }))
    }
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.title,
    'image': product.featuredImage?.url,
    'offers': {
      '@type': 'AggregateOffer',
      'availability':
        product.availableForSale ?
          'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      'priceCurrency': product.priceRange.minVariantPrice.currencyCode,
      'highPrice': product.priceRange.maxVariantPrice.amount,
      'lowPrice': product.priceRange.minVariantPrice.amount
    }
  }

  return (
    <ProductProvider>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductPageController productData={productWithTransformedMetafields} />
      </Suspense>
    </ProductProvider>
  )
}
