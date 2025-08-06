import LineItem from "./Interfaces/LineItem";
import CartFragment from "@/Lib/Server/Fragments/CartFragment";
import shopifyCartFetch from "@/Lib/Server/Fetches/shopifyCartFetch";

async function createCartWithItem(lineItem: LineItem): Promise<Cart> {
  const query = `
    mutation cartCreateWithLines($input: CartInput!) {
      cartCreate(input: $input) { cart { ...CompleteCart } }
    }
    ${CartFragment}
  `;

  const res = await shopifyCartFetch<{ cartCreate: { cart: Cart } }>({
    query,
    variables: { input: { lines: [lineItem] } },
  });

  return res.cartCreate.cart;
}

export default createCartWithItem;
