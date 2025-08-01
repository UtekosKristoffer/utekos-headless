// Fil: src/lib/shopify/adminClient.ts

interface AdminShopifyFetchParams {
  query: string;
  variables?: Record<string, any>;
}

export async function adminShopifyFetch({
  query,
  variables = {},
}: AdminShopifyFetchParams) {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const adminAccessToken = process.env.SHOPIFY_ADMIN_API_TOKEN; // Bruker ditt korrekte navn

  // Sjekker at begge variablene finnes
  if (!domain || !adminAccessToken) {
    throw new Error("Missing required Shopify Admin environment variables");
  }

  const endpoint = `https://${domain}/admin/api/2025-07/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Bruker Admin-headeren
        "X-Shopify-Access-Token": adminAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!result.ok) {
      const errorBody = await result.text();
      console.error(
        `Shopify Admin API returned an HTTP error: ${result.status}`,
        errorBody
      );
      throw new Error(
        `Could not fetch from Shopify Admin API. Status: ${result.status}`
      );
    }

    const responseJson = await result.json();
    if (responseJson.errors) {
      console.error(
        "Shopify Admin GraphQL Errors:",
        JSON.stringify(responseJson.errors, null, 2)
      );
      throw new Error(
        "Failed to fetch from Shopify due to Admin GraphQL errors."
      );
    }

    return responseJson;
  } catch (error) {
    console.error("Shopify Admin Fetch Error:", error);
    // Returnerer null slik at den som kaller kan håndtere feilen
    return null;
  }
}
