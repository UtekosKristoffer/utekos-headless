// Path: src/app/magasinet/beredskap-egenomsorg/HeroBeredskap.tsx
// FARGEKORRIGERT VERSJON - Tilpasset mørkt tema
import Image from 'next/image'
import UtekosBeredskap from '@public/beredskaps-utekos.png'

export function HeroBeredskap() {
  return (
    <header className='text-left pb-12'>
      <div className='max-w-4xl mx-auto px-6'>
        {/* Bildet med subtile forbedringer */}
        <div className='mb-10 relative group'>
          <div className='absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500'></div>
          <div className='relative'>
            <Image
              src={UtekosBeredskap}
              alt='Utekos i en beredskapssituasjon, illustrerer varme og komfort'
              width={1124}
              height={1024}
              layout='responsive'
              objectFit='cover'
              className='rounded-xl shadow-2xl'
            />
          </div>
        </div>

        {/* Intro text med bedre typografi */}
        <div className='space-y-6'>
          <p className='text-lg md:text-xl text-muted-foreground leading-relaxed text-balance'>
            Myndighetene ber oss ha ullpledd og soveposer klare for et
            strømbrudd. Men hva gjør du når du må hente ved eller lage mat?
          </p>
          <p className='text-lg md:text-xl text-foreground leading-relaxed text-balance font-medium'>
            Vi ser på hvorfor bevegelsesfrihet er ditt glemte ess i ermet for å
            bevare tryggheten og varmen.
          </p>
        </div>
      </div>
    </header>
  )
}
