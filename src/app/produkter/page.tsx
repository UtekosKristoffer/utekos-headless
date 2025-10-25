// Path: src/app/produkter/page.tsx
import { ProductListJsonLd } from '@/app/produkter/ProductJsonLd'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getProducts } from '@/api/lib/products/getProducts'
import { QueryClient } from '@tanstack/react-query'
import { ComparisonTeaser } from '@/app/handlehjelp/sammenlign-modeller/sections/ComparisonTeaser'
import { HelpChooseSection } from '@/app/produkter/components/HelpChooseSection'
import { ProductTestimonial } from '@/app/produkter/components/ProductTestimonial'
import { ProductsPageFooter } from '@/app/produkter/components/ProductsPageFooter'
import { ProductsPageHeader } from '@/app/produkter/components/ProductsPageHeader'
import { AllProductsCarousel } from '@/components/ProductCard/AllProductsCarousel'
import { ComfyrobeFeatureSection } from '@/app/produkter/components/ComfyrobeSection/ComfyrobeFeatureSection'
import { ProductGridSkeleton } from '@/components/frontpage/Skeletons/ProductGridSkeleton'
import { VideoSkeleton } from './components/VideoSkeleton'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { StapperFeatureSection } from './components/StapperFeatureSection'
import { MicrofiberFeatureSection } from './components/MicrofiberSection/MicrofiberFeatureSection'
import { ProductVideoSection } from './components/ProductVideoSection'
import { TechDownFeatureSection } from './components/TechDownFeatureSection'
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
        url: '/og-image-produkter.png',
        width: 1200,
        height: 630,
        alt: 'Kolleksjonen av komfortplagg fra Utekos'
      }
    ]
  }
}

const ProductsPage = async () => {
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
      <ProductListJsonLd />
      <main className='container mx-auto px-4 py-16 sm:py-24'>
        <ProductsPageHeader />
        <HelpChooseSection />
        <Suspense fallback={<VideoSkeleton />}>
          <ProductVideoSection />
          <TechDownFeatureSection />
        </Suspense>
        <ProductTestimonial />
        <ComparisonTeaser />

        <section className='mb-24'>
          <div className='relative mb-12 text-center overflow-hidden py-16 md:mb-20'>
            <div
              aria-hidden='true'
              className='absolute inset-0 -z-10 opacity-30'
            >
              <div
                className='absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 blur-3xl'
                style={{
                  background:
                    'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
                }}
              />
            </div>
            <h2 className='text-4xl font-bold tracking-tight text-foreground drop-shadow-md md:text-5xl'>
              Skapt for din Utekos
            </h2>
            <p className='mx-auto mt-4 max-w-2xl text-lg text-access/80'>
              Våre komfortplagg er designet for å holde deg varm, slik at du kan
              nyte de gode øyeblikkene lenger.
            </p>
          </div>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ProductGridSkeleton />}>
              <AllProductsCarousel />
            </Suspense>
          </HydrationBoundary>
        </section>

        <MicrofiberFeatureSection />
        <ComfyrobeFeatureSection />
        <StapperFeatureSection />
        <ProductsPageFooter />
      </main>
    </>
  )
}

export default ProductsPage
