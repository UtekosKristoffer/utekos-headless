// lib/shopify-cart.ts
import type { ShopifyCart } from "@/types/shopify";

// Miljøvariabler med validering
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!domain || !token) {
  throw new Error("Mangler påkrevde Shopify miljøvariabler");
}

const endpoint = `https://${domain}/api/2025-07/graphql.json`;

interface ShopifyCartAPIResponse {
  data: any;
  errors?: Array<{ message: string }>;
}

interface LineItem {
  merchandiseId: string;
  quantity: number;
}

interface CartLineUpdateInput {
  id: string;
  quantity: number;
}

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

    const body: ShopifyCartAPIResponse = await result.json();

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

const CartFragment = `
  fragment CompleteCart on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount { amount currencyCode }
      subtotalAmount { amount currencyCode }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              product {
                title
                handle
                featuredImage { url altText }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Henter en eksisterende handlekurv med cache tagging
 */
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  if (!cartId) {
    return null;
  }

  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) { ...CompleteCart }
    }
    ${CartFragment}
  `;

  try {
    const res = await shopifyCartFetch<{ cart: ShopifyCart | null }>({
      query,
      variables: { cartId },
      tags: [`cart-${cartId}`, "cart"], // Spesifikk cart + generell cart tag
    });
    return res.cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}

/**
 * Oppretter en ny handlekurv med første vare
 */
async function createCartWithItem(lineItem: LineItem): Promise<ShopifyCart> {
  const query = `
    mutation cartCreateWithLines($input: CartInput!) {
      cartCreate(input: $input) { cart { ...CompleteCart } }
    }
    ${CartFragment}
  `;

  const res = await shopifyCartFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query,
    variables: { input: { lines: [lineItem] } },
    // Mutations trenger ikke cache tags siden de endrer data
  });

  return res.cartCreate.cart;
}

/**
 * Legger til vare i eksisterende handlekurv
 */
async function addItemToExistingCart(
  cartId: string,
  lineItem: LineItem
): Promise<ShopifyCart> {
  const query = `
    mutation addLinesToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ...CompleteCart } }
    }
    ${CartFragment}
  `;

  const res = await shopifyCartFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query,
    variables: { cartId, lines: [lineItem] },
  });

  return res.cartLinesAdd.cart;
}

/**
 * Hovedfunksjon: Legger vare til kurv
 */
export async function addItemToCart(
  cartId: string | undefined,
  variantId: string,
  quantity: number = 1
): Promise<ShopifyCart> {
  const lineItem: LineItem = { merchandiseId: variantId, quantity };

  if (cartId) {
    return addItemToExistingCart(cartId, lineItem);
  } else {
    return createCartWithItem(lineItem);
  }
}

/**
 * Oppdaterer antall for eksisterende varer i kurven
 */
export async function updateCartLines(
  cartId: string,
  lines: CartLineUpdateInput[]
): Promise<ShopifyCart | null> {
  if (!cartId || !lines.length) {
    return null;
  }

  const query = `
    mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ...CompleteCart } }
    }
    ${CartFragment}
  `;

  try {
    const res = await shopifyCartFetch<{
      cartLinesUpdate: { cart: ShopifyCart };
    }>({ query, variables: { cartId, lines } });

    return res.cartLinesUpdate.cart;
  } catch (error) {
    console.error("Error updating cart lines:", error);
    return null;
  }
}

/**
 * Utility function for cache invalidation
 */
export function getCacheTagsForCart(cartId: string): string[] {
  return [`cart-${cartId}`, "cart"];
}
