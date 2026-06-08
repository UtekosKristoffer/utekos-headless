// Path: src/app/kontaktskjema/sections/MobileSection.tsx
import { HelpCircle, Leaf, Package } from 'lucide-react'
import { SupportForm } from '@/components/form/components/SupportForm'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'

export function MobileSection() {
  return (
    <div className='lg:hidden'>
      <div className='p-6'>
        <BrandBadge
          label='Kundeservice'
          backgroundColor='var(--ancient-water)'
          textColor='var(--background)'
          className='mb-5 border border-cloud-dancer/12 px-4 py-2 text-sm leading-4 font-semibold tracking-normal'
        />
        <h1 className='text-3xl font-bold leading-[0.95] tracking-normal text-foreground'>
          Snakk med Utekos
        </h1>
        <p className='mt-3 text-base leading-text-paragraph tracking-normal text-overcast'>
          Vi er her for å hjelpe deg med alt du måtte lure på.
        </p>

        <ul className='mt-6 space-y-6'>
          <li className='flex items-start gap-3'>
            <HelpCircle className='h-5 w-5 flex-shrink-0 text-ancient-water' />
            <div>
              <h3 className='text-sm font-semibold leading-[1.3] tracking-normal text-foreground'>
                Få personlig veiledning
              </h3>
              <p className='mt-1 text-sm leading-text-paragraph tracking-normal text-overcast'>
                Usikker på hvilket produkt som passer ditt bruk? Vi hjelper deg å velge riktig.
              </p>
            </div>
          </li>
          <li className='flex items-start gap-3'>
            <Package className='h-5 w-5 flex-shrink-0 text-ancient-water' />
            <div>
              <h3 className='text-sm font-semibold leading-[1.3] tracking-normal text-foreground'>
                Hjelp med din bestilling
              </h3>
              <p className='mt-1 text-sm leading-text-paragraph tracking-normal text-overcast'>
                Spørsmål om en ordre, retur eller reklamasjon? Oppgi gjerne ordrenummer.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className='border-t border-cloud-dancer/12 bg-background/72 p-6'>
        <SupportForm idPrefix='mobile-contact' />
      </div>

      <div className='border-t border-cloud-dancer/12'>
        <div className='grid grid-cols-2'>
          <div className='border-r border-cloud-dancer/12 p-6'>
            <h4 className='flex items-start gap-1.5 text-xs font-semibold leading-[1.3] tracking-normal text-foreground'>
              <span aria-hidden>🇳🇴</span>
              For norske forhold
            </h4>
            <p className='mt-1.5 text-xs leading-text-paragraph tracking-normal text-overcast'>
              Våre produkter er utviklet for å forlenge de gode stundene utendørs, enten det er på en kjølig
              sommerkveld på hytten eller en frisk høstdag i båten.
            </p>
          </div>
          <div className='p-6'>
            <h4 className='flex items-start gap-1.5 text-xs font-semibold leading-[1.3] tracking-normal text-foreground'>
              <Leaf className='h-4 w-4 text-soft-warm' />
              Investering i komfort
            </h4>
            <p className='mt-1.5 text-xs leading-text-paragraph tracking-normal text-overcast'>
              Mer enn bare et plagg; det er et verktøy designet for å gi deg utallige timer med varme og
              velvære.
            </p>
          </div>
        </div>
      </div>
      <div className='border-t border-cloud-dancer/12 p-6'>
        <blockquote className='text-sm leading-text-paragraph tracking-normal italic text-overcast'>
          &ldquo;Vårt løfte til deg er enkelt: å levere komfortplagg av ypperste kvalitet som lar deg forlenge
          de gode stundene utendørs, uansett vær.&rdquo;
        </blockquote>
        <p className='mt-3 text-sm font-semibold leading-[1.3] tracking-normal text-foreground'>
          - Utekos Teamet
        </p>
      </div>
    </div>
  )
}
