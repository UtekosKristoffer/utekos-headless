// Path: src/app/om-oss/Sections/GrunderSection.tsx
import Image from 'next/image'
import UtekosFounder from '@public/erling/eh_pointing_star_800.webp'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { Quote } from 'lucide-react'

export function GrunderSection() {
  return (
    <section className='relative overflow-hidden bg-maritime-darkest py-24 sm:py-32'>
      <div className='absolute inset-0 -z-10 opacity-40'>
        <div
          className='absolute right-1/3 top-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklab, var(--dusted-peri) 55%, transparent) 0%, transparent 70%)'
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
                  background: 'linear-gradient(135deg, var(--dusted-peri) 0%, var(--chocolate-plum) 100%)'
                }}
              />
              <div className='relative h-auto aspect-[4/5] w-64 overflow-hidden rounded-sm border border-cloud-dancer/10 shadow-2xl shadow-black/25'>
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
              <p className='text-lg leading-[1] font-semibold tracking-[-0.01em] text-cloud-dancer'>
                Erling Holthe
              </p>
              <p className='text-sm leading-[1.45] font-medium tracking-[-0.01em] text-dusted-peri'>
                Grunnlegger
              </p>
            </AnimatedBlock>
          </AnimatedBlock>

          <div className='flex flex-col justify-center lg:col-span-8'>
            <AnimatedBlock className='mb-6 will-animate-fade-in-up' delay='0.1s' threshold={0.3}>
              <BrandBadge
                label='Vår historie'
                backgroundColor='var(--dusted-peri)'
                textColor='var(--maritime-darkest)'
                className='w-fit   font-medium   shadow-[0_18px_44px_-28px_color-mix(in_oklab,var(--dusted-peri)_80%,transparent)]'
              />
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s' threshold={0.3}>
              <h2 className='mb-8 text-4xl leading-[0.95] font-bold tracking-[-0.01em] text-cloud-dancer md:text-5xl'>
                Fra idé til virkelighet
              </h2>
            </AnimatedBlock>
            <AnimatedBlock
              className='relative mb-10 overflow-hidden rounded-sm border-l-4 border-havdyp/20 bg-overcast p-8 shadow-sm will-animate-fade-in-up'
              delay='0.3s'
              threshold={0.3}
            >
              <div className='relative flex flex-col items-start gap-4 rounded-sm bg-overcast md:flex-row'>
                <Quote aria-hidden='true' className='size-8 shrink-0 rotate-180 text-havdyp md:rotate-0' />
                <p className='text-xl leading-[1.35] font-medium tracking-[-0.01em] text-havdyp/90 md:text-2xl'>
                  &ldquo;Jeg var lei av stive pledd og gode øyeblikk som ble kuttet kort av kulden. Det måtte
                  finnes en bedre måte å holde varmen på.&rdquo;
                </p>
              </div>
            </AnimatedBlock>

            <div className='space-y-6 text-lg leading-[1.45]   font-medium   text-cloud-dancer/85'>
              <AnimatedBlock className='will-animate-fade-in-up' delay='0.4s' threshold={0.3}>
                <p>
                  Jeg har alltid elsket de små, verdifulle øyeblikkene – den stille kaffekoppen på en kjølig
                  morgen, den gode samtalen rundt bålpannen, eller roen i båten rett etter at solen har gått
                  ned. Men frustrasjonen var alltid den samme: lag på lag med klær som gjorde meg mer til en
                  Michelin-mann enn en avslappet livsnyter.
                </p>
              </AnimatedBlock>

              <AnimatedBlock className='will-animate-fade-in-up' delay='0.5s' threshold={0.3}>
                <p>
                  Jeg lette etter ett enkelt, kompromissløst plagg. Et verktøy for komfort som var så
                  behagelig at jeg glemte jeg hadde det på, men så funksjonelt at det lot meg eie øyeblikket.
                  Svaret fantes ikke. Så jeg bestemte meg for å lage det selv.
                </p>
              </AnimatedBlock>

              <AnimatedBlock className='will-animate-fade-in-up' delay='0.6s' threshold={0.3}>
                <p>
                  Det ble en reise som tok måneder – med design, utallige prototyper, jakt på de rette
                  materialene, og testing i pøsende bergensregn og på kalde fjelltopper. Resultatet ble
                  Utekos. Ikke bare et produkt, men en hyllest til de små, verdifulle øyeblikkene i en travel
                  hverdag.
                </p>
              </AnimatedBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
