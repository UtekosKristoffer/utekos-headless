const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

interface CartAPIResponse {
  data: any;
  errors?: Array<{ message: string }>;
}

if (!domain || !token) {
  throw new Error("Mangler påkrevde Shopify miljøvariabler");
}

const endpoint = `https://${domain}/api/2025-07/graphql.json`;

/**
 * Generisk fetch-funksjon for Shopify Cart API med cache tags
 */
async function shopifyCartFetch<T>({
  query,
  variables = {},
  tags = [],
}: {
  query: string;
  variables?: object;
  tags?: string[];
}): Promise<T> {
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token!,
      },
      body: JSON.stringify({ query, variables }),
      next: {
        tags: tags.length > 0 ? tags : undefined,
        revalidate: 3600, // 1 time cache som fallback
      },
    });

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    const body: CartAPIResponse = await result.json();

    if (body.errors) {
      throw new Error(`Shopify API Error: ${JSON.stringify(body.errors)}`);
    }

    const dataKey = Object.keys(body.data)[0];
    if (body.data[dataKey]?.userErrors?.length) {
      throw new Error(body.data[dataKey].userErrors[0].message);
    }

    return body.data as T;
  } catch (error) {
    console.error("Shopify Cart Fetch Error:", error);
    throw error;
  }
}

export default shopifyCartFetch;
