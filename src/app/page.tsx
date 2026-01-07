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
import { ComfyrobeSection } from '../components/frontpage/components/SpecialOfferSection/ComfyrobeSection'
import { Activity } from 'react'
import { FeaturedProductsSkeleton } from '@/components/skeletons/FeaturedProductsSkeleton'
import TechTeaserSection from '@/components/frontpage/components/TechTeaserSection'
import { FrontPageJsonLd } from './FrontPageJsonLd'
import { cacheTag } from 'next/cache'

async function AsyncProductLaunchWrapper() {
  'use cache'
  cacheTag('products')

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

  if (!techDownId) return null

  return <NewProductLaunchSection variantId={techDownId} />
}

async function FeaturedProductsSection() {
  'use cache'
  cacheTag('products')

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

const HomePage = () => {
  return (
    <>
      <FrontPageJsonLd />
      <section>
        <HeroSection />

        <Activity>
          <Suspense fallback={null}>
            <AsyncProductLaunchWrapper />
          </Suspense>
        </Activity>

        {/* Ingen Activity rundt disse statiske seksjonene for bedre ytelse */}
        <TechTeaserSection />
        <NewProductInStoreNotice />
        <ComfyrobeSection />

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

        <NewStandardSection />
        <CachedPromiseSection />
        <MomentsSection />
        <QualitySection />
      </section>
    </>
  )
}

export default HomePage
