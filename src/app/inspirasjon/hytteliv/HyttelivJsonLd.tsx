import { cacheLife, cacheTag } from 'next/cache'
import type { CollectionPage, WithContext } from 'schema-dts'

export async function HyttelivJsonLd() {
  'use cache'
  cacheLife('max')
  cacheTag('jsonld-hytteliv')

  const jsonLd: WithContext<CollectionPage> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Hytteliv og Utekos',
    'description':
      'Oppdag hvordan Utekos forvandler hytteopplevelsen. Inspirasjon for alle sesonger.',
    'url': 'https://utekos.no/inspirasjon/hytteliv',
    'primaryImageOfPage': {
      '@type': 'ImageObject',
      'url': 'https://utekos.no/og-image-hytte.webp'
    },
    'publisher': {
      '@id': 'https://utekos.no/#organization'
    },
    'about': {
      '@type': 'Thing',
      'name': 'Hytteliv og Utekos'
    },
    'datePublished': '2025-10-01'
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
