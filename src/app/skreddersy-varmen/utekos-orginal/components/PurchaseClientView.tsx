import Image from 'next/image'
import Link from 'next/link'
import {
  Check,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RefreshCcw,
  Loader2,
  Gift
} from 'lucide-react'
import { cn } from '@/lib/utils/className'
import { VippsLogo } from '@/components/logo/payments/VippsLogo'
import { KlarnaLogo } from '@/components/logo/payments/KlarnaLogo'
import { PostNordLogo } from '@/components/logo/payments/PostNordLogo'
import { PRODUCT_VARIANTS } from '@/api/constants'
import type { ModelKey, PurchaseClientViewProps } from '@types'

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

  return (
    <section className='relative left-[calc(-50vw+50%)] w-screen overflow-hidden bg-[#F9F8F6] text-[#2C2420] lg:flex lg:min-h-screen'>
      <div className='relative flex w-full flex-col items-center justify-center bg-[#EAE8E3] p-8 lg:sticky lg:top-0 lg:h-screen lg:w-1/2'>
        <div className='absolute left-6 top-6 z-20 flex items-center gap-3 rounded-sm border border-[#2C2420]/10 bg-white/90 px-5 py-2.5 shadow-sm backdrop-blur-md'>
          <span className='h-2.5 w-2.5 rounded-full bg-[#E07A5F]' />
          <span className='text-sm font-bold uppercase tracking-widest text-[#2C2420]'>
            Norsk Design
          </span>
        </div>
        <div className='relative h-[50vh] w-full max-w-2xl lg:h-[70vh]'>
          <div className='relative h-full w-full'>
            <Image
              src={currentConfig.image}
              alt={currentConfig.title}
              fill
              className='object-contain drop-shadow-2xl transition-all duration-700 ease-out hover:scale-105'
              priority
              sizes='(max-width: 1024px) 100vw, 50vw'
            />
          </div>
        </div>
        <p className='mt-8 hidden font-serif text-base italic text-[#2C2420] lg:block'>
          Modell vist: {currentConfig.title}
        </p>
      </div>

      <div className='flex w-full flex-col bg-white lg:w-1/2'>
        <div className='flex-1 p-6 md:p-12 lg:overflow-y-auto lg:p-24'>
          <div className='mb-12 flex w-full flex-wrap gap-2 rounded-lg bg-[#F4F1EA] p-1.5 md:w-fit'>
            {(Object.keys(PRODUCT_VARIANTS) as ModelKey[]).map(key => (
              <button
                key={key}
                onClick={() => setSelectedModel(key)}
                className={cn(
                  'flex-1 whitespace-nowrap rounded-md px-6 py-3 text-base font-medium transition-all duration-200 md:flex-none',
                  selectedModel === key ?
                    'scale-100 transform bg-white text-[#2C2420] shadow-md ring-1 ring-black/5'
                  : 'text-[#2C2420] hover:bg-white/50'
                )}
              >
                {PRODUCT_VARIANTS[key].title.replace('Utekos ', '')}
              </button>
            ))}
          </div>

          <div className='mb-12'>
            <h1 className='mb-4 font-serif text-4xl leading-[1.1] tracking-tight text-[#2C2420] lg:text-7xl'>
              {currentConfig.title}
            </h1>
            <p className='mb-8 text-xl font-light text-[#2C2420]'>
              {currentConfig.subtitle}
            </p>

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
            {isTechDownOffer && (
              <div className='mt-8 flex items-center gap-4 rounded-lg border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-50/5 to-transparent p-4 shadow-sm'>
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600/10'>
                  <Gift className='h-5 w-5 text-emerald-500' />
                </div>
                <div>
                  <h3 className='font-semibold text-emerald-800'>
                    Lanseringstilbud
                  </h3>
                  <p className='text-sm text-emerald-700/80'>
                    Gratis Utekos Buff™ (verdi 249,-) legges til i kurven.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className='mb-12 h-px w-full bg-[#2C2420]/10' />
          <div className='mb-12 space-y-12'>
            <div>
              <div className='mb-4 flex items-center justify-between'>
                <span className='text-sm font-bold uppercase tracking-widest text-[#2C2420]'>
                  Velg Farge
                </span>
                <span className='text-base font-medium text-[#2C2420]'>
                  {currentColor?.name}
                </span>
              </div>
              <div className='flex gap-4'>
                {currentConfig.colors.map((colorObj, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColorIndex(index)}
                    className={cn(
                      'relative h-14 w-14 rounded-full border-2 shadow-sm transition-all duration-200',
                      selectedColorIndex === index ?
                        'scale-110 border-[#E07A5F] ring-2 ring-[#E07A5F]/20'
                      : 'border-transparent hover:scale-105 hover:shadow-md'
                    )}
                    style={{ backgroundColor: colorObj.hex }}
                    title={colorObj.name}
                    aria-label={`Velg farge ${colorObj.name}`}
                  >
                    {selectedColorIndex === index && (
                      <Check className='absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-md' />
                    )}
                  </button>
                ))}
              </div>
            </div>
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
              <div className='grid grid-cols-3 gap-4'>
                {currentConfig.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'group relative overflow-hidden rounded-sm border px-4 py-5 text-base font-medium transition-all',
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
          <div className='flex flex-col gap-8'>
            <div className='flex items-center gap-8 md:gap-10'>
              <VippsLogo className='h-8 w-auto md:h-10' />
              <KlarnaLogo className='h-8 w-auto md:h-10' />
              <PostNordLogo className='mt-1 h-6 w-auto md:h-8' />
            </div>
            <div className='grid grid-cols-2 gap-6 border-t border-[#2C2420]/10 pt-6 text-sm text-[#2C2420] md:grid-cols-4'>
              <div className='flex items-center gap-3'>
                <Truck size={20} className='shrink-0 text-[#E07A5F]' />
                <span>Fri frakt fra 999,-</span>
              </div>
              <div className='flex items-center gap-3'>
                <RefreshCcw size={20} className='shrink-0 text-[#E07A5F]' />
                <span>14 dagers åpent kjøp</span>
              </div>
              <div className='flex items-center gap-3'>
                <ShieldCheck size={20} className='shrink-0 text-[#E07A5F]' />
                <span>Norsk garanti</span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E07A5F] text-[10px] font-bold text-white'>
                  ✓
                </div>
                <span>På lager i Bergen</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
