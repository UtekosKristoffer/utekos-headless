// src/lib/shopify/queries/getProductsByHandles.ts
import { shopifyFetch } from "../client";
import type { ShopifyProduct } from "@/types/shopify";

/**
 * Henter en liste med spesifikke produkter basert på en liste med handles.
 * Bruker en 'query' i søk for å hente flere samtidig.
 * @param {string[]} handles - En array med produkt-handles.
 * @returns {Promise<ShopifyProduct[]>} En liste med produkter, eller en tom liste.
 */
export async function getProductsByHandles(
  handles: string[]
): Promise<ShopifyProduct[]> {
  // Bygg en søkestreng som Shopify forstår, f.eks. "handle:produkt-a OR handle:produkt-b"
  const searchQuery = handles.map((handle) => `handle:${handle}`).join(" OR ");

  const productsQuery = `
    query getSpecificProducts($query: String!) {
      products(first: ${handles.length}, query: $query) {
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
      variables: { query: searchQuery },
    });

    // Gå gjennom datastrukturen for å hente ut produktnodene
    const productNodes =
      response?.data?.products?.edges.map(
        (edge: { node: ShopifyProduct }) => edge.node
      ) || [];
    return productNodes;
  } catch (error) {
    console.error("Failed to fetch products by handles:", error);
    return []; // Returner alltid en array for å unngå feil i komponenten
  }
}
