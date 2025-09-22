// Path: src/app/inspirasjon/grillkvelden/page.tsx

import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Flame, Leaf, Snowflake, Sun } from 'lucide-react'
import type { Metadata } from 'next'
import type { Article, WithContext } from 'schema-dts'
import {
  benefitsData,
  BenefitsGrid,
  CTASection,
  GrillHeroSection,
  hostTipsData,
  HostTipsGrid,
  useCasesData,
  UseCasesGrid
} from './GrillClientComponents'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Grillkvelden & Utekos | Slik blir du den perfekte verten',
  description:
    'Oppdag hemmeligheten bak en vellykket grillkveld som varer. Med Utekos kan du og gjestene dine nyte maten, samtalen og stemningen i timevis, uansett temperatur.',
  keywords: [
    'grillkveld',
    'grillfest',
    'grilltips',
    'holde varmen ute',
    'sosialt samvær',
    'grille om høsten',
    'vertstips'
  ],
  alternates: {
    canonical: '/inspirasjon/grillkvelden'
  },
  openGraph: {
    title: 'Grillkvelden & Utekos | Forleng hyggen, bli en legendarisk vert',
    description:
      'Ikke la en kjølig kveld sette en stopper for den gode stemningen. Se hvordan Utekos lar deg være verten for grillkveldene alle husker.',
    url: '/inspirasjon/grillkvelden',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-grillkvelden.webp',
        width: 1200,
        height: 630,
        alt: 'Vennegjeng samlet rundt et bord utendørs for en grillkveld, iført Utekos.'
      }
    ],
    locale: 'no_NO',
    type: 'article'
  }
}

const jsonLd: WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Den Perfekte Grillkvelden: En guide til varme og hygge',
  'description':
    'Lær hvordan du bruker Utekos til å forlenge grillkvelden og sikre at gjestene dine er komfortable, slik at de gode øyeblikkene kan vare lenger.',
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
  'datePublished': '2025-09-21',
  'dateModified': '2025-09-21',
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': 'https://utekos.no/inspirasjon/grillkvelden'
  }
}

export default function GrillInspirationPage() {
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
            <GrillHeroSection />
          </div>
        </section>

        {/* Use Cases Section */}
        <section id='bruksomrader' className='py-24 bg-sidebar-foreground'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Gjennom hele kvelden
              </h2>
              <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
                Fra de første gjestene ankommer til de siste drar – Utekos
                sikrer komforten.
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
                Fordelene for vertskapet
              </h2>
              <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
                Mindre stress for deg, mer komfort for gjestene. En vinn-vinn
                for en vellykket kveld.
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
                Grilling i alle sesonger
              </h2>
            </div>

            <Tabs defaultValue='autumn' className='max-w-4xl mx-auto'>
              <TabsList className='grid w-full bg-background grid-cols-4'>
                <TabsTrigger value='spring'>Vårgrilling</TabsTrigger>
                <TabsTrigger value='summer'>Sommerfest</TabsTrigger>
                <TabsTrigger value='autumn'>Høstglød</TabsTrigger>
                <TabsTrigger value='winter'>Vintergrill</TabsTrigger>
              </TabsList>

              <TabsContent value='spring' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <Sun className='h-6 w-6 text-yellow-400' />
                      <h3 className='text-xl font-semibold'>Sesongstarten</h3>
                    </div>
                    <p className='text-muted-foreground'>
                      Vær den første i nabolaget til å dra frem grillen. Med
                      Utekos er ikke en kjølig vårkveld noen hindring for en
                      vellykket premiere.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='summer' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <Flame className='h-6 w-6 text-orange-500' />
                      <h3 className='text-xl font-semibold'>
                        De lange sommerkveldene
                      </h3>
                    </div>
                    <p className='text-muted-foreground'>
                      Selv på sommeren blir det kaldt når solen går ned. Hold
                      festen i gang og la gjestene bli sittende i komfort til
                      langt på natt.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='autumn' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <Leaf className='h-6 w-6 text-green-500' />
                      <h3 className='text-xl font-semibold'>
                        Høstens farger og smaker
                      </h3>
                    </div>
                    <p className='text-muted-foreground'>
                      Høsten er perfekt for grilling med rike smaker. Nyt den
                      skarpe, klare luften rundt grillen med venner, uten å
                      tenke på temperaturen.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='winter' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <Snowflake className='h-6 w-6 text-blue-400' />
                      <h3 className='text-xl font-semibold'>
                        For de tøffeste grill entusiastene
                      </h3>
                    </div>
                    <p className='text-muted-foreground'>
                      Vintergrilling er en unik opplevelse. Utekos er essensielt
                      for å holde grillmesteren (og gjestene) varme mellom
                      slagene.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Host Tips */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Vertens sjekkliste
              </h2>
              <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
                Fire enkle tips for en uforglemmelig (og komfortabel)
                grillkveld.
              </p>
            </div>
            <HostTipsGrid tips={hostTipsData} />
          </div>
        </section>

        {/* Social Proof */}
        <section className='py-24 bg-sidebar-foreground'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto text-center'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-8'>
                Grillmestere elsker Utekos
              </h2>

              <Card className='border-neutral-800 bg-background'>
                <CardContent className='p-12'>
                  <blockquote className='text-xl italic text-foreground/90 mb-6'>
                    &quot;Jeg elsker å arrangere grillfester, men hatet at folk
                    begynte å trekke inn så snart det ble litt kjølig. Utekos
                    forandret alt. Nå er det alltid noen som har en på seg, og
                    festen fortsetter ute der den hører hjemme – rundt
                    grillen!&quot;
                  </blockquote>
                  <div className='flex items-center justify-center gap-4'>
                    <div className='h-12 w-12 rounded-full bg-sidebar-foreground' />
                    <div className='text-left'>
                      <p className='font-semibold'>Morten "Grill-Morten" P.</p>
                      <p className='text-sm text-muted-foreground'>
                        Hobby-grillmester og livsnyter
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
