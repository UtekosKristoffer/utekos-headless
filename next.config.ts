import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    reactCompiler: true,
    useCache: true,
    optimizePackageImports: [
      'xstate',
      '@tanstack/react-query',
      'swiper',
      '@xstate/store'
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
  }
}
export default nextConfig
