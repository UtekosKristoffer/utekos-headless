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
  Sparkles,
  Store,
  ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils/className'
import { VippsLogo } from '@/components/payments/VippsLogo'
import { KlarnaLogo } from '@/components/payments/KlarnaLogo'
import { PostNordLogo } from '@/components/payments/PostNordLogo'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { PRODUCT_VARIANTS } from '@/api/constants'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
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
  }
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusted-peri focus-visible:ring-offset-2 focus-visible:ring-offset-cloud-dancer'

const maritimePanelClass =
  'rounded-3xl border border-cloud-dancer/15 bg-maritime-blue p-5 text-cloud-dancer shadow-sm'

const maritimePanelHeaderClass =
  'mb-3 flex items-center gap-2 border-b border-cloud-dancer/15 pb-3'

export function PurchaseClientViewLanding({
  selectedModel,
  setSelectedModel,
  quantity,
  setQuantity,
  selectedColorIndex,
  setSelectedColorIndex,
  selectedSize,
  setSelectedSize,
  handleAddToCart,
  handleGoToCheckout,
  isPending,
  currentConfig,
  isTechDownOffer
}: PurchaseClientViewProps) {
  const monthlyPrice = Math.round(currentConfig.price / 12)
  const guidance = SIZE_GUIDANCE[selectedSize]

  return (
    <section className='relative w-full max-w-full overflow-x-clip text-cloud-dancer min-[900px]:grid min-[900px]:grid-cols-2'>
      {/* LEFT: sticky image column — frame centered with object-cover (no letterboxing) */}
      <div className='relative flex w-full flex-col items-center justify-center bg-maritime-darkest min-[900px]:sticky min-[900px]:top-0 min-[900px]:h-[100svh] min-[900px]:self-start min-[900px]:p-8 min-[1280px]:p-12'>
        <BrandBadge
          key={`badge-${selectedModel}`}
          backgroundColor='var(--color-bleached-mauve)'
          textColor='var(--color-maritime-darkest)'
          className='absolute left-4 top-4 z-20 animate-in gap-2 px-4 py-1.5 text-xs font-semibold tracking-normal shadow-md fade-in slide-in-from-left-2 duration-500 min-[900px]:left-8 min-[900px]:top-8 min-[1280px]:left-12 min-[1280px]:top-12'
        >
          <span className='relative flex h-2 w-2'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-maritime-darkest opacity-60' />
            <span className='relative inline-flex h-2 w-2 rounded-full bg-maritime-darkest' />
          </span>
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
                <div className='relative h-full w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-maritime-darkest/10 min-[900px]:rounded-2xl'>
                  <Image
                    src={src}
                    alt={`${currentConfig.title} – bilde ${i + 1}`}
                    fill
                    className='object-cover'
                    priority={i === 0}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    sizes='(max-width: 900px) 100vw, 40vw'
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

      {/* RIGHT: content column — no internal scroll, page-level scroll only */}
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
                className={cn(
                  'flex h-auto w-full flex-wrap gap-2 p-2 md:w-fit',
                  maritimePanelClass
                )}
              >
                {(Object.keys(PRODUCT_VARIANTS) as ModelKey[]).map(key => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className={cn(
                      'h-auto flex-1 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold tracking-normal transition-all duration-300 data-[state=active]:bg-cloud-dancer data-[state=active]:text-maritime-darkest data-[state=active]:shadow-md data-[state=inactive]:bg-maritime-darkest/25 data-[state=inactive]:text-cloud-dancer data-[state=inactive]:hover:bg-cloud-dancer/12 md:flex-none md:text-base',
                      focusRing
                    )}
                  >
                    {PRODUCT_VARIANTS[key].title.replace('Utekos ', '')}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Hero block — no AnimatedBlock wrappers; this is LCP-critical */}
          <div key={`hero-${selectedModel}`} className='mb-12'>
            <h2 className='mb-4 font-google-sans text-4xl font-semibold leading-[1.1] tracking-tight text-maritime-darkest min-[1280px]:text-7xl'>
              {currentConfig.title}
            </h2>
            <p className='mb-8 text-xl font-light text-maritime-darkest'>
              {currentConfig.subtitle}
            </p>
            <div className='flex flex-wrap items-center gap-4 min-[1280px]:gap-8'>
              <span className='text-3xl font-medium text-maritime-darkest min-[1280px]:text-4xl'>
                {currentConfig.price},-
              </span>
              <BrandBadge
                asChild
                backgroundColor='var(--color-klarna-pink)'
                textColor='var(--color-maritime-darkest)'
                className='gap-2 rounded-full px-4 py-2 text-sm font-semibold tracking-normal shadow-sm ring-1 ring-maritime-darkest/10'
              >
                <div>
                  <span className='text-sm font-medium text-maritime-darkest'>
                    Eller {monthlyPrice},- /mnd
                  </span>
                  <KlarnaLogo className='h-6 w-fit rounded-full border border-maritime-darkest/20 p-1' />
                </div>
              </BrandBadge>
            </div>
            {isTechDownOffer && (
              <div className='mt-8 flex items-center gap-4 rounded-lg border-2 border-mountain-view/20 bg-gradient-to-br from-mountain-view/5 to-transparent p-4 shadow-sm'>
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mountain-view/10'>
                  <Gift className='h-5 w-5 text-mountain-view' />
                </div>
                <div>
                  <h3 className='font-semibold text-mountain-view'>
                    Vårtilbud
                  </h3>
                  <p className='text-sm text-mountain-view'>
                    10% rabatt + Gratis Buff™ (verdi 249,-) legges til i
                    kurven.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div
            key={`details-${selectedModel}`}
            className='mb-12 space-y-8'
            aria-label='Produktinformasjon'
          >
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
              <div className='-mx-1 flex flex-nowrap items-center gap-x-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-x-3'>
                {currentConfig.features.map((feature, index) => {
                  const palette = [
                    'var(--color-ancient-water)',
                    'var(--color-bleached-mauve)',
                    'var(--color-dusted-peri)'
                  ]
                  const bg = palette[index % palette.length]!
                  return (
                    <BrandBadge
                      key={feature}
                      backgroundColor={bg}
                      textColor='var(--color-maritime-darkest)'
                      className='gap-1.5 px-3 py-1.5 text-[11px] font-medium tracking-normal sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-sm'
                    >
                      <span
                        aria-hidden
                        className='h-1.5 w-1.5 shrink-0 rounded-full bg-maritime-darkest sm:h-2 sm:w-2'
                      />
                      <span className='whitespace-nowrap'>{feature}</span>
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
                <div
                  className={cn(maritimePanelHeaderClass, 'justify-between')}
                >
                  <span className='text-[11px] font-bold uppercase tracking-wider text-cloud-dancer/70'>
                    Hva gjør {currentConfig.title.replace('Utekos ', '')}{' '}
                    spesiell
                  </span>
                  <Sparkles className='size-4 text-cloud-dancer' aria-hidden />
                </div>
                <Accordion
                  key={`highlights-${selectedModel}`}
                  type='single'
                  collapsible
                  className='w-full'
                >
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
                <span className='text-sm font-bold tracking-widest text-maritime-darkest'>
                  Størrelse
                </span>
                <Link
                  href='/handlehjelp/storrelsesguide'
                  data-track='SizeGuideSkreddersyVarmen'
                  className='text-sm text-maritime-darkest underline transition-colors hover:text-maritime-blue'
                >
                  Se størrelsesguide
                </Link>
              </div>
              <div
                className='flex flex-wrap gap-2 md:gap-3'
                role='radiogroup'
                aria-label='Velg størrelse'
              >
                {currentConfig.sizes
                  .filter(
                    size => !(selectedModel === 'techdown' && size === 'Liten')
                  )
                  .map(size => {
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
                          'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium tracking-normal whitespace-nowrap transition-all md:px-6 md:py-3 md:text-base',
                          isActive ?
                            'border border-maritime-darkest bg-dusted-peri text-maritime-darkest shadow-md'
                          : 'border-0 bg-ancient-water text-maritime-darkest hover:brightness-95',
                          focusRing
                        )}
                      >
                        {size}
                      </button>
                    )
                  })}
              </div>

              <div
                className='mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs'
                role='radiogroup'
                aria-label='Velg farge'
              >
                <span className='tracking-wider text-maritime-darkest'>
                  Farge
                </span>
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
                      onClick={() =>
                        isInteractive && setSelectedColorIndex(index)
                      }
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full transition',
                        isInteractive && 'hover:opacity-80',
                        !isInteractive && 'cursor-default',
                        focusRing
                      )}
                    >
                      <span
                        className={cn(
                          'size-4 rounded-full border border-black/15',
                          isActive
                            && isInteractive
                            && 'ring-1 ring-dusted-peri ring-offset-1 ring-offset-white',
                          !isActive && isInteractive && 'opacity-60'
                        )}
                        style={{ backgroundColor: colorObj.hex }}
                      />
                      {isActive && (
                        <span className='font-medium text-maritime-darkest'>
                          {colorObj.name}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {guidance && (
                <div
                  key={selectedSize}
                  className='mt-6 animate-in fade-in slide-in-from-top-2 duration-300'
                >
                  <div
                    className={cn(
                      maritimePanelClass,
                      'relative overflow-hidden'
                    )}
                  >
                    <div className={maritimePanelHeaderClass}>
                      <Ruler className='h-4 w-4 text-dusted-peri' />
                      <span className='text-sm font-bold tracking-wider text-cloud-dancer'>
                        Passer best for deg som er {guidance.height}
                      </span>
                    </div>
                    <ul className='space-y-2'>
                      {guidance.tips.map((tip, i) => (
                        <li
                          key={i}
                          className='flex items-start gap-2.5 text-sm leading-[1.45] text-cloud-dancer'
                        >
                          <div className='mt-1.5 size-1 shrink-0 rounded-full bg-dusted-peri' />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div
                className={cn(
                  maritimePanelClass,
                  'mt-6 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between'
                )}
              >
                <div className='space-y-1'>
                  <p className='text-xs font-bold uppercase tracking-[0.24em] text-cloud-dancer/70'>
                    Antall
                  </p>
                </div>
                <div className='flex h-14 items-center self-start rounded-full border border-cloud-dancer/25 bg-maritime-darkest/30 text-cloud-dancer sm:self-auto'>
                  <button
                    type='button'
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={cn(
                      'flex h-full w-14 items-center justify-center text-cloud-dancer transition-colors hover:bg-cloud-dancer/10 sm:w-16',
                      focusRing
                    )}
                    aria-label='Reduser antall'
                  >
                    <Minus size={20} />
                  </button>
                  <span
                    className='w-12 text-center text-lg font-medium tabular-nums text-cloud-dancer sm:w-14 sm:text-xl'
                    aria-live='polite'
                    aria-atomic='true'
                  >
                    {quantity}
                  </span>
                  <button
                    type='button'
                    onClick={() => setQuantity(quantity + 1)}
                    className={cn(
                      'flex h-full w-14 items-center justify-center text-cloud-dancer transition-colors hover:bg-cloud-dancer/10 sm:w-16',
                      focusRing
                    )}
                    aria-label='Øk antall'
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA footer — flows naturally at the bottom of the right column */}
        <div className='border-t border-cloud-dancer/10 bg-maritime-blue p-6 text-cloud-dancer md:p-12 min-[900px]:p-8 min-[1280px]:p-12'>
          <div className='mb-6 grid grid-cols-2 gap-3 md:gap-4'>
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
                onClick={handleGoToCheckout}
                data-track='SkreddersyVarmenGoToCheckoutClick'
                disabled={isPending}
                aria-busy={isPending}
                className={cn(
                  'flex w-full min-w-0 items-center justify-center gap-2 text-center',
                  focusRing
                )}
              >
                {isPending ?
                  <>
                    <Loader2 className='h-5 w-5 animate-spin' />
                    <span className='whitespace-nowrap'>Behandler...</span>
                  </>
                : <>
                    <span className='whitespace-nowrap'>Gå til kassen</span>
                    <ArrowRight className='h-4 w-4 shrink-0' />
                  </>
                }
              </button>
            </BrandBadge>
            <BrandBadge
              asChild
              backgroundColor='var(--color-cloud-dancer)'
              textColor='var(--color-maritime-darkest)'
              className={cn(
                'h-14 w-full min-w-0 px-4 py-0 text-sm font-semibold tracking-normal shadow-xl transition-[transform,filter,box-shadow] hover:brightness-95 active:scale-[0.985] sm:text-base md:h-16 md:px-6 md:text-lg',
                isPending && 'cursor-not-allowed opacity-80'
              )}
            >
              <button
                type='button'
                onClick={handleAddToCart}
                data-track='🔔🛒 AddToCartSkreddersyVarmen 🛒🔔'
                disabled={isPending}
                aria-busy={isPending}
                className={cn(
                  'flex w-full min-w-0 items-center justify-center gap-2 text-center',
                  focusRing
                )}
              >
                {isPending ?
                  <>
                    <Loader2 className='h-5 w-5 animate-spin' />
                    <span className='whitespace-nowrap'>Legger til...</span>
                  </>
                : <>
                    <span className='whitespace-nowrap'>Legg i kurv</span>
                  </>
                }
              </button>
            </BrandBadge>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='flex items-center gap-8 md:gap-10'>
              <VippsLogo className='h-8 w-auto md:h-10' />
              <KlarnaLogo className='h-8 w-auto md:h-10' />
              <PostNordLogo className='mt-1 h-6 w-auto md:h-8' />
            </div>

            <div className='rounded-lg border border-cloud-dancer/15 bg-maritime-blue text-cloud-dancer'>
              <div className='grid grid-cols-1 divide-y divide-cloud-dancer/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0'>
                <div className='flex items-start gap-3 p-4'>
                  <Truck
                    size={22}
                    className='mt-0.5 shrink-0 text-primary-button'
                  />
                  <div className='min-w-0'>
                    <p className='text-sm font-semibold text-cloud-dancer'>
                      Rask levering 2–5 dager
                    </p>
                    <p className='mt-0.5 text-xs leading-snug text-cloud-dancer/75'>
                      Sendes samme dag (ikke søndag). Fri frakt fra 999,-.
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3 p-4'>
                  <RefreshCcw
                    size={22}
                    className='mt-0.5 shrink-0 text-primary-button'
                  />
                  <div className='min-w-0'>
                    <p className='text-sm font-semibold text-cloud-dancer'>
                      14 dagers åpent kjøp
                    </p>
                    <p className='mt-0.5 text-xs leading-snug text-cloud-dancer/75'>
                      Send tilbake uten spørsmål.
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3 p-4'>
                  <Store
                    size={22}
                    className='mt-0.5 shrink-0 text-primary-button'
                  />
                  <div className='min-w-0'>
                    <p className='text-sm font-semibold text-cloud-dancer'>
                      På lager i Bergen
                    </p>
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
                  <ArrowRight
                    size={12}
                    className='transition-transform group-hover:translate-x-0.5'
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
