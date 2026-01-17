# Overview Cart Related Logic

```tsx
// Path: src/components/AddToCartButton/AddToCart.tsx
'use client'

import { Form } from '@/components/ui/form'
import { CartIdContext } from '@/lib/context/CartIdContext'
import {
  CartMutationContext,
  type CartMutationMachine
} from '@/lib/context/CartMutationContext'
import { createAddToCartFormConfig } from '@/lib/helpers/cart/createAddToCartFormConfig'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { cartStore } from '@/lib/state/cartStore'
import { applyDiscount } from '@/api/lib/cart/applyDiscount'
import type {
  AddToCartFormValues,
  CartMutationEvent,
  ShopifyProduct,
  ShopifyProductVariant,
  MetaContentItem
} from '@types'
import { useContext, useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { ActorRef, StateFrom } from 'xstate'
import { ModalSubmitButton } from '../AddToCartButton/ModalSubmitButton'
import { QuantitySelector } from '../QuantitySelector'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { useQueryClient } from '@tanstack/react-query'
import { useAnalytics } from '@/hooks/useAnalytics'

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
  const queryClient = useQueryClient()
  const { trackEvent } = useAnalytics()

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
        const linesToProcess = [
          { variantId: values.variantId, quantity: values.quantity }
        ]
        if (additionalLine) {
          linesToProcess.push({
            variantId: additionalLine.variantId,
            quantity: additionalLine.quantity
          })
        }
        await createMutationPromise(
          { type: 'ADD_LINES', input: linesToProcess },
          cartActor
        )

        if (additionalLine) {
          try {
            const cartId = contextCartId || (await getCartIdFromCookie())
            if (cartId) {
              const updatedCart = await applyDiscount(cartId, 'GRATISBUFF')
              if (updatedCart) {
                queryClient.setQueryData(['cart', cartId], updatedCart)
              }
            }
          } catch (e) {
            console.error('Feil ved påføring av rabatt:', e)
          }
        }
        const basePrice = Number.parseFloat(selectedVariant.price.amount)
        const currency = selectedVariant.price.currencyCode
        let totalQty = values.quantity

        const mainVariantId =
          cleanShopifyId(selectedVariant.id) || selectedVariant.id.toString()
        const eventID = `atc_${cleanShopifyId(selectedVariant.id)}_${Date.now()}`
        const contents: MetaContentItem[] = [
          {
            id: mainVariantId,
            quantity: values.quantity,
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

        const value = basePrice * values.quantity
        trackEvent(
          'AddToCart',
          {
            content_name: contentName,
            content_ids: contentIds,
            content_type: 'product',
            contents: contents,
            value: value,
            currency: currency,
            num_items: totalQty
          },
          { eventID } // <-- Sender custom ID
        )

        // GA4 (Beholdes manuell)
        if (typeof window !== 'undefined' && window.dataLayer) {
          const ga4Items = [
            {
              item_id: mainVariantId,
              item_name: product.title,
              item_variant: selectedVariant.title,
              price: basePrice,
              quantity: values.quantity
            }
          ]

          if (additionalLine) {
            const buffId =
              cleanShopifyId(additionalLine.variantId)
              || additionalLine.variantId
            ga4Items.push({
              item_id: buffId,
              item_name: product.title,
              item_variant: 'Utekos Buff™',
              price: 0,
              quantity: additionalLine.quantity
            })
          }

          window.dataLayer.push({
            event: 'add_to_cart',
            ecommerce: { currency: currency, value: value, items: ga4Items }
          })
        }

        cartStore.send({ type: 'OPEN' })
      } catch (mutationError) {
        console.error('Feil under legg-i-kurv operasjon:', mutationError)
        toast.error('Kunne ikke legge varen(e) i handlekurven. Prøv igjen.')
      }
    })
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
        <ModalSubmitButton
          isPending={isPending}
          isDisabled={!selectedVariant || !isAvailable || isPending}
          availableForSale={isAvailable}
        />
      </form>
    </Form>
  )
}
```

## applyDiscount.ts

```tsx
// Path: src/api/lib/cart/applyDiscount.ts
'use server'

import { mutationCartDiscountCodesUpdate } from '@/api/graphql/mutations/cart'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import type { ShopifyDiscountCodesUpdateOperation } from '@types'
import { updateTag } from 'next/cache'
import { TAGS } from '@/api/constants'
import { normalizeCart } from '@/lib/helpers/normalizers/normalizeCart' // Ny import

export async function applyDiscount(cartId: string, discountCode: string) {
  if (!cartId) {
    console.error('[applyDiscount] Mangler cartId')
    throw new Error('Kan ikke legge til rabatt: Mangler handlekurv-ID.')
  }

  try {
    const res = await shopifyFetch<ShopifyDiscountCodesUpdateOperation>({
      query: mutationCartDiscountCodesUpdate,
      variables: {
        cartId,
        discountCodes: [discountCode]
      }
    })

    if (!res.success) {
      console.error(
        '[applyDiscount] Shopify Fetch Failed:',
        JSON.stringify(res.error, null, 2)
      )
      throw new Error('Kommunikasjon med Shopify feilet.')
    }

    const { cart, userErrors } = res.body.cartDiscountCodesUpdate

    if (userErrors?.length) {
      const msg = userErrors[0]?.message ?? 'Ugyldig rabattkode.'
      console.warn(`[applyDiscount] UserError: ${msg}`)
      throw new Error(msg)
    }

    updateTag(TAGS.cart)

    // Endring: Normaliserer og returnerer ferdig cart-objekt
    return normalizeCart(cart)
  } catch (error) {
    console.error('[applyDiscount] CRITICAL ERROR:', error)

    const message =
      error instanceof Error ? error.message : 'En ukjent feil oppstod.'
    throw new Error(message)
  }
}
```

## QuickViewModal.tsx | An example of usage elsewhere

```tsx
// Path: src/components/products/quick-view/QuickViewModal.tsx
'use client'

import { getProductAction } from '@/api/lib/products/actions'
import { AddToCart } from '@/components/cart/AddToCart/AddToCart'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useVariantState } from '@/hooks/useVariantState'
import type { ShopifyProduct } from '@types'
import Image from 'next/image'
import { useEffect, useState, useEffectEvent } from 'react'
import { toast } from 'sonner'
import { VariantSelectors } from './VariantSelectors'
import { Price } from '../jsx/Price'
import { FreeBuffSelector } from './FreeBuffSelector'
import { QuickViewModalSkeleton } from '../skeletons/QuickViewModalSkeleton'

interface QuickViewModalProps {
  productHandle: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function QuickViewModal({
  productHandle,
  isOpen,
  onOpenChange
}: QuickViewModalProps) {
  const [productData, setProductData] = useState<ShopifyProduct | null>(null)
  const [buffProduct, setBuffProduct] = useState<ShopifyProduct | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [includeBuff, setIncludeBuff] = useState(true)
  const selectedBuffColor = 'Vargnatt'
  const { variantState, updateVariant } = useVariantState(
    productData ?? undefined,
    false
  )

  const handleFetchError = useEffectEvent(() => {
    toast.error(
      'Beklager, vi kunne ikke laste produktet. Vennligst prøv igjen.'
    )
    onOpenChange(false)
  })

  useEffect(() => {
    async function fetchAllProducts() {
      if (isOpen && !productData) {
        setIsLoading(true)
        try {
          const [mainProduct, freeBuffProduct] = await Promise.all([
            getProductAction(productHandle),
            getProductAction('utekos-buff')
          ])
          setProductData(mainProduct)
          setBuffProduct(freeBuffProduct)
        } catch (error) {
          handleFetchError()
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchAllProducts()
  }, [isOpen, productHandle, productData, handleFetchError])

  const selectedBuffVariant = buffProduct?.variants.edges.find(edge =>
    edge.node.selectedOptions.some(opt => opt.value === selectedBuffColor)
  )?.node

  const additionalLine =
    includeBuff && selectedBuffVariant ?
      {
        variantId: selectedBuffVariant.id,
        quantity: 1
      }
    : undefined

  const selectedVariant =
    variantState.status === 'selected' ? variantState.variant : null
  const featuredImage = selectedVariant?.image ?? productData?.featuredImage

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-5xl'>
        {isLoading || !productData || !selectedVariant ?
          <div className='p-6'>
            <DialogTitle className='sr-only'>
              Laster produktinformasjon
            </DialogTitle>
            <DialogDescription className='sr-only'>
              Vinduet viser detaljer om valgt produkt.
            </DialogDescription>
            <QuickViewModalSkeleton />
          </div>
        : <>
            <DialogHeader className='space-y-3 pb-6'>
              <DialogTitle className='text-3xl font-bold tracking-tight'>
                {productData.title}
              </DialogTitle>
              {productData.description && (
                <DialogDescription asChild>
                  <p className='text-base text-foreground/70 leading-relaxed max-w-2xl'>
                    {productData.description}
                  </p>
                </DialogDescription>
              )}
            </DialogHeader>

            <div className='grid grid-cols-1 gap-10 py-6 lg:grid-cols-2 lg:gap-12'>
              <div className='relative'>
                <div className='sticky top-6'>
                  <div className='relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-lg'>
                    {featuredImage && (
                      <Image
                        src={featuredImage.url}
                        alt={featuredImage.altText ?? productData.title}
                        fill
                        sizes='(max-width: 1024px) 100vw, 50vw'
                        className='object-cover'
                        priority
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-8'>
                <div className='space-y-2'>
                  <p className='text-sm font-medium text-foreground/60 uppercase tracking-wide'>
                    Pris
                  </p>
                  <div className='text-3xl font-bold tracking-tight'>
                    <Price
                      amount={selectedVariant.price.amount}
                      currencyCode={selectedVariant.price.currencyCode}
                    />
                  </div>
                </div>

                <div className='space-y-6'>
                  <VariantSelectors
                    product={productData}
                    selectedVariant={selectedVariant}
                    onUpdateVariant={updateVariant}
                  />
                </div>

                <div className='rounded-2xl border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-50/5 to-transparent p-6 shadow-sm'>
                  <div className='mb-4 flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600/10'>
                      <svg
                        className='h-5 w-5 text-emerald-600'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold'>Nylansering</h3>
                      <p className='text-sm text-foreground/70'>
                        Få en gratis Utekos Buff™ med på kjøpet
                      </p>
                    </div>
                  </div>

                  <FreeBuffSelector
                    buffProduct={buffProduct}
                    includeBuff={includeBuff}
                    onIncludeBuffChange={setIncludeBuff}
                  />
                </div>

                <div className='mt-auto space-y-4'>
                  <AddToCart
                    product={productData}
                    selectedVariant={selectedVariant}
                    {...(additionalLine && { additionalLine })}
                  />

                  {includeBuff && (
                    <p className='text-center md:text-left text-sm text-emerald-600 font-medium'>
                      Utekos Buff™ inkludert (verdi 249,-)
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        }
      </DialogContent>
    </Dialog>
  )
}
```

##
