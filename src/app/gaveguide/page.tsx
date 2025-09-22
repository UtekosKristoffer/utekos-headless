import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckIcon } from '@heroicons/react/24/outline'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PersonaGrid } from './GaveGuideClient'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Gaveguide: Finn den perfekte gaven til dine nærmeste | Utekos',
  description:
    'Gi bort mer enn en gave – gi bort varme, komfort og utallige koselige øyeblikk. Vår gaveguide hjelper deg å finne den perfekte gaven til den som har alt.',
  keywords: [
    'gave til far',
    'gave til mor',
    'julegave',
    'gavetips hytteeier',
    'gave til bobilentusiast',
    'gave til den som har alt'
  ],
  alternates: {
    canonical: '/gaveguide'
  },
  openGraph: {
    title: 'Utekos Gaveguide',
    description: 'En gave de garantert kommer til å elske og bruke. Hele året.',
    url: '/gaveguide',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-gaveguide.webp',
        width: 1200,
        height: 630,
        alt: 'En person som glad pakker opp en Utekos-gave.'
      }
    ],
    locale: 'no_NO',
    type: 'website'
  }
}

export default function GaveguidePage() {
  return (
    <div className='bg-background'>
      {/* Hero Section */}
      <section className='py-24 text-center bg-sidebar-foreground border-b border-neutral-800'>
        <div className='container mx-auto px-4'>
          <p className='font-semibold text-primary mb-2'>Gaveguiden</p>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
            Gaven som varmer. Lenge.
          </h1>
          <p className='mt-6 text-xl text-muted-foreground max-w-2xl mx-auto'>
            Gi bort mer enn bare en ting – gi bort komfort, kvalitetstid og
            utallige #utekosøyeblikk. Perfekt for den som har alt, men som
            fortjener det aller beste.
          </p>
          <div className='mt-8'>
            <Button asChild size='lg'>
              <Link href='/produkter'>Se alle produkter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content: Persona Grid */}
      <section className='py-24'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Finn gaven som passer perfekt
            </h2>
            <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
              Vi har gjort det enkelt for deg. Velg livsstilen som passer best
              til den du vil glede.
            </p>
          </div>
          <PersonaGrid />
        </div>
      </section>

      {/* Social Proof / Testimonial */}
      <section className='py-24 bg-sidebar-foreground'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto text-center'>
            <Card className='border-neutral-800 bg-background'>
              <CardContent className='p-12'>
                <blockquote className='text-xl italic text-foreground/90 mb-6'>
                  &quot;Fikk Utekos i 50-årsgave av barna. Helt ærlig den beste
                  gaven jeg har fått på årevis. Den brukes hver eneste helg på
                  hytta, uansett vær. Anbefales!&quot;
                </blockquote>
                <div className='flex items-center justify-center gap-4'>
                  <div className='h-12 w-12 rounded-full bg-sidebar-foreground' />
                  <div className='text-left'>
                    <p className='font-semibold'>Bjørg H.</p>
                    <p className='text-sm text-muted-foreground'>
                      Fornøyd gavemottaker
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust/Guarantee Section - OPPDATERT MED FARGER */}
      <section className='py-24'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                En garantert suksess
              </h2>
              <p className='mt-4 text-lg text-muted-foreground'>
                Vi gjør gaveshoppingen trygg og enkel for deg.
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
              <div className='flex flex-col items-center'>
                <CheckIcon className='h-8 w-8 text-cyan-400 mb-4' />
                <h3 className='font-semibold mb-2'>60 dagers bytterett</h3>
                <p className='text-sm text-muted-foreground'>
                  Bytt farge eller størrelse uten stress. Vi hjelper deg gjerne.
                </p>
              </div>
              <div className='flex flex-col items-center'>
                <CheckIcon className='h-8 w-8 text-emerald-400 mb-4' />
                <h3 className='font-semibold mb-2'>Rask levering</h3>
                <p className='text-sm text-muted-foreground'>
                  Vi sender raskt fra vårt lager i Norge, slik at gaven kommer
                  frem i tide.
                </p>
              </div>
              <div className='flex flex-col items-center'>
                <CheckIcon className='h-8 w-8 text-amber-400 mb-4' />
                <h3 className='font-semibold mb-2'>Norsk design og kvalitet</h3>
                <p className='text-sm text-muted-foreground'>
                  En gave som er designet i Norge for norske forhold, og som er
                  laget for å vare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
