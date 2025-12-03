// Path: src/app/produkter/[handle]/page.tsx
import { Suspense, Activity } from 'react'
import { VideoSkeleton } from '@/app/produkter/components/VideoSkeleton'
import { ProductVideoSection } from '@/app/produkter/components/ProductVideoSection'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getProduct } from '@/api/lib/products/getProduct'
import { ProductJsonLd } from './ProductJsonLd'
import { FindInStoreSection } from '@/components/frontpage/FindStoreSection'
import { QueryClient } from '@tanstack/react-query'
import {
  allProductsOptions,
  productOptions
} from '@/api/lib/products/productOptions'
import { notFound } from 'next/navigation'
import { ProductPageController } from '@/app/produkter/[handle]/ProductPageController/ProductPageController'
import type { Metadata, ResolvingMetadata } from 'next'
import { connection } from 'next/server'
import { getCachedRelatedProducts } from '@/api/lib/products/getCachedRelatedProducts'
import { reshapeProductWithMetafields } from '@/hooks/useProductWithMetafields'
import { flattenVariants } from '@/lib/utils/flattenVariants'
import { computeVariantImages } from '@/lib/utils/computeVariantImages'

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

  // 3. Finn aktiv variant basert på URL
  let activeVariant = null
  if (variantId) {
    const allVariants = flattenVariants(product) || []
    activeVariant = allVariants.find(v => v.id === variantId)
  }

  const variantImages = computeVariantImages(product, activeVariant ?? null)
  const displayImage =
    variantImages[0]?.url || product.featuredImage?.url || '/og-image.jpg'

  const seoTitle =
    activeVariant?.title ?
      `${product.title} - ${activeVariant.title}`
    : product.seo.title || product.title

  const seoDescription = product.seo.description || product.description

  const canonicalUrl = `/produkter/${handle}${activeVariant ? `?variant=${activeVariant.id}` : ''}`

  return {
    metadataBase: new URL('https://utekos.no'),
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalUrl
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
          url: displayImage,
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
      images: [displayImage]
    }
  }
}

export default async function ProductPage({
  params
}: {
  params: RouteParamsPromise
}) {
  const { handle } = await params
  await connection()
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
    <>
      <ProductJsonLd handle={handle} />
      <Activity>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductPageController
            handle={handle}
            initialRelatedProducts={relatedProducts}
          />
        </HydrationBoundary>
      </Activity>
      <Activity>
        <Activity>
          <FindInStoreSection />
        </Activity>
        <Suspense fallback={<VideoSkeleton />}>
          <ProductVideoSection />
        </Suspense>
      </Activity>
    </>
  )
}
