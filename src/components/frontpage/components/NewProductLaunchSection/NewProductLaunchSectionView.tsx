import { forwardRef } from 'react'
import Link from 'next/link'
import { ArrowRight, BadgePercent } from 'lucide-react'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { AmbientBackgroundGlow } from './AmbientBackgroundGlow'
import { FeatureCard } from './FeatureCard'
import { ImageColumn } from './ImageColumn'
import { newProductFeatures } from './newProductFeatures'
import {
  productName,
  productUrl,
  originalPrice,
  currentPrice
} from '@/api/constants'

interface NewProductLaunchSectionViewProps {
  onDiscoverClick: () => void
  onQuickViewClick: () => void
}

export const NewProductLaunchSectionView = forwardRef<
  HTMLElement,
  NewProductLaunchSectionViewProps
>(({ onDiscoverClick, onQuickViewClick }, ref) => {
  const savingsAmount = originalPrice - currentPrice

  return (
    <section
      id='featured-product'
      ref={ref}
      className='relative isolate mx-3 mt-16 scroll-mt-32 overflow-hidden rounded-[1.75rem] border border-cloud-dancer/12 bg-[radial-gradient(circle_at_12%_10%,color-mix(in_oklch,var(--ancient-water)_16%,transparent),transparent_32%),linear-gradient(135deg,var(--maritime-blue)_0%,var(--maritime-darkest)_46%,var(--maritime-blue)_100%)] py-10 shadow-[0_24px_80px_-48px_rgba(12,22,32,0.7)] sm:mx-auto sm:max-w-[95%] sm:py-14 md:max-w-7xl md:scroll-mt-36 lg:py-16'
    >
      <AmbientBackgroundGlow />
      <div className='pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cloud-dancer/35 to-transparent' />
      <div className='container mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 md:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] md:gap-12 lg:px-10'>
        <div className='gsap-image-col opacity-0'>
          <ImageColumn />
        </div>

        <div className='gsap-content-col opacity-0 flex flex-col items-start'>
          <div className='mb-7 flex flex-nowrap items-center gap-2 sm:gap-3'>
            <BrandBadge
              backgroundColor='var(--dusted-peri)'
              textColor='var(--maritime-blue)'
              className='gsap-item gap-2.5 border border-dusted-peri/20 px-4 py-2 text-sm font-medium shadow-[0_10px_30px_-22px_rgba(255,255,255,0.45)] sm:px-5 sm:py-2.5 sm:text-base'
            >
              <span className='relative flex size-2 shrink-0'>
                <span className='absolute inline-flex size-full animate-ping rounded-full bg-maritime-blue opacity-75'></span>
                <span className='relative inline-flex size-2 rounded-full bg-maritime-darkest'></span>
              </span>
              <span className='whitespace-nowrap'>Vårtilbud</span>
            </BrandBadge>

            <BrandBadge
              backgroundColor='var(--bleached-mauve)'
              textColor='var(--maritime-darkest)'
              className='gsap-item gap-2 border border-bleached-mauve/35 px-4 py-2 text-sm font-medium shadow-[0_14px_32px_-24px_rgba(232,178,66,0.75)] sm:px-5 sm:py-2.5 sm:text-base'
            >
              <BadgePercent className='size-4 shrink-0' />
              <span className='whitespace-nowrap'>Spar {savingsAmount} kr</span>
            </BrandBadge>
          </div>

          <p className='gsap-item opacity-0 mb-3 text-2xl! leading-tight text-ancient-water sm:text-5xl'>
            Norsk vår er uforutsigbar
          </p>
          <h2 className='gsap-item opacity-0 mb-2 max-w-2xl pb-2 text-4xl font-bold leading-tight text-cloud-dancer'>
            {productName} er ikke det
          </h2>

          <div className='mb-8 w-full space-y-3 text-overcast'>
            {newProductFeatures.map(feature => (
              <div key={feature.title} className='gsap-feature opacity-0'>
                <FeatureCard feature={feature} />
              </div>
            ))}
          </div>

          <div className='gsap-item opacity-0 w-full'>
            <div className='flex w-full flex-col gap-6 border-t border-cloud-dancer/12 pt-6'>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-wrap items-baseline gap-3'>
                  <p className='text-5xl font-bold tracking-tight text-cloud-dancer sm:text-6xl'>
                    {currentPrice},-
                  </p>
                  <span className='text-sm text-overcast'>inkl. mva</span>
                  <span className='rounded-full bg-cloud-dancer/10 px-3 py-1 text-sm font-bold text-overcast ring-1 ring-cloud-dancer/15 line-through decoration-2 decoration-overcast/80'>
                    {originalPrice},-
                  </span>
                </div>
              </div>

              <div className='flex flex-wrap gap-3'>
                <BrandBadge
                  asChild
                  backgroundColor='var(--cloud-dancer)'
                  textColor='var(--maritime-blue)'
                  className='group min-h-14 flex-1 justify-center border border-cloud-dancer/10 text-base shadow-lg shadow-black/15 transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloud-dancer'
                >
                  <Link
                    href={productUrl}
                    onClick={onDiscoverClick}
                    data-track='NewProductLaunchDiscoverClick'
                  >
                    Oppdag {productName}
                    <ArrowRight className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
                  </Link>
                </BrandBadge>
                <BrandBadge
                  asChild
                  backgroundColor='var(--primary-button)'
                  textColor='var(--maritime-darkest)'
                  className='group min-h-14 flex-1 justify-center text-base shadow-lg shadow-black/20 transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-button'
                >
                  <button
                    type='button'
                    onClick={onQuickViewClick}
                    data-track='NewProductLaunchAddToCartClick'
                  >
                    Legg i handlekurv
                  </button>
                </BrandBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

NewProductLaunchSectionView.displayName = 'NewProductLaunchSectionView'
