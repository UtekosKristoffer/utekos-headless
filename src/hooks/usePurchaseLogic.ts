import { useState, useEffect, useTransition, useContext } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { CartIdContext } from '@/lib/context/CartIdContext'
import { cartStore } from '@/lib/state/cartStore'
import { useCartMutations } from '@/hooks/useCartMutations'
import { useOptimisticCartUpdate } from '@/hooks/useOptimisticCartUpdate'
import { getCartIdFromCookie } from '@/lib/actions/getCartIdFromCookie'
import { fetchCart } from '@/lib/helpers/cart/fetchCart'
import { trackAddToCart } from '@/lib/tracking/client/trackAddToCart'
import { useAnalytics } from '@/hooks/useAnalytics'
import { getVariants } from '@/app/skreddersy-varmen/utekos-orginal/utils/getVariants'
import { PRODUCT_VARIANTS } from '@/api/constants'
import type { ModelKey, ColorVariant } from 'types/product/ProductTypes'
import type { UsePurchaseLogicProps } from 'types/product/PageProps'
import type { Cart } from 'types/cart'
import type { OptimisticItemInput } from '@/hooks/useOptimisticCartUpdate'

export function usePurchaseLogic({ products }: UsePurchaseLogicProps) {
  const [selectedModel, setSelectedModel] = useState<ModelKey>('techdown')
  const [quantity, setQuantity] = useState(1)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('Middels')
  const [isTransitioning, startTransition] = useTransition()
  const [isCheckoutRedirecting, setIsCheckoutRedirecting] = useState(false)

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

  const resolveSelectedVariant = () => {
    if (!currentShopifyProduct) {
      toast.error(`Fant ikke produktdata for ${currentConfig.title}.`)
      return null
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
      return null
    }

    if (!selectedVariant.availableForSale) {
      toast.error('Denne varianten er dessverre utsolgt for øyeblikket.')
      return null
    }

    return {
      product: currentShopifyProduct,
      selectedVariant
    }
  }

  const addConfiguredSelectionToCart = async ({
    openCart
  }: {
    openCart: boolean
  }): Promise<{ cart: Cart | null; cartId: string | null } | null> => {
    const resolvedVariant = resolveSelectedVariant()

    if (!resolvedVariant) {
      return null
    }

    const { product, selectedVariant } = resolvedVariant

    if (openCart) {
      cartStore.send({ type: 'OPEN' })
    }

    try {
      let currentCartId = contextCartId || (await getCartIdFromCookie())

      const itemsToUpdate: OptimisticItemInput[] = [
        {
          product,
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

      await addLines(linesToProcess)

      if (!currentCartId) {
        currentCartId = await getCartIdFromCookie()
      }

      await trackAddToCart({
        product,
        selectedVariant,
        quantity
      })

      trackEvent('AddToCart', {
        content_name: product.title,
        value: Number(selectedVariant.price.amount),
        currency: selectedVariant.price.currencyCode
      })

      let cart: Cart | null = null

      if (currentCartId) {
        cart =
          queryClient.getQueryData<Cart>(['cart', currentCartId])
          ?? (await fetchCart(currentCartId))

        if (cart) {
          queryClient.setQueryData(['cart', currentCartId], cart)
        }
      }

      return {
        cart,
        cartId: currentCartId ?? null
      }
    } catch (error) {
      console.error('Feil under kjøp:', error)
      toast.error('Kunne ikke legge varen i handlekurven.')
      const cartId = contextCartId || (await getCartIdFromCookie())
      if (cartId) {
        queryClient.invalidateQueries({ queryKey: ['cart', cartId] })
      }
      return null
    }
  }

  const handleAddToCart = () => {
    startTransition(() => {
      void addConfiguredSelectionToCart({ openCart: true })
    })
  }

  const handleGoToCheckout = async () => {
    if (isCheckoutRedirecting || isPendingFromMachine) {
      return
    }

    setIsCheckoutRedirecting(true)

    const result = await addConfiguredSelectionToCart({ openCart: false })
    const checkoutUrl = result?.cart?.checkoutUrl

    if (!checkoutUrl) {
      setIsCheckoutRedirecting(false)
      toast.error('Kunne ikke åpne kassen. Prøv igjen.')
      return
    }

    window.location.assign(checkoutUrl)
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
    handleGoToCheckout,
    isPending: isTransitioning || isPendingFromMachine || isCheckoutRedirecting,
    currentConfig,
    currentColor
  }
}
