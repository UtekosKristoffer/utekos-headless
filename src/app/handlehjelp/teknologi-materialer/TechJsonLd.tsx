import { cacheLife, cacheTag } from 'next/cache'
import type { Article, BreadcrumbList, FAQPage, Graph, WebPage } from 'schema-dts'

const SITE_URL = 'https://utekos.no'
const PAGE_URL = `${SITE_URL}/handlehjelp/teknologi-materialer`
const WEBSITE_ID = `${SITE_URL}/#website`
const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBPAGE_ID = `${PAGE_URL}#webpage`
const BREADCRUMB_ID = `${PAGE_URL}#breadcrumb`
const ARTICLE_ID = `${PAGE_URL}#article`
const FAQ_ID = `${PAGE_URL}#faq`

export async function TechJsonLd() {
  'use cache'
  cacheLife('max')
  cacheTag('jsonld-tech-materials')

  const webPage: WebPage = {
    '@type': 'WebPage',
    '@id': WEBPAGE_ID,
    'url': PAGE_URL,
    'name': 'Teknologi og materialer',
    'description': 'Teknisk gjennomgang av materialer, isolasjon og 3-i-1 funksjonalitet i Utekos-produkter.',
    'inLanguage': 'nb-NO',
    'isPartOf': { '@id': WEBSITE_ID },
    'breadcrumb': { '@id': BREADCRUMB_ID },
    'mainEntity': { '@id': ARTICLE_ID },
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
        'name': 'Teknologi og materialer'
      }
    ]
  }

  const article: Article = {
    '@type': 'Article',
    '@id': ARTICLE_ID,
    'headline': 'Teknologien og materialene som definerer Utekos®',
    'description':
      'En detaljert teknisk gjennomgang av TechDown™, HydroGuard™ og SherpaCore™ – materialene som sikrer varme, komfort og lang levetid i Utekos-produkter.',
    'image': ['https://cdn.shopify.com/s/files/1/0634/2154/6744/files/damentilpederbilde.png?v=1746789037'],
    'author': {
      '@type': 'Organization',
      'name': 'Utekos',
      'url': SITE_URL
    },
    'publisher': { '@id': ORGANIZATION_ID },
    'mainEntityOfPage': { '@id': WEBPAGE_ID },
    'datePublished': '2025-10-01T08:00:00+01:00',
    'dateModified': new Date().toISOString()
  }

  const faq: FAQPage = {
    '@type': 'FAQPage',
    '@id': FAQ_ID,
    'inLanguage': 'nb-NO',
    'isPartOf': { '@id': WEBPAGE_ID },
    'author': { '@id': ORGANIZATION_ID },
    'publisher': { '@id': ORGANIZATION_ID },
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Er Utekos-produkter vanntette?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text':
            'Ja, produkter med HydroGuard™ Shell har en vannsøyle på minimum 8000mm, tapede sømmer og en pustende membran som beskytter mot kraftig regn og vind.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Hva er TechDown™?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text':
            'TechDown™ er vår nyeste og mest allside produkt. Den etterligner dunets varmeeffekt og lette vekt, men er hydrofobisk, noe som betyr at den beholder isolasjonsevnen selv under fuktige forhold.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Hvordan fungerer 3-i-1 funksjonaliteten?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text':
            'Vårt 3-i-1 system lar deg justere plagget med snorstrammere. Du kan bruke det i fullengdemodus for maksimal varme, oppjustert modus for umiddelbar mobilitet innendørs, eller parkasmodus for turer og bevegelse med varighet.'
        }
      }
    ]
  }

  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webPage, breadcrumb, article, faq]
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
