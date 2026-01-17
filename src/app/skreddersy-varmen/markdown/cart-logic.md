# Cart Logic

## cartState

```ts
// Path: src/lib/state/cartStore.ts
'use client'

import { createStore, type EventPayloadMap } from '@xstate/store'
import { removeZeroQuantityLines } from '@/lib/helpers/cart/removeZeroQuantityLines'
import type { CartUserInterfaceContext, UserInterfaceEventMap } from '@types'

export const cartStore = createStore<
  CartUserInterfaceContext,
  UserInterfaceEventMap,
  EventPayloadMap
>({
  context: {
    open: false,
    pending: 0,
    optimisticCartLines: { lines: {} }
  },
  on: {
    OPEN: context => ({ ...context, open: true }),
    CLOSE: context => ({ ...context, open: false }),
    TOGGLE: context => ({ ...context, open: !context.open }),
    PENDING_INC: context => ({ ...context, pending: context.pending + 1 }),
    PENDING_DEC: context => ({
      ...context,
      pending: Math.max(0, context.pending - 1)
    }),
    SET_LAST_OPERATION: (context, event) => ({
      ...context,
      lastOperation: event.value
    }),
    OPTIMISTIC_CART_LINES_UPDATE: (context, event) => {
      const mergedLines = {
        ...context.optimisticCartLines.lines,
        ...event.delta
      }
      const nextLines = removeZeroQuantityLines(mergedLines)
      return {
        ...context,
        optimisticCartLines: {
          ...context.optimisticCartLines,
          lines: nextLines
        }
      }
    },
    OPTIMISTIC_CART_CLEAR: context => ({
      ...context,
      optimisticCartLines: { lines: {} }
    })
  }
})
```

```ts
// Path: src/lib/state/createCartMutationMachine.ts
import { assign, fromPromise, setup, type ErrorActorEvent } from 'xstate'
import { extractCartErrorMessage } from '@/lib/errors/extractCartErrorMessage'
import type {
  Cart,
  CartActions,
  CartActionsResult,
  CartMutationContext,
  CartMutationEvent
} from '@types'

export const createCartMutationMachine = (
  serverActions: CartActions,
  updateCartCache: (cart: Cart) => void, // ENDRET: Mer presis funksjon
  setCartId: (cartId: string) => void
) =>
  setup({
    types: {
      context: {} as CartMutationContext,
      events: {} as CartMutationEvent
    },
    actors: {
      cartMutator: fromPromise<CartActionsResult, CartMutationEvent>(
        async ({ input: event }) => {
          switch (event.type) {
            case 'ADD_LINES':
              return serverActions.addCartLine(event.input)
            case 'UPDATE_LINE':
              return serverActions.updateCartLineQuantity(event.input)
            case 'REMOVE_LINE':
              return serverActions.removeCartLine(event.input)
            case 'CLEAR':
              return serverActions.clearCart()
            default: {
              const exhaustiveCheck: never = event
              throw new Error(
                `Unhandled event type: ${String(exhaustiveCheck)}`
              )
            }
          }
        }
      )
    }
  }).createMachine({
    id: 'CartMutation',
    initial: 'idle',
    context: { error: null },
    states: {
      idle: {
        entry: assign({ error: null }),
        on: {
          '*': 'mutating'
        }
      },
      mutating: {
        invoke: {
          src: 'cartMutator',
          input: ({ event }) => event,
          onDone: [
            {
              guard: ({ event }) => !event.output.success,
              target: 'idle',
              actions: assign({
                error: ({ event }) =>
                  event.output.message || 'En uventet feil oppstod'
              })
            },
            {
              target: 'idle',
              actions: [
                assign({ error: null }),
                ({ event }) => {
                  const newCart = event.output.cart
                  if (newCart?.id) {
                    setCartId(newCart.id)
                    updateCartCache(newCart)
                  }
                }
              ]
            }
          ],
          onError: {
            target: 'idle',
            actions: assign({
              error: ({ event }: { event: ErrorActorEvent }) => {
                try {
                  const serverActionResult = event.error as CartActionsResult
                  if (serverActionResult?.message) {
                    return serverActionResult.message
                  }
                  return extractCartErrorMessage(event.error)
                } catch (extractionError) {
                  console.error(
                    'Error extracting cart error message:',
                    extractionError
                  )
                  return 'En uventet feil oppstod under behandling av handlekurven'
                }
              }
            })
          }
        }
      }
    }
  })
```

```ts
// Path: src/lib/actions/perform/performCartCreateMutation.ts

'use server'

import { mutationCartCreate } from '@/api/graphql/mutations/cart'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
import { getMarketingAttributes } from '@/lib/tracking/google/getMarketingAttributes'

import type { CartResponse, ShopifyCreateCartOperation } from '@types'

export const performCartCreateMutation = async (
  lines: { variantId: string; quantity: number }[]
): Promise<CartResponse | null> => {
  const attributes = await getMarketingAttributes()

  const result = await shopifyFetch<ShopifyCreateCartOperation>({
    query: mutationCartCreate,
    variables: {
      lines: lines.map(line => ({
        merchandiseId: line.variantId,
        quantity: line.quantity
      })),
      attributes: attributes
    }
  })

  if (!result.success) {
    throw new ShopifyApiError(
      'Failed to create cart in performCartCreateMutation.',
      result.error.errors
    )
  }

  return result.body.cartCreate.cart ?? null
}
```

```ts
// Path: src/lib/actions/perform/performCartCreateMutation.ts

'use server'

import { mutationCartCreate } from '@/api/graphql/mutations/cart'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
import { getMarketingAttributes } from '@/lib/tracking/google/getMarketingAttributes'

import type { CartResponse, ShopifyCreateCartOperation } from '@types'

export const performCartCreateMutation = async (
  lines: { variantId: string; quantity: number }[]
): Promise<CartResponse | null> => {
  const attributes = await getMarketingAttributes()

  const result = await shopifyFetch<ShopifyCreateCartOperation>({
    query: mutationCartCreate,
    variables: {
      lines: lines.map(line => ({
        merchandiseId: line.variantId,
        quantity: line.quantity
      })),
      attributes: attributes
    }
  })

  if (!result.success) {
    throw new ShopifyApiError(
      'Failed to create cart in performCartCreateMutation.',
      result.error.errors
    )
  }

  return result.body.cartCreate.cart ?? null
}
```

## normalizeCart

```ts
// Path: src/lib/helpers/normalizers/normalizeCart.ts

import type { Cart, CartLine, CartResponse } from '@types'
import { normalizeProductImage } from './normalizeProductImage'

type ShopifyCartLineEdge = CartResponse['lines']['edges'][number]

const normalizeCartLine = ({ node }: ShopifyCartLineEdge): CartLine => ({
  id: node.id,
  quantity: node.quantity,
  cost: node.cost,
  merchandise: {
    ...node.merchandise,
    product: {
      ...node.merchandise.product,
      featuredImage: normalizeProductImage(
        node.merchandise.product.featuredImage,
        node.merchandise.product.title
      )
    }
  }
})

export const normalizeCart = (shopifyCart: CartResponse): Cart => {
  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    totalQuantity: shopifyCart.totalQuantity,
    cost: {
      totalAmount: shopifyCart.cost.totalAmount,
      subtotalAmount: shopifyCart.cost.subtotalAmount
    },
    lines: shopifyCart.lines.edges.map(normalizeCartLine)
  }
}
```

```tsx CartIdContext
// Path: src/lib/context/CartIdContext.ts
import { createContext } from 'react'
export const CartIdContext = createContext<string | null>(null)
```

```tsx
// Path: src/lib/context/CartMutationContext.ts

import { createActorContext } from '@xstate/react'
import { createCartMutationMachine } from '@/lib/state/createCartMutationMachine'
import type { CartActions } from '@types'
export type CartMutationMachine = ReturnType<typeof createCartMutationMachine>

export const dummyServerActions: CartActions = {
  addCartLine: async () => {
    throw new Error(
      'CartMutationContext: "addCartLine" server action was not provided.'
    )
  },
  updateCartLineQuantity: async () => {
    throw new Error(
      'CartMutationContext: "updateCartLineQuantity" server action was not provided.'
    )
  },
  removeCartLine: async () => {
    throw new Error(
      'CartMutationContext: "removeCartLine" server action was not provided.'
    )
  },
  clearCart: async () => {
    throw new Error(
      'CartMutationContext: "clearCart" server action was not provided.'
    )
  }
}

export const CartMutationContext = createActorContext<CartMutationMachine>(
  createCartMutationMachine(
    dummyServerActions,
    () => {
      // The placeholder for revalidateCart should also be explicit.
      // It shouldn't do anything, as it will be provided for real.
    },
    () => {
      // Placeholder for setCartId.
    }
  )
)
```

```ts
// Path: api/graphql/mutations/cart.ts
import cart from '@/lib/fragments/cartFragment'

export const mutationCartCreate = /* GraphQL */ `
  mutation cartCreate(
    $lines: [CartLineInput!]
    $attributes: [AttributeInput!]
  ) {
    cartCreate(input: { lines: $lines, attributes: $attributes }) {
      cart {
        ...cart
      }
    }
  }
  ${cart}
`

export const mutationCartLinesAdd = /* GraphQL */ `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cart}
`
export const mutationCartLinesRemove = /* GraphQL */ `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${cart}
`
export const mutationCartLinesUpdate = /* GraphQL */ `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cart}
`
export const mutationCartDiscountCodesUpdate = /* GraphQL */ `
  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        ...cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cart}
`
```

## CartDrawer

```tsx
// Path: src/components/cart/CartDrawer/CartDrawer.tsx
'use client'

import { CartBody } from '@/components/cart/CartBody/CartBody'
import { CartFooter } from '@/components/cart/CartFooter/CartFooter'
import { CartHeader } from '@/components/cart/CartHeader/CartHeader'
import { SmartCartSuggestions } from '@/components/cart/SmartCartSuggestions'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle
} from '@/components/ui/drawer'
import { useCartOpen } from '@/hooks/useCartOpen'
import { useCartQuery } from '@/hooks/useCartQuery'
import { cartStore } from '@/lib/state/cartStore'
import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden'
import * as React from 'react'
import { useTransition } from 'react'
import { createDrawerStateHandler } from './utils/createDrawerStateHandler'
import { CartTrigger } from '@/components/cart/CartTrigger'
import { Activity } from 'react'

export function CartDrawer(): React.JSX.Element {
  const open = useCartOpen()
  const { data: cart } = useCartQuery()
  const [, startTransition] = useTransition()
  const baseHandleStateChange = createDrawerStateHandler(cartStore)

  const handleStateChangeWithTransition = React.useCallback(
    (isOpen: boolean) => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          startTransition(() => {
            baseHandleStateChange(isOpen)
          })
        })
      } else {
        startTransition(() => {
          baseHandleStateChange(isOpen)
        })
      }
    },
    [baseHandleStateChange]
  )

  return (
    <Drawer
      open={open}
      onOpenChange={handleStateChangeWithTransition}
      direction='right'
    >
      <Activity>
        <CartTrigger />
      </Activity>

      <Activity>
        <DrawerContent className='h-full max-h-full overflow-hidden'>
          <VisuallyHidden>
            <DrawerTitle>Handlekurv</DrawerTitle>
            <DrawerDescription>
              Oversikt over varer i handlekurven og handlingsknapper.
            </DrawerDescription>
          </VisuallyHidden>

          <div className='flex flex-col h-full overflow-hidden'>
            <Activity>
              <CartHeader />
            </Activity>

            <Activity>
              <div className='flex-1 min-h-0 overflow-y-auto'>
                <CartBody />
              </div>
            </Activity>

            <Activity>
              <div className='max-h-[35vh] overflow-y-auto'>
                <SmartCartSuggestions cart={cart} />
              </div>
            </Activity>

            <Activity>
              <CartFooter cart={cart} />
            </Activity>
          </div>
        </DrawerContent>
      </Activity>
    </Drawer>
  )
}
```

## CartStateDrawer

```tsx
// Path: src/components/cart/CartDrawer/utils/createDrawerStateHandler.ts

import { cartStore } from '@/lib/state/cartStore'

export const createDrawerStateHandler =
  (store: typeof cartStore) => (isOpen: boolean) =>
    store.send({ type: isOpen ? 'OPEN' : 'CLOSE' })
```

```tsx
// Path: src/components/cart/Cart.tsx
'use client'

import { useEffect, useState } from 'react'
import { CartDrawer } from './CartDrawer/CartDrawer'

export function Cart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <CartDrawer />
}
```

## SmartCartSuggestions

```tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { FREE_SHIPPING_THRESHOLD } from '@/api/constants'
import { getAccessoryProducts } from '@/api/lib/products/getAccessoryProducts'
import { getRecommendedProducts } from '@/api/lib/products/getRecommendedProducts'
import { Progress } from '@/components/ui/progress'
import { formatNOK } from '@/lib/utils/formatters/formatNOK'
import type { Cart, ShopifyProduct } from '@types'
import { FreeShippingConfirmation } from './FreeShippingConfirmation'
import { UpsellItem } from './UpsellItem'

export function SmartCartSuggestions({
  cart
}: {
  cart: Cart | null | undefined
}) {
  const { data: recommendedProducts = [] } = useQuery<ShopifyProduct[]>({
    queryKey: ['products', 'recommended'],
    queryFn: getRecommendedProducts
  })
  const { data: accessoryProducts = [] } = useQuery<ShopifyProduct[]>({
    queryKey: ['products', 'accessory'],
    queryFn: getAccessoryProducts
  })

  if (!cart || cart.totalQuantity === 0) {
    return null
  }

  const subtotal = parseFloat(cart.cost.subtotalAmount.amount)
  const cartLineProductIds = new Set(
    cart.lines.map(line => line.merchandise.product.id)
  )

  if (subtotal < FREE_SHIPPING_THRESHOLD) {
    const remainingAmount = FREE_SHIPPING_THRESHOLD - subtotal
    const allPotential = [...accessoryProducts, ...recommendedProducts]
    const availableSuggestions = [
      ...new Map(allPotential.map(p => [p.id, p])).values()
    ].filter(p => !cartLineProductIds.has(p.id))

    const sorted = [...availableSuggestions].sort((a, b) => {
      const priceA = parseFloat(a.priceRange.minVariantPrice.amount)
      const priceB = parseFloat(b.priceRange.minVariantPrice.amount)
      const aIsBridge = priceA >= remainingAmount
      const bIsBridge = priceB >= remainingAmount
      if (aIsBridge && !bIsBridge) return -1
      if (!aIsBridge && bIsBridge) return 1
      if (aIsBridge && bIsBridge) return priceA - priceB
      return priceB - priceA
    })

    const suggestions = sorted.slice(0, 1)
    if (suggestions.length === 0) return null

    const showDiscountHint = accessoryProducts.some(p => p.id === sorted[0]?.id)

    return (
      <div className='border-t border-neutral-800 p-6'>
        <div className='text-center'>
          <p>
            Du er kun{' '}
            <span className='font-bold text-white'>
              {formatNOK(remainingAmount)}
            </span>{' '}
            unna fri frakt!
          </p>
          <Progress
            value={(subtotal / FREE_SHIPPING_THRESHOLD) * 100}
            className='mt-2 h-2'
          />
        </div>
        <div className='mt-4 space-y-4'>
          {suggestions.map(product => (
            <UpsellItem
              key={product.id}
              product={product}
              showDiscountHint={showDiscountHint}
            />
          ))}
        </div>
      </div>
    )
  }

  const accessoriesToShow = accessoryProducts.filter(
    p => !cartLineProductIds.has(p.id)
  )

  const suggestions =
    accessoriesToShow.length > 0 ?
      accessoriesToShow
    : recommendedProducts.filter(p => !cartLineProductIds.has(p.id)).slice(0, 2)

  if (suggestions.length === 0) {
    return (
      <div className='border-t border-neutral-800 p-6'>
        <FreeShippingConfirmation />
      </div>
    )
  }

  const showDiscountHint = accessoriesToShow.length > 0
  const title =
    accessoriesToShow.length > 0 ?
      'Fullfør din Utekos'
    : 'Andre livsnytere har også sett på'

  return (
    <div className='border-t border-neutral-800 p-6'>
      <FreeShippingConfirmation />
      <div className='mt-6'>
        <h3 className='text-sm font-semibold text-center'>{title}</h3>
        <div className='mt-4 space-y-4'>
          {suggestions.map(product => (
            <UpsellItem
              key={product.id}
              product={product}
              showDiscountHint={showDiscountHint}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
```

## UpsellItem

```tsx
// Path: src/components/cart/CartDrawer/UpsellItem.tsx
'use client'
import { getInitialAvailableOptions } from '@/components/ProductCard/getInitialAvailableOptions'
import { findMatchingVariant } from '@/components/ProductCard/findMatchingVariant'
import { Button } from '@/components/ui/button'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { ShopifyProduct, UpsellItemProps } from '@types'
import { ArrowRightIcon, PercentIcon } from 'lucide-react'
import Image from 'next/image'

export function UpsellItem({ product, showDiscountHint }: UpsellItemProps) {
  const cartActor = CartMutationContext.useActorRef()

  const selectedOptions = getInitialAvailableOptions(product)
  const selectedVariant = findMatchingVariant(product, selectedOptions)

  const originalPrice = parseFloat(product.priceRange.minVariantPrice.amount)
  const discountedPrice = originalPrice * 0.9 // 10% rabatt

  const handleAddToCart = () => {
    if (selectedVariant) {
      cartActor.send({
        type: 'ADD_LINES',

        input: [{ variantId: selectedVariant.id, quantity: 1 }]
      })
    }
  }
  return (
    <div
      className={`mt-4 flex flex-col gap-3 rounded-lg border ${
        showDiscountHint ?
          'border-sky-500/30 bg-sky-900/10 ring-1 ring-inset ring-sky-500/20'
        : 'border-neutral-800 bg-neutral-900/50'
      } p-3`}
    >
      <div className='flex items-start gap-3'>
        <div className='relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md'>
          {product.featuredImage && (
            <Image
              src={product.featuredImage.url}
              alt={product.title}
              fill
              className='object-cover'
              sizes='48px'
            />
          )}
        </div>

        <div className='flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between min-w-0'>
          {/* Produktinfo */}
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium line-clamp-2'>{product.title}</p>
            <div className='flex items-center gap-2 text-xs text-muted-foreground mt-1'>
              {showDiscountHint ?
                <>
                  <span className='line-through'>
                    {formatPrice(product.priceRange.minVariantPrice)}
                  </span>
                  <span className='font-bold text-white'>
                    {formatPrice({
                      amount: discountedPrice.toString(),
                      currencyCode: 'NOK'
                    })}
                  </span>
                </>
              : <span className='font-bold text-white'>
                  {formatPrice(product.priceRange.minVariantPrice)}
                </span>
              }
            </div>
          </div>

          <Button
            size='sm'
            onClick={handleAddToCart}
            disabled={!selectedVariant}
            className='w-full sm:w-auto sm:flex-shrink-0'
          >
            Legg til <ArrowRightIcon className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </div>

      {showDiscountHint && (
        <div className='flex items-center justify-center text-xs font-semibold text-sky-400 border-t border-sky-500/20 pt-2'>
          <PercentIcon className='h-3 w-3 mr-1.5' />
          Du får 10% rabatt på dette produktet!
        </div>
      )}
    </div>
  )
}
```

## fetchCart

```ts
// Path: src/lib/helpers/cart/fetchCart.ts

import { getCartQuery } from '@/api/graphql/queries/cart/getCartQuery'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import { CartNotFoundError } from '@/lib/errors/CartNotFoundError'
import { normalizeCart } from '@/lib/helpers/normalizers/normalizeCart'
import type { Cart, ShopifyCartOperation } from '@types'

export const fetchCart = async (cartId: string): Promise<Cart | null> => {
  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId }
  })

  if (!res.success) {
    console.error('Failed to fetch cart:', res.error.errors)
    return null
  }

  if (!res.body.cart) {
    console.warn(new CartNotFoundError(`Cart with ID ${cartId} was not found.`))
    return null
  }

  return normalizeCart(res.body.cart)
}
```

```ts
'use server'
// Path: src/lib/helpers/getCartIdFromCookie.ts

import { cookies } from 'next/headers'
import { CART_COOKIE_NAME } from '@/constants/cookies'

export async function getCartIdFromCookie(): Promise<string | null> {
  const cookieStore = await cookies()
  const cartIdCookie = cookieStore.get(CART_COOKIE_NAME)

  return cartIdCookie?.value ?? null
}
```

## getCartQuery

```ts
// Path: src/api/graphql/queries/cart/getCartQuery.ts

import cartFragment from '@/lib/fragments/cartFragment'
export const getCartQuery = `
query getCart($cartId: ID!) {
    cart(id: $cartId) {
        ...cart
      }
    }
  ${cartFragment}
`
```

## useCartQuery

```ts
// Path: src/hooks/useCartQuery.tsx
import { useQuery } from '@tanstack/react-query'
import { useCartId } from '@/hooks/useCartId'
import { fetchCart } from '@/lib/helpers/cart/fetchCart'
import type { Cart } from '@types'

export const useCartQuery = () => {
  const cartId = useCartId()

  return useQuery<Cart | null>({
    queryKey: ['cart', cartId] as const,
    queryFn: async () => {
      if (!cartId) return null
      return fetchCart(cartId)
    },
    enabled: !!cartId,
    staleTime: 1000 * 60, // 1 minute stale time
    gcTime: 1000 * 60 * 10, // 10 minutes garbage collection
    refetchOnWindowFocus: false, // Disable auto-refetch on focus
    refetchOnMount: false // Don't refetch on mount if data exists
  })
}
```

```tsx
// Path: src/components/providers/CartIdProvider.tsx
import { CartIdContext } from '@/lib/context/CartIdContext'

export const CartIdProvider = CartIdContext.Provider
```

## CartProviderLoader

```tsx
import { getCachedCart } from '@/lib/helpers/cart/getCachedCart'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import Providers from '@/components/providers/Providers'
import type { ReactNode } from 'react'
import { QueryClient, dehydrate } from '@tanstack/react-query'

export async function CartProviderLoader({
  children
}: {
  children: ReactNode
}) {
  const queryClient = new QueryClient()
  const cartId = await getCartIdFromCookie()

  await queryClient.prefetchQuery({
    queryKey: ['cart', cartId],
    queryFn: () => getCachedCart(cartId)
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <Providers dehydratedState={dehydratedState} cartId={cartId}>
      {children}
    </Providers>
  )
}
```

## providers

```tsx
'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HydrationBoundary } from '@tanstack/react-query'
import { useState } from 'react'
import { getQueryClient } from '@/api/lib/getQueryClient'
import { CartMutationClient } from '@/clients/CartMutationClient'
import { serverActions } from '@/constants/serverActions'
import { CartIdProvider } from '@/components/providers/CartIdProvider'
import type { DehydratedState } from '@tanstack/react-query'
import { CookieConsentProvider } from '@/components/cookie-consent/CookieConsentProvider'
import CookieConsent from '@/components/cookie-consent/CookieConsent'
import { ConditionalTracking } from '../analytics/ConditionalTracking'

interface ProvidersProps {
  children: React.ReactNode
  cartId: string | null
  dehydratedState: DehydratedState
}

export default function Providers({
  children,
  cartId: initialCartId,
  dehydratedState
}: ProvidersProps) {
  const queryClient = getQueryClient()
  const [cartId, setCartId] = useState<string | null>(initialCartId)

  return (
    <CookieConsentProvider>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <CartIdProvider value={cartId}>
            <CartMutationClient
              actions={serverActions}
              cartId={cartId}
              setCartId={setCartId}
            >
              {children}
            </CartMutationClient>
          </CartIdProvider>
        </HydrationBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <CookieConsent />

      <ConditionalTracking
        {...(process.env.NEXT_PUBLIC_META_PIXEL_ID && {
          metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID
        })}
        {...(process.env.NEXT_PUBLIC_SNAP_PIXEL_ID && {
          snapPixelId: process.env.NEXT_PUBLIC_SNAP_PIXEL_ID
        })}
        {...(process.env.NEXT_PUBLIC_POSTHOG_KEY && {
          postHogApiKey: process.env.NEXT_PUBLIC_POSTHOG_KEY
        })}
        {...(process.env.NEXT_PUBLIC_POSTHOG_HOST && {
          postHogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST
        })}
      />
    </CookieConsentProvider>
  )
}
```

## layout.tsx

```tsx
// Path: src/app/layout.tsx
import './globals.css'
import { geistSans } from '@/db/config/font.config'
import { Suspense, type ReactNode } from 'react'
import { mainMenu } from '@/db/config/menu.config'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from '@/components/ui/sonner'
import AnnouncementBanner from '@/components/frontpage/components/SpecialOfferSection/AnnouncementBanner'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import type { RootLayoutProps } from '@types'
import type { Metadata } from 'next'
import { ChatBotAgent } from '@/components/chat/ChatBotAgent/source-code'
import { OnlineStoreJsonLd } from './OnlineStoreJsonLd'
import { GoogleTagManager } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { NewsletterPopup } from '@/components/NewsletterPopup'
import { CartProviderLoader } from '@/components/providers/CartProviderLoader'
import { CookieConsentBanner } from '@/components/CookieBanner'
export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: {
    default: 'Utekos® - Skreddersy varmen.',
    template: '%s | Utekos®'
  },
  description:
    'For kompromissløs komfort og overlegen allsidighet. Med tusenvis av fornøyde livsnytere og gjennomtestede løsninger kan du stole på at Utekos vil forlenge og oppgradere dine utendørsopplevelser. Juster, form og nyt.',

  alternates: {
    canonical: '/'
  },
  applicationName: 'Utekos',
  category: 'Yttertøy',
  keywords: ['Yttertøy', 'Dun', 'Varmedress', 'Komfortplagg', 'Utekos'],
  manifest: '/manifest.json',
  authors: [{ name: 'Utekos', url: 'https://utekos.no' }],
  creator: 'Utekos',
  publisher: 'Utekos',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  facebook: {
    appId: '1154247890253046'
  },

  appleWebApp: {
    capable: true,
    title: 'Utekos',
    statusBarStyle: 'default'
  },
  openGraph: {
    type: 'website',
    locale: 'no_NO',
    url: 'https://utekos.no',
    siteName: 'Utekos',
    title: 'Utekos® - Skreddersy varmen.',
    description:
      'Kompromissløs komfort. Overlegen allsidighet. Juster, form og nyt.',
    images: {
      url: 'https://utekos.no/og-kate-linn-kikkert-master.png',
      width: 1200,
      height: 630,
      alt: 'To kvinner som koser seg utendørs på terrassen med varme komfortplagg fra Utekos.'
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'G2CuMG6i_BKaNpqVN9N_SS2rvFxXWUOwydpZH0hp2NM',
    other: {
      'facebook-domain-verification': 'e3q80hk1igl2celczeysvf7y1mltrs'
    }
  }
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='no'>
      <GoogleTagManager gtmId='GTM-5TWMJQFP' />
      <body
        className={`bg-background text-foreground ${geistSans.className} antialiased`}
      >
        <OnlineStoreJsonLd />
        <Suspense>
          <CartProviderLoader>
            <AnnouncementBanner />
            <Header menu={mainMenu} />
            <main>
              {children}
              <SpeedInsights />
              <Analytics mode='production' />
              <ChatBotAgent />
            </main>
            <Footer />
            <NewsletterPopup />
            <CookieConsentBanner />
          </CartProviderLoader>
        </Suspense>
        <Toaster closeButton />
      </body>
    </html>
  )
}
```
