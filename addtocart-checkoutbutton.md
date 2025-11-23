# Komprimerte utgaver av AddToCart.tsx og CheckoutButton.tsx

**AddToCart.tsx kontekst** `AddToCart` blir brukt slik i `ProductPageView`:

```tsx
// ...ProductPageView-logikk...
<Activity>
  <AddToCart
    product={productData}
    selectedVariant={selectedVariant}
    {...(additionalLine && { additionalLine })}
  />
</Activity>

// ProductPageView-logikk fortsetter...
```

```tsx
// ...ProductPage.tsx-logikk...

return (

    <>

      <ProductJsonLd handle={handle} />
      <Activity>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductPageController handle={handle} />
        </HydrationBoundary>
      </Activity>
// ProductPage.tsx-logikk fortsetter...
```

**Merk:** `ProductPageView` er en Client Component som renderes via
`ProductPageController` i `ProductPage`. `ProductPage` er plassert i
/produkter/[handle]/page.tsx, og er en Server Component som kaller
`await connection()` som første handling.

## AddToCart.tsx

```tsx
// Path: src/components/cart/AddToCart.tsx

'use client'

import { CartIdContext } from '@/lib/context/CartIdContext'
import {
  CartMutationContext,
  type CartMutationMachine
} from '@/lib/context/CartMutationContext'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { cartStore } from '@/lib/state/cartStore'
//...Resterende importer

export function AddToCart({
  product,
  selectedVariant,
  additionalLine
}: {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant | null
  additionalLine?: { variantId: string; quantity: number }
}) {
  const [isTransitioning, startTransition] = useTransition()
  const cartActor = CartMutationContext.useActorRef()
  const isPendingFromMachine = CartMutationContext.useSelector(state =>
    state.matches('mutating')
  )
  const lastError = CartMutationContext.useSelector(
    state => state.context.error
  )

  const contextCartId = useContext(CartIdContext)
  const form = useForm<AddToCartFormValues>(
    createAddToCartFormConfig(selectedVariant)
  )

  const createMutationPromise = (
    event: CartMutationEvent,
    actor: ActorRef<StateFrom<CartMutationMachine>, CartMutationEvent>
  ): Promise<StateFrom<CartMutationMachine>> => {
    return new Promise(resolve => {
      let isInitialEmission = true
      const subscription = actor.subscribe(snapshot => {
        if (isInitialEmission) {
          isInitialEmission = false
          return
        }

        if (snapshot.matches('idle')) {
          subscription.unsubscribe()
          resolve(snapshot)
        }
      })
      actor.send(event)
    })
  }

  const handleAddToCart = async (values: AddToCartFormValues) => {
    if (!selectedVariant) {
      toast.error('Vennligst velg en variant før du legger i handlekurven.')
      return
    }

    startTransition(async () => {
      try {
        await createMutationPromise(
          {
            type: 'ADD_LINES',
            input: { variantId: values.variantId, quantity: values.quantity }
          },
          cartActor
        )

        if (additionalLine) {
          await createMutationPromise(
            {
              type: 'ADD_LINES',
              input: {
                variantId: additionalLine.variantId,
                quantity: additionalLine.quantity
              }
            },
            cartActor
          )

          try {
           ...
            }
          } catch (discountError) {
            ...
            }
          }
        }

        const basePrice = Number.parseFloat(selectedVariant.price.amount)
        const currency = selectedVariant.price.currencyCode
        let totalQty = values.quantity

        const contents: CustomData['contents'] = [
          {
            id: selectedVariant.id.toString(),
            quantity: values.quantity,
            item_price: basePrice
          }
        ]
        const contentIds: string[] = [selectedVariant.id.toString()]
        let contentName = product.title

        if (additionalLine) {
          contents.push({
            id: additionalLine.variantId.toString(),
            quantity: additionalLine.quantity
          })
          contentIds.push(additionalLine.variantId.toString())
          totalQty += additionalLine.quantity
          contentName += ' + Utekos Buff™'
        }

        const value = basePrice * values.quantity

        const eventID = `atc_${selectedVariant.id}_${Date.now()}`

        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
          const fbqParams = {...}

          window.fbq('track', 'AddToCart', fbqParams, { eventID })

          if (process.env.NODE_ENV === 'development') {...}
        }

        const ua =
          typeof navigator !== 'undefined' ? navigator.userAgent : undefined
        const fbp = getCookie('_fbp')
        const fbc = getCookie('_fbc')
        const externalId = getCookie('ute_ext_id')

        const capiPayload: {...}

        if (ua) capiPayload.userData!.client_user_agent = ua
        if (fbp) capiPayload.userData!.fbp = fbp
        if (fbc) capiPayload.userData!.fbc = fbc
        if (externalId) capiPayload.userData!.external_id = externalId

        if (process.env.NODE_ENV === 'development') {...}

        sendJSON('/api/meta-events', capiPayload)

        if (
          typeof window !== 'undefined'
          && typeof window.dataLayer !== 'undefined'
        ) {
          const ga4Items = [
            {...}
          ]

          if (additionalLine) {...
            })
          }
          const ga4Data = {...}
            }
          }

          window.dataLayer.push(ga4Data)

          if (process.env.NODE_ENV === 'development') {
           ...
          }
        }

        cartStore.send({ type: 'OPEN' })
      } catch (mutationError) {...})
  }

  useEffect(() => {
    form.setValue('variantId', selectedVariant?.id ?? '')
  }, [selectedVariant?.id, form])

  useEffect(() => {
    if (lastError) {
      console.error('Feil fra handlekurv-maskin:', lastError)
    }
  }, [lastError])

  const isAvailable = selectedVariant?.availableForSale ?? false
  const isPending = isTransitioning || isPendingFromMachine

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAddToCart)}
        className='flex flex-col gap-4'
      >
        <div>
          <label className='mb-2 block text-sm font-medium'>Antall</label>
          <QuantitySelector />
        </div>
        <Activity>
          <ModalSubmitButton
            isPending={isPending}
            isDisabled={!selectedVariant || !isAvailable || isPending}
            availableForSale={isAvailable}
          />
        </Activity>
      </form>
    </Form>
  )
}
```

## CheckoutButton.tsx

```tsx
'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import type { CustomData, UserData } from '@types'
import { getCheckoutAriaLabel } from './getCheckoutAriaLabel'
import { getCookie } from './getCookie'
import { sendJSON } from './sendJSON'
import { generateEventID } from './generateEventID'

export const CheckoutButton = ({
  checkoutUrl,
  subtotal,
  isPending,
  cartId,
  subtotalAmount,
  currency,
  item_ids,
  num_items,
  className,
  children,
  ...props
}: {
  checkoutUrl: string
  subtotal: string
  isPending: boolean
  cartId: string | null | undefined
  subtotalAmount: string
  currency: string
  item_ids: string[]
  num_items: number
  className?: string
  children?: React.ReactNode
} & Omit<
  React.ComponentProps<typeof Button>,
  'asChild' | 'disabled' | 'aria-label'
>): React.JSX.Element => {
  const onClick = (_e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isPending) return
    if (!cartId) {
      console.error('CheckoutButton onClick: Missing cartId!')
      return
    }

    try {
      sendJSON('/api/log', {
        event: 'Checkout Started',
        level: 'info',
        context: { cartId }
      })
      const fbp = getCookie('_fbp')
      const fbc = getCookie('_fbc')
      const extId = getCookie('ute_ext_id')
      const ua =
        typeof navigator !== 'undefined' ? navigator.userAgent : undefined
      const sourceUrl =
        typeof window !== 'undefined' ? window.location.href : undefined

      const eventID = generateEventID().replace('evt_', 'ic_')

      const captureBody = {
        cartId,
        checkoutUrl,
        eventId: eventID,
        userData: {} as UserData
      }

      if (fbp) captureBody.userData.fbp = fbp
      if (fbc) captureBody.userData.fbc = fbc
      if (extId) captureBody.userData.external_id = extId
      if (ua) captureBody.userData.client_user_agent = ua

      sendJSON('/api/checkout/capture-identifiers', captureBody)
      const value = Number.parseFloat(subtotalAmount || '0') || 0

      const customData: CustomData = {...}

      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', customData, { eventID })
      }

      const capiPayload: {...}

      if (ua) capiPayload.userData!.client_user_agent = ua
      if (extId) capiPayload.userData!.external_id = extId
      if (fbp) capiPayload.userData!.fbp = fbp
      if (fbc) capiPayload.userData!.fbc = fbc

      sendJSON('/api/meta-events', capiPayload)
    } catch (error) {
      console.error('Feil under sending av checkout-events:', error)
    }
  }

  return (
    <Button
      asChild
      className={className}
      disabled={isPending}
      aria-label={getCheckoutAriaLabel(subtotal, isPending)}
      {...props}
    >
      <a
        href={checkoutUrl}
        onClick={onClick}
        aria-disabled={isPending}
        rel='noopener noreferrer'
      >
        {children || (isPending ? 'Behandler...' : 'Gå til kassen')}
      </a>
    </Button>
  )
}
```

## CartFooter.tsx

```tsx
// Path: src/components/cart/CartFooter.tsx
//...Importer...

export const CartFooter = ({
  cart
}: {
  cart: Cart | null | undefined
}): React.JSX.Element | null => {
  const isPending = useCartPending() > 0

  if (!shouldRenderFooter(cart)) {
    return null
  }

  const subtotalFormatted = formatPrice(cart!.cost.subtotalAmount)
  const cartId = cart!.id // Hent ut cartId
  const subtotalAmount = cart!.cost.subtotalAmount.amount // string
  const currency = cart!.cost.subtotalAmount.currencyCode // string
  const item_ids = cart!.lines.map(line => line.merchandise.id) // string[]
  const num_items = cart!.totalQuantity // number

  return (
    <DrawerFooter className='border-t'>
      <SubtotalDisplay subtotal={subtotalFormatted} />
      <CheckoutButton
        checkoutUrl={cart!.checkoutUrl}
        subtotal={subtotalFormatted}
        isPending={isPending}
        cartId={cartId}
        subtotalAmount={subtotalAmount}
        currency={currency}
        item_ids={item_ids}
        num_items={num_items}
        className='mt-4'
      />
    </DrawerFooter>
  )
}
```

**Bruk av CartFooter i CartDrawer**

```tsx
<Activity>
  <CartFooter cart={cart} />
</Activity>
```

## Header

```tsx
// Path: src/components/header/Header.tsx
//...Importer...

export default function Header({ menu }: { menu: MenuItem[] }) {
  return (
    <header className='sticky top-0 z-50 border-b border-white/10 bg-sidebar-foreground py-3'>
      <div className='container mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
        <Activity>
          <HeaderLogo />
        </Activity>
        <Activity>
          <Suspense fallback={null}>
            <ClientDesktopNavigation menu={menu} />
          </Suspense>
        </Activity>
        <div className='flex items-center gap-2'>
          <Activity>
            <HeaderSearch />
          </Activity>
          <Activity>
            <Cart />
          </Activity>
          <Activity>
            <ClientMobileMenu menu={menu} />
          </Activity>
        </div>
      </div>
    </header>
  )
}
```
