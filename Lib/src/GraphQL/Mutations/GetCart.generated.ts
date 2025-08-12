import type * as Types from "@/Types/types";

import { CompleteCartFragmentDoc } from "../Fragments/CartFragment.generated";
import {
  useQuery,
  useInfiniteQuery,
  type UseQueryOptions,
  type UseInfiniteQueryOptions,
  type InfiniteData,
} from "@tanstack/react-query";
import { ShopifyRequestClient } from "@/Lib/Clients/ShopifyRequestClient";
export type GetCartQueryVariables = Types.Exact<{
  cartId: Types.Scalars["ID"]["input"];
}>;

export type GetCartQuery = {
  __typename?: "QueryRoot";
  cart?: {
    __typename?: "Cart";
    id: string;
    createdAt: any;
    updatedAt: any;
    checkoutUrl: any;
    totalQuantity: number;
    discountCodes: Array<{
      __typename?: "CartDiscountCode";
      applicable: boolean;
      code: string;
    }>;
    cost: {
      __typename?: "CartCost";
      totalAmount: {
        __typename?: "MoneyV2";
        amount: any;
        currencyCode: Types.CurrencyCode;
      };
      subtotalAmount: {
        __typename?: "MoneyV2";
        amount: any;
        currencyCode: Types.CurrencyCode;
      };
      totalTaxAmount?: {
        __typename?: "MoneyV2";
        amount: any;
        currencyCode: Types.CurrencyCode;
      } | null;
      totalDutyAmount?: {
        __typename?: "MoneyV2";
        amount: any;
        currencyCode: Types.CurrencyCode;
      } | null;
    };
    buyerIdentity: {
      __typename?: "CartBuyerIdentity";
      customer?: {
        __typename?: "Customer";
        displayName: string;
        firstName?: string | null;
        lastName?: string | null;
        email?: string | null;
        phone?: string | null;
        defaultAddress?: {
          __typename?: "MailingAddress";
          address1?: string | null;
          address2?: string | null;
          city?: string | null;
        } | null;
      } | null;
    };
    attributes: Array<{
      __typename?: "Attribute";
      key: string;
      value?: string | null;
    }>;
    lines: {
      __typename?: "BaseCartLineConnection";
      edges: Array<{
        __typename?: "BaseCartLineEdge";
        node:
          | {
              __typename?: "CartLine";
              id: string;
              quantity: number;
              merchandise: {
                __typename?: "ProductVariant";
                id: string;
                title: string;
                price: {
                  __typename?: "MoneyV2";
                  amount: any;
                  currencyCode: Types.CurrencyCode;
                };
                compareAtPrice?: {
                  __typename?: "MoneyV2";
                  amount: any;
                  currencyCode: Types.CurrencyCode;
                } | null;
                selectedOptions: Array<{
                  __typename?: "SelectedOption";
                  name: string;
                  value: string;
                }>;
                product: {
                  __typename?: "Product";
                  title: string;
                  handle: string;
                  featuredImage?: {
                    __typename?: "Image";
                    url: any;
                    altText?: string | null;
                  } | null;
                };
              };
            }
          | {
              __typename?: "ComponentizableCartLine";
              id: string;
              quantity: number;
              merchandise: {
                __typename?: "ProductVariant";
                id: string;
                title: string;
                price: {
                  __typename?: "MoneyV2";
                  amount: any;
                  currencyCode: Types.CurrencyCode;
                };
                compareAtPrice?: {
                  __typename?: "MoneyV2";
                  amount: any;
                  currencyCode: Types.CurrencyCode;
                } | null;
                selectedOptions: Array<{
                  __typename?: "SelectedOption";
                  name: string;
                  value: string;
                }>;
                product: {
                  __typename?: "Product";
                  title: string;
                  handle: string;
                  featuredImage?: {
                    __typename?: "Image";
                    url: any;
                    altText?: string | null;
                  } | null;
                };
              };
            };
      }>;
    };
  } | null;
};

export const GetCartDocument = `
    query getCart($cartId: ID!) {
  cart(id: $cartId) {
    ...CompleteCart
  }
}
    ${CompleteCartFragmentDoc}`;

export const useGetCartQuery = <TData = GetCartQuery, TError = unknown>(
  variables: GetCartQueryVariables,
  options?: Omit<UseQueryOptions<GetCartQuery, TError, TData>, "queryKey"> & {
    queryKey?: UseQueryOptions<GetCartQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetCartQuery, TError, TData>({
    queryKey: ["getCart", variables],
    queryFn: ShopifyRequestClient<GetCartQuery, GetCartQueryVariables>(
      GetCartDocument,
      variables
    ),
    ...options,
  });
};

useGetCartQuery.getKey = (variables: GetCartQueryVariables) => [
  "getCart",
  variables,
];

export const useInfiniteGetCartQuery = <
  TData = InfiniteData<GetCartQuery>,
  TError = unknown,
>(
  variables: GetCartQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetCartQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<GetCartQuery, TError, TData>["queryKey"];
  }
) => {
  return useInfiniteQuery<GetCartQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["getCart.infinite", variables],
        queryFn: (metaData) =>
          ShopifyRequestClient<GetCartQuery, GetCartQueryVariables>(
            GetCartDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetCartQuery.getKey = (variables: GetCartQueryVariables) => [
  "getCart.infinite",
  variables,
];
