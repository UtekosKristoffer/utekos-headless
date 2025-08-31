---
applyTo: 'src/**/*.{ts,tsx}'
---

### Overview over the projects configurations and package.json

## Package JSON - package.json

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.1",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@shopify/storefront-api-client": "^1.0.9",
    "@tanstack/react-query": "^5.85.5",
    "@tanstack/react-query-devtools": "^5.85.5",
    "@tanstack/react-query-next-experimental": "^5.85.5",
    "@xstate/react": "^6.0.0",
    "@xstate/store": "^3.9.2",
    "babel-plugin-react-compiler": "^19.1.0-rc.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "graphql": "^16.11.0",
    "jsdoc": "^4.0.4",
    "lucide-react": "^0.540.0",
    "next": "15.5.0",
    "radix-ui": "^1.4.3",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-hook-form": "^7.62.0",
    "swiper": "^11.2.10",
    "tailwind-merge": "^3.3.1",
    "vaul": "^1.1.2",
    "xstate": "^5.20.2",
    "zod": "^4.0.15"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "dotenv": "^17.2.1",
    "eslint": "^9.18.0",
    "eslint-config-next": "^15.5.0",
    "eslint-config-prettier": "^10.1.8",
    "jiti": "^2.5.1",
    "prettier": "^3.6.2",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.3.7",
    "typescript": "^5.9.2"
  }
}

```

## NextConfig - next.config.ts

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    reactCompiler: true
  },
  ignoreBuildErrors: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}
export default nextConfig
```

## TypeScript Configuration - tsconfig.json

- Important: Also analyse fil copilot-typescript-breaking-changes.md for the newest features regarding TypeScript.

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
    "jsx": "preserve",
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
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## ESLint Configuration - eslint.config.mts

```typescript
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', '@typescript-eslint/strict']
  }),
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts']
  }
]

export default eslintConfig
```

## PostCSS Configuration - postcss.config.mjs

```javascript
const config = {
  plugins: ['@tailwindcss/postcss']
}

export default config
```
