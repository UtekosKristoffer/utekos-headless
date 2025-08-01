// components/CartProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import type { ShopifyCart } from "@/types/shopify";

interface CartContextType {
  cart: ShopifyCart | null;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
  initialCart: ShopifyCart | null;
}

export function CartProvider({ children, initialCart }: CartProviderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    // Sammenlign det nye antallet fra serveren med det nåværende antallet på klienten.
    const newQuantity = initialCart?.totalQuantity || 0;
    const oldQuantity = cart?.totalQuantity || 0;

    if (newQuantity > oldQuantity) {
      if (!isDrawerOpen) {
        setIsDrawerOpen(true);
      }
    }

    setCart(initialCart);
  }, [initialCart]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <CartContext.Provider
      value={{ cart, isDrawerOpen, openDrawer, closeDrawer }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
