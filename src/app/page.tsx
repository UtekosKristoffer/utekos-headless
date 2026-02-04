import { Suspense } from 'react'
import { NewProductInStoreNotice } from '@/components/frontpage/NewProductInStoreNotice'
import { ProductVideoSection } from '@/app/produkter/(oversikt)/components/ProductVideoSection'
import { HeroSection } from '@/components/frontpage/components/HeroSection/HeroSection'
import { MomentsSection } from '@/components/frontpage/MomentsSection'
import { NewStandardSection } from '@/components/frontpage/NewStandardSection'
import { CachedPromiseSection } from '@/components/frontpage/components/CachedPromiseSection'
import { QualitySection } from '@/components/frontpage/QualitySection'
import { SocialProofSection } from '@/components/frontpage/SocialProofSection'
import { TestimonialConstellation } from '@/components/frontpage/TestimonialConstellation'
import { ComfyrobeSection } from '../components/frontpage/components/SpecialOfferSection/ComfyrobeSection'
import { Activity } from 'react'
import { FeaturedProductsSkeleton } from '@/components/skeletons/FeaturedProductsSkeleton'
import TechTeaserSection from '@/components/frontpage/components/TechTeaserSection'
import { AsyncProductLaunchWrapper } from '@/components/frontpage/AsyncProductLaunchWrapper'
import { FeaturedProductsSection } from '@/components/frontpage/FeaturedProductSection'
import { FrontpageIceBathingSection } from '@/components/frontpage/FrontpageIcebathingSection'

const HomePage = () => {
  return (
    <>
      <section>
        <HeroSection />

        <Activity>
          <Suspense fallback={null}>
            <AsyncProductLaunchWrapper />
          </Suspense>
        </Activity>

        <NewProductInStoreNotice />
        <Activity>
          <ProductVideoSection />
        </Activity>

        <FrontpageIceBathingSection />

        <Activity>
          <Suspense fallback={<FeaturedProductsSkeleton />}>
            <FeaturedProductsSection />
          </Suspense>
        </Activity>
        <Activity>
          <SocialProofSection />
        </Activity>
        <ComfyrobeSection />

        <NewStandardSection />

        <CachedPromiseSection />

        <MomentsSection />

        <QualitySection />

        <TechTeaserSection />

        <Activity>
          <TestimonialConstellation />
        </Activity>
      </section>
    </>
  )
}

export default HomePage
