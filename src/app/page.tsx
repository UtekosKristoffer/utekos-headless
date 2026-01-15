import { Suspense } from 'react'
import { NewProductInStoreNotice } from '@/components/frontpage/NewProductInStoreNotice'
import { ProductVideoSection } from '@/app/produkter/components/ProductVideoSection'
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
import { FrontPageJsonLd } from './FrontPageJsonLd'
import { AsyncProductLaunchWrapper } from '@/components/frontpage/AsyncProductLaunchWrapper'
import { FeaturedProductsSection } from '@/components/frontpage/FeaturedProductSection'

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
