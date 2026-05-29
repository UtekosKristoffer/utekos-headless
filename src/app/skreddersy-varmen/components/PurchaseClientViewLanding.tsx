// Path: src/app/skreddersy-varmen/components/PurchaseClientViewLanding.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import Fade from 'embla-carousel-fade'
import {
  Minus,
  Plus,
  Truck,
  RefreshCcw,
  Loader2,
  Gift,
  Ruler,
  Store,
  ShoppingCart,
  ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils/className'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
import { PRODUCT_VARIANTS } from '@/api/constants'
import { ProductDetailsAccordion } from './ProductDetailsAccordion'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { ModelKey } from 'types/product/ProductTypes'
import type { PurchaseClientViewProps } from 'types/product/PageProps'

const SIZE_GUIDANCE: Record<string, { height: string; tips: string[] }> = {
  'Liten': {
    height: 'Opptil 170 cm',
    tips: [
      'Er du lavere enn 165 cm får du en romslig og lun følelse.',
      'Er du litt høyere får du en nettere silhuett uten overflødig volum.'
    ]
  },
  'Middels': {
    height: '170 – 180 cm',
    tips: [
      'Er du lavere enn 170 cm får du en romslig passform.',
      'Ligger du i øvre sjiktet (mot 180 cm) får du en mer kroppsnær passform.'
    ]
  },
  'Stor': {
    height: '180 – 195 cm',
    tips: [
      'Perfekt for deg over 180 cm, eller for deg som er lavere og ønsker romslighet.',
      'Er du over 195 cm anbefaler vi heller størrelsen Ekstra stor.'
    ]
  },
  'Ekstra stor': {
    height: '190 cm og oppover',
    tips: [
      'Skreddersydd for deg over 190 cm – ekstra lengde i kroppen og ermene.',
      'Også et godt valg for deg som er lavere, men ønsker maksimal romslighet og lengde.'
    ]
  },
  'Medium': {
    height: 'Opptil ca. 175 cm',
    tips: [
      'Et godt valg for deg som ønsker lett varme med normal romslighet.',
      'Velg Large hvis du ønsker mer plass til ekstra lag under.'
    ]
  },
  'Large': {
    height: 'Fra ca. 175 cm og oppover',
    tips: [
      'Gir ekstra romslighet og mer dekning.',
      'Passer også lavere brukere som ønsker en mer generøs følelse.'
    ]
  }
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-button focus-visible:ring-2 focus-visible:ring-maritime-darkest'

const maritimePanelClass =
  'rounded-3xl border border-cloud-dancer/15 bg-havdyp p-5 text-cloud-dancer shadow-sm'

const maritimePanelHeaderClass = 'mb-3 border-b border-cloud-dancer/15 pb-3'

const choiceGridClass = 'grid grid-cols-3 gap-2 sm:gap-3'

const choicePillClass =
  'inline-flex min-h-12 min-w-0 items-center justify-center rounded-full px-1.5 py-2 text-center text-[11px] font-semibold leading-[1.15] tracking-normal transition-all sm:px-4 sm:text-sm md:text-base'

function getModelName(title: string): string {
  return title.replace('Utekos ', '')
}

function KlarnaCheckoutImage({ className }: { className?: string }) {
  return (
    <picture className={cn('block min-w-0 justify-self-end', className)}>
      <source
        media='(min-width: 1536px)'
        srcSet='/klarna/Choose%20Klarna%20at%20checkout/White%20%28secondary%29/970x90%20-%20Left.png'
      />
      <source
        media='(min-width: 900px)'
        srcSet='/klarna/Choose%20Klarna%20at%20checkout/White%20%28secondary%29/728x90%20-%20Left.png'
      />
      <source
        media='(min-width: 640px)'
        srcSet='/klarna/Choose%20Klarna%20at%20checkout/White%20%28secondary%29/728x90%20-%20Center.png'
      />
      <img
        src='/klarna/Choose%20Klarna%20at%20checkout/White%20%28secondary%29/320x50.png'
        alt='Velg Klarna i kassen'
        width={320}
        height={50}
        className='ml-auto block h-auto w-full max-w-[20rem] sm:max-w-[28rem] min-[1536px]:max-w-[30rem]'
      />
    </picture>
  )
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
}: PurchaseClientViewProps) {
  const guidance = SIZE_GUIDANCE[selectedSize]
  const modelName = getModelName(currentConfig.title)
  const visibleSizes = selectableSizes ?? currentConfig.sizes

  return (
    <>
      <section className='relative w-full max-w-full overflow-x-clip text-cloud-dancer min-[900px]:grid min-[900px]:grid-cols-2'>
        <div className='relative flex w-full flex-col items-center justify-center bg-maritime-darkest min-[900px]:sticky min-[900px]:top-0 min-[900px]:h-[100svh] min-[900px]:self-start min-[900px]:p-8 min-[1280px]:p-12'>
          <BrandBadge
            key={`badge-${selectedModel}`}
            backgroundColor='var(--color-bleached-mauve)'
            textColor='var(--color-maritime-darkest)'
            className='absolute left-4 top-4 z-20 animate-in px-4 py-1.5 text-xs font-semibold tracking-normal shadow-md fade-in slide-in-from-left-2 duration-500 min-[900px]:left-8 min-[900px]:top-8 min-[1280px]:left-12 min-[1280px]:top-12'
          >
            <span className='whitespace-nowrap'>{currentConfig.badge}</span>
          </BrandBadge>

          <Carousel
            key={selectedModel}
            opts={{ loop: currentConfig.images.length > 1, duration: 35 }}
            plugins={currentConfig.images.length > 1 ? [Fade()] : []}
            className='relative w-full min-[900px]:max-w-xl'
          >
            <CarouselContent className='ml-0'>
              {currentConfig.images.map((src, i) => (
                <CarouselItem key={src} className='relative aspect-[4/5] pl-0'>
                  <div className='relative h-full w-full overflow-hidden min-[900px]:rounded-2xl min-[900px]:shadow-2xl min-[900px]:ring-1 min-[900px]:ring-maritime-darkest/10'>
                    <Image
                      src={src}
                      alt={`${currentConfig.title} – bilde ${i + 1}`}
                      fill
                      className='object-cover'
                      sizes='(max-width: 900px) 100vw, 40vw'
                      priority={i === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {currentConfig.images.length > 1 && (
              <>
                <CarouselPrevious
                  aria-label='Forrige bilde'
                  className={cn(
                    'left-2 size-10 border-maritime-darkest/15 bg-cloud-dancer/90 text-maritime-darkest shadow-md backdrop-blur-md hover:bg-cloud-dancer hover:text-primary-button md:left-4 md:size-11',
                    focusRing
                  )}
                />
                <CarouselNext
                  aria-label='Neste bilde'
                  className={cn(
                    'right-2 size-10 border-maritime-darkest/15 bg-cloud-dancer/90 text-maritime-darkest shadow-md backdrop-blur-md hover:bg-cloud-dancer hover:text-primary-button md:right-4 md:size-11',
                    focusRing
                  )}
                />
              </>
            )}
          </Carousel>
        </div>

        <div className='flex w-full flex-col bg-overcast'>
          <div className='flex-1 p-6 md:p-12 min-[1280px]:p-20'>
            <div className='mb-12'>
              <Tabs
                value={selectedModel}
                onValueChange={v => setSelectedModel(v as ModelKey)}
                className='w-full md:w-fit'
              >
                <TabsList
                  aria-label='Velg modell'
                  className='flex h-auto w-full flex-wrap gap-2 rounded-none bg-transparent p-0 shadow-none md:w-fit'
                >
                  {(Object.keys(PRODUCT_VARIANTS) as ModelKey[]).map(key => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className={cn(
                        'h-auto flex-1 whitespace-nowrap rounded-full border border-maritime-darkest/18 bg-transparent px-6 py-3 text-sm font-semibold tracking-normal text-maritime-darkest transition-all duration-300 data-[state=active]:border-maritime-darkest data-[state=active]:bg-maritime-darkest data-[state=active]:text-cloud-dancer data-[state=active]:shadow-sm data-[state=inactive]:hover:bg-ancient-water/55 md:flex-none md:text-base',
                        focusRing
                      )}
                    >
                      {PRODUCT_VARIANTS[key].title.replace('Utekos ', '')}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

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

            <div className='flex flex-col gap-6'>
              <div className='rounded-lg border border-cloud-dancer/15 bg-havdyp text-cloud-dancer'>
                <div className='grid grid-cols-1 divide-y divide-cloud-dancer/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0'>
                  <div className='flex items-start gap-3 p-4'>
                    <Truck size={22} className='mt-0.5 shrink-0 text-primary-button' />
                    <div className='min-w-0'>
                      <p className='text-sm font-semibold text-cloud-dancer'>Rask levering 2–5 dager</p>
                      <p className='mt-0.5 text-xs leading-snug text-cloud-dancer/75'>
                        Sendes samme dag. Fri frakt på denne varen.
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3 p-4'>
                    <RefreshCcw size={22} className='mt-0.5 shrink-0 text-primary-button' />
                    <div className='min-w-0'>
                      <p className='text-sm font-semibold text-cloud-dancer'>14 dagers åpent kjøp</p>
                      <p className='mt-0.5 text-xs leading-snug text-cloud-dancer/75'>
                        Rolig returfrist når varen er ubrukt.
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3 p-4'>
                    <Store size={22} className='mt-0.5 shrink-0 text-primary-button' />
                    <div className='min-w-0'>
                      <p className='text-sm font-semibold text-cloud-dancer'>På lager i Bergen</p>
                      <p className='mt-0.5 text-xs leading-snug text-cloud-dancer/75'>
                        Også via Intersport. Norsk garanti.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='border-t border-cloud-dancer/15 px-4 py-2.5'>
                  <Link
                    href='/frakt-og-retur'
                    data-track='SkreddersyVarmenFraktOgReturLink'
                    className='group inline-flex items-center gap-1.5 text-xs font-medium text-cloud-dancer/80 transition-colors hover:text-primary-button'
                  >
                    Alt om frakt og retur
                    <ArrowRight size={12} className='transition-transform group-hover:translate-x-0.5' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductDetailsAccordion selectedModel={selectedModel} />
    </>
  )
}
