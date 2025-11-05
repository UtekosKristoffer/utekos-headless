// Path: src/app/gaveguide/farsdag/sections/FarsdagUrgencyCta.tsx

import Link from 'next/link'
import { GiftIcon, Clock } from 'lucide-react'
export function FarsdagUrgencyCta() {
  return (
    <section className='flex w-full flex-col items-center bg-sidebar-foreground border-b border-neutral-800'>
      <div className='w-full max-w-4xl px-6 py-20 text-center lg:px-8 sm:py-28'>
        <div className='inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 mb-6'>
          <Clock className='h-4 w-4 text-orange-400' />
          <span className='text-sm font-medium text-orange-400'>
            Farsdag 9. november
          </span>
        </div>

        <h2 className='text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl'>
          Ikke la den beste gaven glippe.
        </h2>

        <p className='mx-auto mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-muted-foreground'>
          Bestill nå for å være sikker på at du har den i hus i god tid før
          farsdagen.
        </p>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-10'>
          <Link
            href='/produkter/utekos-mikrofiber'
            className='group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-500 hover:shadow-xl hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
          >
            Kjøp farsdagsgaven her
            <GiftIcon className='h-5 w-5 transition-transform group-hover:scale-125' />
          </Link>
        </div>
      </div>
    </section>
  )
}
