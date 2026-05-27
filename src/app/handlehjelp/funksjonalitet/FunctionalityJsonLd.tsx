import { cacheLife, cacheTag } from 'next/cache'
import type { BreadcrumbList, Graph, WebPage } from 'schema-dts'

const SITE_URL = 'https://utekos.no'
const PAGE_URL = `${SITE_URL}/handlehjelp/funksjonalitet`
const WEBSITE_ID = `${SITE_URL}/#website`
const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBPAGE_ID = `${PAGE_URL}#webpage`
const BREADCRUMB_ID = `${PAGE_URL}#breadcrumb`

export async function FunctionalityJsonLd() {
  'use cache'
  cacheLife('max')
  cacheTag('jsonld-functionality')

  const webPage: WebPage = {
    '@type': 'WebPage',
    '@id': WEBPAGE_ID,
    'url': PAGE_URL,
    'name': 'Slik fungerer Utekos',
    'description': 'Guide til Utekos sin 3-i-1 funksjonalitet: fullengde, oppjustert modus og parkasmodus.',
    'inLanguage': 'nb-NO',
    'isPartOf': { '@id': WEBSITE_ID },
    'breadcrumb': { '@id': BREADCRUMB_ID },
    'publisher': { '@id': ORGANIZATION_ID }
  }

  const breadcrumb: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    '@id': BREADCRUMB_ID,
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Forside',
        'item': SITE_URL
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Slik fungerer Utekos'
      }
    ]
  }

  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webPage, breadcrumb]
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
