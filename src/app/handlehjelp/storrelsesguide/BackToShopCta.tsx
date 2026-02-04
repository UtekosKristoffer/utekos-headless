import { Button } from '@/components/ui/button'
import { ArrowRight, Compass, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import type { Route } from 'next'
export function BackToShopCta() {
  return (
    <section className='border-t border-neutral-800 bg-neutral-950/50'>
      <div className='container mx-auto px-4 py-16 sm:py-20 text-center'>
        <Compass className='mx-auto h-10 w-10 text-sky-800' />
        <h2 className='mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
          Klar for å finne din Utekos?
        </h2>
        <p className='mt-4 max-w-2xl mx-auto text-lg text-foreground/80'>
          Nå som du har full kontroll på størrelsen, er du bare et par klikk
          unna en helt ny standard for komfort.
        </p>
        <div className='mt-8 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4'>
          <Button asChild size='lg' className='w-full sm:w-auto'>
            <Link
              href='/produkter/utekos-dun'
              data-track='StorrelsesguideBackToShopCtaUtekosDunClick'
            >
              Til Utekos Dun™
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
          <Button asChild size='lg' className='w-full sm:w-auto'>
            <Link
              href='/produkter/utekos-mikrofiber'
              data-track='StorrelsesguideBackToShopCtaUtekosMikrofiberClick'
            >
              Til Utekos Mikrofiber™
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
          <Button asChild size='lg' className='w-full sm:w-auto'>
            <Link
              href='/produkter/comfyrobe'
              data-track='StorrelsesguideBackToShopCtaComfyrobeClick'
            >
              Til Comfyrobe™
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>

        <div className='relative mt-16'>
          <div
            className='absolute inset-0 flex items-center'
            aria-hidden='true'
          >
            <div className='w-full border-t border-neutral-800' />
          </div>
          <div className='relative flex justify-center'>
            <span className='bg-neutral-950/50 px-3 text-sm font-medium text-neutral-400'>
              eller
            </span>
          </div>
        </div>

        <div className='mt-12 max-w-2xl mx-auto'>
          <h3 className='text-xl font-semibold'>
            Fortsatt usikker? Få personlig hjelp.
          </h3>
          <p className='mt-2 text-foreground/70'>
            Hvis du ønsker en skreddersydd anbefaling basert på din bruk, høyde,
            og kroppsfasong, er vi her for deg. Send oss en melding, så
            garanterer vi svar innen én time frem til kl. 22:00.
          </p>
          <Button asChild variant='secondary' className='mt-6'>
            <Link
              href={'/kontaktskjema' as Route}
              data-track='StorrelsesguideBackToShopCtaContactUsClick'
            >
              <MessageCircle className='mr-2 h-4 w-4' />
              Spør oss om størrelse
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
