import { AboutCarousel } from '@/components/about/AboutCarousel'
import type { Metadata } from 'next'
import { GrunderSection } from './Sections/GrunderSection'
import { FindUsSection } from './Sections/FindUsSection'
import { PromiseSection } from './Sections/PromiseSection'
import { CTASection } from './Sections/CTASection'
import { PhilosophiesSection } from './Sections/PhilosophiesSection'
import { AboutUsHeroSection } from './Sections/AboutUsHeroSection'
export const metadata: Metadata = {
  title: 'Om Utekos | Vår historie og løfte til deg',
  description:
    'Lær om hvorfor Utekos ble skapt – en historie om å verdsette de små øyeblikkene og et løfte om kompromissløs komfort, designet i Norge for norske forhold.'
}

export default function AboutPage() {
  return (
    <main>
      <AboutUsHeroSection />
      <GrunderSection />
      <PhilosophiesSection />
      <PromiseSection />
      <AboutCarousel />
      <FindUsSection />
      <CTASection />
    </main>
  )
}
