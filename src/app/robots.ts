import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://utekos.no'

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/google/feed'],
      disallow: ['/cart/', '/account/', '/api/']
    },
    sitemap: `${baseUrl}/sitemap.xml`
  }
}
