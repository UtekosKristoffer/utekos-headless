import { TabsContent } from '@/components/ui/tabs'
import { Thermometer, Wind } from 'lucide-react'
import { CareList } from './CareList'
import { DOWN_DO_ITEMS, DOWN_DONT_ITEMS } from '../constants'

export function ProductCareUtekosDun() {
  return (
    <TabsContent
      value='dun'
      className='mt-8 rounded-2xl border border-maritime-darkest/10 bg-cloud-dancer/72 p-6 shadow-[0_20px_54px_-46px_color-mix(in_oklab,var(--maritime-darkest)_72%,transparent)] sm:p-8'
    >
      <h3 className='text-2xl font-semibold   text-maritime-darkest'>Utekos Dun™</h3>
      <p className='mt-3 max-w-2xl text-base   leading-[1.45] text-maritime-darkest/82'>
        Skånsom behandling bevarer den luftige varmen. Dun er et naturmateriale som belønner tålmodighet – og
        straffer hastverk.
      </p>

      <div className='mt-7 grid gap-5 md:grid-cols-2'>
        <CareList variant='do' title='Anbefalt' items={DOWN_DO_ITEMS} />
        <CareList variant='dont' title='Unngå' items={DOWN_DONT_ITEMS} />
      </div>

      <div className='mt-7 rounded-2xl border border-cloud-dancer/12 bg-havdyp p-5 text-cloud-dancer sm:p-6'>
        <div className='flex items-start gap-3'>
          <span
            aria-hidden='true'
            className='flex size-9 shrink-0 items-center justify-center rounded-full border border-cloud-dancer/22 bg-cloud-dancer text-maritime-darkest'
          >
            <Thermometer className='size-[1.05rem]' />
          </span>
          <div>
            <h4 className='text-base font-semibold   text-cloud-dancer sm:text-lg'>Tørking er avgjørende</h4>
            <p className='mt-2 text-sm leading-relaxed    text-cloud-dancer/90 sm:text-base'>
              Bruk tørketrommel på lav varme med to-tre tørkeballer eller rene tennisballer. Ballene
              gjenoppretter dunets spenst ved å løse opp klumper underveis. Avbryt syklusen et par ganger og
              rist plagget – plagget skal være 100 % gjennomtørt før det legges bort.
            </p>
          </div>
        </div>
      </div>

      <div className='mt-5 rounded-2xl border border-maritime-darkest/10 bg-[color-mix(in_oklab,var(--ancient-water)_54%,var(--cloud-dancer)_46%)] p-5 text-maritime-darkest sm:p-6'>
        <div className='flex items-start gap-3'>
          <span
            aria-hidden='true'
            className='flex size-9 shrink-0 items-center justify-center rounded-full border border-havdyp/28 bg-havdyp text-cloud-dancer'
          >
            <Wind className='size-[1.05rem]' />
          </span>
          <div>
            <h4 className='text-base font-semibold   text-maritime-darkest sm:text-lg'>
              Oppbevaring mellom sesongene
            </h4>
            <p className='mt-2 text-sm leading-relaxed    text-maritime-darkest/82 sm:text-base'>
              Heng plagget luftig på en stødig henger. Dunet trenger luft for å bevare spensten som gir
              varmen. Kompresjonsposer over tid svekker isolasjonsevnen.
            </p>
          </div>
        </div>
      </div>
    </TabsContent>
  )
}
