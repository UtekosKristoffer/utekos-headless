import shopifyFetch from "../shopifyFetch";

/**
 * Henter en liste med spesifikke produkter basert på en liste med handles.
 * Bruker en 'query' i søk for å hente flere samtidig.
 * @param {string[]} handles - En array med produkt-handles.
 * @returns {Promise<ShopifyProduct[]>} En liste med produkter, eller en tom liste.
 */

async function getProductsByHandles(
  handles: string[]
): Promise<ShopifyProduct[]> {
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

    const productNodes =
      response?.data?.products?.edges.map(
        (edge: { node: ShopifyProduct }) => edge.node
      ) || [];
    return productNodes;
  } catch (error) {
    console.error("Failed to fetch products by handles:", error);
    return [];
  }
}

export default getProductsByHandles;
