import type { Article, WithContext } from 'schema-dts'

export const jsonLd: WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Hytteliv og Utekos: Din guide til den ultimate hytteopplevelsen',
  'description':
    'En komplett guide til hvordan Utekos-plagg maksimerer komforten og kosen på hytten, uansett sesong. Tips, inspirasjon og ideer for den norske hytteeieren.',
  'author': {
    '@type': 'Organization',
    'name': 'Utekos'
  },
  'publisher': {
    '@type': 'Organization',
    'name': 'Utekos',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://utekos.no/logo.png'
    }
  },
  'datePublished': '2024-03-10',
  'dateModified': '2024-03-10',
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': 'https://utekos.no/inspirasjon/hytteliv'
  }
}
