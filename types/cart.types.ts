// Path: src/types/cart.ts

import { AddToCartSchema } from '@/db/zod/schemas/AddToCartSchema'
import { ClearCartLineSchema } from '@/db/zod/schemas/ClearCartLineSchema'
import { RemoveCartLineSchema } from '@/db/zod/schemas/RemoveCartLineSchema'
import { UpdateCartSchema } from '@/db/zod/schemas/UpdateCartSchema'
import type { EventPayloadMap } from '@xstate/store'
import { z } from 'zod'

import type { Image, Money, ShopifyProduct, ShopifySelectedOption } from '.'

export type AddToCartFormValues = z.infer<typeof AddToCartSchema>
export type UpdateCartLineQuantityInput = z.infer<typeof UpdateCartSchema>
export type RemoveCartLineInput = z.infer<typeof RemoveCartLineSchema>
export type ClearCartLineInput = z.infer<typeof ClearCartLineSchema>

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

export type CartLine = {
  id: string
  quantity: number
  cost: {
    totalAmount: Money
  }
  merchandise: CartProductVariant
}

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
          product: ShopifyProduct // Her er featuredImage `ShopifyImage | null`
        }
      }
    }[]
  }
}

export type CartActionsResult = {
  success: boolean
  message: string
  cart?: Cart | null
  error?: string | null
}
export type CartItem = {
  id: string
  quantity: number
  cost: {
    totalAmount: Money
  }
  merchandise: {
    id: string
    title: string
    availableForSale: boolean
    price: Money
    image: Image | null
    compareAtPrice: Money | null
    selectedOptions: ShopifySelectedOption[]
    product: ShopifyProduct
  }
}

export type CartProduct = {
  id: string
  handle: string
  title: string
  featuredImage: Image
}

export type CartActions = {
  addCartLine(input: AddToCartFormValues): Promise<CartActionsResult>
  updateCartLineQuantity(
    input: UpdateCartLineQuantityInput
  ): Promise<CartActionsResult>
  removeCartLine(input: RemoveCartLineInput): Promise<CartActionsResult>
  clearCart(): Promise<CartActionsResult>
}

export type CartMutationContext = {
  error?: string | null
}

export type CartMutationEvent =
  | { type: 'ADD_LINES'; input: { merchandiseId: string; quantity: number } }
  | { type: 'UPDATE_LINE'; input: UpdateCartLineQuantityInput }
  | { type: 'REMOVE_LINE'; input: RemoveCartLineInput }
  | { type: 'CLEAR' }

export type AddToCartResponse = { cartLinesAdd: { cart: CartResponse } }
export type CartLinesRemoveResponse = {
  cartLinesRemove: { cart: CartResponse }
}
export type CartLinesUpdateResponse = {
  cartLinesUpdate: { cart: CartResponse }
}
export type CartQueryResult = { cart: CartResponse }
export type CartMutationInput =
  | AddToCartFormValues
  | UpdateCartLineQuantityInput
  | RemoveCartLineInput
  | ClearCartLineInput
export type InputValidator<T extends CartMutationInput> = (input: T) => void
export type PerformMutation<T extends CartMutationInput> = (
  cartId: string,
  input: T
) => Promise<CartResponse | null | undefined>

export type CartUserInterfaceContext = {
  open: boolean
  pending: number
  lastOp?: LastOperation
  optimisticCartLines: OptimisticCartLines
}

export type ClearCartMutationEvent = { type: 'CLEAR'; input?: never }

export type LastOperation = {
  type: 'add' | 'update' | 'remove' | 'clear'
  at: number
  payload?: unknown
}
export type MutationInput = {
  [key: string]: string | number | boolean | undefined | null
}
export type OptimisticCartLines = { lines: Record<string, number> }

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
      node: ShopifyCartLine
    }[]
  }
}

export type ShopifyCartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: Money
    product: {
      title: string
      handle: string
      featuredImage: Image | null
    }
  }
}
export type RemoveCartLineEvent = {
  type: 'REMOVE_LINE'
  input: RemoveCartLineInput
}

export type ShopifyCartLineEdge = CartResponse['lines']['edges'][number]
export type UpdateCartLineInput = z.infer<typeof UpdateCartSchema>
export type UpdateCartLineQuantityEvent = {
  type: 'UPDATE_LINE'
  input: UpdateCartLineQuantityInput
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
