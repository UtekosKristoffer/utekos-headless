// Path: src/app/kontaktskjema/ContactPageJsonLd.tsx
import { cacheLife, cacheTag } from 'next/cache'
import type { ContactPage, WithContext } from 'schema-dts'

export async function ContactPageJsonLd() {
  'use cache'
  cacheLife('max')
  cacheTag('contact-page')

  const jsonLd: WithContext<ContactPage> = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Kontakt oss | Utekos Kundeservice',
    'description':
      'Kundeservice for Utekos. Vi hjelper deg med bestillinger, produktspørsmål og retur.',
    'url': 'https://utekos.no/kontaktskjema',

    'mainEntity': {
      '@id': 'https://utekos.no/#organization'
    },

    'about': [
      {
        '@id': 'https://utekos.no/#organization'
      },
      {
        '@type': 'Service',
        'name': 'Kundeservice',
        'provider': {
          '@id': 'https://utekos.no/#organization'
        }
      }
    ],

    'significantLink': [
      'https://utekos.no/frakt-og-retur',
      'https://utekos.no/handlehjelp/storrelsesguide',
      'https://utekos.no/handlehjelp/vask-og-vedlikehold'
    ],

    'audience': {
      '@type': 'Audience',
      'audienceType': 'Customers'
    },

    'lastReviewed': '2025-11-10'
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
