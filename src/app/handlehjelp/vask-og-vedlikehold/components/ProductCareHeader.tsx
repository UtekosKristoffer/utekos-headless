import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'

export function ProductCareHeader() {
  return (
    <header className='mx-auto max-w-3xl'>
      <nav aria-label='Brødsmulesti' className='mb-8'>
        <ol className='flex flex-wrap items-center gap-1.5 text-sm text-maritime-darkest/70'>
          <li>
            <Link href='/' className='underline-offset-4 transition-colors hover:text-havdyp hover:underline'>
              Forsiden
            </Link>
          </li>
          <li aria-hidden='true'>
            <ChevronRight className='size-4' />
          </li>
          <li>
            <Link
              href='/handlehjelp/vask-og-vedlikehold'
              className='underline-offset-4 transition-colors hover:text-havdyp hover:underline'
            >
              Handlehjelp
            </Link>
          </li>
          <li aria-hidden='true'>
            <ChevronRight className='size-4' />
          </li>
          <li aria-current='page' className='text-maritime-darkest'>
            Vask og vedlikehold
          </li>
        </ol>
      </nav>

      <div className='text-center'>
        <BrandBadge
          label='Handlehjelp'
          backgroundColor='var(--cloud-dancer)'
          textColor='var(--maritime-darkest)'
          className='mb-4 px-4 py-2 text-sm'
        />
        <h1 className='text-3xl font-bold leading-[1.05] tracking-tight text-maritime-darkest sm:text-5xl'>
          Bevar varmen i din{' '}
          <span className='inline-flex items-baseline'>
            <UtekosWordmark
              aria-hidden='true'
              focusable='false'
              className='inline-block h-[0.72em] w-auto translate-y-[0.06em] align-baseline text-maritime-darkest'
            />
            <span className='sr-only'>Utekos</span>
          </span>
        </h1>
        <p className='mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-maritime-darkest/82'>
          Du har investert i komfort og kvalitet som er ment å vare. Med riktig vedlikehold bevarer du varmen,
          formen og isolasjonsevnen – og forlenger de gode stundene ute i mange år fremover.
        </p>
      </div>
    </header>
  )
}
