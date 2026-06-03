'use client'

import { MoveRightIcon } from '@/components/animate-icons/icons/move-right'
import { Button } from '@/components/ui/button'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { cartStore } from '@/lib/state/cartStore'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import type { NbccProductCardActionsProps } from '../types'

export function NbccProductCardActions({
  variants,
  href,
  productTitle,
  tracking
}: NbccProductCardActionsProps) {
  const [selectedLabel, setSelectedLabel] = useState(variants[0]?.label ?? '')

  const cartActor = CartMutationContext.useActorRef()
  const isPending = CartMutationContext.useSelector(state => state.matches('mutating'))
  const lastError = CartMutationContext.useSelector(state => state.context.error)

  useEffect(() => {
    if (lastError) {
      toast.error(lastError)
    }
  }, [lastError])

  const selectedVariant = variants.find(v => v.label === selectedLabel)
  const isAvailable = selectedVariant?.availableForSale ?? false
  const price = selectedVariant?.price ?? variants[0]?.price ?? ''

  const handleAddToCart = () => {
    if (!selectedVariant?.variantId) {
      toast.error('Velg en størrelse først.')
      return
    }
    if (!isAvailable) {
      toast.warning('Denne størrelsen er dessverre utsolgt.')
      return
    }
    cartActor.send({
      type: 'ADD_LINES',
      input: [{ variantId: selectedVariant.variantId, quantity: 1 }]
    })
    toast.success(`${productTitle} (${selectedVariant.label}) er lagt i handlekurven!`)
    cartStore.send({ type: 'OPEN' })
  }

  return (
    <div className='flex flex-col gap-4'>
      {/* Size selector */}
      <div>
        <p className='mb-2 text-xs font-medium uppercase tracking-widest text-foreground'>Størrelse</p>
        <div className='flex flex-wrap gap-2'>
          {variants.map(v => (
            <button
              key={v.label}
              type='button'
              onClick={() => setSelectedLabel(v.label)}
              disabled={!v.availableForSale}
              className={[
                'rounded-md border px-3 py-1.5 text-sm font-medium transition-all',
                v.label === selectedLabel ? 'border-primary bg-cloud-dancer text-background'
                : !v.availableForSale ?
                  'cursor-not-allowed border-cloud-dancer/10 text-foreground/25 line-through'
                : 'border-cloud-dancer/20 text-foreground/70 hover:border-cloud-dancer/40 hover:text-foreground'
              ].join(' ')}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className='flex items-center justify-between'>
        <span className='text-xl font-semibold text-foreground'>{price}</span>
        <span className='rounded-full border   border-primary/30 bg-cloud-dancer px-2 py-0.5 text-xs text-background'>
          NBCC-rabatt i kassen
        </span>
      </div>

      {/* CTAs */}
      <div className='flex flex-col gap-2'>
        <Button
          onClick={handleAddToCart}
          disabled={isPending || !isAvailable}
          className='h-11 w-full rounded-md bg-primary text-background hover:bg-primary/90'
        >
          {isPending ?
            <Loader2 className='size-4 animate-spin' />
          : 'Legg i handlekurv'}
        </Button>
        <Button
          asChild
          className='h-9 rounded-md bg-cloud-dancer w-full py-x border border-white/10 text-havdyp hover:border-white/20 hover:bg-white/5 hover:text-white transition-all duration-200'
        >
          <Link href={href} data-track='NbccProductCardCtaClick' data-track-data={JSON.stringify(tracking)}>
            Produktside
            <MoveRightIcon size={16} animateOnHover='default' />
          </Link>
        </Button>
      </div>
    </div>
  )
}
