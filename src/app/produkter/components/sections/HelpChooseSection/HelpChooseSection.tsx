import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { choices } from './choices'
import { getGlowColor } from './getGlowColor'

// Definerer priser (Nåpris og Førpris)
const pricing = [
  { price: '1 790 kr', before: '1 990 kr' },
  { price: '1 990 kr', before: '3 290 kr' },
  { price: '1 590 kr', before: '2 290 kr' },
  { price: '1 690 kr' }
]

export function HelpChooseSection() {
  return (
    <section className='relative mb-24 w-full px-4 md:px-6'>
      <div className='absolute inset-0 -z-10 overflow-hidden opacity-40'>
        <div
          className='absolute left-1/4 top-0 h-[400px] w-[400px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/4 bottom-0 h-[400px] w-[400px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Grid layout */}
      <div className='grid w-full grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6'>
        {choices.map((choice, index) => {
          const glowColor = getGlowColor(choice.linkColor)
          const { price, before } = pricing[index] || { price: '', before: '' }

          return (
            <AnimatedBlock
              key={choice.title}
              className='will-animate-fade-in-up h-full'
              delay={`${index * 0.1}s`}
              threshold={0.5}
            >
              <Link href={choice.href} className='group block h-full'>
                <div className='relative flex h-full flex-col overflow-hidden rounded-lg border border-neutral-800 bg-sidebar-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700'>
                  {/* Glow effect */}
                  <div
                    className='pointer-events-none absolute -inset-x-2 -top-20 h-40 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20'
                    style={{
                      background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${glowColor} 100%)`
                    }}
                  />

                  {/* Bilde-container */}
                  <div className='relative aspect-[1/1] w-full overflow-hidden rounded-t-lg'>
                    <Image
                      src={choice.imageUrl}
                      alt={choice.title}
                      fill
                      quality={100}
                      sizes='(max-width: 768px) 50vw, 25vw'
                      className='rounded-t-lg object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                  </div>

                  {/* Tekst-innhold */}
                  <div className='relative flex flex-grow flex-col p-4 md:p-6'>
                    {/* Tittel */}
                    {/* Justert: min-h-[3rem] sikrer plass til 2 linjer på mobil, slik at prisen under ikke hopper */}
                    <h3 className='mb-1 min-h-[3rem] text-base font-semibold text-foreground md:min-h-[3.5rem] md:text-xl'>
                      {choice.title}
                    </h3>

                    {/* Pris-seksjon */}
                    <div className='mb-2 flex flex-wrap items-baseline gap-2 md:mb-3'>
                      {/* Førpris */}
                      <span className='text-xs font-medium text-neutral-500 line-through decoration-neutral-600 md:text-sm'>
                        {before}
                      </span>
                      {/* Nåpris */}
                      <span className='text-sm font-bold text-white md:text-base'>
                        {price}
                      </span>
                    </div>

                    {/* Beskrivelse - Skjult på mobil */}
                    <p className='hidden text-xs leading-relaxed text-access/80 md:block md:text-sm'>
                      {choice.description}
                    </p>

                    {/* Link - mt-auto tvinger denne til bunnen */}
                    <div
                      className={`mt-auto flex items-center gap-2 pt-4 text-xs font-semibold md:text-sm ${choice.linkColor} transition-all duration-300 group-hover:gap-3`}
                    >
                      <span>Se produkt</span>
                      <ArrowRight className='h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 md:h-4 md:w-4' />
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className='absolute bottom-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                    style={{ background: glowColor }}
                  />
                </div>
              </Link>
            </AnimatedBlock>
          )
        })}
      </div>
    </section>
  )
}
