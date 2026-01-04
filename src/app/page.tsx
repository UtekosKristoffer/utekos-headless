// Path: src/app/page.tsx
import { FindInStoreSection } from '@/components/frontpage/FindStoreSection'
import { Suspense } from 'react'
import { NewProductInStoreNotice } from '@/components/frontpage/NewProductInStoreNotice'
import { ProductVideoSection } from '@/app/produkter/components/ProductVideoSection'
import {
  HydrationBoundary,
  dehydrate,
  QueryClient
} from '@tanstack/react-query'
import { getFeaturedProducts } from '@/api/lib/products/getFeaturedProducts'
import { HeroSection } from '@/components/frontpage/components/HeroSection/HeroSection'
import { MomentsSection } from '@/components/frontpage/MomentsSection'
import { NewStandardSection } from '@/components/frontpage/NewStandardSection'
import { CachedPromiseSection } from '@/components/frontpage/components/CachedPromiseSection'
import { QualitySection } from '@/components/frontpage/QualitySection'
import { NewProductLaunchSection } from '@/components/frontpage/components/NewProductLaunchSection/NewProductLaunchSection'
import { SocialProofSection } from '@/components/frontpage/SocialProofSection'
import { TestimonialConstellation } from '@/components/frontpage/TestimonialConstellation'
import { ProductCarousel } from '@/components/ProductCard/ProductCarousel'
import { connection } from 'next/server'
import { ComfyrobeSection } from '../components/frontpage/components/SpecialOfferSection/ComfyrobeSection'
import { Activity } from 'react'
import { FeaturedProductsSkeleton } from '@/components/skeletons/FeaturedProductsSkeleton'
import TechTeaserSection from '@/components/frontpage/components/TechTeaserSection'
import type { Metadata } from 'next'
import { FrontPageJsonLd } from './FrontPageJsonLd'
export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: {
    default: 'Utekos® - Skreddersy varmen.',
    template: '%s | Utekos®'
  },
  description:
    'For kompromissløs komfort og overlegen allsidighet. Med tusenvis av fornøyde livsnytere og gjennomtestede løsninger kan du stole på at Utekos vil forlenge og oppgradere dine utendørsopplevelser. Juster, form og nyt. ',

  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'no_NO',
    url: 'https://utekos.no',
    siteName: 'Utekos',
    title: 'Utekos® - Skreddersy varmen.',
    description:
      'Kompromissløs komfort. Overlegen allsidighet. Juster, form og nyt.',
    images: {
      url: 'https://utekos.no/og-kate-linn-kikkert-master.png',
      width: 1200,
      height: 630,
      alt: 'Personer som koser seg utendørs med varme komfortplagg fra Utekos.'
    }
  }
}

async function FeaturedProductsSection() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className='container md:max-w-7xl max-w-[95%] mx-auto py-12 lg:py-16 sm:py-16'>
        <h1 className='mb-8 md:mb-12 text-center text-3xl font-bold'>
          Våre kunders favoritter{' '}
        </h1>
        <ProductCarousel />
      </section>
    </HydrationBoundary>
  )
}

const HomePage = async () => {
  await connection()

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts
  })

  const featuredProducts = queryClient.getQueryData([
    'products',
    'featured'
  ]) as any[]
  const techDownProduct = featuredProducts?.find(
    product => product.handle === 'utekos-techdown'
  )

  const techDownId =
    techDownProduct?.variants?.edges?.find(
      (edge: any) => edge.node.availableForSale
    )?.node?.id
    || techDownProduct?.variants?.edges?.[0]?.node?.id
    || ''

  return (
    <>
      <FrontPageJsonLd />
      <section>
        <HeroSection />

        <Activity>
          <NewProductLaunchSection variantId={techDownId} />
        </Activity>

        <Activity>
          <TechTeaserSection />
        </Activity>

        <Activity>
          <NewProductInStoreNotice />
        </Activity>

        <Activity>
          <ComfyrobeSection />
        </Activity>

        <Activity>
          <TestimonialConstellation />
        </Activity>

        <Activity>
          <ProductVideoSection />
        </Activity>

        <Activity>
          <Suspense fallback={<FeaturedProductsSkeleton />}>
            <FeaturedProductsSection />
          </Suspense>
        </Activity>

        <Activity>
          <SocialProofSection />
        </Activity>

        <Activity>
          <NewStandardSection />
        </Activity>

        <Activity>
          <CachedPromiseSection />
        </Activity>

        <Activity>
          <MomentsSection />
        </Activity>

        <Activity>
          <QualitySection />
        </Activity>

        <Activity>
          <FindInStoreSection />
        </Activity>
      </section>
    </>
  )
}

export default HomePage
