import { forwardRef } from 'react'
import Link from 'next/link'
import { ArrowRight, BadgePercent } from 'lucide-react'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { AmbientBackgroundGlow } from './AmbientBackgroundGlow'
import { FeatureCard } from './FeatureCard'
import { ImageColumn } from './ImageColumn'
import { newProductFeatures } from './newProductFeatures'
import { productName, productUrl, originalPrice, currentPrice } from '@/api/constants'
import { launchMotionStyle } from './utils/launchMotionStyle'
import { launchLetterStyle } from './utils/launchLetterStyle'
import type { NewProductLaunchSectionViewProps } from './types'

const kickerText = 'Norsk vår er uforutsigbar'
const kickerCharacters = Array.from(kickerText)

export const NewProductLaunchSectionView = forwardRef<HTMLElement, NewProductLaunchSectionViewProps>(
  ({ onDiscoverClick, onQuickViewClick }, ref) => {
    const savingsAmount = originalPrice - currentPrice
    const productModelName = productName.replace(/^Utekos\s+/, '')

    return (
      <article
        id='featured-product'
        ref={ref}
        className='relative mt-0 w-full mx-auto scroll-mt-32 md:w-[90%] md:scroll-mt-36'
      >
        <style>
          {`
          /* === Calm easing — expo-out. Lang, myk landing. === */
          :root {
            --launch-ease: cubic-bezier(0.22, 1, 0.36, 1);
          }

          /* === Baseline (ingen JS / motion ready): synlig === */
          .launch-motion-item,
          .launch-image-motion-item,
          .launch-motion-letter {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            filter: none;
          }

          /* === Armed: skjult tilstand før reveal === */
          [data-launch-motion='armed'] .launch-motion-item,
          [data-launch-motion='armed'] .launch-motion-letter {
            opacity: var(--launch-hidden-opacity, 0);
            transform: var(--launch-hidden-transform);
            filter: var(--launch-hidden-filter);
          }

          [data-launch-motion='armed'] .launch-image-motion-item {
            opacity: 1;
            transform: var(--launch-hidden-transform);
            filter: var(--launch-hidden-filter);
          }

          /* === Ready: settling-transition === */
          [data-launch-motion='ready'] .launch-motion-item,
          [data-launch-motion='ready'] .launch-image-motion-item,
          [data-launch-motion='ready'] .launch-motion-letter {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            filter: none;
            transition-property: opacity, transform, filter;
            transition-duration: var(--launch-duration);
            transition-delay: var(--launch-delay);
            transition-timing-function: var(--launch-ease);
            will-change: opacity, transform;
          }

          /* === Sceneteppet: topplinjen åpner fra midten === */
          .launch-stage-line {
            transform-origin: 50% 50%;
            transform: scaleX(0);
          }
          [data-launch-motion='ready'] .launch-stage-line {
            transform: scaleX(1);
            transition: transform 900ms var(--launch-ease) 0ms;
          }

          /* === Primær-CTA sheen: invitasjonens stille glans === */
          .launch-motion-primary-cta {
            position: relative;
            isolation: isolate;
            overflow: hidden;
            border-radius: inherit;
          }
          .launch-motion-primary-cta::after {
            content: '';
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: linear-gradient(
              105deg,
              transparent 38%,
              color-mix(in oklab, var(--cloud-dancer) 38%, transparent) 50%,
              transparent 62%
            );
            transform: translateX(-110%);
            mix-blend-mode: overlay;
            opacity: 0;
            border-radius: inherit;
          }
          [data-launch-motion='ready'] .launch-motion-primary-cta::after {
            animation: launchSheen 1400ms var(--launch-ease) 6400ms both;
          }

          @keyframes launchSheen {
            0% {
              transform: translateX(-110%);
              opacity: 0;
            }
            18% {
              opacity: 1;
            }
            82% {
              opacity: 1;
            }
            100% {
              transform: translateX(110%);
              opacity: 0;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .launch-motion-item,
            .launch-image-motion-item,
            .launch-motion-letter,
            .launch-stage-line,
            .launch-motion-primary-cta::after {
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
              transition: none !important;
              animation: none !important;
              will-change: auto !important;
            }
            .launch-motion-primary-cta::after {
              display: none !important;
            }
          }
        `}
        </style>

        <div data-launch-stage className='w-full'>
          <div
            data-launch-card
            className='relative isolate mx-2 overflow-hidden rounded-[1.25rem] border border-cloud-dancer/12 bg-[radial-gradient(circle_at_12%_10%,color-mix(in_oklch,var(--quiet-tide)_16%,transparent)_0%,transparent_55%),radial-gradient(circle_at_88%_92%,color-mix(in_oklch,var(--fair-orchid)_12%,transparent)_0%,transparent_60%),var(--background)] p-4 sm:mx-4 sm:p-8 lg:p-12'
          >
            <AmbientBackgroundGlow />

            {/* Sceneteppet: hårtynn linje som åpner fra midten */}
            <div className='launch-stage-line pointer-events-none absolute inset-x-6 top-0 z-3 h-px bg-linear-to-r from-transparent via-cloud-dancer/35 to-transparent' />

            <div className='container relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-3 sm:gap-12 sm:px-6 lg:px-10 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] xl:gap-12'>
              <div
                className='launch-image-motion-item w-full'
                style={launchMotionStyle({
                  delay: 0,
                  duration: 1800,
                  hiddenTransform: 'translate3d(0, 0.35rem, 0) scale(0.992)',
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
                      delay: 900,
                      duration: 1500,
                      hiddenTransform: 'translate3d(0, -0.3rem, 0)'
                    })}
                  >
                    <BrandBadge
                      backgroundColor='var(--quet-tide-secondary-monochromatic)'
                      textColor='var(--quet-tide-primary-monochromatic)'
                      className='max-w-full gap-2.5 border border-quet-tide-secondary-monochromatic/55 px-3 py-2 text-sm font-medium shadow-[0_10px_30px_-22px_color-mix(in_oklab,var(--quet-tide-secondary-monochromatic)_45%,transparent)]'
                    >
                      <span className='relative flex size-2 shrink-0'>
                        <span className='absolute inline-flex size-full animate-ping rounded-full bg-quet-tide-primary-monochromatic opacity-75 motion-reduce:animate-none'></span>
                        <span className='relative inline-flex size-2 rounded-full bg-quet-tide-primary-monochromatic'></span>
                      </span>
                      <span className='whitespace-nowrap text-background'>Vårtilbud</span>
                    </BrandBadge>
                  </div>

                  <div
                    className='launch-motion-item'
                    style={launchMotionStyle({
                      delay: 1080,
                      duration: 1500,
                      hiddenTransform: 'translate3d(0, -0.3rem, 0)'
                    })}
                  >
                    <BrandBadge
                      backgroundColor='var(--quet-tide-secondary-monochromatic)'
                      textColor='var(--background)'
                      className='max-w-full gap-2 border border-quet-tide-secondary-monochromatic/35 px-3 py-2 text-sm font-medium shadow-[0_14px_32px_-24px_color-mix(in_oklab,var(--quet-tide-secondary-monochromatic)_60%,transparent)]'
                    >
                      <BadgePercent className='size-4 shrink-0' />
                      <span className='whitespace-nowrap'>Spar {savingsAmount} kr</span>
                    </BrandBadge>
                  </div>
                </div>

                <p className='mb-4 text-lg font-bold leading-[1.08] text-foreground sm:text-2xl md:text-3xl xl:text-3xl'>
                  <span className='sr-only'>{kickerText}</span>

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
                <h2 className='mb-7 max-w-3xl pb-2 text-[1.7rem] font-bold leading-[0.94] text-foreground min-[360px]:text-[1.8rem] sm:mb-8 sm:text-[2.5rem] md:text-5xl md:leading-[0.96] lg:text-6xl lg:leading-[0.94]'>
                  <span
                    className='launch-motion-item block whitespace-nowrap overflow-visible'
                    style={launchMotionStyle({
                      delay: 3000,
                      duration: 2000,
                      hiddenTransform: 'translate3d(0, 0.32em, 0)',
                      hiddenFilter: 'blur(0.3px)'
                    })}
                  >
                    <span>{productName}</span>
                  </span>

                  <span
                    className='launch-motion-item block overflow-visible'
                    style={launchMotionStyle({
                      delay: 3300,
                      duration: 2000,
                      hiddenTransform: 'translate3d(0, 0.32em, 0)',
                      hiddenFilter: 'blur(0.3px)'
                    })}
                  >
                    er ikke det
                  </span>
                </h2>

                <div className='mb-8 w-full space-y-3 text-background sm:space-y-4'>
                  {newProductFeatures.map((feature, index) => (
                    <div
                      key={feature.title}
                      className='launch-motion-item'
                      style={launchMotionStyle({
                        delay: 4200 + index * 360,
                        duration: 1800,
                        hiddenTransform: 'translate3d(0, 0.5rem, 0)'
                      })}
                    >
                      <FeatureCard feature={feature} />
                    </div>
                  ))}
                </div>

                <div
                  className='launch-motion-item w-full'
                  style={launchMotionStyle({
                    delay: 5800,
                    duration: 2000,
                    hiddenTransform: 'translate3d(0, 0.5rem, 0)'
                  })}
                >
                  <div className='flex w-full flex-col gap-6 border-t border-cloud-dancer/12 pt-6'>
                    <div className='flex flex-col gap-3'>
                      <div className='flex flex-wrap items-baseline gap-3'>
                        <p className='text-4xl font-bold leading-none tracking-[-0.01em] text-foreground sm:text-5xl lg:text-6xl'>
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
                          backgroundColor='var(--checkout-button)'
                          textColor='var(--background)'
                          className='group min-h-12 w-full justify-center px-6 py-3 text-base font-semibold tracking-[-0.01em] shadow-[0_18px_38px_-28px_color-mix(in_oklab,var(--checkout-button)_78%,transparent)]'
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
                          backgroundColor='var(--checkout-secondary)'
                          textColor='var(--background)'
                          className='group min-h-12 w-full justify-center border border-checkout-secondary/45 px-6 py-3 text-base tracking-[-0.01em]'
                        >
                          <Link
                            href={productUrl}
                            onClick={onDiscoverClick}
                            data-track='NewProductLaunchDiscoverClick'
                            aria-label={`Oppdag ${productModelName}`}
                            className='font-utekos-text-medium'
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
      </article>
    )
  }
)

NewProductLaunchSectionView.displayName = 'NewProductLaunchSectionView'
