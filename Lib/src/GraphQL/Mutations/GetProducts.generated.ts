import type * as Types from "@/Types/types";

import { ProductFragmentDoc } from "../Fragments/ProductFragment.generated";
import {
  useQuery,
  useInfiniteQuery,
  type UseQueryOptions,
  type UseInfiniteQueryOptions,
  type InfiniteData,
} from "@tanstack/react-query";
import { ShopifyRequestClient } from "@/Lib/Clients/ShopifyRequestClient";
export type GetProductsQueryVariables = Types.Exact<{
  first: Types.Scalars["Int"]["input"];
  query?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
}>;

export type GetProductsQuery = {
  __typename?: "QueryRoot";
  products: {
    __typename?: "ProductConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      endCursor?: string | null;
    };
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
          width?: number | null;
          height?: number | null;
        } | null;
        priceRange: {
          __typename?: "ProductPriceRange";
          minVariantPrice: {
            __typename?: "MoneyV2";
            amount: any;
            currencyCode: Types.CurrencyCode;
          };
        };
        compareAtPriceRange: {
          __typename?: "ProductPriceRange";
          maxVariantPrice: {
            __typename?: "MoneyV2";
            amount: any;
            currencyCode: Types.CurrencyCode;
          };
        };
        variants: {
          __typename?: "ProductVariantConnection";
          edges: Array<{
            __typename?: "ProductVariantEdge";
            node: {
              __typename?: "ProductVariant";
              id: string;
              availableForSale: boolean;
            };
          }>;
        };
      };
    }>;
  };
};

export const GetProductsDocument = `
    query GetProducts($first: Int!, $query: String) {
  products(first: $first, query: $query) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ...Product
      }
    }
  }
}
    ${ProductFragmentDoc}`;

export const useGetProductsQuery = <TData = GetProductsQuery, TError = unknown>(
  variables: GetProductsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetProductsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<GetProductsQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetProductsQuery, TError, TData>({
    queryKey: ["GetProducts", variables],
    queryFn: ShopifyRequestClient<GetProductsQuery, GetProductsQueryVariables>(
      GetProductsDocument,
      variables
    ),
    ...options,
  });
};

useGetProductsQuery.getKey = (variables: GetProductsQueryVariables) => [
  "GetProducts",
  variables,
];

export const useInfiniteGetProductsQuery = <
  TData = InfiniteData<GetProductsQuery>,
  TError = unknown,
>(
  variables: GetProductsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetProductsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetProductsQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetProductsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["GetProducts.infinite", variables],
        queryFn: (metaData) =>
          ShopifyRequestClient<GetProductsQuery, GetProductsQueryVariables>(
            GetProductsDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetProductsQuery.getKey = (variables: GetProductsQueryVariables) => [
  "GetProducts.infinite",
  variables,
];
