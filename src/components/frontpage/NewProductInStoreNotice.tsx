// Path: src/components/sections/NewProductInStoreNotice.tsx
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import IntersportLogo from '@public/logo/Intersport_logo.svg'
import { INTERSPORT_LAKSEVAG_MAPS_URL } from '@/constants/maps'

export function NewProductInStoreNotice() {
  return (
    <section className='mt-12 w-full py-12'>
      <div className='container mx-auto max-w-6xl px-4 md:max-w-7xl'>
        <div className='relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8'>
          <div
            className='pointer-events-none absolute left-1/2 top-0 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 opacity-15 blur-3xl'
            style={{
              background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
            }}
          />

          <div className='flex flex-col items-center gap-6 text-center'>
            <div className='flex h-14 items-center justify-center rounded-xl border border-neutral-700 bg-white px-6'>
              <Image
                src={IntersportLogo}
                alt='Intersport logo'
                width={100}
                height={28}
                className='h-auto w-full max-w-[100px]'
              />
            </div>
            <h2 className='text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl'>
              På plass hos Intersport Laksevåg!
            </h2>

            <p className='max-w-5xl text-balance text-lg leading-relaxed text-access/30'>
              Nå kan du se, prøve og kjenne på vår splitter nye{' '}
              <strong>Utekos TechDown™</strong> hos våre gode venner på
              Intersport Laksevåg. Ta turen innom for å bli en av de første som
              får oppleve den neste generasjonen av Utekos!
            </p>

            <Button asChild size='lg' className='group mt-2'>
              <Link href={INTERSPORT_LAKSEVAG_MAPS_URL} target='_blank'>
                Vis vei til butikken
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
