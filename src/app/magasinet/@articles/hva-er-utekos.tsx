import { HeroArticleIntroduction } from '../hva-er-utekos/HeroArticleIntroduction'
import { ProductFamilySection } from '../hva-er-utekos/ProductFamilySection'
import { CoreConceptSection } from '../hva-er-utekos/CoreConceptSection'
import { BrandPhilosophySection } from '../hva-er-utekos/BrandPhilosophySection'
import { FounderStorySection } from '../hva-er-utekos/FounderStorySection'
import { ProductAnatomySection } from '../hva-er-utekos/ProductAnatomySection'
export function HvaErUtekosArticle() {
  return (
    <main className='md:max-w-4xl mx-auto'>
      <HeroArticleIntroduction />
      <FounderStorySection />
      <ProductAnatomySection />
      <CoreConceptSection />
      <ProductFamilySection />
      <BrandPhilosophySection />
    </main>
  )
}
