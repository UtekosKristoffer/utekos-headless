// Path: src/app/kampanje/julegaver/lokal-levering/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Gift,
  Calendar,
  ShieldCheck,
  Truck,
  Car,
  CreditCard
} from 'lucide-react'
import { SantaHat } from '@/components/ui/santahat'
import { connection } from 'next/server'
export const metadata: Metadata = {
  title: 'Årets varmeste julegave levert hjem | Ferdig innpakket 🎁 !',

  description:
    'Finn de varmeste julegavene hos Utekos. TechDown, Comfyrobe, Dun og Mikrofiber. Utvidet bytterett og levering på dagen.',

  openGraph: {
    title: 'Få årets varmeste julegave levert hjem – ferdig innpakket 🎁 !',
    description:
      'Den perfekte gaven til livsnyteren som har alt. Gi bort genial funksjonalitet som revolusjonerer opplevelsen av å være ute. Vi kjører ut bestillinger hver dag frem til julaften. Utvidet bytterett frem til 15. januar',
    url: 'https://utekos.no/kampanje/julegaver/lokal-levering',
    siteName: 'Utekos',
    locale: 'nb_NO',
    type: 'website',
    images: [
      {
        url: '/og-linn-kate-kikkert.png',
        width: 1200,
        height: 630,
        alt: 'Personer som nyter utelivet med varme klær fra Utekos'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Julegaver | Utekos',
    description:
      'Finn de varmeste julegavene hos Utekos. TechDown, Comfyrobe, Dun og Mikrofiber.',
    images: ['https://utekos.no/linn-kate-kikkert-master.png']
  }
}
export default async function ChristmasLocalDelivery() {
  await connection()
  return (
    <div className='bg-background pb-20'>
      <section className='relative overflow-hidden bg-gradient-to-b from-red-950 via-background to-background pt-24 pb-16 text-center md:pt-32'>
        <div className='container relative z-10 mx-auto px-4'>
          {/* Badge for lokal tilhørighet */}
          <div className='inline-flex items-center gap-2 rounded-full border border-red-800/50 bg-red-900/20 px-4 py-1.5 backdrop-blur-sm'>
            <Gift className='h-4 w-4 text-red-200' />
            <span className='text-sm font-medium text-red-100'>
              Gi bort funksjonell varme
            </span>
          </div>

          <h1 className='mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-6xl'>
            <span className='relative inline-block'>
              Utekos® leverer julegavene
              <SantaHat className='absolute -left-6 -top-8 h-16 w-16 -rotate-12 drop-shadow-xl md:-left-8 md:-top-10 md:h-20 md:w-20' />
            </span>
            <span className='block bg-gradient-to-r from-red-200 via-white to-red-200 bg-clip-text text-transparent'>
              rett hjem til deg
            </span>
          </h1>

          <p className='mx-auto mt-6 max-w-2xl text-lg text-article-white'>
            Er du sent ute? Ingen fare. Vi kjører ut julegaver i Bergen og omegn
            helt frem til julaften! <br className='hidden sm:block' />
          </p>

          <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Link
              href='#bestselgere'
              className='inline-flex h-12 items-center justify-center rounded-full bg-red-800 px-8 text-sm font-medium text-white shadow-lg shadow-red-900/20 transition-all hover:bg-red-700 hover:scale-105'
            >
              Se gavene vi kan levere
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
            <div className='flex items-center gap-2 text-sm text-article-white'>
              <Car className='h-4 w-4' />
              <span>Utkjøring til 24. desember</span>
            </div>
          </div>
        </div>
      </section>

      {/* USP Section - Fokusert på Tjenesten */}
      <section className='border-y border-white/5 bg-white/5 py-8'>
        <div className='container mx-auto px-4'>
          <div className='grid gap-8 text-center sm:grid-cols-3'>
            {/* 1. Lokal Levering */}
            <div className='flex flex-col items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-background ring-1 ring-white/10'>
                <Car className='h-6 w-6 text-red-400' />
              </div>
              <div>
                <h3 className='font-semibold text-foreground'>
                  Lokal hjemlevering
                </h3>
                <p className='text-sm text-article-white'>
                  Daglig utkjøring av julegaver i Bergens-området.
                </p>
              </div>
            </div>

            {/* 2. Bytterett (Viktig trygghet) */}
            <div className='flex flex-col items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-background ring-1 ring-white/10'>
                <ShieldCheck className='h-6 w-6 text-red-400' />
              </div>
              <div>
                <h3 className='font-semibold text-foreground'>
                  Utvidet bytterett
                </h3>
                <p className='text-sm text-article-white'>
                  Bytt gaver frem til 15. januar.
                </p>
              </div>
            </div>

            <div className='flex flex-col items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-background ring-1 ring-white/10'>
                <CreditCard className='h-6 w-6 text-red-400' />
              </div>
              <div>
                <h3 className='font-semibold text-foreground'>
                  Sikker betaling
                </h3>
                <p className='text-sm text-article-white'>
                  Betal trygt med Vipps eller Klarna.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SLIK GJØR DU DET (Instruksjon) --- */}
      <section className='container mx-auto mt-12 px-4'>
        <div className='rounded-2xl border border-red-900/50 bg-red-950/20 p-6 md:p-10'>
          <div className='text-center'>
            <h3 className='text-2xl font-bold text-red-200'>
              Slik fungerer julegave-ekspressen:
            </h3>
            <p className='mt-2 text-sm text-article-white/80'>
              Vi kjører ut gaver helt frem til julaften 🎅
            </p>
          </div>

          <div className='mt-8 grid gap-8 md:grid-cols-3'>
            {/* Steg 1 */}
            <div className='flex flex-col items-center text-center'>
              <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-800 text-lg font-bold text-white shadow-lg shadow-red-900/50'>
                1
              </div>
              <h4 className='font-semibold text-white'>Fyll handlekurven</h4>
              <p className='mt-2 text-sm text-article-white'>
                Finn dine favoritter. Vi har gavene på lokalt lager i Bergen.
              </p>
            </div>

            <div className='relative flex flex-col items-center text-center'>
              <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-800 text-lg font-bold text-white shadow-lg shadow-red-900/50'>
                2
              </div>
              <h4 className='font-semibold text-white'>
                Fyll inn adressen din
              </h4>
              <p className='mt-2 text-sm text-article-white'>
                Valget <strong className='text-red-200'>Lokal levering</strong>{' '}
                dukker opp automatisk <em>etter</em> at du har skrevet inn
                adressen din i kassen.
              </p>
            </div>

            <div className='flex flex-col items-center text-center'>
              <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-800 text-lg font-bold text-white shadow-lg shadow-red-900/50'>
                3
              </div>
              <h4 className='font-semibold text-white'>
                Skreddersydd levering?
              </h4>
              <p className='mt-2 text-sm text-article-white'>
                Legg ved leveringsinstruksjon i kassen. Vi tar kontakt før
                utkjøring.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id='bestselgere' className='container mx-auto mt-16 px-4'>
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold'>Våre mest populære gaver</h2>
          <p className='mt-2 text-article-white'>
            Produktene som garantert blir brukt – året rundt. Nå med julerabatt!
          </p>
        </div>

        <div className='grid gap-8 md:grid-cols-2 lg:gap-12'>
          <div className='group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-red-500/30'>
            <div className='absolute right-4 top-4 z-10 rounded-full bg-red-800 px-3 py-1 text-xs font-bold text-white shadow-lg'>
              JULERABATT
            </div>

            <div className='relative aspect-square w-full overflow-hidden bg-neutral-900'>
              <Image
                src='/magasinet/techdown-1080.png'
                alt='Utekos TechDown - Vår varmeste dunponcho'
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-105'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>

            <div className='p-6'>
              <h3 className='text-2xl font-bold'>Utekos TechDown™</h3>
              <p className='mt-2 text-article-white'>
                Nyhet: Vår varmeste mest allsidige modell. Optimalisert etter
                erfaringer og tilbakemeldinger.
              </p>
              <div className='mt-4 flex items-baseline gap-3'>
                <span className='text-xl font-bold text-red-400'>1 790 kr</span>
                <span className='text-sm text-article-white line-through'>
                  1 999 kr
                </span>
              </div>
              <Link
                href='/produkter/utekos-techdown'
                className='mt-6 block w-full rounded-lg bg-white py-3 text-center font-semibold text-black transition-colors hover:bg-neutral-200'
              >
                Kjøp TechDown™
              </Link>
            </div>
          </div>

          <div className='group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-blue-500/30'>
            <div className='absolute right-4 top-4 z-10 rounded-full bg-blue-900 px-3 py-1 text-xs font-bold text-white shadow-lg'>
              BESTSELGER
            </div>

            <div className='relative aspect-square w-full overflow-hidden bg-neutral-900'>
              <Image
                src='/magasinet/dun-front-hvit-bakgrunn-1080.png'
                alt='Utekos Mikrofiber - Den originale skifteroben'
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-105'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>

            <div className='p-6'>
              <h3 className='text-2xl font-bold'>Utekos Mikrofiber™</h3>
              <p className='mt-2 text-article-white'>
                Lettvekt møter varme og allsidighet. Gir deg følelsen av dun med
                ekstra fordeler.
              </p>
              <div className='mt-4 flex items-baseline gap-3'>
                <span className='text-xl font-bold text-foreground'>
                  1 590 kr
                </span>
                <span className='text-sm text-article-white line-through'>
                  2 290 kr
                </span>
              </div>
              <Link
                href='/produkter/utekos-mikrofiber'
                className='mt-6 block w-full rounded-lg bg-white/10 py-3 text-center font-semibold text-white transition-colors hover:bg-white/20'
              >
                Kjøp Mikrofiber
              </Link>
            </div>
          </div>

          <div className='group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-orange-500/30'>
            <div className='absolute right-4 top-4 z-10 rounded-full bg-orange-900 px-3 py-1 text-xs font-bold text-white shadow-lg'>
              FÅ IGJEN
            </div>

            <div className='relative aspect-square w-full overflow-hidden bg-neutral-900'>
              <Image
                src='/magasinet/mikro-front-1080.png'
                alt='Utekos Dun - Premium kvalitet'
                fill
                className='object-contain p-4 transition-transform duration-700 group-hover:scale-105'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>

            <div className='p-6'>
              <h3 className='text-2xl font-bold'>Utekos Dun™</h3>
              <p className='mt-2 text-article-white'>
                Klassisk dun-kvalitet for de kaldeste dagene.
              </p>
              <div className='mt-4 flex items-baseline gap-3'>
                <span className='text-xl font-bold text-foreground'>
                  1 990 kr
                </span>
                <span className='text-sm text-article-white line-through'>
                  3 290 kr
                </span>
              </div>
              <Link
                href='/produkter/utekos-dun'
                className='mt-6 block w-full rounded-lg bg-white/10 py-3 text-center font-semibold text-white transition-colors hover:bg-white/20'
              >
                Kjøp Dun
              </Link>
            </div>
          </div>

          <div className='group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-green-500/30'>
            <div className='absolute right-4 top-4 z-10 rounded-full bg-neutral-800 px-3 py-1 text-xs font-bold text-white shadow-lg'>
              ALLROUNDER
            </div>

            <div className='relative aspect-square w-full overflow-hidden bg-neutral-900'>
              <Image
                src='/magasinet/comfy-front-u-bakgrunn-1080.png'
                alt='Utekos Comfyrobe'
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-105'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>

            <div className='p-6'>
              <h3 className='text-2xl font-bold'>Comfyrobe™</h3>
              <p className='mt-2 text-article-white'>
                Den ultimate skifteroben. Vindtett, vanntett og foret.
              </p>
              <div className='mt-4 flex items-baseline gap-3'>
                <span className='text-xl font-bold text-foreground'>
                  1 290 kr
                </span>
                <span className='text-sm text-article-white line-through'>
                  1 690 kr
                </span>
              </div>
              <Link
                href='/produkter/comfyrobe'
                className='mt-6 block w-full rounded-lg bg-white/10 py-3 text-center font-semibold text-white transition-colors hover:bg-white/20'
              >
                Kjøp Comfyrobe™
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='container mx-auto mt-24 px-4 mb-6'>
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold'>
            Sjekk om du kan få levering på døren
          </h2>
          <p className='mt-2 text-article-white'>
            Fyll inn adressen din i kassen. Dukker valget{' '}
            <em>Lokal levering</em> opp? Da kan du lene deg tilbake – vi fikser
            resten!
          </p>
          {/* Ny linje for henting lagt til her */}
          <p className='mt-1 text-article-white'>
            Vi tilbyr også <strong>henting hver dag mellom 08-21</strong> frem
            til lille julaften.
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          <Link
            href='/handlehjelp/teknologi-materialer'
            className='group flex flex-col items-center rounded-xl bg-white/5 p-8 text-center transition-colors hover:bg-white/10'
          >
            <div className='mb-4 rounded-full bg-red-900/20 p-4 transition-transform group-hover:scale-110'>
              <Gift className='h-8 w-8 text-red-400' />
            </div>
            <h3 className='text-lg font-semibold'>Lær mer</h3>
            <p className='text-sm text-muted-foreground'>
              Lær mer om funksjonaliteten.
            </p>
          </Link>

          <Link
            href='/kontaktskjema'
            className='group flex flex-col items-center rounded-xl bg-white/5 p-8 text-center transition-colors hover:bg-white/10'
          >
            <div className='mb-4 rounded-full bg-blue-900/20 p-4 transition-transform group-hover:scale-110'>
              <Truck className='h-8 w-8 text-blue-400' />
            </div>
            <h3 className='text-lg font-semibold'>Spørsmål om levering?</h3>
            <p className='text-sm text-muted-foreground'>Ta kontakt med oss.</p>
          </Link>

          <Link
            href='/handlehjelp/storrelsesguide'
            className='group flex flex-col items-center rounded-xl bg-white/5 p-8 text-center transition-colors hover:bg-white/10'
          >
            <div className='mb-4 rounded-full bg-green-900/20 p-4 transition-transform group-hover:scale-110'>
              <Calendar className='h-8 w-8 text-green-400' />
            </div>
            <h3 className='text-lg font-semibold'>Usikker på størrelse?</h3>
            <p className='text-sm text-muted-foreground'>
              Se vår størrelsesguide og tips.
            </p>
          </Link>
        </div>
      </section>
    </div>
  )
}
