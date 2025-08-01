// Fil: src/app/actions.ts
"use server";

import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { revalidateTag } from "next/cache";
import {
  addItemToCart,
  getCart,
  updateCartLines,
} from "@/lib/shopify/queries/shopifyCartFetch";
import type { ShopifyCart } from "@/types/shopify";
import { addToCartSchema } from "@/lib/schemas";

type AddItemResult = {
  success: boolean;
  message: string;
  cart?: ShopifyCart | null;
};

export async function addItem(
  _prevState: any,
  formData: FormData
): Promise<AddItemResult> {
  const rawData = {
    variantId: formData.get("variantId"),
    quantity: formData.get("quantity"),
  };

  const validationResult = addToCartSchema.safeParse(rawData);

  if (!validationResult.success) {
    // KORRIGERT HER: Bruker 'issues' istedenfor 'errors'
    const errorMessage = validationResult.error.issues
      .map((issue) => issue.message)
      .join(", ");
    return { success: false, message: errorMessage };
  }

  const { variantId, quantity } = validationResult.data;

  // KORRIGERT HER: La til 'await'
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  try {
    const newCart = await addItemToCart(cartId, variantId, quantity);

    if (!newCart) {
      throw new Error("Kunne ikke opprette eller oppdatere handlekurven.");
    }

    const addedLine = newCart.lines.edges.find(
      (edge) => edge.node.merchandise.id === variantId
    );

    if (!addedLine) {
      return {
        success: false,
        message: "Varen er dessverre utsolgt og kunne ikke legges til.",
      };
    }

    // KORRIGERT HER: Vi har allerede 'cookieStore' fra før
    cookieStore.set("cartId", newCart.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    revalidateTag(`cart-${newCart.id}`);
    revalidateTag("cart");

    return {
      success: true,
      message: `Varen er lagt i kurven!`,
      cart: newCart,
    };
  } catch (e: any) {
    console.error("Feil i addItem server action:", e);
    return { success: false, message: e.message || "En ukjent feil oppstod." };
  }
}

export async function getCartAction() {
  noStore();
  // KORRIGERT HER: La til 'await'
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) {
    return null;
  }

  const cart = await getCart(cartId);
  return cart;
}

export async function updateItemQuantity(
  _prevState: any,
  payload: { lineId: string; quantity: number }
): Promise<AddItemResult> {
  // KORRIGERT HER: La til 'await'
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) {
    return { success: false, message: "Ingen handlekurv funnet." };
  }

  if (typeof payload.quantity !== "number" || payload.quantity < 0) {
    return { success: false, message: "Ugyldig antall." };
  }

  try {
    const updatedCart = await updateCartLines(cartId, [
      { id: payload.lineId, quantity: payload.quantity },
    ]);

    revalidateTag(`cart-${cartId}`);
    revalidateTag("cart");

    if (!updatedCart || updatedCart.lines.edges.length === 0) {
      // KORRIGERT HER: Vi har allerede 'cookieStore' fra før
      cookieStore.delete("cartId");
    }

    const message =
      payload.quantity === 0 ? "Varen er fjernet." : "Antall er oppdatert.";

    return { success: true, message, cart: updatedCart };
  } catch (e: any) {
    console.error("Feil i updateItemQuantity server action:", e);
    return {
      success: false,
      message: e.message || "Kunne ikke oppdatere antall.",
    };
  }
}

export async function clearCart(): Promise<AddItemResult> {
  // KORRIGERT HER: La til 'await'
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) {
    return { success: false, message: "Ingen handlekurv å tømme." };
  }

  try {
    cookieStore.delete("cartId");
    revalidateTag(`cart-${cartId}`);
    revalidateTag("cart");

    return { success: true, message: "Handlekurven er tømt." };
  } catch (e: any) {
    console.error("Feil ved tømming av handlekurv:", e);
    return { success: false, message: "Kunne ikke tømme handlekurven." };
  }
}


