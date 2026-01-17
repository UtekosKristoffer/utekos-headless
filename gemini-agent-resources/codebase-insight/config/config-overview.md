## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2024",
    "lib": ["dom", "dom.iterable", "es2024"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noUncheckedSideEffectImports": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@types": ["./types/index.ts"],
      "@types/*": ["./types/*"],
      "@public/*": ["./public/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "eslint.config.mts",
    "**/*.graphql",
    "src/lib/queries/graphql.d.ts",
    ".next/types/**/*.ts",
    "types/**/*.d.ts",
    "src/lib/errors",
    "src/api/types/event",
    "src/api/types/state",
    "src/components/WelcomeToast",
    "src/db/config",
    "src/components/ProductCard/ProductCarousel.tsx",
    ".next/dev/types/**/*.ts",
    "src/components/cookie-consent",
    "docs/google-tag-manager/custom-pixel.js"
  ],
  "exclude": ["node_modules", ".github/**/*", "alpha/**/*", "docs/**/*"]
}
```

## Next Config

```ts
import type { NextConfig } from 'next'

import { withBotId } from 'botid/next/config'
const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,
  staticPageGenerationTimeout: 180,
  experimental: {
    cpus: 1,
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
    ],
    qualities: [75, 80, 90, 95, 100]
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

export default withBotId(nextConfig)
```

## Vercel

```json
{
  "rewrites": [
    {
      "source": "/relay-MAhe/static/(.*)",
      "destination": "https://eu-assets.i.posthog.com/static/$1"
    },
    {
      "source": "/relay-MAhe/(.*)",
      "destination": "https://eu.i.posthog.com/$1"
    }
  ],
  "crons": [
    {
      "path": "/api/cron/sync-catalog",
      "schedule": "0 4 * * *"
    }
  ],
  "regions": ["arn1"]
}
```
