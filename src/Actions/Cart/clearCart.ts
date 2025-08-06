"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

async function clearCart(): Promise<AddItemResult> {
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

export default clearCart;
