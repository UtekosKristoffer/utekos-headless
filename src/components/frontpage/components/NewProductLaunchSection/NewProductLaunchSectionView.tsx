import { forwardRef } from 'react'
import Link from 'next/link'
import { ArrowRight, BadgePercent } from 'lucide-react'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
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
  const productModelName = productName.replace(/^Utekos\s+/, '')

  return (
    <section
      id='featured-product'
      ref={ref}
      className='relative isolate mx-2 mt-0 scroll-mt-32 overflow-hidden rounded-[1.25rem] border border-cloud-dancer/12 bg-[radial-gradient(circle_at_12%_10%,color-mix(in_oklch,var(--ancient-water)_16%,transparent),transparent_32%),linear-gradient(135deg,var(--maritime-blue)_0%,var(--maritime-darkest)_46%,var(--maritime-blue)_100%)] py-10 shadow-[0_24px_80px_-48px_color-mix(in_oklab,var(--maritime-darkest)_70%,transparent)] sm:mx-auto sm:max-w-[95%] sm:rounded-[1.75rem] sm:py-16 md:max-w-7xl md:scroll-mt-36 xl:py-16'
    >
      <AmbientBackgroundGlow />
      <div className='pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cloud-dancer/35 to-transparent' />
      <div className='container mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-3 sm:gap-12 sm:px-6 lg:px-10 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] xl:gap-12'>
        <div className='gsap-image-col opacity-0'>
          <ImageColumn />
        </div>

        <div className='gsap-content-col opacity-0 flex w-full flex-col items-start'>
          <div className='mb-8 flex flex-wrap items-center gap-2 sm:mb-10 sm:gap-3 xl:mb-8'>
            <BrandBadge
              backgroundColor='var(--cloud-dancer)'
              textColor='var(--maritime-darkest)'
              className='gsap-item max-w-full gap-2.5 border border-dusted-peri/55 px-3 py-2 text-sm font-medium tracking-[-0.01em] shadow-[0_10px_30px_-22px_color-mix(in_oklab,var(--cloud-dancer)_45%,transparent)] sm:px-5 sm:py-2.5 sm:text-base'
            >
              <span className='relative flex size-2 shrink-0'>
                <span className='absolute inline-flex size-full animate-ping rounded-full bg-dusted-peri opacity-75 motion-reduce:animate-none'></span>
                <span className='relative inline-flex size-2 rounded-full bg-dusted-peri'></span>
              </span>
              <span className='whitespace-nowrap'>Vårtilbud</span>
            </BrandBadge>

            <BrandBadge
              backgroundColor='var(--bleached-mauve)'
              textColor='var(--maritime-darkest)'
              className='gsap-item max-w-full gap-2 border border-bleached-mauve/35 px-3 py-2 text-sm font-medium tracking-[-0.01em] shadow-[0_14px_32px_-24px_color-mix(in_oklab,var(--bleached-mauve)_70%,transparent)] sm:px-5 sm:py-2.5 sm:text-base'
            >
              <BadgePercent className='size-4 shrink-0' />
              <span className='whitespace-nowrap'>Spar {savingsAmount} kr</span>
            </BrandBadge>
          </div>

          <p className='gsap-item mb-4 text-lg font-bold leading-[1.08] tracking-[-0.01em] text-ancient-water opacity-0 sm:text-2xl md:text-3xl xl:text-3xl'>
            Norsk vår er uforutsigbar
          </p>
          <h2 className='gsap-item mb-7 max-w-3xl pb-2 text-[1.75rem] font-bold leading-[0.94] tracking-[-0.01em] text-cloud-dancer opacity-0 min-[360px]:text-[1.875rem] sm:mb-8 sm:text-[2.5rem] md:text-5xl md:leading-[0.9] xl:max-w-none xl:text-6xl 2xl:text-7xl'>
            <span className='sr-only'>Utekos </span>
            <span className='block whitespace-nowrap'>
              <UtekosWordmark
                aria-hidden='true'
                focusable='false'
                className='mr-[0.12em] inline-block h-[1.05em] w-auto translate-y-[0.15em] align-baseline'
              />
              <span>{productModelName}</span>
            </span>
            <span className='block'>er ikke det</span>
          </h2>

          <div className='mb-8 w-full space-y-3 text-overcast sm:space-y-4'>
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
                  <p className='text-4xl font-bold leading-none tracking-[-0.01em] text-cloud-dancer sm:text-5xl lg:text-6xl'>
                    {currentPrice},-
                  </p>
                  <span className='text-sm text-overcast'>inkl. mva</span>
                  <span className='rounded-full bg-cloud-dancer/10 px-3 py-1 text-sm font-bold text-overcast ring-1 ring-cloud-dancer/15 line-through decoration-2 decoration-overcast/80'>
                    {originalPrice},-
                  </span>
                </div>
              </div>

              <div className='flex w-full flex-col gap-3 lg:flex-row'>
                <BrandBadge
                  asChild
                  backgroundColor='var(--primary-button)'
                  textColor='var(--maritime-darkest)'
                  className='group min-h-12 w-full justify-center px-6 py-3 text-base font-semibold tracking-[-0.01em] shadow-[0_18px_38px_-28px_color-mix(in_oklab,var(--primary-button)_78%,transparent)] transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-button motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-h-14 lg:flex-[1.05]'
                >
                  <button
                    type='button'
                    onClick={onQuickViewClick}
                    data-track='NewProductLaunchAddToCartClick'
                  >
                    Legg i handlekurv
                  </button>
                </BrandBadge>
                <BrandBadge
                  asChild
                  backgroundColor='color-mix(in oklab,var(--cloud-dancer) 12%,transparent)'
                  textColor='var(--cloud-dancer)'
                  className='group min-h-12 w-full justify-center border border-cloud-dancer/45 px-6 py-3 text-base font-semibold tracking-[-0.01em] shadow-[0_18px_38px_-30px_color-mix(in_oklab,var(--maritime-darkest)_58%,transparent)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-cloud-dancer/60 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloud-dancer motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-h-14 lg:flex-1'
                >
                  <Link
                    href={productUrl}
                    onClick={onDiscoverClick}
                    data-track='NewProductLaunchDiscoverClick'
                  >
                    Oppdag {productModelName}
                    <ArrowRight className='ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0' />
                  </Link>
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
