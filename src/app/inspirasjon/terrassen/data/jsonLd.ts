import type { Article, WithContext } from 'schema-dts'

export const jsonLd: WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Utekos på Terrassen: Slik skaper du et ekstra rom uten vegger',
  'description':
    'En komplett guide til hvordan du kan maksimere bruken av terrassen eller balkongen din med Utekos. Tips og inspirasjon for å forlenge utendørssesongen hjemme.',
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
  'datePublished': '2025-09-21',
  'dateModified': '2025-09-21',
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': 'https://utekos.no/inspirasjon/terrassen'
  }
}
