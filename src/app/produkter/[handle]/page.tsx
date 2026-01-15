import { Suspense } from 'react'
import { VideoSkeleton } from '@/app/produkter/components/VideoSkeleton'
import { ProductVideoSection } from '@/app/produkter/components/ProductVideoSection'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getProduct } from '@/api/lib/products/getProduct'
import { FindInStoreSection } from '@/components/frontpage/FindStoreSection'
import { QueryClient } from '@tanstack/react-query'
import {
  allProductsOptions,
  productOptions
} from '@/api/lib/products/productOptions'
import { notFound } from 'next/navigation'
import { ProductPageController } from '@/app/produkter/[handle]/ProductPageController/ProductPageController'
import type { Metadata, ResolvingMetadata } from 'next'
import { getCachedRelatedProducts } from '@/api/lib/products/getCachedRelatedProducts'
import { reshapeProductWithMetafields } from '@/hooks/useProductWithMetafields'
import { flattenVariants } from '@/lib/utils/flattenVariants'
import { computeVariantImages } from '@/lib/utils/computeVariantImages'
import { ProductPageSkeleton } from './ProductPageSkeleton/ProductPageSkeleton' // Antar denne importen
import { cacheLife, cacheTag } from 'next/cache' // Viktig import

type RouteParamsPromise = Promise<{ handle: string }>
type SearchParamsPromise = Promise<{
  [key: string]: string | string[] | undefined
}>

type GenerateMetadataProps = {
  params: RouteParamsPromise
  searchParams: SearchParamsPromise
}

export async function generateMetadata(
  { params, searchParams }: GenerateMetadataProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { handle } = await params
  const resolvedSearchParams = await searchParams
  const variantId = resolvedSearchParams?.variant as string | undefined
  const rawProduct = await getProduct(handle)

  if (!rawProduct) {
    return {
      title: 'Produkt ikke funnet',
      description: 'Dette produktet er dessverre ikke tilgjengelig.'
    }
  }

  const product = reshapeProductWithMetafields(rawProduct) || rawProduct

  let activeVariant = null
  if (variantId) {
    const allVariants = flattenVariants(product) || []
    activeVariant = allVariants.find(v => v.id === variantId) ?? null
  }

  const variantImages = computeVariantImages(product, activeVariant)
  const displayImage =
    variantImages[0]?.url || product.featuredImage?.url || '/og-image.jpg'

  const seoTitle =
    activeVariant?.title ?
      `${product.title} - ${activeVariant.title}`
    : product.seo.title || product.title

  const seoDescription = product.seo.description || product.description

  const canonicalUrl = `/produkter/${handle}${
    activeVariant ? `?variant=${activeVariant.id}` : ''
  }`

  const selectedVariant =
    activeVariant ?? product.selectedOrFirstAvailableVariant

  const priceAmount = selectedVariant?.price.amount
  const currencyCode = selectedVariant?.price.currencyCode
  const retailerItemId = selectedVariant?.id
  const itemGroupId = product.id
  const isOutOfStock =
    selectedVariant?.availableForSale === false
    || selectedVariant?.currentlyNotInStock === true

  const other: Record<string, string | number | (string | number)[]> = {}

  if (retailerItemId) other['product:retailer_item_id'] = retailerItemId
  if (itemGroupId) other['product:item_group_id'] = itemGroupId
  if (priceAmount != null) other['product:price:amount'] = String(priceAmount)
  if (currencyCode) other['product:price:currency'] = currencyCode
  if (selectedVariant?.compareAtPrice?.amount)
    other['product:variant:compare_at_price'] =
      selectedVariant.compareAtPrice.amount

  other['product:availability'] = isOutOfStock ? 'out of stock' : 'in stock'
  other['product:condition'] = 'new'

  return {
    metadataBase: new URL('https://utekos.no'),
    title: seoTitle,
    description: seoDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      locale: 'no_NO',
      url: canonicalUrl,
      siteName: 'Utekos',
      title: seoTitle,
      description: seoDescription,
      images: [{ url: displayImage, width: 1200, height: 630, alt: seoTitle }]
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [displayImage]
    },
    other
  }
}

async function AsyncProductContent({ handle }: { handle: string }) {
  'use cache'
  cacheTag(`product-${handle}`, 'products') // Invalideres ved produktoppdatering
  cacheLife('hours')

  const queryClient = new QueryClient()
  const product = await getProduct(handle)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getCachedRelatedProducts(handle)
  await queryClient.prefetchQuery({
    ...productOptions(handle),
    queryFn: () => product
  })
  await queryClient.prefetchQuery(allProductsOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPageController
        handle={handle}
        initialRelatedProducts={relatedProducts}
      />
    </HydrationBoundary>
  )
}

export default async function ProductPage({
  params
}: {
  params: RouteParamsPromise
}) {
  const { handle } = await params

  return (
    <>
      <Suspense fallback={<ProductPageSkeleton />}>
        <AsyncProductContent handle={handle} />
      </Suspense>

      <FindInStoreSection />

      <Suspense fallback={<VideoSkeleton />}>
        <ProductVideoSection />
      </Suspense>
    </>
  )
}
