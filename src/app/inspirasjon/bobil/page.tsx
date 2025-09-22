import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SunIcon } from '@heroicons/react/24/outline'
import { Coffee, Compass, Mountain, Sunrise, Wind } from 'lucide-react'
import type { Metadata } from 'next'
import type { Article, WithContext } from 'schema-dts'
import {
  benefitsData,
  BenefitsGrid,
  BobilHeroSection,
  CTASection,
  destinationsData,
  DestinationsGrid,
  useCasesData,
  UseCasesGrid
} from './BobilClientComponents'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Bobil og Utekos | Forleng sesongen og øk komforten på turen',
  description:
    'Oppdag hvordan Utekos forvandler bobilopplevelsen. Fra kjølige morgener til sosiale kvelder - sikre deg komforten som lar deg nyte hvert øyeblikk av bobilturen.',
  keywords: [
    'bobil',
    'campingvogn',
    'bobilliv Norge',
    'utekos bobil',
    'varme bobil',
    'komfort camping',
    'bobiltilbehør',
    'vintercamp bobil'
  ],
  alternates: {
    canonical: '/inspirasjon/bobil'
  },
  openGraph: {
    title: 'Bobil og Utekos | Forleng sesongen og øk komforten',
    description:
      'Fra kjølige morgener til sosiale kvelder - oppdag hvordan Utekos blir din beste følgesvenn på bobilturen.',
    url: '/inspirasjon/bobil',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-bobil.webp',
        width: 1200,
        height: 630,
        alt: 'Par som koser seg utenfor bobilen med Utekos-plagg'
      }
    ],
    locale: 'no_NO',
    type: 'article'
  }
}

const jsonLd: WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Bobil og Utekos: Din guide til ultimate komfort på tur',
  'description':
    'Komplett guide for hvordan Utekos-plagg forvandler bobilopplevelsen i Norge. Tips, råd og inspirasjon for alle sesonger.',
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
  'datePublished': '2024-01-15',
  'dateModified': '2024-01-15',
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': 'https://utekos.no/inspirasjon/bobil'
  }
}

export default function BobilInspirasjonPage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* Hero Section - Using Client Component */}
        <section className='relative min-h-[70vh] flex items-center'>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50' />
          <div className='container relative mx-auto px-4 py-16'>
            <BobilHeroSection />
          </div>
        </section>

        {/* Use Cases Section - Using Client Component */}
        <section id='bruksomrader' className='py-24 bg-sidebar-foreground'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Utekos gjennom bobil-døgnet
              </h2>
              <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
                Fra soloppgang til solnedgang - se hvordan Utekos blir din
                trofaste følgesvenn
              </p>
            </div>
            <UseCasesGrid useCases={useCasesData} />
          </div>
        </section>

        {/* Benefits Grid - Using Client Component */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Skapt for bobilisten
              </h2>
              <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
                Vi forstår bobillivets unike behov og har designet Utekos for å
                møte dem
              </p>
            </div>
            <BenefitsGrid benefits={benefitsData} />
          </div>
        </section>

        {/* Seasonal Tips - Server Component (no animations) */}
        <section className='py-24 bg-sidebar-foreground'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Tips for alle sesonger
              </h2>
            </div>

            <Tabs defaultValue='spring' className='max-w-4xl mx-auto'>
              <TabsList className='grid w-full bg-background grid-cols-4'>
                <TabsTrigger
                  className='border bg-sidebar-foreground border-neutral-800 rounded-lg'
                  value='spring'
                >
                  Vår
                </TabsTrigger>
                <TabsTrigger
                  className='border bg-sidebar-foreground border-neutral-800 rounded-lg'
                  value='summer'
                >
                  Sommer
                </TabsTrigger>
                <TabsTrigger
                  className='border bg-sidebar-foreground border-neutral-800 rounded-lg'
                  value='autumn'
                >
                  Høst
                </TabsTrigger>
                <TabsTrigger
                  className='border bg-sidebar-foreground border-neutral-800 rounded-lg'
                  value='winter'
                >
                  Vinter
                </TabsTrigger>
              </TabsList>

              <TabsContent value='spring' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <Sunrise className='h-6 w-6 text-green-500' />
                      <h3 className='text-xl font-semibold'>
                        Vårcamping med Utekos
                      </h3>
                    </div>
                    <p className='text-muted-foreground mb-4'>
                      Våren byr på fantastiske muligheter for bobilisten, men
                      temperaturene kan være uforutsigbare.
                    </p>
                    <ul className='space-y-2 text-muted-foreground'>
                      <li className='flex items-start gap-2'>
                        <span className='text-primary mt-1'>•</span>
                        <span>
                          Start dagen tidlig med Utekos og kaffe for å se
                          naturen våkne
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <span className='text-primary mt-1'>•</span>
                        <span>
                          Perfekt for påskecamping i fjellet når kveldene
                          fortsatt er kjølige
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <span className='text-primary mt-1'>•</span>
                        <span>
                          Nyt de første varme solstrålene uten å fryse i skyggen
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='summer' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <SunIcon className='h-6 w-6 text-yellow-500' />
                      <h3 className='text-xl font-semibold'>
                        Sommerkvelder med stil
                      </h3>
                    </div>
                    <p className='text-muted-foreground mb-4'>
                      Selv om sommeren er varm, blir kveldene ofte overraskende
                      kjølige, spesielt ved kysten.
                    </p>
                    <ul className='space-y-2 text-muted-foreground'>
                      <li className='flex items-start gap-2'>
                        <span className='text-primary mt-1'>•</span>
                        <span>
                          Forleng de lyse kveldene utendørs uten å pakke inn i
                          tepper
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <span className='text-primary mt-1'>•</span>
                        <span>
                          Ideell ved kysten hvor vinden kan gjøre kveldene
                          kjølige
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <span className='text-primary mt-1'>•</span>
                        <span>
                          Perfekt for sosiale samlinger på campingplassen
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='autumn' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <Mountain className='h-6 w-6 text-orange-500' />
                      <h3 className='text-xl font-semibold'>
                        Høstens fargeprakt i komfort
                      </h3>
                    </div>
                    <p className='text-muted-foreground mb-4'>
                      Høsten er mange bobilisters favoritt-sesong, og med Utekos
                      kan du nyte den fullt ut.
                    </p>
                    <ul className='space-y-2 text-muted-foreground'>
                      <li className='flex items-start gap-2'>
                        <span className='text-primary mt-1'>•</span>
                        <span>
                          Opplev de spektakulære høstfargene fra tidlig morgen
                          til sen kveld
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <span className='text-primary mt-1'>•</span>
                        <span>
                          Hold varmen under nordlys-jakt på kjølige høstkvelder
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <span className='text-primary mt-1'>•</span>
                        <span>
                          Nyt bålkosen uten å måtte sitte for nær flammene
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='winter' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <Wind className='h-6 w-6 text-blue-400' />
                      <h3 className='text-xl font-semibold'>
                        Vintercamping for de modige
                      </h3>
                    </div>
                    <p className='text-muted-foreground mb-4'>
                      For de som bruker bobilen året rundt, er Utekos den
                      ultimate følgesvennen.
                    </p>
                    <ul className='space-y-2 text-muted-foreground'>
                      <li className='flex items-start gap-2'>
                        <span className='text-primary mt-1'>•</span>
                        <span>Essensielt tilbehør for skiferier med bobil</span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <span className='text-primary mt-1'>•</span>
                        <span>
                          Hold varmen mens du venter på at bobilen varmes opp
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <span className='text-primary mt-1'>•</span>
                        <span>
                          Perfekt for julecamping og nyttårsfeiring på fjellet
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Destinations - Using Client Component */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Populære destinasjoner med Utekos
              </h2>
              <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
                Norges vakreste bobildestinasjoner venter - nyt dem i komfort
                hele sesongen
              </p>
            </div>
            <DestinationsGrid destinations={destinationsData} />
          </div>
        </section>

        {/* Social Proof - Server Component */}
        <section className='py-24 bg-sidebar-foreground'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto text-center'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-8'>
                Bobilister elsker Utekos
              </h2>

              <Card className='border-neutral-800 bg-background'>
                <CardContent className='p-12'>
                  <blockquote className='text-xl italic text-foreground/90 mb-6'>
                    &quot;Vi har brukt bobilen i 15 år, men Utekos har virkelig
                    forandret opplevelsen. Nå starter vi sesongen i mars og
                    avslutter i november. De kjølige morgenene og kveldene er
                    ikke lenger et problem - vi koser oss ute uansett
                    temperatur!&quot;
                  </blockquote>
                  <div className='flex items-center justify-center gap-4'>
                    <div className='h-12 w-12 rounded-full bg-sidebar-foreground' />
                    <div className='text-left'>
                      <p className='font-semibold'>Anne & Per Olsen</p>
                      <p className='text-sm text-muted-foreground'>
                        Erfarne bobilister fra Bergen
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section - Using Client Component */}
        <section className='py-24 relative overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10' />
          <div className='container relative mx-auto px-4 text-center'>
            <CTASection />

            <div className='flex items-center gap-2'>
              <Coffee className='h-4 w-4' />
              <span>Fri frakt over 1000 kr</span>
            </div>
            <div className='flex items-center gap-2'>
              <Compass className='h-4 w-4' />
              <span>60 dagers åpent kjøp</span>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
