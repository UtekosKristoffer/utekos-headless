import { cacheLife, cacheTag } from 'next/cache'
import type { Article, FAQPage, Graph } from 'schema-dts' // Endret import

export async function TechJsonLd() {
  'use cache'
  cacheLife('max')
  cacheTag('jsonld-tech-materials')

  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://utekos.no/handlehjelp/teknologi-materialer/#article',
        'headline': 'Teknologien og materialene som definerer Utekos®',
        'description':
          'En detaljert teknisk gjennomgang av TechDown™, HydroGuard™ og SherpaCore™ – materialene som sikrer varme, komfort og lang levetid i Utekos-produkter.',
        'image': [
          'https://cdn.shopify.com/s/files/1/0634/2154/6744/files/damentilpederbilde.png?v=1746789037'
        ],
        'author': {
          '@type': 'Organization',
          'name': 'Utekos',
          'url': 'https://utekos.no'
        },
        'publisher': {
          '@id': 'https://utekos.no/#organization'
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': 'https://utekos.no/handlehjelp/teknologi-materialer'
        },
        'datePublished': '2025-10-01T08:00:00+01:00',
        'dateModified': new Date().toISOString()
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://utekos.no/handlehjelp/teknologi-materialer/#faq',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Er Utekos-produkter vanntette?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text':
                'Ja, produkter med HydroGuard™ Shell har en vannsøyle på minimum 8000mm, tapede sømmer og en pustende membran som beskytter mot kraftig regn og vind.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Hva er TechDown™?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text':
                'TechDown™ er vår avanserte syntetiske isolasjon. Den etterligner dunets varmeeffekt og lette vekt, men er hydrofobisk, noe som betyr at den beholder isolasjonsevnen selv under fuktige forhold.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Hvordan fungerer 3-i-1 funksjonaliteten?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text':
                'Vårt 3-i-1 system lar deg justere plagget med snorstrammere. Du kan bruke det i fullengdemodus for maksimal varme, oppjustert modus for umiddelbar mobilitet innendørs, eller parkasmodus for turer og bevegelse med varighet.'
            }
          }
        ]
      }
    ]
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
      }}
    />
  )
}
