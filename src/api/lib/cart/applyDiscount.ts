// Path: src/api/lib/cart/applyDiscount.ts

'use server'

import { mutationCartDiscountCodesUpdate } from '@/api/graphql/mutations/cart'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import type { ShopifyDiscountCodesUpdateOperation } from '@types'
import { revalidateTag } from 'next/cache'
import { TAGS } from '@/api/constants'

export async function applyDiscount(cartId: string, discountCode: string) {
  const res = await shopifyFetch<ShopifyDiscountCodesUpdateOperation>({
    query: mutationCartDiscountCodesUpdate,
    variables: {
      cartId,
      discountCodes: [discountCode]
    }
  })

  if (!res.success) {
    throw new Error(
      res.error.errors[0]?.message ?? 'Klarte ikke å legge til rabattkode.'
    )
  }

  const { cart, userErrors } = res.body.cartDiscountCodesUpdate

  if (userErrors?.length) {
    throw new Error(userErrors[0]?.message ?? 'Ugyldig rabattkode.')
  }

  revalidateTag(TAGS.cart, 'max')

  return cart
}
