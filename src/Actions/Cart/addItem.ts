"use server";
import { addToCartSchema } from "@/Lib/schemas";
import { revalidateTag } from "next/cache";
import addItemToCart from "./addItemToCart";
import { cookies } from "next/headers";

async function addItem(
  _prevState: any,
  formData: FormData
): Promise<AddItemResult> {
  const rawData = {
    variantId: formData.get("variantId"),
    quantity: formData.get("quantity"),
  };

  const validationResult = addToCartSchema.safeParse(rawData);

  if (!validationResult.success) {
    const errorMessage = validationResult.error.issues
      .map((issue) => issue.message)
      .join(", ");
    return { success: false, message: errorMessage };
  }

  const { variantId, quantity } = validationResult.data;

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

export default addItem;
