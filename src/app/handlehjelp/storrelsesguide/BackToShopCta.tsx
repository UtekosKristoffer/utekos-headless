import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
import { ArrowRight, Compass, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import type { Route } from 'next'
export function BackToShopCta() {
  return (
    <section className='border-t border-cloud-dancer/12 bg-havdyp text-foreground'>
      <div className='container mx-auto px-4 py-16 sm:py-20 text-center'>
        <Compass className='mx-auto size-10 text-primary' />
        <h2 className='mx-auto mt-4 max-w-3xl text-3xl font-bold leading-[1.05]   text-foreground sm:text-5xl'>
          Klar for å finne din
          <span className='inline-flex items-baseline'>
            <UtekosWordmark
              aria-hidden='true'
              focusable='false'
              className='ml-[0.18em] inline-block h-[0.72em] w-auto translate-y-[0.06em] align-baseline text-foreground'
            />
            <span className='sr-only'>Utekos</span>
            <span className='ml-1 text-foreground'>?</span>
          </span>
        </h2>
        <p className='mt-5 max-w-2xl mx-auto text-lg leading-relaxed text-foreground/82'>
          Nå som du har full kontroll på størrelsen, er du bare et par klikk unna en helt ny standard for
          komfort.
        </p>
        <div className='mt-8 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4'>
          <BrandBadge
            asChild
            backgroundColor='var(--primary)'
            textColor='var(--background)'
            className='w-full px-6 py-3 text-base transition-[filter,transform] duration-200 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto'
          >
            <Link href='/produkter/utekos-dun' data-track='StorrelsesguideBackToShopCtaUtekosDunClick'>
              Til Utekos Dun™
              <ArrowRight className='ml-2 size-4' />
            </Link>
          </BrandBadge>
          <BrandBadge
            asChild
            backgroundColor='var(--cloud-dancer)'
            textColor='var(--background)'
            className='w-full px-6 py-3 text-base transition-[filter,transform] duration-200 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto'
          >
            <Link
              href='/produkter/utekos-mikrofiber'
              data-track='StorrelsesguideBackToShopCtaUtekosMikrofiberClick'
            >
              Til Utekos Mikrofiber™
              <ArrowRight className='ml-2 size-4' />
            </Link>
          </BrandBadge>
          <BrandBadge
            asChild
            backgroundColor='var(--cloud-dancer)'
            textColor='var(--background)'
            className='w-full px-6 py-3 text-base transition-[filter,transform] duration-200 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto'
          >
            <Link href='/produkter/comfyrobe' data-track='StorrelsesguideBackToShopCtaComfyrobeClick'>
              Til Comfyrobe™
              <ArrowRight className='ml-2 size-4' />
            </Link>
          </BrandBadge>
        </div>

        <div className='relative mt-16'>
          <div className='absolute inset-0 flex items-center' aria-hidden='true'>
            <div className='w-full border-t border-cloud-dancer/12' />
          </div>
          <div className='relative flex justify-center'>
            <span className='bg-havdyp px-3 text-sm font-medium text-foreground/72'>eller</span>
          </div>
        </div>

        <div className='mt-12 max-w-2xl mx-auto'>
          <h3 className='text-xl font-semibold'>Fortsatt usikker? Få personlig hjelp.</h3>
          <p className='mt-2 text-foreground/74'>
            Få en skreddersydd anbefaling basert på din bruk, høyde og kroppsfasong. Send oss en melding.
          </p>
          <BrandBadge
            asChild
            backgroundColor='var(--fair-orchid)'
            textColor='var(--background)'
            className='mt-6 px-6 py-3 text-base transition-[filter,transform] duration-200 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
          >
            <Link href={'/kontaktskjema' as Route} data-track='StorrelsesguideBackToShopCtaContactUsClick'>
              <MessageCircle className='mr-2 size-4' />
              Spør oss om størrelse
            </Link>
          </BrandBadge>
        </div>
      </div>
    </section>
  )
}
