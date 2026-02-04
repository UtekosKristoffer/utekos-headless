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
        const cartId = contextCartId || (await getCartIdFromCookie())
        let additionalLine: { variantId: string; quantity: number } | undefined
        let selectedBuffVariant: ShopifyProductVariant | undefined

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

        if (cartId) {
          await updateCartCache({
            cartId,
            product: currentShopifyProduct,
            variant: selectedVariant,
            quantity
          })

          if (selectedBuffVariant && buffProduct) {
            await updateCartCache({
              cartId,
              product: buffProduct,
              variant: selectedBuffVariant,
              quantity: 1 * quantity
            })
          }

          cartStore.send({ type: 'OPEN' })
        }

        const linesToProcess = [{ variantId: selectedVariant.id, quantity }]
        if (additionalLine) {
          linesToProcess.push(additionalLine)
        }

        await addLines(linesToProcess)

        if (cartId) {
          queryClient.invalidateQueries({ queryKey: ['cart', cartId] })
        }

        if (additionalLine) {
          try {
            if (cartId) {
              const updatedCart = await applyDiscount(cartId, 'GRATISBUFF')
              if (updatedCart) {
                queryClient.setQueryData(['cart', cartId], updatedCart)
                toast.success('Gratis Utekos Buff™ lagt til i handlekurven!')
              }
            }
          } catch (e) {
            console.error('Feil ved påføring av rabatt:', e)
          }
        }

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

        if (!cartId) {
          cartStore.send({ type: 'OPEN' })
        }
      } catch (error) {
        console.error('Feil under kjøp:', error)
        toast.error('Kunne ikke legge varen i handlekurven.')

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
