// src/app/magasinet/_seo/buildArticleJsonLd.ts

import { SITE_URL } from '@/constants'
import type { BlogPosting, WithContext } from 'schema-dts'
import type { MagazineArticle } from '../types'

export function buildArticleJsonLd(article: MagazineArticle): WithContext<BlogPosting> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/magasinet/${article.slug}#article`,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/magasinet/${article.slug}`
    },
    'headline': article.title,
    'description': article.excerpt,
    'image': [article.imageUrl],
    'datePublished': article.publishedAt,
    'dateModified': article.updatedAt,
    'author': {
      '@type': 'Organization',
      'name': 'Utekos',
      'url': SITE_URL
    },
    'publisher': {
      '@id': `${SITE_URL}/#organization`
    },
    'isAccessibleForFree': true
  }
}
