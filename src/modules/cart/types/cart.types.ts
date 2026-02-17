// Path: src/types/cart.ts
import { CartErrorCode } from '@/constants/cart-error-code'
import { ClearCartLineSchema } from '@/db/zod/schemas/ClearCartLineSchema'
import { RemoveCartLineSchema } from '@/db/zod/schemas/RemoveCartLineSchema'
import { UpdateCartSchema } from '@/db/zod/schemas/UpdateCartSchema'
import type { EventPayloadMap } from '@xstate/store'
import type { QueryClient } from '@tanstack/react-query'
import type { AddToCartFormValues, ShopifyProductVariant } from '@types'
import type { Image, Money, ShopifyProduct } from '../../../../types'
import { z } from 'zod'
export type AddLinesInput =
  | { variantId: string; quantity: number }[]
  | {
      lines: { variantId: string; quantity: number }[]
      discountCode?: string
    }

export type ActiveSubmitButtonProps = {
  isPending: boolean
  isDisabled: boolean
}

export type CampaignContext = {
  cartId: string | null
  additionalLine?: { variantId: string; quantity: number } | undefined
  queryClient: QueryClient
}

export type Cart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    totalAmount: Money
    subtotalAmount: Money
  }
  lines: CartLine[]
}

export type CartActions = {
  addCartLine: (
    lines: { variantId: string; quantity: number }[],
    discountCode?: string
  ) => Promise<CartActionsResult>
  updateCartLineQuantity: (input: {
    lineId: string
    quantity: number
  }) => Promise<CartActionsResult>
  removeCartLine: (input: { lineId: string }) => Promise<CartActionsResult>
  clearCart: () => Promise<CartActionsResult>
}

export type CartActionsResult = {
  success: boolean
  message: string
  cart?: Cart | null
  error?: string | null
}

export type CartErrorCodeType =
  (typeof CartErrorCode)[keyof typeof CartErrorCode]

export type CartLine = {
  id: string
  quantity: number
  cost: {
    totalAmount: Money
  }
  merchandise: CartProductVariant
}

export type CartLineInput = {
  variantId: string
  quantity: number
  discountCode?: string
}

export type CartLineItemProps = {
  lineId: string
}

export type CartMutationContext = {
  error?: string | null
}

export type CartMutationEvent =
  | { type: 'ADD_LINES'; input: AddLinesInput }
  | { type: 'UPDATE_LINE'; input: { lineId: string; quantity: number } }
  | { type: 'REMOVE_LINE'; input: { lineId: string } }
  | { type: 'CLEAR' }

export type CartMutationInput =
  | AddToCartFormValues
  | UpdateCartLineQuantityInput
  | RemoveCartLineInput
  | ClearCartLineInput

export type CartProductVariant = {
  id: string
  title: string
  availableForSale: boolean
  price: Money
  image: Image | null
  compareAtPrice: Money | null
  selectedOptions: { name: string; value: string }[]
  product: Omit<ShopifyProduct, 'featuredImage'> & {
    featuredImage: Image
  }
}

export type CartResponse = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    totalAmount: Money
    subtotalAmount: Money
  }
  lines: {
    edges: {
      node: {
        id: string
        quantity: number
        cost: {
          totalAmount: Money
        }
        merchandise: Omit<CartProductVariant, 'product'> & {
          product: ShopifyProduct
        }
      }
    }[]
  }
}

export type CartUserInterfaceContext = {
  open: boolean
  pending: number
  lastOp?: LastOperation
  optimisticCartLines: OptimisticCartLines
}

export type ClearCartLineInput = z.infer<typeof ClearCartLineSchema>

export type Connection<T> = {
  edges: Array<Edge<T>>
}

export type Edge<T> = {
  node: T
}

export type LastOperation = {
  type: 'add' | 'update' | 'remove' | 'clear'
  at: number
  payload?: unknown
}

export type ModalSubmitButtonProps = {
  availableForSale: boolean
  isPending: boolean
  isDisabled: boolean
}

export type OptimisticCartLines = { lines: Record<string, number> }

export type QuickViewModalProps = {
  productHandle: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export type OptimisticItemInput = {
  product: ShopifyProduct
  variant: ShopifyProductVariant
  quantity: number
  customPrice?: number
}

export type OptimisticUpdateParams = {
  cartId: string
  items: OptimisticItemInput[]
}

export type RemoveCartLineInput = z.infer<typeof RemoveCartLineSchema>

export type ShopifyCart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    totalAmount: Money
    subtotalAmount: Money
  }
  lines: {
    edges: {
      node: CartLine
    }[]
  }
}

export type ShopifyCartLineEdge = CartResponse['lines']['edges'][number]

export type ShopifyCartOperation = ShopifyOperation<
  { cart: ShopifyCart },
  { cartId: string }
>

export type ShopifyCreateCartOperation = ShopifyOperation<
  { cartCreate: { cart: CartResponse } },
  {
    lines: { merchandiseId: string; quantity: number }[]
    attributes?: { key: string; value: string }[]
  }
>

export type ShopifyDiscountCodesUpdateOperation = ShopifyOperation<
  {
    cartDiscountCodesUpdate: {
      cart: ShopifyCart
      userErrors?: {
        field: string
        message: string
      }[]
    }
  },
  {
    cartId: string
    discountCodes: string[]
  }
>

export type ShopifyOperation<TData, TVariables = never> = {
  data: TData
  variables: TVariables
}

export type ShopifyProductOperation = ShopifyOperation<
  { product: ShopifyProduct },
  { handle: string }
>

export type ShopifyProductsOperation = ShopifyOperation<
  { products: Connection<ShopifyProduct> },
  { query?: string; reverse?: boolean; sortKey?: string }
>

export type ShopifyRemoveFromCartOperation = ShopifyOperation<
  { cartLinesRemove: { cart: ShopifyCart } },
  { cartId: string; lineIds: string[] }
>

export type ShopifyUpdateCartLineQuantityOperation = ShopifyOperation<
  { cartLinesUpdate: { cart: ShopifyCart } },
  {
    cartId: string
    lines: { id: string; quantity: number }[]
  }
>

export type UpdateCartLineInput = z.infer<typeof UpdateCartSchema>

export type UpdateCartLineQuantityInput = z.infer<typeof UpdateCartSchema>

export type UpsellItemProps = {
  product: ShopifyProduct
  showDiscountHint?: boolean
}

export type UserInterfaceEventMap = {
  OPEN: EventPayloadMap
  CLOSE: EventPayloadMap
  TOGGLE: EventPayloadMap
  PENDING_INC: EventPayloadMap
  PENDING_DEC: EventPayloadMap
  SET_LAST_OPERATION: { value: LastOperation }
  OPTIMISTIC_CART_LINES_UPDATE: { delta: Record<string, number> }
  OPTIMISTIC_CART_CLEAR: EventPayloadMap
}
