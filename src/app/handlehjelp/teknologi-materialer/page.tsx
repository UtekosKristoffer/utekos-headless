// Path: src/app/handlehjelp/teknologi-materialer/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Coffee, Move, Maximize2, ShoppingBag, BookOpen } from 'lucide-react'
import { ProductSpecsView } from './components/ProductSpecsView'
import { technologyGroups } from './config'
import { TechHero } from './components/TechHero'
import { ProductSpecPageHeader } from './components/ProductSpecPageHeader'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'

export const metadata: Metadata = {
  title: 'Teknologi og materialer',
  description: 'Utforsk teknologien bak Utekos',
  keywords: [
    'Utekos teknologi',
    'TechDown',
    'HydroGuard',
    'SherpaCore',
    'Vannsøyle 8000mm',
    'Varmeklær teknologi',
    'Teknisk yttertøy',
    '3-i-1 jakke'
  ],
  alternates: {
    canonical: '/handlehjelp/teknologi-materialer'
  },
  openGraph: {
    title: 'Teknologi & Materialer | Vitenskapen bak din komfort',
    description:
      'Lær om de unike materialene som gjør Utekos til det ultimate valget for nordisk vær. Se hvordan TechDown™ og HydroGuard™ fungerer.',
    url: '/handlehjelp/teknologi-materialer',
    siteName: 'Utekos',
    locale: 'no_NO',
    type: 'article',
    images: [
      {
        url: 'https://utekos.no/og-kate-linn-kikkert-master.png', // Sørg for at denne stien stemmer
        width: 1200,
        height: 630,
        alt: 'Nærbilde av Utekos tekniske materialer og lag-på-lag konstruksjon.'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teknologi og materialer',
    description: 'Oppdag teknologien som holder deg varm. TechDown™, HydroGuard™ og mer.',
    images: ['https://utekos.no/og-kate-linn-kikkert-master.png'] // Samme bilde som OG
  }
}

export default function ProductSpecsPage() {
  return (
    <main className='bg-maritime-darkest text-cloud-dancer'>
      {/* 1. HERO SEKSJON */}
      <TechHero />

      {/* 2. DE 3 MODUSENE (GRID) - Oppgradert design */}
      <section className='container mx-auto -mt-20 px-4 pb-24 relative z-20'>
        <div className='grid gap-6 md:grid-cols-3'>
          {/* MODUS 1 */}
          <div className='group relative overflow-hidden rounded-3xl border border-white/10 bg-maritime-blue/80 p-8 backdrop-blur-xl transition-all duration-500 hover:border-ancient-water/30 hover:bg-maritime-blue hover:shadow-2xl hover:shadow-ancient-water/20'>
            <div className='absolute inset-0 bg-gradient-to-br from-ancient-water/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

            <div className='relative z-10'>
              <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ancient-water/10 text-ancient-water ring-1 ring-white/10 transition-colors group-hover:bg-ancient-water group-hover:text-maritime-darkest'>
                <Maximize2 className='h-6 w-6' />
              </div>
              <h3 className='mb-2 text-xl font-google-sans font-bold text-cloud-dancer'>1. Fullengdemodus</h3>
              <p className='mb-4 text-sm font-bold tracking-wider text-ancient-water font-utekos-text'>
                Maksimal isolasjon
              </p>
              <p className='text-cloud-dancer font-utekos-text tracking-tight'>
                Utgangspunktet for selve utekosen. Plagget henger i full lengde som en isolerende kokong.
                Perfekt for solveggen, hengekøyen eller lange kvelder på terrassen.
              </p>
            </div>
          </div>

          {/* MODUS 2 */}
          <div className='group relative overflow-hidden rounded-3xl border border-white/10 bg-maritime-blue/80 p-8 backdrop-blur-xl transition-all duration-500 hover:border-dusted-peri/30 hover:bg-maritime-blue hover:shadow-2xl hover:shadow-dusted-peri/20'>
            <div className='absolute inset-0 bg-gradient-to-br from-dusted-peri/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

            <div className='relative z-10'>
              <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-dusted-peri/10 text-dusted-peri ring-1 ring-white/10 transition-colors group-hover:bg-dusted-peri group-hover:text-maritime-darkest'>
                <Coffee className='h-6 w-6' />
              </div>
              <h3 className='mb-2 text-xl font-google-sans font-bold text-cloud-dancer'>
                2. Oppjustert modus
              </h3>
              <p className='mb-4 text-sm font-bold tracking-wider text-dusted-peri font-utekos-text'>
                Umiddelbar mobilitet
              </p>
              <p className='text-cloud-dancer font-utekos-text tracking-tight'>
                Nyter du total omfavnelse av Utekos, men må plutselig på kjøkkenet eller svare telefonen? Heis
                opp plagget til ønsket lengde, stram snoren i livet og bli mobil på sekunder. Beveg deg trygt
                og subbefritt – uten å miste varmen.
              </p>
            </div>
          </div>

          {/* MODUS 3 */}
          <div className='group relative overflow-hidden rounded-3xl border border-white/10 bg-maritime-blue/80 p-8 backdrop-blur-xl transition-all duration-500 hover:border-cloud-dancer/30 hover:bg-maritime-blue hover:shadow-2xl hover:shadow-cloud-dancer/20'>
            <div className='absolute inset-0 bg-gradient-to-br from-cloud-dancer/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

            <div className='relative z-10'>
              <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cloud-dancer/10 text-cloud-dancer/90 ring-1 ring-white/10 transition-colors group-hover:bg-cloud-dancer group-hover:text-maritime-darkest'>
                <Move className='h-6 w-6' />
              </div>
              <h3 className='mb-2 text-xl font-google-sans font-bold text-cloud-dancer'>3. Parkasmodus</h3>
              <p className='mb-4 text-sm font-bold tracking-wider text-cloud-dancer/90 font-utekos-text'>
                Aktiv utendørs
              </p>
              <p className='text-cloud-dancer font-utekos-text tracking-tight'>
                For turer og lengre avstander. Brett nedre del innunder seg og stram til for å forvandle
                Utekos til en stilig parkas. Full bevegelsesfrihet med et elegant snitt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TEKNISK DYPDYKK */}
      <section className='container mx-auto px-4'>
        <Suspense>
          <ProductSpecPageHeader />
        </Suspense>

        <Suspense>
          <ProductSpecsView technologyGroups={technologyGroups} />
        </Suspense>
      </section>

      {/* 4. NAVIGASJON / CTA */}
      <section className='mt-32 border-t border-white/5 bg-maritime-blue/30 py-24'>
        <div className='container mx-auto px-4'>
          <div className='grid gap-8 md:grid-cols-2'>
            {/* PRODUKTER */}
            <Link
              href='/produkter'
              className='group relative flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-maritime-blue p-12 text-center transition-all duration-500 hover:border-ancient-water/50 hover:bg-maritime-darkest hover:shadow-2xl'
            >
              <div className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-maritime-darkest text-cloud-dancer transition-all group-hover:scale-110 group-hover:bg-ancient-water group-hover:text-maritime-darkest'>
                <ShoppingBag className='h-8 w-8' />
              </div>
              <h3 className='mb-2 text-2xl font-google-sans font-bold text-cloud-dancer'>
                Utforsk kolleksjonen
              </h3>
              <p className='mb-8 max-w-sm font-utekos-text text-cloud-dancer/90 tracking-tight'>
                Klar for å oppleve Utekos®? Se vårt utvalg.
              </p>
              <BrandBadge className='group-hover:bg-cloud-dancer group-hover:text-maritime-darkest'>
                Gå til butikken
              </BrandBadge>
            </Link>

            {/* MAGASINET */}
            <Link
              href='/magasinet'
              className='group relative flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-maritime-blue p-12 text-center transition-all duration-500 hover:border-dusted-peri/50 hover:bg-maritime-darkest hover:shadow-2xl'
            >
              <div className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-maritime-darkest text-cloud-dancer transition-all group-hover:scale-110 group-hover:bg-dusted-peri group-hover:text-maritime-darkest'>
                <BookOpen className='h-8 w-8' />
              </div>
              <h3 className='mb-2 text-2xl font-google-sans font-bold text-cloud-dancer'>
                Inspirasjon og historier
              </h3>
              <p className='mb-8 max-w-sm font-utekos-text text-cloud-dancer/90 tracking-tight'>
                Les mer om tips og historier i vårt magasin.
              </p>
              <BrandBadge className='group-hover:bg-cloud-dancer group-hover:text-maritime-darkest'>
                Les magasinet
              </BrandBadge>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
