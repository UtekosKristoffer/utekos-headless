// Path: src/app/produkter/page.tsx
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/api/lib/getQueryClient'
import { getProducts } from '@/api/lib/products/getProducts'

import { ComparisonTeaser } from '@/app/handlehjelp/sammenlign-modeller/sections/ComparisonTeaser'
import { HelpChooseSection } from '@/app/produkter/components/HelpChooseSection'
import { ProductTestimonial } from '@/app/produkter/components/ProductTestimonial'
import { ProductsPageFooter } from '@/app/produkter/components/ProductsPageFooter'
import { ProductsPageHeader } from '@/app/produkter/components/ProductsPageHeader'
import { AllProductsCarousel } from '@/components/ProductCard/AllProductsCarousel'

import { ComparisonTeaserSkeleton } from '@/components/frontpage/Skeletons/ComparisonTeaserSkeleton'
import { HelpChooseSectionSkeleton } from '@/components/frontpage/Skeletons/HelpChooseSectionSkeleton'
import { ProductGridSkeleton } from '@/components/frontpage/Skeletons/ProductGridSkeleton'
import { ProductTestimonialSkeleton } from '@/components/frontpage/Skeletons/ProductTestimonialSkeleton'
import { ProductsPageFooterSkeleton } from '@/components/frontpage/Skeletons/ProductsPageFooterSkeleton'
import { ProductsPageHeaderSkeleton } from '@/components/frontpage/Skeletons/ProductsPageHeaderSkeleton'

import { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kolleksjon: Komfortplagg for hytteliv & utekos | Utekos',
  description:
    'Utforsk hele kolleksjonen av komfortplagg fra Utekos. Våre varme og slitesterke produkter er skapt for å forlenge de gode stundene på hytten, i bobilen eller på kjølige kvelder.',
  openGraph: {
    type: 'website',
    locale: 'no_NO',
    url: 'https://utekos.no/produkter',
    siteName: 'Utekos',
    title: 'Hele kolleksjonen fra Utekos',
    description:
      'Varme og komfortable plagg for deg som elsker utelivet på hytta, i bobilen eller båten.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kolleksjonen av komfortplagg fra Utekos'
      }
    ]
  }
}

const ProductsPage = () => {
  const queryClient = getQueryClient()

  queryClient.prefetchQuery({
    queryKey: ['products', 'all'],
    queryFn: async () => {
      const response = await getProducts()
      if (!response.success || !response.body) {
        throw new Error('Failed to fetch products')
      }
      return response.body
    }
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <main className='container mx-auto px-4 py-16 sm:py-24'>
      <Suspense fallback={<ProductsPageHeaderSkeleton />}>
        <ProductsPageHeader />
      </Suspense>

      <Suspense fallback={<HelpChooseSectionSkeleton />}>
        <HelpChooseSection />
      </Suspense>

      <Suspense fallback={<ProductTestimonialSkeleton />}>
        <ProductTestimonial />
      </Suspense>

      <Suspense fallback={<ComparisonTeaserSkeleton />}>
        <ComparisonTeaser />
      </Suspense>

      <section className='mb-24'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Hele kolleksjonen
          </h2>
        </div>
        <HydrationBoundary state={dehydratedState}>
          <Suspense fallback={<ProductGridSkeleton />}>
            <AllProductsCarousel />
          </Suspense>
        </HydrationBoundary>
      </section>

      <Suspense fallback={<ProductsPageFooterSkeleton />}>
        <ProductsPageFooter />
      </Suspense>
    </main>
  )
}

export default ProductsPage
