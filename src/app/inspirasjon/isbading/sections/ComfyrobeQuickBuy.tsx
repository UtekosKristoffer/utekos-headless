// Path: src/app/inspirasjon/isbading/sections/ComfyrobeQuickBuy.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
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
                const altText =
                  img.altText || img.image?.altText || product.title

                if (!imageUrl) return null

                return (
                  <CarouselItem key={img.id}>
                    <div className='relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-cloud-dancer/12 bg-maritime-darkest'>
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
            <CarouselPrevious className='left-4 border border-cloud-dancer/12 bg-maritime-darkest/70 text-cloud-dancer backdrop-blur-md hover:bg-maritime-blue' />
            <CarouselNext className='right-4 border border-cloud-dancer/12 bg-maritime-darkest/70 text-cloud-dancer backdrop-blur-md hover:bg-maritime-blue' />
          </div>
        </Carousel>
      </div>

      <div className='flex flex-col gap-6 text-left'>
        <div>
          <h2 className='mb-2 text-3xl font-bold leading-[0.95] tracking-normal text-cloud-dancer md:text-4xl'>
            {product.title}
          </h2>
          <div className='flex items-center gap-4'>
            <span className='text-2xl font-semibold leading-[1.15] tracking-normal text-cloud-dancer'>
              {price},-
            </span>
            <BrandBadge
              label='På lager'
              backgroundColor='var(--ancient-water)'
              textColor='var(--maritime-darkest)'
              className='border border-cloud-dancer/14 px-3 py-1.5 text-xs leading-[1.4] font-semibold tracking-normal'
            />
          </div>
        </div>

        <div className='flex gap-4'>
          <div className='flex-1 space-y-2'>
            <label className='text-sm font-medium leading-[1.45] tracking-normal text-overcast'>
              Farge
            </label>
            <div className='flex h-10 cursor-default items-center justify-center rounded-md border border-maritime-blue/35 bg-ancient-water text-sm font-medium leading-[1.4] tracking-normal text-maritime-darkest ring-1 ring-maritime-blue/20'>
              Fjellnatt
            </div>
          </div>
          <div className='flex-1 space-y-2'>
            <label className='text-sm font-medium leading-[1.45] tracking-normal text-overcast'>
              Modell
            </label>
            <div className='flex h-10 cursor-default items-center justify-center rounded-md border border-maritime-blue/35 bg-ancient-water text-sm font-medium leading-[1.4] tracking-normal text-maritime-darkest ring-1 ring-maritime-blue/20'>
              Unisex
            </div>
          </div>
        </div>

        {/* Størrelsevelger */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <label className='text-sm font-medium leading-[1.45] tracking-normal text-overcast'>
              Velg størrelse
            </label>
            <Link
              href='/handlehjelp/storrelsesguide'
              className='text-xs leading-[1.45] tracking-normal text-overcast underline decoration-overcast/45 underline-offset-4 hover:text-cloud-dancer'
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
                    'relative flex h-12 items-center justify-center rounded-md border text-sm font-medium leading-[1.4] tracking-normal transition-all',
                    isSelected ?
                      'border-primary-button/60 bg-primary-button text-maritime-darkest ring-1 ring-primary-button/35'
                    : 'border-cloud-dancer/14 bg-maritime-darkest/58 text-overcast hover:border-cloud-dancer/28 hover:text-cloud-dancer',
                    !isAvailable
                      && 'cursor-not-allowed border-cloud-dancer/10 bg-maritime-darkest/45 text-overcast/55 line-through opacity-60 decoration-slice'
                  )}
                >
                  {displayName}
                  {!isAvailable && (
                    <span className='absolute -right-2 -top-2 rounded-full border border-chocolate-plum/35 bg-[var(--soft-warm)] px-1.5 py-0.5 text-[10px] leading-[1.2] text-chocolate-plum'>
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
            backgroundColor='var(--primary-button)'
            textColor='var(--maritime-darkest)'
            className='min-h-14 w-full border border-primary-button/24 px-8 py-4 text-lg leading-[1.35] font-bold tracking-normal shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105 disabled:pointer-events-none disabled:opacity-60'
          >
            <button
              type='button'
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
            </button>
          </BrandBadge>

          <div className='flex items-center justify-center gap-6 pt-2'>
            <div className='flex items-center gap-2'>
              <VippsLogo className='h-5 w-auto text-primary-button' />
            </div>
            <div className='flex items-center gap-2'>
              <KlarnaLogo className='h-6 w-auto text-[var(--soft-warm)]' />
            </div>
            <div className='flex items-center gap-1.5 text-xs leading-[1.45] tracking-normal text-overcast grayscale'>
              <Check className='h-3.5 w-3.5' />
              Rask levering
            </div>
          </div>
        </div>

        <Accordion
          type='single'
          collapsible
          className='mt-4 w-full border-t border-cloud-dancer/12'
        >
          <AccordionItem value='materials' className='border-cloud-dancer/12'>
            <AccordionTrigger>Materialer og kvalitet</AccordionTrigger>
            <AccordionContent className='space-y-4 text-overcast'>
              <div>
                <strong className='mb-1 block text-sm text-cloud-dancer'>
                  Fôrstoff: SherpaCore™ Thermal Lining
                </strong>
                <ul className='list-inside list-disc pl-1 text-sm leading-[1.45] tracking-normal'>
                  <li>Mykt og luftig 100% polyester (250 GSM)</li>
                  <li>Antipeeling behandlet</li>
                  <li>Slitesterk hamp i kragen</li>
                </ul>
              </div>
              <div>
                <strong className='mb-1 block text-sm text-cloud-dancer'>
                  Ytterstoff: HydroGuard™ Shell
                </strong>
                <ul className='list-inside list-disc pl-1 text-sm leading-[1.45] tracking-normal'>
                  <li>100% Polyester med pustende PU-belegg</li>
                  <li>8000mm vannsøyle (Vanntett)</li>
                  <li>Vindtett og robust (130 GSM)</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='features' className='border-cloud-dancer/12'>
            <AccordionTrigger>Funksjoner</AccordionTrigger>
            <AccordionContent className='text-overcast'>
              <ul className='space-y-2 text-sm leading-[1.45] tracking-normal'>
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

          <AccordionItem value='fit' className='border-cloud-dancer/12'>
            <AccordionTrigger>Passform</AccordionTrigger>
            <AccordionContent className='text-sm leading-[1.45] tracking-normal text-overcast'>
              <p className='mb-2'>
                Comfyrobe™ har en <strong>oversized unisex-passform</strong>.
                Den er designet romslig og med praktiske løsninger for å enkelt
                kle på eller av seg.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='care' className='border-cloud-dancer/12'>
            <AccordionTrigger>Vask og vedlikehold</AccordionTrigger>
            <AccordionContent className='text-sm leading-[1.45] tracking-normal text-overcast'>
              <ul className='list-inside list-disc space-y-1'>
                <li>Maskinvask 40°C (skånsomt)</li>
                <li>Bruk mildt vaskemiddel, unngå tøymykner</li>
                <li>Unngå tørketrommel for å bevare vanntettheten</li>
                <li>Tørkes best hengende</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className='mt-8 rounded-xl border border-cloud-dancer/12 bg-cloud-dancer/[0.035] p-6'>
          <NewsletterForm />
        </div>
      </div>
    </div>
  )
}
