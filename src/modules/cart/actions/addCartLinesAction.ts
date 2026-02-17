// Path: src/lib/actions/addCartLinesAction.ts

'use server'

import { mutationCartDiscountCodesUpdate } from '@/modules/cart/graphql/mutations'
import { fetchShopify } from '@/lib/shopify/fetchShopify'
import { performCartCreateMutation } from '@/modules/cart/actions/perform/performCartCreateMutation'
import { performCartLinesAddMutation } from '@/modules/cart/actions/perform/performCartLinesAddMutation'
import { mapThrownErrorToActionResult } from '@/lib/errors/mapThrownErrorToActionResult'
import { getCartIdFromCookie } from '@/modules/cart/actions/getCartIdFromCookie'
import { setCartIdInCookie } from '@/modules/cart/actions/setCartIdInCookie'
import { normalizeCart } from '@/lib/helpers/normalizers/normalizeCart'
import { validateAddLineInput } from '@/modules/cart/actions/validations/validateAddLineInput'
import { updateTag } from 'next/cache'
import { trackServerEvent } from '@/modules/analytics/services/trackServerEvent'
import type { CartActionsResult, CartResponse, CartLineInput } from '@types'
import type {
  AnalyticsItem,
  AnalyticsUser,
  AddToCartEvent
} from '@/modules/analytics/domain/schemas/events.schema'
import { headers, cookies } from 'next/headers'
import { randomUUID } from 'crypto'

export const addCartLinesAction = async (
  lines: CartLineInput[],
  discountCode?: string
): Promise<CartActionsResult> => {
  try {
    // 1. Validering
    await Promise.all(lines.map(line => validateAddLineInput(line)))

    const cartId = await getCartIdFromCookie()
    let rawCart: CartResponse | null

    // 2. Utfør Shopify operasjoner
    if (cartId) {
      rawCart = await performCartLinesAddMutation(cartId, lines)

      if (rawCart && discountCode) {
        const discountResult = await fetchShopify<any>({
          query: mutationCartDiscountCodesUpdate,
          variables: {
            cartId,
            discountCodes: [discountCode]
          }
        })

        if (
          discountResult.success
          && discountResult.body.cartDiscountCodesUpdate?.cart
        ) {
          rawCart = discountResult.body.cartDiscountCodesUpdate.cart
        }
      }
    } else {
      rawCart = await performCartCreateMutation(lines, discountCode)
      if (rawCart) {
        await setCartIdInCookie(rawCart.id)
      }
    }

    if (!rawCart) {
      throw new Error('Klarte ikke å legge produkt(er) i handlekurv.')
    }

    // 3. Revalidate cache
    if (rawCart.id) {
      updateTag(`cart-${rawCart.id}`)
      updateTag('cart')
    }

    const cart = normalizeCart(rawCart)

    // 4. Analytics Tracking
    const trackingItems: AnalyticsItem[] = []
    let totalValue = 0
    let currency = 'NOK'

    for (const line of lines) {
      const addedLine = rawCart.lines.edges.find(
        (edge: any) => edge.node.merchandise.id === line.variantId
      )

      if (addedLine) {
        const merchandise = addedLine.node.merchandise
        const price = parseFloat(merchandise.price.amount)

        trackingItems.push({
          item_id: merchandise.id,
          item_name: merchandise.product.title,
          item_variant: merchandise.title,
          item_brand: merchandise.product.vendor,
          price: price,
          quantity: line.quantity,
          item_category: merchandise.product.productType || undefined
        })

        totalValue += price * line.quantity
        currency = merchandise.price.currencyCode
      }
    }

    if (trackingItems.length > 0) {
      const headersList = await headers()
      const cookieStore = await cookies()

      const userAgent = headersList.get('user-agent') || 'unknown'
      const referer =
        headersList.get('referer')
        || process.env.NEXT_PUBLIC_BASE_URL
        || 'https://utekos.no'

      const forwardedFor = headersList.get('x-forwarded-for')
      const clientIp =
        forwardedFor ? forwardedFor.split(',')[0]?.trim() : '127.0.0.1'

      // Hent cookies
      const fbp = cookieStore.get('_fbp')?.value
      const fbc = cookieStore.get('_fbc')?.value
      const externalId = cookieStore.get('externalId')?.value
      const fbclid = cookieStore.get('fbclid')?.value
      const gaClientId = cookieStore.get('_ga')?.value

      // Sikker håndtering av GA Session ID
      const gaMeasurementId = process.env.GA_MEASUREMENT_ID?.replace('G-', '')
      let gaSessionId: number | undefined

      if (gaMeasurementId) {
        const gaSessionCookie = cookieStore.get(`_ga_${gaMeasurementId}`)?.value
        if (gaSessionCookie) {
          const parsed = parseInt(gaSessionCookie, 10)
          if (!isNaN(parsed)) {
            gaSessionId = parsed
          }
        }
      }

      // Eksplisitt typing av bruker-objektet
      const analyticsUser: AnalyticsUser = {
        userAgent,
        clientIp,
        fbp,
        fbc,
        externalId,
        fbclid,
        gaClientId,
        gaSessionId
      }

      // Eksplisitt typing av hele event-objektet
      const addToCartEvent: AddToCartEvent = {
        eventId: randomUUID(),
        eventName: 'AddToCart',
        occurredAt: Date.now(),
        sourceUrl: referer,
        user: analyticsUser,
        data: {
          currency: currency as 'NOK' | 'EUR' | 'USD',
          value: totalValue,
          items: trackingItems
        }
      }

      await trackServerEvent(addToCartEvent)
    }

    return { success: true, message: 'Varer lagt til.', cart }
  } catch (error) {
    return mapThrownErrorToActionResult(error)
  }
}
