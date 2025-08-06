"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import type { CartState, CartEvent } from "@/Types/cart";
import clearCartAction from "@/Actions/Cart/clearCart";
import getCartFromCookies from "@/Actions/Cart/Helpers/getCartFromCookies";

const CartContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<
  ((event: CartEvent) => void) | undefined
>(undefined);

function cartReducer(state: CartState, event: CartEvent): CartState {
  switch (event.type) {
    case "shopifyCartFetch":
      return { ...state, status: "loading" };

    case "cartLoaded":
      return { ...state, status: "success", cart: event.cart };

    case "cartUpdated":
      return { ...state, cart: event.cart };

    case "cartCleared":
      return { ...state, cart: null };

    case "error":
      return { ...state, status: "error", error: event.message };

    default:
      return state;
  }
}

function CartProvider({
  children,
  initialCart,
}: {
  children: ReactNode;
  initialCart: Cart | null;
}) {
  const [state, dispatch] = useReducer(cartReducer, {
    status: "idle",
    cart: initialCart,
    isDrawerOpen: false,
  });

  const send = async (event: CartEvent) => {
    dispatch(event);

    if (event.type === "shopifyCartFetch") {
      try {
        const cart = await getCartFromCookies();
        if (cart) {
          dispatch({ type: "cartLoaded", cart });
        } else {
          dispatch({ type: "cartCleared" });
        }
      } catch (e) {
        dispatch({ type: "error", message: "Kunne ikke hente handlekurven" });
      }
    }

    if (event.type === "cartCleared") {
      await clearCartAction();
      dispatch({ type: "cartCleared" });
    }

    if (event.type === "cartUpdated") {
      dispatch({ type: "cartUpdated", cart: event.cart });
    }
  };

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={send}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export function useCart(): CartState {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function useCartDispatch(): (event: CartEvent) => void {
  const context = useContext(CartDispatchContext);
  if (!context) {
    throw new Error("useCartDispatch must be used within a CartProvider");
  }
  return context;
}

export default CartProvider;
