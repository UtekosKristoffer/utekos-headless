import { LATEST_API_VERSION } from "@shopify/shopify-api";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

if (
  !process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
  !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
) {
  throw new Error(
    "Shopify store domain and storefront access token are required."
  );
}

const StoreFrontApiClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  apiVersion: LATEST_API_VERSION,
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

export default StoreFrontApiClient;
