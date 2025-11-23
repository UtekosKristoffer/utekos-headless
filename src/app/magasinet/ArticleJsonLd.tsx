// Path: src/app/magasinet/ArticleJsonLd.tsx
import type { BlogPosting, WithContext } from 'schema-dts'

type Props = {
  url: string
  title: string
  description: string
  images: string[]
  datePublished: string
  dateModified?: string
  authorName?: string
}

export function ArticleJsonLd({
  url,
  title,
  description,
  images,
  datePublished,
  dateModified,
  authorName = 'Utekos'
}: Props) {
  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url
    },
    'headline': title,
    'description': description,
    'image': images,
    'datePublished': datePublished,
    'dateModified': dateModified || datePublished,
    'author': {
      '@type': 'Organization',
      'name': authorName,
      'url': 'https://utekos.no'
    },
    'publisher': {
      '@id': 'https://utekos.no/#organization'
    },
    'isAccessibleForFree': true
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
