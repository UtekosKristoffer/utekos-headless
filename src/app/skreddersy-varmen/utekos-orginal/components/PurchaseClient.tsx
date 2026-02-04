// Path: src/ap/skreddersy-varmen/PurchaseClient.tsx
'use client'

import { useState, useEffect, useTransition, useContext } from 'react'
import Image from 'next/image'
import {
  Check,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RefreshCcw,
  Loader2,
  Gift
} from 'lucide-react'
import { cn } from '@/lib/utils/className'
import { VippsLogo } from '@/components/logo/payments/VippsLogo'
import { KlarnaLogo } from '@/components/logo/payments/KlarnaLogo'
import { PostNordLogo } from '@/components/logo/payments/PostNordLogo'
import Link from 'next/link'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { createMutationPromise } from '@/app/skreddersy-varmen/utekos-orginal/utils/createMutationPromise'
import { getVariants } from '@/app/skreddersy-varmen/utekos-orginal/utils/getVariants'
import { cartStore } from '@/lib/state/cartStore'
import { toast } from 'sonner'
import { applyDiscount } from '@/api/lib/cart/applyDiscount'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { CartIdContext } from '@/lib/context/CartIdContext'
import { useQueryClient } from '@tanstack/react-query'
import { PRODUCT_VARIANTS } from '@/api/constants'
import type { ModelKey } from '@/api/constants'
import type { ShopifyProduct } from '@types'

export function PurchaseClient({
  products
}: {
  products: Record<string, ShopifyProduct | null | undefined>
}) {
  const [selectedModel, setSelectedModel] = useState<ModelKey>('techdown')
  const [quantity, setQuantity] = useState(1)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('Middels')

  const cartActor = CartMutationContext.useActorRef()
  const contextCartId = useContext(CartIdContext)
  const queryClient = useQueryClient()
  const [isTransitioning, startTransition] = useTransition()

  const currentConfig = PRODUCT_VARIANTS[selectedModel]
  const currentShopifyProduct = products[currentConfig.id]
  const buffProduct = products['utekos-buff']
  const currentColor = currentConfig.colors[selectedColorIndex]

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
        `Fant ikke variant for ${currentColor?.name ?? 'ukjent farge'} / ${selectedSize} i Shopify.`
      )
      return
    }

    if (!selectedVariant.availableForSale) {
      toast.error('Denne varianten er dessverre utsolgt for øyeblikket.')
      return
    }

    startTransition(async () => {
      try {
        const linesToProcess = [{ variantId: selectedVariant.id, quantity }]
        let additionalLine

        if (isTechDownOffer && buffProduct) {
          const buffVariants = getVariants(buffProduct)
          const selectedBuffVariant = buffVariants.find((v: any) =>
            v.selectedOptions.some(
              (opt: any) => opt.value.toLowerCase() === 'vargnatt'
            )
          )

          if (selectedBuffVariant) {
            additionalLine = {
              variantId: selectedBuffVariant.id,
              quantity: 1 * quantity
            }
            linesToProcess.push(additionalLine)
          } else {
            console.warn('Kunne ikke finne "Vargnatt" buff-varianten.')
          }
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
                toast.success('Gratis Utekos Buff™ lagt til i handlekurven!')
              }
            }
          } catch (e) {
            console.error('Feil ved påføring av rabatt:', e)
            toast.error('Kunne ikke legge til rabatt for gratis buff.')
          }
        }

        cartStore.send({ type: 'OPEN' })
      } catch (error) {
        console.error(error)
        toast.error('Kunne ikke legge varen i handlekurven.')
      }
    })
  }

  const monthlyPrice = Math.round(currentConfig.price / 12)
  const isPending = isTransitioning

  return (
    <section className='relative w-screen left-[calc(-50vw+50%)] bg-[#F9F8F6] text-[#2C2420] overflow-hidden lg:flex lg:min-h-screen'>
      <div className='w-full lg:w-1/2 bg-[#EAE8E3] relative flex flex-col justify-center items-center p-8 lg:h-screen lg:sticky lg:top-0'>
        <div className='absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md border border-[#2C2420]/10 px-5 py-2.5 rounded-sm shadow-sm flex items-center gap-3'>
          <span className='w-2.5 h-2.5 rounded-full bg-[#E07A5F]' />
          <span className='text-sm font-bold tracking-widest uppercase text-[#2C2420]'>
            Norsk Design
          </span>
        </div>
        <div className='relative w-full h-[50vh] lg:h-[70vh] max-w-2xl'>
          <Image
            src={currentConfig.image}
            alt={currentConfig.title}
            fill
            className='object-contain drop-shadow-2xl transition-all duration-700 ease-out hover:scale-105'
            priority
            sizes='(max-width: 1024px) 100vw, 50vw'
          />
        </div>
        <p className='hidden lg:block mt-8 text-base font-serif italic text-[#2C2420]'>
          Modell vist: {currentConfig.title}
        </p>
      </div>

      <div className='w-full lg:w-1/2 bg-white flex flex-col'>
        <div className='flex-1 p-6 md:p-12 lg:p-24 lg:overflow-y-auto'>
          <div className='flex flex-wrap gap-2 p-1.5 bg-[#F4F1EA] rounded-lg mb-12 w-full md:w-fit'>
            {(Object.keys(PRODUCT_VARIANTS) as ModelKey[]).map(key => (
              <button
                key={key}
                onClick={() => setSelectedModel(key)}
                className={cn(
                  'flex-1 md:flex-none px-6 py-3 text-base font-medium rounded-md transition-all duration-200 whitespace-nowrap',
                  selectedModel === key ?
                    'bg-white text-[#2C2420] shadow-md transform scale-100 ring-1 ring-black/5'
                  : 'text-[#2C2420] hover:bg-white/50'
                )}
              >
                {PRODUCT_VARIANTS[key].title.replace('Utekos ', '')}
              </button>
            ))}
          </div>

          <div className='mb-12'>
            <h1 className='font-serif text-4xl lg:text-7xl text-[#2C2420] mb-4 leading-[1.1] tracking-tight'>
              {currentConfig.title}
            </h1>
            <p className='text-xl text-[#2C2420] font-light mb-8'>
              {currentConfig.subtitle}
            </p>

            <div className='flex flex-wrap items-center gap-4 lg:gap-8'>
              <span className='text-3xl lg:text-4xl font-medium text-[#2C2420]'>
                {currentConfig.price},-
              </span>
              <div className='flex items-center gap-2 bg-[#FFB3C7]/10 px-4 py-2 rounded-sm border border-[#FFB3C7]/40'>
                <span className='text-sm font-medium text-[#2C2420]'>
                  Eller {monthlyPrice},- /mnd
                </span>
                <KlarnaLogo className='h-5 w-auto' />
              </div>
            </div>
            {isTechDownOffer && (
              <div className='mt-8 rounded-lg border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-50/5 to-transparent p-4 shadow-sm flex items-center gap-4'>
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600/10'>
                  <Gift className='h-5 w-5 text-emerald-500' />
                </div>
                <div>
                  <h3 className='font-semibold text-emerald-800'>
                    Lanseringstilbud
                  </h3>
                  <p className='text-sm text-emerald-700/80'>
                    Gratis Utekos Buff™ (verdi 249,-) legges til i kurven.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className='h-px w-full bg-[#2C2420]/10 mb-12' />
          <div className='space-y-12 mb-12'>
            <div>
              <div className='flex justify-between items-center mb-4'>
                <span className='text-sm font-bold uppercase tracking-widest text-[#2C2420]'>
                  Velg Farge
                </span>
                <span className='text-base font-medium text-[#2C2420]'>
                  {currentColor?.name}
                </span>
              </div>
              <div className='flex gap-4'>
                {currentConfig.colors.map((colorObj, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColorIndex(index)}
                    className={cn(
                      'w-14 h-14 rounded-full border-2 transition-all duration-200 relative shadow-sm',
                      selectedColorIndex === index ?
                        'border-[#E07A5F] scale-110 ring-2 ring-[#E07A5F]/20'
                      : 'border-transparent hover:scale-105 hover:shadow-md'
                    )}
                    style={{ backgroundColor: colorObj.hex }}
                    title={colorObj.name}
                    aria-label={`Velg farge ${colorObj.name}`}
                  >
                    {selectedColorIndex === index && (
                      <Check className='text-white w-7 h-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-md' />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className='flex justify-between items-center mb-4'>
                <span className='text-sm font-bold uppercase tracking-widest text-[#2C2420]'>
                  Størrelse
                </span>
                <Link
                  href='/handlehjelp/storrelsesguide'
                  data-track='SizeGuideSkreddersyVarmen'
                  className='text-sm underline text-[#2C2420] hover:text-[#E07A5F] transition-colors'
                >
                  Se størrelsesguide
                </Link>
              </div>
              <div className='grid grid-cols-3 gap-4'>
                {currentConfig.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'px-4 py-5 border rounded-sm text-base font-medium transition-all relative overflow-hidden group',
                      selectedSize === size ?
                        'border-[#2C2420] bg-[#2C2420] text-white shadow-lg'
                      : 'border-[#2C2420]/20 text-[#2C2420] hover:border-[#2C2420] bg-white'
                    )}
                  >
                    {size}
                    {selectedSize === size && (
                      <div className='absolute top-0 right-0 w-3 h-3 bg-[#E07A5F] -mr-1.5 -mt-1.5 rotate-45' />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white border-t mx-auto border-[#2C2420]/10 p-6 md:p-12 lg:p-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-30'>
          <div className='flex gap-4 mb-8 h-16'>
            <div className='flex mx-auto items-center border border-[#2C2420]/20 rounded-sm bg-white h-full'>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className='w-16 h-full flex items-center justify-center hover:bg-[#2C2420]/5 transition-colors'
                aria-label='Reduser antall'
              >
                <Minus size={20} />
              </button>
              <span className='w-14 text-center font-medium text-xl'>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className='w-16 h-full flex items-center justify-center hover:bg-[#2C2420]/5 transition-colors'
                aria-label='Øk antall'
              >
                <Plus size={20} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              data-track='🔔🛒 AddToCartSkreddersyVarmen 🛒🔔'
              disabled={isPending}
              className={cn(
                'flex-1 bg-[#E07A5F] hover:bg-[#D06A4F] text-white rounded-sm shadow-xl transition-all active:scale-[0.98] flex flex-row items-center justify-center gap-3 h-full px-2',
                isPending && 'opacity-80 cursor-not-allowed'
              )}
            >
              {isPending ?
                <>
                  <Loader2 className='animate-spin w-6 h-6' />
                  <span className='text-lg font-bold uppercase tracking-wider whitespace-nowrap'>
                    Legger til...
                  </span>
                </>
              : <>
                  <span className='text-lg md:text-xl font-bold uppercase tracking-wider whitespace-nowrap'>
                    Legg i kurv
                  </span>
                  <div className='hidden md:block w-px h-8 bg-white/30' />
                  <span className='hidden md:inline text-xl font-normal opacity-100 whitespace-nowrap'>
                    {currentConfig.price * quantity},-
                  </span>
                </>
              }
            </button>
          </div>
          <div className='flex flex-col gap-8'>
            <div className='flex items-center gap-8 md:gap-10'>
              <VippsLogo className='h-8 md:h-10 w-auto' />
              <KlarnaLogo className='h-8 md:h-10 w-auto' />
              <PostNordLogo className='h-6 md:h-8 w-auto mt-1' />
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-[#2C2420] pt-6 border-t border-[#2C2420]/10'>
              <div className='flex items-center gap-3'>
                <Truck size={20} className='text-[#E07A5F] shrink-0' />
                <span>Fri frakt fra 999,-</span>
              </div>
              <div className='flex items-center gap-3'>
                <RefreshCcw size={20} className='text-[#E07A5F] shrink-0' />
                <span>14 dagers åpent kjøp</span>
              </div>
              <div className='flex items-center gap-3'>
                <ShieldCheck size={20} className='text-[#E07A5F] shrink-0' />
                <span>Norsk garanti</span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-5 h-5 rounded-full bg-[#E07A5F] flex items-center justify-center text-[10px] text-white font-bold shrink-0'>
                  ✓
                </div>
                <span>På lager i Bergen</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
