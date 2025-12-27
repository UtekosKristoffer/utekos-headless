// Path: src/app/handlehjelp/teknologi-materialer/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import {
  Coffee,
  Move,
  Maximize2,
  ShoppingBag,
  BookOpen,
  ArrowRight
} from 'lucide-react'
import { ProductSpecsView } from './layout/ProductSpecsView'
import { technologyGroups } from './config'
import { TechHero } from './layout/TechHero'
import { ProductSpecPageHeader } from './layout/ProductSpecPageHeader'

export const metadata: Metadata = {
  title: 'Teknologi & Materialer | Utekos® - Varme, Kvalitet og Innovasjon',
  description:
    'Utforsk teknologien bak Utekos®: Fra hydrofobisk TechDown™ og vanntett HydroGuard™ (8000mm) til vårt unike 3-i-1 system. Skreddersydd for nordiske forhold.',
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
      'Lær om de unike materialene som gjør Utekos® til det ultimate valget for nordisk vær. Se hvordan TechDown™ og HydroGuard™ fungerer.',
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
    title: 'Teknologi & Materialer | Utekos®',
    description:
      'Oppdag teknologien som holder deg varm. TechDown™, HydroGuard™ og mer.',
    images: ['https://utekos.no/og-kate-linn-kikkert-master.png'] // Samme bilde som OG
  }
}

export default function ProductSpecsPage() {
  return (
    <main className='bg-neutral-950 text-white'>
      {/* 1. HERO SEKSJON */}
      <TechHero />

      {/* 2. DE 3 MODUSENE (GRID) - Oppgradert design */}
      <section className='container mx-auto -mt-20 px-4 pb-24 relative z-20'>
        <div className='grid gap-6 md:grid-cols-3'>
          {/* MODUS 1 */}
          <div className='group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/80 p-8 backdrop-blur-xl transition-all duration-500 hover:border-sky-500/30 hover:bg-neutral-900 hover:shadow-2xl hover:shadow-sky-900/20'>
            <div className='absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

            <div className='relative z-10'>
              <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-950/50 text-sky-400 ring-1 ring-white/10 transition-colors group-hover:bg-sky-500 group-hover:text-white'>
                <Maximize2 className='h-6 w-6' />
              </div>
              <h3 className='mb-2 text-xl font-bold text-white'>
                1. Fullengdemodus
              </h3>
              <p className='mb-4 text-xs font-bold uppercase tracking-wider text-sky-500'>
                Maksimal isolasjon
              </p>
              <p className='text-neutral-400 leading-relaxed text-sm'>
                Utgangspunktet for selve utekosen. Plagget henger i full lengde
                som en isolerende kokong. Perfekt for solveggen, hengekøyen
                eller lange kvelder på terrassen.
              </p>
            </div>
          </div>

          {/* MODUS 2 */}
          <div className='group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/80 p-8 backdrop-blur-xl transition-all duration-500 hover:border-orange-500/30 hover:bg-neutral-900 hover:shadow-2xl hover:shadow-orange-900/20'>
            <div className='absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

            <div className='relative z-10'>
              <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-950/50 text-orange-400 ring-1 ring-white/10 transition-colors group-hover:bg-orange-500 group-hover:text-white'>
                <Coffee className='h-6 w-6' />
              </div>
              <h3 className='mb-2 text-xl font-bold text-white'>
                2. Oppjustert modus
              </h3>
              <p className='mb-4 text-xs font-bold uppercase tracking-wider text-orange-500'>
                Umiddelbar mobilitet
              </p>
              <p className='text-neutral-400 leading-relaxed text-sm'>
                Nyter du total omfavnelse av Utekos, men må plutselig en rask
                tur på kjøkkenet eller svare på telefonen som ringer fra andre
                siden av huset? Heis opp plagget til ønsket lengde, stram med
                den utvendige snoren i livet og vær mobil på få sekunder. Beveg
                deg uten snublefare og subbefritt - uten å miste varmen.
              </p>
            </div>
          </div>

          {/* MODUS 3 */}
          <div className='group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/80 p-8 backdrop-blur-xl transition-all duration-500 hover:border-green-500/30 hover:bg-neutral-900 hover:shadow-2xl hover:shadow-green-900/20'>
            <div className='absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

            <div className='relative z-10'>
              <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-950/50 text-green-400 ring-1 ring-white/10 transition-colors group-hover:bg-green-600 group-hover:text-white'>
                <Move className='h-6 w-6' />
              </div>
              <h3 className='mb-2 text-xl font-bold text-white'>
                3. Parkasmodus
              </h3>
              <p className='mb-4 text-xs font-bold uppercase tracking-wider text-green-500'>
                Aktiv utendørs
              </p>
              <p className='text-neutral-400 leading-relaxed text-sm'>
                For turer og lengre avstander. Brett nedre del innunder seg og
                stram til for å forvandle Utekos til en stilig parkas. Full
                bevegelsesfrihet med et elegant snitt.
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
      <section className='mt-32 border-t border-white/5 bg-neutral-900/30 py-24'>
        <div className='container mx-auto px-4'>
          <div className='grid gap-8 md:grid-cols-2'>
            {/* PRODUKTER */}
            <Link
              href='/produkter'
              className='group relative flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-neutral-900 p-12 text-center transition-all duration-500 hover:border-sky-500/50 hover:bg-black hover:shadow-2xl'
            >
              <div className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800 text-white transition-all group-hover:scale-110 group-hover:bg-sky-600'>
                <ShoppingBag className='h-8 w-8' />
              </div>
              <h3 className='mb-2 text-2xl font-bold text-white'>
                Utforsk kolleksjonen
              </h3>
              <p className='mb-8 max-w-sm text-neutral-400'>
                Klar for å oppleve Utekos®? Se vårt utvalg.
              </p>
              <span className='inline-flex items-center text-sm font-bold text-sky-400 transition-colors group-hover:text-white'>
                Gå til butikken
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </span>
            </Link>

            {/* MAGASINET */}
            <Link
              href='/magasinet'
              className='group relative flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-neutral-900 p-12 text-center transition-all duration-500 hover:border-orange-500/50 hover:bg-black hover:shadow-2xl'
            >
              <div className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800 text-white transition-all group-hover:scale-110 group-hover:bg-orange-600'>
                <BookOpen className='h-8 w-8' />
              </div>
              <h3 className='mb-2 text-2xl font-bold text-white'>
                Inspirasjon og historier
              </h3>
              <p className='mb-8 max-w-sm text-neutral-400'>
                Les mer om tips og historier i vårt magasin.
              </p>
              <span className='inline-flex items-center text-sm font-bold text-orange-400 transition-colors group-hover:text-white'>
                Les magasinet
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
