import imageFragment from './imageFragment'
import seoFragment from './seoFragment'
const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    title
    handle
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    descriptionHtml
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    options {
      name
      optionValues {
        name
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          id
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          currentlyNotInStock
          selectedOptions {
            name
            value
          }
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
          }
          metafield(namespace: "bridgeFor", key: "VariantHandler") {
            value
            type
            reference {
              ... on Metaobject {
                type
                fields {
                  key
                  value
                  type
                  references(first: 10) {
                    nodes {
                      ...image
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    seo {
      ...seo
    }
  }
  ${imageFragment}
  ${seoFragment}
`

export default productFragment
