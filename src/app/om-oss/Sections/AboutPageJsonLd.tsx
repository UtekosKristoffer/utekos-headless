// Path: src/app/om-oss/AboutPageJsonLd.tsx
import type { AboutPage, WithContext } from 'schema-dts'

export function AboutPageJsonLd() {
  const jsonLd: WithContext<AboutPage> = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'Om Utekos | Vår historie',
    'description':
      'Historien om Utekos, vår filosofi om kompromissløs komfort, og menneskene bak merkevaren.',
    'url': 'https://utekos.no/om-oss',
    'mainEntity': {
      '@id': 'https://utekos.no/#organization'
    },
    'about': {
      '@id': 'https://utekos.no/#organization'
    },
    'primaryImageOfPage': {
      '@type': 'ImageObject',
      'url': 'https://utekos.no/norsk-kveld.webp',
      'width': '1200',
      'height': '630'
    },

    'lastReviewed': '2025-10-14'
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
