// src/lib/shopify/queries/getMenu.ts
import { shopifyFetch } from "../client";
import { MenuItem } from "@/types/shopify";

/**
 * Henter en meny fra Shopify basert på dens handle.
 * @param {string} handle - Handle for menyen du vil hente
 * @returns {Promise<MenuItem[] | null>}
 */

export async function getMenu(handle: string): Promise<MenuItem[] | null> {
  const menuQuery = `
    query getMenu($handle: String!) {
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

  try {
    const response = await shopifyFetch({
      query: menuQuery,
      variables: { handle },
    });

    if (!response) return null;

    return response?.data?.menu?.items || [];
  } catch (error) {
    console.error("Failed to fetch menu:", error);
    return null;
  }
}
