// Path: src/components/frontpage/PromiseSection.tsx

import { GridCross } from '@/components/legal/GridCross'
import { ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { ThermometerIcon } from 'lucide-react'
import Image from 'next/image'
import KvamskogenPic from '@public/kvamskogen_1.webp'

export function PromiseSection() {
  return (
    <section className='py-16 mx-auto max-w-[95%] md:max-w-7xl sm:py-24'>
      <div className='mx-auto'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16'>
          {/* Venstre kolonne: Bilde */}
          <div className='flex items-center justify-center rounded-xl border border-neutral-800 p-2'>
            <div className='overflow-hidden rounded-lg'>
              <Image
                src={KvamskogenPic}
                alt='Bilde av en gjeng som bruker Utekos-plagg i snørike omgivelser.'
                width={1024}
                height={623}
                className='size-full object-cover'
              />
            </div>
          </div>

          {/* Høyre kolonne: Tekst */}
          <div className='relative overflow-hidden rounded-xl border border-neutral-800 bg-sidebar-foreground p-8 lg:p-12'>
            <div
              className='absolute inset-0 z-0 opacity-20'
              style={{
                backgroundImage: `
              repeating-linear-gradient(to right, var(--color-border), var(--color-border) 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(to bottom, var(--color-border), var(--color-border) 1px, transparent 1px, transparent 40px)
            `,
                maskImage:
                  'linear-gradient(to bottom, white 50%, transparent 100%)'
              }}
            />

            <div className='relative z-10 flex h-full flex-col justify-center'>
              <GridCross className='absolute top-0 right-0 h-8 w-8 -translate-y-1/2 translate-x-1/2' />

              <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
                Vårt løfte
              </h2>

              <div className='mt-6 space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400'>
                    <ThermometerIcon className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='font-semibold'>Umiddelbar varme</h3>
                    <p className='mt-1 text-muted-foreground'>
                      Nøye utvalgte materialer gir en umiddelbar følelse av
                      varme og velvære.
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink-500/10 text-pink-400'>
                    <ClockIcon className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='font-semibold'>Forlengede øyeblikk</h3>
                    <p className='mt-1 text-muted-foreground'>
                      Designet slik at du kan nyte de gode stundene lenger, uten
                      å tenke på kulden.
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-400'>
                    <ShieldCheckIcon className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='font-semibold'>En varig investering</h3>
                    <p className='mt-1 text-muted-foreground'>
                      Se på det som en slitesterk og varig investering i din
                      egen hygge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
