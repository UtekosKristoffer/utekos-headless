import { TabsContent } from '@/components/ui/tabs'
import { Wind } from 'lucide-react'
import { CareList } from './CareList'

const doItems = [
  'Vask på skånsomt program, maks 30 °C',
  'Bruk mildt vaskemiddel',
  'Heng til lufttørk på stødig henger',
  'Lukk glidelåser før vask'
] as const

const dontItems = [
  'Blekemidler og tøymykner',
  'Kjemisk rens og stryking',
  'Tørketrommel',
  'Direkte sollys over lang tid'
] as const

export function ProductCareUtekosMikrofiber() {
  return (
    <TabsContent
      value='mikrofiber'
      className='mt-8 rounded-2xl border border-maritime-darkest/10 bg-cloud-dancer/72 p-6 shadow-[0_20px_54px_-46px_color-mix(in_oklab,var(--maritime-darkest)_72%,transparent)] sm:p-8'
    >
      <h3 className='text-2xl font-semibold tracking-tight text-maritime-darkest'>
        Utekos Mikrofiber™
      </h3>
      <p className='mt-3 max-w-2xl text-base font-utekos-text leading-[1.45] text-maritime-darkest/82'>
        Slitesterkt, raskt å tørke og enkelt å vedlikeholde. Mikrofiber takler
        hverdagsbruk uten å miste form – så lenge du holder varmen unna.
      </p>
      <div className='mt-7 grid gap-5 md:grid-cols-2'>
        <CareList variant='do' title='Anbefalt' items={doItems} />
        <CareList variant='dont' title='Unngå' items={dontItems} />
      </div>
      <div className='mt-7 rounded-2xl border border-cloud-dancer/12 bg-maritime-blue p-5 text-cloud-dancer sm:p-6'>
        <div className='flex items-start gap-3'>
          <span
            aria-hidden='true'
            className='flex size-9 shrink-0 items-center justify-center rounded-full border border-cloud-dancer/22 bg-cloud-dancer text-maritime-darkest'
          >
            <Wind className='size-[1.05rem]' />
          </span>
          <div>
            <h4 className='text-base font-semibold tracking-tight text-cloud-dancer sm:text-lg'>
              Lufttørking bevarer ytelsen
            </h4>
            <p className='mt-2 text-sm leading-relaxed  font-utekos-text text-cloud-dancer/90 sm:text-base'>
              Mikrofiber tørker svært raskt på henger. Lufttørking bevarer
              fiberstrukturen og de tekniske egenskapene – tørketrommel kan
              skade fibrene over tid.
            </p>
          </div>
        </div>
      </div>
    </TabsContent>
  )
}
