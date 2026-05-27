import { cacheLife, cacheTag } from 'next/cache'
import type { Graph } from 'schema-dts'

export async function AboutPageJsonLd() {
  'use cache'
  cacheLife('max')
  cacheTag('jsonld-about')

  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://utekos.no/om-oss/#webpage',
        'url': 'https://utekos.no/om-oss',
        'name': 'Utekos sin historie og løfte til deg',
        'description': 'Drevet av kalde kvelder og et løfte om å aldri la været stoppe de gode øyeblikkene.',
        'inLanguage': 'no',
        'isPartOf': {
          '@id': 'https://utekos.no/#website' // Peker tilbake til global WebSite fra layout.tsx
        },
        'about': {
          '@id': 'https://utekos.no/#organization' // Peker på Kelc AS / Utekos
        },
        'primaryImageOfPage': {
          '@id': 'https://utekos.no/om-oss/#primaryimage'
        }
      },
      {
        '@type': 'ImageObject',
        '@id': 'https://utekos.no/om-oss/#primaryimage',
        'url': 'https://utekos.no/og-image-om-oss.png', // Sørg for at denne URLen er faktisk
        'width': '1200',
        'height': '630'
      },
      {
        '@type': 'Article',
        '@id': 'https://utekos.no/om-oss/#article',
        'isPartOf': {
          '@id': 'https://utekos.no/om-oss/#webpage'
        },
        'headline': 'Utekos sin historie og løfte til deg',
        'description': 'Drevet av kalde kvelder og et løfte om å aldri la været stoppe de gode øyeblikkene.',
        'author': {
          '@id': 'https://utekos.no/#organization'
        },
        'publisher': {
          '@id': 'https://utekos.no/#organization'
        },
        // LLM-spesifikke E-E-A-T signaler:
        'datePublished': '2025-10-01T08:00:00+02:00', // Starten på historien
        'dateModified': '2026-05-26T12:00:00+02:00', // Siste oppdatering
        'mainEntityOfPage': {
          '@id': 'https://utekos.no/om-oss/#webpage'
        }
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
