// Path: src/app/handlehjelp/sammenlign-modeller/components/CompareModelsPageHero.tsx
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import Image from 'next/image'
import Link from 'next/link'
import CompareHeroImage from '@public/kate-linn-stort-bilde.png'
export function CompareModelsPageHero() {
  return (
    <section className='relative isolate min-h-[calc(100svh-12rem)] overflow-hidden bg-maritime-darkest text-cloud-dancer'>
      <Image
        src={CompareHeroImage}
        alt='To personer i Utekos ute i norsk natur'
        fill
        priority
        sizes='100vw'
        className='-z-20 object-cover object-[58%_center]'
      />
      <div className='absolute inset-0 -z-10 bg-maritime-darkest/72' />
      <div className='absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-[linear-gradient(to_top,var(--maritime-darkest),transparent)]' />

      <div className='mx-auto flex min-h-[calc(100svh-12rem)] w-full max-w-7xl flex-col justify-end px-[6vw] py-10 sm:py-12 lg:py-16'>
        <div className='max-w-6xl'>
          <BrandBadge
            label='Kjøpsguide'
            backgroundColor='var(--overcast)'
            className='mb-7 px-6 py-3 text-sm shadow-[0_18px_44px_-30px_color-mix(in_oklab,var(--overcast)_80%,transparent)]'
          />
          <h1 className='font-google-sans text-5xl leading-[0.9] font-bold tracking-[-0.01em] text-cloud-dancer sm:text-7xl lg:text-8xl'>
            Hvilken Utekos passer best for deg?
          </h1>
          <p className='mt-7 max-w-2xl font-utekos-text text-lg leading-[1.45] tracking-tight text-cloud-dancer/90 sm:text-2xl'>
            Sammenlign Utekos Dun, Utekos Mikrofiber og Utekos TechDown. Finn
            riktig modell for hytte, bobil, båt og kalde kvelder ute.
          </p>
          <div className='mt-9 flex flex-wrap items-center gap-4'>
            <BrandBadge
              asChild
              backgroundColor='var(--primary-button)'
              className='px-7 py-4 text-base transition-transform duration-300 hover:scale-[1.02]'
            >
              <Link href='#velg-etter-bruk'>Finn modellen din</Link>
            </BrandBadge>
            <Link
              href='#sammenligning'
              className='font-utekos-text text-base font-medium tracking-tight text-cloud-dancer underline decoration-cloud-dancer/35 underline-offset-8 transition-colors duration-300 hover:text-overcast'
            >
              Se tabellen
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
