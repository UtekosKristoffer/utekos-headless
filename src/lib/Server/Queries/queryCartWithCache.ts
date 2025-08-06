import shopifyCartFetch from "../Fetches/shopifyCartFetch";
import CartFragment from "../Fragments/CartFragment";
import getCacheTagsForCart from "@/Actions/Cart/Helpers/getCacheTagsForCart";

/**
 * Henter en eksisterende handlekurv med cache tagging
 */
async function queryCartWithCache(cartId: string): Promise<Cart | null> {
  if (!cartId) {
    return null;
  }
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) { ...CompleteCart }
    }
    ${CartFragment}
  `;

  try {
    const res = await shopifyCartFetch<{ cart: Cart | null }>({
      query,
      variables: { cartId },
      tags: getCacheTagsForCart(cartId),
    });
    return res.cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}

export default queryCartWithCache;
