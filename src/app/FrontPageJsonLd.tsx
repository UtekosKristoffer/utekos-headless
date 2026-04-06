import type {
  WebSite,
  VideoObject,
  WithContext,
  SiteNavigationElement,
  Offer
} from 'schema-dts'
import { cacheLife } from 'next/cache'
import { VIDEO_THUMBNAIL_URL, VIDEO_EMBED_URL } from '@/api/constants'

export async function WebSiteSchemaJsonLd() {
  'use cache'
  cacheLife('days')

  const websiteSchema: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Utekos',
    'url': 'https://utekos.no',
    'sameAs': [
      'https://www.wikidata.org/wiki/Q138904544',
      'https://www.facebook.com/utekosen',
      'https://www.instagram.com/utekos.no'
    ],
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://utekos.no/search?q={query}'
      },
      'query': 'required'
    },
    'publisher': {
      '@id': 'https://utekos.no/#organization',
      'sameAs': [
        'https://www.wikidata.org/wiki/Q138904544',
        'https://www.facebook.com/utekosen',
        'https://www.instagram.com/utekos.no'
      ]
    },
    'description': 'Utekos - Skreddersy varmen',
    'inLanguage': 'no',
    'dateModified': new Date().toISOString()
  }

  const navigationSchema: WithContext<SiteNavigationElement> = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    'name': [
      'Alle produkter',
      'Utekos TechDown™',
      'Utekos Dun™',
      'Comfyrobe™',
      'Kontakt oss'
    ],
    'url': [
      'https://utekos.no/produkter',
      'https://utekos.no/produkter/utekos-techdown',
      'https://utekos.no/produkter/utekos-dun',
      'https://utekos.no/produkter/comfyrobe',
      'https://utekos.no/kontaktskjema'
    ]
  }

  const offerSchema: WithContext<Offer> = {
    '@context': 'https://schema.org',
    '@type': 'Offer'
  }

  const videoSchema: WithContext<VideoObject> = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': 'Slutt å fryse. Begynn å nyte.',
    'description':
      'Er du lei av å la kulden ødelegge de gode øyeblikkene ute? Utekos er løsningen som holder deg varm og komfortabel.',
    'thumbnailUrl': [VIDEO_THUMBNAIL_URL],
    'uploadDate': '2026-01-04T00:00:00+01:00',
    'duration': 'PT0M30S',
    'embedUrl': VIDEO_EMBED_URL,
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
          __html: JSON.stringify(navigationSchema).replace(/</g, '\\u003c')
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
