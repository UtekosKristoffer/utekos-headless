// Path: src/app/kampanje/subscribers/CampaignProductDisplay.tsx
'use client'

import type {
  ShopifyProduct,
  ShopifyProductVariant,
  Image as TImage
} from '@types'
import { Price } from '@/components/jsx/Price'
import Image from 'next/image'
import { DiscountedAddToCartButton } from '@/components/cart/DiscountedAddToCartButton'
import { formatNOK } from '@/lib/utils/formatters/formatNOK'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils/className'
import { ChevronLeft, ChevronRight, Ruler } from 'lucide-react'

interface CampaignProductDisplayProps {
  product: ShopifyProduct
  discountCode: string
  campaignPrice: number
}

// FIX: Hjelpefunksjon som håndterer både engelsk og norsk navn på størrelsesfeltet
const isSizeOption = (name: string) => {
  const n = name.toLowerCase()
  return n === 'size' || n === 'størrelse'
}

const findVariantBySize = (
  product: ShopifyProduct,
  size: string
): ShopifyProductVariant | undefined => {
  return product.variants.edges.find(edge =>
    edge.node.selectedOptions.some(
      opt => isSizeOption(opt.name) && opt.value === size
    )
  )?.node
}

export function CampaignProductDisplay({
  product,
  discountCode,
  campaignPrice
}: CampaignProductDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const imageSet = new Map<string, TImage>()
  if (product.featuredImage) {
    imageSet.set(product.featuredImage.url, product.featuredImage)
  }
  product.images.edges.forEach(edge => {
    const image = (edge.node as any).image as TImage | undefined
    if (image?.url) {
      imageSet.set(image.url, image)
    }
  })
  const allImages = Array.from(imageSet.values())

  const allVariantSizes = product.variants.edges.flatMap(edge =>
    edge.node.selectedOptions
      .filter(opt => isSizeOption(opt.name))
      .map(opt => opt.value)
  )
  const availableSizes = [...new Set(allVariantSizes)]

  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  useEffect(() => {
    if (selectedSize) return

    let found = false
    for (const size of availableSizes) {
      const variant = findVariantBySize(product, size)
      if (variant?.availableForSale) {
        setSelectedSize(size)
        found = true
        break
      }
    }

    if (!found && availableSizes.length > 0) {
      setSelectedSize(availableSizes[0] ?? null)
    }
  }, [availableSizes, product, selectedSize])

  const selectedVariant: ShopifyProductVariant | null =
    selectedSize ? (findVariantBySize(product, selectedSize) ?? null) : null

  useEffect(() => {
    if (selectedVariant?.image) {
      const newIndex = allImages.findIndex(
        img => img.url === selectedVariant.image?.url
      )
      if (newIndex !== -1) {
        setCurrentIndex(newIndex)
      }
    }
  }, [selectedVariant, allImages])

  const originalPrice =
    selectedVariant?.compareAtPrice?.amount
    ?? product.compareAtPriceRange.maxVariantPrice.amount

  const currencyCode =
    selectedVariant?.price.currencyCode
    ?? product.priceRange.minVariantPrice.currencyCode

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? allImages.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === allImages.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 max-w-6xl mx-auto'>
      <div className='relative w-full aspect-[3/4]'>
        <div className='relative h-full w-full overflow-hidden rounded-2xl bg-neutral-800 shadow-2xl'>
          {allImages.length > 0 ?
            allImages.map((image, index) => (
              <Image
                key={image.url}
                src={image.url}
                alt={image.altText ?? product.title}
                fill
                sizes='(max-width: 1024px) 100vw, 50vw'
                className={cn(
                  'object-cover transition-opacity duration-500 ease-in-out',
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                )}
                priority={index === 0}
              />
            ))
          : <div className='flex items-center justify-center h-full text-neutral-500'>
              Ingen bilder tilgjengelig
            </div>
          }
        </div>
        {allImages.length > 1 && (
          <>
            <div className='absolute top-1/2 left-3 -translate-y-1/2'>
              <button
                onClick={goToPrevious}
                className='h-10 w-10 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center transition'
                aria-label='Forrige bilde'
              >
                <ChevronLeft className='h-6 w-6' />
              </button>
            </div>
            <div className='absolute top-1/2 right-3 -translate-y-1/2'>
              <button
                onClick={goToNext}
                className='h-10 w-10 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center transition'
                aria-label='Neste bilde'
              >
                <ChevronRight className='h-6 w-6' />
              </button>
            </div>
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'h-2 w-2 rounded-full transition-all',
                    currentIndex === index ? 'w-4 bg-white' : 'bg-white/50'
                  )}
                  aria-label={`Gå til bilde ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className='flex flex-col gap-8'>
        <div className='space-y-3'>
          <h2 className='text-4xl font-bold tracking-tight text-white'>
            {product.title}
          </h2>
          <div
            className='prose prose-invert max-w-none text-base text-neutral-400 leading-relaxed'
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
        <div className='space-y-3'>
          <p className='text-sm font-medium text-neutral-400 uppercase tracking-wide'>
            Spesialpris for deg
          </p>
          <div className='flex items-baseline gap-4'>
            <div className='text-4xl font-bold tracking-tight text-emerald-400'>
              <Price
                amount={campaignPrice.toString()}
                currencyCode={currencyCode}
              />
            </div>
            <div className='text-2xl font-medium text-neutral-500 line-through'>
              <Price amount={originalPrice} currencyCode={currencyCode} />
            </div>
          </div>
          <p className='text-lg font-medium text-emerald-400'>
            Du sparer {formatNOK(parseFloat(originalPrice) - campaignPrice)}!
          </p>
        </div>
        <div className='space-y-4'>
          <div className='flex justify-between items-center'>
            <h3 className='text-sm font-medium uppercase tracking-wide text-neutral-300'>
              Velg størrelse
            </h3>
            <a
              href='#størrelsesguide'
              className='flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors'
            >
              <Ruler className='w-4 h-4' />
              <span>Størrelsesguide</span>
            </a>
          </div>
          <div className='grid grid-cols-3 gap-3'>
            {availableSizes.map(size => {
              const variant = findVariantBySize(product, size)
              const isAvailable = variant?.availableForSale ?? false
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    'relative rounded-md border p-4 text-center text-sm font-medium transition-all duration-150',
                    {
                      'border-emerald-400 bg-emerald-900/50 text-white ring-2 ring-emerald-400':
                        selectedSize === size,
                      'border-neutral-700 bg-neutral-800 text-neutral-300 hover:border-neutral-500':
                        selectedSize !== size && isAvailable,
                      // Visuelt nedtonet stil for utsolgte varer, men fortsatt klikkbar
                      'border-neutral-800 bg-neutral-800/30 text-neutral-500 hover:border-neutral-600':
                        selectedSize !== size && !isAvailable
                    }
                  )}
                >
                  {size}
                  {!isAvailable && (
                    <span className='absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] uppercase text-red-400'>
                      Utsolgt
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
        <div className='mt-auto space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg'>
          <DiscountedAddToCartButton
            product={product}
            selectedVariant={selectedVariant}
            discountCode={discountCode}
          />
        </div>
      </div>
    </div>
  )
}
