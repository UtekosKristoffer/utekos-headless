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

  // Steg 1: Sjekk om selve API-kallet var vellykket
  if (!res.success) {
    throw new Error(
      res.error.errors[0]?.message ?? 'Klarte ikke å legge til rabattkode.'
    )
  }

  // Nå er det trygt å aksessere res.body
  const { cart, userErrors } = res.body.cartDiscountCodesUpdate

  // Steg 2: Sjekk for spesifikke feil fra Shopify (f.eks. ugyldig kode)
  if (userErrors?.length) {
    throw new Error(userErrors[0]?.message ?? 'Ugyldig rabattkode.')
  }

  // Sørger for at cachen for handlekurven blir invalidert og oppdatert
  revalidateTag(TAGS.cart)

  return cart
}
