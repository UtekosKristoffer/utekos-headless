// Path: src/app/produkter/[handle]/page.tsx
import { Suspense, Activity } from 'react'
import { VideoSkeleton } from '@/app/produkter/components/VideoSkeleton'
import { ProductVideoSection } from '@/app/produkter/components/ProductVideoSection'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getProduct } from '@/api/lib/products/getProduct'
import { ProductJsonLd } from './ProductJsonLd'
import { QueryClient } from '@tanstack/react-query'
import {
  allProductsOptions,
  productOptions
} from '@/api/lib/products/productOptions'
import { notFound } from 'next/navigation'
import { ProductPageController } from '@/app/produkter/[handle]/ProductPageController/ProductPageController'
import type { Metadata, ResolvingMetadata } from 'next'
import { connection } from 'next/server'
type RouteParamsPromise = Promise<{ handle: string }>

type GenerateMetadataProps = {
  params: RouteParamsPromise
}

export async function generateMetadata(
  { params }: GenerateMetadataProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { handle } = await params

  const product = await getProduct(handle)

  if (!product) {
    return {
      title: 'Produkt ikke funnet',
      description: 'Dette produktet er dessverre ikke tilgjengelig.'
    }
  }

  const seoTitle = product.seo.title || product.title
  const seoDescription = product.seo.description || product.description
  const imageUrl = product.featuredImage?.url || '/og-image.jpg'

  return {
    metadataBase: new URL('https://utekos.no'),
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: `/produkter/${handle}`
    },
    openGraph: {
      type: 'website',
      locale: 'no_NO',
      url: `/produkter/${handle}`,
      siteName: 'Utekos',
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [imageUrl]
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
          <ProductPageController handle={handle} />
        </HydrationBoundary>
      </Activity>
      <Activity>
        <Suspense fallback={<VideoSkeleton />}>
          <ProductVideoSection />
        </Suspense>
      </Activity>
    </>
  )
}
