import type * as Types from "@/Types/types";

import { CompleteCartFragmentDoc } from "../Fragments/CartFragment.generated";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { ShopifyRequestClient } from "@/Lib/Clients/ShopifyRequestClient";
export type CartCreateMutationVariables = Types.Exact<{
  input: Types.CartInput;
}>;

export type CartCreateMutation = {
  __typename?: "Mutation";
  cartCreate?: {
    __typename?: "CartCreatePayload";
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
    userErrors: Array<{
      __typename?: "CartUserError";
      field?: Array<string> | null;
      message: string;
    }>;
  } | null;
};

export type CartLinesAddMutationVariables = Types.Exact<{
  cartId: Types.Scalars["ID"]["input"];
  lines: Array<Types.CartLineInput> | Types.CartLineInput;
}>;

export type CartLinesAddMutation = {
  __typename?: "Mutation";
  cartLinesAdd?: {
    __typename?: "CartLinesAddPayload";
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
    userErrors: Array<{
      __typename?: "CartUserError";
      field?: Array<string> | null;
      message: string;
    }>;
  } | null;
};

export type CartLinesUpdateMutationVariables = Types.Exact<{
  cartId: Types.Scalars["ID"]["input"];
  lines: Array<Types.CartLineUpdateInput> | Types.CartLineUpdateInput;
}>;

export type CartLinesUpdateMutation = {
  __typename?: "Mutation";
  cartLinesUpdate?: {
    __typename?: "CartLinesUpdatePayload";
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
    userErrors: Array<{
      __typename?: "CartUserError";
      field?: Array<string> | null;
      message: string;
    }>;
  } | null;
};

export type CartLinesRemoveMutationVariables = Types.Exact<{
  cartId: Types.Scalars["ID"]["input"];
  lineIds: Array<Types.Scalars["ID"]["input"]> | Types.Scalars["ID"]["input"];
}>;

export type CartLinesRemoveMutation = {
  __typename?: "Mutation";
  cartLinesRemove?: {
    __typename?: "CartLinesRemovePayload";
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
    userErrors: Array<{
      __typename?: "CartUserError";
      field?: Array<string> | null;
      message: string;
    }>;
  } | null;
};

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
  >
) => {
  return useMutation<
    CartCreateMutation,
    TError,
    CartCreateMutationVariables,
    TContext
  >({
    mutationKey: ["cartCreate"],
    mutationFn: (variables?: CartCreateMutationVariables) =>
      ShopifyRequestClient<CartCreateMutation, CartCreateMutationVariables>(
        CartCreateDocument,
        variables
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
  >
) => {
  return useMutation<
    CartLinesAddMutation,
    TError,
    CartLinesAddMutationVariables,
    TContext
  >({
    mutationKey: ["cartLinesAdd"],
    mutationFn: (variables?: CartLinesAddMutationVariables) =>
      ShopifyRequestClient<CartLinesAddMutation, CartLinesAddMutationVariables>(
        CartLinesAddDocument,
        variables
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
  >
) => {
  return useMutation<
    CartLinesUpdateMutation,
    TError,
    CartLinesUpdateMutationVariables,
    TContext
  >({
    mutationKey: ["cartLinesUpdate"],
    mutationFn: (variables?: CartLinesUpdateMutationVariables) =>
      ShopifyRequestClient<
        CartLinesUpdateMutation,
        CartLinesUpdateMutationVariables
      >(CartLinesUpdateDocument, variables)(),
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
  >
) => {
  return useMutation<
    CartLinesRemoveMutation,
    TError,
    CartLinesRemoveMutationVariables,
    TContext
  >({
    mutationKey: ["cartLinesRemove"],
    mutationFn: (variables?: CartLinesRemoveMutationVariables) =>
      ShopifyRequestClient<
        CartLinesRemoveMutation,
        CartLinesRemoveMutationVariables
      >(CartLinesRemoveDocument, variables)(),
    ...options,
  });
};

useCartLinesRemoveMutation.getKey = () => ["cartLinesRemove"];
