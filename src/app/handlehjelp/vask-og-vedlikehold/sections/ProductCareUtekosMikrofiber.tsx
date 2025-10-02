import { TabsContent } from '@/components/ui/tabs'
import { CheckCircle2, Wind, XCircle } from 'lucide-react'
export function ProductCareUtekosMikrofiber() {
  return (
    <TabsContent
      value='mikrofiber'
      className='mt-6 rounded-lg bg-sidebar-foreground p-6 sm:p-8'
    >
      <h2 className='text-2xl font-semibold'>Utekos Mikrofiber™</h2>
      <p className='mt-2 text-foreground/80'>
        Mikrofiber er slitesterkt og enkelt å vedlikeholde. Følg disse rådene
        for å bevare de tekniske egenskapene.
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
          Dette plagget tørker svært raskt. Heng det opp, så er det klart til
          bruk på kort tid. Dette bevarer fibrenes struktur og ytelse best.
        </p>
      </div>
    </TabsContent>
  )
}
