import type { Cart, CartResponse, Image } from '@types'

// STEG 1: Definer et standard plassholder-bilde som matcher Image-typen.
const PLACEHOLDER_IMAGE: Image = {
  id: 'placeholder-image-id',
  url: '/product-placeholder.svg', // Sørg for at denne filen finnes i /public
  altText: 'Produktbilde',
  width: 1000,
  height: 1500
}

// STEG 2: Endre funksjonen til å akseptere CartResponse og returnere den endelige Cart-typen.
export const reshapeCart = (cart: CartResponse): Cart => {
  // STEG 3: "Map" gjennom linjene for å fjerne 'edges' og 'nodes' samtidig som vi fikser 'featuredImage'.
  const reshapedLines = cart.lines.edges.map(edge => {
    const { merchandise, ...restOfNode } = edge.node
    const { product } = merchandise

    return {
      ...restOfNode,
      merchandise: {
        ...merchandise,
        product: {
          ...product,
          // Bruk nullish coalescing (??) til å sette plassholderen HVIS featuredImage er null eller undefined.
          featuredImage: product.featuredImage ?? PLACEHOLDER_IMAGE
        }
      }
    }
  })

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    cost: {
      // Sørg for at cost-objektet også har en fallback for å unngå feil på en helt tom handlekurv.
      totalAmount: cart.cost?.totalAmount ?? {
        amount: '0.0',
        currencyCode: 'NOK'
      },
      subtotalAmount: cart.cost.subtotalAmount
    },
    lines: reshapedLines
  }
}
