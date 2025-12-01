// Path: src/app/handlehjelp/funksjonalitet/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { connection } from 'next/server'
import { ArrowRight, Maximize2, Move, Coffee, PlayCircle } from 'lucide-react'
export const metadata: Metadata = {
  title: 'Slik fungerer Utekos | 3-i-1 Funksjonalitet',
  description:
    'Lær hvordan du tilpasser din Utekos. Én modell, tre bruksområder: Fullengde for varme, Parkas for tur, og Oppjustert for rask mobilitet.'
}
export default async function FunctionalityPage() {
  await connection()

  return (
    <div className='bg-background pb-20 pt-24 md:pt-32'>
      {/* --- HERO SEKSJON --- */}
      <section className='container mx-auto px-4 text-center'>
        <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
          Ett plagg. <br className='hidden sm:block' />
          <span className='bg-gradient-to-r from-sky-800 via-cyan-700 to-sky-800 bg-clip-text text-transparent'>
            Tre opplevelser.
          </span>
        </h1>
        <p className='mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-article-white md:text-xl'>
          Det unike med Utekos er friheten til å velge. Ved hjelp av smarte
          snorstrammere kan du lynraskt endre plagget fra en varmende kokong til
          en elegant parkas. Vi kaller det <strong>3-i-1 funksjonalitet</strong>
          .
        </p>
      </section>

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
            <p className='text-muted-foreground'>
              Dette er utgangspunktet for selve utekosen. Her henger plagget i
              sin fulle lengde og fungerer som en isolerende kokong. Perfekt når
              du sitter i solveggen, ligger i hengekøyen eller nyter lange
              kvelder på terrassen. Her er fokuset total avslapning og maksimal
              varmebevaring.
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
            <p className='text-muted-foreground'>
              Skal du en rask tur på kjøkkenet, hente mer kaffe eller et ærend
              på toalettet? Ved å stramme snoren i livet kan du raskt heise opp
              lengden. Dette gir deg umiddelbar mobilitet uten at plagget subber
              i bakken. Du beveger deg trygt og snublegirtt, uten å måtte ta av
              deg varmen.
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
            <p className='text-muted-foreground'>
              Skal du bevege deg over lengre avstander, gå tur med hunden eller
              slå av en prat med naboen? Ved å brette nedre del av plagget
              innunder seg og stramme til i livet, forvandles Utekos til en
              stilig parkas. Dette sikrer full bevegelsesfrihet og et elegant
              utseende, samtidig som du beholder den gode varmen.
            </p>
          </div>
        </div>
      </section>

      {/* --- VIDEO SEKSJON --- */}
      <section className='container mx-auto mt-24 px-4'>
        <div className='overflow-hidden rounded-3xl bg-neutral-900 text-white shadow-2xl'>
          <div className='grid lg:grid-cols-2'>
            {/* Tekst-del av video-seksjon */}
            <div className='flex flex-col justify-center p-8 lg:p-16'>
              <div className='mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-md'>
                <PlayCircle className='h-4 w-4' />
                <span>Se demonstrasjon</span>
              </div>
              <h2 className='text-3xl font-bold sm:text-4xl'>
                Slik fungerer det i praksis
              </h2>
              <p className='mt-4 text-neutral-300'>
                Det er enklere enn du tror. Se videoen for å lære hvordan du på
                sekunder tilpasser din Utekos til situasjonen du befinner deg i.
                Fra full avslapning til full mobilitet.
              </p>

              <Link
                href='/produkter/utekos-techdown'
                className='mt-8 inline-flex items-center text-lg font-semibold hover:text-sky-300 hover:underline'
              >
                Utforsk kolleksjonen
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </div>

            {/* Video Player Placeholder */}
            {/* HER: Bytt ut 'bg-neutral-800' med din faktiske video-komponent når du har den */}
            <div className='relative aspect-video w-full bg-neutral-800 lg:h-full lg:aspect-auto'>
              <div className='absolute inset-0 flex items-center justify-center'>
                {/* Tips: Bruk <video> tag her, eller en komponent som mux-player eller next-video.
                  For eksempel:
                  <video 
                    src="/videos/utekos-funksjonalitet.mp4" 
                    controls 
                    className="h-full w-full object-cover"
                    poster="/images/video-poster.jpg"
                  />
                */}
                <div className='text-center text-neutral-500'>
                  <PlayCircle className='mx-auto h-16 w-16 opacity-50' />
                  <p className='mt-2 text-sm'>Video kommer her</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- AVSLUTTENDE CTA --- */}
      <section className='mt-24 text-center'>
        <p className='text-lg text-muted-foreground'>
          Gjelder modellene TechDown, Dun og Mikrofiber.
        </p>
      </section>
    </div>
  )
}
