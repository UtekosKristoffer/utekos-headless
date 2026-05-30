import Link from 'next/link'
import { Truck, RefreshCcw, Store, ArrowRight } from 'lucide-react'

export function ShippingAndReturnComponent() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='rounded-lg border border-cloud-dancer/15 bg-havdyp text-cloud-dancer'>
        <div className='grid grid-cols-1 divide-y divide-cloud-dancer/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0'>
          <div className='flex items-start gap-3 p-4'>
            <Truck size={22} className='mt-0.5 shrink-0 text-primary' />
            <div className='min-w-0'>
              <p className='text-sm font-semibold text-cloud-dancer'>Rask levering 2–5 dager</p>
              <p className='mt-0.5 text-xs leading-snug text-cloud-dancer/75'>
                Sendes samme dag. Fri frakt på denne varen.
              </p>
            </div>
          </div>

          <div className='flex items-start gap-3 p-4'>
            <RefreshCcw size={22} className='mt-0.5 shrink-0 text-primary' />
            <div className='min-w-0'>
              <p className='text-sm font-semibold text-cloud-dancer'>14 dagers åpent kjøp</p>
              <p className='mt-0.5 text-xs leading-snug text-cloud-dancer/75'>
                Rolig returfrist når varen er ubrukt.
              </p>
            </div>
          </div>

          <div className='flex items-start gap-3 p-4'>
            <Store size={22} className='mt-0.5 shrink-0 text-primary' />
            <div className='min-w-0'>
              <p className='text-sm font-semibold text-cloud-dancer'>På lager i Bergen</p>
              <p className='mt-0.5 text-xs leading-snug text-cloud-dancer/75'>
                Også via Intersport. Norsk garanti.
              </p>
            </div>
          </div>
        </div>

        <div className='border-t border-cloud-dancer/15 px-4 py-2.5'>
          <Link
            href='/frakt-og-retur'
            data-track='SkreddersyVarmenFraktOgReturLink'
            className='group inline-flex items-center gap-1.5 text-xs font-medium text-cloud-dancer/80 transition-colors hover:text-primary'
          >
            Alt om frakt og retur
            <ArrowRight size={12} className='transition-transform group-hover:translate-x-0.5' />
          </Link>
        </div>
      </div>
    </div>
  )
}
