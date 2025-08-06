// types/cart.ts
export type CartStatus = "idle" | "loading" | "success" | "error";

export type CartEvent =
  | { type: "fetchCart" }
  | { type: "cartLoaded"; cart: Cart }
  | { type: "cartCleared" }
  | { type: "cartUpdated"; cart: Cart }
  | { type: "error"; message: string };

export type CartState = {
  status: CartStatus;
  cart: Cart | null;
  error?: string;
  isDrawerOpen: boolean;
};
