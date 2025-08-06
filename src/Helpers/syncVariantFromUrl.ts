function syncVariantFromUrl(
  searchParams: URLSearchParams,
  allVariants: ShopifyProductVariant[],
  setVariant: (variant: ShopifyProductVariant) => void
) {
  const id = searchParams.get("variant");
  if (!id) return;

  const matched = allVariants.find((v) => v.id === id);
  if (matched) setVariant(matched);
}

export default syncVariantFromUrl;
