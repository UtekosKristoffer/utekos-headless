// Fil: src/lib/schemas.ts
import * as z from "zod";

export const addToCartSchema = z.object({
  variantId: z.string().min(1, "Produktvariant mangler."),
  quantity: z.coerce.number().min(1, "Antall må være minst 1."),
});

