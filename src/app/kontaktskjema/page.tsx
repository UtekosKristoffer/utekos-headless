// Path: src/app/kontaktskjema/page.tsx
/**
 * @fileoverview Kontaktside med Vercel-inspirert grid-system og mobiltilpasning
 * @module kontaktskjema
 */

import { SupportForm } from '@/components/form/SupportForm'
import { Toaster } from '@/components/ui/sonner'
import { Flag, HelpCircle, Leaf, Package } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt oss',
  description:
    'Kontakt Utekos for hjelp med bestillinger, produktspørsmål eller generelle henvendelser.'
}

export default function SupportPage() {
  return (
    <>
      <main className='container mx-auto my-32 max-w-[76rem] px-4'>
        <div>
          {/* Øvre grid-seksjon - skjult på mobil */}
          <div className='hidden h-24 border-l border-r border-t border-white/[0.08] lg:block'>
            <div className='grid h-full grid-cols-12'>
              {Array.from({ length: 11 }).map((_, i) => (
                <div
                  key={`top-${i}`}
                  className='h-full border-r border-white/[0.08]'
                />
              ))}
              <div className='h-full' />
            </div>
          </div>

          {/* Hovedcontainer */}
          <div className='relative border border-white/10 bg-background'>
            {/* Plus-ikon øverst venstre */}
            <div
              className='pointer-events-none absolute left-0 top-0 z-10'
              style={{ transform: 'translate(-50%, -50%)' }}
              aria-hidden='true'
            >
              <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
                <line
                  x1='16'
                  y1='0'
                  x2='16'
                  y2='32'
                  stroke='rgb(255 255 255 / 0.2)'
                  strokeWidth='1'
                />
                <line
                  x1='0'
                  y1='16'
                  x2='32'
                  y2='16'
                  stroke='rgb(255 255 255 / 0.2)'
                  strokeWidth='1'
                />
              </svg>
            </div>

            {/* Plus-ikon nederst høyre */}
            <div
              className='pointer-events-none absolute bottom-0 right-0 z-10'
              style={{ transform: 'translate(50%, 50%)' }}
              aria-hidden='true'
            >
              <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
                <line
                  x1='16'
                  y1='0'
                  x2='16'
                  y2='32'
                  stroke='rgb(255 255 255 / 0.2)'
                  strokeWidth='1'
                />
                <line
                  x1='0'
                  y1='16'
                  x2='32'
                  y2='16'
                  stroke='rgb(255 255 255 / 0.2)'
                  strokeWidth='1'
                />
              </svg>
            </div>

            {/* Desktop layout */}
            <div className='hidden lg:grid lg:grid-cols-2'>
              {/* Venstre kolonne - Informasjon */}
              <div className='flex flex-col'>
                <div className='flex-grow p-8 lg:p-12'>
                  <h1 className='text-4xl font-bold tracking-tight'>
                    Snakk med Utekos
                  </h1>
                  <p className='mt-4 text-xl text-muted-foreground'>
                    Vi er her for å hjelpe deg med alt du måtte lure på.
                  </p>

                  <ul className='mt-8 space-y-8'>
                    <li className='flex items-start gap-4'>
                      <HelpCircle className='h-6 w-6 flex-shrink-0 text-white' />
                      <div>
                        <h3 className='font-semibold'>
                          Få personlig veiledning
                        </h3>
                        <p className='text-base text-muted-foreground'>
                          Usikker på hvilket produkt som passer ditt bruk? Vi
                          hjelper deg å velge riktig.
                        </p>
                      </div>
                    </li>
                    <li className='flex items-start gap-4'>
                      <Package className='h-6 w-6 flex-shrink-0 text-white' />
                      <div>
                        <h3 className='font-semibold'>
                          Hjelp med din bestilling
                        </h3>
                        <p className='text-base text-muted-foreground'>
                          Spørsmål om en ordre, retur eller reklamasjon? Oppgi
                          gjerne ordrenummer.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Statistikk-seksjon */}
                <div className='border-y border-white/10'>
                  <div className='grid grid-cols-2'>
                    <div className='border-r border-white/10 p-8 lg:py-12 lg:px-8'>
                      <h4 className='flex items-center gap-2 font-semibold'>
                        <Leaf className='h-5 w-5' />
                        En investering i komfort
                      </h4>
                      <p className='mt-2 text-base text-muted-foreground'>
                        Mer enn bare et plagg; det er et verktøy designet for å
                        gi deg utallige timer med varme og velvære.
                      </p>
                    </div>
                    <div className='py-8 lg:py-12 lg:px-8'>
                      <h4 className='flex items-center gap-2 font-semibold'>
                        <span>🇳🇴</span> Skapt for norske forhold
                      </h4>
                      <p className='mt-2 text-base text-muted-foreground'>
                        Våre produkter er utviklet for å forlenge de gode
                        stundene utendørs, enten det er på en kjølig sommerkveld
                        på hytten eller en frisk høstdag i båten.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sitat-seksjon */}
                <div className='p-8 lg:p-12'>
                  <blockquote className='text-lg italic text-muted-foreground'>
                    &ldquo;Vårt løfte til deg er enkelt: å levere komfortplagg
                    av ypperste kvalitet som lar deg forlenge de gode stundene
                    utendørs, uansett vær.&rdquo;
                  </blockquote>
                  <p className='mt-4 font-semibold'>- Utekos</p>
                </div>
              </div>

              {/* Høyre kolonne - Skjema */}
              <div className='border-l border-white/10 bg-[oklch(14.5%_0_0)] p-8 lg:p-12'>
                <SupportForm />
              </div>
            </div>

            {/* Mobil layout */}
            <div className='lg:hidden'>
              {/* 1. Snakk med Utekos */}
              <div className='p-6'>
                <h1 className='text-3xl font-bold tracking-tight'>
                  Snakk med Utekos
                </h1>
                <p className='mt-3 text-base text-muted-foreground'>
                  Vi er her for å hjelpe deg med alt du måtte lure på.
                </p>

                <ul className='mt-6 space-y-6'>
                  <li className='flex items-start gap-3'>
                    <HelpCircle className='h-5 w-5 flex-shrink-0 text-primary' />
                    <div>
                      <h3 className='text-sm font-semibold'>
                        Få personlig veiledning
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        Usikker på hvilket produkt som passer ditt bruk? Vi
                        hjelper deg å velge riktig.
                      </p>
                    </div>
                  </li>
                  <li className='flex items-start gap-3'>
                    <Package className='h-5 w-5 flex-shrink-0 text-primary' />
                    <div>
                      <h3 className='text-sm font-semibold'>
                        Hjelp med din bestilling
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        Spørsmål om en ordre, retur eller reklamasjon? Oppgi
                        gjerne ordrenummer.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* 2. Kontaktskjema */}
              <div className='border-t border-white/10 bg-[oklch(14.5%_0_0)] p-6'>
                <SupportForm />
              </div>

              {/* 3. Bærekraft + Norsk Design (horisontalt på mobil) */}
              <div className='border-t border-white/10'>
                <div className='grid grid-cols-2'>
                  <div className='border-r border-white/10 p-6'>
                    <h4 className='flex items-center gap-1.5 text-sm font-semibold'>
                      <Flag className='h-4 w-4' />
                      100% Norsk Design
                    </h4>
                    <p className='mt-1.5 text-xs text-muted-foreground'>
                      Alle produkter er designet i Norge, for norske forhold.
                    </p>
                  </div>
                  <div className='p-6'>
                    <h4 className='flex items-center gap-1.5 text-sm font-semibold'>
                      <Leaf className='h-4 w-4' />
                      Bærekraft i Fokus
                    </h4>
                    <p className='mt-1.5 text-xs text-muted-foreground'>
                      Vi velger materialer som deler vårt engasjement for en
                      bærekraftig fremtid.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Sitat */}
              <div className='border-t border-white/10 p-6'>
                <blockquote className='text-sm italic text-muted-foreground'>
                  &ldquo;Vårt løfte til deg er enkelt: å levere friluftsklær av
                  ypperste kvalitet som forbedrer din naturopplevelse, uansett
                  vær.&rdquo;
                </blockquote>
                <p className='mt-3 text-sm font-semibold'>- Utekos Teamet</p>
              </div>
            </div>
          </div>

          {/* Nedre grid-seksjon - responsive antall kolonner */}
          <div className='h-24 border-b border-l border-r border-white/[0.08]'>
            {/* Mobil: 8 kolonner */}
            <div className='grid h-full grid-cols-8 md:hidden'>
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={`bottom-mobile-${i}`}
                  className='h-full border-r border-white/[0.08]'
                />
              ))}
              <div className='h-full' />
            </div>

            {/* Tablet: 10 kolonner */}
            <div className='hidden h-full grid-cols-10 md:grid lg:hidden'>
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={`bottom-tablet-${i}`}
                  className='h-full border-r border-white/[0.08]'
                />
              ))}
              <div className='h-full' />
            </div>

            {/* Desktop: 12 kolonner */}
            <div className='hidden h-full grid-cols-12 lg:grid'>
              {Array.from({ length: 11 }).map((_, i) => (
                <div
                  key={`bottom-desktop-${i}`}
                  className='h-full border-r border-white/[0.08]'
                />
              ))}
              <div className='h-full' />
            </div>
          </div>
        </div>
      </main>
      <Toaster richColors />
    </>
  )
}
