import type { Article, WithContext } from 'schema-dts'

export const jsonLd: WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Bobil og Utekos: Din guide til ultimate komfort på tur',
  'description':
    'Komplett guide for hvordan Utekos-plagg forvandler bobilopplevelsen i Norge. Tips, råd og inspirasjon for alle sesonger.',
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
  'datePublished': '2024-01-15',
  'dateModified': '2024-01-15',
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': 'https://utekos.no/inspirasjon/bobil'
  }
}
