import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { env } from "@/Lib/Utils/env";

export const shopifyClient = createStorefrontApiClient({
  storeDomain: `https://${env.SHOPIFY_STORE_DOMAIN}`,
  apiVersion: env.SHOPIFY_STOREFRONT_API_VERSION,
  publicAccessToken: env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
});

export async function shopifyRequest<T>(
  query: string,
  variables?: Record<string, any>
) {
  const { data, errors } = await shopifyClient.request<T>(query, { variables });
  if (errors) throw errors;
  return data;
}
