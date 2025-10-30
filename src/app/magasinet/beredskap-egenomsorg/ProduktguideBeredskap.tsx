import { Home, Car, Archive } from 'lucide-react'

export function ProduktguideBeredskap() {
  return (
    <section className='bg-background py-16 md:py-20'>
      <div className='max-w-4xl mx-auto px-6'>
        {/* Header med accent */}
        <div className='text-center mb-16 space-y-4'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
            <span className='whitespace-nowrap'>Beredskap i praksis</span>
            <br />
            <span className='text-xl md:text-2xl'>
              - Slik løser Utekos scenarioene
            </span>
          </h2>
        </div>

        <div className='relative space-y-12'>
          <div className='hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-amber-900/30 via-amber-900/50 to-amber-900/30'></div>

          <ScenarioCard
            icon={<Home className='h-6 w-6' />}
            title='Scenario: Strømbrudd på hytten'
            problem='Strømmen er borte, og du fyrer i peisen eller med gassovn for å holde varmen. Du må hente ved, justere fyringen og bevege deg fritt i et kaldt rom.'
            solution='I motsetning til tradisjonelle soveposer kan
            man bevege seg fritt i en Utekos. Det betyr at du kan utføre
            oppgaver, hente vann, lage mat eller hjelpe andre uten å måtte ta av
            deg varmebeskyttelsen.'
            number='01'
            accentColor='bg-amber-900'
          />

          <ScenarioCard
            icon={<Car className='h-6 w-6' />}
            title='Scenario: Driftsstans'
            problem='Kjøretøyet har stoppet, og varmekilden er borte. Dette er spesielt kritisk i en elbil med tomt batteri, men like reelt for bobil- og hytteeiere som venter på veihjelp i kulden.'
            solution='Tar liten plass og er ideell for beredskap i bil, bobil eller båt. Ved å oppbevare én Utekos i bagasjerommet som en del av din egenberedskap på reise, får du en løsning som gir full varme og bevarer funksjonsevnen når du trenger det som mest.'
            number='02'
            accentColor='bg-amber-900'
          />

          <ScenarioCard
            icon={<Archive className='h-6 w-6' />}
            title='Scenario: Beredskapskassen hjemme'
            problem='DSB ber oss planlegge for å klare oss selv i én uke. Det krever mer enn passiv varme; det krever å kunne fungere i en kald bolig.'
            solution='Kulde passiviserer og isolerer. Utekos er din mobile varmestasjon som lar deg leve, ikke bare overleve. Du bevarer den sosiale varmen, kan bevege deg fritt for å lage mat, og unngår at familien fryser fast i hver sin sofa.'
            number='03'
            accentColor='bg-amber-900'
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
      <div className='hidden md:flex absolute left-0 items-center justify-center h-16 w-16 rounded-full bg-sidebar-foreground border-4 border-amber-900/30 shadow-lg shadow-amber-900/20'>
        <span className='text-2xl font-bold text-amber-900'>{number}</span>
      </div>

      {/* Card */}
      <div className='group bg-sidebar-foreground rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-300 border hover:border-border border-amber-900/50'>
        {/* =================================
          FIKS 1: Stabler på mobil, rad på sm+
          =================================
        */}
        <div className='flex flex-col sm:flex-row sm:items-start gap-4 mb-6'>
          <div
            className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl ${accentColor} text-white shadow-md`}
          >
            {icon}
          </div>
          <h3 className='text-xl md:text-2xl font-semibold text-balance flex-1 pt-2 text-foreground'>
            {title}
          </h3>
        </div>

        {/* =================================
          FIKS 2: Padding kun på sm+
          =================================
        */}
        <div className='mb-6 sm:pl-16'>
          <div className='text-sm font-semibold text-amber-900 uppercase tracking-wide mb-2'>
            Utfordringen
          </div>
          <p className='text-base text-muted-foreground leading-relaxed'>
            {problem}
          </p>
        </div>

        {/* =================================
          FIKS 3: Padding kun på sm+
          =================================
        */}
        <div className='sm:pl-16 pt-6 border-t border-border'>
          <div className='text-sm font-semibold text-sky-800 uppercase tracking-wide mb-2'>
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
