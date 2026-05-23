import { Suspense, Activity } from 'react'
import {
  LazyNewProductInStoreNotice,
  LazyNewStandardSection,
  LazyTestimonialConstellation
} from '@/components/frontpage/lazy/LazyHeavyClients'
import { ProductVideoSection } from '@/app/produkter/(oversikt)/components/ProductVideoSection'
import { HeroSection } from '@/components/frontpage/components/HeroSection/HeroSection'
import { MomentsSection } from '@/components/frontpage/MomentsSection'
import { CachedPromiseSection } from '@/components/frontpage/components/CachedPromiseSection'
import { QualitySection } from '@/components/frontpage/QualitySection'
import { SocialProofSection } from '@/components/frontpage/SocialProofSection'
import { ComfyrobeSection } from '@/components/frontpage/components/SpecialOfferSection/ComfyrobeSection'
import { FeaturedProductsSkeleton } from '@/components/skeletons/FeaturedProductsSkeleton'
import { AsyncProductLaunchWrapper } from '@/components/frontpage/AsyncProductLaunchWrapper'
import { FeaturedProductsSection } from '@/components/frontpage/FeaturedProductSection'

const HomePage = () => {
  return (
    <section>
      <HeroSection />

      <Activity>
        <Suspense fallback={null}>
          <AsyncProductLaunchWrapper />
        </Suspense>
      </Activity>

      <LazyNewProductInStoreNotice />

      <Activity mode='visible'>
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

      <ComfyrobeSection />
      <LazyNewStandardSection />
      <CachedPromiseSection />
      <MomentsSection />
      <QualitySection />

      <Activity>
        <LazyTestimonialConstellation />
      </Activity>
    </section>
  )
}

export default HomePage
