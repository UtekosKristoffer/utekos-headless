import { ComparisonTeaser } from '@/app/handlehjelp/sammenlign-modeller/components/ComparisonTeaser'
import { HelpChooseSection } from './components/HelpChooseSection'
import { ProductsPageFooter } from '@/app/produkter/(oversikt)/components/ProductsPageFooter'
import { ProductsPageHeader } from '@/app/produkter/(oversikt)/components/ProductsPageHeader'
import { ProductCarousel } from '@/components/ProductCard/ProductCarousel'
import { ComfyrobeFeatureSection } from './components/ComfyrobeFeatureSection'
import { ProductGridSkeleton } from '@/components/frontpage/Skeletons/ProductGridSkeleton'
import { VideoSkeleton } from './components/VideoSkeleton'
import { Suspense } from 'react'
import { StapperFeatureSection } from './components/StapperFeatureSection/StapperFeatureSection'
import { ProductVideoSection } from './components/ProductVideoSection'
import { TechDownFeatureSection } from './components/TechDownFeatureSection/TechDownFeatureSection'
import { MikrofiberSection } from './components/MicrofiberSection/MikrofiberSection'

const ProductsPage = async () => {
  return (
    <>
      <article className='container mx-auto px-4 py-16 sm:py-24'>
        <ProductsPageHeader />
        <HelpChooseSection />

        <Suspense fallback={<VideoSkeleton />}>
          <ProductVideoSection />
          <TechDownFeatureSection />
        </Suspense>

        <ComparisonTeaser />

        <section className='mb-24'>
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductCarousel
              trackingEventName='ViewCategory'
              itemListId='produkter-kolleksjon'
              itemListName='Utekos produktkolleksjon'
              contentCategory='Utekos produktkategori'
            />
          </Suspense>
        </section>

        <ComfyrobeFeatureSection />

        <MikrofiberSection />

        <StapperFeatureSection />

        <ProductsPageFooter />
      </article>
    </>
  )
}

export default ProductsPage
