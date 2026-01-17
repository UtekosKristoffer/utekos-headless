# Typescript

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


