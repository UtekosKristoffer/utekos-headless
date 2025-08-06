function selectVariantByOptions(
  product: ShopifyProduct,
  current: ShopifyProductVariant | null,
  optionName: string | null,
  value: string | null
): ShopifyProductVariant | null {
  const allVariants = product.variants.edges.map((e) => e.node);

  if (!optionName || !value) {
    return allVariants[0] ?? null;
  }

  const newOptions = new Map<string, string>();
  current?.selectedOptions.forEach((opt) =>
    newOptions.set(opt.name, opt.value)
  );
  newOptions.set(optionName, value);

  const newVariant = allVariants.find((variant) =>
    Array.from(newOptions.entries()).every(([key, val]) =>
      variant.selectedOptions.some(
        (opt) => opt.name === key && opt.value === val
      )
    )
  );

  return newVariant ?? null;
}

export default selectVariantByOptions;
