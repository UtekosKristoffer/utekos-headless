import Link from 'next/link'

export function FarsdagUrgencyCta() {
  return (
    <section className='flex w-full flex-col items-center bg-sidebar-foreground border-b border-neutral-800'>
      <div className='w-full max-w-4xl px-6 py-16 text-center lg:px-8 sm:py-24'>
        <h2 className='text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl'>
          Ikke la den beste gaven glippe.
        </h2>
        <p className='mx-auto mt-4 max-w-xl text-lg leading-8 text-muted-foreground'>
          Bestill nå for å være sikker på at du har den i hus i god tid.
        </p>
        <div className='mt-10'>
          <Link
            href='#produkter'
            className='rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
          >
            Kjøp farsdagsgaven her
          </Link>
        </div>
      </div>
    </section>
  )
}
