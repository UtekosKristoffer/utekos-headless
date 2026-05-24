import { forwardRef } from 'react'
import type { CSSProperties } from 'react'
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

type LaunchMotionStyle = CSSProperties & {
  '--launch-delay'?: string
  '--launch-duration'?: string
  '--launch-hidden-transform'?: string
  '--launch-hidden-filter'?: string
}

const kickerText = 'Norsk vår er uforutsigbar'
const kickerCharacters = Array.from(kickerText)

const launchMotionStyle = ({
  delay,
  duration,
  hiddenTransform,
  hiddenFilter = 'none'
}: {
  delay: number
  duration: number
  hiddenTransform: string
  hiddenFilter?: string
}): LaunchMotionStyle => ({
  '--launch-delay': `${delay}ms`,
  '--launch-duration': `${duration}ms`,
  '--launch-hidden-transform': hiddenTransform,
  '--launch-hidden-filter': hiddenFilter
})

const launchLetterStyle = (index: number): LaunchMotionStyle => ({
  '--launch-delay': `${1280 + index * 82}ms`,
  '--launch-duration': '2150ms',
  '--launch-hidden-transform':
    index % 2 === 0 ?
      'translate3d(0, 0.48em, 0) rotate(-1.2deg) scale(0.992)'
    : 'translate3d(0, 0.56em, 0) rotate(1.2deg) scale(0.992)',
  '--launch-hidden-filter': 'blur(0.35px)'
})

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
      className='relative mt-0 w-full scroll-mt-32 md:scroll-mt-36'
    >
      <style>
        {`
          @keyframes launchWordmarkBump {
            0%, 100% {
              transform: translateZ(0) scale(1) rotate(0deg);
            }

            46% {
              transform: translateZ(0) scale(1.032) rotate(-0.28deg);
            }
          }

          @keyframes launchCtaBump {
            0%, 100% {
              transform: translateZ(0) scale(1);
            }

            44% {
              transform: translateZ(0) scale(1.016);
            }
          }

          .launch-motion-item,
          .launch-motion-letter {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            filter: none;
          }

          [data-launch-motion='armed'] .launch-motion-item,
          [data-launch-motion='armed'] .launch-motion-letter {
            opacity: 0;
            transform: var(--launch-hidden-transform);
            filter: var(--launch-hidden-filter);
          }

          [data-launch-motion='ready'] .launch-motion-item,
          [data-launch-motion='ready'] .launch-motion-letter {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
            filter: none;
            transition-property: opacity, transform, filter;
            transition-duration: var(--launch-duration);
            transition-delay: var(--launch-delay);
            transition-timing-function: cubic-bezier(0.13, 0.92, 0.24, 1);
            will-change: opacity, transform;
          }

          [data-launch-motion='ready'] .launch-motion-primary-cta {
            animation: launchCtaBump 1100ms cubic-bezier(0.13, 0.92, 0.24, 1) 9000ms both;
          }

          [data-launch-motion='ready'] .launch-motion-wordmark-bump {
            animation: launchWordmarkBump 1250ms cubic-bezier(0.13, 0.92, 0.24, 1) 10800ms both;
          }

          @media (prefers-reduced-motion: reduce) {
            .launch-motion-item,
            .launch-motion-letter,
            .launch-motion-primary-cta,
            .launch-motion-wordmark-bump {
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
              transition: none !important;
              animation: none !important;
              will-change: auto !important;
            }
          }
        `}
      </style>

      <div data-launch-stage className='w-full'>
        <div
          data-launch-card
          className='relative isolate mx-2 overflow-hidden rounded-[1.25rem] border border-cloud-dancer/12 bg-[radial-gradient(circle_at_12%_10%,color-mix(in_oklch,var(--ancient-water)_16%,transparent),transparent_32%),linear-gradient(135deg,var(--maritime-blue)_0%,var(--maritime-darkest)_46%,var(--maritime-blue)_100%)] py-10 shadow-[0_24px_80px_-48px_color-mix(in_oklab,var(--maritime-darkest)_70%,transparent)] sm:mx-auto sm:max-w-[95%] sm:rounded-[1.75rem] sm:py-16 md:max-w-7xl xl:py-16'
        >
          <AmbientBackgroundGlow />

          <div className='pointer-events-none absolute inset-x-6 top-0 z-[3] h-px bg-gradient-to-r from-transparent via-cloud-dancer/35 to-transparent' />

          <div className='container relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-3 sm:gap-12 sm:px-6 lg:px-10 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] xl:gap-12'>
            <div
              className='launch-motion-item w-full'
              style={launchMotionStyle({
                delay: 0,
                duration: 2400,
                hiddenTransform: 'translate3d(0, 1.1rem, 0) scale(0.996)',
                hiddenFilter: 'blur(0.35px)'
              })}
            >
              <ImageColumn />
            </div>

            <div className='flex w-full flex-col items-start'>
              <div className='mb-8 flex flex-wrap items-center gap-2 sm:mb-10 sm:gap-3 xl:mb-8'>
                <div
                  className='launch-motion-item'
                  style={launchMotionStyle({
                    delay: 780,
                    duration: 1750,
                    hiddenTransform: 'translate3d(0, -0.45rem, 0) scale(0.992)'
                  })}
                >
                  <BrandBadge
                    backgroundColor='var(--dusted-peri)'
                    textColor='var(--maritime-darkest)'
                    className='max-w-full gap-2.5 border border-dusted-peri/55 px-3 py-2 text-sm font-medium tracking-[-0.01em] shadow-[0_10px_30px_-22px_color-mix(in_oklab,var(--cloud-dancer)_45%,transparent)] sm:px-5 sm:py-2.5 sm:text-base'
                  >
                    <span className='relative flex size-2 shrink-0'>
                      <span className='absolute inline-flex size-full animate-ping rounded-full bg-maritime-darkest opacity-75 motion-reduce:animate-none'></span>
                      <span className='relative inline-flex size-2 rounded-full bg-maritime-darkest'></span>
                    </span>
                    <span className='whitespace-nowrap'>Vårtilbud</span>
                  </BrandBadge>
                </div>

                <div
                  className='launch-motion-item'
                  style={launchMotionStyle({
                    delay: 1080,
                    duration: 1750,
                    hiddenTransform: 'translate3d(0, -0.45rem, 0) scale(0.992)'
                  })}
                >
                  <BrandBadge
                    backgroundColor='var(--bleached-mauve)'
                    textColor='var(--maritime-darkest)'
                    className='max-w-full gap-2 border border-bleached-mauve/35 px-3 py-2 text-sm font-medium tracking-[-0.01em] shadow-[0_14px_32px_-24px_color-mix(in_oklab,var(--bleached-mauve)_70%,transparent)] sm:px-5 sm:py-2.5 sm:text-base'
                  >
                    <BadgePercent className='size-4 shrink-0' />
                    <span className='whitespace-nowrap'>
                      Spar {savingsAmount} kr
                    </span>
                  </BrandBadge>
                </div>
              </div>

              <p
                aria-label={kickerText}
                className='mb-4 text-lg font-bold leading-[1.08] tracking-tight text-cloud-dancer sm:text-2xl md:text-3xl xl:text-3xl'
              >
                <span aria-hidden='true' className='block overflow-hidden pb-1'>
                  {kickerCharacters.map((character, index) => (
                    <span
                      key={`${character}-${index}`}
                      className='launch-motion-letter inline-block'
                      style={launchLetterStyle(index)}
                    >
                      {character === ' ' ? '\u00A0' : character}
                    </span>
                  ))}
                </span>
              </p>

              <h2 className='mb-7 max-w-3xl pb-2 text-[1.7rem] font-bold leading-[0.94] tracking-tight text-cloud-dancer min-[360px]:text-[1.8rem] sm:mb-8 sm:text-[2.5rem] md:text-5xl md:leading-[0.9] xl:max-w-none xl:text-6xl 2xl:text-7xl'>
                <span className='sr-only'>Utekos </span>

                <span
                  className='launch-motion-item block whitespace-nowrap overflow-visible'
                  style={launchMotionStyle({
                    delay: 4200,
                    duration: 2100,
                    hiddenTransform: 'translate3d(0, 0.62em, 0) scale(0.994)',
                    hiddenFilter: 'blur(0.35px)'
                  })}
                >
                  <span className='launch-motion-wordmark-bump inline-block px-[0.12em] text-cloud-dancer'>
                    <UtekosWordmark
                      aria-hidden='true'
                      focusable='false'
                      className='mr-[0.14em] inline-block h-[0.74em] w-auto translate-y-[0.08em] align-baseline'
                    />
                  </span>
                  <span>{productModelName}</span>
                </span>

                <span
                  className='launch-motion-item block overflow-visible'
                  style={launchMotionStyle({
                    delay: 4550,
                    duration: 2100,
                    hiddenTransform: 'translate3d(0, 0.62em, 0) scale(0.994)',
                    hiddenFilter: 'blur(0.35px)'
                  })}
                >
                  er ikke det
                </span>
              </h2>

              <div className='mb-8 w-full space-y-3 text-overcast sm:space-y-4'>
                {newProductFeatures.map((feature, index) => (
                  <div
                    key={feature.title}
                    className='launch-motion-item'
                    style={launchMotionStyle({
                      delay: 5600 + index * 420,
                      duration: 2400,
                      hiddenTransform: 'translate3d(0, 0.72rem, 0) scale(0.998)'
                    })}
                  >
                    <FeatureCard feature={feature} />
                  </div>
                ))}
              </div>

              <div
                className='launch-motion-item w-full'
                style={launchMotionStyle({
                  delay: 7500,
                  duration: 2400,
                  hiddenTransform: 'translate3d(0, 0.84rem, 0) scale(0.998)'
                })}
              >
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
                    <div className='launch-motion-primary-cta w-full lg:flex-[1.05]'>
                      <BrandBadge
                        asChild
                        backgroundColor='var(--primary-button)'
                        textColor='var(--maritime-darkest)'
                        className='group min-h-12 w-full justify-center px-6 py-3 text-base font-semibold tracking-[-0.01em] shadow-[0_18px_38px_-28px_color-mix(in_oklab,var(--primary-button)_78%,transparent)] transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-button motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-h-14'
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

                    <div className='w-full lg:flex-1'>
                      <BrandBadge
                        asChild
                        backgroundColor='color-mix(in oklab,var(--cloud-dancer) 12%,transparent)'
                        textColor='var(--cloud-dancer)'
                        className='group min-h-12 w-full justify-center border border-cloud-dancer/45 px-6 py-3 text-base font-semibold tracking-[-0.01em] shadow-[0_18px_38px_-30px_color-mix(in_oklab,var(--maritime-darkest)_58%,transparent)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-cloud-dancer/60 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloud-dancer motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-h-14'
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
          </div>
        </div>
      </div>
    </section>
  )
})

NewProductLaunchSectionView.displayName = 'NewProductLaunchSectionView'
