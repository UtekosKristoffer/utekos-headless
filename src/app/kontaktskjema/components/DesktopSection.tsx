// Path: src/app/kontaktskjema/sections/DesktopSection.tsx
import { HelpCircle, Leaf, Package } from 'lucide-react'
import { SupportForm } from '@/components/form/components/SupportForm'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'

export function DesktopSection() {
  return (
    <div className='hidden lg:grid lg:grid-cols-2'>
      <div className='flex flex-col'>
        <div className='flex-grow p-8 lg:p-12'>
          <BrandBadge
            label='Kundeservice'
            backgroundColor='var(--ancient-water)'
            textColor='var(--maritime-darkest)'
            className='mb-6 border border-cloud-dancer/12 px-4 py-2 text-sm leading-[1.4] font-semibold tracking-normal'
          />
          <h1 className='text-4xl font-bold leading-[0.95] tracking-normal text-cloud-dancer'>
            Snakk med Utekos
          </h1>
          <p className='mt-4 max-w-xl text-xl leading-[1.45] tracking-normal text-cloud-dancer/90'>
            Vi er her for å hjelpe deg med alt du måtte lure på.
          </p>

          <ul className='mt-8 space-y-8'>
            <li className='flex items-start gap-4'>
              <HelpCircle className='h-6 w-6 flex-shrink-0 text-ancient-water' />
              <div>
                <h3 className='font-semibold leading-[1.25] tracking-normal text-cloud-dancer'>
                  Få personlig veiledning
                </h3>
                <p className='mt-1 text-base leading-[1.45] tracking-normal text-cloud-dancer/90'>
                  Usikker på hvilket produkt som passer ditt bruk? Vi hjelper
                  deg å velge riktig.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-4'>
              <Package className='h-6 w-6 flex-shrink-0 text-ancient-water' />
              <div>
                <h3 className='font-semibold leading-[1.25] tracking-normal text-cloud-dancer'>
                  Hjelp med din bestilling
                </h3>
                <p className='mt-1 text-base leading-[1.45] tracking-normal text-cloud-dancer/90'>
                  Spørsmål om en ordre, retur eller reklamasjon? Oppgi gjerne
                  ordrenummer.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className='border-y border-cloud-dancer/12'>
          <div className='grid grid-cols-1 sm:grid-cols-2'>
            <div className='border-r border-cloud-dancer/12 p-6 sm:p-8 lg:px-8 lg:py-12'>
              <h4 className='flex items-center gap-2 font-semibold leading-[1.25] tracking-normal text-cloud-dancer'>
                <Leaf className='h-5 w-5 text-soft-warm' />
                En investering i komfort
              </h4>
              <p className='mt-2 max-w-prose text-base leading-[1.45] tracking-normal text-cloud-dancer/90'>
                Mer enn bare et plagg; det er et verktøy designet for å gi deg
                utallige timer med varme og velvære.
              </p>
            </div>

            <div className='p-6 sm:p-8 lg:px-8 lg:py-12'>
              <h4 className='flex items-center gap-2 font-semibold leading-[1.25] tracking-normal text-cloud-dancer'>
                <span aria-hidden>🇳🇴</span>
                <span className='sr-only'>Norsk</span>
                Skapt for norske forhold
              </h4>
              <p className='mt-2 max-w-prose text-base leading-[1.45] tracking-normal text-cloud-dancer/90'>
                Våre produkter er utviklet for å forlenge de gode stundene
                utendørs, enten det er på en kjølig sommerkveld på hytten eller
                en frisk høstdag i båten.
              </p>
            </div>
          </div>
        </div>

        <div className='p-8 lg:p-12'>
          <blockquote className='text-lg leading-[1.45] tracking-normal italic text-cloud-dancer/90'>
            &ldquo;Vårt løfte til deg er enkelt: å levere komfortplagg av
            ypperste kvalitet som lar deg forlenge de gode stundene utendørs,
            uansett vær.&rdquo;
          </blockquote>
          <p className='mt-4 font-semibold leading-[1.25] tracking-normal text-cloud-dancer'>
            - Utekos
          </p>
        </div>
      </div>

      <div className='border-l border-cloud-dancer/12 bg-maritime-darkest/72 p-8 lg:p-12'>
        <SupportForm />
      </div>
    </div>
  )
}
