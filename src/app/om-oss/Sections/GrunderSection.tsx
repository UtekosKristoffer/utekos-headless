import Image from 'next/image'
import UtekosFounder from '@public/erling/eh_pointing_star_800.webp'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Quote } from 'lucide-react'

export function GrunderSection() {
  return (
    <section className='relative overflow-hidden py-24 sm:py-32'>
      <div className='absolute inset-0 -z-10 opacity-30'>
        <div
          className='absolute right-1/3 top-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16'>
          <AnimatedBlock
            className='flex flex-col items-center will-animate-fade-in-scale lg:col-span-4 lg:items-start'
            delay='0s'
            threshold={0.5}
          >
            <div className='group relative'>
              <div
                className='absolute -inset-2 opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-30'
                style={{
                  background:
                    'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)'
                }}
              />
              <div className='relative h-70 w-64 overflow-hidden rounded-2xl border-2 border-neutral-800 shadow-2xl'>
                <Image
                  src={UtekosFounder}
                  alt='Portrett av gründeren av Utekos'
                  width={800}
                  height={971}
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                  priority={false}
                />
              </div>
            </div>

            <AnimatedBlock
              className='mt-6 text-center will-animate-fade-in-up lg:text-left'
              delay='0.15s'
              threshold={0.3}
            >
              <p className='text-lg font-semibold text-foreground'>
                Erling Holthe
              </p>
              <p className='mt-1 text-sm text-muted-foreground'>Utekos</p>
            </AnimatedBlock>
          </AnimatedBlock>
          <div className='flex flex-col justify-center lg:col-span-8'>
            <AnimatedBlock
              className='mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-sky-800/30 bg-sky-900/10 px-4 py-2 will-animate-fade-in-up'
              delay='0.1s'
              threshold={0.3}
            >
              <span className='text-sm font-medium text-sky-800'>
                Vår historie
              </span>
            </AnimatedBlock>

            <AnimatedBlock
              className='will-animate-fade-in-up'
              delay='0.2s'
              threshold={0.3}
            >
              <h2 className='mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl'>
                Fra idé til virkelighet
              </h2>
            </AnimatedBlock>

            <AnimatedBlock
              className='relative mb-8 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 will-animate-fade-in-up'
              delay='0.3s'
              threshold={0.3}
            >
              <div
                className='absolute -inset-x-2 -inset-y-8 opacity-15 blur-2xl'
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #0ea5e9 100%)'
                }}
              />
              <div className='relative flex gap-4'>
                <Quote
                  aria-hidden='true'
                  className='h-8 w-8 flex-shrink-0 text-sky-800'
                />
                <p className='text-xl font-semibold leading-relaxed text-foreground'>
                  Jeg var lei av stive pledd og gode øyeblikk som ble kuttet
                  kort av kulden. Det måtte finnes en bedre måte å holde varmen
                  på.
                </p>
              </div>
            </AnimatedBlock>

            <div className='space-y-6'>
              <AnimatedBlock
                className='will-animate-fade-in-up'
                delay='0.4s'
                threshold={0.3}
              >
                <p className='text-lg leading-relaxed text-access/80'>
                  Jeg har alltid elsket de små, verdifulle øyeblikkene – den
                  stille kaffekoppen på en kjølig morgen, den gode samtalen
                  rundt bålpannen, eller roen i båten rett etter at solen har
                  gått ned. Men frustrasjonen var alltid den samme: lag på lag
                  med klær som gjorde meg mer til en Michelin-mann enn en
                  avslappet livsnyter.
                </p>
              </AnimatedBlock>

              <AnimatedBlock
                className='will-animate-fade-in-up'
                delay='0.5s'
                threshold={0.3}
              >
                <p className='text-lg leading-relaxed text-access/80'>
                  Jeg lette etter ett enkelt, kompromissløst plagg. Et verktøy
                  for komfort som var så behagelig at jeg glemte jeg hadde det
                  på, men så funksjonelt at det lot meg eie øyeblikket. Svaret
                  fantes ikke. Så jeg bestemte meg for å lage det selv.
                </p>
              </AnimatedBlock>

              <AnimatedBlock
                className='will-animate-fade-in-up'
                delay='0.6s'
                threshold={0.3}
              >
                <p className='text-lg leading-relaxed text-access/80'>
                  Det ble en reise som tok måneder – med design, utallige
                  prototyper, jakt på de rette materialene, og testing i pøsende
                  bergensregn og på kalde fjelltopper. Resultatet ble Utekos.
                  Ikke bare et produkt, men en hyllest til de små, verdifulle
                  øyeblikkene i en travel hverdag.
                </p>
              </AnimatedBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
