// /Actions/Cart/Helpers/getCartFromCookies.ts
"use server";
import { cookies } from "next/headers";
import queryCartWithCache from "@/Lib/Server/Queries/queryCartWithCache";

/**
 * Henter handlekurven fra cookie (cartId), og returnerer Cart-objektet.
 */
async function getCartFromCookies(): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) return null;

  return await queryCartWithCache(cartId);
}

export default getCartFromCookies;
