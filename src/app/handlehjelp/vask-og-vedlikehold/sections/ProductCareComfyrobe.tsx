import { TabsContent } from '@/components/ui/tabs' // Antatt plassering for Tabs
import { CheckCircle2, Info, XCircle } from 'lucide-react'

export function ProductCareComfyrobe() {
  return (
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
          Hvis du merker at vann ikke lenger preller av ytterstoffet, kan du
          reaktivere DWR-behandlingen med en impregneringsspray. Husk å lufte
          plagget godt etter bruk, spesielt om det har vært i kontakt med
          saltvann eller klor.
        </p>
      </div>
    </TabsContent>
  )
}
