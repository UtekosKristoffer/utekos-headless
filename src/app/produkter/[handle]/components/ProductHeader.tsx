import { AnimatedBlock } from '@/components/AnimatedBlock'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
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
          <BrandBadge
            backgroundColor='var(--dusted-peri)'
            textColor='var(--maritime-darkest)'
            className='mb-5 gap-2 shadow-[0_18px_44px_-28px_color-mix(in_oklab,var(--dusted-peri)_80%,transparent)]'
          >
            <Sparkles className='h-5 w-5' aria-hidden='true' />
            <span>Begrenset opplag</span>
          </BrandBadge>
        )}

        <h1 className='text-fluid-headline font-sans font-bold leading-none tracking-tight text-maritime-blue'>
          {productTitle}
        </h1>

        {typeof productSubtitle === 'string'
          && productSubtitle.trim() !== '' && (
            <p className='mt-4 max-w-2xl text-lg font-light leading-relaxed text-maritime-blue/76'>
              {productSubtitle}
            </p>
          )}
      </AnimatedBlock>
    </div>
  )
}
