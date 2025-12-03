// Path: src/app/FrontPageJsonLd.tsx

import type { WebSite, VideoObject, WithContext } from 'schema-dts'
import { cacheLife } from 'next/cache' // <--- Import
export const VIDEO_URL = 'https://utekos.no/videos/TensorPix2.mp4'
export const VIDEO_THUMBNAIL = 'https://utekos.no/linn-kate-kikkert.png'
export async function FrontPageJsonLd() {
  'use cache'
  cacheLife('days')
  const websiteSchema: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Utekos',
    'url': 'https://utekos.no',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://utekos.no/search?q={query}'
      },
      'query': 'required'
    },
    'publisher': {
      '@id': 'https://utekos.no/#organization'
    }
  }

  const videoSchema: WithContext<VideoObject> = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': 'Slutt å fryse. Begynn å nyte.',
    'description':
      'Er du lei av å la kulden ødelegge de gode øyeblikkene ute? Utekos er løsningen som holder deg varm og komfortabel.',
    'thumbnailUrl': [VIDEO_THUMBNAIL],
    'uploadDate': '2024-01-01T00:00:00+01:00',
    'duration': 'PT0M30S',

    'contentUrl': VIDEO_URL,
    'publisher': {
      '@id': 'https://utekos.no/#organization'
    }
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replace(/</g, '\\u003c')
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoSchema).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}
