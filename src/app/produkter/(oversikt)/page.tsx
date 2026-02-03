import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getProducts } from '@/api/lib/products/getProducts'
import { QueryClient } from '@tanstack/react-query'
import { ComparisonTeaser } from '@/app/handlehjelp/sammenlign-modeller/sections/ComparisonTeaser'
import { HelpChooseSection } from './components/HelpChooseSection'
import { ProductTestimonial } from '@/app/produkter/(oversikt)/components/ProductTestimonial'
import { ProductsPageFooter } from '@/app/produkter/(oversikt)/components/ProductsPageFooter'
import { ProductsPageHeader } from '@/app/produkter/(oversikt)/components/ProductsPageHeader'
import { AllProductsCarousel } from '@/components/ProductCard/AllProductsCarousel'
import { ComfyrobeFeatureSection } from './components/ComfyrobeFeatureSection'
import { ProductGridSkeleton } from '@/components/frontpage/Skeletons/ProductGridSkeleton'
import { VideoSkeleton } from './components/VideoSkeleton'
import { Suspense, Activity } from 'react'
import type { Metadata } from 'next'
import { StapperFeatureSection } from './components/StapperFeatureSection/StapperFeatureSection'
import { ProductVideoSection } from './components/ProductVideoSection'
import { TechDownFeatureSection } from './components/TechDownFeatureSection/TechDownFeatureSection'
import { connection } from 'next/server'
import { MikrofiberSection } from './components/MicrofiberSection/MikrofiberSection'
import { CreatedForSection } from './components/CreatedForSection'

export const metadata: Metadata = {
  title: 'Kolleksjon: Komfortplagg for hytteliv & utekos | Utekos',
  description:
    'Utforsk hele kolleksjonen av komfortplagg fra Utekos. Våre varme og slitesterke produkter er skapt for å forlenge de gode stundene på hytten, i bobilen eller på kjølige kvelder.',
  keywords: [
    'Varmedress',
    'Komfortplagg',
    'Utekos kolleksjon',
    'Hytteklær',
    'Bobiltur'
  ],
  alternates: {
    canonical: '/produkter'
  },
  openGraph: {
    type: 'website',
    locale: 'no_NO',
    url: 'https://utekos.no/produkter',
    siteName: 'Utekos',
    title: 'Hele kolleksjonen fra Utekos',
    description:
      'Varme og komfortable plagg for deg som elsker utelivet på hytten, i bobilen eller båten.',
    images: [
      {
        url: 'https://utekos.no/og-image-produkter.png',
        width: 1200,
        height: 630,
        alt: 'Kolleksjonen av komfortplagg fra Utekos'
      }
    ]
  }
}

const ProductsPage = async () => {
  await connection()
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['products', 'all'],
    queryFn: () =>
      getProducts().then(response => {
        if (!response.success || !response.body) {
          return []
        }
        return response.body
      })
  })

  return (
    <>
      <main className='container mx-auto px-4 py-16 sm:py-24'>
        <Activity>
          <ProductsPageHeader />
        </Activity>
        <Activity>
          <HelpChooseSection />
        </Activity>
        <Activity>
          <Suspense fallback={<VideoSkeleton />}>
            <ProductVideoSection />
            <TechDownFeatureSection />
          </Suspense>
        </Activity>
        <Activity>
          <ProductTestimonial />
        </Activity>
        <Activity>
          <ComparisonTeaser />
        </Activity>

        <Activity>
          <section className='mb-24'>
            <CreatedForSection />

            <HydrationBoundary state={dehydrate(queryClient)}>
              <Suspense fallback={<ProductGridSkeleton />}>
                <AllProductsCarousel />
              </Suspense>
            </HydrationBoundary>
          </section>
        </Activity>
        <Activity>
          <ComfyrobeFeatureSection />
        </Activity>
        <Activity>
          <MikrofiberSection />
        </Activity>
        <Activity>
          <StapperFeatureSection />
        </Activity>
        <Activity>
          <ProductsPageFooter />
        </Activity>
      </main>
    </>
  )
}

export default ProductsPage
