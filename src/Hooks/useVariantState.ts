import { useEffect, useReducer } from "react";
import {
  variantReducer,
  VariantState,
  VariantEvent,
} from "@/Hooks/variantReducer";
import flattenVariants from "@/Helpers/flattenVariants";

function useVariantState(product: ShopifyProduct) {
  const [variantState, dispatch] = useReducer(
    (state: VariantState, event: VariantEvent) =>
      variantReducer(state, event, product),
    { status: "idle" }
  );

  const allVariants = flattenVariants(product);

  useEffect(() => {
    if (variantState.status === "idle" && allVariants.length > 0) {
      dispatch({ type: "syncFromId", id: allVariants[0].id });
    }
  }, [variantState.status, allVariants]);

  function updateVariant(optionName: string, value: string) {
    dispatch({ type: "updateFromOptions", optionName, value });
  }

  function syncVariantFromId(id: string | null) {
    dispatch({ type: "syncFromId", id });
  }

  return {
    variantState,
    updateVariant,
    allVariants,
    syncVariantFromId,
    dispatch,
  };
}

export default useVariantState;
