import CartLineUpdateInput from "@/Actions/Cart/Interfaces/CartLineUpdateInput";
import CartFragment from "../Fragments/CartFragment";

import shopifyCartFetch from "../Fetches/shopifyCartFetch";

async function updateCartLines(
  cartId: string,
  lines: CartLineUpdateInput[]
): Promise<Cart | null> {
  if (!cartId || !lines.length) {
    return null;
  }

  const query = `
    mutation Lines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ...CompleteCart } }
    }
    ${CartFragment}
  `;

  try {
    const res = await shopifyCartFetch<{
      cartLinesUpdate: { cart: Cart };
    }>({ query, variables: { cartId, lines } });

    return res.cartLinesUpdate.cart;
  } catch (error) {
    console.error("Error updating cart lines:", error);
    return null;
  }
}

export default updateCartLines;
