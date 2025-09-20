import { BadgeCheck, Mail, Package, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import type { FAQPage, WithContext } from 'schema-dts'

// STEG 1: Optimalisert Metadata for SERP og Sosial Deling
export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Frakt og Retur | Enkel og trygg handel hos Utekos',
  description:
    'Vi tilbyr fri frakt på ordre over 999 kr og en enkel 14-dagers angrerett. Les våre fulle vilkår for en trygg og forutsigbar handleopplevelse.',
  alternates: {
    canonical: '/frakt-og-retur'
  },
  openGraph: {
    title: 'Frakt og Retur | Enkel og trygg handel hos Utekos',
    description:
      'Få svar på alt du lurer på om levering og retur. Handle trygt hos oss.',
    url: '/frakt-og-retur',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-frakt.webp',
        width: 1200,
        height: 630,
        alt: 'En Utekos-pakke klar for sending.'
      }
    ],
    locale: 'no_NO',
    type: 'website'
  }
}

// STEG 2: Strukturert Data (JSON-LD) for å vinne på kundeservice-søk
const jsonLd: WithContext<FAQPage> = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'Hva koster frakten hos Utekos?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text':
          'Vi tilbyr gratis frakt på alle bestillinger over 999 kr i hele Norge. For bestillinger under dette beløpet vil fraktkostnaden bli spesifisert i kassen.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Hvor lang er angreretten?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text':
          'Som kunde hos Utekos har du alltid 14 dagers angrerett, som gjelder fra den dagen du mottar varen din. Dette gir deg trygghet til å se og føle på produktet hjemme.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Hvordan returnerer jeg en vare?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text':
          'For å returnere en vare, send en e-post til info@utekos.no med ditt ordrenummer og informasjon om hvilke produkter det gjelder. Deretter pakker du varen forsvarlig og sender den tilbake til oss. Du er selv ansvarlig for returfrakten.'
      }
    }
  ]
}

// STEG 3: Sidekomponenten med optimalisert innhold og design
export default function ShippingAndReturnsPage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className='container mx-auto px-4 py-12 sm:py-16'>
        <div className='mx-auto max-w-5xl text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Frakt og Retur
          </h1>
          <p className='mt-4 text-lg text-foreground/80'>
            Vi ønsker at din handleopplevelse skal være like trygg og
            komfortabel som produktene våre. Her finner du alt du trenger å vite
            om vår levering og returprosess.
          </p>
        </div>

        <div className='mx-auto mt-16 max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12'>
          {/* Venstre kolonne med detaljert informasjon */}
          <article className='lg:col-span-8'>
            <div className='prose prose-invert max-w-none text-foreground/80'>
              <h2>Frakt og Levering</h2>
              <p>
                Vi sender til hele Norge. Vårt mål er å få din bestilling av
                gårde så raskt som mulig, slik at du kan starte din utekos.
              </p>
              <ul>
                <li>
                  <strong>Fri frakt:</strong> Vi spanderer frakten på alle
                  bestillinger med en verdi over 999 kr.
                </li>
                <li>
                  <strong>Leveringstid:</strong> Normal leveringstid er 2-5
                  virkedager, avhengig av hvor i landet du bor.
                </li>
                <li>
                  <strong>Sporing:</strong> Du vil motta en e-post med
                  sporingsinformasjon så snart pakken din er sendt fra vårt
                  lager.
                </li>
              </ul>

              <h2 id='retur'>Retur og Angrerett</h2>
              <p>
                Når du handler hos oss, har du ifølge norsk lov 14 dagers
                angrerett. Fristen gjelder fra dagen du mottar varen. Dette gir
                deg god tid til å kjenne på kvaliteten hjemme i dine egne
                omgivelser.
              </p>

              <h3>Slik benytter du angreretten:</h3>
              <ol>
                <li>
                  <strong>Gi oss beskjed:</strong> Send en e-post til{' '}
                  <a href='mailto:info@utekos.no'>info@utekos.no</a>. For at vi
                  skal kunne hjelpe deg raskt, ber vi deg inkludere fullt navn,
                  adresse, ordrenummer og hvilke produkter returen gjelder.
                </li>
                <li>
                  <strong>Pakk varen trygt:</strong> Du er ansvarlig for varen
                  til den når oss. Sørg for at produktene er pakket godt, helst
                  i originalemballasjen. Varen skal være i samme stand som da du
                  mottok den for full refusjon.
                </li>
                <li>
                  <strong>Send pakken:</strong> Du dekker selv kostnaden for
                  returfrakt. Vi anbefaler å bruke en sendingsmetode med
                  sporing.
                </li>
              </ol>

              <h3>Unntak fra angreretten</h3>
              <p>
                Angreretten gjelder ikke for produkter som er forseglet av
                hygieniske årsaker dersom forseglingen er brutt etter mottak.
                For våre produkter vil dette i praksis si at plagget må være
                ubrukt, uten lukt og med alle merkelapper intakt.
              </p>
            </div>
          </article>

          {/* Høyre, "sticky" kolonne med nøkkelinfo */}
          <aside className='mt-12 lg:mt-0 lg:col-span-4'>
            <div className='sticky top-28 rounded-lg bg-sidebar-foreground p-6'>
              <h3 className='text-lg font-semibold'>Dine trygghetsgarantier</h3>
              <ul className='mt-4 space-y-4'>
                <li className='flex items-start gap-3'>
                  <ShieldCheck className='h-5 w-5 flex-shrink-0 text-green-500 mt-0.5' />
                  <div>
                    <h4 className='font-medium'>14 dagers angrerett</h4>
                    <p className='text-sm text-foreground/70'>
                      Lovfestet trygghet fra du mottar varen.
                    </p>
                  </div>
                </li>
                <li className='flex items-start gap-3'>
                  <Package className='h-5 w-5 flex-shrink-0 text-foreground/80 mt-0.5' />
                  <div>
                    <h4 className='font-medium'>Fri frakt over 999 kr</h4>
                    <p className='text-sm text-foreground/70'>
                      Vi spanderer frakten på større bestillinger.
                    </p>
                  </div>
                </li>
                <li className='flex items-start gap-3'>
                  <BadgeCheck className='h-5 w-5 flex-shrink-0 text-foreground/80 mt-0.5' />
                  <div>
                    <h4 className='font-medium'>Enkel returprosess</h4>
                    <p className='text-sm text-foreground/70'>
                      Bare send oss en e-post, så er du i gang.
                    </p>
                  </div>
                </li>
              </ul>
              <div className='mt-6 border-t border-white/10 pt-6'>
                <h4 className='font-medium'>Har du spørsmål?</h4>
                <p className='text-sm text-foreground/70 mt-1 mb-3'>
                  Vårt kundeserviceteam er klare til å hjelpe deg.
                </p>
                <Link
                  href='/kontaktskjema'
                  className='inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 w-full'
                >
                  <Mail className='mr-2 h-4 w-4' /> Kontakt oss
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  )
}
