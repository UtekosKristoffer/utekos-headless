// Path: src/app/inspirasjon/hytteliv/page.tsx

import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FlameIcon, LeafIcon, SnowflakeIcon, SunIcon } from 'lucide-react'
import type { Metadata } from 'next'
import type { Article, WithContext } from 'schema-dts'
import {
  benefitsData,
  BenefitsGrid,
  CabinHeroSection,
  CTASection,
  popularAreasData,
  PopularCabinAreasGrid,
  useCasesData,
  UseCasesGrid
} from './CabinClientComponents'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Hytteliv og Utekos | Din guide til ultimat hyttekomfort',
  description:
    'Oppdag hvordan Utekos forvandler hytteopplevelsen. Fra kjølige morgener på terrassen til sene kvelder under stjernene – sikre deg komforten som skaper minner.',
  keywords: [
    'hytteliv',
    'hyttekos',
    'norsk hytte',
    'utekos hytte',
    'varme hytte',
    'komfort hyttetur',
    'hyttetilbehør',
    'vinterhytte',
    'peiskos'
  ],
  alternates: {
    canonical: '/inspirasjon/hytteliv'
  },
  openGraph: {
    title: 'Hytteliv og Utekos | Forleng kveldene og øk komforten',
    description:
      'Fra soloppgang på terrassen til sene kvelder ved bålpannen – oppdag hvordan Utekos blir din beste venn på hytten.',
    url: '/inspirasjon/hytteliv',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-hytte.webp',
        width: 1200,
        height: 630,
        alt: 'Vennegjeng som koser seg utenfor hytta med Utekos-plagg'
      }
    ],
    locale: 'no_NO',
    type: 'article'
  }
}

const jsonLd: WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Hytteliv og Utekos: Din guide til den ultimate hytteopplevelsen',
  'description':
    'En komplett guide til hvordan Utekos-plagg maksimerer komforten og kosen på hytta, uansett sesong. Tips, inspirasjon og ideer for den norske hytteeieren.',
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
  'datePublished': '2024-03-10',
  'dateModified': '2024-03-10',
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': 'https://utekos.no/inspirasjon/hytteliv'
  }
}

export default function CabinInspirationPage() {
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
            <CabinHeroSection />
          </div>
        </section>

        {/* Use Cases Section */}
        <section id='bruksomrader' className='py-24 bg-sidebar-foreground'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Hyttekos fra morgen til kveld
              </h2>
              <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
                Uansett tid på døgnet, er Utekos med på å skape de perfekte
                øyeblikkene.
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
                Designet for hyttelivet
              </h2>
              <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
                Vi forstår hva som er viktig for deg som hytteeier – komfort,
                kvalitet og praktiske løsninger.
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
                Hytteglede i alle sesonger
              </h2>
            </div>

            <Tabs defaultValue='autumn' className='max-w-4xl mx-auto'>
              <TabsList className='grid w-full bg-background grid-cols-4'>
                <TabsTrigger value='spring'>Vår</TabsTrigger>
                <TabsTrigger value='summer'>Sommer</TabsTrigger>
                <TabsTrigger value='autumn'>Høst</TabsTrigger>
                <TabsTrigger value='winter'>Vinter</TabsTrigger>
              </TabsList>

              <TabsContent value='spring' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <SunIcon className='h-6 w-6 text-yellow-400' />
                      <h3 className='text-xl font-semibold'>
                        Påskesol og Vårfornemmelser
                      </h3>
                    </div>
                    <p className='text-muted-foreground'>
                      Nyt de første varme solstrålene på terrassen uten å la den
                      kjølige luften stoppe deg. Perfekt for påskefjellet eller
                      den første helgen på sjøhytten.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='summer' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <FlameIcon className='h-6 w-6 text-orange-500' />
                      <h3 className='text-xl font-semibold'>
                        Forleng sommerkveldene
                      </h3>
                    </div>
                    <p className='text-muted-foreground'>
                      Ikke la gåsehud avslutte den gode samtalen. Utekos er
                      hemmeligheten bak de uforglemmelige sommerkveldene som
                      varer til langt på natt.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='autumn' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <LeafIcon className='h-6 w-6 text-green-500' />
                      <h3 className='text-xl font-semibold'>
                        Høstkos i høyoppløsning
                      </h3>
                    </div>
                    <p className='text-muted-foreground'>
                      Opplev høstens farger og den skarpe, klare luften i total
                      komfort. Perfekt for en kopp te på trappa eller rundt
                      bålpannen.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='winter' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <SnowflakeIcon className='h-6 w-6 text-blue-400' />
                      <h3 className='text-xl font-semibold'>
                        Vintermagi og peiskos
                      </h3>
                    </div>
                    <p className='text-muted-foreground'>
                      Den ultimate følelsen etter en lang skitur. Eller når du
                      ankommer en kald hytte og trenger øyeblikkelig varme mens
                      peisen knitrer i gang.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Popular Cabin Areas */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Populære hytteområder med Utekos
              </h2>
              <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
                Fra fjell til fjord – nyt Norges vakreste hytteperler, uansett
                temperatur.
              </p>
            </div>
            <PopularCabinAreasGrid destinations={popularAreasData} />
          </div>
        </section>

        {/* Social Proof */}
        <section className='py-24 bg-sidebar-foreground'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto text-center'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-8'>
                Hyttefolk elsker Utekos
              </h2>

              <Card className='border-neutral-800 bg-background'>
                <CardContent className='p-12'>
                  <blockquote className='text-xl italic text-foreground/90 mb-6'>
                    &quot;Utekos har blitt en "hytte-uniform". Vi bruker den fra
                    vi står opp til vi legger oss. Terrasssesongen vår starter
                    nå i april i stedet for juni. Rett og slett
                    uunnværlig!&quot;
                  </blockquote>
                  <div className='flex items-center justify-center gap-4'>
                    <div className='h-12 w-12 rounded-full bg-sidebar-foreground' />
                    <div className='text-left'>
                      <p className='font-semibold'>Erik & Maja Johansen</p>
                      <p className='text-sm text-muted-foreground'>
                        Hytteeiere i Trysil
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
