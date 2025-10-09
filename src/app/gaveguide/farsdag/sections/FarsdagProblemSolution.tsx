import Link from 'next/link'

export function FarsdagProblemSolution() {
  return (
    <section className='flex w-full flex-col items-center border-b border-neutral-800 bg-sidebar-foreground'>
      <div className='w-full max-w-4xl px-6 py-16 text-center lg:px-8 sm:py-24'>
        <h2 className='text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl'>
          Kjenner du deg igjen?
        </h2>
        <div className='prose prose-lg mx-auto mt-6 text-muted-foreground'>
          <p>
            Farsdagen nærmer seg, og du leter etter den perfekte gaven til
            mannen som tilsynelatende har alt. Han trenger ikke flere ting, men
            han setter alltid pris på mer av det som virkelig betyr noe:
            kvalitetstid, komfort og kos.
          </p>
          <p className='font-semibold text-primary-foreground'>
            I år kan du gi bort akkurat det.
          </p>
          <p>
            Utekos er ikke bare et plagg – det er en ‘hygge-uniform’ designet
            for livsnyteren. Det er gaven som lar ham forlenge kveldene på
            hytteterrassen, holde varmen utenfor bobilen, og nyte den ekstra
            timen rundt bålpannen.
          </p>
        </div>
        <div className='mt-10'>
          <Link
            href='/produkter'
            className='rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
          >
            Se årets farsdagsgave
          </Link>
        </div>
      </div>
    </section>
  )
}
