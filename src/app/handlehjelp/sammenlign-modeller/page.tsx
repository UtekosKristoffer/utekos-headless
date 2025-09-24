import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ComparisonTable, PersonaCards } from './CompareClient'
// NYTT: Importerer ikoner for den oppdaterte seksjonen
import { ThermometerSun, WashingMachine } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sammenlign Utekos™ Modeller | Finn den perfekte for deg',
  description:
    'Utekos Dun™ vs. Utekos Mikrofiber™. Se vår detaljerte guide for å finne ut hvilken modell som er best egnet for ditt bruk – enten det er på hytten, i båten eller med bobilen.',
  keywords: [
    'utekos dun vs mikrofiber',
    'sammenlign utekos',
    'hvilken utekos er best',
    'forskjell utekos modeller'
  ],
  alternates: {
    canonical: '/handlehjelp/sammenlign-modeller'
  },
  openGraph: {
    title: 'Hvilken Utekos er riktig for deg?',
    description: 'En komplett sammenligning som hjelper deg å velge riktig.',
    url: '/handlehjelp/sammenlign-modeller',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-compare.webp',
        width: 1200,
        height: 630,
        alt: 'To Utekos-plagg side om side.'
      }
    ]
  }
}

export default function CompareModelsPage() {
  return (
    <div className='bg-background'>
      {/* Hero Section */}
      <section className='py-24 text-center bg-sidebar-foreground border-b border-neutral-800'>
        <div className='container mx-auto px-4'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
            Hvilken Utekos er du?
          </h1>
          <p className='mt-6 text-xl text-muted-foreground max-w-3xl mx-auto'>
            Begge våre modeller er skapt for kompromissløs komfort, men de har
            unike styrker. Denne guiden hjelper deg å finne den som er perfekt
            for akkurat dine øyeblikk.
          </p>
        </div>
      </section>

      {/* "Hvilken type er du?" */}
      <section className='py-24'>
        <div className='container mx-auto px-4'>
          <PersonaCards />
        </div>
      </section>

      {/* Detaljert sammenligning */}
      <section className='py-24 bg-sidebar-foreground'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Detaljert sammenligning
            </h2>
            <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
              Her har vi brutt ned forskjellene, slik at du kan ta det beste
              valget.
            </p>
          </div>
          <ComparisonTable />
        </div>
      </section>

      {/* Dypdykk-seksjon - OPPDATERT MED IKONER OG FARGER */}
      <section className='py-24'>
        <div className='container mx-auto px-4 max-w-4xl'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Hva betyr dette i praksis?
            </h2>
          </div>
          <div className='space-y-8'>
            {/* Kort 1: Varme i all slags vær */}
            <Card className='relative overflow-hidden border-neutral-800 bg-sidebar-foreground'>
              {/* Farget aksentstripe */}
              <div className='absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 to-cyan-400' />
              <CardContent className='p-8'>
                <div className='flex items-center gap-4 mb-4'>
                  <ThermometerSun className='h-8 w-8 text-cyan-400' />
                  <h3 className='text-xl font-semibold'>
                    Varme i all slags vær: Den største forskjellen
                  </h3>
                </div>
                <p className='mt-2 text-muted-foreground'>
                  Den klare fordelen med **Utekos Mikrofiber™** er at den
                  syntetiske isolasjonen beholder varmen selv om den blir
                  fuktig. Dette gjør den til et tryggere og mer pålitelig valg
                  for bruk i båt, nær kysten, og i det uforutsigbare norske
                  været. **Utekos Dun™** gir marginalt mer varme i tørr, kald
                  luft, men er mer sårbar for fukt.
                </p>
              </CardContent>
            </Card>
            {/* Kort 2: Vask og vedlikehold */}
            <Card className='relative overflow-hidden border-neutral-800 bg-sidebar-foreground'>
              {/* Farget aksentstripe */}
              <div className='absolute top-0 left-0 w-full h-2 bg-emerald-400' />
              <CardContent className='p-8'>
                <div className='flex items-center gap-4 mb-4'>
                  <WashingMachine className='h-8 w-8 text-emerald-400' />
                  <h3 className='text-xl font-semibold'>
                    Vask og vedlikehold: Enklere hverdag
                  </h3>
                </div>
                <p className='mt-2 text-muted-foreground'>
                  **Utekos Mikrofiber™** kan enkelt vaskes i maskin og tørker
                  raskt, klar for nye eventyr. Den er en robust arbeidshest som
                  tåler mer røff bruk. **Utekos Dun™** krever en mer skånsom
                  vaskeprosess for å bevare dunets spenst og varmeevne over tid.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Konklusjon / CTA */}
      <section className='py-24 bg-sidebar-foreground'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Fortsatt usikker?
          </h2>
          <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
            Vår anbefaling: For maksimal allsidighet og bekymringsfri bruk i all
            slags vær, velg Mikrofiber. For den ultimate luksusfølelsen på
            kalde, tørre dager, velg Dun.
          </p>
          <div className='mt-8 flex flex-wrap gap-4 justify-center'>
            <Button asChild size='lg'>
              <Link href='/produkter'>Se hele kolleksjonen</Link>
            </Button>
            <Button asChild size='lg' variant='outline'>
              <Link href='/kontaktskjema'>Kontakt oss for råd</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
