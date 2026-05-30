// Path: src/app/frakt-og-retur/components/ShippingReturnsHeader.tsx
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import Link from 'next/link'

export function ShippingReturnsHeader() {
  return (
    <header className='mx-auto max-w-5xl text-center'>
      <nav
        aria-label='Brødsmule'
        className='mb-8 flex items-center justify-center gap-2 text-sm leading-[1.4]   text-maritime-darkest/80'
      >
        <Link href='/' className='hover:text-maritime-darkest/80'>
          Forsiden
        </Link>
        <span aria-hidden='true'>/</span>
        <span className='text-maritime-darkest/80'>Frakt og retur</span>
      </nav>
      <BrandBadge
        label='Fri frakt over 999 kr'
        backgroundColor='var(--ancient-water)'
        textColor='var(--maritime-darkest)'
        className='mb-6 border border-cloud-dancer/6 px-8 py-4 text-sm leading-[1.45]  '
      />
      <h1 className='text-4xl font-bold leading-[1.45]   font-google-sans text-maritime-darkest sm:text-4xl md:text-5xl lg:text-6xl'>
        Frakt og retur - enkelt og trygt
      </h1>
      <p className='mx-auto mt-4   max-w-3xl text-lg font-medium md:text-xl leading-[1.45]   text-maritime-darkest'>
        Vi ønsker at din handleopplevelse skal være like trygg og komfortabel som produktene våre. Her finner
        du alt du trenger å vite om vår levering og returprosess.
      </p>
    </header>
  )
}
