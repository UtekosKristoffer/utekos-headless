import { useState, useEffect, useTransition, useContext } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { CartIdContext } from '@/lib/context/CartIdContext'
import { cartStore } from '@/lib/state/cartStore'
import { useCartMutations } from '@/hooks/useCartMutations'
import { useOptimisticCartUpdate } from '@/hooks/useOptimisticCartUpdate'
import { getCartIdFromCookie } from '@/lib/actions/getCartIdFromCookie'
import { handlePostAddToCartCampaigns } from '@/lib/campaigns/cart/handlePostAddToCartCampaigns'
import { trackAddToCart } from '@/lib/tracking/client/trackAddToCart'
import { useAnalytics } from '@/hooks/useAnalytics'
import { getVariants } from '@/app/skreddersy-varmen/utekos-orginal/utils/getVariants'
import { PRODUCT_VARIANTS } from '@/api/constants'
import type {
  ShopifyProductVariant,
  ModelKey,
  ColorVariant,
  UsePurchaseLogicProps,
  Cart
} from '@types'
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
        let additionalLine: { variantId: string; quantity: number } | undefined
        let selectedBuffVariant: ShopifyProductVariant | undefined

        const itemsToUpdate: OptimisticItemInput[] = []

        itemsToUpdate.push({
          product: currentShopifyProduct,
          variant: selectedVariant,
          quantity
        })

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
            itemsToUpdate.push({
              product: buffProduct,
              variant: selectedBuffVariant,
              quantity: 1 * quantity,
              customPrice: 0
            })
          }
        }

        if (currentCartId) {
          await updateCartCache({
            cartId: currentCartId,
            items: itemsToUpdate
          })
        }

        const linesToProcess = [{ variantId: selectedVariant.id, quantity }]
        if (additionalLine) {
          linesToProcess.push(additionalLine)
        }

        const mutationPayload =
          additionalLine ?
            { lines: linesToProcess, discountCode: 'GRATISBUFF' }
          : linesToProcess

        // Maskinen oppdaterer cachen. Vi venter på ferdigstillelse.
        await addLines(mutationPayload)

        if (!currentCartId) {
          currentCartId = await getCartIdFromCookie()
        }

        // PRICE GUARD (Post-Correction)
        if (currentCartId && additionalLine) {
          const freshCart = queryClient.getQueryData<Cart>([
            'cart',
            currentCartId
          ])

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
              queryClient.setQueryData(['cart', currentCartId], {
                ...freshCart,
                lines: fixedLines
              })
            }
          }

          toast.success('Gratis Utekos Buff™ registrert!')
          handlePostAddToCartCampaigns({
            cartId: currentCartId,
            additionalLine,
            queryClient
          }).catch(console.error)
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
