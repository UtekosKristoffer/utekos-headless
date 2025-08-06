import StoreFrontApiClient from "@/Lib/Clients/StoreFrontApiClient";

const getProducts = async (): Promise<ShopifyProduct[]> => {
  const { data } = await StoreFrontApiClient.request(`
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  `);
  return data.products.edges.map((e: { node: ShopifyProduct }) => e.node);
};

export default getProducts;
