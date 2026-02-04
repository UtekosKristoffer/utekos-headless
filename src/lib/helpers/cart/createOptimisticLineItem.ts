import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import type {
  CartLine,
  ShopifyProduct,
  ShopifyProductVariant,
  Image
} from '@types'

export function createOptimisticLineItem(
  product: ShopifyProduct,
  variant: ShopifyProductVariant,
  quantity: number
): CartLine {
  const variantId = cleanShopifyId(variant.id) || variant.id

  const unitPriceAmount = parseFloat(variant.price.amount)
  const totalAmountValue = (unitPriceAmount * quantity).toString()

  // FIX 1: Image-typen krever 'id'. Vi genererer en dummy-id.
  const placeholderImage: Image = {
    id: `placeholder_${product.id}`,
    url: '',
    altText: product.title,
    width: 0,
    height: 0
  }

  const activeImage = variant.image || product.featuredImage || placeholderImage

  return {
    id: `temp_${Date.now()}`,
    quantity,
    merchandise: {
      id: variantId,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      image: activeImage,
      availableForSale: variant.availableForSale,
      price: variant.price,
      compareAtPrice: variant.compareAtPrice,
      product: {
        ...product,
        featuredImage: activeImage
      }
    },
    cost: {
      totalAmount: {
        amount: totalAmountValue,
        currencyCode: variant.price.currencyCode
      }
    }
  }
}
