import { TabsContent } from '@/components/ui/tabs'
import { Droplets } from 'lucide-react'
import { CareList } from './CareList'

const doItems = [
  'Skånsomt program, maks 40 °C',
  'Bruk mildt vaskemiddel',
  'Lufttørk eller lav varme i tørketrommel',
  'Lufte plagget godt etter bruk'
] as const

const dontItems = [
  'Blekemidler og tøymykner',
  'Kjemisk rens (kan skade DWR-coating)',
  'Stryking (kan smelte stoffet)',
  'Høy varme i tørketrommel'
] as const

export function ProductCareComfyrobe() {
  return (
    <TabsContent
      value='comfyrobe'
      className='mt-8 rounded-2xl border border-background/10 bg-cloud-dancer/72 p-6 shadow-[0_20px_54px_-46px_color-mix(in_oklab,var(--background)_72%,transparent)] sm:p-8'
    >
      <h3 className='text-2xl font-semibold   text-background'>Comfyrobe™</h3>
      <p className='mt-3 max-w-2xl text-base   leading-text-paragraph text-background/82'>
        Comfyrobe kombinerer myk komfort med beskyttende DWR-behandling. Riktig pleie bevarer både følelsen
        mot huden og evnen til å holde vann unna.
      </p>

      <div className='mt-7 grid gap-5 md:grid-cols-2'>
        <CareList variant='do' title='Anbefalt' items={doItems} />
        <CareList variant='dont' title='Unngå' items={dontItems} />
      </div>

      <div className='mt-7 rounded-2xl border border-cloud-dancer/12 bg-havdyp p-5 text-foreground sm:p-6'>
        <div className='flex items-start gap-3'>
          <span
            aria-hidden='true'
            className='flex size-9 shrink-0 items-center justify-center rounded-full border border-cloud-dancer/22 bg-cloud-dancer text-background'
          >
            <Droplets className='size-[1.05rem]' />
          </span>
          <div>
            <h4 className='text-base font-semibold   text-foreground sm:text-lg'>
              Frisk opp DWR-behandlingen
            </h4>
            <p className='mt-2 text-sm leading-relaxed    text-foreground/90 sm:text-base'>
              Hvis vann ikke lenger preller av ytterstoffet, kan du reaktivere DWR-behandlingen med en
              impregneringsspray. Lav varme i tørketrommel etterpå låser behandlingen. Husk å lufte plagget
              godt etter kontakt med saltvann eller klor.
            </p>
          </div>
        </div>
      </div>
    </TabsContent>
  )
}
