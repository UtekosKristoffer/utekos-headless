// src/lib/shopify.js
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// --- DEBUGGING START ---
console.log("Shopify Domain fra .env.local:", domain);
console.log(
  "Storefront Token fra .env.local:",
  storefrontAccessToken ? "Mottatt" : "Mangler"
);
// --- DEBUGGING END ---

const endpoint = `https://${domain}/api/2024-07/graphql.json`;

async function shopifyFetch({ query, variables }) {
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 10 },
    });

    if (!result.ok) {
      // Logg feilmelding fra Shopify hvis den finnes
      const errorBody = await result.text();
      console.error(
        `Shopify API returned an error: ${result.status} ${result.statusText}`,
        errorBody
      );
      throw new Error(
        `Could not fetch from Shopify API. Status: ${result.status}`
      );
    }

    return result.json();
  } catch (error) {
    console.error("Shopify Fetch Error:", error);
    throw new Error("Could not fetch from Shopify API.");
  }
}

export async function getProducts() {
  // KORRIGERT: GraphQL-spørringen er formatert for lesbarhet.
  const productsQuery = `
    query getProducts {
      products(first: 10, sortKey: TITLE, reverse: false) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query: productsQuery });

  // Sjekk at data-stien er gyldig før du returnerer
  if (response && response.data && response.data.products) {
    return response.data.products.edges;
  }

  return [];
}
