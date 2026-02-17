# Conversion API: Add To Cart Illustration

Include code that show how `eventId` is generated, saved and sent with the
payload to the server.

## UTEKOS CODEBASE

**GLOBAL INTERFACE WINDOW**:

```typescript
// Path: types/window.d.ts
declare global {
  interface Window {
    fbq: {
      (
        method: 'init',
        pixelId: string,
        userData?: Record<string, unknown>
      ): void
      (
        method: 'track',
        event: string,
        params?: Record<string, unknown>,
        options?: { eventID?: string }
      ): void
      (
        method: 'trackCustom',
        event: string,
        params?: Record<string, unknown>,
        options?: { eventID?: string }
      ): void
      (method: 'set', property: string, value: any, pixelId?: string): void
      loaded?: boolean
      version?: string
      queue?: unknown[]
    }
    _fbq?: Window['fbq']
    dataLayer: Record<string, any>[]
    snaptr?: (
      method: string,
      eventType: string,
      data?: Record<string, string | number | string[]>
    ) => void

    pintrk?: {
      (method: 'load', tagId: string, userData?: Record<string, unknown>): void
      (method: 'page'): void
      (method: 'track', event: string, data?: Record<string, unknown>): void
      (method: string, ...args: any[]): void
      queue: any[]
      version: string
      loaded?: boolean
    }
    ttq?: {
      load: (id: string) => void
      page: () => void
      track: (
        event: string,
        params?: Record<string, any>,
        options?: { event_id?: string }
      ) => void
      identify: (data: {
        email?: string
        phone?: string
        external_id?: string
      }) => void
      instance: (id: string) => any
      on: (event: string, callback: () => void) => void
      off: (event: string, callback: () => void) => void
      methods: string[]
      setAndDefer: (target: any, method: string) => void
      _i: Record<string, any>
      _t: Record<string, number>
      _o: Record<string, any>
    }
    TiktokAnalyticsObject?: string
  }
}

export {}
```

### **`src/types/`**:

```typescript
import type {
  MetaEventPayload,
  ClientUserData,
  MetaUserData,
  MetaEventRequestResult
} from '@types'

export type LogFunction = (
  level: 'INFO' | 'ERROR' | 'WARN' | 'DEBUG',
  message: string,
  meta?: Record<string, unknown>,
  context?: Record<string, unknown>
) => Promise<void>
export type MetaSender = (
  payload: MetaEventPayload,
  userData: ClientUserData
) => Promise<MetaEventRequestResult>

export interface TrackingDependencies {
  sendMeta: MetaSender
  sendPinterest: PinterestSender
  sendTikTok: TikTokSender
  sendSnapchat: (
    payload: MetaEventPayload,
    userData: MetaUserData,
    extra?: { sc_cookie1?: string; sc_click_id?: string }
  ) => Promise<any>
  sendGoogle: (
    payload: MetaEventPayload,
    context: { clientIp?: string; userAgent?: string }
  ) => Promise<any>
  logger: LogFunction
}

export type ShopifyProduct = {
  id: string
  title: string
  handle: string
  productType: string
  totalInventory: number
  updatedAt: string
  collections: {
    nodes: {
      id: string
      title: string
      handle: string
    }[]
  }
  compareAtPriceRange: {
    minVariantPrice: Money
    maxVariantPrice: Money
  }
  priceRange: {
    minVariantPrice: Money
    maxVariantPrice: Money
  }
  availableForSale: boolean
  images: ShopifyImageConnection
  options: ProductOption[]
  description: string
  featuredImage: Image | null
  vendor: string
  tags: string[]
  relatedProducts: ShopifyProduct[]
  metafield?: Metafield | null
  quantityAvailable?: number | null
  category: {
    id: string
    name: string
    ancestors: {
      id: string
      name: string
      ancestors: string
    }
  }
  variantProfile?: MetaobjectReference | null
  seo: {
    title: string | null
    description: string | null
  }
  selectedOrFirstAvailableVariant: ShopifyProductVariant
  variants: ProductVariantConnection
  weight: WeightUnit
}

export type ShopifyProductVariant = {
  id: string
  title: string
  barcode: string | null
  availableForSale: boolean
  currentlyNotInStock: boolean
  selectedOptions: SelectedOption[]
  price: Money
  image: Image | null
  compareAtPrice: Money | null
  product: ShopifyProduct
  metafield: Metafield | null
  sku: string | undefined
  variantProfile: VariantProfileReference | null
  variantProfileData?: Partial<MetaobjectReference>
  weight: number | null
  weightUnit: string
  quantityAvailable: number | null
}

export type DispatchPixelsOptions = {
  eventData: AddToCartEventData
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant
}

export type AddToCartEventData = {
  contentIds: string[]
  contentName: string
  contents: MetaContentItem[]
  currency: string
  eventID: string
  mainVariantId: string
  totalQty: number
  value: number
}

export type MetaEventPayload = {
  eventName: MetaEventType | undefined
  eventId: string | undefined
  eventSourceUrl: string | undefined
  eventTime?: number | undefined
  actionSource: 'website' | undefined
  userData: MetaUserData | undefined
  eventData?: MetaEventData | undefined
  googleAnalyticsData?: GoogleAnalyticsDataPayload | undefined
}

export type MetaEventRequestResult = {
  events_received?: number
  fbtrace_id?: string
}

export type MetaEventType =
  | 'PageView'
  | 'ViewContent'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'Purchase'
  | 'HeroInteract'
  | 'InteractWithAccordion'
  | 'OpenQuickView'
  | 'Lead'

export type GoogleAnalyticsDataPayload = {
  client_id?: string
  session_id?: string
  items?: any[]
  value?: number
  currency?: string
}
```

**getCookie**:

```typescript
// Path: src/lib/tracking/utils/getCookie.ts
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    if (!c) continue
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length))
    }
  }
  return null
}
```

**cleanShopifyId**:

```typescript
// src/lib/utils/cleanShopifyId.ts
export function cleanShopifyId(
  id: string | number | undefined | null
): string | undefined {
  if (!id) return undefined
  const stringId = String(id)

  return stringId.split('/').pop()?.split('?')[0]
}
```

## Generated: **`eventId`**:

**generateEventID**:

```typescript
// Path: src/lib/tracking/utils/generateEventID.ts
export function generateEventID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `evt_${Date.now()}_${crypto.randomUUID()}`
  }

  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}
```

## Saved: **`eventID`** Saved to the AddToCartEventData **`eventData`** object

**prepareAddToCartEvent**:

```typescript
// Path: src/lib/tracking/logic/prepareAddToCartEvent.ts
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import type {
  MetaContentItem,
  PrepareAddToCartInput,
  AddToCartEventData
} from '@types'

export type PrepareAddToCartInput = {
  additionalLine?: { variantId: string; quantity: number } | undefined
  product: ShopifyProduct
  quantity: number
  selectedVariant: ShopifyProductVariant
}

export function prepareAddToCartEvent(
  input: PrepareAddToCartInput
): AddToCartEventData {
  const { product, selectedVariant, quantity, additionalLine } = input

  const basePrice = Number.parseFloat(selectedVariant.price.amount)
  const currency = selectedVariant.price.currencyCode
  let totalQty = quantity

  const mainVariantId =
    cleanShopifyId(selectedVariant.id) || selectedVariant.id.toString()

  // 1.GENERATED
  const eventID = `atc_${cleanShopifyId(selectedVariant.id)}_${Date.now()}`

  const contents: MetaContentItem[] = [
    {
      id: mainVariantId,
      quantity: quantity,
      item_price: basePrice
    }
  ]
  const contentIds: string[] = [mainVariantId]
  let contentName = product.title

  if (additionalLine) {
    const buffId =
      cleanShopifyId(additionalLine.variantId) || additionalLine.variantId

    contents.push({
      id: buffId,
      quantity: additionalLine.quantity,
      item_price: 0
    })
    contentIds.push(buffId)
    totalQty += additionalLine.quantity
    contentName += ' + Utekos Buff™'
  }

  const value = basePrice * quantity

  // 2. SAVED: Locked to the type AddToCartEventData
  return {
    eventID,
    contentName,
    contentIds,
    contents,
    value,
    currency,
    totalQty,
    mainVariantId
  }
}
```

**trackAddToCart**:

```typescript
// Path: src/lib/tracking/client/trackAddToCart.ts
import type { TrackAddToCartOptions } from '@types'
import { prepareAddToCartEvent } from '@/lib/tracking/logic/prepareAddToCartEvent'
import { dispatchAddToCartPixels } from '@/lib/tracking/pixels/dispatchAddToCartPixels'
import { sendAddToCartCapi } from '@/lib/tracking/capi/sendAddToCartCapi'

export async function trackAddToCart(
  input: TrackAddToCartOptions
): Promise<void> {
  const eventData = prepareAddToCartEvent(input)

  dispatchAddToCartPixels({
    eventData,
    product: input.product,
    selectedVariant: input.selectedVariant
  })

  await sendAddToCartCapi(eventData)
}
```

### SENT: Browser (Pixel)

**dispatchAddToCartPixels**:

```typescript
// Path: src/lib/tracking/pixels/dispatchAddToCartPixels.ts
import { logAttribution } from '@/lib/tracking/log/logAttribution'
import type { DispatchPixelsOptions } from '@types'

export function dispatchAddToCartPixels({
  eventData,
  product,
  selectedVariant
}: DispatchPixelsOptions): void {
  const {
    eventID,
    contentName,
    contentIds,
    contents,
    value,
    currency,
    totalQty,
    mainVariantId
  } = eventData

  logAttribution(contentName, value)

  if (typeof window === 'undefined') return

  if (window.snaptr) {
    window.snaptr('track', 'ADD_CART', {
      item_ids: contentIds,
      price: value,
      currency: currency,
      number_items: totalQty,
      description: contentName,
      item_category: product.productType || 'Apparel'
    })
  }

  if (window.dataLayer) {
    const ga4Items = [
      {
        item_id: mainVariantId,
        item_name: product.title,
        item_variant: selectedVariant.title,
        price: eventData.contents[0]?.item_price ?? 0,
        quantity: eventData.contents[0]?.quantity
      }
    ]
    if (contents.length > 1 && contents[1]) {
      ga4Items.push({
        item_id: contents[1].id,
        item_name: product.title,
        item_variant: 'Utekos Buff™',
        price: 0,
        quantity: contents[1].quantity
      })
    }

    window.dataLayer.push({
      event: 'add_to_cart',
      ecommerce: { currency, value, items: ga4Items }
    })
  }

  if (window.fbq) {
    window.fbq(
      'track',
      'AddToCart',
      {
        content_name: contentName,
        content_ids: contentIds,
        content_type: 'product',
        value,
        currency,
        contents,
        num_items: totalQty
      },
      { eventID } // <--- SENT: Explicitly attached to Pixel call
    )
  }

  if (window.ttq) {
    window.ttq.track(
      'AddToCart',
      {
        content_type: 'product',
        content_id: mainVariantId,
        content_name: contentName,
        value,
        currency,
        quantity: totalQty
      },
      { event_id: eventID }
    )
  }

  if (window.pintrk) {
    const pinItems = [
      {
        product_name: product.title,
        product_id: mainVariantId,
        product_category: product.productType || 'Apparel',
        product_price: eventData.contents[0]?.item_price ?? 0,
        product_quantity: eventData.contents[0]?.quantity
      }
    ]

    if (contents.length > 1 && contents[1]) {
      pinItems.push({
        product_name: 'Utekos Buff™',
        product_id: contents[1]?.id,
        product_category: 'Apparel',
        product_price: 0,
        product_quantity: contents[1]?.quantity
      })
    }

    window.pintrk('track', 'AddToCart', {
      value,
      order_quantity: totalQty,
      currency,
      line_items: pinItems
    })
  }
}
```

**parseAndValidateEventPayload**:

```typescript
// Path: src/lib/tracking/utils/parseAndValidateEventPayload.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { MetaEventPayload, ValidationResult } from '@types'

export async function parseAndValidateEventPayload(
  request: NextRequest
): Promise<ValidationResult> {
  let body: MetaEventPayload

  try {
    body = (await request.json()) as MetaEventPayload
  } catch {
    return {
      success: false,
      errorResponse: NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      )
    }
  }

  if (!body.eventName || !body.eventId) {
    return {
      success: false,
      errorResponse: NextResponse.json(
        { error: 'Missing required parameters: eventName or eventId' },
        { status: 400 }
      )
    }
  }

  return { success: true, payload: body }
}
```

**useAddToCartAction**:

```tsx
// Path: src/hooks/useAddToCartAction.ts
'use client'

import { useTransition, useContext } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { CartIdContext } from '@/lib/context/CartIdContext'
import { cartStore } from '@/lib/state/cartStore'
import { useCartMutations } from '@/hooks/useCartMutations'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import {
  useOptimisticCartUpdate,
  type OptimisticItemInput
} from '@/hooks/useOptimisticCartUpdate'
import { handlePostAddToCartCampaigns } from '@/lib/campaigns/cart/handlePostAddToCartCampaigns'
import { trackAddToCart } from '@/lib/tracking/client/trackAddToCart'
import { useAnalytics } from '@/hooks/useAnalytics'
import type {
  UseAddToCartActionProps,
  ShopifyProduct,
  ShopifyProductVariant,
  Cart
} from '@types'

interface ExtendedAddToCartProps extends UseAddToCartActionProps {
  additionalProductData?:
    | {
        product: ShopifyProduct
        variant: ShopifyProductVariant
      }
    | undefined
}

export function useAddToCartAction({
  product,
  selectedVariant,
  additionalLine,
  additionalProductData
}: ExtendedAddToCartProps) {
  const [isTransitioning, startTransition] = useTransition()
  const { addLines } = useCartMutations()
  const { updateCartCache } = useOptimisticCartUpdate()
  const queryClient = useQueryClient()
  const { trackEvent } = useAnalytics()
  const contextCartId = useContext(CartIdContext)

  const isPendingFromMachine = CartMutationContext.useSelector(state =>
    state.matches('mutating')
  )

  const performAddToCart = async (quantity: number) => {
    if (!selectedVariant) {
      toast.error('Vennligst velg en variant før du legger i handlekurven.')
      return
    }

    cartStore.send({ type: 'OPEN' })

    startTransition(async () => {
      try {
        let cartId = contextCartId || (await getCartIdFromCookie())

        if (cartId) {
          const itemsToUpdate: OptimisticItemInput[] = []
          itemsToUpdate.push({
            product,
            variant: selectedVariant,
            quantity
          })

          if (additionalLine && additionalProductData) {
            itemsToUpdate.push({
              product: additionalProductData.product,
              variant: additionalProductData.variant,
              quantity: additionalLine.quantity,
              customPrice: 0
            })
          }
          await updateCartCache({ cartId, items: itemsToUpdate })
        }

        const lines = [{ variantId: selectedVariant.id, quantity }]
        if (additionalLine) {
          lines.push({
            variantId: additionalLine.variantId,
            quantity: additionalLine.quantity
          })
        }

        const mutationPayload =
          additionalLine ? { lines, discountCode: 'GRATISBUFF' } : lines

        await addLines(mutationPayload)

        if (!cartId) {
          cartId = await getCartIdFromCookie()
        }

        if (cartId && additionalLine) {
          const freshCart = queryClient.getQueryData<Cart>(['cart', cartId])

          if (freshCart) {
            let needsFix = false
            const fixedLines = freshCart.lines.map(line => {
              if (line.merchandise.id === additionalLine.variantId) {
                if (parseFloat(line.cost.totalAmount.amount) > 0) {
                  needsFix = true
                  return {
                    ...line,
                    cost: {
                      ...line.cost,
                      totalAmount: { ...line.cost.totalAmount, amount: '0.0' }
                    }
                  }
                }
              }
              return line
            })

            if (needsFix) {
              queryClient.setQueryData(['cart', cartId], {
                ...freshCart,
                lines: fixedLines
              })
            }
          }

          handlePostAddToCartCampaigns({
            cartId,
            additionalLine,
            queryClient
          }).catch(console.error)
        }

        await trackAddToCart({
          product,
          selectedVariant,
          quantity,
          additionalLine
        })

        trackEvent('AddToCart', {
          content_name: product.title,
          value: Number(selectedVariant.price.amount),
          currency: selectedVariant.price.currencyCode
        })
      } catch (mutationError) {
        console.error('Feil under legg-i-kurv operasjon:', mutationError)
        toast.error('Kunne ikke legge varen(e) i handlekurven. Prøv igjen.')

        const cartId = contextCartId || (await getCartIdFromCookie())
        if (cartId) {
          queryClient.invalidateQueries({ queryKey: ['cart', cartId] })
        }
      }
    })
  }

  return {
    performAddToCart,
    isPending: isTransitioning || isPendingFromMachine
  }
}
```

**useAnalytics**:

```tsx
// Path: src/hooks/useAnalytics.ts
import { useEffectEvent } from 'react'
import type {
  MetaUserData,
  MetaEventPayload,
  MetaEventType,
  TrackEventOptions
} from '@types'
import { generateEventID } from '@/lib/tracking/utils/generateEventID'
import { getCookie } from '@/lib/tracking/utils/getCookie'

export function useAnalytics() {
  const trackEvent = useEffectEvent(
    (
      eventName: MetaEventType,
      data: any = {},
      options: TrackEventOptions = {}
    ) => {
      if (typeof window === 'undefined' || !window.fbq) return

      const eventID =
        options.eventID || generateEventID().replace('evt_', 'track_')

      const sourceUrl = window.location.href
      const timestamp = Math.floor(Date.now() / 1000)
      window.fbq('trackCustom', eventName, data, { eventID })

      const fbc = getCookie('_fbc')
      const fbp = getCookie('_fbp')
      const externalId = getCookie('ute_ext_id')
      const emailHash = getCookie('ute_user_hash')

      const userData: MetaUserData = {
        external_id: externalId || undefined,
        fbc: fbc || undefined,
        fbp: fbp || undefined,
        email_hash: emailHash || undefined,
        client_user_agent: navigator.userAgent
      }

      const capiPayload: MetaEventPayload = {
        eventName: eventName,
        eventId: eventID,
        eventSourceUrl: sourceUrl,
        eventTime: timestamp,
        actionSource: 'website',
        userData,
        eventData: data
      }

      fetch('/api/tracking-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(capiPayload),
        keepalive: true
      }).catch(console.error)
    }
  )

  return { trackEvent }
}
```

## Event ID Sent To Server

**sendAddToCartCapi**:

```typescript
// Path: src/lib/tracking/capi/sendAddToCartCapi.ts
import { getCookie } from '@/lib/tracking/utils/getCookie'
import type { MetaUserData, MetaEventPayload, AddToCartEventData } from '@types'

export async function sendAddToCartCapi(
  eventData: AddToCartEventData
): Promise<void> {
  const fbp = getCookie('_fbp')
  const fbc = getCookie('_fbc')
  const extId = getCookie('ute_ext_id')
  const emailHash = getCookie('ute_user_hash')
  const scid = getCookie('_scid')
  const clickId = getCookie('sc_click_id')
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : undefined
  const userData: MetaUserData & { scid?: string; click_id?: string } = {
    ...(fbp ? { fbp } : {}),
    ...(fbc ? { fbc } : {}),
    ...(extId ? { external_id: extId } : {}),
    ...(emailHash ? { email_hash: emailHash } : {}),
    ...(ua ? { client_user_agent: ua } : {}),
    ...(scid ? { scid } : {}),
    ...(clickId ? { click_id: clickId } : {})
  }

  const payload: MetaEventPayload = {
    eventName: 'AddToCart',
    eventId: eventData.eventID, // <--- SENT: `eventId` SENT TO SERVER: Included in JSON payload
    eventSourceUrl: typeof window !== 'undefined' ? window.location.href : '',
    eventTime: Math.floor(Date.now() / 1000),
    actionSource: 'website',
    userData,
    eventData: {
      value: eventData.value,
      currency: eventData.currency,
      content_name: eventData.contentName,
      content_ids: eventData.contentIds,
      content_type: 'product',
      contents: eventData.contents,
      num_items: eventData.totalQty
    }
  }

  try {
    await fetch('/api/tracking-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    })
  } catch (err) {
    console.error('CAPI AddToCart failed', err)
  }
}
```

## ROUTES

**src/app/api/checkout/capture-identifiers/route.ts**:

```typescript
// Path: src/app/api/tracking-events/route.ts
import { type NextRequest } from 'next/server'
import { adaptRequestToEventContext } from '@/lib/tracking/utils/adaptRequestToEventContext'
import { parseAndValidateEventPayload } from '@/lib/tracking/utils/parseAndValidateEventPayload'
import { createTrackingResponse } from '@/lib/tracking/utils/createTrackingResponse'
import { processBrowserEvent } from '@/lib/tracking/services/processBrowserEvent'
import { sendMetaBrowserEvent } from '@/lib/tracking/meta/sendMetaBrowserEvent'
import { sendPinterestBrowserEvent } from '@/lib/tracking/pinterest/sendPinterestBrowserEvent'
import { sendTikTokBrowserEvent } from '@/lib/tracking/tiktok/sendTikTokBrowserEvent'
import { sendGoogleAnalyticsBrowserEvent } from '@/lib/tracking/google/sendGoogleAnalyticsBrowserEvent'
import { sendSnapchatBrowserEvent } from '@/lib/tracking/snapchat/sendSnapchatBrowserEvent'
import { logToAppLogs } from '@/lib/tracking/log/logToAppLogs'

export async function POST(request: NextRequest) {
  const validation = await parseAndValidateEventPayload(request)

  if (!validation.success) {
    return validation.errorResponse
  }

  const context = adaptRequestToEventContext(request)
  const epikFromUrl = request.nextUrl.searchParams.get('epik')

  const enhancedCookies = {
    ...context.cookies,
    epik: epikFromUrl || context.cookies.epik || context.cookies.epik
  }
  // The payload (containing eventId) is passed to the sender service
  // which performs the actual server-to-server POST to Facebook.
  const result = await processBrowserEvent(
    validation.payload,
    enhancedCookies,
    { clientIp: context.clientIp, userAgent: context.userAgent },
    {
      sendMeta: sendMetaBrowserEvent, // <--- Final destination logic
      sendPinterest: sendPinterestBrowserEvent,
      sendTikTok: sendTikTokBrowserEvent,
      sendGoogle: sendGoogleAnalyticsBrowserEvent,
      sendSnapchat: sendSnapchatBrowserEvent,
      logger: logToAppLogs
    }
  )

  return createTrackingResponse(result)
}
```
