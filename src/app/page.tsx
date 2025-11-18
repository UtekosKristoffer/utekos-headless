// Path: src/app/page.tsx
import { FindInStoreSection } from '@/components/frontpage/FindStoreSection'
import { Suspense, Activity } from 'react'
import { NewProductInStoreNotice } from '@/components/frontpage/NewProductInStoreNotice'
import { VideoSkeleton } from '@/app/produkter/components/VideoSkeleton'
import { ProductVideoSection } from '@/app/produkter/components/ProductVideoSection'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import { getFeaturedProducts } from '@/api/lib/products/getFeaturedProducts'
import { HeroSection } from '@/components/frontpage/components/HeroSection/HeroSection'
import { MomentsSection } from '@/components/frontpage/MomentsSection'
import { NewStandardSection } from '@/components/frontpage/NewStandardSection'
import { PromiseSection } from '@/components/frontpage/PromiseSection'
import { QualitySection } from '@/components/frontpage/QualitySection'
import { NewProductLaunchSection } from '@/components/frontpage/components/NewProductLaunchSection/NewProductLaunchSection'
import { SocialProofSection } from '@/components/frontpage/SocialProofSection'
import { TestimonialConstellation } from '@/components/frontpage/TestimonialConstellation'
import { ProductCarousel } from '@/components/ProductCard/ProductCarousel'
import { connection } from 'next/server'
import { ComfyrobeSection } from '../components/frontpage/components/SpecialOfferSection/ComfyrobeSection'

const HomePage = async () => {
  await connection()
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts
  })
  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Activity>
          <HeroSection />
        </Activity>
        <Activity>
          <NewProductLaunchSection />
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
          <Suspense fallback={<VideoSkeleton />}>
            <ProductVideoSection />
          </Suspense>
        </Activity>
        <Activity>
          <section className='container md:max-w-7xl max-w-[95%] mx-auto py-12 lg:py-16 sm:py-16'>
            <h1 className='mb-8 md:mb-12 text-center text-3xl font-bold'>
              Våre kunders favoritter{' '}
            </h1>
            <ProductCarousel />
          </section>
        </Activity>
        <Activity>
          <SocialProofSection />
        </Activity>
        <Activity>
          <NewStandardSection />
        </Activity>
        <Activity>
          <PromiseSection />
        </Activity>
        <Activity>
          <MomentsSection />
        </Activity>
        <Activity>
          <QualitySection />
        </Activity>
      </HydrationBoundary>
      <Activity>
        <FindInStoreSection />
      </Activity>
    </main>
  )
}

export default HomePage
