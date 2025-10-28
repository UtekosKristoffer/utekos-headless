import { AboutCarousel } from '@/components/about/AboutCarousel'
import type { Metadata } from 'next'
import { GrunderSection } from './Sections/GrunderSection'
import { FindUsSection } from './Sections/FindUsSection'
import { PromiseSection } from './Sections/PromiseSection'
import { CTASection } from './Sections/CTASection'
import { PhilosophiesSection } from './Sections/PhilosophiesSection'
import { AboutUsHeroSection } from './Sections/AboutUsHeroSection'
import { FindInStoreSection } from '@/components/frontpage/FindStoreSection'
import { Activity } from 'react'
export const metadata: Metadata = {
  title: 'Om Utekos | Vår historie og løfte til deg',
  description:
    'Lær om hvorfor Utekos ble skapt – en historie om å verdsette de små øyeblikkene og et løfte om kompromissløs komfort, designet i Norge for norske forhold.'
}

export default function AboutPage() {
  return (
    <main>
      <Activity>
        <AboutUsHeroSection />
      </Activity>
      <Activity>
        <GrunderSection />
      </Activity>
      <Activity>
        <PhilosophiesSection />
      </Activity>
      <Activity>
        <PromiseSection />
      </Activity>
      <Activity>
        <AboutCarousel />
      </Activity>
      <Activity>
        <FindUsSection />
      </Activity>
      <Activity>
        <FindInStoreSection />
      </Activity>
      <Activity>
        <CTASection />
      </Activity>
    </main>
  )
}
