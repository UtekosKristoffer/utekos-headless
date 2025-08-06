function flattenVariants(product: ShopifyProduct): ShopifyProductVariant[] {
  return product.variants.edges.map((e) => e.node);
}

export default flattenVariants;
