"use client";

import Link from "next/link";
import Button from "@/Components/UI/button";
import { DrawerFooter, DrawerClose } from "@/Components/UI/drawer";
import type { Route } from "next";

import useCartDrawer from "@/Hooks/useCartDrawer";

function CartDrawerFooter() {
  const { cart, checkoutUrl, isPending, handleClearCart } = useCartDrawer();

  if (!cart) return null;

  return (
    <DrawerFooter className="border-t pt-4">
      <div className="space-y-3">
        <div className="flex justify-between text-lg font-semibold">
          <span>Subtotal:</span>
          <span>
            {cart.cost.totalAmount.amount} {cart.cost.totalAmount.currencyCode}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <DrawerClose asChild>
            <Button variant="outline">Fortsett å handle</Button>
          </DrawerClose>
          <Button
            onClick={handleClearCart}
            disabled={isPending}
            variant="outline"
          >
            Tøm kurv
          </Button>
        </div>
        <Button asChild variant="outline">
          <Link href={checkoutUrl as Route}>Gå til kassen</Link>
        </Button>
      </div>
    </DrawerFooter>
  );
}

export default CartDrawerFooter;
