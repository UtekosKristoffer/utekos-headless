// Path: src/app/magasinet/beredskap-egenomsorg/BeredskapspakkenSection.tsx
// FARGEKORRIGERT VERSJON - Fjernet hvit bakgrunn, tilpasset mørkt tema
import { Archive, Car } from 'lucide-react'

export function BeredskapspakkenSection() {
  return (
    <section className='py-16 md:py-24 mt-12 bg-sidebar-foreground'>
      <div className='max-w-4xl mx-auto px-6'>
        {/* Header */}
        <div className='text-center mb-12 space-y-4'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-balance text-foreground'>
            Slik forenkler Utekos din beredskapspakke
          </h2>
          <div className='h-1 w-24 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full mx-auto'></div>
        </div>

        {/* Intro text - emphasis box */}
        <div className='mb-12 space-y-6'>
          <div className='bg-amber-500/10 border-l-4 border-amber-500 p-6 rounded-r-xl backdrop-blur-sm'>
            <p className='text-lg text-foreground leading-relaxed'>
              <strong className='text-amber-400'>DSBs sjekkliste</strong> for
              egenberedskap nevner "Varme klær og pledd, dyner eller soveposer"
              som et kritisk punkt. Utfordringen for mange hytte- og bobileiere
              er at dette tar enormt mye lagringsplass.
            </p>
          </div>

          <div className='bg-background/40 backdrop-blur-sm p-6 rounded-xl border border-border'>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              I stedet for å pakke tre separate løsninger (pledd, sovepose, varm
              jakke), gir Utekos deg alle funksjonene i én. Kombinert med en{' '}
              <span className='font-semibold text-sky-400'>
                Utekos Stapper™
              </span>
              , som reduserer volumet med over 50 %, blir beredskapslogistikken
              plutselig mye enklere.
            </p>
          </div>
        </div>

        {/* Feature cards - modernisert layout */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8'>
          <PackageCard
            icon={<Car className='h-7 w-7' />}
            title='Pakken for bil og bobil'
            description='En Utekos (f.eks. TechDawn™ for fukt) i en Stapper™ tar minimalt med plass under setet eller i et bagasjerom. Den er din forsikring mot motorstopp og kalde netter, og alltid klar til bruk uten at du må pakke om.'
            accentColor='from-sky-500 to-blue-500'
          />

          <PackageCard
            icon={<Archive className='h-7 w-7' />}
            title='Pakken for hjem og hytte'
            description='Ha én Utekos per familiemedlem lett tilgjengelig sammen med resten av beredskapsutstyret. Den erstatter behovet for et lager av gamle dyner og pledd, og gir alle en personlig varmekilde de kan bevege seg i.'
            accentColor='from-blue-500 to-indigo-500'
          />
        </div>
      </div>
    </section>
  )
}

// Package Card Component - tilpasset mørkt tema
function PackageCard({
  icon,
  title,
  description,
  accentColor
}: {
  icon: React.ReactNode
  title: string
  description: string
  accentColor: string
}) {
  return (
    <div className='group relative bg-background/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 border border-border hover:border-sky-500/50 overflow-hidden'>
      {/* Decorative background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      ></div>

      {/* Content */}
      <div className='relative z-10'>
        {/* Icon with gradient background */}
        <div className='mb-6'>
          <div
            className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br ${accentColor} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className='text-xl md:text-2xl font-semibold mb-4 text-balance text-foreground'>
          {title}
        </h3>

        {/* Description */}
        <p className='text-base text-muted-foreground leading-relaxed'>
          {description}
        </p>

        {/* Subtle indicator line */}
        <div
          className={`mt-6 h-1 w-16 bg-gradient-to-r ${accentColor} rounded-full`}
        ></div>
      </div>
    </div>
  )
}
