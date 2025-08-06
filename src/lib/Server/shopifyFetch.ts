// src/lib/shopify/client.ts
interface ShopifyFetchParams {
  query: string;
  variables?: Record<string, any>;
}

async function shopifyFetch({ query, variables = {} }: ShopifyFetchParams) {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken =
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !storefrontAccessToken) {
    throw new Error("Missing required Shopify environment variables");
  }

  const endpoint = `https://${domain}/api/2025-07/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken, 
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!result.ok) {
      const errorBody = await result.text();
      console.error(
        `Shopify API returned an HTTP error: ${result.status} ${result.statusText}`,
        errorBody
      );
      throw new Error(
        `Could not fetch from Shopify API. Status: ${result.status}`
      );
    }

    const responseJson = await result.json();
    if (responseJson.errors) {
      console.error(
        "Shopify GraphQL Errors:",
        JSON.stringify(responseJson.errors, null, 2)
      );
      throw new Error("Failed to fetch from Shopify due to GraphQL errors.");
    }

    return responseJson;
  } catch (error) {
    console.error("Shopify Fetch Error:", error);
    return null;
  }
}

export default shopifyFetch;
