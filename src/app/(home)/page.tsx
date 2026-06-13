import { Suspense } from 'react'
import {
  LazyNewProductInStoreNotice,
  LazyNewStandardSection,
  LazyTestimonialConstellation
} from '@/components/frontpage/lazy/LazyHeavyClients'
import { ProductVideoSection } from '@/app/produkter/(oversikt)/components/ProductVideoSection'
import { HeroSection } from '@/components/frontpage/components/HeroSection/HeroSection'
import { MomentsSection } from '@/components/frontpage/MomentSection/MomentsSection'
import { CachedPromiseSection } from '@/components/frontpage/components/CachedPromiseSection'
import { QualitySection } from '@/components/frontpage/QualitySection'
import { SocialProofSection } from '@/components/frontpage/SocialProofSection'
import { ComfyrobeSection } from '@/components/frontpage/components/SpecialOfferSection/ComfyrobeSection'
import { FeaturedProductsSkeleton } from '@/components/skeletons/FeaturedProductsSkeleton'
import { AsyncProductLaunchWrapper } from '@/components/frontpage/AsyncProductLaunchWrapper'
import { FeaturedProductsSection } from '@/components/frontpage/FeaturedProductSection'

const HomePage = () => {
  return (
    <article>
      <HeroSection />

      <Suspense fallback={null}>
        <AsyncProductLaunchWrapper />
      </Suspense>

      <LazyNewProductInStoreNotice />

      <ProductVideoSection />

      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProductsSection />
      </Suspense>

      <SocialProofSection />

      <ComfyrobeSection />
      <LazyNewStandardSection />
      <CachedPromiseSection />
      <MomentsSection />
      <QualitySection />

      <LazyTestimonialConstellation />
    </article>
  )
}

export default HomePage
