import { MoveRightIcon } from '@/components/animate-icons/icons/move-right'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { nbccFinalCtaTracking } from '../utils/nbccLandingPageContent'

export function NbccFinalCtaSection() {
  return (
    <section className='relative overflow-hidden bg-overcast px-4 py-20 sm:px-6 lg:px-8'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(240,195,106,0.18),transparent_34%),radial-gradient(circle_at_82%_42%,rgba(199,230,201,0.12),transparent_32%)]' />
      <div
        data-nbcc-reveal
        data-nbcc-animate
        className='relative mx-auto flex max-w-4xl flex-col items-center text-center'
      >
        <p className='text-sm font-semibold font-utekos-text uppercase tracking-[0.18em] text-maritime-darkest'>
          Klar for neste campingtur
        </p>
        <h2 className='mt-4 max-w-3xl text-balance text-4xl font-google-sans *:font-semibold tracking-tight text-maritime-darkest sm:text-5xl'>
          Ta med varmen til plassen der praten fortsetter
        </h2>
        <p className='mt-6 max-w-2xl text-base font-utekos-text text-maritime-darkest'>
          Opplev en ny standard for utendørs velvære. Utekos forener banebrytende innovasjon med tidløs
          eleganse. Kjernen i konseptet er vår unike 3-i-1 funksjonalitet. Gjennomtestede løsninger lar deg
          enkelt tilpasse passform, regulere ventilasjon og veksle mellom ulike funksjonelle moduser. Når dine
          behov for velvære endrer seg, finnes det alltid en justeringsmulighet som lar deg fortsette
          opplevelsen av kompromissløs komfort. Helt uavbrutt. Du har en mobil varmekilde som endrer måten du
          behøver å planlegge på.
        </p>
        <Button
          asChild
          data-track='NbccFinalProductsClick'
          data-track-data={JSON.stringify(nbccFinalCtaTracking)}
          size='lg'
          className='mt-9 h-12 rounded-md bg-primary-button px-6 text-[15px] font-semibold text-maritime-darkest hover:bg-primary-button/90'
        >
          <Link
            href='/produkter'
            data-track='NbccFinalProductsClick'
            data-track-data={JSON.stringify(nbccFinalCtaTracking)}
          >
            Gå til produktene
            <MoveRightIcon size={18} animateOnHover='default' />
          </Link>
        </Button>
      </div>
    </section>
  )
}
