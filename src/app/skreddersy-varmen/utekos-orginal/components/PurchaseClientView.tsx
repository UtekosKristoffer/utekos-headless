// Path: src/components/ProductCard/PurchaseClientView.tsx
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
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { ModelKey } from 'types/product/ProductTypes'
import type { PurchaseClientViewProps } from 'types/product/PageProps'

const SIZE_GUIDANCE: Record<string, { height: string; tips: string[] }> = {
  Liten: {
    height: 'Opptil 170 cm',
    tips: [
      'Er du lavere enn 165 cm får du en romslig og lun følelse.',
      'Er du litt høyere får du en nettere silhuett uten overflødig volum.'
    ]
  },
  Middels: {
    height: '170 – 180 cm',
    tips: [
      'Er du lavere enn 170 cm får du en romslig passform.',
      'Ligger du i øvre sjiktet (mot 180 cm) får du en mer kroppsnær passform.'
    ]
  },
  Stor: {
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

export function PurchaseClientView({
  selectedModel,
  setSelectedModel,
  quantity,
  setQuantity,
  selectedColorIndex,
  setSelectedColorIndex,
  selectedSize,
  setSelectedSize,
  handleAddToCart,
  isPending,
  currentConfig,
  currentColor,
  isTechDownOffer
}: PurchaseClientViewProps) {
  const monthlyPrice = Math.round(currentConfig.price / 12)
  const guidance = SIZE_GUIDANCE[selectedSize]

  return (
    <section className='relative left-[calc(-50vw+50%)] w-screen overflow-hidden bg-[#F9F8F6] text-[#2C2420] lg:flex lg:min-h-screen'>
      <div className='relative flex w-full flex-col items-center justify-center bg-[#EAE8E3] p-8 lg:sticky lg:top-0 lg:h-screen lg:w-1/2'>
        <div
          key={`badge-${selectedModel}`}
          className='absolute left-4 top-4 z-20 flex animate-in items-center gap-1.5 rounded-sm border border-[#2C2420]/10 bg-white/90 px-2.5 py-1 shadow-sm backdrop-blur-md fade-in slide-in-from-left-2 duration-500'
        >
          <span className='relative flex h-1.5 w-1.5'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E07A5F] opacity-60' />
            <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E07A5F]' />
          </span>
          <span className='text-[10px] font-bold uppercase tracking-wider text-[#2C2420]'>
            {currentConfig.badge}
          </span>
        </div>
        <Carousel
          key={selectedModel}
          opts={{ loop: currentConfig.images.length > 1, duration: 35 }}
          plugins={currentConfig.images.length > 1 ? [Fade()] : []}
          className='relative w-full max-w-2xl'
        >
          <CarouselContent className='ml-0'>
            {currentConfig.images.map((src, i) => (
              <CarouselItem
                key={src}
                className='relative h-[50vh] pl-0 lg:h-[70vh]'
              >
                <div className='relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-b from-white/70 to-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] ring-1 ring-[#2C2420]/10'>
                  <Image
                    src={src}
                    alt={`${currentConfig.title} – bilde ${i + 1}`}
                    fill
                    className='object-contain drop-shadow-2xl transition-transform duration-[1200ms] ease-out hover:scale-[1.02]'
                    priority={i === 0}
                    sizes='(max-width: 1024px) 100vw, 50vw'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {currentConfig.images.length > 1 && (
            <>
              <CarouselPrevious
                aria-label='Forrige bilde'
                className='left-2 size-10 border-[#2C2420]/15 bg-white/90 text-[#2C2420] shadow-md backdrop-blur-md hover:bg-white hover:text-[#E07A5F] md:left-4 md:size-11'
              />
              <CarouselNext
                aria-label='Neste bilde'
                className='right-2 size-10 border-[#2C2420]/15 bg-white/90 text-[#2C2420] shadow-md backdrop-blur-md hover:bg-white hover:text-[#E07A5F] md:right-4 md:size-11'
              />
            </>
          )}
        </Carousel>
        <p
          key={`caption-${selectedModel}`}
          className='mt-8 hidden animate-in font-serif text-base italic text-[#2C2420] fade-in duration-700 lg:block'
        >
          Modell vist: {currentConfig.title}
        </p>
      </div>

      <div className='flex w-full flex-col bg-white lg:w-1/2'>
        <div className='flex-1 p-6 md:p-12 lg:overflow-y-auto lg:p-24'>
          <AnimatedBlock
            className='mb-12 will-animate-fade-in-up'
            delay='0s'
            threshold={0.15}
          >
            <div
              role='tablist'
              aria-label='Velg modell'
              className='flex w-full flex-wrap gap-2 rounded-lg bg-[#F4F1EA] p-1.5 md:w-fit'
            >
              {(Object.keys(PRODUCT_VARIANTS) as ModelKey[]).map(key => (
                <button
                  key={key}
                  role='tab'
                  aria-selected={selectedModel === key}
                  onClick={() => setSelectedModel(key)}
                  className={cn(
                    'flex-1 whitespace-nowrap rounded-md px-6 py-3 text-base font-medium transition-all duration-300 md:flex-none',
                    selectedModel === key ?
                      'scale-100 bg-white text-[#2C2420] shadow-md ring-1 ring-black/5'
                    : 'text-[#2C2420] hover:scale-[1.02] hover:bg-white/60'
                  )}
                >
                  {PRODUCT_VARIANTS[key].title.replace('Utekos ', '')}
                </button>
              ))}
            </div>
          </AnimatedBlock>

          <div key={`hero-${selectedModel}`} className='mb-12'>
            <AnimatedBlock
              className='will-animate-fade-in-up'
              delay='0.05s'
              threshold={0.15}
            >
              <h2 className='mb-4 font-serif text-4xl leading-[1.1] tracking-tight text-[#2C2420] lg:text-7xl'>
                {currentConfig.title}
              </h2>
            </AnimatedBlock>
            <AnimatedBlock
              className='will-animate-fade-in-up'
              delay='0.1s'
              threshold={0.15}
            >
              <p className='mb-8 text-xl font-light text-[#2C2420]'>
                {currentConfig.subtitle}
              </p>
            </AnimatedBlock>
            <AnimatedBlock
              className='will-animate-fade-in-up'
              delay='0.15s'
              threshold={0.15}
            >
              <div className='flex flex-wrap items-center gap-4 lg:gap-8'>
                <span className='text-3xl font-medium text-[#2C2420] lg:text-4xl'>
                  {currentConfig.price},-
                </span>
                <div className='flex items-center gap-2 rounded-sm border border-[#FFB3C7]/40 bg-[#FFB3C7]/10 px-4 py-2'>
                  <span className='text-sm font-medium text-[#2C2420]'>
                    Eller {monthlyPrice},- /mnd
                  </span>
                  <KlarnaLogo className='h-5 w-auto' />
                </div>
              </div>
            </AnimatedBlock>
            {isTechDownOffer && (
              <AnimatedBlock
                className='will-animate-fade-in-up'
                delay='0.2s'
                threshold={0.15}
              >
                <div className='mt-8 flex items-center gap-4 rounded-lg border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-50/5 to-transparent p-4 shadow-sm'>
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600/10'>
                    <Gift className='h-5 w-5 text-emerald-500' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-emerald-800'>Vårtilbud</h3>
                    <p className='text-sm text-emerald-700/80'>
                      10% rabatt + Gratis Buff™ (verdi 249,-) legges til i
                      kurven.
                    </p>
                  </div>
                </div>
              </AnimatedBlock>
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
              threshold={0.15}
            >
              <p className='text-base leading-relaxed text-[#2C2420]/85 md:text-lg'>
                {currentConfig.description}
              </p>
            </AnimatedBlock>

            <AnimatedBlock
              className='will-animate-fade-in-up'
              delay='0.1s'
              threshold={0.15}
            >
              <div className='-mx-1 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#2C2420]/75'>
                {currentConfig.features.map((feature, i) => (
                  <span
                    key={feature}
                    className='inline-flex items-center gap-1.5 px-1 font-medium'
                  >
                    <span
                      aria-hidden
                      className='h-1 w-1 shrink-0 rounded-full bg-[#E07A5F]'
                    />
                    <span className='whitespace-nowrap'>{feature}</span>
                  </span>
                ))}
              </div>
            </AnimatedBlock>

            <AnimatedBlock
              className='will-animate-fade-in-up'
              delay='0.15s'
              threshold={0.1}
            >
              <div className='rounded-md border border-[#2C2420]/10 bg-[#F9F8F6] px-4'>
                <div className='flex items-center justify-between border-b border-[#2C2420]/10 py-3'>
                  <span className='text-[11px] font-bold uppercase tracking-wider text-[#2C2420]/60'>
                    Hva gjør {currentConfig.title.replace('Utekos ', '')} spesiell
                  </span>
                  <Sparkles
                    className='h-3.5 w-3.5 text-[#E07A5F]'
                    aria-hidden
                  />
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
                      className='border-b border-[#2C2420]/10 last:border-b-0'
                    >
                      <AccordionTrigger className='py-3 text-left text-sm font-semibold text-[#2C2420] hover:no-underline hover:text-[#E07A5F]'>
                        {highlight.title}
                      </AccordionTrigger>
                      <AccordionContent className='pb-3 pt-0 text-sm leading-relaxed text-[#2C2420]/70'>
                        {highlight.body}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AnimatedBlock>
          </div>

          <div className='mb-12 h-px w-full bg-[#2C2420]/10' />
          <div className='mb-12 space-y-12'>
            <div>
              <div className='mb-4 flex items-center justify-between'>
                <span className='text-sm font-bold uppercase tracking-widest text-[#2C2420]'>
                  Størrelse
                </span>
                <Link
                  href='/handlehjelp/storrelsesguide'
                  data-track='SizeGuideSkreddersyVarmen'
                  className='text-sm text-[#2C2420] underline transition-colors hover:text-[#E07A5F]'
                >
                  Se størrelsesguide
                </Link>
              </div>
              <div
                className={cn(
                  'grid gap-3 md:gap-4',
                  currentConfig.sizes.length === 4 ? 'grid-cols-4'
                  : currentConfig.sizes.length === 2 ? 'grid-cols-2'
                  : 'grid-cols-3'
                )}
              >
                {currentConfig.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'group relative overflow-hidden rounded-sm border px-3 py-5 text-sm font-medium transition-all md:px-4 md:text-base',
                      selectedSize === size ?
                        'border-[#2C2420] bg-[#2C2420] text-white shadow-lg'
                      : 'border-[#2C2420]/20 bg-white text-[#2C2420] hover:border-[#2C2420]'
                    )}
                  >
                    {size}
                    {selectedSize === size && (
                      <div className='absolute right-0 top-0 -mr-1.5 -mt-1.5 h-3 w-3 rotate-45 bg-[#E07A5F]' />
                    )}
                  </button>
                ))}
              </div>

              <div className='mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs'>
                <span className='uppercase tracking-wider text-[#2C2420]/55'>
                  Farge
                </span>
                {currentConfig.colors.map((colorObj, index) => {
                  const isActive = selectedColorIndex === index
                  const isInteractive = currentConfig.colors.length > 1
                  return (
                    <button
                      key={colorObj.name}
                      type='button'
                      onClick={() =>
                        isInteractive && setSelectedColorIndex(index)
                      }
                      aria-label={`Farge ${colorObj.name}`}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full transition',
                        isInteractive && 'hover:opacity-80',
                        !isInteractive && 'cursor-default'
                      )}
                    >
                      <span
                        className={cn(
                          'h-3.5 w-3.5 rounded-full border border-black/15',
                          isActive
                          && isInteractive
                          && 'ring-1 ring-[#E07A5F] ring-offset-1 ring-offset-white',
                          !isActive && isInteractive && 'opacity-60'
                        )}
                        style={{ backgroundColor: colorObj.hex }}
                      />
                      {isActive && (
                        <span className='font-medium text-[#2C2420]'>
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
                  <div className='relative overflow-hidden rounded-md bg-[#F4F1EA] p-5'>
                    <div className='mb-3 flex items-center gap-2 border-b border-[#2C2420]/10 pb-3'>
                      <Ruler className='h-4 w-4 text-[#E07A5F]' />
                      <span className='text-sm font-bold uppercase tracking-wider text-[#2C2420]'>
                        Passer best for deg som er {guidance.height}
                      </span>
                    </div>
                    <ul className='space-y-2'>
                      {guidance.tips.map((tip, i) => (
                        <li
                          key={i}
                          className='flex items-start gap-2.5 text-sm leading-relaxed text-[#2C2420]/80'
                        >
                          <div className='mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#E07A5F]' />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='z-30 mx-auto border-t border-[#2C2420]/10 bg-white p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] md:p-12 lg:p-20'>
          <div className='mb-8 flex h-16 gap-4'>
            <div className='mx-auto flex h-full items-center rounded-sm border border-[#2C2420]/20 bg-white'>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className='flex h-full w-16 items-center justify-center transition-colors hover:bg-[#2C2420]/5'
                aria-label='Reduser antall'
              >
                <Minus size={20} />
              </button>
              <span className='w-14 text-center text-xl font-medium'>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className='flex h-full w-16 items-center justify-center transition-colors hover:bg-[#2C2420]/5'
                aria-label='Øk antall'
              >
                <Plus size={20} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              data-track='🔔🛒 AddToCartSkreddersyVarmen 🛒🔔'
              disabled={isPending}
              className={cn(
                'flex h-full flex-1 flex-row items-center justify-center gap-3 rounded-sm bg-[#E07A5F] px-2 text-white shadow-xl transition-all active:scale-[0.98] hover:bg-[#D06A4F]',
                isPending && 'cursor-not-allowed opacity-80'
              )}
            >
              {isPending ?
                <>
                  <Loader2 className='h-6 w-6 animate-spin' />
                  <span className='whitespace-nowrap text-lg font-bold uppercase tracking-wider'>
                    Legger til...
                  </span>
                </>
              : <>
                  <span className='whitespace-nowrap text-lg font-bold uppercase tracking-wider md:text-xl'>
                    Legg i kurv
                  </span>
                  <div className='hidden h-8 w-px bg-white/30 md:block' />
                  <span className='hidden whitespace-nowrap text-xl font-normal opacity-100 md:inline'>
                    {currentConfig.price * quantity},-
                  </span>
                </>
              }
            </button>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='flex items-center gap-8 md:gap-10'>
              <VippsLogo className='h-8 w-auto md:h-10' />
              <KlarnaLogo className='h-8 w-auto md:h-10' />
              <PostNordLogo className='mt-1 h-6 w-auto md:h-8' />
            </div>

            <AnimatedBlock
              className='will-animate-fade-in-up'
              delay='0s'
              threshold={0.1}
            >
              <div className='rounded-lg border border-[#2C2420]/10 bg-[#F9F8F6]'>
                <div className='grid grid-cols-1 divide-y divide-[#2C2420]/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0'>
                  <div className='flex items-start gap-3 p-4'>
                    <Truck
                      size={22}
                      className='mt-0.5 shrink-0 text-[#E07A5F]'
                    />
                    <div className='min-w-0'>
                      <p className='text-sm font-semibold text-[#2C2420]'>
                        Rask levering 2–5 dager
                      </p>
                      <p className='mt-0.5 text-xs leading-snug text-[#2C2420]/65'>
                        Sendes samme dag (ikke søndag). Fri frakt fra 999,-.
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-3 p-4'>
                    <RefreshCcw
                      size={22}
                      className='mt-0.5 shrink-0 text-[#E07A5F]'
                    />
                    <div className='min-w-0'>
                      <p className='text-sm font-semibold text-[#2C2420]'>
                        14 dagers åpent kjøp
                      </p>
                      <p className='mt-0.5 text-xs leading-snug text-[#2C2420]/65'>
                        Send tilbake uten spørsmål.
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-3 p-4'>
                    <Store
                      size={22}
                      className='mt-0.5 shrink-0 text-[#E07A5F]'
                    />
                    <div className='min-w-0'>
                      <p className='text-sm font-semibold text-[#2C2420]'>
                        På lager i Bergen
                      </p>
                      <p className='mt-0.5 text-xs leading-snug text-[#2C2420]/65'>
                        Også via Intersport. Norsk garanti.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='border-t border-[#2C2420]/10 px-4 py-2.5'>
                  <Link
                    href='/frakt-og-retur'
                    data-track='SkreddersyVarmenFraktOgReturLink'
                    className='group inline-flex items-center gap-1.5 text-xs font-medium text-[#2C2420]/75 transition-colors hover:text-[#E07A5F]'
                  >
                    Se all frakt- og retur-info
                    <ArrowRight
                      size={12}
                      className='transition-transform group-hover:translate-x-0.5'
                    />
                  </Link>
                </div>
              </div>
            </AnimatedBlock>
          </div>
        </div>
      </div>
    </section>
  )
}
