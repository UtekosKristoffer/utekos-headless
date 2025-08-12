import type * as Types from "@/Types/types";

import {
  useQuery,
  useInfiniteQuery,
  type UseQueryOptions,
  type UseInfiniteQueryOptions,
  type InfiniteData,
} from "@tanstack/react-query";
import { ShopifyRequestClient } from "@/Lib/Clients/ShopifyRequestClient";
export type SearchProductsQueryVariables = Types.Exact<{
  query: Types.Scalars["String"]["input"];
  first?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
}>;

export type SearchProductsQuery = {
  __typename?: "QueryRoot";
  products: {
    __typename?: "ProductConnection";
    edges: Array<{
      __typename?: "ProductEdge";
      node: {
        __typename?: "Product";
        id: string;
        title: string;
        handle: string;
        featuredImage?: {
          __typename?: "Image";
          url: any;
          altText?: string | null;
        } | null;
        priceRange: {
          __typename?: "ProductPriceRange";
          minVariantPrice: {
            __typename?: "MoneyV2";
            amount: any;
            currencyCode: Types.CurrencyCode;
          };
        };
      };
    }>;
  };
};

export const SearchProductsDocument = `
    query SearchProducts($query: String!, $first: Int = 10) {
  products(query: $query, first: $first) {
    edges {
      node {
        id
        title
        handle
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}
    `;

export const useSearchProductsQuery = <
  TData = SearchProductsQuery,
  TError = unknown,
>(
  variables: SearchProductsQueryVariables,
  options?: Omit<
    UseQueryOptions<SearchProductsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<SearchProductsQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<SearchProductsQuery, TError, TData>({
    queryKey: ["SearchProducts", variables],
    queryFn: ShopifyRequestClient<
      SearchProductsQuery,
      SearchProductsQueryVariables
    >(SearchProductsDocument, variables),
    ...options,
  });
};

useSearchProductsQuery.getKey = (variables: SearchProductsQueryVariables) => [
  "SearchProducts",
  variables,
];

export const useInfiniteSearchProductsQuery = <
  TData = InfiniteData<SearchProductsQuery>,
  TError = unknown,
>(
  variables: SearchProductsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<SearchProductsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      SearchProductsQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<SearchProductsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["SearchProducts.infinite", variables],
        queryFn: (metaData) =>
          ShopifyRequestClient<
            SearchProductsQuery,
            SearchProductsQueryVariables
          >(SearchProductsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteSearchProductsQuery.getKey = (
  variables: SearchProductsQueryVariables
) => ["SearchProducts.infinite", variables];
