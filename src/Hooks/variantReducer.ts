import flattenVariants from "@/Helpers/flattenVariants";
import selectVariantByOptions from "@/Lib/Variants/selectVariantsByOptions";

// Type for state
export type VariantState =
  | { status: "idle" }
  | { status: "selected"; variant: ShopifyProductVariant }
  | { status: "notfound" }
  | { status: "error"; message: string };

// Type for events
export type VariantEvent =
  | { type: "init"; product: ShopifyProduct }
  | { type: "updateFromOptions"; optionName: string; value: string }
  | { type: "syncFromId"; id: string | null }
  | { type: "reset" }
  | { type: "error"; message: string };

// Ren, sideeffektfri funksjon
export function variantReducer(
  state: VariantState,
  event: VariantEvent,
  product: ShopifyProduct
): VariantState {
  switch (event.type) {
    case "init": {
      const all = flattenVariants(event.product);
      const first =
        selectVariantByOptions(event.product, null, null, null) ?? all[0];
      return first
        ? { status: "selected", variant: first }
        : { status: "notfound" };
    }
    case "updateFromOptions": {
      if (state.status !== "selected") return state;
      const newVariant = selectVariantByOptions(
        product,
        state.variant,
        event.optionName,
        event.value
      );
      return newVariant
        ? { status: "selected", variant: newVariant }
        : { status: "notfound" };
    }
    case "syncFromId": {
      const all = flattenVariants(product);
      const found = all.find((v) => v.id === event.id);
      return found
        ? { status: "selected", variant: found }
        : { status: "notfound" };
    }
    case "reset":
      return { status: "idle" };
    case "error":
      return { status: "error", message: event.message };
    default:
      return state;
  }
}
