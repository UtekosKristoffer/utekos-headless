'use client'

import React, { useEffect, useRef } from 'react'
import { ArrowRight, Truck, PackageCheck, Loader2 } from 'lucide-react'
import gsap from 'gsap'
import type { ProductOffer } from '../utils/offerData'
import { useAddToCartAction } from '@/hooks/useAddToCartAction'

const VARIANT_IDS = {
  'XS/S': 'gid://shopify/ProductVariant/43959919051000',
  'L/XL': 'gid://shopify/ProductVariant/43959919116536',
  'STAPPER': 'gid://shopify/ProductVariant/42903954292984'
}

interface CheckoutPanelProps {
  mainProduct: ProductOffer
  upsellProduct: ProductOffer
  isUpsellSelected: boolean
  selectedSize: 'XS/S' | 'L/XL'
  productImageSrc: string // NY PROP: Viktig for at bildet skal vises i cart
}

export function CheckoutPanel({
  mainProduct,
  upsellProduct,
  isUpsellSelected,
  selectedSize,
  productImageSrc
}: CheckoutPanelProps) {
  const totalPrice =
    mainProduct.price + (isUpsellSelected ? upsellProduct.price : 0)
  const priceRef = useRef<HTMLSpanElement>(null)

  // --- ROBUST MOCK DATA FOR OPTIMISTIC UI & TRACKING ---

  const productMock = {
    id: 'gid://shopify/Product/8036341448952',
    title: mainProduct.name,
    handle: 'comfyrobe',
    vendor: 'Utekos',
    description: 'Den ultimate skiftekåpen.',
    featuredImage: {
      url: productImageSrc,
      altText: mainProduct.name,
      width: 1000,
      height: 1000
    },
    images: {
      edges: [
        {
          node: {
            url: productImageSrc,
            altText: mainProduct.name,
            width: 1000,
            height: 1000
          }
        }
      ]
    },
    priceRange: {
      minVariantPrice: {
        amount: mainProduct.price.toString(),
        currencyCode: 'NOK'
      },
      maxVariantPrice: {
        amount: mainProduct.price.toString(),
        currencyCode: 'NOK'
      }
    }
  }

  const selectedVariantMock = {
    id: VARIANT_IDS[selectedSize],
    title: selectedSize,
    availableForSale: true,
    quantityAvailable: 100,
    price: {
      amount: mainProduct.price.toString(),
      currencyCode: 'NOK'
    },
    image: {
      url: productImageSrc,
      altText: mainProduct.name,
      width: 1000,
      height: 1000
    },
    selectedOptions: [{ name: 'Størrelse', value: selectedSize }],
    product: {
      id: productMock.id,
      title: productMock.title,
      handle: productMock.handle
    }
  }

  const additionalLine =
    isUpsellSelected ?
      {
        variantId: VARIANT_IDS.STAPPER,
        quantity: 1
      }
    : undefined

  const { performAddToCart, isPending } = useAddToCartAction({
    product: productMock as any,
    selectedVariant: selectedVariantMock as any,
    additionalLine
  })

  useEffect(() => {
    if (priceRef.current) {
      gsap.to(priceRef.current, {
        innerText: totalPrice,
        duration: 0.5,
        snap: { innerText: 1 },
        ease: 'power2.out'
      })
    }
  }, [totalPrice])

  return (
    <div className='bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 lg:p-8 shadow-2xl'>
      <div className='flex flex-col gap-6'>
        {/* Progress Bar for Free Shipping (Alltid oppfylt her) */}
        <div className='mb-4'>
          <div className='flex justify-between items-center mb-2 text-xs uppercase font-bold tracking-wider'>
            <span className='text-green-400 flex items-center gap-1.5'>
              <Truck className='w-3 h-3' /> Fri Frakt Oppnådd
            </span>
            <span className='text-slate-500'>Mål: 999,-</span>
          </div>
          <div className='h-2 w-full bg-slate-800 rounded-full overflow-hidden'>
            <div className='h-full w-full bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]' />
          </div>
        </div>

        <div className='flex justify-between items-end'>
          <span className='text-slate-400 text-sm uppercase tracking-widest mb-1'>
            Totalbeløp
          </span>
          <div className='text-4xl lg:text-5xl font-bold text-white tracking-tighter'>
            <span ref={priceRef}>{totalPrice}</span>,-
          </div>
        </div>

        <button
          onClick={() => performAddToCart(1)}
          disabled={isPending}
          className='group relative w-full overflow-hidden rounded-full bg-white py-4 lg:py-5 text-lg font-bold text-black transition-all hover:scale-[1.01] active:scale-[0.98] shadow-[0_0_40px_rgba(255,255,255,0.1)] disabled:opacity-70 disabled:cursor-not-allowed'
        >
          <div className='absolute inset-0 bg-gradient-to-r from-sky-400 via-white to-sky-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500' />
          <span className='relative z-10 flex items-center justify-center gap-2'>
            {isPending ?
              <>
                <Loader2 className='w-5 h-5 animate-spin' /> Legger til...
              </>
            : <>
                Kjøp nå{' '}
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </>
            }
          </span>
        </button>

        <div className='text-center text-xs text-slate-500'>
          Sikker betaling via Vipps • Klarna • Kort
        </div>
      </div>
    </div>
  )
}
