"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Route } from "next";
import useVariantState from "@/Hooks/useVariantState";
import ProductPageView from "./ProductPageView";
import computeVariantImages from "@/Helpers/computeVariantImages";

type Props = {
  product: ShopifyProduct;
};

function ProductPageClient({ product }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { variantState, updateVariant, allVariants, syncVariantFromId } =
    useVariantState(product);

  useEffect(() => {
    const variantId = searchParams.get("variant");
    syncVariantFromId(variantId);
  }, [searchParams, syncVariantFromId]);

  useEffect(() => {
    if (variantState.status === "selected") {
      const params = new URLSearchParams();
      params.set("variant", variantState.variant.id);
      router.replace(`${pathname}?${params.toString()}` as Route, {
        scroll: false,
      });
    }
  }, [variantState, router, pathname]);

  const selectedVariant =
    variantState.status === "selected" ? variantState.variant : null;

  const variantImages = computeVariantImages(product, selectedVariant);

  if (!selectedVariant) {
    return (
      <div className="container mx-auto p-8 text-center">Velger variant...</div>
    );
  }

  return (
    <ProductPageView
      product={product}
      selectedVariant={selectedVariant}
      allVariants={allVariants}
      variantImages={variantImages}
      onOptionChange={updateVariant}
    />
  );
}

export default ProductPageClient;
