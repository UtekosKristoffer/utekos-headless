import { z } from 'zod';

const envSchema = z.object({
  SHOPIFY_STORE_DOMAIN: z.string().url(),
  SHOPIFY_STOREFRONT_PUBLIC_TOKEN: z.string(),
  SHOPIFY_STOREFRONT_API_VERSION: z.string(),
});

export const env = envSchema.parse(process.env);
