// Path: src/lib/queries/productsQuery.graphql

import { gql } from 'graphql-request'

import { fetchShopify } from '@/lib/fetch/fetchShopify'

export function productsQuery() {
  return fetchShopify({
    query: gql`
      query Products($first: Int!, $query: String) {
        products(first: $first, query: $query) {
          edges {
            cursor
            node {
              id
              availableForSale
              title
              handle
              options {
                name
                optionValues {
                  name
                }
              }
              descriptionHtml
              featuredImage {
                url
                id
              }
              selectedOrFirstAvailableVariant {
                title
                id
                price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                metafield(namespace: "bridgeFor", key: "Varianthandler") {
                  namespace
                  key
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
                      storageAndMaintenance: field(
                        key: "storage_and_maintenance"
                      ) {
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
    `,
    variables: {
      first: 5,
      query: ''
    }
  })
}
