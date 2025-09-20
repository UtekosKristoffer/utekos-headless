import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs' // Antatt plassering for Tabs
import { CheckCircle2, Info, Thermometer, Wind, XCircle } from 'lucide-react'
import type { Metadata } from 'next'
import type { Article, WithContext } from 'schema-dts'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Vedlikeholdsguide for Utekos | Bevar varmen og kvaliteten',
  description:
    'Ta vare på din Utekos-investering. Vår guide sikrer at du bevarer den unike komforten og varmen, slik at du kan forlenge de gode stundene ute i mange år fremover.',
  alternates: {
    canonical: '/handlehjelp/vask-og-vedlikehold'
  },
  openGraph: {
    title: 'Vedlikeholdsguide for Utekos | Bevar varmen og kvaliteten',
    description:
      'Riktig vedlikehold er nøkkelen til mange år med utekos. Se våre beste råd her.',
    url: '/handlehjelp/vask-og-vedlikehold',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-vedlikehold.jpg',
        width: 1200,
        height: 630,
        alt: 'En person som tar vare på et Utekos-plagg.'
      }
    ],
    locale: 'no_NO',
    type: 'article'
  }
}

// JSON-LD er oppdatert til å være en god, generell guide som fanger essensen for alle produktene.
const jsonLd: WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Vedlikeholdsguide for Utekos-produkter',
  'author': { '@type': 'Organization', 'name': 'Utekos' },
  'publisher': {
    '@type': 'Organization',
    'name': 'Utekos',
    'logo': {
      '@type': 'ImageObject',
      'url':
        'https://cdn.shopify.com/s/files/1/0634/2154/6744/files/utekos_black_circle_logo.png?v=1753228426'
    }
  },
  'description':
    'Lær hvordan du vasker, tørker og oppbevarer dine Utekos-plagg for å bevare den unike kvaliteten og maksimere levetiden.',
  'image': 'https://utekos.no/og-image-vedlikehold.jpg'
}

// Selve sidekomponenten, nå med Tabs for å skille mellom produktene.
export default function ProductCarePage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className='container mx-auto px-4 py-12 sm:py-16'>
        <div className='mx-auto max-w-3xl text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Ta vare på kosen
          </h1>
          <p className='mt-4 text-lg text-foreground/80'>
            Du har investert i komfort og kvalitet som er ment å vare. Med
            riktig vedlikehold sikrer du at ditt Utekos-plagg fortsetter å
            forlenge de gode stundene, år etter år.
          </p>
        </div>

        <div className='mx-auto mt-12 max-w-4xl'>
          <Tabs defaultValue='dun' className='w-full'>
            <TabsList className='grid w-full grid-cols-3 bg-sidebar-foreground'>
              <TabsTrigger value='dun'>Utekos Dun</TabsTrigger>
              <TabsTrigger value='mikrofiber'>Utekos Mikrofiber</TabsTrigger>
              <TabsTrigger value='comfyrobe'>Comfyrobe™</TabsTrigger>
            </TabsList>

            {/* INNHOLD FOR UTEKOS DUN */}
            <TabsContent
              value='dun'
              className='mt-6 rounded-lg bg-sidebar-foreground p-6 sm:p-8'
            >
              <h2 className='text-2xl font-semibold'>Utekos Dun™</h2>
              <p className='mt-2 text-foreground/80'>
                For å bevare den unike, luftige varmen i din Utekos Dun, er
                skånsom behandling nøkkelen.
              </p>
              <div className='mt-6 grid gap-6 md:grid-cols-2'>
                <div>
                  <h3 className='flex items-center gap-2 font-semibold'>
                    <CheckCircle2 className='h-5 w-5 text-green-500' /> Vask
                  </h3>
                  <ul className='mt-2 list-disc list-inside space-y-1 text-foreground/80'>
                    <li>Skånsomt program, maks 30°C.</li>
                    <li>Bruk mild såpe (helst dun-såpe).</li>
                    <li>Lukk alle glidelåser før vask.</li>
                  </ul>
                </div>
                <div>
                  <h3 className='flex items-center gap-2 font-semibold'>
                    <XCircle className='h-5 w-5 text-red-500' /> Unngå
                  </h3>
                  <ul className='mt-2 list-disc list-inside space-y-1 text-foreground/80'>
                    <li>Blekemidler og tøymykner.</li>
                    <li>Kjemisk rens (dry clean).</li>
                    <li>Stryking.</li>
                  </ul>
                </div>
              </div>
              <div className='mt-6'>
                <h3 className='flex items-center gap-2 font-semibold'>
                  <Thermometer className='h-5 w-5' /> Tørking er avgjørende for
                  dun
                </h3>
                <p className='mt-2 text-foreground/80'>
                  Bruk tørketrommel på lav varme med 2-3 tørkeballer (eller rene
                  tennisballer). Dette gjenoppretter dunets spenst. Prosessen
                  kan ta tid – sørg for at plagget er 100% gjennomtørt for å
                  unngå at dunet klumper seg.
                </p>
              </div>
              <div className='mt-6'>
                <h3 className='flex items-center gap-2 font-semibold'>
                  <Wind className='h-5 w-5' /> Oppbevaring
                </h3>
                <p className='mt-2 text-foreground/80'>
                  For langvarig lagring, heng plagget luftig. Unngå
                  kompresjonsposer over tid, da dette kan svekke spensten.
                </p>
              </div>
            </TabsContent>

            {/* INNHOLD FOR UTEKOS MIKROFIBER */}
            <TabsContent
              value='mikrofiber'
              className='mt-6 rounded-lg bg-sidebar-foreground p-6 sm:p-8'
            >
              <h2 className='text-2xl font-semibold'>Utekos Mikrofiber™</h2>
              <p className='mt-2 text-foreground/80'>
                Mikrofiber er slitesterkt og enkelt å vedlikeholde. Følg disse
                rådene for å bevare de tekniske egenskapene.
              </p>
              <div className='mt-6 grid gap-6 md:grid-cols-2'>
                <div>
                  <h3 className='flex items-center gap-2 font-semibold'>
                    <CheckCircle2 className='h-5 w-5 text-green-500' /> Vask
                  </h3>
                  <ul className='mt-2 list-disc list-inside space-y-1 text-foreground/80'>
                    <li>Skånsomt program, maks 30°C.</li>
                    <li>Bruk mild såpe.</li>
                  </ul>
                </div>
                <div>
                  <h3 className='flex items-center gap-2 font-semibold'>
                    <XCircle className='h-5 w-5 text-red-500' /> Unngå
                  </h3>
                  <ul className='mt-2 list-disc list-inside space-y-1 text-foreground/80'>
                    <li>Blekemidler og tøymykner.</li>
                    <li>Kjemisk rens og stryking.</li>
                    <li>Tørketrommel.</li>
                  </ul>
                </div>
              </div>
              <div className='mt-6'>
                <h3 className='flex items-center gap-2 font-semibold'>
                  <Wind className='h-5 w-5' /> Lufttørking er best
                </h3>
                <p className='mt-2 text-foreground/80'>
                  Dette plagget tørker svært raskt. Heng det opp, så er det
                  klart til bruk på kort tid. Dette bevarer fibrenes struktur og
                  ytelse best.
                </p>
              </div>
            </TabsContent>

            {/* INNHOLD FOR COMFYROBE */}
            <TabsContent
              value='comfyrobe'
              className='mt-6 rounded-lg bg-sidebar-foreground p-6 sm:p-8'
            >
              <h2 className='text-2xl font-semibold'>Comfyrobe™</h2>
              <p className='mt-2 text-foreground/80'>
                Ta vare på din Comfyrobe for å bevare den myke komforten og de
                beskyttende egenskapene.
              </p>
              <div className='mt-6 grid gap-6 md:grid-cols-2'>
                <div>
                  <h3 className='flex items-center gap-2 font-semibold'>
                    <CheckCircle2 className='h-5 w-5 text-green-500' /> Vask
                  </h3>
                  <ul className='mt-2 list-disc list-inside space-y-1 text-foreground/80'>
                    <li>Skånsomt program, maks 40°C.</li>
                    <li>Bruk mildt vaskemiddel.</li>
                  </ul>
                </div>
                <div>
                  <h3 className='flex items-center gap-2 font-semibold'>
                    <XCircle className='h-5 w-5 text-red-500' /> Unngå
                  </h3>
                  <ul className='mt-2 list-disc list-inside space-y-1 text-foreground/80'>
                    <li>Blekemidler.</li>
                    <li>Kjemisk rens (kan skade coating).</li>
                    <li>Stryking (kan smelte stoffet).</li>
                    <li>Høy varme i tørketrommel.</li>
                  </ul>
                </div>
              </div>
              <div className='mt-6'>
                <h3 className='flex items-center gap-2 font-semibold'>
                  <Info className='h-5 w-5' /> Etterbehandling og daglig bruk
                </h3>
                <p className='mt-2 text-foreground/80'>
                  Hvis du merker at vann ikke lenger preller av ytterstoffet,
                  kan du reaktivere DWR-behandlingen med en impregneringsspray.
                  Husk å lufte plagget godt etter bruk, spesielt om det har vært
                  i kontakt med saltvann eller klor.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}
