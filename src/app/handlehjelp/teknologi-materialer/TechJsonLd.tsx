import type { Article, WithContext } from 'schema-dts'

export function TechJsonLd() {
  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': 'Teknologien og materialene som definerer Utekos',
    'description':
      'En detaljert gjennomgang av de høykvalitetsmaterialene og isolasjonsteknologiene som sikrer varme, komfort og lang levetid i alle våre produkter.',
    'image': [
      'https://cdn.shopify.com/s/files/1/0634/2154/6744/files/damentilpederbilde.png?v=1746789037'
    ],

    'author': {
      '@id': 'https://utekos.no/#organization'
    },
    'publisher': {
      '@id': 'https://utekos.no/#organization'
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': 'https://utekos.no/handlehjelp/teknologi-materialer'
    },

    'datePublished': '2025-10-01T08:00:00+01:00',
    'dateModified': '2025-10-22T08:00:00+01:00'
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
