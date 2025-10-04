// Path: src/app/inspirasjon/båtliv/page.tsx

import { Card, CardContent } from '@/components/ui/card'
import type { Metadata } from 'next'
import type { Article, WithContext } from 'schema-dts'
import {
  benefitsData,
  BenefitsGrid,
  CTASection,
  popularDestinationsData,
  PopularDestinationsGrid,
  useCasesData,
  UseCasesGrid
} from './BoatingClientComponents'
import { BoatSeasonSection } from './BoatSeasonSection'
import { BoatingHeroSection } from './BoatingHeroSection'
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
        <BoatingHeroSection />
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

        <BoatSeasonSection />

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
                    &quot;Som mangeårig seiler er Utekos det beste båtutstyret
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
