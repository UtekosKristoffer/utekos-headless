// Path: src/api/lib/sitemap.ts
// Når vi deployer koden, vil Next.js automatisk generere en sitemap.xml-fil på https://utekos.no/sitemap.xml
// Det siste steget, etter at siden er live, er å sende inn den URL-en til Google Search Console for å sikre at Google indekserer nettstedet ditt effektivt.

import { getProducts } from '@/api/lib/products/getProducts'
import { getMagazineArticles } from '@/db/data/articles'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://utekos.no'
  const lastModified = new Date()

  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/produkter`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/magasinet`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/gaveguide`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9
    }
  ]

  const inspirationPages: MetadataRoute.Sitemap = [
    '/inspirasjon',
    '/inspirasjon/batliv',
    '/inspirasjon/bobil',
    '/inspirasjon/camping',
    '/inspirasjon/grillkvelden',
    '/inspirasjon/hytteliv',
    '/inspirasjon/terrassen'
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7
  }))

  const utilityPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/kontaktskjema`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: `${baseUrl}/personvern`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3
    }
  ]

  const productsResponse = await getProducts()

  const productUrls: MetadataRoute.Sitemap =
    productsResponse.success && productsResponse.body ?
      productsResponse.body.map(product => ({
        url: `${baseUrl}/produkter/${product.handle}`,
        lastModified: new Date(product.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
        images: product.featuredImage ? [product.featuredImage.url] : []
      }))
    : []

  const articles = await getMagazineArticles()

  const articleUrls: MetadataRoute.Sitemap = articles.map(article => ({
    url: `${baseUrl}/magasinet/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
    images: [`${baseUrl}${article.imageUrl}`]
  }))

  return [
    ...corePages,
    ...inspirationPages,
    ...utilityPages,
    ...productUrls,
    ...articleUrls
  ]
}
