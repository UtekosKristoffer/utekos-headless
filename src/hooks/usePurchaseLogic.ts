import { useState, useTransition, useContext } from 'react'
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
import { dispatchMetaTrackingEvent } from '@/lib/tracking/meta/dispatchMetaTrackingEvent'
import { getClientMetaUserData } from '@/lib/tracking/meta/utils/getClientMetaUserData'
import { trackMicrosoftUetEvent } from '@/lib/tracking/microsoft-uet/trackMicrosoftUetEvent'
import { generateEventID } from '@/components/analytics/Meta/generateEventID'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { getVariants } from '@/app/skreddersy-varmen/utekos-orginal/utils/getVariants'
import { PRODUCT_VARIANTS } from '@/api/constants'
import type { ModelKey, ColorVariant } from 'types/product/ProductTypes'
import type { UsePurchaseLogicProps } from 'types/product/PageProps'
import type { ShopifyProduct, ShopifyProductVariant } from 'types/product'
import type { Cart } from 'types/cart'
import type { OptimisticItemInput } from '@/hooks/useOptimisticCartUpdate'
import type { CaptureBody, MetaUserData } from 'types/tracking/meta'

type ConfiguredSelectionCartResult = {
  cart: Cart | null
  cartId: string | null
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant
}

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

  const isPendingFromMachine = CartMutationContext.useSelector(state => state.matches('mutating'))

  const currentConfig = PRODUCT_VARIANTS[selectedModel]
  const currentShopifyProduct = products[currentConfig.id]

  const safeColorIndex = selectedColorIndex < currentConfig.colors.length ? selectedColorIndex : 0
  const currentColor = currentConfig.colors[safeColorIndex] as ColorVariant

  const handleSelectedModelChange = (model: ModelKey) => {
    const nextConfig = PRODUCT_VARIANTS[model]

    setSelectedModel(model)
    setSelectedSize(size =>
      nextConfig.sizes.includes(size) ? size : (nextConfig.sizes[1] ?? nextConfig.sizes[0] ?? size)
    )
    setSelectedColorIndex(index => (index < nextConfig.colors.length ? index : 0))
  }

  const resolveSelectedVariant = () => {
    if (!currentShopifyProduct) {
      toast.error(`Fant ikke produktdata for ${currentConfig.title}.`)
      return null
    }

    const variants = getVariants(currentShopifyProduct)
    const selectedVariant = variants.find((variant: ShopifyProductVariant) => {
      const hasSize = variant.selectedOptions.some(
        option => option.value.toLowerCase() === selectedSize.toLowerCase()
      )
      const hasColor = variant.selectedOptions.some(
        option => currentColor && option.value.toLowerCase() === currentColor.name.toLowerCase()
      )
      return hasSize && hasColor
    })

    if (!selectedVariant) {
      toast.error(`Fant ikke variant for ${currentColor.name} / ${selectedSize}.`)
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
  }): Promise<ConfiguredSelectionCartResult | null> => {
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
        cart = queryClient.getQueryData<Cart>(['cart', currentCartId]) ?? (await fetchCart(currentCartId))

        if (cart) {
          queryClient.setQueryData(['cart', currentCartId], cart)
        }
      }

      return {
        cart,
        cartId: currentCartId ?? null,
        product,
        selectedVariant
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

  const trackCheckoutStart = ({
    cartId,
    checkoutUrl,
    product,
    selectedVariant
  }: {
    cartId: string | null
    checkoutUrl: string
    product: ShopifyProduct
    selectedVariant: ShopifyProductVariant
  }) => {
    try {
      const rawEventID = generateEventID()
      const eventID = rawEventID.replace('evt_', 'ic_')
      const productId = cleanShopifyId(selectedVariant.id) || selectedVariant.id
      const value = (Number.parseFloat(selectedVariant.price.amount) || 0) * quantity
      const currency = selectedVariant.price.currencyCode
      const userData: MetaUserData = getClientMetaUserData()

      trackMicrosoftUetEvent({
        category: 'ecommerce',
        action: 'begin_checkout',
        label: cartId ?? product.title,
        value: quantity,
        revenueValue: value,
        currency,
        productId,
        pageType: 'cart',
        eventId: eventID
      })

      const captureBody: CaptureBody = {
        cartId,
        checkoutUrl,
        eventId: eventID,
        userData
      }

      fetch('/api/checkout/capture-identifiers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(captureBody),
        keepalive: true
      }).catch(error => console.error('Capture identifiers failed', error))

      void dispatchMetaTrackingEvent({
        eventName: 'InitiateCheckout',
        eventId: eventID,
        eventData: {
          value,
          currency,
          content_ids: [productId],
          content_type: 'product',
          num_items: quantity
        },
        userData
      })
    } catch (error) {
      console.error('Feil under sending av checkout-events:', error)
    }
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

    trackCheckoutStart({
      cartId: result.cartId,
      checkoutUrl,
      product: result.product,
      selectedVariant: result.selectedVariant
    })

    window.location.assign(checkoutUrl)
  }

  return {
    selectedModel,
    setSelectedModel: handleSelectedModelChange,
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
