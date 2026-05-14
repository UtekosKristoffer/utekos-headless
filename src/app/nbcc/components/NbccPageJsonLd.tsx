import type { BreadcrumbList, FAQPage, Graph, WebPage } from 'schema-dts'
import { cacheLife } from 'next/cache'

import { nbccFaqItems } from '../data/nbccLandingPageContent'

const SITE_URL = 'https://utekos.no'
const NBCC_URL = `${SITE_URL}/nbcc`
const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

export async function NbccPageJsonLd() {
  'use cache'
  cacheLife('max')

  const webpageNode: WebPage = {
    '@type': 'WebPage',
    '@id': `${NBCC_URL}#webpage`,
    'url': NBCC_URL,
    'name': 'NBCC-medlemsfordel hos Utekos',
    'description':
      'Partnerlandingsside for NBCC-medlemmer med Utekos-produkter for camping, bobil, caravan, fortelt og kjølige kvelder ute.',
    'inLanguage': 'nb-NO',
    'isPartOf': {
      '@id': WEBSITE_ID
    },
    'about': {
      '@id': ORGANIZATION_ID
    },
    'primaryImageOfPage': {
      '@type': 'ImageObject',
      'url': `${SITE_URL}/og-image-bobil.webp`,
      'width': '1200',
      'height': '630',
      'caption': 'Vintercamping med bobil, fortelt og varme kveldsstunder'
    }
  }

  const faqNode: FAQPage = {
    '@type': 'FAQPage',
    '@id': `${NBCC_URL}#faq`,
    'mainEntity': nbccFaqItems.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  }

  const breadcrumbNode: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    '@id': `${NBCC_URL}#breadcrumb`,
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
        'name': 'NBCC',
        'item': NBCC_URL
      }
    ]
  }

  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageNode, faqNode, breadcrumbNode]
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
