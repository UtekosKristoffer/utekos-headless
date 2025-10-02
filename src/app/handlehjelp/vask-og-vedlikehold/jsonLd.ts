import type { Article, WithContext } from 'schema-dts'

// JSON-LD er oppdatert til å være en god, generell guide som fanger essensen for alle produktene.
export const jsonLd: WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Vedlikeholdsguide for Utekos-produkter',
  'author': { '@type': 'Organization', 'name': 'Utekos' },
  'publisher': {
    '@type': 'Organization',
    'name': 'Utekos',
    'logo': {
      '@type': 'ImageObject',
      'url':
        'https://cdn.shopify.com/s/files/1/0634/2154/6744/files/utekos_black_circle_logo.png?v=1753228426'
    }
  },
  'description':
    'Lær hvordan du vasker, tørker og oppbevarer dine Utekos-plagg for å bevare den unike kvaliteten og maksimere levetiden.',
  'image': 'https://utekos.no/og-image-vedlikehold.jpg'
}
