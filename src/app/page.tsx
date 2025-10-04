// Path: src/app/page.tsx
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/api/lib/getQueryClient'
import { getFeaturedProducts } from '@/api/lib/products/getFeaturedProducts'
import { HeroSection } from '@/components/frontpage/HeroSection'
import { MomentsSection } from '@/components/frontpage/MomentsSection'
import { NewStandardSection } from '@/components/frontpage/NewStandardSection'
import { PromiseSection } from '@/components/frontpage/PromiseSection'
import { QualitySection } from '@/components/frontpage/QualitySection'
import { HeroSectionSkeleton } from '@/components/frontpage/Skeletons/HeroSectionSkeleton'
import { MomentsSectionSkeleton } from '@/components/frontpage/Skeletons/MomentsSectionSkeleton'
import { NewProductLaunchSectionSkeleton } from '@/components/frontpage/Skeletons/NewProductLaunchSectionSkeleton'
import { NewStandardSectionSkeleton } from '@/components/frontpage/Skeletons/NewStandardSectionSkeleton'
import { ProductGridSkeleton } from '@/components/frontpage/Skeletons/ProductGridSkeleton'
import { PromiseSectionSkeleton } from '@/components/frontpage/Skeletons/PromiseSectionSkeleton'
import { QualitySectionSkeleton } from '@/components/frontpage/Skeletons/QualitySectionSkeleton'
import { SocialProofSectionSkeleton } from '@/components/frontpage/Skeletons/SocialProofSectionSkeleton'
import { SpecialOfferSectionSkeleton } from '@/components/frontpage/Skeletons/SpecialOfferSectionSkeleton'
import { TestimonialConstellationSkeleton } from '@/components/frontpage/Skeletons/TesimonialConstellationSkeleton'
import { NewProductLaunchSection } from '@/components/frontpage/NewProductLaunchSection'
import { SocialProofSection } from '@/components/frontpage/SocialProofSection'
import { TestimonialConstellation } from '@/components/frontpage/TestimonialConstellation'
import { ProductCarousel } from '@/components/ProductCard/ProductCarousel'
import { SpecialOfferSection } from '@/layout/SpecialOfferSection'
import { Suspense } from 'react'

const HomePage = () => {
  const queryClient = getQueryClient()

  queryClient.prefetchQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <main>
      <Suspense fallback={<HeroSectionSkeleton />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<NewProductLaunchSectionSkeleton />}>
        <NewProductLaunchSection />
      </Suspense>

      <Suspense fallback={<SpecialOfferSectionSkeleton />}>
        <SpecialOfferSection />
      </Suspense>

      <section className='container md:max-w-7xl max-w-[95%] mx-auto py-12 lg:py-16 sm:py-16'>
        <HydrationBoundary state={dehydratedState}>
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductCarousel />
          </Suspense>
        </HydrationBoundary>
      </section>

      <Suspense fallback={<SocialProofSectionSkeleton />}>
        <SocialProofSection />
      </Suspense>

      <Suspense fallback={<NewStandardSectionSkeleton />}>
        <NewStandardSection />
      </Suspense>

      <Suspense fallback={<TestimonialConstellationSkeleton />}>
        <TestimonialConstellation />
      </Suspense>

      <Suspense fallback={<PromiseSectionSkeleton />}>
        <PromiseSection />
      </Suspense>

      <Suspense fallback={<MomentsSectionSkeleton />}>
        <MomentsSection />
      </Suspense>

      <Suspense fallback={<QualitySectionSkeleton />}>
        <QualitySection />
      </Suspense>
    </main>
  )
}

export default HomePage
