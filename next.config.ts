import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    reactCompiler: true,
    cacheComponents: true
  },
  ignoreBuildErrors: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.shopify.com',
      port: '',
      pathname: '/**'
    }
  ]
}
export default nextConfig
