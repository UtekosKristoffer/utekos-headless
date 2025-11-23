import type { CollectionPage, WithContext } from 'schema-dts'

type Props = {
  title: string
  description: string
  url: string
  image: string
  datePublished?: string
}

export function InspirationJsonLd({
  title,
  description,
  url,
  image,
  datePublished
}: Props) {
  const jsonLd: WithContext<CollectionPage> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': title,
    'description': description,
    'url': url,
    'primaryImageOfPage': {
      '@type': 'ImageObject',
      'url': image
    },
    'publisher': {
      '@id': 'https://utekos.no/#organization'
    },

    'about': {
      '@type': 'Thing',
      'name': title
    },

    ...(datePublished ? { datePublished: datePublished } : {})
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
