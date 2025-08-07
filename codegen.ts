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
        typesPath: "./src/Types/types.ts",
      },
      plugins: [
        "typescript",
        "typescript-operations",
        {
          "@graphql-codegen/typescript-react-query": {
            fetcher: {
              func: "./src/Lib/GraphQLFetcher#shopifyFetcher",
              exposeDocument: true,
              exposeQueryKeys: true,
              legacyMode: false,
              documentMode: "string",
            },
          },
        },
      ],
      config: {
        useTypeImports: true,
        documentMode: "string",
      },
    },
  },
};
export default config;
