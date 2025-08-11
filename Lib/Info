
export type CompleteCartFragment = {
  __typename?: "Cart";
  id: string;
  checkoutUrl: any;
  totalQuantity: number;
  cost: {
    __typename?: "CartCost";
    totalAmount: {
      __typename?: "MoneyV2";
      amount: any;
      currencyCode: CurrencyCode;
    };
    subtotalAmount: {
      __typename?: "MoneyV2";
      amount: any;
      currencyCode: CurrencyCode;
    };
    totalTaxAmount?: {
      __typename?: "MoneyV2";
      amount: any;
      currencyCode: CurrencyCode;
    } | null;
    totalDutyAmount?: {
      __typename?: "MoneyV2";
      amount: any;
      currencyCode: CurrencyCode;
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
                currencyCode: CurrencyCode;
              };
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
                currencyCode: CurrencyCode;
              };
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
};

export type ProductFragment = {
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
      currencyCode: CurrencyCode;
    };
  };
  compareAtPriceRange: {
    __typename?: "ProductPriceRange";
    maxVariantPrice: {
      __typename?: "MoneyV2";
      amount: any;
      currencyCode: CurrencyCode;
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

export type CartCreateMutationVariables = Exact<{
  input: CartInput;
}>;

export type CartCreateMutation = {
  __typename?: "Mutation";
  cartCreate?: {
    __typename?: "CartCreatePayload";
    cart?: {
      __typename?: "Cart";
      id: string;
      checkoutUrl: any;
      totalQuantity: number;
      cost: {
        __typename?: "CartCost";
        totalAmount: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: CurrencyCode;
        };
        subtotalAmount: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: CurrencyCode;
        };
        totalTaxAmount?: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: CurrencyCode;
        } | null;
        totalDutyAmount?: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: CurrencyCode;
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
                    currencyCode: CurrencyCode;
                  };
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
                    currencyCode: CurrencyCode;
                  };
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
    userErrors: Array<{
      __typename?: "CartUserError";
      field?: Array<string> | null;
      message: string;
    }>;
  } | null;
};

export type CartLinesAddMutationVariables = Exact<{
  cartId: Scalars["ID"]["input"];
  lines: Array<CartLineInput> | CartLineInput;
}>;

export type CartLinesAddMutation = {
  __typename?: "Mutation";
  cartLinesAdd?: {
    __typename?: "CartLinesAddPayload";
    cart?: {
      __typename?: "Cart";
      id: string;
      checkoutUrl: any;
      totalQuantity: number;
      cost: {
        __typename?: "CartCost";
        totalAmount: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: CurrencyCode;
        };
        subtotalAmount: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: CurrencyCode;
        };
        totalTaxAmount?: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: CurrencyCode;
        } | null;
        totalDutyAmount?: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: CurrencyCode;
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
                    currencyCode: CurrencyCode;
                  };
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
                    currencyCode: CurrencyCode;
                  };
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
    userErrors: Array<{
      __typename?: "CartUserError";
      field?: Array<string> | null;
      message: string;
    }>;
  } | null;
};

export type CartLinesUpdateMutationVariables = Exact<{
  cartId: Scalars["ID"]["input"];
  lines: Array<CartLineUpdateInput> | CartLineUpdateInput;
}>;

export type CartLinesUpdateMutation = {
  __typename?: "Mutation";
  cartLinesUpdate?: {
    __typename?: "CartLinesUpdatePayload";
    cart?: {
      __typename?: "Cart";
      id: string;
      checkoutUrl: any;
      totalQuantity: number;
      cost: {
        __typename?: "CartCost";
        totalAmount: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: CurrencyCode;
        };
        subtotalAmount: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: CurrencyCode;
        };
        totalTaxAmount?: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: CurrencyCode;
        } | null;
        totalDutyAmount?: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: CurrencyCode;
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
                    currencyCode: CurrencyCode;
                  };
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
                    currencyCode: CurrencyCode;
                  };
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
    userErrors: Array<{
      __typename?: "CartUserError";
      field?: Array<string> | null;
      message: string;
    }>;
  } | null;
};

export type CartLinesRemoveMutationVariables = Exact<{
  cartId: Scalars["ID"]["input"];
  lineIds: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type CartLinesRemoveMutation = {
  __typename?: "Mutation";
  cartLinesRemove?: {
    __typename?: "CartLinesRemovePayload";
    cart?: {
      __typename?: "Cart";
      id: string;
      checkoutUrl: any;
      totalQuantity: number;
      cost: {
        __typename?: "CartCost";
        totalAmount: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: CurrencyCode;
        };
        subtotalAmount: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: CurrencyCode;
        };
        totalTaxAmount?: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: CurrencyCode;
        } | null;
        totalDutyAmount?: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: CurrencyCode;
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
                    currencyCode: CurrencyCode;
                  };
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
                    currencyCode: CurrencyCode;
                  };
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
    userErrors: Array<{
      __typename?: "CartUserError";
      field?: Array<string> | null;
      message: string;
    }>;
  } | null;
};

export type GetMenuQueryVariables = Exact<{
  handle: Scalars["String"]["input"];
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

export type GetProductByHandleQueryVariables = Exact<{
  handle: Scalars["String"]["input"];
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
        currencyCode: CurrencyCode;
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
            currencyCode: CurrencyCode;
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

export type GetProductsQueryVariables = Exact<{
  first: Scalars["Int"]["input"];
  query?: InputMaybe<Scalars["String"]["input"]>;
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
            currencyCode: CurrencyCode;
          };
        };
        compareAtPriceRange: {
          __typename?: "ProductPriceRange";
          maxVariantPrice: {
            __typename?: "MoneyV2";
            amount: any;
            currencyCode: CurrencyCode;
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

export type SearchProductsQueryVariables = Exact<{
  query: Scalars["String"]["input"];
  first?: InputMaybe<Scalars["Int"]["input"]>;
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
            currencyCode: CurrencyCode;
          };
        };
      };
    }>;
  };
};

export const CompleteCartFragmentDoc = `
    fragment CompleteCart on Cart {
  id
  checkoutUrl
  totalQuantity
  cost {
    totalAmount {
      amount
      currencyCode
    }
    subtotalAmount {
      amount
      currencyCode
    }
    totalTaxAmount {
      amount
      currencyCode
    }
    totalDutyAmount {
      amount
      currencyCode
    }
  }
  attributes {
    key
    value
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price {
              amount
              currencyCode
            }
            product {
              title
              handle
              featuredImage {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const ProductFragmentDoc = `
    fragment Product on Product {
  id
  title
  handle
  featuredImage {
    url
    altText
    width
    height
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  compareAtPriceRange {
    maxVariantPrice {
      amount
      currencyCode
    }
  }
  variants(first: 1) {
    edges {
      node {
        id
        availableForSale
      }
    }
  }
}
    `;
export const CartCreateDocument = `
    mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      ...CompleteCart
    }
    userErrors {
      field
      message
    }
  }
}
    ${CompleteCartFragmentDoc}`;

export const useCartCreateMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CartCreateMutation,
    TError,
    CartCreateMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    CartCreateMutation,
    TError,
    CartCreateMutationVariables,
    TContext
  >({
    mutationKey: ["cartCreate"],
    mutationFn: (variables?: CartCreateMutationVariables) =>
      Fetcher<CartCreateMutation, CartCreateMutationVariables>(
        CartCreateDocument,
        variables,
      )(),
    ...options,
  });
};

useCartCreateMutation.getKey = () => ["cartCreate"];

export const CartLinesAddDocument = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      ...CompleteCart
    }
    userErrors {
      field
      message
    }
  }
}
    ${CompleteCartFragmentDoc}`;

export const useCartLinesAddMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CartLinesAddMutation,
    TError,
    CartLinesAddMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    CartLinesAddMutation,
    TError,
    CartLinesAddMutationVariables,
    TContext
  >({
    mutationKey: ["cartLinesAdd"],
    mutationFn: (variables?: CartLinesAddMutationVariables) =>
      Fetcher<CartLinesAddMutation, CartLinesAddMutationVariables>(
        CartLinesAddDocument,
        variables,
      )(),
    ...options,
  });
};

useCartLinesAddMutation.getKey = () => ["cartLinesAdd"];

export const CartLinesUpdateDocument = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      ...CompleteCart
    }
    userErrors {
      field
      message
    }
  }
}
    ${CompleteCartFragmentDoc}`;

export const useCartLinesUpdateMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    CartLinesUpdateMutation,
    TError,
    CartLinesUpdateMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    CartLinesUpdateMutation,
    TError,
    CartLinesUpdateMutationVariables,
    TContext
  >({
    mutationKey: ["cartLinesUpdate"],
    mutationFn: (variables?: CartLinesUpdateMutationVariables) =>
      Fetcher<CartLinesUpdateMutation, CartLinesUpdateMutationVariables>(
        CartLinesUpdateDocument,
        variables,
      )(),
    ...options,
  });
};

useCartLinesUpdateMutation.getKey = () => ["cartLinesUpdate"];

export const CartLinesRemoveDocument = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      ...CompleteCart
    }
    userErrors {
      field
      message
    }
  }
}
    ${CompleteCartFragmentDoc}`;

export const useCartLinesRemoveMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    CartLinesRemoveMutation,
    TError,
    CartLinesRemoveMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    CartLinesRemoveMutation,
    TError,
    CartLinesRemoveMutationVariables,
    TContext
  >({
    mutationKey: ["cartLinesRemove"],
    mutationFn: (variables?: CartLinesRemoveMutationVariables) =>
      Fetcher<CartLinesRemoveMutation, CartLinesRemoveMutationVariables>(
        CartLinesRemoveDocument,
        variables,
      )(),
    ...options,
  });
};

useCartLinesRemoveMutation.getKey = () => ["cartLinesRemove"];

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
  },
) => {
  return useQuery<GetMenuQuery, TError, TData>({
    queryKey: ["GetMenu", variables],
    queryFn: Fetcher<GetMenuQuery, GetMenuQueryVariables>(
      GetMenuDocument,
      variables,
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
  },
) => {
  return useInfiniteQuery<GetMenuQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["GetMenu.infinite", variables],
        queryFn: (metaData) =>
          Fetcher<GetMenuQuery, GetMenuQueryVariables>(GetMenuDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

useInfiniteGetMenuQuery.getKey = (variables: GetMenuQueryVariables) => [
  "GetMenu.infinite",
  variables,
];

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
  },
) => {
  return useQuery<GetProductByHandleQuery, TError, TData>({
    queryKey: ["GetProductByHandle", variables],
    queryFn: Fetcher<GetProductByHandleQuery, GetProductByHandleQueryVariables>(
      GetProductByHandleDocument,
      variables,
    ),
    ...options,
  });
};

useGetProductByHandleQuery.getKey = (
  variables: GetProductByHandleQueryVariables,
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
  },
) => {
  return useInfiniteQuery<GetProductByHandleQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["GetProductByHandle.infinite", variables],
        queryFn: (metaData) =>
          Fetcher<GetProductByHandleQuery, GetProductByHandleQueryVariables>(
            GetProductByHandleDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      };
    })(),
  );
};

useInfiniteGetProductByHandleQuery.getKey = (
  variables: GetProductByHandleQueryVariables,
) => ["GetProductByHandle.infinite", variables];

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
  },
) => {
  return useQuery<GetProductsQuery, TError, TData>({
    queryKey: ["GetProducts", variables],
    queryFn: Fetcher<GetProductsQuery, GetProductsQueryVariables>(
      GetProductsDocument,
      variables,
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
  },
) => {
  return useInfiniteQuery<GetProductsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["GetProducts.infinite", variables],
        queryFn: (metaData) =>
          Fetcher<GetProductsQuery, GetProductsQueryVariables>(
            GetProductsDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      };
    })(),
  );
};

useInfiniteGetProductsQuery.getKey = (variables: GetProductsQueryVariables) => [
  "GetProducts.infinite",
  variables,
];

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
  },
) => {
  return useQuery<SearchProductsQuery, TError, TData>({
    queryKey: ["SearchProducts", variables],
    queryFn: Fetcher<SearchProductsQuery, SearchProductsQueryVariables>(
      SearchProductsDocument,
      variables,
    ),
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
  },
) => {
  return useInfiniteQuery<SearchProductsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["SearchProducts.infinite", variables],
        queryFn: (metaData) =>
          Fetcher<SearchProductsQuery, SearchProductsQueryVariables>(
            SearchProductsDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      };
    })(),
  );
};

useInfiniteSearchProductsQuery.getKey = (
  variables: SearchProductsQueryVariables,
) => ["SearchProducts.infinite", variables];
