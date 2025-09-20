'use client'

import type React from 'react'

import Image from 'next/image'
import Link from 'next/link'
// eslint-disable-next-line no-duplicate-imports
import { useState } from 'react'
import { toast } from 'sonner'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { ShopifyProduct } from '@types'

import type { Route } from 'next'

interface ProductVariant {
  color: string
  colorName: string
  colorCode: string
  imageUrl?: string
}

interface ProductCardProps {
  product: ShopifyProduct
}

const getProductVariants = (handle: string): ProductVariant[] => {
  switch (handle) {
    case 'comfyrobe':
      return [
        {
          color: 'Fjellhimmel',
          colorName: 'Fjellhimmel',
          colorCode: '#232B38',
          imageUrl: '/produkter/comfyrobe'
        }
      ]
    case 'utekos-dun':
    case 'utekos-mikrofiber':
      return [
        {
          color: 'Fjellblå',
          colorName: 'Fjellblå',
          colorCode: '#020244',
          imageUrl: '/produkter/comfyrobe'
        },
        {
          color: 'Vargnatt',
          colorName: 'Vargnatt',
          colorCode: '#000000',
          imageUrl: '/produkter/comfyrobe'
        }
      ]
    default:
      return []
  }
}

const sizes = ['XS/S', 'M/L', 'L/XL']

export function ProductCard({ product }: ProductCardProps) {
  const price = formatPrice(product.priceRange.minVariantPrice)
  const productUrl = `/produkter/${product.handle}` as Route
  const variants = getProductVariants(product.handle)
  const imageUrl = product.featuredImage?.url || '/placeholder.svg'
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null)
  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const altText = product.featuredImage?.altText || product.title

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    toast.success(`${product.title} er lagt i handlepose`, {
      description: `Farge: ${selectedVariant?.colorName || 'Standard'}, Størrelse: ${selectedSize}`,
      duration: 3000
    })
  }

  return (
    <Card className='h-full flex flex-col bg-card-foreground border border-border/20 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 w-full overflow-hidden group'>
      <CardContent className='p-0 relative'>
        <Badge
          variant='secondary'
          className='absolute top-4 left-4 z-10 bg-accent text-accent-foreground font-medium px-3 py-1 text-xs tracking-wide'
        >
          Utekos
        </Badge>

        <AspectRatio
          ratio={2 / 3}
          className='w-full overflow-hidden rounded-t-lg'
        >
          <Image
            src={imageUrl}
            alt={altText}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
          />
        </AspectRatio>
      </CardContent>

      <CardHeader className='flex-grow p-6 pb-4'>
        <CardTitle className='text-xl font-semibold text-white line-clamp-2 mb-3 text-balance'>
          {product.title}
        </CardTitle>

        <div className='text-sm text-white mb-4 uppercase tracking-wide font-medium'>
          UNISEX
        </div>

        {variants.length > 0 && (
          <div className='mb-4'>
            <div className='flex items-center gap-2'>
              {variants.map(variant => (
                <button
                  key={variant.color}
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSelectedVariant(variant)
                  }}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-110 cursor-pointer ${
                    selectedVariant?.color === variant.color ?
                      'border-primary ring-2 ring-primary/30'
                    : 'border-border hover:border-primary/50'
                  }`}
                  style={{ backgroundColor: variant.colorCode }}
                  title={variant.colorName}
                />
              ))}
            </div>
          </div>
        )}

        <div className='mb-4'>
          <div className='flex items-center gap-2'>
            {sizes.map(size => (
              <button
                key={size}
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  setSelectedSize(size)
                }}
                className={`px-3 py-1 text-sm border rounded transition-all duration-200 hover:border-primary cursor-pointer ${
                  selectedSize === size ?
                    'border-primary bg-primary/10 text-primary font-medium'
                  : 'border-border text-white hover:text-foreground'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardFooter className='p-6 pt-0 flex flex-col gap-4'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex flex-col'>
            <p className='text-2xl font-bold text-white mb-1'>{price}</p>
            <p className='text-sm text-white'>Fri frakt over 500 kr</p>
          </div>
        </div>

        <div className='flex gap-3 w-full'>
          <Link href={productUrl} className='flex-1'>
            <Button
              variant='outline'
              size='default'
              className='w-full border-primary text-white hover:bg-primary font-medium hover:text-primary-foreground transition-all duration-200 bg-transparent'
            >
              Se produkt
            </Button>
          </Link>

          <Button
            onClick={handleQuickBuy}
            variant='default'
            size='sm'
            className='flex-1 bg-button hover:bg-button/90 text-primary-foreground font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/25'
          >
            Hurtigkjøp
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
