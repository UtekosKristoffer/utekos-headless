import LineItem from "@/Actions/Cart/Interfaces/LineItem";
import CartFragment from "../Fragments/CartFragment";

import shopifyCartFetch from "../Fetches/shopifyCartFetch";

async function addItemToExistingCart(
  cartId: string,
  lineItem: LineItem
): Promise<Cart> {
  const query = `
    mutation addLinesToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ...CompleteCart } }
    }
    ${CartFragment}
  `;

  const res = await shopifyCartFetch<{ cartLinesAdd: { cart: Cart } }>({
    query,
    variables: { cartId, lines: [lineItem] },
  });

  return res.cartLinesAdd.cart;
}

export default addItemToExistingCart;
