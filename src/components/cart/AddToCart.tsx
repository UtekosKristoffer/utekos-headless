// Path: src/components/cart/AddToCart.tsx

import { Form } from '@/components/ui/form'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { createAddToCartFormConfig } from '@/lib/helpers/cart/createAddToCartFormConfig'
import { createAddToCartSubmitHandler } from '@/lib/helpers/cart/createAddToCartSubmitHandler'
import { withSuccessToast } from '@/lib/helpers/cart/withSuccessToast'
import { cartStore } from '@/lib/state/cartStore'
import type {
  AddToCartFormValues,
  ShopifyProduct, // Antar at du har en type for hele produktet
  ShopifyProductVariant
} from '@types'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { AddToCartButton } from './AddToCartButton'

// Definer fbq på vinduet for TypeScript
declare global {
  interface Window {
    fbq: (...args: any[]) => void
  }
}

export function AddToCart({
  product, // <--- ENDRING 1: Legg til product prop
  selectedVariant
}: {
  product: ShopifyProduct // <--- ENDRING 1: Definer typen her
  selectedVariant: ShopifyProductVariant | null
}) {
  const [isTransitioning, startTransition] = useTransition()
  const cartActor = CartMutationContext.useActorRef()
  const isPendingFromMachine = CartMutationContext.useSelector(state =>
    state.matches('mutating')
  )
  const lastError = CartMutationContext.useSelector(
    state => state.context.error
  )
  const form = useForm<AddToCartFormValues>(
    createAddToCartFormConfig(selectedVariant)
  )
  const baseSubmitHandler = createAddToCartSubmitHandler(cartActor)

  // Vi fjerner withSuccessToast for å håndtere det manuelt og få svar tilbake
  // Slik: const submitWithToast = withSuccessToast(baseSubmitHandler, selectedVariant)

  // ENDRING 2: Oppdater handleAddToCart til å være async og inkludere pixel-logikk
  const handleAddToCart = async (values: AddToCartFormValues) => {
    startTransition(async () => {
      try {
        // Vi kaller base-handleren direkte for å kunne 'await'-e resultatet
        const result = await baseSubmitHandler(values)

        // Sjekk for suksess. Antar at handleren returnerer et objekt eller kaster en feil.
        // Tilpass denne logikken basert på hva din baseSubmitHandler faktisk returnerer.
        // For dette eksempelet antar vi at den ikke kaster feil, men fortsetter.

        // Send sporing til Meta Pixel NÅR produktet er lagt i kurven
        if (typeof window.fbq === 'function' && selectedVariant) {
          window.fbq('track', 'AddToCart', {
            content_ids: [selectedVariant.id],
            content_name: product.title, // Bruker produkt-tittel her
            content_type: 'product',
            currency: selectedVariant.price.currencyCode,
            value: parseFloat(selectedVariant.price.amount),
            num_items: values.quantity
          })
        }

        // Vis suksess-toast og åpne handlekurven manuelt
        // Slik: withSuccessToast(() => Promise.resolve(), selectedVariant)() // Kaller toast-funksjonen
        cartStore.send({ type: 'OPEN' })
      } catch (error) {
        // Håndter eventuelle feil her (f.eks. vis en feilmelding)
        console.error('Failed to add to cart:', error)
      }
    })
  }

  useEffect(() => {
    form.setValue('variantId', selectedVariant?.id ?? '')
  }, [selectedVariant?.id, form])
  useEffect(() => {
    if (lastError) {
      // Håndter feil fra XState machine her
    }
  }, [lastError])

  const isAvailable = selectedVariant?.availableForSale ?? false
  const isPending = isTransitioning || isPendingFromMachine

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAddToCart)} className='space-y-4'>
        <AddToCartButton
          isPending={isPending}
          isDisabled={!selectedVariant || !isAvailable || isPending}
          availableForSale={isAvailable}
        />
      </form>
    </Form>
  )
}
