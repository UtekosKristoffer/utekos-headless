// Path: src/app/handlehjelp/sammenlign-modeller/components/CompareModelsJsonLd.tsx
import { cacheLife } from 'next/cache'
import type {
  BreadcrumbList,
  FAQPage,
  Graph,
  ItemList,
  WebPage
} from 'schema-dts'
import { faqItems, modelRecommendations } from '../utils/comparisonData'

const SITE_URL = 'https://utekos.no'
const PAGE_URL = `${SITE_URL}/handlehjelp/sammenlign-modeller`
const WEBSITE_ID = `${SITE_URL}/#website`
const ORGANIZATION_ID = `${SITE_URL}/#organization`

export async function CompareModelsJsonLd() {
  'use cache'
  cacheLife('max')

  const webPageNode: WebPage = {
    '@type': 'WebPage',
    '@id': `${PAGE_URL}#webpage`,
    'url': PAGE_URL,
    'name': 'Sammenlign Utekos-modeller',
    'description':
      'Kjøpsguide som sammenligner Utekos Dun, Utekos Mikrofiber og Utekos TechDown for hytte, bobil, båt og norsk vær.',
    'inLanguage': 'nb-NO',
    'isPartOf': {
      '@id': WEBSITE_ID
    },
    'about': {
      '@id': ORGANIZATION_ID
    },
    'mainEntity': {
      '@id': `${PAGE_URL}#model-list`
    },
    'primaryImageOfPage': {
      '@type': 'ImageObject',
      'url': `${SITE_URL}/kate-linn-2560-1600-85.webp`,
      'width': '1200',
      'height': '630',
      'caption': 'Sammenligning av Utekos-modeller'
    }
  }

  const breadcrumbNode: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    '@id': `${PAGE_URL}#breadcrumb`,
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
        'name': 'Handlehjelp',
        'item': `${SITE_URL}/handlehjelp`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Sammenlign modeller',
        'item': PAGE_URL
      }
    ]
  }

  const itemListNode: ItemList = {
    '@type': 'ItemList',
    '@id': `${PAGE_URL}#model-list`,
    'name': 'Sammenlign Utekos-modeller',
    'description':
      'Kuratert oversikt over Utekos Dun, Utekos Mikrofiber og Utekos TechDown.',
    'numberOfItems': modelRecommendations.length,
    'itemListOrder': 'https://schema.org/ItemListOrderAscending',
    'itemListElement': modelRecommendations.map((model, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': model.name,
      'url': `${SITE_URL}${model.href}`,
      'item': {
        '@type': 'Product',
        '@id': `${SITE_URL}${model.href}#product`,
        'name': model.name,
        'description': model.description,
        'image': `${SITE_URL}${model.imageSrc}`,
        'brand': {
          '@type': 'Brand',
          'name': 'Utekos'
        },
        'url': `${SITE_URL}${model.href}`
      }
    }))
  }

  const faqNode: FAQPage = {
    '@type': 'FAQPage',
    '@id': `${PAGE_URL}#faq`,
    'mainEntity': faqItems.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  }

  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webPageNode, breadcrumbNode, itemListNode, faqNode]
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
