// Path: src/app/OrganizationJsonLd.tsx

import type { OnlineStore, WithContext } from 'schema-dts'
import { cacheLife } from 'next/cache'

export async function OnlineStoreJsonLd() {
  'use cache'
  cacheLife('max')

  const jsonLd: WithContext<OnlineStore> = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    '@id': 'https://utekos.no/#organization',
    'name': 'Utekos',
    'legalName': 'Kelc As',
    'url': 'https://utekos.no',
    'logo': 'https://utekos.no/logo.png',
    'image': 'https://utekos.no/og-image-produkter.png',
    'description': 'Utekos - Skreddersy varmen.',
    'foundingDate': '2020',
    'email': 'kundeservice@utekos.no',
    'telephone': '+47 40 21 63 43',
    'vatID': 'NO 925 820 393 MVA',
    'iso6523Code': '0192:925820393',
    'knowsLanguage': 'no',
    'areaServed': {
      '@type': 'Country',
      'name': 'Norway'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Lille Damsgårdsveien 25',
      'postalCode': '5162',
      'addressLocality': 'Laksevåg',
      'addressCountry': 'NO'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'Customer Service',
      'telephone': '+47 40 21 63 43',
      'email': 'kundeservice@utekos.no',
      'areaServed': 'NO',
      'availableLanguage': 'no'
    },
    'sameAs': [
      'https://www.facebook.com/utekosen',
      'https://www.instagram.com/utekos.no'
    ],
    'hasMerchantReturnPolicy': {
      '@type': 'MerchantReturnPolicy',
      'applicableCountry': 'NO',
      'returnPolicyCategory':
        'https://schema.org/MerchantReturnFiniteReturnWindow',
      'merchantReturnDays': 14,
      'returnMethod': 'https://schema.org/ReturnByMail',
      'returnFees': 'https://schema.org/FreeReturn', // OPPDATERT: Endret til fri retur
      'refundType': 'https://schema.org/FullRefund',
      'url': 'https://utekos.no/frakt-og-retur'
    }
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
