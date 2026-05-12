// Path: src/app/kontaktskjema/sections/DesktopSection.tsx
import { HelpCircle, Leaf, Package } from 'lucide-react'
import { SupportForm } from '@/components/form/components/SupportForm'

export function DesktopSection() {
  return (
    <div className='hidden lg:grid lg:grid-cols-2'>
      <div className='flex flex-col'>
        <div className='flex-grow p-8 lg:p-12'>
          <h1 className='text-4xl font-bold tracking-tight'>
            Snakk med Utekos
          </h1>
          <p className='mt-4 text-xl text-gray-00'>
            Vi er her for å hjelpe deg med alt du måtte lure på.
          </p>

          <ul className='mt-8 space-y-8'>
            <li className='flex items-start gap-4'>
              <HelpCircle className='h-6 w-6 flex-shrink-0 text-white' />
              <div>
                <h3 className='font-semibold'>Få personlig veiledning</h3>
                <p className='text-base text-gray-300'>
                  Usikker på hvilket produkt som passer ditt bruk? Vi hjelper
                  deg å velge riktig.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-4'>
              <Package className='h-6 w-6 flex-shrink-0 text-white' />
              <div>
                <h3 className='font-semibold'>Hjelp med din bestilling</h3>
                <p className='text-base text-gray-300'>
                  Spørsmål om en ordre, retur eller reklamasjon? Oppgi gjerne
                  ordrenummer.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className='border-y border-white/10'>
          <div className='grid grid-cols-1 sm:grid-cols-2'>
            <div className='border-r border-white/10 p-6 sm:p-8 lg:py-12 lg:px-8'>
              <h4 className='flex items-center gap-2 font-semibold'>
                <Leaf className='h-5 w-5' />
                En investering i komfort
              </h4>
              <p className='mt-2 text-base text-gray-300 max-w-prose'>
                Mer enn bare et plagg; det er et verktøy designet for å gi deg
                utallige timer med varme og velvære.
              </p>
            </div>

            <div className='p-6 sm:p-8 lg:py-12 lg:px-8'>
              <h4 className='flex items-center gap-2 font-semibold'>
                <span aria-hidden>🇳🇴</span>
                <span className='sr-only'>Norsk</span>
                Skapt for norske forhold
              </h4>
              <p className='mt-2 text-base text-gray-300 max-w-prose'>
                Våre produkter er utviklet for å forlenge de gode stundene
                utendørs, enten det er på en kjølig sommerkveld på hytten eller
                en frisk høstdag i båten.
              </p>
            </div>
          </div>
        </div>

        <div className='p-8 lg:p-12'>
          <blockquote className='text-lg italic text-article-white/50'>
            &ldquo;Vårt løfte til deg er enkelt: å levere komfortplagg av
            ypperste kvalitet som lar deg forlenge de gode stundene utendørs,
            uansett vær.&rdquo;
          </blockquote>
          <p className='mt-4 font-semibold'>- Utekos</p>
        </div>
      </div>

      <div className='border-l border-white/10 bg-[oklch(14.5%_0_0)] p-8 lg:p-12'>
        <SupportForm />
      </div>
    </div>
  )
}
