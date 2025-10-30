import { Archive, Car } from 'lucide-react'
import Link from 'next/link'
export function BeredskapspakkenSection() {
  return (
    <section className='py-16 mt-12 md:mt-16 bg-sidebar-foreground'>
      <div className='max-w-4xl mx-auto px-6'>
        {/* Header */}
        <div className='text-center mb-12 space-y-4'>
          <h2 className='text-3xl md:text-4xl -mt-4 font-bold tracking-tight text-balance text-foreground'>
            Slik forenkler Utekos™ din beredskapspakke
          </h2>
        </div>

        {/* Intro text - emphasis box */}
        <div className='mb-12 space-y-6'>
          <div className='bg-amber-500/10 border-l-4 border-amber-500 p-6 rounded-r-xl backdrop-blur-sm'>
            <p className='text-lg text-foreground leading-relaxed'>
              <strong className='text-amber-400'>DSBs sjekkliste</strong> for
              egenberedskap nevner &rdquo;varme klær, pledd, dyner eller
              soveposer&rdquo; som kritiske behov. Utekos dekker i stor grad
              dette. Den trenger heller ikke å bli liggende ubrukt i
              beredskapslageret. Du får en løsning som også i hverdagen
              oppgraderer og forlenger gode stunder ute.
            </p>
          </div>

          <div className='bg-background/40 backdrop-blur-sm p-6 rounded-xl border border-border'>
            <p className='text-lg text-article-white leading-relaxed'>
              I stedet for å pakke tre separate løsninger, gir Utekos deg alle
              funksjonene i én. Kombinert med en{' '}
              <Link
                href='/produkter/utekos-stapper'
                className='font-base text-sky-400'
              >
                Utekos Stapper™
              </Link>
              , reduseres volumet med over 50 %, og beredskapslogistikken blir
              plutselig mye enklere.
            </p>
          </div>
        </div>

        {/* Feature cards - modernisert layout */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8'>
          <PackageCard
            icon={<Car className='h-7 w-7' />}
            title='Pakken for bil og bobil'
            description='En Utekos i en Stapper™ tar minimalt med plass i et bagasjerom. Den er din forsikring mot motorstopp og kalde netter, og alltid klar til bruk uten at du må pakke om.'
            accentColor='from-sky-500 to-blue-500'
          />

          <PackageCard
            icon={<Archive className='h-7 w-7' />}
            title='Fra koseplagg til kriseverktøy'
            description='Et pledd er fint for sofakos, men har begrensede egenskaper i krise som varer. Utekos™ er en oppgradering: en personlig, mobil varmekilde som gir funksjonsevne og trygghet, ikke bare passiv varme.'
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
        <p className='text-base text-article-white leading-relaxed'>
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
