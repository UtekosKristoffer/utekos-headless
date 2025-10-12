import type { NextConfig } from 'next'

import nextBundleAnalyzer from '@next/bundle-analyzer'
const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    reactCompiler: true,

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
  eslint: {
    ignoreDuringBuilds: true
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
      }
    ]
  }
}
export default withBundleAnalyzer(nextConfig)
