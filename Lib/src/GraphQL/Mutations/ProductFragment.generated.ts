import type * as Types from "@/Types/types";

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
