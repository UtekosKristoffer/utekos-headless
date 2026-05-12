// Path: src/app/kontaktskjema/sections/MobileSection.tsx
import { HelpCircle, Leaf, Package } from 'lucide-react'
import { SupportForm } from '@/components/form/components/SupportForm'

export function MobileSection() {
  return (
    <div className='lg:hidden'>
      <div className='p-6'>
        <h1 className='text-3xl font-bold tracking-tight'>Snakk med Utekos</h1>
        <p className='mt-3 text-base text-gray-300'>
          Vi er her for å hjelpe deg med alt du måtte lure på.
        </p>

        <ul className='mt-6 space-y-6'>
          <li className='flex items-start gap-3'>
            <HelpCircle className='h-5 w-5 flex-shrink-0 text-primary' />
            <div>
              <h3 className='text-sm font-semibold'>Få personlig veiledning</h3>
              <p className='text-sm text-gray-300'>
                Usikker på hvilket produkt som passer ditt bruk? Vi hjelper deg
                å velge riktig.
              </p>
            </div>
          </li>
          <li className='flex items-start gap-3'>
            <Package className='h-5 w-5 flex-shrink-0 text-primary' />
            <div>
              <h3 className='text-sm font-semibold'>
                Hjelp med din bestilling
              </h3>
              <p className='text-sm text-gray-300'>
                Spørsmål om en ordre, retur eller reklamasjon? Oppgi gjerne
                ordrenummer.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className='border-t border-white/10 bg-[oklch(14.5%_0_0)] p-6'>
        <SupportForm />
      </div>

      <div className='border-t border-white/10'>
        <div className='grid grid-cols-2'>
          <div className='border-r border-white/10 p-6'>
            <h4 className='flex items-start gap-1.5 text-xs font-semibold'>
              <span aria-hidden>🇳🇴</span>
              For norske forhold
            </h4>
            <p className='mt-1.5 text-xs text-gray-300'>
              Våre produkter er utviklet for å forlenge de gode stundene
              utendørs, enten det er på en kjølig sommerkveld på hytten eller en
              frisk høstdag i båten.
            </p>
          </div>
          <div className='p-6'>
            <h4 className='flex items-start gap-1.5 text-xs font-semibold'>
              <Leaf className='h-4 w-4' />
              Investering i komfort
            </h4>
            <p className='mt-1.5 text-xs text-gray-300'>
              Mer enn bare et plagg; det er et verktøy designet for å gi deg
              utallige timer med varme og velvære.
            </p>
          </div>
        </div>
      </div>
      <div className='border-t border-white/10 p-6'>
        <blockquote className='text-sm italic text-gray-300'>
          &ldquo;Vårt løfte til deg er enkelt: å levere komfortplagg av ypperste
          kvalitet som lar deg forlenge de gode stundene utendørs, uansett
          vær.&rdquo;
        </blockquote>
        <p className='mt-3 text-sm font-semibold'>- Utekos Teamet</p>
      </div>
    </div>
  )
}
