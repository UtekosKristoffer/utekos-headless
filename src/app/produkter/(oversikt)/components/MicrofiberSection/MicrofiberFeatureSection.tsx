import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { microfiberAdvantages } from './microfiberAdvantages'
import { downAdvantages } from '@/app/produkter/(oversikt)/utils/downAdvantages'
import { IconRenderer } from './iconRenderer'

export function MicrofiberFeatureSection() {
  return (
    <section className='mx-auto rounded-lg border border-neutral-800 bg-sidebar-foreground py-20 sm:py-32 md:mb-24'>
      <div className='container mx-auto max-w-7xl px-4 text-center'>
        <AnimatedBlock className='will-animate-fade-in-up'>
          <h2 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
            Mikrofiber eller Dun?
          </h2>
        </AnimatedBlock>
        <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
          <p className='mx-auto mt-6 max-w-3xl text-lg leading-8 text-access/80'>
            Velg riktig varme for ditt bruk. Mens dun er uslåelig på vekt, er
            Utekos Mikrofiber™ den robuste og bekymringsfrie partneren for det
            ustabile norske klimaet.
          </p>
        </AnimatedBlock>

        <div className='mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-3 lg:gap-8'>
          <div className='flex flex-col gap-8'>
            {microfiberAdvantages.map((advantage, index) => (
              <AnimatedBlock
                key={advantage.title}
                className='will-animate-fade-in-left'
                delay={`${0.3 + index * 0.1}s`}
              >
                <div className='flex items-start gap-4 text-left'>
                  <IconRenderer
                    name={advantage.icon}
                    className={`h-8 w-8 flex-shrink-0 ${advantage.color}`}
                  />
                  <div>
                    <h3 className='font-semibold text-foreground'>
                      {advantage.title}
                    </h3>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      {advantage.description}
                    </p>
                  </div>
                </div>
              </AnimatedBlock>
            ))}
          </div>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
            <div className='relative w-full aspect-[2/3]'>
              <Image
                src='/black_back_without95.webp'
                alt='Utekos Mikrofiber klar for alle værforhold'
                fill
                className='rounded-2xl object-cover shadow-2xl'
                sizes='(max-width: 1024px) 80vw, 30vw'
              />
            </div>
          </AnimatedBlock>

          <div className='flex flex-col gap-8'>
            {downAdvantages.map((advantage, index) => (
              <AnimatedBlock
                key={advantage.title}
                className='will-animate-fade-in-right'
                delay={`${0.3 + index * 0.1}s`}
              >
                <div className='flex items-start gap-4 text-left lg:flex-row-reverse lg:text-right'>
                  <IconRenderer
                    name={advantage.icon}
                    className={`h-8 w-8 flex-shrink-0 ${advantage.color}`}
                  />
                  <div>
                    <h3 className='font-semibold text-foreground'>
                      {advantage.title}
                    </h3>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      {advantage.description}
                    </p>
                  </div>
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </div>

        <AnimatedBlock
          className='will-animate-fade-in-up mt-16 flex flex-col items-center gap-6'
          delay='0.6s'
        >
          <p className='text-4xl font-bold text-foreground'>1 590,00 kr</p>
          <Button asChild size='lg' className='group w-full sm:w-auto'>
            <Link href='/produkter/utekos-mikrofiber'>
              Velg bekymringsfri varme
              <Sparkles className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:scale-125' />
            </Link>
          </Button>
        </AnimatedBlock>
      </div>
    </section>
  )
}
