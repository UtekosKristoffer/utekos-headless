import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { env } from "@/Lib/Utils/env";

const StoreFrontApiClient = createStorefrontApiClient({
  storeDomain: `https://${env.SHOPIFY_STORE_DOMAIN}`,
  apiVersion: env.SHOPIFY_STOREFRONT_API_VERSION,
  publicAccessToken: env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
});

export default StoreFrontApiClient;
