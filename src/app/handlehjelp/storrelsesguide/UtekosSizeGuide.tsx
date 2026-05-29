import { StretchHorizontal, Shrink, GitCommitVertical } from 'lucide-react'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
import { utekosData } from './data'

const features = [
  {
    Icon: StretchHorizontal,
    title: 'Snorstramming i livet',
    description: 'Skap en mer definert silhuett eller steng varmen inne for en lunere følelse.'
  },
  {
    Icon: Shrink,
    title: 'Snorstramming nederst',
    description: 'Eliminer trekk fra bakken på kalde dager og forsegl komforten fullstendig.'
  },
  {
    Icon: GitCommitVertical,
    title: 'Toveis YKK®-glidelås',
    description: 'Åpne nedenfra for full bevegelsesfrihet, eller ovenfra for å slippe ut overskuddsvarme.'
  }
]

export function UtekosSizeGuide() {
  return (
    <section id='utekos-size-guide' className='scroll-mt-28'>
      <div className='bg-overcast text-maritime-darkest'>
        <div className='container mx-auto px-4 py-16 sm:py-24 text-center'>
          <div className='max-w-4xl mx-auto'>
            <BrandBadge
              label='Dun og mikrofiber'
              backgroundColor='var(--havdyp)'
              textColor='var(--cloud-dancer)'
              className='mb-5 px-4 py-2 text-sm'
            />
            <h2 className='text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl'>
              <span className='inline-flex items-baseline'>
                <UtekosWordmark
                  aria-hidden='true'
                  focusable='false'
                  className='inline-block h-[0.82em] w-auto translate-y-[0.06em] align-baseline text-maritime-darkest'
                />
                <span className='sr-only'>Utekos</span>
              </span>{' '}
              - en unik tilnærming til passform
            </h2>
            <p className='mx-auto mt-5 max-w-2xl utekos-section-lead text-maritime-darkest/90'>
              Mer enn bare en størrelse – en garanti for komfort gjennom suveren tilpasningsevne.
            </p>
          </div>

          <div className='mt-12 max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto text-lg leading-[1.45] brand-tracking-normal text-left space-y-6 text-maritime-darkest'>
            <p>
              Vi har designet Utekos Dun og Mikrofiber med en unik filosofi: ultimat komfort gjennom suveren
              tilpasningsevne. Du vil legge merke til at spranget fra Medium til Large er betydelig – dette er
              helt bevisst. Målet er ikke at du skal finne en størrelse som <em>nesten</em> passer, men en som
              du kan forme nøyaktig slik du vil ha den, uansett anledning.
            </p>
            <p>
              Hemmeligheten ligger i de smarte justeringsmulighetene som lar deg skreddersy passformen etter
              vær, antrekk og humør.
            </p>
          </div>

          <div className='mt-16 grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-2 max-w-5xl mx-auto'>
            <div className='rounded-lg border border-cloud-dancer/12 bg-havdyp text-cloud-dancer p-6 text-left shadow-[0_18px_46px_-38px_color-mix(in_oklab,var(--maritime-darkest)_90%,transparent)] sm:p-8'>
              <h3 className='text-xl font-semibold leading-7'>Velg Medium hvis...</h3>
              <ul className='mt-4 list-disc list-inside space-y-2 text-cloud-dancer'>
                <li>Du er opptil ca. 180 cm høy.</li>
                <li>Du ønsker en passform som er generøs og romslig, men som følger kroppen din tettere.</li>
                <li>Du ser for deg å bruke den over lettere klær som en genser eller t-skjorte.</li>
              </ul>
            </div>
            <div className='rounded-lg border tekst-base border-cloud-dancer/12 bg-havdyp p-6 text-cloud-dancer text-left shadow-[0_18px_46px_-38px_color-mix(in_oklab,var(--maritime-darkest)_90%,transparent)] sm:p-8'>
              <h3 className='text-xl font-semibold leading-7'>Velg Large hvis...</h3>
              <ul className='mt-4 list-disc list-inside space-y-2 text-cloud-dancer'>
                <li>Du er over 180 cm høy, eller bevisst ønsker en overdimensjonert følelse.</li>
                <li>Du vil ha maksimal plass til tykke lag med klær under, som en boblejakke.</li>
                <li>Du elsker tanken på å kunne trekke den helt ned over beina for en full kokong-effekt.</li>
              </ul>
            </div>
          </div>

          <div className='mt-20 max-w-4xl mx-auto'>
            <h3 className='text-2xl font-bold tracking-tight sm:text-3xl'>Skapt for å tilpasses deg</h3>
            <div className='mt-8 grid grid-cols-1 gap-12 sm:grid-cols-3'>
              {features.map(feature => (
                <div key={feature.title} className='flex flex-col items-center gap-4'>
                  <div className='flex size-12 items-center justify-center rounded-full bg-primary-button text-maritime-darkest'>
                    <feature.Icon className='size-6' aria-hidden='true' />
                  </div>
                  <div className='text-center'>
                    <p className='font-semibold'>{feature.title}</p>
                    <p className='mt-1 text-sm text-maritime-darkest/74'>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-20 flow-root'>
            <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                <div className='overflow-hidden rounded-lg border border-cloud-dancer/12 shadow-[0_22px_54px_-42px_color-mix(in_oklab,var(--maritime-darkest)_90%,transparent)]'>
                  <table className='min-w-full divide-y divide-cloud-dancer/12 bg-cloud-dancer'>
                    <thead className='bg-havdyp text-cloud-dancer'>
                      <tr>
                        <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6'>
                          Måling
                        </th>
                        <th scope='col' className='px-3 py-3.5 text-center text-sm font-semibold'>
                          Medium
                        </th>
                        <th scope='col' className='px-3 py-3.5 text-center text-sm font-semibold'>
                          Large
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-cloud-dancer/12'>
                      {utekosData.map(item => (
                        <tr key={item.measurement} className='hover:bg-cloud-dancer/50 transition-colors'>
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm text-left font-semibold text-maritime-darkest sm:pl-6'>
                            {item.measurement}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm font-medium text-maritime-darkest text-center'>
                            {item.m}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm font-medium text-maritime-darkest text-center'>
                            {item.l}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
