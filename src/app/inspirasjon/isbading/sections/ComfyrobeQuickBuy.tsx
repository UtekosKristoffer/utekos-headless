// Path: src/app/inspirasjon/isbading/sections/ComfyrobeQuickBuy.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { NewsletterForm } from '@/components/form/NewsLetterForm'
import { useAnalytics } from '@/hooks/useAnalytics'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { cartStore } from '@/lib/state/cartStore'
import { VippsLogo } from '@/components/logo/payments/VippsLogo'
import { KlarnaLogo } from '@/components/logo/payments/KlarnaLogo'
import { ShoppingBag, Check } from 'lucide-react'
import type { ShopifyProduct } from '@types'
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
      const sizePart = parts.find(p =>
        ['XS', 'S', 'M', 'L', 'XL'].some(s => p.includes(s))
      )
      return sizePart || parts[1] // Fallback
    }
    return title
      .replace('Fjellnatt', '')
      .replace('Unisex', '')
      .replace('/', '')
      .trim()
  }

  const price = Math.round(Number(product.priceRange.minVariantPrice.amount))

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
      <div className='w-full'>
        <Carousel className='w-full'>
          <CarouselContent>
            {images.map((img: any) => {
              const imageUrl = img.url || img.image?.url
              const altText = img.altText || img.image?.altText || product.title

              if (!imageUrl) return null

              return (
                <CarouselItem key={img.id}>
                  <div className='relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-neutral-900 border border-white/10'>
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
            })}
          </CarouselContent>
          <div className='block'>
            <CarouselPrevious className='left-4 bg-black/50 border-none text-white hover:bg-black/70' />
            <CarouselNext className='right-4 bg-black/50 border-none text-white hover:bg-black/70' />
          </div>
        </Carousel>
      </div>

      <div className='flex flex-col gap-6 text-left'>
        <div>
          <h2 className='text-3xl md:text-4xl font-bold mb-2'>
            {product.title}
          </h2>
          <div className='flex items-center gap-4'>
            <span className='text-2xl font-semibold'>{price},-</span>
            <Badge
              variant='outline'
              className='border-emerald-500/50 text-emerald-400'
            >
              På lager
            </Badge>
          </div>
        </div>

        <div className='flex gap-4'>
          <div className='space-y-2 flex-1'>
            <label className='text-sm font-medium text-neutral-300'>
              Farge
            </label>
            <div className='flex h-10 items-center justify-center rounded-md border border-[#232B38] bg-[#232B38]/10 text-white ring-1 ring-[#232B38] text-sm font-medium cursor-default'>
              Fjellnatt
            </div>
          </div>
          <div className='space-y-2 flex-1'>
            <label className='text-sm font-medium text-neutral-300'>
              Modell
            </label>
            <div className='flex h-10 items-center justify-center rounded-md border border-[#232B38] bg-[#232B38]/10 text-white ring-1 ring-[#232B38] text-sm font-medium cursor-default'>
              Unisex
            </div>
          </div>
        </div>

        {/* Størrelsevelger */}
        <div className='space-y-3'>
          <div className='flex justify-between items-center'>
            <label className='text-sm font-medium text-neutral-300'>
              Velg størrelse
            </label>
            <Link
              href='/handlehjelp/storrelsesguide'
              className='text-xs text-neutral-400 underline decoration-neutral-600 underline-offset-4 hover:text-white'
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
                  onClick={() =>
                    isAvailable && setSelectedVariantId(variant.id)
                  }
                  disabled={!isAvailable}
                  className={cn(
                    'relative flex h-12 items-center justify-center rounded-md border text-sm font-medium transition-all',
                    isSelected ?
                      'border-[#232B38] bg-[#232B38]/10 text-white ring-1 ring-[#232B38]'
                    : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700 hover:text-white',
                    !isAvailable
                      && 'opacity-50 cursor-not-allowed bg-neutral-900 border-neutral-800 decoration-slice line-through'
                  )}
                >
                  {displayName}
                  {!isAvailable && (
                    <span className='absolute -top-2 -right-2 text-[10px] bg-red-900/80 text-red-200 px-1.5 py-0.5 rounded-full border border-red-800'>
                      Tomt
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
        <div className='space-y-4 pt-2'>
          <Button
            size='lg'
            className='w-full h-14 text-lg font-bold bg-[#232B38] hover:bg-[#232B38]/90 text-white shadow-xl border border-white/10'
            onClick={handleAddToCart}
            disabled={!selectedVariant || isAdding}
          >
            {isAdding ?
              <span className='animate-pulse'>Legger til...</span>
            : <>
                <ShoppingBag className='mr-2 h-5 w-5' />
                Legg i handlekurv
              </>
            }
          </Button>

          <div className='flex items-center justify-center gap-6 pt-2'>
            <div className='flex items-center gap-2'>
              <VippsLogo className='h-5 w-auto text-[#FF5B24]' />
            </div>
            <div className='flex items-center gap-2'>
              <KlarnaLogo className='h-6 w-auto text-[#FFB3C7]' />
            </div>
            <div className='flex items-center gap-1.5 text-xs text-neutral-400 grayscale'>
              <Check className='h-3.5 w-3.5' />
              Rask levering
            </div>
          </div>
        </div>

        <Accordion
          type='single'
          collapsible
          className='w-full border-t border-white/10 mt-4'
        >
          <AccordionItem value='materials' className='border-white/10'>
            <AccordionTrigger>Materialer og kvalitet</AccordionTrigger>
            <AccordionContent className='text-neutral-400 space-y-4'>
              <div>
                <strong className='text-white block text-sm mb-1'>
                  Fôrstoff: SherpaCore™ Thermal Lining
                </strong>
                <ul className='list-disc list-inside text-sm pl-1'>
                  <li>Mykt og luftig 100% polyester (250 GSM)</li>
                  <li>Antipeeling behandlet</li>
                  <li>Slitesterk hamp i kragen</li>
                </ul>
              </div>
              <div>
                <strong className='text-white block text-sm mb-1'>
                  Ytterstoff: HydroGuard™ Shell
                </strong>
                <ul className='list-disc list-inside text-sm pl-1'>
                  <li>100% Polyester med pustende PU-belegg</li>
                  <li>8000mm vannsøyle (Vanntett)</li>
                  <li>Vindtett og robust (130 GSM)</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='features' className='border-white/10'>
            <AccordionTrigger>Funksjoner</AccordionTrigger>
            <AccordionContent className='text-neutral-400'>
              <ul className='space-y-2 text-sm'>
                <li>
                  🌊 <strong>Vanntett og vindtett:</strong> Tapede sømmer og
                  8000mm vannsøyle holder deg tørr og varm.
                </li>
                <li>
                  🔥 <strong>Hurtigtørkende varme:</strong> SherpaCore™ plysj
                  absorberer restfuktighet og isolerer umiddelbart.
                </li>
                <li>
                  🧥 <strong>Smart design:</strong> Romslig hette, toveis
                  YKK-glidelås for enkel skifting, og refleksdetaljer.
                </li>
                <li>
                  🧤 <strong>Praktiske lommer:</strong> Fôrede sidelommer til
                  kalde hender og innerlomme til mobil/nøkler.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='fit' className='border-white/10'>
            <AccordionTrigger>Passform</AccordionTrigger>
            <AccordionContent className='text-neutral-400 text-sm'>
              <p className='mb-2'>
                Comfyrobe™ har en <strong>oversized unisex-passform</strong>.
                Den er designet romslig og med praktiske løsninger for å enkelt
                kle på eller av seg.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='care' className='border-white/10'>
            <AccordionTrigger>Vask og vedlikehold</AccordionTrigger>
            <AccordionContent className='text-neutral-400 text-sm'>
              <ul className='list-disc list-inside space-y-1'>
                <li>Maskinvask 40°C (skånsomt)</li>
                <li>Bruk mildt vaskemiddel, unngå tøymykner</li>
                <li>Unngå tørketrommel for å bevare vanntettheten</li>
                <li>Tørkes best hengende</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className='mt-8 p-6 rounded-xl bg-neutral-900/50 border border-neutral-800'>
          <NewsletterForm />
        </div>
      </div>
    </div>
  )
}
