import { useState, useEffect, useTransition, useContext } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { CartIdContext } from '@/lib/context/CartIdContext'
import { cartStore } from '@/lib/state/cartStore'
import { useCartMutations } from '@/hooks/useCartMutations'
import { useOptimisticCartUpdate } from '@/hooks/useOptimisticCartUpdate'
import { getCartIdFromCookie } from '@/lib/actions/getCartIdFromCookie'
import { trackAddToCart } from '@/lib/tracking/client/trackAddToCart'
import { useAnalytics } from '@/hooks/useAnalytics'
import { getVariants } from '@/app/skreddersy-varmen/utekos-orginal/utils/getVariants'
import { PRODUCT_VARIANTS } from '@/api/constants'
import type { ModelKey, ColorVariant } from 'types/product/ProductTypes'
import type { UsePurchaseLogicProps } from 'types/product/PageProps'
import type { OptimisticItemInput } from '@/hooks/useOptimisticCartUpdate'

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

  const safeColorIndex =
    selectedColorIndex < currentConfig.colors.length ? selectedColorIndex : 0
  const currentColor = currentConfig.colors[safeColorIndex] as ColorVariant

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
    cartStore.send({ type: 'OPEN' })

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
        let currentCartId = contextCartId || (await getCartIdFromCookie())

        const itemsToUpdate: OptimisticItemInput[] = [
          {
            product: currentShopifyProduct,
            variant: selectedVariant,
            quantity
          }
        ]

        if (currentCartId) {
          await updateCartCache({
            cartId: currentCartId,
            items: itemsToUpdate
          })
        }

        const linesToProcess = [{ variantId: selectedVariant.id, quantity }]

        // Maskinen oppdaterer cachen. Vi venter på ferdigstillelse.
        await addLines(linesToProcess)

        await trackAddToCart({
          product: currentShopifyProduct,
          selectedVariant,
          quantity
        })

        trackEvent('AddToCart', {
          content_name: currentShopifyProduct.title,
          value: Number(selectedVariant.price.amount),
          currency: selectedVariant.price.currencyCode
        })
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
    currentColor
  }
}
