import { TabsContent } from '@/components/ui/tabs' // Antatt plassering for Tabs
import { CheckCircle2, Info, Thermometer, Wind, XCircle } from 'lucide-react'

export function ProductCareUtekosDun() {
  return (
    <TabsContent
      value='dun'
      className='mt-6 rounded-lg bg-sidebar-foreground p-6 sm:p-8'
    >
      <h2 className='text-2xl font-semibold'>Utekos Dun™</h2>
      <p className='mt-2 text-foreground/80'>
        For å bevare den unike, luftige varmen i din Utekos Dun, er skånsom
        behandling nøkkelen.
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
          <Thermometer className='h-5 w-5' /> Tørking er avgjørende for dun
        </h3>
        <p className='mt-2 text-foreground/80'>
          Bruk tørketrommel på lav varme med 2-3 tørkeballer (eller rene
          tennisballer). Dette gjenoppretter dunets spenst. Prosessen kan ta tid
          – sørg for at plagget er 100% gjennomtørt for å unngå at dunet klumper
          seg.
        </p>
      </div>
      <div className='mt-6'>
        <h3 className='flex items-center gap-2 font-semibold'>
          <Wind className='h-5 w-5' /> Oppbevaring
        </h3>
        <p className='mt-2 text-foreground/80'>
          For langvarig lagring, heng plagget luftig. Unngå kompresjonsposer
          over tid, da dette kan svekke spensten.
        </p>
      </div>
    </TabsContent>
  )
}
