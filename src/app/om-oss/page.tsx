// Path: src/app/om-oss/page.tsx
import { AboutCarousel } from '@/components/about/AboutCarousel'
import type { Metadata } from 'next'
import { GrunderSection } from './components/GrunderSection'
import { FindUsSection } from './components/FindUsSection'
import { PromiseSection } from './components/PromiseSection'
import { CTASection } from './components/CTASection'
import { PhilosophiesSection } from './components/PhilosophiesSection'
import { AboutUsHeroSection } from './components/AboutUsHeroSection'
import { IntersportSection } from './components/IntersportSection'
export const metadata: Metadata = {
  title: 'Om Utekos® | Vår historie og løfte til deg',
  description:
    'Lær om hvorfor Utekos ble skapt – en historie om å verdsette de små øyeblikkene og et løfte om kompromissløs komfort, designet i Norge for norske forhold.',
  alternates: {
    canonical: '/om-oss'
  },
  openGraph: {
    title: 'Om Utekos® | Norsk design, kompromissløs komfort',
    description:
      'Fra en enkel idé om å forlenge kvelden, til en hel kolleksjon av varme komfortplagg. Bli kjent med oss.',
    url: '/om-oss',
    siteName: 'Utekos',
    locale: 'no_NO',
    type: 'website',
    images: [
      {
        url: '/about-use-hero-gemini.png',
        width: 1200,
        height: 630,
        alt: 'Grunnleggerne av Utekos'
      }
    ]
  }
}

export default function AboutPage() {
  return (
    <section>
      <AboutUsHeroSection />
      <GrunderSection />
      <PhilosophiesSection />
      <PromiseSection />
      <AboutCarousel />
      <FindUsSection />
      <IntersportSection />
      <CTASection />
    </section>
  )
}
