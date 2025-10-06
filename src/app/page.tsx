// Path: src/app/page.tsx
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
        <SpecialOfferSection />
        <section className='container md:max-w-7xl max-w-[95%] mx-auto py-12 lg:py-16 sm:py-16'>
          <ProductCarousel />
        </section>
        <SocialProofSection />
        <NewStandardSection />
        <TestimonialConstellation />
        <PromiseSection />
        <MomentsSection />
        <QualitySection />
      </HydrationBoundary>
    </main>
  )
}

export default HomePage
