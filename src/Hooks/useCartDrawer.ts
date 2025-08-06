// src/hooks/useCartDrawer.ts
import { useTransition } from "react";
import { useCart, useCartDispatch } from "@/Components/Cart/CartProvider";
import clearCart from "@/Actions/Cart/clearCart";
import updateItemQuantity from "@/Actions/Cart/updateItemQuantity";
import addItemToCart from "@/Actions/Cart/addItemToCart";
import voidAsync from "@/Utils/voidAsync";

function useCartDrawer() {
  const { cart } = useCart();
  const dispatch = useCartDispatch();
  const [isPending, startTransition] = useTransition();

  const handleAddItem = (variantId: string, quantity = 1) => {
    startTransition(() => {
      voidAsync(async () => {
        const result = await addItemToCart(cart?.id, variantId, quantity);
        if (result) {
          dispatch({ type: "cartUpdated", cart: result });
        }
      });
    });
  };

  const handleQuantityUpdate = (lineId: string, quantity: number) => {
    startTransition(() => {
      voidAsync(async () => {
        const result = await updateItemQuantity(null, { lineId, quantity });
        if (result.success && result.cart) {
          dispatch({ type: "cartUpdated", cart: result.cart });
        }
      });
    });
  };

  const handleClearCart = () => {
    startTransition(() => {
      voidAsync(async () => {
        const result = await clearCart();
        if (result.success) {
          dispatch({ type: "cartCleared" });
        }
      });
    });
  };

  const itemCount = cart?.totalQuantity || 0;
  const isCartEmpty = !cart || cart.lines.edges.length === 0;
  const checkoutUrl = cart?.checkoutUrl ?? "/checkout";

  return {
    cart,
    isPending,
    itemCount,
    isCartEmpty,
    checkoutUrl,
    handleAddItem,
    handleQuantityUpdate,
    handleClearCart,
  };
}

export default useCartDrawer;
