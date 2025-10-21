'use client'

import { getProduct } from '@/api/lib/products/getProduct'
import { FreeBuffSelector } from '@/components/products/FreeBuffSelector'
import { Skeleton } from '@/components/ui/skeleton'
import type { ShopifyProduct } from '@types'
import { useEffect, useState } from 'react'
import { Gift } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'

interface AdditionalLine {
  variantId: string
  quantity: number
}

interface TechDawnLaunchOfferProps {
  onAdditionalLineChange: (line: AdditionalLine | undefined) => void
}

export function TechDawnLaunchOffer({
  onAdditionalLineChange
}: TechDawnLaunchOfferProps) {
  const [buffProduct, setBuffProduct] = useState<ShopifyProduct | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [includeBuff, setIncludeBuff] = useState(true)
  const [selectedBuffColor, setSelectedBuffColor] = useState('Fjellblå')

  useEffect(() => {
    async function fetchBuffProduct() {
      try {
        const product = await getProduct('utekos-buff')
        setBuffProduct(product)
      } catch (error) {
        console.error('Failed to fetch buff product:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBuffProduct()
  }, [])

  useEffect(() => {
    if (!includeBuff || !buffProduct) {
      onAdditionalLineChange(undefined)
      return
    }

    const selectedVariant = buffProduct.variants.edges.find(edge =>
      edge.node.selectedOptions.some(opt => opt.value === selectedBuffColor)
    )?.node

    if (selectedVariant) {
      onAdditionalLineChange({
        variantId: selectedVariant.id,
        quantity: 1
      })
    }
  }, [includeBuff, selectedBuffColor, buffProduct, onAdditionalLineChange])

  if (isLoading) {
    return (
      <div className='mt-8'>
        <Skeleton className='h-48 w-full rounded-2xl' />
      </div>
    )
  }

  if (!buffProduct) {
    return null
  }

  return (
    <AnimatedBlock
      className='will-animate-fade-in-right mt-8'
      delay='0.19s'
      threshold={0.2}
    >
      <div className='rounded-2xl border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-50/5 to-transparent p-6 shadow-sm'>
        <div className='mb-5 flex items-center gap-3'>
          <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600/10'>
            <Gift className='h-5 w-5 text-emerald-500' />
          </div>
          <div>
            <h3 className='text-lg font-semibold'>
              Eksklusivt lanseringstilbud
            </h3>
            <p className='text-sm text-foreground/70'>
              Få en gratis Utekos Buff™ med på kjøpet.
            </p>
          </div>
        </div>
        <div className='flex justify-center'>
          <FreeBuffSelector
            buffProduct={buffProduct}
            includeBuff={includeBuff}
            onIncludeBuffChange={setIncludeBuff}
            selectedBuffColor={selectedBuffColor}
            onBuffColorChange={setSelectedBuffColor}
          />
        </div>
      </div>
    </AnimatedBlock>
  )
}
