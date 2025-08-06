"use server";

import LineItem from "@/Actions/Cart/Interfaces/LineItem";
import createCartWithItem from "./createCart";
import addItemToExistingCart from "@/Lib/Server/Queries/addItemToExistingCart";

async function addItemToCart(
  cartId: string | undefined,
  variantId: string,
  quantity: number = 1
): Promise<Cart> {
  const lineItem: LineItem = { merchandiseId: variantId, quantity };

  if (cartId) {
    return addItemToExistingCart(cartId, lineItem);
  } else {
    return createCartWithItem(lineItem);
  }
}

export default addItemToCart;
