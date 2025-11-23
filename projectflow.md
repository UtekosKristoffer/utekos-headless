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
//...Importer...

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

## CartDrawer

```tsx
// Path: src/components/cart/CartDrawer/CartDrawer.tsx
'use client'
///...Importer...
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

## Cart

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

## Providers.tsx

```tsx
// Path: src/components/providers/Providers.tsx
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
        {...(process.env.NEXT_PUBLIC_GTM_ID && {
          googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID
        })}
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

## RootLayout

**app/layout.tsx**

```tsx
// Path: src/app/layout.tsx
import './globals.css'
import { getCachedCart } from '../lib/helpers/cart/getCachedCart'
//...Resterende importer...
export const metadata: Metadata = {...}

/**
 * Server Component som laster data før appen vises.
 * Dette sikrer at cartId er tilgjengelig for Pixel/Tracking med en gang.
 */
async function CartProviderLoader({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient()
  const cartId = await getCartIdFromCookie()

  // Prefetch av handlekurv
  // getCachedCart har 'use cache', går derfor lynraskt.
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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='no'>
      <body
        className={`bg-background text-foreground ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OnlineStoreJsonLd />

        <Suspense>
          <CartProviderLoader>
            <Activity>
              <AnnouncementBanner />
            </Activity>

            <Header menu={mainMenu} />

            <main>
              {children}
              <Activity>
                <Footer />
              </Activity>
            </main>

            <Activity>
              <ChatBubble />
            </Activity>
          </CartProviderLoader>
        </Suspense>

        <Toaster closeButton />
        <Analytics mode='production' />
      </body>
    </html>
  )
}
```

## HomePage

**app/page.tsx**

```tsx
// Path: src/app/page.tsx
// ...Importer...
async function FeaturedProductsSection() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className='container md:max-w-7xl max-w-[95%] mx-auto py-12 lg:py-16 sm:py-16'>
        <h1 className='mb-8 md:mb-12 text-center text-3xl font-bold'>
          Våre kunders favoritter{' '}
        </h1>
        <ProductCarousel />
      </section>
    </HydrationBoundary>
  )
}

const HomePage = async () => {
  await connection()

  return (
    <main>
      <HeroSection />

      <Activity>
        <NewProductLaunchSection />
      </Activity>

      <Activity>
        <NewProductInStoreNotice />
      </Activity>

      <Activity>
        <ComfyrobeSection />
      </Activity>

      <Activity>
        <TestimonialConstellation />
      </Activity>

      <Activity>
        <ProductVideoSection />
      </Activity>

      <Activity>
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProductsSection />
        </Suspense>
      </Activity>

      <Activity>
        <SocialProofSection />
      </Activity>

      <Activity>
        <NewStandardSection />
      </Activity>

      <Activity>
        <CachedPromiseSection />
      </Activity>

      <Activity>
        <MomentsSection />
      </Activity>

      <Activity>
        <QualitySection />
      </Activity>

      <Activity>
        <FindInStoreSection />
      </Activity>
    </main>
  )
}

export default HomePage
```
