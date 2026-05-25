// Path: src/app/produkter/[handle]/page.tsx

import { Suspense } from 'react'
import { VideoSkeleton } from '@/app/produkter/(oversikt)/components/VideoSkeleton'
import { ProductVideoSection } from '@/app/produkter/(oversikt)/components/ProductVideoSection'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getProduct } from '@/api/lib/products/getProduct'
import { IntersportSection } from '@/app/om-oss/components/IntersportSection'
import { QueryClient } from '@tanstack/react-query'
import { productOptions } from '@/api/lib/products/productOptions'
import { notFound } from 'next/navigation'
import { ProductPageController } from '@/app/produkter/[handle]/components/ProductPageController'
import type { Metadata } from 'next'
import { getCachedRelatedProducts } from '@/api/lib/products/getCachedRelatedProducts'
import { reshapeProductWithMetafields } from '@/hooks/useProductWithMetafields'
import { flattenVariants } from '@/lib/utils/flattenVariants'
import { computeVariantImages } from '@/lib/utils/computeVariantImages'
import { ProductPageSkeleton } from './components/ProductPageSkeleton'
import { cacheLife, cacheTag } from 'next/cache'
import type { ShopifyProduct, ShopifyProductVariant } from 'types/product'

const SITE_URL = 'https://utekos.no'

type RouteParamsPromise = Promise<{ handle: string }>

type SearchParamsRecord = {
  [key: string]: string | string[] | undefined
}

type SearchParamsPromise = Promise<SearchParamsRecord>

type GenerateMetadataProps = {
  params: RouteParamsPromise
  searchParams: SearchParamsPromise
}

type ProductPageProps = {
  params: RouteParamsPromise
  searchParams: SearchParamsPromise
}

function toAbsoluteUrl(url: string) {
  try {
    return new URL(url).toString()
  } catch {
    const normalizedPath = url.startsWith('/') ? url : `/${url}`
    return new URL(normalizedPath, SITE_URL).toString()
  }
}

function getFirstSearchParamValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0]
  return value
}

function toURLSearchParams(searchParams: SearchParamsRecord) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item) params.append(key, item)
      }
      continue
    }

    if (value) {
      params.set(key, value)
    }
  }

  return params
}

function slugifyVariantParam(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replaceAll('æ', 'ae')
    .replaceAll('ø', 'o')
    .replaceAll('å', 'a')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function findVariantFromReadableParams(
  allVariants: ShopifyProductVariant[],
  searchParams: URLSearchParams
) {
  return (
    allVariants.find(variant => {
      const selectedOptions = variant.selectedOptions ?? []
      if (!selectedOptions.length) return false

      return selectedOptions.every(option => {
        const key = slugifyVariantParam(option.name)
        const value = slugifyVariantParam(option.value)

        return searchParams.get(key) === value
      })
    }) ?? null
  )
}

function resolveInitialVariant(
  product: ShopifyProduct,
  searchParams: SearchParamsRecord
) {
  const allVariants = flattenVariants(product) || []
  if (!allVariants.length) return null

  const variantId = getFirstSearchParamValue(searchParams.variant)
  if (variantId) {
    const variantFromId = allVariants.find(variant => variant.id === variantId)
    if (variantFromId) return variantFromId
  }

  const readableParams = toURLSearchParams(searchParams)
  const variantFromReadableParams = findVariantFromReadableParams(
    allVariants,
    readableParams
  )

  if (variantFromReadableParams) return variantFromReadableParams

  return (
    allVariants.find(variant => variant.availableForSale)
    ?? product.selectedOrFirstAvailableVariant
    ?? allVariants[0]
    ?? null
  )
}

async function getCachedProductPageData(handle: string) {
  'use cache'

  cacheTag(`product-${handle}`, 'products')
  cacheLife('products')

  const [product, relatedProducts] = await Promise.all([
    getProduct(handle),
    getCachedRelatedProducts(handle)
  ])

  return {
    product,
    relatedProducts
  }
}

export async function generateStaticParams() {
  return [{ handle: 'utekos-techdown' }]
}

export async function generateMetadata({
  params,
  searchParams
}: GenerateMetadataProps): Promise<Metadata> {
  const { handle } = await params
  const resolvedSearchParams = await searchParams
  const rawProduct = await getProduct(handle)

  if (!rawProduct) {
    return {
      title: 'Produkt ikke funnet',
      description: 'Dette produktet er dessverre ikke tilgjengelig.'
    }
  }

  const product = reshapeProductWithMetafields(rawProduct) || rawProduct
  const activeVariant = resolveInitialVariant(product, resolvedSearchParams)

  const variantImages = computeVariantImages(product, activeVariant)
  const displayImage =
    variantImages[0]?.url || product.featuredImage?.url || '/og-image.jpg'
  const displayImageUrl = toAbsoluteUrl(displayImage)

  const seoTitle =
    activeVariant?.title ?
      `${product.title} - ${activeVariant.title}`
    : product.seo.title || product.title

  const seoDescription = product.seo.description || product.description
  const canonicalPath = `/produkter/${handle}`
  const canonicalUrl = toAbsoluteUrl(canonicalPath)

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
  if (selectedVariant?.compareAtPrice?.amount) {
    other['product:variant:compare_at_price'] =
      selectedVariant.compareAtPrice.amount
  }

  other['product:availability'] = isOutOfStock ? 'out of stock' : 'in stock'
  other['product:condition'] = 'new'

  return {
    metadataBase: new URL(SITE_URL),
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      type: 'website',
      locale: 'no_NO',
      url: canonicalUrl,
      siteName: 'Utekos',
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: displayImageUrl,
          width: 1200,
          height: 630,
          alt: seoTitle
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [displayImageUrl]
    },
    other
  }
}

async function AsyncProductContent({
  handle,
  searchParams
}: {
  handle: string
  searchParams: SearchParamsPromise
}) {
  const [{ product, relatedProducts }, resolvedSearchParams] =
    await Promise.all([getCachedProductPageData(handle), searchParams])

  if (!product) {
    notFound()
  }

  const productWithMetafields = reshapeProductWithMetafields(product) || product

  const initialVariant = resolveInitialVariant(
    productWithMetafields,
    resolvedSearchParams
  )

  const queryClient = new QueryClient()
  const productQueryOptions = productOptions(handle)

  queryClient.setQueryData(productQueryOptions.queryKey, product)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPageController
        handle={handle}
        initialVariantId={initialVariant?.id ?? null}
        initialRelatedProducts={relatedProducts}
      />
    </HydrationBoundary>
  )
}

export default async function ProductPage({
  params,
  searchParams
}: ProductPageProps) {
  const { handle } = await params

  return (
    <>
      <Suspense fallback={<ProductPageSkeleton />}>
        <AsyncProductContent handle={handle} searchParams={searchParams} />
      </Suspense>

      <IntersportSection />

      <Suspense fallback={<VideoSkeleton />}>
        <ProductVideoSection />
      </Suspense>
    </>
  )
}
