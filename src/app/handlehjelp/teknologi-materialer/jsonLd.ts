import type { Article, WithContext } from 'schema-dts'
export const jsonLd: WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Teknologien og materialene som definerer Utekos',
  'author': {
    '@type': 'Organization',
    'name': 'Utekos'
  },
  'publisher': {
    '@type': 'Organization',
    'name': 'Utekos',
    'logo': {
      '@type': 'ImageObject',
      'url':
        'https://cdn.shopify.com/s/files/1/0634/2154/6744/files/utekos_black_circle_logo.png?v=1753228426' // Erstatt med faktisk logo-URL
    }
  },
  'description':
    'En detaljert gjennomgang av de høykvalitetsmaterialene og isolasjonsteknologiene som sikrer varme, komfort og lang levetid i alle våre produkter.',
  'image':
    'https://cdn.shopify.com/s/files/1/0634/2154/6744/files/damentilpederbilde.png?v=1746789037'
}
