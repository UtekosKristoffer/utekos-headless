'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Plus, Check } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import type { ProductOffer } from 'types/cart'
export interface UpsellItemProps {
  product: ProductOffer
  isSelected: boolean
  onToggle: () => void
}

export function UpsellItem({ product, isSelected, onToggle }: UpsellItemProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useGSAP(
    () => {
      gsap.to(containerRef.current, {
        borderColor:
          isSelected ? 'rgba(56, 189, 248, 0.5)' : 'rgba(30, 41, 59, 1)',
        backgroundColor:
          isSelected ? 'rgba(12, 74, 110, 0.2)' : 'rgba(15, 23, 42, 0.4)',
        duration: 0.3
      })
    },
    { dependencies: [isSelected], scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='group relative cursor-pointer border rounded-2xl p-4 transition-all duration-300 active:scale-[0.98]'
    >
      <div className='flex items-start justify-between gap-4'>
        <div className='relative flex items-center justify-center w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 shrink-0 overflow-hidden'>
          <Image
            src='/webp/utekos-stapper-1080.webp'
            alt={product.name}
            fill
            className='object-cover'
            sizes='64px'
          />
        </div>

        <div className='flex-1'>
          <div className='flex justify-between items-start mb-1'>
            <span className='text-sm font-bold text-white uppercase tracking-wide'>
              Gjør pakken komplett
            </span>
            {isSelected ?
              <div className='flex items-center justify-center w-6 h-6 rounded-full bg-sky-500 text-white shadow-[0_0_10px_rgba(14,165,233,0.5)]'>
                <Check className='w-4 h-4' />
              </div>
            : <div
                className={`flex items-center justify-center w-6 h-6 rounded-full border transition-colors ${isHovered ? 'border-sky-400 text-sky-400' : 'border-slate-600 text-slate-600'}`}
              >
                <Plus className='w-4 h-4' />
              </div>
            }
          </div>

          <h4 className='font-bold text-slate-200'>{product.name}</h4>
          <p className='text-xs text-slate-400 mt-1 line-clamp-1'>
            {product.features.join(' • ')}
          </p>
          <div className='mt-2 text-sky-300 font-mono text-sm'>
            + {product.price},-
          </div>
        </div>
      </div>
    </div>
  )
}
