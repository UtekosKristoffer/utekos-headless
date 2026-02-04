// Path: src/components/products/quick-view/QuickViewModal.tsx
'use client'

import { getProductAction } from '@/api/lib/products/actions'
import { AddToCart } from '@/components/cart/AddToCart'
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
