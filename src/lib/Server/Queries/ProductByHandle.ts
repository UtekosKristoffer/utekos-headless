// src/Lib/Server/Queries/getProductByHandle.ts
import { graphql } from "@/gql";

const ProductByHandle = graphql(/* GraphQL */ `
  query ProductByHandle($handle: String!) {
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
            variantProfile: metafield(
              namespace: "bridgeFor"
              key: "Varianthandler"
            ) {
              reference {
                ... on Metaobject {
                  images: field(key: "images") {
                    value
                  }
                  subtitle: field(key: "subtitle") {
                    value
                  }
                  materials: field(key: "materials") {
                    value
                  }
                  functions: field(key: "functions") {
                    value
                  }
                  properties: field(key: "properties") {
                    value
                  }
                  usage: field(key: "usage") {
                    value
                  }
                  sizeFit: field(key: "size_fit") {
                    value
                  }
                  storageAndMaintenance: field(key: "storage_and_maintenance") {
                    value
                  }
                  colorLabel: field(key: "color_label") {
                    value
                  }
                  backgroundColor: field(key: "background_color") {
                    value
                  }
                  swatchHexcolorForVariant: field(
                    key: "swatch_hexcolor_for_variant"
                  ) {
                    value
                  }
                  length: field(key: "length") {
                    value
                  }
                  centerToWrist: field(key: "center_to_wrist") {
                    value
                  }
                  flatWidth: field(key: "flat_width") {
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);

export default ProductByHandle;
