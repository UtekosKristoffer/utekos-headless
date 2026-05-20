// Path: src/app/frakt-og-retur/components/ShippingReturnsHeader.tsx
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import Link from 'next/link'

export function ShippingReturnsHeader() {
  return (
    <header className='mx-auto max-w-5xl text-center'>
      <nav
        aria-label='Brødsmule'
        className='mb-8 flex items-center justify-center gap-2 text-sm leading-[1.4] tracking-normal text-cloud-dancer'
      >
        <Link href='/' className='hover:text-cloud-dancer'>
          Forside
        </Link>
        <span aria-hidden='true'>/</span>
        <span className='text-cloud-dancer'>Frakt og retur</span>
      </nav>
      <BrandBadge
        label='Fri frakt over 999 kr'
        backgroundColor='var(--ancient-water)'
        textColor='var(--maritime-darkest)'
        className='mb-6 border border-cloud-dancer/14 px-5 py-2 text-sm leading-[1.4] font-semibold tracking-normal'
      />
      <h1 className='text-3xl font-bold leading-[1.05] tracking-normal text-cloud-dancer sm:text-4xl'>
        Frakt og retur
      </h1>
      <p className='mx-auto mt-4 max-w-3xl text-lg leading-[1.5] tracking-normal text-cloud-dancer/80'>
        Vi ønsker at din handleopplevelse skal være like trygg og komfortabel
        som produktene våre. Her finner du alt du trenger å vite om vår levering
        og returprosess.
      </p>
    </header>
  )
}
