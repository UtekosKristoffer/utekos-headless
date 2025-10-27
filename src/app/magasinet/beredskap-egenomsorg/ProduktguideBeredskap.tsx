// Path: src/app/magasinet/beredskap-egenomsorg/ProduktguideBeredskap.tsx
// FARGEKORRIGERT VERSJON - Tilpasset Utekos sitt mørke tema
import { Home, Car, Archive } from 'lucide-react'

export function ProduktguideBeredskap() {
  return (
    <section className='mt-12 bg-background py-16 md:py-20'>
      <div className='max-w-4xl mx-auto px-6'>
        {/* Header med accent */}
        <div className='text-center mb-16 space-y-4'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-balance text-foreground'>
            Beredskap i praksis: Slik løser Utekos scenarioene
          </h2>
          <div className='h-1 w-24 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full mx-auto'></div>
        </div>

        {/* Timeline-style scenarios */}
        <div className='relative space-y-12'>
          {/* Vertikal linje (skjult på mobile) */}
          <div className='hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-sky-500/30 via-sky-500/50 to-sky-500/30'></div>

          <ScenarioCard
            icon={<Home className='h-6 w-6' />}
            title='Scenario: Strømbrudd på hytta'
            problem='Strømmen er borte, og du fyrer i peisen eller med gassovn for å holde varmen. Du må hente ved, justere fyringen og bevege deg fritt i et kaldt rom.'
            solution='3-i-1-funksjonaliteten er laget for nettopp dette. Du kan gå fra full tildekking på sofaen til full mobilitet på sekunder for å hente mer ved – uten å noensinne forlate varmen.'
            number='01'
            accentColor='bg-sky-500'
          />

          <ScenarioCard
            icon={<Car className='h-6 w-6' />}
            title='Scenario: Motorstopp på en kald dag'
            problem='Du venter på veihjelp i en kald bil. Dette er et vanlig scenario for bobil- og hytteeiere, og spesielt kritisk i en elbil uten strøm til varmeapparatet.'
            solution='I stedet for et pledd som glir av eller en jakke som ikke varmer beina, gir 3-i-1-plaggene deg full kroppsdekning. Du holder deg varm og funksjonell mens du venter på hjelp.'
            number='02'
            accentColor='bg-blue-500'
          />

          <ScenarioCard
            icon={<Archive className='h-6 w-6' />}
            title='Scenario: Beredskapskassen hjemme'
            problem='DSB ber oss planlegge for å klare oss selv i flere dager. Det krever mer enn passiv varme; det krever å kunne fungere i en kald bolig.'
            solution='Utekos lar deg bevare en normal hverdag. Du kan lage mat på primus, lese en bok og sove godt, alt i det samme varme plagget. Det er din mobile varmestasjon.'
            number='03'
            accentColor='bg-indigo-500'
          />
        </div>
      </div>
    </section>
  )
}

// Scenario Card Component - tilpasset mørkt tema
function ScenarioCard({
  icon,
  title,
  problem,
  solution,
  number,
  accentColor
}: {
  icon: React.ReactNode
  title: string
  problem: string
  solution: string
  number: string
  accentColor: string
}) {
  return (
    <div className='relative md:pl-24'>
      {/* Number badge - timeline node */}
      <div className='hidden md:flex absolute left-0 items-center justify-center h-16 w-16 rounded-full bg-sidebar-foreground border-4 border-sky-500/30 shadow-lg shadow-sky-500/20'>
        <span className='text-2xl font-bold text-sky-400'>{number}</span>
      </div>

      {/* Card */}
      <div className='group bg-sidebar-foreground rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 border border-border hover:border-sky-500/50'>
        {/* Icon og title */}
        <div className='flex items-start gap-4 mb-6'>
          <div
            className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl ${accentColor} text-white shadow-md`}
          >
            {icon}
          </div>
          <h3 className='text-xl md:text-2xl font-semibold text-balance flex-1 pt-2 text-foreground'>
            {title}
          </h3>
        </div>

        {/* Problem section */}
        <div className='mb-6 pl-16'>
          <div className='text-sm font-semibold text-sky-400 uppercase tracking-wide mb-2'>
            Utfordringen
          </div>
          <p className='text-base text-muted-foreground leading-relaxed'>
            {problem}
          </p>
        </div>

        {/* Solution section - highlighted */}
        <div className='pl-16 pt-6 border-t border-border'>
          <div className='text-sm font-semibold text-emerald-400 uppercase tracking-wide mb-2'>
            ✓ Slik løser Utekos det
          </div>
          <p className='text-base text-foreground leading-relaxed font-medium'>
            {solution}
          </p>
        </div>
      </div>
    </div>
  )
}
