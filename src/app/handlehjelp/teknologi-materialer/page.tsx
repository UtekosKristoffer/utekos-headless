// Path: src/app/handlehjelp/teknologi-materialer/page.tsx

import type { Metadata } from 'next'
import { ProductSpecsView } from './layout/ProductSpecsView'
import { technologyGroups } from './config'
import { ProductSpecPageHeader } from './layout/ProductSpecPageHeader'
import { Activity } from 'react'
import { Coffee, Move, Maximize2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Vår Teknologi | Kvaliteten og komforten bak Utekos',
  description:
    'Oppdag materialene og teknologien som gjør Utekos-plaggene unikt varme, lette og slitesterke. Kvalitet i hver fiber for å forlenge de gode stundene utendørs.',
  alternates: {
    canonical: '/handlehjelp/teknologi-materialer'
  },
  openGraph: {
    title: 'Vår Teknologi | Kvaliteten og komforten bak Utekos',
    description: 'Lær om de unike materialene som sikrer din komfort.',
    url: '/handlehjelp/teknologi-materialer',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-teknologi.jpg',
        width: 1200,
        height: 630,
        alt: 'Nærbilde av materialene brukt i Utekos-produkter.'
      }
    ],
    locale: 'no_NO',
    type: 'article'
  }
}

export default function ProductSpecsPage() {
  return (
    <>
      <section className='container mx-auto px-4 py-12 sm:py-16'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
            Ett plagg. <br className='hidden sm:block' />
            <span className='bg-gradient-to-r from-sky-800 via-cyan-700 to-sky-800 bg-clip-text text-transparent'>
              Tre opplevelser.
            </span>
          </h1>
          <p className='mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-article-white md:text-xl'>
            Det unike med Utekos er friheten til å velge. Ved hjelp av smarte
            snorstrammere kan du lynraskt endre plagget fra en varmende kokong
            til en elegant parkas. Vi kaller det{' '}
            <strong>3-i-1 funksjonalitet</strong>.
          </p>
        </div>

        {/* --- DE 3 MODUSENE (GRID) --- */}
        <section className='container mx-auto mt-20 px-4'>
          <div className='grid gap-8 md:grid-cols-3'>
            {/* MODUS 1: FULLENGDE */}
            <div className='group relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 p-8 transition-all hover:border-sky-200 hover:shadow-lg dark:border-white/10 dark:bg-white/5'>
              <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'>
                <Maximize2 className='h-6 w-6' />
              </div>
              <h3 className='mb-3 text-xl font-bold'>1. Fullengdemodus</h3>
              <p className='mb-4 text-sm font-medium text-sky-700 dark:text-sky-400'>
                For maksimal varme og ro
              </p>
              <p className='text-article-white'>
                Dette er utgangspunktet for selve utekosen. Her henger plagget i
                sin fulle lengde og fungerer som en isolerende kokong. Perfekt
                når du sitter i solveggen, ligger i hengekøyen eller nyter lange
                kvelder på terrassen. Her er fokuset total avslapning og
                maksimal varmebevaring.
              </p>
            </div>

            {/* MODUS 2: OPPJUSTERT */}
            <div className='group relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 p-8 transition-all hover:border-sky-200 hover:shadow-lg dark:border-white/10 dark:bg-white/5'>
              <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'>
                <Coffee className='h-6 w-6' />
              </div>
              <h3 className='mb-3 text-xl font-bold'>2. Oppjustert modus</h3>
              <p className='mb-4 text-sm font-medium text-orange-700 dark:text-orange-400'>
                For raske ærend og innendørs bruk
              </p>
              <p className='text-article-white'>
                Skal du en rask tur på kjøkkenet, hente mer kaffe eller et ærend
                på toalettet? Ved å stramme snoren i livet kan du raskt heise
                opp lengden. Dette gir deg umiddelbar mobilitet uten at plagget
                subber i bakken. Du beveger deg trygt og snublegirtt, uten å
                måtte ta av deg varmen.
              </p>
            </div>

            {/* MODUS 3: PARKAS */}
            <div className='group relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 p-8 transition-all hover:border-sky-200 hover:shadow-lg dark:border-white/10 dark:bg-white/5'>
              <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'>
                <Move className='h-6 w-6' />
              </div>
              <h3 className='mb-3 text-xl font-bold'>3. Parkasmodus</h3>
              <p className='mb-4 text-sm font-medium text-green-700 dark:text-green-400'>
                For turer og aktiv eleganse
              </p>
              <p className='text-article-white'>
                Skal du bevege deg over lengre avstander, gå tur med hunden
                eller slå av en prat med naboen? Ved å brette nedre del av
                plagget innunder seg og stramme til i livet, forvandles Utekos
                til en stilig parkas. Dette sikrer full bevegelsesfrihet og et
                elegant utseende, samtidig som du beholder den gode varmen.
              </p>
            </div>
          </div>
        </section>
        <Activity>
          <ProductSpecPageHeader />
        </Activity>
        <Activity>
          <ProductSpecsView technologyGroups={technologyGroups} />
        </Activity>
      </section>
    </>
  )
}
