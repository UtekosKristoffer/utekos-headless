// src/lib/shopify/queries/getProductByHandle.ts


import shopifyFetch from "../shopifyFetch";

/**
 * Henter ett enkelt produkt basert på handle.
 * @param {string} handle
 * @returns {Promise<ShopifyProduct | null>}
 */
async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const productQuery = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        descriptionHtml
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        options {
          name
          values
        }
        media(first: 20) {
          edges {
            node {
              ... on MediaImage {
                id
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              availableForSale
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
              image {
                url
                altText
                width
                height
              }
              variantProfile: metafield(namespace: "bridgeFor", key: "Varianthandler") {
                reference {
                  ... on Metaobject {
                    images: field(key: "images") { value }
                    subtitle: field(key: "subtitle") { value }
                    materials: field(key: "materials") { value }
                    functions: field(key: "functions") { value }
                    properties: field(key: "properties") { value }
                    usage: field(key: "usage") { value }
                    sizeFit: field(key: "size_fit") { value }
                    storageAndMaintenance: field(key: "storage_and_maintenance") { value }
                    colorLabel: field(key: "color_label") { value }
                    backgroundColor: field(key: "background_color") { value }
                    swatchHexcolorForVariant: field(key: "swatch_hexcolor_for_variant") { value }
                    length: field(key: "length") { value }
                    centerToWrist: field(key: "center_to_wrist") { value }
                    flatWidth: field(key: "flat_width") { value }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({
      query: productQuery,
      variables: { handle },
    });

    if (!response) return null;

    return response.data?.product || null; 
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export default getProductByHandle;
