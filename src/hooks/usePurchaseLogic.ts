import { useState, useEffect, useTransition, useContext } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { CartIdContext } from '@/lib/context/CartIdContext'
import { cartStore } from '@/lib/state/cartStore'
import { useCartMutations } from '@/hooks/useCartMutations'
import { useOptimisticCartUpdate } from '@/hooks/useOptimisticCartUpdate'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { applyDiscount } from '@/api/lib/cart/applyDiscount'
import { trackAddToCart } from '@/lib/tracking/client/trackAddToCart'
import { useAnalytics } from '@/hooks/useAnalytics'
import { getVariants } from '@/app/skreddersy-varmen/utekos-orginal/utils/getVariants'
import { PRODUCT_VARIANTS } from '@/api/constants'
import type {
  ShopifyProductVariant,
  ModelKey,
  ColorVariant,
  UsePurchaseLogicProps
} from '@types'

export function usePurchaseLogic({ products }: UsePurchaseLogicProps) {
  const [selectedModel, setSelectedModel] = useState<ModelKey>('techdown')
  const [quantity, setQuantity] = useState(1)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('Middels')
  const [isTransitioning, startTransition] = useTransition()

  const { addLines } = useCartMutations()
  const { updateCartCache } = useOptimisticCartUpdate()
  const queryClient = useQueryClient()
  const { trackEvent } = useAnalytics()
  const contextCartId = useContext(CartIdContext)

  const isPendingFromMachine = CartMutationContext.useSelector(state =>
    state.matches('mutating')
  )

  const currentConfig = PRODUCT_VARIANTS[selectedModel]
  const currentShopifyProduct = products[currentConfig.id]
  const buffProduct = products['utekos-buff']

  const safeColorIndex =
    selectedColorIndex < currentConfig.colors.length ? selectedColorIndex : 0
  const currentColor = currentConfig.colors[safeColorIndex] as ColorVariant

  const isTechDownOffer = selectedModel === 'techdown'

  useEffect(() => {
    if (!currentConfig.sizes.includes(selectedSize)) {
      const fallbackSize =
        currentConfig.sizes[1] ?? currentConfig.sizes[0] ?? selectedSize
      setSelectedSize(fallbackSize)
    }
    if (selectedColorIndex >= currentConfig.colors.length) {
      setSelectedColorIndex(0)
    }
  }, [selectedModel, currentConfig, selectedSize, selectedColorIndex])

  const handleAddToCart = async () => {
    if (!currentShopifyProduct) {
      toast.error(`Fant ikke produktdata for ${currentConfig.title}.`)
      return
    }

    const variants = getVariants(currentShopifyProduct)
    const selectedVariant = variants.find((v: any) => {
      const hasSize = v.selectedOptions.some(
        (opt: any) => opt.value.toLowerCase() === selectedSize.toLowerCase()
      )
      const hasColor = v.selectedOptions.some(
        (opt: any) =>
          currentColor
          && opt.value.toLowerCase() === currentColor.name.toLowerCase()
      )
      return hasSize && hasColor
    })

    if (!selectedVariant) {
      toast.error(
        `Fant ikke variant for ${currentColor.name} / ${selectedSize}.`
      )
      return
    }

    if (!selectedVariant.availableForSale) {
      toast.error('Denne varianten er dessverre utsolgt for øyeblikket.')
      return
    }

    startTransition(async () => {
      try {
        // Hent ID *før* vi starter (kan være undefined hvis ny bruker)
        let currentCartId = contextCartId || (await getCartIdFromCookie())

        let additionalLine: { variantId: string; quantity: number } | undefined
        let selectedBuffVariant: ShopifyProductVariant | undefined

        // Finn buff-varianten hvis tilbudet er aktivt
        if (isTechDownOffer && buffProduct) {
          const buffVariants = getVariants(buffProduct)
          selectedBuffVariant = buffVariants.find((v: any) =>
            v.selectedOptions.some(
              (opt: any) => opt.value.toLowerCase() === 'vargnatt'
            )
          )

          if (selectedBuffVariant) {
            additionalLine = {
              variantId: selectedBuffVariant.id,
              quantity: 1 * quantity
            }
          }
        }

        // 1. OPTIMISTIC UPDATE (Kun hvis vi har en cartId)
        if (currentCartId) {
          await updateCartCache({
            cartId: currentCartId,
            product: currentShopifyProduct,
            variant: selectedVariant,
            quantity
          })

          if (selectedBuffVariant && buffProduct) {
            await updateCartCache({
              cartId: currentCartId,
              product: buffProduct,
              variant: selectedBuffVariant,
              quantity: 1 * quantity
            })
          }

          cartStore.send({ type: 'OPEN' })
        }

        // 2. SERVER MUTATION (Legg til varer)
        const linesToProcess = [{ variantId: selectedVariant.id, quantity }]
        if (additionalLine) {
          linesToProcess.push(additionalLine)
        }

        await addLines(linesToProcess)

        // 3. FIX: OPPDATER CART ID & LEGG TIL RABATT
        // Hvis dette var en ny kurv, har vi nå fått en cookie. Vi må lese den på nytt.
        if (!currentCartId) {
          currentCartId = await getCartIdFromCookie()
        }

        if (currentCartId) {
          // Invalider query for å hente ferske data fra server
          queryClient.invalidateQueries({ queryKey: ['cart', currentCartId] })

          // Påfør rabattkoden NÅ som vi garantert har en kurv med varer
          if (additionalLine) {
            try {
              const updatedCart = await applyDiscount(
                currentCartId,
                'GRATISBUFF'
              )
              if (updatedCart) {
                // Oppdater cache direkte med svaret fra applyDiscount for umiddelbar feedback
                queryClient.setQueryData(['cart', currentCartId], updatedCart)
                toast.success('Gratis Utekos Buff™ registrert!')
              }
            } catch (e) {
              console.error('Feil ved påføring av rabatt:', e)
              // Vi stopper ikke flyten her, varene er i kurven, men kanskje uten rabatt.
            }
          }
        }

        // 4. TRACKING
        await trackAddToCart({
          product: currentShopifyProduct,
          selectedVariant,
          quantity,
          additionalLine
        })

        trackEvent('AddToCart', {
          content_name: currentShopifyProduct.title,
          value: Number(selectedVariant.price.amount),
          currency: selectedVariant.price.currencyCode
        })

        // Åpne skuffen til slutt også (sikring)
        cartStore.send({ type: 'OPEN' })
      } catch (error) {
        console.error('Feil under kjøp:', error)
        toast.error('Kunne ikke legge varen i handlekurven.')

        // Rollback / Refresh ved feil
        const cartId = contextCartId || (await getCartIdFromCookie())
        if (cartId) {
          queryClient.invalidateQueries({ queryKey: ['cart', cartId] })
        }
      }
    })
  }

  return {
    selectedModel,
    setSelectedModel,
    quantity,
    setQuantity,
    selectedColorIndex,
    setSelectedColorIndex,
    selectedSize,
    setSelectedSize,
    handleAddToCart,
    isPending: isTransitioning || isPendingFromMachine,
    currentConfig,
    currentColor,
    isTechDownOffer
  }
}
