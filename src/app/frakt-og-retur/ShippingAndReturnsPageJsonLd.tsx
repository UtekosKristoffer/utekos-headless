import { cacheLife, cacheTag } from 'next/cache'
import { shippingReturnsFaqItems } from '@/app/frakt-og-retur/data/shippingReturnsContent'
import { SITE_URL } from '@/constants'
import type { BreadcrumbList, FAQPage, Graph, WebPage } from 'schema-dts'

const PAGE_URL = `${SITE_URL}/frakt-og-retur`
const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

export async function ShippingAndReturnsPageJsonLd() {
  'use cache'
  cacheLife('max')
  cacheTag('shipping-returns-jsonld')

  const webpageNode: WebPage = {
    '@type': 'WebPage',
    '@id': `${PAGE_URL}#webpage`,
    'url': PAGE_URL,
    'name': 'Frakt og retur hos Utekos',
    'description':
      'Informasjon om leveringstid, fri frakt over 999 kr, 14 dagers angrerett og returprosessen hos Utekos.',
    'inLanguage': 'nb-NO',
    'isPartOf': {
      '@id': WEBSITE_ID
    },
    'about': {
      '@id': ORGANIZATION_ID
    }
  }

  const faqNode: FAQPage = {
    '@type': 'FAQPage',
    '@id': `${PAGE_URL}#faq`,
    'mainEntity': shippingReturnsFaqItems.map(item => ({
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
    '@id': `${PAGE_URL}#breadcrumb`,
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Forsiden',
        'item': SITE_URL
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Frakt og retur',
        'item': PAGE_URL
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
