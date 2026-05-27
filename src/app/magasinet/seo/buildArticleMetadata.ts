// src/app/magasinet/_seo/buildArticleMetadata.ts

import { SITE_URL } from '@/constants'
import type { Metadata } from 'next'
import type { MagazineArticle } from '../types'
import { toAbsoluteUrl } from '../utils/toAbsoluteUrl'

export function buildArticleMetadata(article: MagazineArticle): Metadata {
  const url = `${SITE_URL}/magasinet/${article.slug}`
  const title = article.seoTitle ?? `${article.title} | Utekos Magasinet`
  const description = article.seoDescription ?? article.excerpt
  const imageUrl = toAbsoluteUrl(article.imageUrl)

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: 'article',
      locale: 'no_NO',
      url,
      siteName: 'Utekos',
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.imageAlt ?? article.title
        }
      ],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    }
  }
}
