import type * as Types from "@/Types/types";

export type CompleteCartFragment = {
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
};

export const CompleteCartFragmentDoc = `
    fragment CompleteCart on Cart {
  id
  createdAt
  updatedAt
  checkoutUrl
  discountCodes {
    applicable
    code
  }
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
  buyerIdentity {
    customer {
      displayName
      firstName
      lastName
      email
      phone
      defaultAddress {
        address1
        address2
        city
      }
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
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
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
