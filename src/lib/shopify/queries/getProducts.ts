// src/lib/shopify/queries/getProducts.ts
import { shopifyFetch } from "../client";
import type { ShopifyProduct } from "@/types/shopify";

/**
 * Henter en liste med produkter for forsiden/katalog.
 * @returns {Promise<ShopifyProduct[] | null>}
 */

export async function getProducts(): Promise<ShopifyProduct[] | null> {
  const productsQuery = `
    query getProducts {
      products(first: 10) {
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
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({
      query: productsQuery,
      variables: {},
    });

    if (!response) return null;

    return response.data?.products?.edges?.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return null;
  }
}
