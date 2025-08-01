// Fil: src/lib/shopify/queries/searchProducts.ts

// --- STEG 1: Importer fra den NYE admin-klienten ---
import { adminShopifyFetch } from "../adminClient";
import type { ShopifyProduct } from "@/types/shopify";

/**
 * Søker etter produkter basert på en tekststreng ved å bruke Admin API.
 * @param {string} query - Teksten som skal søkes etter.
 * @returns {Promise<ShopifyProduct[]>} En liste med matchende produkter.
 */
export async function searchProducts(query: string): Promise<ShopifyProduct[]> {
  const searchQuery = `title:*${query}*`;

  const productsQuery = `
    query searchProducts($query: String!) {
      products(first: 5, query: $query) {
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

  try {
    // --- STEG 2: Kall den NYE adminShopifyFetch ---
    const response = await adminShopifyFetch({
      query: productsQuery,
      variables: { query: searchQuery },
    });

    return response?.data?.products?.edges?.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error("Failed to search products using Admin API:", error);
    return [];
  }
}
