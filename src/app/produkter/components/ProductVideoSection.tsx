import { Button } from '@/components/ui/button'
import { ArrowRight, Sun, Layers } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'
import { cacheLife } from 'next/cache'
import { ProductVideoPlayer } from './video/ProductVideoPlayer'

const VIDEO_URL = 'https://utekos.no/videos/TensorPix2.mp4'
const VIDEO_POSTER = 'https://utekos.no/images/video-poster.jpg'

export async function ProductVideoSection() {
  'use cache'
  cacheLife('days')

  return (
    <section className='bg-neutral-950 py-16 sm:py-24'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 items-center gap-x-12 gap-y-16 lg:grid-cols-2'>
          <div className='mx-auto max-w-sm w-full'>
            <div className='rounded-3xl border-4 border-neutral-700 bg-black p-2 shadow-2xl shadow-cyan-500/10'>
              <ProductVideoPlayer src={VIDEO_URL} poster={VIDEO_POSTER} />
            </div>
          </div>

          <div className='text-center lg:text-left'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Slutt å fryse. Begynn å nyte.
            </h2>
            <p className='mt-6 text-lg text-neutral-300'>
              Er du lei av å la kulden ødelegge de gode øyeblikkene ute? Enten
              du er på fjellet, i hagen, på hytten eller i båten, er Utekos
              løsningen som holder deg varm og komfortabel, uansett.
            </p>
            <div className='mt-8 flex flex-col items-center gap-y-4 text-left sm:flex-row sm:justify-center sm:gap-x-8 lg:justify-start'>
              <div className='flex items-center gap-3'>
                <Sun className='h-5 w-5 text-sky-800 flex-shrink-0' />
                <span>Holder deg garantert varm</span>
              </div>
              <div className='flex items-center gap-3'>
                <Layers className='h-5 w-5 text-sky-800 flex-shrink-0' />
                <span>Allsidig: Jakke, parkas og sovepose</span>
              </div>
            </div>
            <Button asChild size='lg' className='mt-10 w-full sm:w-auto'>
              <Link href={'/produkter/utekos-dun' as Route}>
                Opplev Utekos selv
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
