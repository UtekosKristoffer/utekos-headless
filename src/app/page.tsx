// Path: src/app/page.tsx

import { getProducts } from '@/api/lib/products/getProducts'
import { HeroSection } from '@/components/frontpage/HeroSection'
import { MomentsSection } from '@/components/frontpage/MomentsSection'
import { NewStandardSection } from '@/components/frontpage/NewStandardSection'
import { PromiseSection } from '@/components/frontpage/PromiseSection'
import { QualitySection } from '@/components/frontpage/QualitySection'
import { MomentsSectionSkeleton } from '@/components/frontpage/Skeletons/MomentsSectionSkeleton'
import { QualitySectionSkeleton } from '@/components/frontpage/Skeletons/QualitySectionSkeleton'
import { SpecialOfferSectionSkeleton } from '@/components/frontpage/Skeletons/SpecialOfferSectionSkeleton'
import { TestimonialConstellationSkeleton } from '@/components/frontpage/Skeletons/TesimonialConstellationSkeleton'
import { SocialProofSection } from '@/components/frontpage/SocialProofSection'
import { TestimonialConstellation } from '@/components/frontpage/TestimonialConstellation'
import { ProductCarousel } from '@/components/ProductCard/ProductCarousel'
import { ProductGridSkeleton } from '@/components/frontpage/Skeletons//ProductGridSkeleton'
import { handles } from '@/db/data/products/product-info'
import { SpecialOfferSection } from '@/layout/SpecialOfferSection'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { HeroSectionSkeleton } from '@/components/frontpage/Skeletons/HeroSectionSkeleton'
import { NewStandardSectionSkeleton } from '@/components/frontpage/Skeletons/NewStandardSectionSkeleton'
import { SocialProofSectionSkeleton } from '@/components/frontpage/Skeletons/SocialProofSectionSkeleton'
import { PromiseSectionSkeleton } from '@/components/frontpage/Skeletons/PromiseSectionSkeleton'
import { NewProductLaunchSection } from '@/components/frontpage/NewProductLaunchSection'
import { NewProductLaunchSectionSkeleton } from '@/components/frontpage/Skeletons/NewProductLaunchSectionSkeleton'
const HomePage = async () => {
  const response = await getProducts()

  if (!response.success) {
    return notFound()
  }

  const products = response.body
  if (!products || products.length === 0) {
    return notFound()
  }

  const featuredProducts = products.filter(product =>
    handles.includes(product.handle)
  )

  if (featuredProducts.length === 0) {
    return notFound()
  }

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
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductCarousel products={featuredProducts} />
        </Suspense>
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
