// Path: src/app/skreddersy-varmen/components/PurchaseClientViewLanding.tsx
'use client'

import Link from 'next/link'
import { Minus, Plus, Loader2, Gift, Ruler, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils/className'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
import { ProductDetailsAccordion } from './ProductDetailsAccordion'
import { LandingPageProductCarouselPurchaseSection } from './LandingPageProductCarouselPurchaseSection'
import { KlarnaCheckoutImage } from './KlarnaCheckoutImage'
import {
  SIZE_GUIDANCE,
  focusRing,
  maritimePanelClass,
  maritimePanelHeaderClass,
  choiceGridClass,
  choicePillClass
} from '../utils/constants'
import { LandingPageVariantSelector } from './LandingPageVariantSelector'
import { getModelName } from '@/app/skreddersy-varmen/utils/getModelName'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { ShippingAndReturnComponent } from './ShippingAndReturnComponent'
import type { ModelKey, PRODUCT_VARIANTS } from '@/api/constants'

export type PurchaseClientViewLandingProps = {
  selectedModel: ModelKey
  setSelectedModel: (model: ModelKey) => void
  quantity: number
  setQuantity: (qty: number) => void
  selectedColorIndex: number
  setSelectedColorIndex: (index: number) => void
  selectedSize: string
  setSelectedSize: (size: string) => void
  selectableSizes: string[]
  handleAddToCart: () => void
  isPending: boolean
  currentConfig: (typeof PRODUCT_VARIANTS)[ModelKey]
  isTechDownOffer: boolean
}

export function PurchaseClientViewLanding({
  selectedModel,
  setSelectedModel,
  quantity,
  setQuantity,
  selectedColorIndex,
  setSelectedColorIndex,
  selectedSize,
  setSelectedSize,
  selectableSizes,
  handleAddToCart,
  isPending,
  currentConfig,
  isTechDownOffer
}: PurchaseClientViewLandingProps) {
  const guidance = SIZE_GUIDANCE[selectedSize]
  const modelName = getModelName(currentConfig.title)
  const visibleSizes = selectableSizes ?? currentConfig.sizes

  return (
    <>
      <article className='relative w-full max-w-full overflow-x-clip text-cloud-dancer min-[900px]:grid min-[900px]:grid-cols-2'>
        <LandingPageProductCarouselPurchaseSection
          selectedModel={selectedModel}
          currentConfig={currentConfig}
        />

        <div className='flex w-full flex-col bg-overcast'>
          <div className='flex-1 p-6 md:p-12 min-[1280px]:p-20'>
            <LandingPageVariantSelector
              selectedModel={selectedModel}
              setSelectedModel={(model: ModelKey) => setSelectedModel(model as ModelKey)}
            />
            <div key={`hero-${selectedModel}`} className='mb-12'>
              <h2 className='mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-google-sans text-4xl font-bold leading-[0.95] tracking-[-0.01em] text-maritime-darkest min-[1280px]:text-7xl'>
                <span className='sr-only'>Utekos </span>
                <UtekosWordmark
                  aria-hidden
                  className='h-[0.82em] w-auto translate-y-[0.04em] text-maritime-darkest'
                  style={{ color: 'var(--color-maritime-darkest)' }}
                />
                <span className='font-google-sans font-bold tracking-[-0.015em]'>{modelName}</span>
              </h2>

              <p className='mb-8 max-w-[38rem] text-lg leading-[1.45] tracking-normal text-maritime-darkest/88 md:text-xl'>
                {currentConfig.subtitle}
              </p>

              <div className='grid w-full max-w-none grid-cols-[auto_minmax(0,1fr)] items-center gap-4 sm:gap-5 min-[900px]:max-w-[38rem]'>
                <span className='shrink-0 text-3xl font-medium text-maritime-darkest min-[1280px]:text-4xl'>
                  {currentConfig.price},-
                </span>
                <KlarnaCheckoutImage className='w-full' />
              </div>

              {isTechDownOffer && (
                <div className='mt-8 flex items-center gap-4 rounded-lg border border-mountain-view/24 bg-cloud-dancer p-4 shadow-sm'>
                  <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-mountain-view/12'>
                    <Gift className='size-5 text-mountain-view' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-mountain-view'>Vårtilbud</h3>
                    <p className='text-sm text-mountain-view'>
                      10% rabatt + Gratis Buff™ (verdi 249,-) legges til i kurven.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div key={`details-${selectedModel}`} className='mb-12 space-y-8' aria-label='Produktinformasjon'>
              <AnimatedBlock
                className='will-animate-fade-in-up'
                delay='0.05s'
                rootMargin='0px 0px 25% 0px'
                threshold={0.01}
              >
                <p className='text-base leading-[1.45] text-maritime-darkest/85 md:text-lg'>
                  {currentConfig.description}
                </p>
              </AnimatedBlock>

              <AnimatedBlock
                className='will-animate-fade-in-up'
                delay='0.1s'
                rootMargin='0px 0px 25% 0px'
                threshold={0.01}
              >
                <div className={choiceGridClass}>
                  {currentConfig.features.map((feature, index) => {
                    const palette = [
                      'var(--color-ancient-water)',
                      'var(--color-bleached-mauve)',
                      'var(--color-cloud-dancer)'
                    ]
                    const bg = palette[index % palette.length]!

                    return (
                      <BrandBadge
                        key={feature}
                        backgroundColor={bg}
                        textColor='var(--color-maritime-darkest)'
                        className={cn(choicePillClass, 'shadow-sm')}
                      >
                        <span>{feature}</span>
                      </BrandBadge>
                    )
                  })}
                </div>
              </AnimatedBlock>

              <AnimatedBlock
                className='will-animate-fade-in-up'
                delay='0.15s'
                rootMargin='0px 0px 25% 0px'
                threshold={0.01}
              >
                <div className={cn(maritimePanelClass, 'px-5')}>
                  <div className={maritimePanelHeaderClass}>
                    <span className='text-xs font-semibold tracking-[0.02em] text-cloud-dancer/82'>
                      Dette gjør {modelName} spesiell
                    </span>
                  </div>

                  <Accordion key={`highlights-${selectedModel}`} type='single' collapsible className='w-full'>
                    {currentConfig.highlights.map(highlight => (
                      <AccordionItem
                        key={highlight.title}
                        value={highlight.title}
                        className='border-b border-cloud-dancer/15 last:border-b-0'
                      >
                        <AccordionTrigger className='py-3 text-left text-sm font-semibold text-cloud-dancer hover:text-primary-button hover:no-underline'>
                          {highlight.title}
                        </AccordionTrigger>
                        <AccordionContent className='pb-3 pt-0 text-sm leading-[1.45] text-cloud-dancer/80'>
                          {highlight.body}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </AnimatedBlock>
            </div>

            <div className='mb-12 h-px w-full bg-maritime-darkest' />

            <div className='mb-12 space-y-12'>
              <div>
                <div className='mb-4 flex items-center justify-between'>
                  <span className='text-sm font-bold tracking-normal text-maritime-darkest'>Størrelse</span>
                  <Link
                    href='/handlehjelp/storrelsesguide'
                    data-track='SizeGuideSkreddersyVarmen'
                    className='text-sm text-maritime-darkest underline transition-colors hover:text-havdyp'
                  >
                    Se størrelsesguide
                  </Link>
                </div>

                <div className={choiceGridClass} role='radiogroup' aria-label='Velg størrelse'>
                  {visibleSizes.map(size => {
                    const isActive = selectedSize === size

                    return (
                      <button
                        key={size}
                        type='button'
                        role='radio'
                        aria-checked={isActive}
                        aria-label={`Størrelse ${size}`}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          choicePillClass,
                          isActive ?
                            'border border-maritime-darkest bg-maritime-darkest text-cloud-dancer shadow-md'
                          : 'border-0 bg-ancient-water text-maritime-darkest hover:brightness-95',
                          focusRing
                        )}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>

                {guidance && (
                  <div
                    key={selectedSize}
                    className='mt-3 animate-in fade-in slide-in-from-top-2 duration-300'
                  >
                    <div className='relative overflow-hidden rounded-2xl border border-cloud-dancer/15 bg-havdyp p-4 text-cloud-dancer shadow-sm'>
                      <div className='mb-2 flex items-center gap-2 border-b border-cloud-dancer/15 pb-2'>
                        <Ruler className='size-4 text-dusted-peri' />
                        <span className='text-sm font-bold tracking-normal text-cloud-dancer'>
                          Passer best for deg som er {guidance.height}
                        </span>
                      </div>
                      <ul className='space-y-1.5'>
                        {guidance.tips.map((tip, i) => (
                          <li key={i} className='text-sm leading-[1.45] text-cloud-dancer'>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className='mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 border-t border-maritime-darkest/16 pt-4'>
                  <div className='min-w-0' role='radiogroup' aria-label='Velg farge'>
                    <span className='block text-xs font-semibold tracking-normal text-maritime-darkest/72'>
                      Farge
                    </span>

                    <div className='mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-2'>
                      {currentConfig.colors.map((colorObj, index) => {
                        const isActive = selectedColorIndex === index
                        const isInteractive = currentConfig.colors.length > 1

                        return (
                          <button
                            key={colorObj.name}
                            type='button'
                            role='radio'
                            aria-checked={isActive}
                            aria-label={`Farge ${colorObj.name}`}
                            onClick={() => isInteractive && setSelectedColorIndex(index)}
                            className={cn(
                              'inline-flex h-10 min-w-0 items-center justify-start gap-2 rounded-full border border-maritime-darkest/18 bg-ancient-water px-3 text-sm font-semibold text-maritime-darkest transition',
                              isInteractive && 'hover:brightness-95',
                              !isInteractive && 'cursor-default',
                              isActive && 'border-maritime-darkest shadow-sm',
                              focusRing
                            )}
                          >
                            <span
                              className='size-4 shrink-0 rounded-full border border-maritime-darkest/20'
                              style={{ backgroundColor: colorObj.hex }}
                            />
                            <span className='truncate'>{colorObj.name}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className='shrink-0'>
                    <span className='block text-xs font-semibold tracking-normal text-maritime-darkest/72'>
                      Antall
                    </span>

                    <div className='mt-1 flex h-10 items-center rounded-full border border-maritime-darkest/18 bg-ancient-water text-maritime-darkest'>
                      <button
                        type='button'
                        onClick={() => setQuantity(quantity - 1)}
                        className={cn(
                          'flex size-10 items-center justify-center rounded-l-full text-maritime-darkest transition-colors hover:bg-overcast/70',
                          focusRing
                        )}
                        aria-label='Reduser antall'
                      >
                        <Minus size={17} />
                      </button>

                      <span
                        className='w-9 text-center text-base font-semibold tabular-nums text-maritime-darkest'
                        aria-live='polite'
                        aria-atomic='true'
                      >
                        {quantity}
                      </span>

                      <button
                        type='button'
                        onClick={() => setQuantity(quantity + 1)}
                        className={cn(
                          'flex size-10 items-center justify-center rounded-r-full text-maritime-darkest transition-colors hover:bg-overcast/70',
                          focusRing
                        )}
                        aria-label='Øk antall'
                      >
                        <Plus size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='border-t border-cloud-dancer/10 bg-havdyp p-6 text-cloud-dancer md:p-12 min-[900px]:p-8 min-[1280px]:p-12'>
            <div className='mb-4 min-[900px]:mb-6 min-[1280px]:mb-8'>
              <BrandBadge
                asChild
                backgroundColor='var(--color-primary-button)'
                textColor='var(--color-maritime-darkest)'
                className={cn(
                  'h-14 w-full min-w-0 px-4 py-0 text-sm font-semibold tracking-normal shadow-xl transition-[transform,filter,box-shadow] hover:brightness-95 active:scale-[0.985] sm:text-base md:h-16 md:px-6 md:text-lg',
                  isPending && 'cursor-not-allowed opacity-80'
                )}
              >
                <button
                  type='button'
                  onClick={handleAddToCart}
                  data-track='SkreddersyVarmenAddToCartClick'
                  disabled={isPending}
                  aria-busy={isPending}
                  className={cn(
                    'flex w-full min-w-0 items-center justify-center gap-2 text-center',
                    focusRing
                  )}
                >
                  {isPending ?
                    <>
                      <Loader2 className='size-5 animate-spin' />
                      <span className='whitespace-nowrap'>Legger i handlekurv</span>
                    </>
                  : <>
                      <ShoppingCart className='size-4 shrink-0' />
                      <span className='whitespace-nowrap'>Legg i handlekurv</span>
                      <span className='hidden h-5 w-px bg-maritime-darkest/25 sm:block' />
                      <span className='hidden whitespace-nowrap font-medium sm:inline'>
                        {currentConfig.price * quantity},-
                      </span>
                    </>
                  }
                </button>
              </BrandBadge>
            </div>
            <ShippingAndReturnComponent />
          </div>
        </div>
      </article>

      <ProductDetailsAccordion selectedModel={selectedModel} />
    </>
  )
}
