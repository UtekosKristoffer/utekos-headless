// src/app/magasinet/_seo/buildBreadcrumbJsonLd.ts

import type { BreadcrumbList, WithContext } from 'schema-dts'
import type { MagazineArticle } from '../types'

const SITE_URL = 'https://utekos.no'

export function buildBreadcrumbJsonLd(article: MagazineArticle): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Magasinet',
        'item': `${SITE_URL}/magasinet`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': article.title
      }
    ]
  }
}
