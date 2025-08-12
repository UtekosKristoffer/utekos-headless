import type * as Types from "@/Types/types";

import {
  useQuery,
  useInfiniteQuery,
  type UseQueryOptions,
  type UseInfiniteQueryOptions,
  type InfiniteData,
} from "@tanstack/react-query";
import { ShopifyRequestClient } from "@/Lib/Clients/ShopifyRequestClient";
export type GetProductByHandleQueryVariables = Types.Exact<{
  handle: Types.Scalars["String"]["input"];
}>;

export type GetProductByHandleQuery = {
  __typename?: "QueryRoot";
  product?: {
    __typename?: "Product";
    id: string;
    title: string;
    handle: string;
    descriptionHtml: any;
    priceRange: {
      __typename?: "ProductPriceRange";
      minVariantPrice: {
        __typename?: "MoneyV2";
        amount: any;
        currencyCode: Types.CurrencyCode;
      };
    };
    options: Array<{
      __typename?: "ProductOption";
      name: string;
      values: Array<string>;
    }>;
    media: {
      __typename?: "MediaConnection";
      edges: Array<{
        __typename?: "MediaEdge";
        node:
          | { __typename: "ExternalVideo" }
          | {
              __typename: "MediaImage";
              id: string;
              image?: {
                __typename?: "Image";
                url: any;
                altText?: string | null;
                width?: number | null;
                height?: number | null;
              } | null;
            }
          | { __typename: "Model3d" }
          | { __typename: "Video" };
      }>;
    };
    variants: {
      __typename?: "ProductVariantConnection";
      edges: Array<{
        __typename?: "ProductVariantEdge";
        node: {
          __typename?: "ProductVariant";
          id: string;
          title: string;
          availableForSale: boolean;
          selectedOptions: Array<{
            __typename?: "SelectedOption";
            name: string;
            value: string;
          }>;
          price: {
            __typename?: "MoneyV2";
            amount: any;
            currencyCode: Types.CurrencyCode;
          };
          image?: {
            __typename?: "Image";
            id?: string | null;
            url: any;
            altText?: string | null;
            width?: number | null;
            height?: number | null;
          } | null;
          variantProfile?: {
            __typename?: "Metafield";
            reference?:
              | { __typename: "Collection" }
              | { __typename: "GenericFile" }
              | { __typename: "MediaImage" }
              | {
                  __typename: "Metaobject";
                  images?: {
                    __typename?: "MetaobjectField";
                    value?: string | null;
                  } | null;
                  subtitle?: {
                    __typename?: "MetaobjectField";
                    value?: string | null;
                  } | null;
                  materials?: {
                    __typename?: "MetaobjectField";
                    value?: string | null;
                  } | null;
                  functions?: {
                    __typename?: "MetaobjectField";
                    value?: string | null;
                  } | null;
                  properties?: {
                    __typename?: "MetaobjectField";
                    value?: string | null;
                  } | null;
                  usage?: {
                    __typename?: "MetaobjectField";
                    value?: string | null;
                  } | null;
                  sizeFit?: {
                    __typename?: "MetaobjectField";
                    value?: string | null;
                  } | null;
                  storageAndMaintenance?: {
                    __typename?: "MetaobjectField";
                    value?: string | null;
                  } | null;
                  colorLabel?: {
                    __typename?: "MetaobjectField";
                    value?: string | null;
                  } | null;
                  backgroundColor?: {
                    __typename?: "MetaobjectField";
                    value?: string | null;
                  } | null;
                  swatchHexcolorForVariant?: {
                    __typename?: "MetaobjectField";
                    value?: string | null;
                  } | null;
                  length?: {
                    __typename?: "MetaobjectField";
                    value?: string | null;
                  } | null;
                  centerToWrist?: {
                    __typename?: "MetaobjectField";
                    value?: string | null;
                  } | null;
                  flatWidth?: {
                    __typename?: "MetaobjectField";
                    value?: string | null;
                  } | null;
                }
              | { __typename: "Model3d" }
              | { __typename: "Page" }
              | { __typename: "Product" }
              | { __typename: "ProductVariant" }
              | { __typename: "Video" }
              | null;
          } | null;
        };
      }>;
    };
  } | null;
};

export const GetProductByHandleDocument = `
    query GetProductByHandle($handle: String!) {
  product(handle: $handle) {
    id
    title
    handle
    descriptionHtml
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    options {
      name
      values
    }
    media(first: 20) {
      edges {
        node {
          __typename
          ... on MediaImage {
            id
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          image {
            id
            url
            altText
            width
            height
          }
          variantProfile: metafield(namespace: "bridgeFor", key: "Varianthandler") {
            reference {
              __typename
              ... on Metaobject {
                images: field(key: "images") {
                  value
                }
                subtitle: field(key: "subtitle") {
                  value
                }
                materials: field(key: "materials") {
                  value
                }
                functions: field(key: "functions") {
                  value
                }
                properties: field(key: "properties") {
                  value
                }
                usage: field(key: "usage") {
                  value
                }
                sizeFit: field(key: "size_fit") {
                  value
                }
                storageAndMaintenance: field(key: "storage_and_maintenance") {
                  value
                }
                colorLabel: field(key: "color_label") {
                  value
                }
                backgroundColor: field(key: "background_color") {
                  value
                }
                swatchHexcolorForVariant: field(key: "swatch_hexcolor_for_variant") {
                  value
                }
                length: field(key: "length") {
                  value
                }
                centerToWrist: field(key: "center_to_wrist") {
                  value
                }
                flatWidth: field(key: "flat_width") {
                  value
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;

export const useGetProductByHandleQuery = <
  TData = GetProductByHandleQuery,
  TError = unknown,
>(
  variables: GetProductByHandleQueryVariables,
  options?: Omit<
    UseQueryOptions<GetProductByHandleQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      GetProductByHandleQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useQuery<GetProductByHandleQuery, TError, TData>({
    queryKey: ["GetProductByHandle", variables],
    queryFn: ShopifyRequestClient<
      GetProductByHandleQuery,
      GetProductByHandleQueryVariables
    >(GetProductByHandleDocument, variables),
    ...options,
  });
};

useGetProductByHandleQuery.getKey = (
  variables: GetProductByHandleQueryVariables
) => ["GetProductByHandle", variables];

export const useInfiniteGetProductByHandleQuery = <
  TData = InfiniteData<GetProductByHandleQuery>,
  TError = unknown,
>(
  variables: GetProductByHandleQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetProductByHandleQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetProductByHandleQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetProductByHandleQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["GetProductByHandle.infinite", variables],
        queryFn: (metaData) =>
          ShopifyRequestClient<
            GetProductByHandleQuery,
            GetProductByHandleQueryVariables
          >(GetProductByHandleDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetProductByHandleQuery.getKey = (
  variables: GetProductByHandleQueryVariables
) => ["GetProductByHandle.infinite", variables];
