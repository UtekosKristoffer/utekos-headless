// Path: src/app/skreddersy-varmen/components/ShippingAndReturnComponent.tsx
import Link from 'next/link'
import { Truck, RefreshCcw, Store, ArrowRight } from 'lucide-react'

export function ShippingAndReturnComponent() {
  return (
    <div className='flex flex-col gap-6'>
      {/* 
        Byttet til maritime-darkest. Siden panelet bak er havdyp, vil denne 
        mørkere fargen få boksen til å se ut som et eksklusivt, innfelt glasspanel.
        Økte også rounded-lg til rounded-xl for en litt mykere, moderne look.
      */}
      <div className='rounded-xl border border-cloud-dancer/10 bg-maritime-darkest shadow-sm text-cloud-dancer'>
        <div className='grid grid-cols-1 divide-y divide-cloud-dancer/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0'>
          <div className='flex items-start gap-3 p-4'>
            {/* Byttet primary (gul) med chai-tea for en varm, gyllen og eksklusiv tone */}
            <Truck size={22} className='mt-0.5 shrink-0 text-chai-tea drop-shadow-sm' />
            <div className='min-w-0'>
              <p className='text-sm font-semibold text-cloud-dancer'>Rask levering 2–5 dager</p>
              <p className='mt-0.5 text-xs leading-snug text-cloud-dancer/70'>
                Sendes samme dag. Fri frakt på denne varen.
              </p>
            </div>
          </div>

          <div className='flex items-start gap-3 p-4'>
            <RefreshCcw size={22} className='mt-0.5 shrink-0 text-chai-tea drop-shadow-sm' />
            <div className='min-w-0'>
              <p className='text-sm font-semibold text-cloud-dancer'>14 dagers åpent kjøp</p>
              <p className='mt-0.5 text-xs leading-snug text-cloud-dancer/70'>
                Rolig returfrist når varen er ubrukt.
              </p>
            </div>
          </div>

          <div className='flex items-start gap-3 p-4'>
            <Store size={22} className='mt-0.5 shrink-0 text-chai-tea drop-shadow-sm' />
            <div className='min-w-0'>
              <p className='text-sm font-semibold text-cloud-dancer'>På lager i Bergen</p>
              <p className='mt-0.5 text-xs leading-snug text-cloud-dancer/70'>
                Også via Intersport. Norsk garanti.
              </p>
            </div>
          </div>
        </div>

        <div className='border-t border-cloud-dancer/10 px-4 py-2.5 bg-maritime-darkest/50 rounded-b-xl'>
          <Link
            href='/frakt-og-retur'
            data-track='SkreddersyVarmenFraktOgReturLink'
            // Hover-effekten trigges nå med Chai Tea i stedet for den generiske primærfargen
            className='group inline-flex items-center gap-1.5 text-xs font-medium text-cloud-dancer/60 transition-colors hover:text-chai-tea'
          >
            Alt om frakt og retur
            <ArrowRight size={12} className='transition-transform group-hover:translate-x-0.5' />
          </Link>
        </div>
      </div>
    </div>
  )
}
