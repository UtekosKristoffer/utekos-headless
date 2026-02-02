// Path: src/app/om-oss/Sections/GrunderSection.tsx
import Image from 'next/image'
import UtekosFounder from '@public/erling/eh_pointing_star_800.webp'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Quote } from 'lucide-react'

export function GrunderSection() {
  return (
    <section className='relative overflow-hidden py-24 sm:py-32 bg-white'>
      <div className='absolute inset-0 -z-10 opacity-40'>
        <div
          className='absolute right-1/3 top-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #E07A5F 0%, transparent 70%)' // Ember Orange glød
          }}
        />
      </div>

      <div className='container mx-auto max-w-6xl px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16'>
          <AnimatedBlock
            className='flex flex-col items-center will-animate-fade-in-scale lg:col-span-4 lg:items-start'
            delay='0s'
            threshold={0.5}
          >
            <div className='group relative'>
              <div
                className='absolute -inset-2 opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-40'
                style={{
                  background:
                    'linear-gradient(135deg, #E07A5F 0%, #2C2420 100%)' // Varm gradient
                }}
              />
              <div className='relative h-auto w-64 aspect-[4/5] overflow-hidden rounded-sm border border-[#2C2420]/10 shadow-2xl shadow-[#2C2420]/20'>
                <Image
                  src={UtekosFounder}
                  alt='Erling Holthe, gründer av Utekos'
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                  priority={false}
                  sizes='(max-width: 768px) 100vw, 300px'
                />
              </div>
            </div>

            <AnimatedBlock
              className='mt-6 text-center will-animate-fade-in-up lg:text-left'
              delay='0.15s'
              threshold={0.3}
            >
              <p className='text-lg font-serif font-medium text-[#2C2420]'>
                Erling Holthe
              </p>
              <p className='text-sm tracking-wider uppercase text-[#E07A5F]'>
                Grunnlegger
              </p>
            </AnimatedBlock>
          </AnimatedBlock>

          <div className='flex flex-col justify-center lg:col-span-8'>
            <AnimatedBlock
              className='mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#E07A5F]/30 bg-[#E07A5F]/5 px-4 py-1.5 will-animate-fade-in-up'
              delay='0.1s'
              threshold={0.3}
            >
              <span className='text-xs font-bold tracking-[0.15em] uppercase text-[#E07A5F]'>
                Vår historie
              </span>
            </AnimatedBlock>

            <AnimatedBlock
              className='will-animate-fade-in-up'
              delay='0.2s'
              threshold={0.3}
            >
              <h2 className='mb-8 text-4xl md:text-5xl font-serif text-[#2C2420] leading-tight'>
                Fra idé til virkelighet
              </h2>
            </AnimatedBlock>
            <AnimatedBlock
              className='relative mb-10 overflow-hidden rounded-sm border-l-4 border-[#E07A5F] bg-[#F4F1EA] p-8 will-animate-fade-in-up shadow-sm'
              delay='0.3s'
              threshold={0.3}
            >
              <div className='relative flex flex-col md:flex-row gap-4 items-start'>
                <Quote
                  aria-hidden='true'
                  className='h-8 w-8 flex-shrink-0 text-[#E07A5F] rotate-180 md:rotate-0'
                />
                <p className='text-xl md:text-2xl font-serif italic leading-relaxed text-[#2C2420]/90'>
                  &ldquo;Jeg var lei av stive pledd og gode øyeblikk som ble
                  kuttet kort av kulden. Det måtte finnes en bedre måte å holde
                  varmen på.&rdquo;
                </p>
              </div>
            </AnimatedBlock>

            {/* Brødtekst - Økt lesbarhet for 55+ */}
            <div className='space-y-6 text-[#2C2420]/80 text-lg leading-relaxed font-light'>
              <AnimatedBlock
                className='will-animate-fade-in-up'
                delay='0.4s'
                threshold={0.3}
              >
                <p>
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
                <p>
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
                <p>
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
