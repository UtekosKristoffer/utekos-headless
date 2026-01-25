// Path: src/app/kampanje/subscribers/page.tsx
import { getProductAction } from '@/api/lib/products/actions'
import { CampaignProductDisplay } from './CampaignProductDisplay'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link' // NY IMPORT
import { Button } from '@/components/ui/button' // NY IMPORT
import {
  Droplets,
  Gift,
  ShieldCheck,
  Star,
  Wind,
  ArrowRight
} from 'lucide-react' // NY IMPORT (ArrowRight)

export const metadata: Metadata = {
  title: 'Eksklusivt tilbud på Comfyrobe!',
  description:
    'Kun for våre email subscribers: Få Utekos Comfyrobe til en uslåelig pris. Takk for at du følger oss!',
  robots: {
    index: false,
    follow: false
  }
}

const PRODUCT_HANDLE = 'comfyrobe'
const DISCOUNT_CODE = 'COMFYMEDLEMSRABATT'
const CAMPAIGN_PRICE = 890

// Hardkodede anmeldelser for sosialt bevis
const testimonials = [
  {
    name: 'Anne O.',
    review:
      'Perfekt etter etter bading! Stor, varm og utrolig komfortabel. Elsker min Comfyrobe™.'
  },
  {
    name: 'Markus T.',
    review: 'Utrolig myk og varm. Anbefales på det sterkeste.'
  },
  {
    name: 'Silje B.',
    review:
      'Jeg bor praktisk talt i denne. Kvaliteten er fantastisk, og den tørker overraskende fort. Verdt hver eneste krone.'
  }
]

export default async function CampaignSubscriberPage() {
  const product = await getProductAction(PRODUCT_HANDLE)

  if (!product) {
    notFound()
  }

  return (
    <main className='bg-background text-foreground'>
      <section className='container mx-auto px-4 pt-16 sm:pt-24'>
        {/* Hero Seksjon */}
        <div className='text-center mb-16 max-w-3xl mx-auto'>
          <div className='inline-flex items-center gap-2 bg-emerald-900/50 text-emerald-300 rounded-full px-4 py-1.5 mb-4 text-sm font-medium'>
            <Gift className='w-4 h-4' />
            <span>Eksklusivt for våre abonnenter</span>
          </div>
          <h1 className='mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-300'>
            En spesiell takk til deg!
          </h1>
          <p className='mt-5 max-w-2xl mx-auto text-xl text-neutral-400'>
            Som en av våre lojale følgere, gir vi deg et unikt tilbud på vår
            ultimate allværsrobe: Utekos Comfyrobe™.
          </p>
        </div>
        <div className='pb-24'>
          <CampaignProductDisplay
            product={product}
            discountCode={DISCOUNT_CODE}
            campaignPrice={CAMPAIGN_PRICE}
          />
        </div>
      </section>
      <section className='bg-foreground/5 py-20'>
        <div className='container mx-auto px-4'>
          <div className='text-center max-w-2xl mx-auto mb-12'>
            <h2 className='text-3xl font-bold tracking-tight'>
              Tøff mot været, komfortabel for deg
            </h2>
            <p className='mt-4 text-lg text-neutral-400'>
              Comfyrobe™ er bygget for å levere kompromissløs varme og
              beskyttelse, uansett elementene.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            <div className='bg-foreground/5 p-8 rounded-xl'>
              <div className='flex items-center gap-3 mb-4'>
                <ShieldCheck className='w-8 h-8 text-emerald-400' />
                <h3 className='text-xl font-semibold'>Vanntett og vindtett</h3>
              </div>
              <p className='text-neutral-400'>
                Et robust HydroGuard™-ytterstoff med 8000mm vannsøyle og tapede
                sømmer stenger regn og vind ute, mens den pustende membranen
                forhindrer en klam følelse.
              </p>
            </div>
            <div className='bg-foreground/5 p-8 rounded-xl'>
              <div className='flex items-center gap-3 mb-4'>
                <Droplets className='w-8 h-8 text-sky-400' />
                <h3 className='text-xl font-semibold'>
                  Varm og fuktabsorberende
                </h3>
              </div>
              <p className='text-neutral-400'>
                Tykt SherpaCore™ fôr i syntetisk lammeull gir umiddelbar varme
                og absorberer effektivt fukt fra kroppen – perfekt etter isbad
                eller en tur i regnet.
              </p>
            </div>
            <div className='bg-foreground/5 p-8 rounded-xl'>
              <div className='flex items-center gap-3 mb-4'>
                <Wind className='w-8 h-8 text-neutral-300' />
                <h3 className='text-xl font-semibold'>Gjennomtenkt design</h3>
              </div>
              <p className='text-neutral-400'>
                Romslig hette, toveis YKK®-glidelås, dype fôrede lommer og
                splitt bak for full bevegelsesfrihet. Hver detalj er designet
                for maksimal funksjon og komfort.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <div className='text-center max-w-2xl mx-auto mb-12'>
            <h2 className='text-3xl font-bold tracking-tight'>
              Fornøyde kunder sier sitt
            </h2>
            <p className='mt-4 text-lg text-neutral-400'>
              Du er ikke alene om å elske Comfyrobe™.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className='bg-foreground/5 p-8 rounded-xl flex flex-col'
              >
                <div className='flex text-yellow-400 mb-4'>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className='w-5 h-5 fill-current' />
                  ))}
                </div>
                <p className='text-neutral-300 flex-grow'>
                  {testimonial.review}
                </p>
                <p className='mt-6 font-bold text-white'>
                  - {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id='størrelsesguide'
        className='bg-foreground/5 py-20 scroll-mt-20'
      >
        <div className='container mx-auto px-4 max-w-4xl'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold tracking-tight'>
              Finn din perfekte passform
            </h2>
            <p className='mt-4 text-lg text-neutral-400 max-w-2xl mx-auto'>
              Comfyrobe™ har en romslig unisex-passform. Den er bevisst
              designet for å passe over andre klær.
            </p>
          </div>
          <div className='overflow-x-auto rounded-lg border border-white/10'>
            <table className='w-full text-left text-sm'>
              <thead className='bg-white/5 text-xs uppercase tracking-wider'>
                <tr>
                  <th className='px-6 py-3'>Måling</th>
                  <th className='px-6 py-3 text-center'>XS/S</th>
                  <th className='px-6 py-3 text-center'>M/L</th>
                  <th className='px-6 py-3 text-center'>L/XL</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-white/10'>
                {[
                  { m: 'Total lengde', v: ['97 cm', '105 cm', '113 cm'] },
                  { m: 'Bredde over bryst', v: ['65 cm', '71 cm', '77 cm'] },
                  { m: 'Ermelengde', v: ['57 cm', '63 cm', '66 cm'] }
                ].map(row => (
                  <tr key={row.m}>
                    <td className='px-6 py-4 font-medium'>{row.m}</td>
                    <td className='px-6 py-4 text-center text-neutral-400'>
                      {row.v[0]}
                    </td>
                    <td className='px-6 py-4 text-center text-neutral-400'>
                      {row.v[1]}
                    </td>
                    <td className='px-6 py-4 text-center text-neutral-400'>
                      {row.v[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className='text-center mt-8 text-neutral-400 text-sm'>
            Tips: Velg din normale størrelse for en romslig passform, eller gå
            opp en størrelse for en bevisst overdimensjonert stil med plass til
            tykke lag under.
          </p>
        </div>
      </section>

      <section className='py-24 bg-background'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-2xl font-bold mb-8 tracking-tight'>
            Vil du se flere bilder og detaljer?
          </h2>
          <Button asChild size='lg' className='text-lg h-14 px-8 rounded-full'>
            <Link href={`/produkter/${PRODUCT_HANDLE}`}>
              Se produktside
              <ArrowRight className='ml-2 w-5 h-5' />
            </Link>
          </Button>
        </div>
      </section>

      <section className='border-t border-white/10'>
        <div className='container text-center max-w-3xl mx-auto py-12 text-neutral-500'>
          <h3 className='text-lg font-semibold text-neutral-300 mb-4'>
            Betingelser for tilbudet
          </h3>
          <p className='text-sm leading-relaxed'>
            Tilbudet gjelder så lenge lageret rekker. Rabattkoden{' '}
            <span className='font-mono bg-neutral-700 text-neutral-200 py-0.5 px-1.5 rounded-md text-xs'>
              {DISCOUNT_CODE}
            </span>{' '}
            blir automatisk lagt til i handlekurven. Frakt på 99,- tilkommer, da
            tilbudsprisen er under vår grense for fri frakt (999,-). Tilbudet er
            personlig og kan ikke kombineres med andre rabatter.
          </p>
        </div>
      </section>
    </main>
  )
}
