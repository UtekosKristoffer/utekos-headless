// Fil: components/CartDrawer.tsx
"use client";

import type { Route } from "next";
import { useTransition } from "react";
import type { ShopifyCart } from "@/types/shopify";
import { ShoppingBagIcon } from "lucide-react";
import { updateItemQuantity, clearCart } from "@/app/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCart } from "@/components/cart/CartProvider";
import { Minus, Plus } from "lucide-react";

export function CartDrawer() {
  const { cart } = useCart();
  const [isPending, startTransition] = useTransition();

  const handleQuantityUpdate = (lineId: string, quantity: number) => {
    startTransition(() => {
      updateItemQuantity(null, { lineId, quantity });
    });
  };

  const handleClearCart = () => {
    startTransition(() => {
      clearCart();
    });
  };

  const itemCount = cart?.totalQuantity || 0;
  const isCartEmpty = !cart || cart.lines.edges.length === 0;

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Åpne handlekurv"
          className="relative"
        >
          <ShoppingBagIcon className="size-6" />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              {itemCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Handlekurv ({cart?.totalQuantity || 0})</DrawerTitle>
            <DrawerDescription>
              {isCartEmpty
                ? "Din handlekurv er tom."
                : "Dine valgte produkter."}
            </DrawerDescription>
          </DrawerHeader>

          <div
            className="p-4 overflow-y-auto bg-background"
            style={{ maxHeight: "60vh" }}
          >
            {!isCartEmpty && (
              <ul className="space-y-4">
                {cart.lines.edges.map(({ node: line }) => {
                  const unitPrice = parseFloat(line.merchandise.price.amount);
                  const linePrice = unitPrice * line.quantity;

                  return (
                    <li
                      key={line.id}
                      className="flex items-start justify-between p-3 border rounded"
                    >
                      {/* Produktinfo */}
                      <div className="flex-1 mr-4">
                        <h3 className="font-medium">
                          {line.merchandise.product.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {line.merchandise.title}
                        </p>
                      </div>

                      {/* Antall-justering og Fjern-knapp */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant={"outline"}
                          size="icon"
                          onClick={() =>
                            handleQuantityUpdate(line.id, line.quantity - 1)
                          }
                          disabled={isPending}
                          className="size-6 shrink-0 rounded-full"
                        >
                          <Minus />
                        </Button>
                        <span className="w-8 text-center text-sm">
                          {line.quantity}
                        </span>
                        <Button
                          variant={"outline"}
                          size="icon"
                          onClick={() =>
                            handleQuantityUpdate(line.id, line.quantity + 1)
                          }
                          disabled={isPending}
                          className="size-6 shrink-0 rounded-full"
                        >
                          <Plus />
                        </Button>
                      </div>

                      {/* Pris */}
                      <div
                        className="ml-4 text-right"
                        style={{ minWidth: "80px" }}
                      >
                        <p className="font-semibold text-sm">
                          {linePrice.toFixed(2)}{" "}
                          {line.merchandise.price.currencyCode}
                        </p>

                        <Button
                          onClick={() => handleQuantityUpdate(line.id, 0)}
                          disabled={isPending}
                          variant="ghost"
                          className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50"
                        >
                          Fjern
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer med oppsummering og knapper */}
          {!isCartEmpty && (
            <DrawerFooter className="border-t pt-4">
              <div className="space-y-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal:</span>
                  <span>
                    {cart.cost.totalAmount.amount}{" "}
                    {cart.cost.totalAmount.currencyCode}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <DrawerClose asChild>
                    <Button variant={"outline"}>Fortsett å handle</Button>
                  </DrawerClose>
                  <Button
                    onClick={handleClearCart}
                    disabled={isPending}
                    variant={"outline"}
                  >
                    Tøm kurv
                  </Button>
                </div>
                <Button asChild variant={"outline"}>
                  <Link href={cart.checkoutUrl as Route}>Gå til kassen</Link>
                </Button>
              </div>
            </DrawerFooter>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
