import shopifyFetch from "../shopifyFetch";

/**
 * Henter en meny fra Shopify basert på dens handle.
 * @param {string} handle - Handle for menyen du vil hente
 * @returns {Promise<MenuItem[] | null>}
 */

async function getMenu(handle: string): Promise<MenuItem[] | null> {
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

export default getMenu;
