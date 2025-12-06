import { mockArticles } from '@/db/data/articles'
import { cacheLife, cacheTag } from 'next/cache'
import type { BlogPosting, WithContext } from 'schema-dts'

type Props = {
  slug: string
}

export async function ArticleJsonLd({ slug }: Props) {
  'use cache'
  cacheTag(`article-${slug}`, 'articles')
  cacheLife('max')

  const article = mockArticles.find(p => p.slug === slug)

  if (!article) return null

  const datePublished =
    'publishedAt' in article ?
      (article.publishedAt as string)
    : '2024-01-01T12:00:00+01:00'

  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://utekos.no/magasinet/${article.slug}`
    },
    'headline': article.title,
    'description': article.excerpt,
    'image': [article.imageUrl], // Pass på at imageUrl er absolutt (https://...)
    'datePublished': datePublished,
    'dateModified': datePublished, // Oppdater hvis du har modifiedAt felt
    'author': {
      '@type': 'Organization',
      'name': 'Utekos',
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
