// Path: src/app/gaveguide/farsdag/sections/FarsdagProblemSolution.tsx

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
export function FarsdagProblemSolution() {
  return (
    <section className='flex w-full flex-col items-center border-b border-neutral-800 bg-sidebar-foreground'>
      <div className='w-full max-w-4xl px-6 py-20 sm:py-28'>
        <h2 className='text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl text-center mb-8'>
          Kjenner du deg igjen?
        </h2>

        <div className='space-y-6 text-lg leading-relaxed text-access/80'>
          <p>
            Farsdagen nærmer seg, og du leter etter den perfekte gaven til
            mannen som tilsynelatende har alt. Han trenger ikke flere ting, men
            han setter alltid pris på mer av det som virkelig betyr noe:
            kvalitetstid, komfort og kos.
          </p>

          <p className='text-xl font-semibold text-primary-foreground py-4'>
            I år kan du gi bort akkurat det.
          </p>

          <p>
            Utekos er ikke bare et plagg – det er en hygge-uniform designet for
            livsnyteren. Det er gaven som lar ham forlenge kveldene på
            hytteterrassen, holde varmen utenfor bobilen, og nyte den ekstra
            timen rundt bålpannen.
          </p>
        </div>

        <div className='flex justify-center mt-12'>
          <Link
            href='/produkter/utekos-mikrofiber'
            className='inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-500 hover:shadow-xl hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
          >
            Se årets farsdagsgave
            <ArrowRight className='h-5 w-5' />
          </Link>
        </div>
      </div>
    </section>
  )
}
