// Path: src/app/produkter/[handle]/ProductPageView/components/ProductHeader.tsx
// Server Component: ren presentasjon av tittel, undertittel og ev. badge

import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Sparkles } from 'lucide-react'

export interface ProductHeaderProps {
  productHandle: string
  productTitle: string
  productSubtitle: string
}

export default function ProductHeader({
  productHandle,
  productTitle,
  productSubtitle
}: ProductHeaderProps) {
  return (
    <div className='mb-8 text-left'>
      <AnimatedBlock
        className='will-animate-fade-in-up'
        delay='0.06s'
        threshold={0.2}
      >
        {productHandle === 'utekos-special-edition' && (
          <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-900/20 px-4 py-2'>
            <Sparkles className='h-4 w-4 text-amber-400' aria-hidden='true' />
            <span className='text-sm font-medium text-amber-400'>
              Begrenset opplag
            </span>
          </div>
        )}

        <h1 className='text-fluid-headline font-bold'>{productTitle}</h1>

        {typeof productSubtitle === 'string'
          && productSubtitle.trim() !== '' && (
            <p className='mt-3 text-lg leading-relaxed text-foreground/80'>
              {productSubtitle}
            </p>
          )}
      </AnimatedBlock>
    </div>
  )
}
