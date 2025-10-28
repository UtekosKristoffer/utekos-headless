import type { NextConfig } from 'next'

import nextBundleAnalyzer from '@next/bundle-analyzer'
const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    useCache: true,
    optimizePackageImports: [
      'zod',
      '@radix-ui/react-dialog',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      'xstate',
      'cmdk',
      'embla-carousel-react',
      'sonner',
      'vaul'
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**'
      }
    ]
  },
  async redirects() {
    return [
      // --- Generelle redirects (fra gammel Shopify-struktur) ---
      {
        source: '/products/:path*',
        destination: '/produkter/:path*',
        permanent: true
      },
      {
        source: '/collections/:path*',
        destination: '/produkter',
        permanent: true
      },

      // --- Spesifikke redirects (fra gammel `pages`-struktur) ---
      // Om Oss
      {
        source: '/pages/hva-er-utekos',
        destination: '/om-oss',
        permanent: true
      },
      // Handlehjelp
      {
        source: '/pages/vask-og-vedlikehold',
        destination: '/handlehjelp/vask-og-vedlikehold',
        permanent: true
      },
      {
        source: '/pages/storrelsesguide',
        destination: '/handlehjelp/storrelsesguide',
        permanent: true
      },
      {
        source: '/pages/teknologi-og-materialer',
        destination: '/handlehjelp/teknologi-materialer',
        permanent: true
      },
      // Inspirasjon
      {
        source: '/pages/hytteliv',
        destination: '/inspirasjon/hytteliv',
        permanent: true
      },
      {
        source: '/pages/batliv',
        destination: '/inspirasjon/batliv',
        permanent: true
      },
      {
        source: '/pages/terrassen',
        destination: '/inspirasjon/terrassen',
        permanent: true
      },
      {
        source: '/pages/bobil',
        destination: '/inspirasjon/bobil',
        permanent: true
      },
      {
        source: '/pages/bobilferie/:path*', // Fanger opp alle undersider
        destination: '/inspirasjon/bobil',
        permanent: true
      },
      {
        source: '/pages/grillkvelden',
        destination: '/inspirasjon/grillkvelden',
        permanent: true
      },
      // Catch-all for gammel inspirasjon-struktur
      {
        source: '/pages/inspirasjon/:path*',
        destination: '/inspirasjon',
        permanent: true
      },
      {
        source: '/pages/fjellinspirasjon/:path*',
        destination: '/inspirasjon',
        permanent: true
      },
      {
        source: '/pages/camping',
        destination: '/inspirasjon',
        permanent: true
      }
    ]
  }
}

export default withBundleAnalyzer(nextConfig)
