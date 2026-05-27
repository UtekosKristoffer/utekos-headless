// Path: src/app/magasinet/types/index.ts

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
  imageUrl: string
  imageAlt?: string
  imageCaption?: string
  category: MagazineCategory
  publishedAt: string
  updatedAt: string
  readingTimeMinutes?: number
  authorName?: string
  seoTitle?: string
  seoDescription?: string

  /**
   * imageUrl brukes alltid som representativt bilde for kort, metadata,
   * Open Graph, JSON-LD og sitemap.
   *
   * Headeren viser bildet kun når denne settes eksplisitt til true.
   * Default bør være false for å unngå doble hero-bilder i artikler
   * som allerede har egen hero/intro.
   */
  showDefaultHeroImage?: boolean

  Article: ComponentType
}
