// Path: src/app/inspirasjon/terrassen/page.tsx

import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GlassWater, Leaf, Snowflake, Sun } from 'lucide-react'
import type { Metadata } from 'next'
import type { Article, WithContext } from 'schema-dts'
import {
  benefitsData,
  BenefitsGrid,
  CTASection,
  TerraceHeroSection,
  terraceIdeasData,
  TerraceIdeasGrid,
  useCasesData,
  UseCasesGrid
} from './TerraceClientComponents'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Terrasseliv og Utekos | Gjør uteplassen til ditt favorittrom',
  description:
    'Oppdag hvordan Utekos forvandler terrassen din. Fra den første vårkaffen til sene høstkvelder – få maksimalt ut av din personlige uteplass, uansett temperatur.',
  keywords: [
    'terrasse',
    'terrasseliv',
    'balkong',
    'utestue',
    'hjemmekos',
    'forlenge kvelden ute',
    'terrassevarmer alternativ',
    'hageinspirasjon'
  ],
  alternates: {
    canonical: '/inspirasjon/terrassen'
  },
  openGraph: {
    title: 'Terrasseliv & Utekos | Forleng kveldene på din egen uteplass',
    description:
      'Gjør terrassen eller balkongen om til en helårsoase. Med Utekos kan du nyte de friske øyeblikkene lenger, hver eneste dag.',
    url: '/inspirasjon/terrassen',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-terrassen.webp',
        width: 1200,
        height: 630,
        alt: 'Et par som koser seg på en moderne terrasse med Utekos-plagg'
      }
    ],
    locale: 'no_NO',
    type: 'article'
  }
}

const jsonLd: WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Utekos på Terrassen: Slik skaper du et ekstra rom uten vegger',
  'description':
    'En komplett guide til hvordan du kan maksimere bruken av terrassen eller balkongen din med Utekos. Tips og inspirasjon for å forlenge utendørssesongen hjemme.',
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
    '@id': 'https://utekos.no/inspirasjon/terrassen'
  }
}

export default function TerraceInspirationPage() {
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
            <TerraceHeroSection />
          </div>
        </section>

        {/* Use Cases Section */}
        <section id='bruksomrader' className='py-24 bg-sidebar-foreground'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Hjemmekos, bare ute
              </h2>
              <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
                Fra en stille stund for deg selv, til sosiale lag som varer
                lenger.
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
                En investering i hjemmet
              </h2>
              <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
                Få mer ut av uteplassen du allerede har. Utekos er designet for
                å maksimere komforten i hverdagen.
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
                Din uteplass gjennom året
              </h2>
            </div>

            <Tabs defaultValue='summer' className='max-w-4xl mx-auto'>
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
                      <Sun className='h-6 w-6 text-yellow-400' />
                      <h3 className='text-xl font-semibold'>
                        Den første kaffen ute
                      </h3>
                    </div>
                    <p className='text-muted-foreground'>
                      Det er noe magisk med den første dagen det er varmt nok
                      til å sitte ute. Med Utekos kan den dagen komme uker
                      tidligere.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='summer' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <GlassWater className='h-6 w-6 text-cyan-400' />
                      <h3 className='text-xl font-semibold'>
                        Når duggfallet kommer
                      </h3>
                    </div>
                    <p className='text-muted-foreground'>
                      Ikke la den kjølige kveldsluften avslutte den gode
                      samtalen. Forleng de lyse sommerkveldene til langt etter
                      at solen har gått ned.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='autumn' className='mt-8'>
                <Card className='border-neutral-800 bg-background'>
                  <CardContent className='p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <Leaf className='h-6 w-6 text-orange-500' />
                      <h3 className='text-xl font-semibold'>
                        Høstkvelder med klar luft
                      </h3>
                    </div>
                    <p className='text-muted-foreground'>
                      Pakk deg inn i komfort og nyt den skarpe, klare høstluften
                      med en kopp te og en god bok.
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
                        En kort pause i frisk luft
                      </h3>
                    </div>
                    <p className='text-muted-foreground'>
                      Noen ganger trenger man bare fem minutter ute, selv om det
                      er kaldt. Perfekt for en rask pause med gløgg eller kaffe
                      på vinteren.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Terrace Ideas */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Ideer for din uteplass
              </h2>
              <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
                Uansett størrelse på uteplassen din, kan den bli en oase for
                komfort og hygge.
              </p>
            </div>
            <TerraceIdeasGrid ideas={terraceIdeasData} />
          </div>
        </section>

        {/* Social Proof */}
        <section className='py-24 bg-sidebar-foreground'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto text-center'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-8'>
                Huseiere elsker Utekos
              </h2>

              <Card className='border-neutral-800 bg-background'>
                <CardContent className='p-12'>
                  <blockquote className='text-xl italic text-foreground/90 mb-6'>
                    &quot;Vi har doblet bruken av terrassen etter at vi fikk
                    Utekos i hus. Den brukes av hele familien, fra tenåringen
                    som vil sitte ute med venner, til oss voksne som endelig kan
                    nyte kveldene ute uten å pakke oss inn i ti tepper.&quot;
                  </blockquote>
                  <div className='flex items-center justify-center gap-4'>
                    <div className='h-12 w-12 rounded-full bg-sidebar-foreground' />
                    <div className='text-left'>
                      <p className='font-semibold'>Familien Nordmann</p>
                      <p className='text-sm text-muted-foreground'>
                        Eneboligeiere fra Asker
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
