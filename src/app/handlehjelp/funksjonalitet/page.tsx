// Path: src/app/handlehjelp/funksjonalitet/page.tsx
import type { Metadata } from 'next'
import { connection } from 'next/server'
import { FunctionalityPageHero } from './components/FunctionalityPageHero'
import { FunctionalityPageThreeModesSection } from './components/FunctionalityPageThreeModesSection'
import { FunctionalityPageVideoSection } from './components/FunctionalityPageVideoSection'

export const metadata: Metadata = {
  title: 'Slik fungerer Utekos | 3-i-1 Funksjonalitet',
  description:
    'Lær hvordan du tilpasser din Utekos. Én modell, tre bruksområder: Fullengde for varme, Parkas for tur, og Oppjustert for rask mobilitet.'
}

export default async function FunctionalityPage() {
  await connection()

  return (
    <article className='bg-background py-20'>
      <FunctionalityPageHero />
      <FunctionalityPageThreeModesSection />
      <FunctionalityPageVideoSection />

      <section className='mt-24 text-center'>
        <p className='text-lg text-muted-foreground'>Gjelder modellene TechDown, Dun og Mikrofiber.</p>
      </section>
    </article>
  )
}
