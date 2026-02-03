import { Ruler } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { SizeFeature } from './SizeFeature'
import { TableRow } from './TableRow'

export function SizeGuideTable() {
  return (
    <section
      className='w-full bg-[#1F2421] py-24 border-t border-[#F4F1EA]/5'
      id='size-guide'
    >
      <div className='max-w-5xl mx-auto px-6'>
        <div className='text-center mb-12'>
          <h3 className='font-serif text-3xl text-[#F4F1EA] mb-4'>
            Skapt for å tilpasses deg
          </h3>
          <p className='text-[#F4F1EA]/70 max-w-2xl mx-auto'>
            Mer enn bare en størrelse – en garanti for komfort. Vi har designet
            spranget mellom Medium og Large bevisst stort, slik at du kan velge
            basert på hvor mye kokong-følelse du ønsker.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center'>
          <SizeFeature
            title='Snorstramming i livet'
            desc='Skap en mer definert silhuett eller steng varmen inne for en lunere følelse.'
          />
          <SizeFeature
            title='Snorstramming nederst'
            desc='Eliminer trekk fra bakken på kalde dager og forsegl komforten fullstendig.'
          />
          <SizeFeature
            title='Toveis YKK®-glidelås'
            desc='Åpne nedenfra for full bevegelsesfrihet, eller ovenfra for å slippe ut overskuddsvarme.'
          />
        </div>
        <div className='max-w-3xl mx-auto'>
          <Accordion
            type='single'
            collapsible
            className='w-full bg-[#2C2420]/30 border border-[#F4F1EA]/10 rounded-xl px-2 md:px-6'
          >
            <AccordionItem value='size-table' className='border-none'>
              <AccordionTrigger className='text-[#F4F1EA] hover:text-[#E07A5F] hover:no-underline py-6 text-lg justify-center font-medium transition-colors'>
                <span className='flex items-center gap-3'>
                  <Ruler size={20} className='text-[#E07A5F]' />
                  Se størrelsestabell
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className='relative w-full overflow-hidden rounded-lg border border-[#F4F1EA]/5 bg-[#2C2420]/40 mb-6 mt-2'>
                  <div className='overflow-x-auto'>
                    <table className='w-full text-left border-collapse'>
                      <thead>
                        <tr className='border-b border-[#F4F1EA]/10 bg-[#2C2420]/60'>
                          <th className='p-4 md:p-6 text-[#F4F1EA] font-medium'>
                            Måling
                          </th>
                          <th className='p-4 md:p-6 text-[#F4F1EA] font-medium w-32 md:w-48'>
                            Medium
                          </th>
                          <th className='p-4 md:p-6 text-[#F4F1EA] font-medium w-32 md:w-48'>
                            Large
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-[#F4F1EA]/5 text-[#F4F1EA]/80 text-sm md:text-base'>
                        <TableRow
                          label='Total lengde (nakke til bunn)'
                          m='170 cm'
                          l='200 cm'
                        />
                        <TableRow
                          label='Brystvidde (flatmål)'
                          m='85 cm'
                          l='100 cm'
                        />
                        <TableRow
                          label='Armlengde (fra senter nakke)'
                          m='85 cm'
                          l='100 cm'
                        />
                        <TableRow
                          label='Bredde nederst (flatmål)'
                          m='66 cm'
                          l='75 cm'
                        />
                        <TableRow
                          label='Lengde på glidelås (V-hals)'
                          m='73 cm'
                          l='85.5 cm'
                        />
                        <TableRow label='Høyde på hette' m='35 cm' l='35 cm' />
                        <TableRow
                          label='Høyde på baklomme'
                          m='42 cm'
                          l='42 cm'
                        />
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
