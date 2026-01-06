// Path: src/app/skreddersy-varmen/utekos-orginal/page.tsx
import type { Metadata } from 'next'
import { HeroSection } from './HeroSection'
import { EmpathySection } from './EmpatySection'
import { ProductShowcase } from './ProductShowcase'
import { ThreeInOneDemo } from './ThreeInOneDemo'
import { SizeGuideTable } from './SizeGuideTable'
import { PurchaseSection } from './PurchaseSection'
import { ProductDetailsAccordion } from './ProductDetailsAccordion'
export const metadata: Metadata = {
  title: 'Skreddersy varmen | Utekos®',
  description:
    'Skreddersy varmen med Utekos®. Oppdag genial funksjonalitet og kompromissløs komfort - for alle dine utendørsopplevelser. Juster, form og nyt.',
  openGraph: {
    title: 'Utekos® - Skreddersy varmen',
    description:
      'Skreddersy varmen med Utekos®. Oppdag genial funksjonalitet og kompromissløs komfort - for alle dine utendørsopplevelser. Juster, form og nyt.',
    url: 'https://utekos.no/skreddersy-varmen/utekos-orginal',
    siteName: 'Utekos',
    locale: 'nb_NO',
    type: 'website',
    images: [
      {
        url: 'https://utekos.no/1080/aspect-video-kokong-2.png',
        width: 1200,
        height: 630,
        alt: 'Personer som nyter utelivet med varme klær fra Utekos'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skreddersy varmen |',
    description:
      'Skreddersy varmen med Utekos. Oppdag genial funksjonalitet og kompromissløs komfort for dine utendørsopplevelser. Juster, form og nyt.',
    images: ['/linn-kate-kikkert.png']
  }
}

export default function UtekosOriginalLandingPage() {
  return (
    <section className='flex min-h-screen flex-col items-center justify-start bg-[#1F2421]'>
      <HeroSection />
      <EmpathySection />
      <ProductShowcase />
      <ThreeInOneDemo />
      <SizeGuideTable />
      <PurchaseSection />
      <ProductDetailsAccordion />
    </section>
  )
}
