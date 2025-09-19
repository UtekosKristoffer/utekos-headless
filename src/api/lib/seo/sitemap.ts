import { getProducts } from '@/api/lib/products/getProducts' // Functions to fetch all handles
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://utekos.no'

  const products = await getProducts() // Returns array of { handle, updatedAt }
  if (!Array.isArray(products)) {
    throw new Error('Failed to fetch products')
  }
  const productUrls = products.map(product => ({
    url: `${baseUrl}/produkter/${product.handle}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }))
  /**
   * @todo Add static URLs for other important pages like home, about, contact, etc.
   */
  const staticUrls = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/produkter`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    }
    // Add more static pages as needed
  ]
  // Structured data (JSON-LD) can be added here if needed for SEO purposes
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Utekos',
      'url': baseUrl,
      'logo': `${baseUrl}/logo.png`,
      'sameAs': [
        'https://www.facebook.com/utekos',
        'https://www.instagram.com/utekos'
        // Add other social profiles
      ]
    }
    // Add more structured data types as needed
    // For example, if you have a blog, you might add BlogPosting schema for each post
    // Or Product schema for featured products
    // Or WebSite schema for the overall site
    // Or BreadcrumbList schema for navigation paths
    // Or LocalBusiness schema if you have a physical location
    // Or Review schema for customer reviews

    // Example for reviews - this would be populated from a reviews app/metafields
    // - aggregateRating: {
    //   '@type': 'AggregateRating',
    // - ratingValue: '4.8',
    // - reviewCount: '125'
    // }
  ]
  // Fix: Type '{ url: string; lastModified: Date; changeFrequency: string; priority: number; }[]' is not assignable to type 'SitemapFile'.
  return [...staticUrls, ...productUrls] as MetadataRoute.Sitemap
}
