'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Check,
  Truck,
  RefreshCcw,
  ShieldCheck,
  ShoppingCart
} from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { cartStore } from '@/lib/state/cartStore'
import { toast } from 'sonner'
import { GID_PREFIX } from '@/api/constants'
import type { ColorVariant, SizeVariant } from '@types'
import { variantMap } from '../utils/variantMap'
import { productConfig } from '@/app/skreddersy-varmen/utekos-orginal/utils/productConfig'
import { waitForMutation } from '@/app/skreddersy-varmen/utekos-orginal/utils//waitForMutation'
export function PurchaseSection() {
  const [color, setColor] = useState<ColorVariant>('fjellbla')
  const [size, setSize] = useState<SizeVariant>('large')
  const cartActor = CartMutationContext.useActorRef()
  const isPending = CartMutationContext.useSelector(state =>
    state.matches('mutating')
  )

  const scrollToSizeGuide = () => {
    const element = document.getElementById('size-guide')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleAddToCart = async () => {
    const rawId = variantMap[color][size]
    const variantId = `${GID_PREFIX}${rawId}`

    try {
      await waitForMutation(
        { type: 'ADD_LINES', input: [{ variantId, quantity: 1 }] },
        cartActor
      )
      cartStore.send({ type: 'OPEN' })
    } catch (error) {
      console.error('Kunne ikke legge til vare:', error)
      toast.error('Noe gikk galt. Prøv igjen.')
    }
  }
  const activeImage = productConfig.colors.find(c => c.id === color)?.image

  return (
    <section className='w-full bg-[#F4F1EA] text-[#2C2420] py-16 md:py-24 border-t border-[#2C2420]/5'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start'>
          <AnimatedBlock className='relative w-full aspect-[4/5] bg-[#E5E2DB] rounded-2xl overflow-hidden shadow-lg border border-[#2C2420]/5'>
            <Image
              src={activeImage || ''}
              alt={`Utekos Mikrofiber i fargen ${color}`}
              fill
              className='object-cover transition-all duration-500'
              sizes='(max-width: 768px) 100vw, 50vw'
              quality={95}
            />
            <div className='absolute top-4 left-4 bg-[#E07A5F] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm'>
              Bestselger
            </div>
          </AnimatedBlock>
          <div className='flex flex-col justify-center h-full'>
            <AnimatedBlock delay='0.1s'>
              <h2 className='font-serif text-3xl md:text-5xl mb-4 text-[#2C2420]'>
                Sikre deg varmen nå.
              </h2>
              <p className='text-[#2C2420]/70 text-base md:text-lg mb-8 leading-relaxed'>
                Invester i kvalitetstid. Utekos Mikrofiber™ er laget for å
                vare, sesong etter sesong.
              </p>
              <div className='flex items-baseline gap-3 mb-8 border-b border-[#2C2420]/10 pb-6'>
                <span className='text-3xl font-bold text-[#2C2420]'>
                  {productConfig.price},-
                </span>
                <span className='text-[#2C2420]/50 text-sm'>
                  Inkl. mva og fri frakt
                </span>
              </div>

              <div className='mb-8'>
                <label className='block text-sm font-bold uppercase tracking-wider text-[#2C2420]/60 mb-3'>
                  Velg Farge:{' '}
                  <span className='text-[#2C2420] ml-1'>
                    {productConfig.colors.find(c => c.id === color)?.name}
                  </span>
                </label>
                <div className='flex gap-4'>
                  {productConfig.colors.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setColor(c.id as ColorVariant)}
                      className={`
                        group relative w-14 h-14 md:w-16 md:h-16 rounded-full border-2 transition-all duration-200
                        ${color === c.id ? 'border-[#E07A5F] scale-110 ring-2 ring-[#E07A5F]/20' : 'border-transparent hover:scale-105'}
                      `}
                      aria-label={`Velg farge ${c.name}`}
                    >
                      <span
                        className='absolute inset-1 rounded-full border border-black/10'
                        style={{ backgroundColor: c.hex }}
                      />
                      {color === c.id && (
                        <span className='absolute inset-0 flex items-center justify-center text-white drop-shadow-md'>
                          <Check size={20} strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className='mb-10'>
                <div className='flex justify-between items-center mb-3'>
                  <label className='block text-sm font-bold uppercase tracking-wider text-[#2C2420]/60'>
                    Velg Størrelse
                  </label>
                  <button
                    onClick={scrollToSizeGuide}
                    className='text-xs md:text-sm underline text-[#2C2420]/60 hover:text-[#E07A5F] transition-colors'
                  >
                    Usikker på størrelsen?
                  </button>
                </div>

                <div className='grid grid-cols-2 gap-3 md:gap-4'>
                  {productConfig.sizes.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSize(s.id as SizeVariant)}
                      className={`
                          relative p-3 md:p-4 rounded-xl border-2 text-left transition-all duration-200
                          ${
                            size === s.id ?
                              'border-[#E07A5F] bg-[#E07A5F]/5'
                            : 'border-[#2C2420]/10 hover:border-[#2C2420]/30 bg-white'
                          }
                        `}
                    >
                      <span
                        className={`block font-bold text-base md:text-lg mb-1 ${size === s.id ? 'text-[#E07A5F]' : 'text-[#2C2420]'}`}
                      >
                        {s.name}
                      </span>
                      <span className='block text-xs text-[#2C2420]/60 leading-tight'>
                        {s.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isPending}
                className='
                  w-full bg-[#E07A5F] hover:bg-[#D06A4F] text-white text-lg font-bold 
                  py-4 md:py-5 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1
                  active:scale-[0.98] transition-all duration-200 
                  flex items-center justify-center gap-3 
                  disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                '
              >
                {isPending ?
                  <>
                    <RefreshCcw className='animate-spin' /> Legger til...
                  </>
                : <>
                    <ShoppingCart size={20} /> Legg i handlekurv —{' '}
                    {productConfig.price},-
                  </>
                }
              </button>
              <div className='mt-6 md:mt-8 grid grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm text-[#2C2420]/60'>
                <div className='flex items-center gap-2'>
                  <Truck size={16} className='text-[#E07A5F]' />
                  <span>Gratis frakt & rask levering</span>
                </div>
                <div className='flex items-center gap-2'>
                  <ShieldCheck size={16} className='text-[#E07A5F]' />
                  <span>30 dagers åpent kjøp</span>
                </div>
              </div>
            </AnimatedBlock>
          </div>
        </div>
      </div>
    </section>
  )
}
