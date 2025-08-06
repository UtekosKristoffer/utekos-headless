import CartFragment from "../Fragments/CartFragment";
import shopifyCartFetch from "../Fetches/shopifyCartFetch";
import LineItem from "@/Actions/Cart/Interfaces/LineItem";

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
    // Mutations trenger ikke cache tags siden de endrer data
  });

  return res.cartCreate.cart;
}

export default createCartWithItem;
