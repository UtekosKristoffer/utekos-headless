// src/app/magasinet/_data/articleTypes.ts

import type { ComponentType } from 'react'

export type MagazineCategory =
  | 'Tips og råd'
  | 'Om Utekos'
  | 'Hytteliv'
  | 'Terrasseliv'
  | 'Bobilliv'
  | 'Båtliv'

export type MagazineArticle = {
  slug: string
  title: string
  excerpt: string
  category: MagazineCategory
  imageUrl: string
  imageAlt?: string
  imageCaption?: string
  publishedAt: string
  updatedAt: string
  readingTimeMinutes?: number
  authorName?: string
  seoTitle?: string
  seoDescription?: string
  Article: ComponentType
}
