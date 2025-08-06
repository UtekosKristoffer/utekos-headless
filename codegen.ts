// codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: `https://erling-7921.myshopify.com/api/2025-07/graphql.json`,
  // Oppdager GraphQL-operasjoner i TS/TSX-filer via graphql-taggen
  documents: ["./src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true, // hindrer støy når ingen operasjoner finnes
  generates: {
    "./src/gql/": {
      // client preset genererer graphql() funksjonen og TypedDocumentString
      preset: "client",
      presetConfig: {
        artifactDirectory: "./src/gql", // output for artefakter
      },
      plugins: [
        "typescript",
        "typescript-operations",
        {
          "@graphql-codegen/typescript-react-query": {
            fetcher: "./src/lib/graphql-fetcher#shopifyFetcher",
            exposeDocument: true,
            exposeQueryKeys: true,
            legacyMode: false, // genererer hooks for @tanstack/react-query v5
            // valgfritt: du kan sette defaultQueryOptions for TanStack Query her
            // e.g. "defaultQueryOptions": { "staleTime": 60000 }
          },
        },
      ],
      config: {
        // Brukes av typescript-* pluginene
        useTypeImports: true, // gir `import type` for lettere bundle
        // documentMode: 'string' er default i client preset
      },
    },
  },
};

export default config;
