import type * as Types from "@/Types/types";

import {
  useQuery,
  useInfiniteQuery,
  type UseQueryOptions,
  type UseInfiniteQueryOptions,
  type InfiniteData,
} from "@tanstack/react-query";
import { ShopifyRequestClient } from "@/Lib/Clients/ShopifyRequestClient";
export type GetMenuQueryVariables = Types.Exact<{
  handle: Types.Scalars["String"]["input"];
}>;

export type GetMenuQuery = {
  __typename?: "QueryRoot";
  menu?: {
    __typename?: "Menu";
    items: Array<{
      __typename?: "MenuItem";
      title: string;
      url?: any | null;
      items: Array<{
        __typename?: "MenuItem";
        title: string;
        url?: any | null;
      }>;
    }>;
  } | null;
};

export const GetMenuDocument = `
    query GetMenu($handle: String!) {
  menu(handle: $handle) {
    items {
      title
      url
      items {
        title
        url
      }
    }
  }
}
    `;

export const useGetMenuQuery = <TData = GetMenuQuery, TError = unknown>(
  variables: GetMenuQueryVariables,
  options?: Omit<UseQueryOptions<GetMenuQuery, TError, TData>, "queryKey"> & {
    queryKey?: UseQueryOptions<GetMenuQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetMenuQuery, TError, TData>({
    queryKey: ["GetMenu", variables],
    queryFn: ShopifyRequestClient<GetMenuQuery, GetMenuQueryVariables>(
      GetMenuDocument,
      variables
    ),
    ...options,
  });
};

useGetMenuQuery.getKey = (variables: GetMenuQueryVariables) => [
  "GetMenu",
  variables,
];

export const useInfiniteGetMenuQuery = <
  TData = InfiniteData<GetMenuQuery>,
  TError = unknown,
>(
  variables: GetMenuQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetMenuQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<GetMenuQuery, TError, TData>["queryKey"];
  }
) => {
  return useInfiniteQuery<GetMenuQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["GetMenu.infinite", variables],
        queryFn: (metaData) =>
          ShopifyRequestClient<GetMenuQuery, GetMenuQueryVariables>(
            GetMenuDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetMenuQuery.getKey = (variables: GetMenuQueryVariables) => [
  "GetMenu.infinite",
  variables,
];
