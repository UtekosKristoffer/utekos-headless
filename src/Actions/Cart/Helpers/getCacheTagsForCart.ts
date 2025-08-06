function getCacheTagsForCart(cartId: string): string[] {
  return [`cart-${cartId}`, "cart"];
}

export default getCacheTagsForCart;
