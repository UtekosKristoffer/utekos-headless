// codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: `https://erling-7921.myshopify.com/api/2025-07/graphql.json`,
  documents: "./src/**/*.ts",
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      preset: "client",
      presetConfig: {
        artifactDirectory: "./src/gql",
      },
      plugins: [
        "typescript",
        "typescript-operations",
        {
          "@graphql-codegen/typescript-react-query": {
            fetcher: "./src/Lib/graphql-fetcher#shopifyFetcher",
            exposeDocument: true,
            exposeQueryKeys: true,
            legacyMode: false,
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
