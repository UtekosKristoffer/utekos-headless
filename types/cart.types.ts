// Path: src/types/cart.ts

import { AddToCartSchema } from '@/db/zod/schemas/AddToCartSchema'
import { ClearCartLineSchema } from '@/db/zod/schemas/ClearCartLineSchema'
import { RemoveCartLineSchema } from '@/db/zod/schemas/RemoveCartLineSchema'
import { UpdateCartSchema } from '@/db/zod/schemas/UpdateCartSchema'
import type { EventPayloadMap } from '@xstate/store'
import { z } from 'zod'

import type { Image, Money, ShopifyProduct } from '.'
export type AddToCartButtonProps = {
  isPending: boolean
  isDisabled: boolean
}

export interface UpsellItemProps {
  product: ShopifyProduct
  showDiscountHint?: boolean
}

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
          product: ShopifyProduct
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
  | { type: 'ADD_LINES'; input: AddToCartFormValues }
  | { type: 'UPDATE_LINE'; input: UpdateCartLineQuantityInput }
  | { type: 'REMOVE_LINE'; input: RemoveCartLineInput }
  | { type: 'CLEAR' }

export type CartMutationInput =
  | AddToCartFormValues
  | UpdateCartLineQuantityInput
  | RemoveCartLineInput
  | ClearCartLineInput

export type CartUserInterfaceContext = {
  open: boolean
  pending: number
  lastOp?: LastOperation
  optimisticCartLines: OptimisticCartLines
}

export type LastOperation = {
  type: 'add' | 'update' | 'remove' | 'clear'
  at: number
  payload?: unknown
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
      node: CartLine
    }[]
  }
}

export type UpdateCartLineInput = z.infer<typeof UpdateCartSchema>

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
