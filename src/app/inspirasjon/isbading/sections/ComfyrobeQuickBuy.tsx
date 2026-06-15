// Path: src/app/inspirasjon/isbading/sections/ComfyrobeQuickBuy.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ComfyrobeAccordion } from './ComfyrobeAccordion'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { NewsletterForm } from '@/components/form/components/NewsLetterForm'
import { useAnalytics } from '@/hooks/useAnalytics'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { cartStore } from '@/lib/state/cartStore'
import { VippsLogo } from '@/components/payments/VippsLogo'
import { KlarnaLogo } from '@/components/payments/KlarnaLogo'
import { ShoppingBag, Check } from 'lucide-react'
import type { ShopifyProduct } from 'types/product'
import { cn } from '@/lib/utils/className'
import { toast } from 'sonner'

interface Props {
  product: ShopifyProduct
}

export function ComfyrobeQuickBuy({ product }: Props) {
  const variants = product.variants.edges.map(e => e.node)
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    variants.find(v => v.availableForSale)?.id || null
  )
  const selectedVariant = variants.find(v => v.id === selectedVariantId)
  const cartActor = CartMutationContext.useActorRef()
  const { trackEvent } = useAnalytics()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    if (!selectedVariant) return

    setIsAdding(true)

    cartActor.send({
      type: 'ADD_LINES',
      input: [{ variantId: selectedVariant.id, quantity: 1 }]
    })

    trackEvent('AddToCart', {
      content_name: product.title,
      content_ids: [selectedVariant.id],
      content_type: 'product',
      value: Number(selectedVariant.price.amount),
      currency: selectedVariant.price.currencyCode
    })

    setTimeout(() => {
      setIsAdding(false)
      cartStore.send({ type: 'OPEN' })
      toast.success('Lagt i handlekurven!')
    }, 600)
  }

  const images = product.images.edges.map(e => e.node).slice(0, 5)
  const getSizeName = (title: string) => {
    const parts = title.split(' / ')
    if (parts.length > 1) {
      const sizePart = parts.find(p => ['XS', 'S', 'M', 'L', 'XL'].some(s => p.includes(s)))
      return sizePart || parts[1] // Fallback
    }
    return title.replace('Fjellnatt', '').replace('Unisex', '').replace('/', '').trim()
  }

  const price = Math.round(Number(product.priceRange.minVariantPrice.amount))

  return (
    <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12'>
      <div className='w-full'>
        <Carousel className='w-full'>
          <CarouselContent>
            {images.map(
              (img: {
                id: string
                url?: string
                altText?: string
                image?: { url?: string; altText?: string }
              }) => {
                const imageUrl = img.url || img.image?.url
                const altText = img.altText || img.image?.altText || product.title

                if (!imageUrl) return null

                return (
                  <CarouselItem key={img.id}>
                    <div className='relative aspect-square w-full overflow-hidden rounded-xl border border-cloud-dancer/12 bg-background'>
                      <Image
                        src={imageUrl}
                        alt={altText}
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 100vw, 50vw'
                      />
                    </div>
                  </CarouselItem>
                )
              }
            )}
          </CarouselContent>
          <div className='block'>
            <CarouselPrevious className='left-4 border border-cloud-dancer/12 bg-background/70 text-cloud-dancer backdrop-blur-md hover:bg-background' />
            <CarouselNext className='right-4 border border-cloud-dancer/12 bg-background/70 text-cloud-dancer backdrop-blur-md hover:bg-background' />
          </div>
        </Carousel>
      </div>

      <div className='flex flex-col gap-6 text-left'>
        <div>
          <h2 className='mb-2 text-3xl font-bold leading-[0.95] tracking-normal text-foreground md:text-4xl'>
            {product.title}
          </h2>
          <div className='flex items-center gap-4'>
            <span className='text-2xl font-semibold leading-[1.15] tracking-normal text-foreground'>
              {price},-
            </span>
            <BrandBadge
              label='På lager'
              backgroundColor='var(--ancient-water)'
              textColor='var(--background)'
              className='border border-cloud-dancer/14 px-3 py-1.5 text-xs leading-4 font-semibold tracking-normal'
            />
          </div>
        </div>

        <div className='flex gap-4'>
          <div className='flex-1 space-y-2'>
            <label className='text-sm font-medium leading-text-paragraph tracking-normal text-overcast'>
              Farge
            </label>
            <div className='flex h-10 cursor-default items-center justify-center rounded-md border border-havdyp/35 bg-ancient-water text-sm font-medium leading-4 tracking-normal text-background ring-1 ring-havdyp/20'>
              Fjellnatt
            </div>
          </div>
          <div className='flex-1 space-y-2'>
            <label className='text-sm font-medium leading-text-paragraph tracking-normal text-overcast'>
              Modell
            </label>
            <div className='flex h-10 cursor-default items-center justify-center rounded-md border border-havdyp/35 bg-ancient-water text-sm font-medium leading-4 tracking-normal text-background ring-1 ring-havdyp/20'>
              Unisex
            </div>
          </div>
        </div>

        {/* Størrelsevelger */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <label className='text-sm font-medium leading-text-paragraph tracking-normal text-overcast'>
              Velg størrelse
            </label>
            <Link
              href='/handlehjelp/storrelsesguide'
              className='text-xs leading-text-paragraph tracking-normal text-overcast underline decoration-overcast/45 underline-offset-4 hover:text-foreground'
            >
              Størrelsesguide
            </Link>
          </div>
          <div className='grid grid-cols-3 gap-3'>
            {variants.map(variant => {
              const displayName = getSizeName(variant.title)
              const isSelected = selectedVariantId === variant.id
              const isAvailable = variant.availableForSale

              return (
                <button
                  key={variant.id}
                  onClick={() => isAvailable && setSelectedVariantId(variant.id)}
                  disabled={!isAvailable}
                  className={cn(
                    'relative flex h-12 items-center justify-center rounded-md border text-sm font-medium leading-4 tracking-normal transition-all',
                    isSelected ?
                      'border-primary/60 bg-primary text-background ring-1 ring-primary/35'
                    : 'border-cloud-dancer/14 bg-background/58 text-overcast hover:border-cloud-dancer/28 hover:text-foreground',
                    !isAvailable
                      && 'cursor-not-allowed border-cloud-dancer/10 bg-background/45 text-overcast/55 line-through opacity-60 box-decoration-slice'
                  )}
                >
                  {displayName}
                  {!isAvailable && (
                    <span className='absolute -right-2 -top-2 rounded-full border border-chocolate-plum/35 bg-(--soft-warm) px-1.5 py-0.5 text-[10px] leading-[1.2] text-chocolate-plum'>
                      Tomt
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
        <div className='space-y-4 pt-2'>
          <BrandBadge
            asChild
            backgroundColor='var(--primary)'
            textColor='var(--background)'
            className='min-h-14 w-full border border-primary/24 px-8 py-4 text-lg leading-[1.35] font-bold tracking-normal shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105 disabled:pointer-events-none disabled:opacity-60'
          >
            <button type='button' onClick={handleAddToCart} disabled={!selectedVariant || isAdding}>
              {isAdding ?
                <span className='animate-pulse'>Legger til...</span>
              : <>
                  <ShoppingBag className='mr-2 h-5 w-5' />
                  Legg i handlekurv
                </>
              }
            </button>
          </BrandBadge>

          <div className='flex items-center justify-center gap-6 pt-2'>
            <div className='flex items-center gap-2'>
              <VippsLogo className='h-5 w-auto text-primary' />
            </div>
            <div className='flex items-center gap-2'>
              <KlarnaLogo className='h-6 w-auto text-(--fair-orchid)' />
            </div>
          </div>
        </div>
        <ComfyrobeAccordion />
        <div className='mt-8 rounded-xl border border-cloud-dancer/12 bg-cloud-dancer/[0.035] p-6'>
          <NewsletterForm />
        </div>
      </div>
    </div>
  )
}
