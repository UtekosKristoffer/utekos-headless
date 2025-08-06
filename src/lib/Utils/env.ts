// src/lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  SHOPIFY_STORE_DOMAIN: z.string().min(1),
  SHOPIFY_STOREFRONT_PUBLIC_TOKEN: z.string().min(1),
  SHOPIFY_STOREFRONT_API_VERSION: z.string().min(1),
});

export const env = envSchema.parse(process.env);
