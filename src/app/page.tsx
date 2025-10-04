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
import { NewProductLaunchSectionSkeleton } from '@/components/frontpage/Skeletons/NewProductLaunchSectionSkeleton'
import { NewProductLaunchSection } from '@/components/frontpage/NewProductLaunchSection'
import { SocialProofSection } from '@/components/frontpage/SocialProofSection'
import { TestimonialConstellation } from '@/components/frontpage/TestimonialConstellation'
import { ProductCarousel } from '@/components/ProductCard/ProductCarousel'
import { SpecialOfferSection } from '@/layout/SpecialOfferSection'
import { Suspense } from 'react'

const HomePage = async () => {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts,
    staleTime: 1000 * 60 * 10 // 10 minutes
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

      <SpecialOfferSection />

      <section className='container md:max-w-7xl max-w-[95%] mx-auto py-12 lg:py-16 sm:py-16'>
        <HydrationBoundary state={dehydratedState}>
          <ProductCarousel />
        </HydrationBoundary>
      </section>

      <SocialProofSection />
      <NewStandardSection />
      <TestimonialConstellation />
      <PromiseSection />
      <MomentsSection />
      <QualitySection />
    </main>
  )
}

export default HomePage
