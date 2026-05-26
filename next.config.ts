import type { NextConfig } from 'next'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const STATIC_ASSET_CACHE_CONTROL = 'public, max-age=31536000, immutable'

const staticAssetHeaders = [
  {
    key: 'Cache-Control',
    value: STATIC_ASSET_CACHE_CONTROL
  }
]

const nextConfig: NextConfig = {
  poweredByHeader: false,

  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,

  cacheLife: {
    products: {
      stale: 300,
      revalidate: 900,
      expire: 3600
    },
    collections: {
      stale: 600,
      revalidate: 1800,
      expire: 7200
    },
    content: {
      stale: 3600,
      revalidate: 86400,
      expire: 604800
    },
    marketing: {
      stale: 86400,
      revalidate: 604800,
      expire: 2592000
    }
  },

  staticPageGenerationTimeout: 180,

  experimental: {
    cpus: 1,

    webVitalsAttribution: ['CLS', 'INP', 'LCP'],

    optimizePackageImports: [
      'zod',
      'lucide-react',
      '@heroicons/react',
      'gsap',

      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-visually-hidden',

      '@tanstack/react-query',
      'react-hook-form',
      'xstate',
      '@xstate/react',
      'motion',
      'framer-motion',
      'cmdk',
      'embla-carousel-react',
      'sonner',
      'vaul'
    ]
  },

  ...(process.env.NODE_ENV === 'development' ?
    {
      logging: {
        fetches: {
          fullUrl: true,
          hmrRefreshes: false
        }
      }
    }
  : {}),

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**'
      }
    ],
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 85, 90, 95],
    deviceSizes: [390, 430, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384]
  },

  async headers() {
    return [
      {
        source: '/:path*.:extension(png|jpg|jpeg|webp|avif|gif|svg|ico|otf|woff2)',
        headers: staticAssetHeaders
      },
      {
        source: '/videos/:path*',
        headers: staticAssetHeaders
      }
    ]
  },

  async redirects() {
    return [
      {
        source: '/policies/refund-policy',
        destination: '/frakt-og-retur',
        permanent: true
      },
      {
        source: '/policies/privacy-policy',
        destination: '/personvern',
        permanent: true
      },
      {
        source: '/policies/terms-of-service',
        destination: '/vilkar-betingelser',
        permanent: true
      },
      {
        source: '/pages/policies/terms-of-service',
        destination: '/vilkar-betingelser',
        permanent: true
      },
      {
        source: '/pages/policies/privacy-policy',
        destination: '/personvern',
        permanent: true
      },
      {
        source: '/pages/policies/refund-policy',
        destination: '/frakt-og-retur',
        permanent: true
      },
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
      {
        source: '/pages/hva-er-utekos',
        destination: '/om-oss',
        permanent: true
      },
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
        source: '/pages/bobilferie/:path*',
        destination: '/inspirasjon/bobil',
        permanent: true
      },
      {
        source: '/produkter/utekos-teckdawn',
        destination: '/produkter/utekos-techdown',
        permanent: true
      },
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
        source: '/produkter/utekos-techdawn',
        destination: '/produkter/utekos-techdown',
        permanent: true
      },
      {
        source: '/pages/camping',
        destination: '/inspirasjon',
        permanent: true
      },
      {
        source: '/pages/contact',
        destination: '/kontaktskjema',
        permanent: true
      },
      {
        source: '/pages/kundeservice',
        destination: '/kontaktskjema',
        permanent: true
      }
    ]
  }
}

export default withBundleAnalyzer(nextConfig)
