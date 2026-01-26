import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getProducts } from '@/api/lib/products/getProducts'
import { QueryClient } from '@tanstack/react-query'
import { ComparisonTeaser } from '@/app/handlehjelp/sammenlign-modeller/sections/ComparisonTeaser'
import { HelpChooseSection } from '@/app/produkter/components/sections/HelpChooseSection/HelpChooseSection'
import { ProductTestimonial } from '@/app/produkter/components/ProductTestimonial'
import { ProductsPageFooter } from '@/app/produkter/components/ProductsPageFooter'
import { ProductsPageHeader } from '@/app/produkter/components/ProductsPageHeader'
import { AllProductsCarousel } from '@/components/ProductCard/AllProductsCarousel'
import { ComfyrobeFeatureSection } from '@/app/produkter/components/sections/ComfyrobeSection/ComfyrobeFeatureSection'
import { ProductGridSkeleton } from '@/components/frontpage/Skeletons/ProductGridSkeleton'
import { VideoSkeleton } from '../components/VideoSkeleton'
import { Suspense, Activity, useEffectEvent } from 'react'
import type { Metadata } from 'next'
import { StapperFeatureSection } from '../components/sections/StapperFeatureSection/StapperFeatureSection'
import { ProductVideoSection } from '../components/ProductVideoSection'
import { TechDownFeatureSection } from '../components/sections/TechDownFeatureSection/TechDownFeatureSection'
import { connection } from 'next/server'
import { MikrofiberSection } from '../components/sections/MicrofiberSection/MikrofiberSection'
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
            <div className='relative mb-12 w-full overflow-hidden border-y border-white/5 bg-neutral-950 py-20 text-center md:mb-20 md:py-24'>
              <div className='absolute inset-0 -z-10'>
                <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]' />
                <div className='absolute left-1/2 top-1/2 h-[400px] w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-25'>
                  <div className='h-full w-full bg-gradient-to-r from-sky-500/10 via-sky-400/20 to-sky-500/10 blur-[80px]' />
                </div>
              </div>

              <div className='relative z-10 container mx-auto px-4'>
                <h2 className='text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl'>
                  Skapt for din Utekos
                </h2>
                <p className='mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400'>
                  Våre komfortplagg er designet for å holde deg varm, slik at du
                  kan nyte de gode øyeblikkene lenger.
                </p>
              </div>
            </div>

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
