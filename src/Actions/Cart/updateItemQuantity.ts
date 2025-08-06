"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import updateCartLines from "@/Lib/Server/Mutations/updateCartLines";

async function updateItemQuantity(
  _prevState: any,
  payload: { lineId: string; quantity: number }
): Promise<AddItemResult> {
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

export default updateItemQuantity;
