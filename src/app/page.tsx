// Path: src/app/page.tsx
import { FindInStoreSection } from '@/components/frontpage/FindStoreSection'
import { Suspense } from 'react'
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
import { SpecialOfferSection } from '@/SpecialOfferSection/SpecialOfferSection'
const HomePage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts
  })

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HeroSection />
        <NewProductLaunchSection />
        <NewProductInStoreNotice />
        <TestimonialConstellation />
        <SpecialOfferSection />
        <Suspense fallback={<VideoSkeleton />}>
          <ProductVideoSection />
        </Suspense>
        <section className='container md:max-w-7xl max-w-[95%] mx-auto py-12 lg:py-16 sm:py-16'>
          <h1 className='mb-8 md:mb-12 text-center text-3xl font-bold'>
            Våre kunders favoritter{' '}
          </h1>
          <ProductCarousel />
        </section>
        <SocialProofSection />
        <NewStandardSection />
        <PromiseSection />
        <MomentsSection />
        <QualitySection />
      </HydrationBoundary>
      <FindInStoreSection />
    </main>
  )
}

export default HomePage
