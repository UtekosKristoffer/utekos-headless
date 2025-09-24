// Path: src/api/lib/seo/robots.ts

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://utekos.no'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart/', '/account/', '/api/']
    },
    sitemap: `${baseUrl}/sitemap.xml`
  }
}
