// Path: src/app/inspirasjon/båtliv/page.tsx

import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Anchor, Fish, LifeBuoy, Sun } from 'lucide-react'
import type { Metadata } from 'next'
import type { Article, WithContext } from 'schema-dts'
import {
  benefitsData,
  BenefitsGrid,
  BoatingHeroSection,
  CTASection,
  popularDestinationsData,
  PopularDestinationsGrid,
  useCasesData,
  UseCasesGrid
} from './BoatingClientComponents'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Båtliv og Utekos | Forleng sesongen og kveldene på vannet',
  description:
    'Oppdag hvordan Utekos forvandler båtlivet. Fra kjølige morgener i havgapet til sosiale kvelder i gjestehavna – nyt en lengre og mer komfortabel båtsesong.',
  keywords: [
    'båtliv',
    'båtkos',
    'norsk båtsommer',
    'utekos båt',
    'varme i båt',
    'komfort båttur',
    'båtutstyr',
    'seilbåt',
    'bryggekos'
  ],
  alternates: {
    canonical: '/inspirasjon/båtliv'
  },
  openGraph: {
    title: 'Båtliv og Utekos | Forleng den norske båtsommeren',
    description:
      'Ikke la kjølige kvelder og vind forkorte tiden på sjøen. Oppdag hvordan Utekos blir din beste følgesvenn på båtturen.',
    url: '/inspirasjon/båtliv',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-batliv.webp',
        width: 1200,
        height: 630,
        alt: 'Gruppe venner som koser seg i en båt med Utekos-plagg'
      }
    ],
    locale: 'no_NO',
    type: 'article'
  }
}

const jsonLd: WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Båtliv og Utekos: Din guide til ultimat komfort på sjøen',
  'description':
    'En komplett guide til hvordan Utekos-plagg maksimerer komforten om bord, uansett vær. Tips og inspirasjon for den norske båteieren.',
  'author': {
    '@type': 'Organization',
    'name': 'Utekos'
  },
  'publisher': {
    '@type': 'Organization',
    'name': 'Utekos',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://utekos.no/logo.png'
    }
  },
  'datePublished': '2024-04-12',
  'dateModified': '2024-04-12',
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': 'https://utekos.no/inspirasjon/båtliv'
  }
}

export default function BoatingInspirationPage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* Hero Section */}
        <section className='relative min-h-[70vh] flex items-center'>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50' />
          <div className='container relative mx-auto px-4 py-16'>
            <BoatingHeroSection />
          </div>
        </section>

        {/* Use Cases Section */}
        <section id='bruksomrader' className='py-24 bg-sidebar-foreground'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Utekos gjennom båtdøgnet
              </h2>
              <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
                Fra soloppgang i uthavn til sene kvelder ved brygga – Utekos
                holder deg varm.
              </p>
            </div>
            <UseCasesGrid useCases={useCasesData} />
          </div>
        </section>

        {/* Benefits Grid */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Skapt for livet på sjøen
              </h2>
              <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
                Vi vet at været kan snu fort. Derfor er Utekos designet for å gi
                deg øyeblikkelig og pålitelig varme.
              </p>
            </div>
            <BenefitsGrid benefits={benefitsData} />
          </div>
        </section>

        {/* Seasonal Tips */}
        <section className='py-24 bg-sidebar-foreground'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Tips for en lengre sesong
              </h2>
            </div>

            <Tabs defaultValue='summer' className='max-w-4xl mx-auto'>
              <TabsList className='grid w-full bg-background grid-cols-4'>
                <TabsTrigger value='spring'>Vårpuss</TabsTrigger>
                <TabsTrigger value='summer'>Sommernetter</TabsTrigger>
                <TabsTrigger value='autumn'>Høstturer</TabsTrigger>
                <TabsTrigger value='winter'>Vinteropplag</TabsTrigger>
              </TabsList>

              <TabsContent value='spring' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <LifeBuoy className='h-6 w-6 text-blue-400' />
                      <h3 className='text-xl font-semibold'>
                        Komfort under vårpussen
                      </h3>
                    </div>
                    <p className='text-muted-foreground'>
                      Vårpussen kan være en kald fornøyelse. Hold varmen mens du
                      gjør båten klar for sesongens eventyr, selv på kjølige
                      aprildager.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='summer' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <Sun className='h-6 w-6 text-yellow-400' />
                      <h3 className='text-xl font-semibold'>
                        Når solen har gått ned
                      </h3>
                    </div>
                    <p className='text-muted-foreground'>
                      Ikke la gåsehuden jage deg under dekk. Forleng de magiske
                      sommerkveldene i cockpiten eller på flybridgen.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='autumn' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <Fish className='h-6 w-6 text-orange-500' />
                      <h3 className='text-xl font-semibold'>
                        Høstfiske i komfort
                      </h3>
                    </div>
                    <p className='text-muted-foreground'>
                      Høsten byr på fantastisk lys og gode fiskemuligheter. Nyt
                      den skarpe, klare luften uten å fryse mens du venter på
                      napp.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='winter' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <Anchor className='h-6 w-6 text-gray-500' />
                      <h3 className='text-xl font-semibold'>
                        Tilsyn i Vinteropplag
                      </h3>
                    </div>
                    <p className='text-muted-foreground'>
                      Selv om båten ligger på land, krever den tilsyn. Gjør de
                      kalde turene til havna for å sjekke presenning og motor
                      langt mer behagelige.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Populære farvann med Utekos
              </h2>
              <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
                Fra Blindleia til Helgelandskysten – nyt Norges vakreste
                kystlinje i total komfort.
              </p>
            </div>
            <PopularDestinationsGrid destinations={popularDestinationsData} />
          </div>
        </section>

        {/* Social Proof */}
        <section className='py-24 bg-sidebar-foreground'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto text-center'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-8'>
                Skippere elsker Utekos
              </h2>

              <Card className='border-neutral-800 bg-background'>
                <CardContent className='p-12'>
                  <blockquote className='text-xl italic text-foreground/90 mb-6'>
                    &quot;Som mangeårig seiler er Utekos det beste 'båtutstyret'
                    jeg har kjøpt på lenge. Den er helt genial for kalde kvelder
                    for anker og har i praksis utvidet sesongen vår med to
                    måneder.&quot;
                  </blockquote>
                  <div className='flex items-center justify-center gap-4'>
                    <div className='h-12 w-12 rounded-full bg-sidebar-foreground' />
                    <div className='text-left'>
                      <p className='font-semibold'>Kjell-Arne Larsen</p>
                      <p className='text-sm text-muted-foreground'>
                        Seilentusiast fra Tønsberg
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-24 relative overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10' />
          <div className='container relative mx-auto px-4 text-center'>
            <CTASection />
          </div>
        </section>
      </main>
    </>
  )
}
