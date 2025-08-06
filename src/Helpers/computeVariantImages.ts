import safeJsonParse from "@/Helpers/safeJsonParse";

function computeVariantImages(
  product: ShopifyProduct,
  variant: ShopifyProductVariant | null
): ShopifyMediaImage[] {
  if (!variant || !product.media) return [];

  const imagesJson = variant.variantProfile?.reference?.images?.value;
  const gids = safeJsonParse<string[]>(imagesJson, []);
  const all = product.media.edges.map((e) => e.node);

  if (gids.length > 0) {
    return all.filter((m) => gids.includes(m.id));
  }

  const fallback = all.find((m) => m.image.url === variant.image?.url);
  return fallback ? [fallback] : [];
}

export default computeVariantImages;
