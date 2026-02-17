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

import { useVariantState } from '@/hooks/useVariantState'
import type { ShopifyProduct } from 'types/product'
import Image from 'next/image'
import { useEffect, useState, useEffectEvent } from 'react'
import { toast } from 'sonner'
import { VariantSelectors } from './VariantSelectors'
import { Price } from '../jsx/Price'
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
  const [isLoading, setIsLoading] = useState(false)

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
    async function fetchMainProduct() {
      if (isOpen && !productData) {
        setIsLoading(true)
        try {
          const mainProduct = await getProductAction(productHandle)
          setProductData(mainProduct)
        } catch (error) {
          handleFetchError()
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchMainProduct()
  }, [isOpen, productHandle, productData, handleFetchError])

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

                <div className='mt-auto space-y-4'>
                  <AddToCart
                    product={productData}
                    selectedVariant={selectedVariant}
                  />
                </div>
              </div>
            </div>
          </>
        }
      </DialogContent>
    </Dialog>
  )
}
