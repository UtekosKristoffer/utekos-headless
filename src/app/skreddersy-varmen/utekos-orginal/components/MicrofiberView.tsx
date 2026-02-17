import Image from 'next/image'
import {
  Check,
  Truck,
  RefreshCcw,
  ShieldCheck,
  ShoppingCart,
  Loader2
} from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { productConfig } from '@/app/skreddersy-varmen/utekos-orginal/utils/productConfig'
import type {
  MicrofiberLogicProps,
  MicrofiberColor,
  MicrofiberSize
} from 'types/product/'

export function MicrofiberView({
  color,
  setColor,
  size,
  setSize,
  activeImage,
  handleAddToCart,
  scrollToSizeGuide,
  isPending
}: MicrofiberLogicProps) {
  return (
    <section className='w-full border-t border-[#2C2420]/5 bg-[#F4F1EA] py-16 text-[#2C2420] md:py-24'>
      <div className='mx-auto max-w-6xl px-6'>
        <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-24'>
          <AnimatedBlock className='relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#2C2420]/5 bg-[#E5E2DB] shadow-lg'>
            <Image
              src={activeImage || ''}
              alt={`Utekos Mikrofiber i fargen ${color}`}
              fill
              className='object-cover transition-all duration-500'
              sizes='(max-width: 768px) 100vw, 50vw'
              quality={95}
            />
            <div className='absolute left-4 top-4 rounded-full bg-[#E07A5F] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm'>
              Bestselger
            </div>
          </AnimatedBlock>

          <div className='flex h-full flex-col justify-center'>
            <AnimatedBlock delay='0.1s'>
              <h2 className='mb-4 font-serif text-3xl text-[#2C2420] md:text-5xl'>
                Sikre deg varmen nå.
              </h2>
              <p className='mb-8 text-base leading-relaxed text-[#2C2420]/70 md:text-lg'>
                Invester i kvalitetstid. Utekos Mikrofiber™ er laget for å
                vare, sesong etter sesong.
              </p>
              <div className='mb-8 flex items-baseline gap-3 border-b border-[#2C2420]/10 pb-6'>
                <span className='text-3xl font-bold text-[#2C2420]'>
                  {productConfig.price},-
                </span>
                <span className='text-sm text-[#2C2420]/50'>
                  Inkl. mva og fri frakt
                </span>
              </div>

              <div className='mb-8'>
                <label className='mb-3 block text-sm font-bold uppercase tracking-wider text-[#2C2420]/60'>
                  Velg Farge:{' '}
                  <span className='ml-1 text-[#2C2420]'>
                    {productConfig.colors.find(c => c.id === color)?.name}
                  </span>
                </label>
                <div className='flex gap-4'>
                  {productConfig.colors.map(c => (
                    <button
                      key={c.id}
                      // FIX: Caster string ID til streng type MicrofiberColor
                      onClick={() => setColor(c.id as MicrofiberColor)}
                      className={`
                        group relative h-14 w-14 rounded-full border-2 transition-all duration-200 md:h-16 md:w-16
                        ${color === c.id ? 'scale-110 border-[#E07A5F] ring-2 ring-[#E07A5F]/20' : 'border-transparent hover:scale-105'}
                      `}
                      aria-label={`Velg farge ${c.name}`}
                    >
                      <span
                        className='absolute inset-1 rounded-full border border-black/10'
                        style={{ backgroundColor: c.hex }}
                      />
                      {color === c.id && (
                        <span className='absolute inset-0 flex items-center justify-center text-white drop-shadow-md'>
                          <Check size={20} strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className='mb-10'>
                <div className='mb-3 flex items-center justify-between'>
                  <label className='block text-sm font-bold uppercase tracking-wider text-[#2C2420]/60'>
                    Velg Størrelse
                  </label>
                  <button
                    onClick={scrollToSizeGuide}
                    aria-label='Usikker på størrelsen?'
                    data-track='SizeGuideScrollClick'
                    className='text-xs underline transition-colors hover:text-[#E07A5F] md:text-sm text-[#2C2420]/60'
                  >
                    Usikker på størrelsen?
                  </button>
                </div>

                <div className='grid grid-cols-2 gap-3 md:gap-4'>
                  {productConfig.sizes.map(s => (
                    <button
                      key={s.id}
                      // FIX: Caster string ID til streng type MicrofiberSize
                      onClick={() => setSize(s.id as MicrofiberSize)}
                      className={`
                          relative rounded-xl border-2 p-3 text-left transition-all duration-200 md:p-4
                          ${
                            size === s.id ?
                              'bg-[#E07A5F]/5 border-[#E07A5F]'
                            : 'bg-white border-[#2C2420]/10 hover:border-[#2C2420]/30'
                          }
                        `}
                    >
                      <span
                        className={`block mb-1 text-base font-bold md:text-lg ${size === s.id ? 'text-[#E07A5F]' : 'text-[#2C2420]'}`}
                      >
                        {s.name}
                      </span>
                      <span className='block text-xs leading-tight text-[#2C2420]/60'>
                        {s.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                data-track='❗🛒❗SkreddersyUtekosOrginalAddToCartClick ❗🛒❗'
                disabled={isPending}
                className='
                  flex w-full items-center justify-center gap-3 rounded-full 
                  bg-[#E07A5F] py-4 text-lg font-bold text-white shadow-xl 
                  transition-all duration-200 hover:-translate-y-1 hover:bg-[#D06A4F] 
                  hover:shadow-2xl active:scale-[0.98] md:py-5
                  disabled:cursor-not-allowed disabled:transform-none disabled:opacity-70
                '
              >
                {isPending ?
                  <>
                    <Loader2 className='animate-spin' /> Legger til...
                  </>
                : <>
                    <ShoppingCart size={20} /> Legg i handlekurv —{' '}
                    {productConfig.price},-
                  </>
                }
              </button>

              <div className='mt-6 grid grid-cols-2 gap-2 text-xs text-[#2C2420]/60 md:mt-8 md:gap-4 md:text-sm'>
                <div className='flex items-center gap-2'>
                  <Truck size={16} className='text-[#E07A5F]' />
                  <span>Gratis frakt & rask levering</span>
                </div>
                <div className='flex items-center gap-2'>
                  <ShieldCheck size={16} className='text-[#E07A5F]' />
                  <span>30 dagers åpent kjøp</span>
                </div>
              </div>
            </AnimatedBlock>
          </div>
        </div>
      </div>
    </section>
  )
}
