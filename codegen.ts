// codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: `https://erling-7921.myshopify.com/api/2025-07/graphql.json`,
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/gql/": {
      preset: "client",
      config: {
        fragmentMasking: false,
        documentMode: "string", // redusert bundle
      },
      presetConfig: {
        artifactDirectory: "./src/gql",
      },
      plugins: [
        "@graphql-codegen/typescript",
        "@graphql-codegen/typescript-operations",
        {
          "@graphql-codegen/typescript-react-query": {
            fetcher: "./lib/fetcher#shopifyFetcher", // egen fetcher som kaller shopifyClient.request
            exposeDocument: true,
            exposeQueryKeys: true,
            isReactHook: true,
            legacyMode: false, // for @tanstack/react-query
          },
        },
      ],
    },
  },
};

export default config;
