import {
  Zap,
  Shield,
  Thermometer,
  Check,
  ArrowDownToLine,
  PersonStanding,
  SlidersHorizontal
} from 'lucide-react'
export function HvorforUtekosSection() {
  return (
    <section className='py-16 md:pb-24 bg-sidebar-foreground rounded-lg'>
      <div className='max-w-4xl mx-auto px-4 space-y-12'>
        <div className='space-y-2'>
          <h2 className='text-2xl md:text-4xl text-center -mt-4 mx-auto font-bold tracking-tight text-foreground'>
            <span className='whitespace-nowrap mx-auto'>
              Den glemte utfordringen:
            </span>
            <br />
            <div className='h-1 w-12 bg-gradient-to-r from-sky-900 to-blue-600 rounded-full mx-auto hidden md:block mb-2 mt-3 md:w-[70%]' />
            <span className='md:text-2xl text-xl'>
              Å leve – ikke bare vente
            </span>
            <div className='h-1 w-16 ml-14 bg-gradient-to-r from-sky-900 to-blue-600 rounded-full md:hidden' />
          </h2>
        </div>
        <div className='bg-background/40 backdrop-blur-sm p-8 rounded-2xl border border-border'>
          <p className='text-lg md:text-xl text-article-white leading-relaxed'>
            DSBs sjekkliste for beredskap peker blant annet på varme, strøm,
            dyner og soveposer. Det er gode råd for å holde varmen passivt. Men
            hva om det finnes et mye bedre alternativ?
          </p>
        </div>
        <div className='bg-background/40 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-border space-y-5'>
          <h3 className='text-lg font-semibold text-foreground'>
            Sjekkliste: Varme og lys
          </h3>
          <ul className='space-y-3'>
            <ChecklistItem text='Ha varme klær og pledd, dyner eller soveposer i boligen.' />
            <ChecklistItem text='Ha et lager med stearinlys eller telys, og fyrstikker eller lighter.' />
            <ChecklistItem text='For å se i mørket er det lurt med lommelykter eller hodelykter.' />
            <ChecklistItem text='Husk ekstra batterier (til lykter og radio).' />
          </ul>
          <p className='text-xs text-article-white/80 text-right pt-2'>
            (Kilde: DSB)
          </p>
        </div>
        <div className='space-y-6 text-base md:text-lg text-article-white leading-relaxed text-balance max-w-3xl'>
          <p>
            Å basere seg utelukkende på pledd, dyner eller soveposer for å
            opprettholde kontinuerlig varme, er en strategi som gradvis fører
            til passivitet. Denne passiviteten, kombinert med vedvarende kulde
            og en generelt nedsatt levestandard, reduserer raskt funksjonsevnen
            og den personlige motstandskraften.
          </p>
          <p>
            Nødvendige oppgaver – som å hente ved, lage mat på primus eller
            holde orden – blir et kaldere, mer upraktisk og utrivelig ork enn du
            kanskje hadde sett for deg.
          </p>
          <p>
            Under slike omstendigheter fungerer Utekos som ditt ess i ermet.
            3-i-1-funksjonaliteten sørger for at du er omsluttet av komfort og
            varme, samtidig som du beholder kontrollen og kan justere den etter
            din unike situasjon. Slik oppgraderer du et passivt utgangspunkt til
            en aktiv løsning som bevarer funksjonsevnen og velværet over tid.
          </p>
        </div>
        <h3 className='text-lg rounded-lg bg-sky-800/10 p-2 md:hidden mx-auto md:text-2xl font-bold w-full tracking-tight text-foreground text-center'>
          Konsept: 3-i-1-funksjonaliteten
        </h3>
        <div className='bg-background/40 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-border space-y-8'>
          <h3 className='text-md hidden md:block mx-auto md:text-2xl font-bold w-full tracking-tight text-foreground text-center'>
            Slik fungerer 3-i-1-funksjonaliteten
          </h3>
          <div className='space-y-6'>
            <FunctionalityStep
              icon={<ArrowDownToLine className='h-7 w-7' />}
              title='Modus 1: Full kokong-modus'
              description='I full lengde fungerer den som en beskyttende kokong. En smart "varmpose" nederst på baksiden lar deg samle beina, perfekt for å sitte stille på kalde overflater eller simulere en sovepose.'
            />
            <FunctionalityStep
              icon={<PersonStanding className='h-7 w-7' />}
              title='Modus 2: Oppjustertmodus'
              description='For mobilitet. Du bretter den nedre delen innunder, bruker den nederste snorstrammingen til å heise og feste plagget, og strammer i livet. Dette skaper en parkas-lengde med bakkeklaring, slik at du kan bevege deg fritt uten snublefare.'
            />
            <FunctionalityStep
              icon={<SlidersHorizontal className='h-7 w-7' />}
              title='Modus 3: Rask liv-justering'
              description='For enkle justeringer. Bruk kun snorstrammingen i livet til å forme plagget eller stenge kulden ute, ideelt for kortere turer til kjøkkenet eller for å hente ved.'
            />
          </div>
          <div className='pt-4 border-t border-border/50'>
            <h4 className='text-lg font-semibold text-foreground mb-4'>
              Flere smarte detaljer
            </h4>
            <ul className='space-y-3'>
              <ChecklistItem text='<strong>Varmemuffe:</strong> En dyp, fôret muffe i front for å varme hendene.' />
              <ChecklistItem text='<strong>Omvendt V-glidelås:</strong> Åpnes fra halsen til livet. Gir enkel påkledning og suverene muligheter for å lufte ved brystet uten å bli kald.' />
              <ChecklistItem text='<strong>Juster som du vil:</strong> Designet for tilpasning, slik at du selv bestemmer hvordan den gjør mest nytte for deg.' />
            </ul>
          </div>
        </div>
        {/* Feature Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 pt-8'>
          <FeatureCard
            icon={<Zap className='h-7 w-7' />}
            title='Bevar mobiliteten'
            description='Du går fra full tildekking til full bevegelsesfrihet på sekunder. Den smarte justeringen lar deg gå trygt rundt i huset uten snublefare, og uten å noensinne forlate varmen.'
            accentColor='from-sky-500 to-sky-600'
          />

          <FeatureCard
            icon={<Shield className='h-7 w-7' />}
            title='Bevar normaliteten'
            description='En uke uten vaskemaskin kan være en utfordring for mange. Utekos fungerer som ditt ytre, beskyttende lag. Du kan ha enkle, lette klær (som ullundertøy) under, og bevare en følelse av normalitet og velvære lenger.'
            accentColor='from-sky-600 to-blue-600'
          />

          <FeatureCard
            icon={<Thermometer className='h-7 w-7' />}
            title='Unngå svette-fellen'
            description='Aktivitet (hente ved, fyre i peisen) skaper varme, men å bli svett er farlig i kulden. Den V-formede glidelåsen lar deg dumpe overskuddsvarme fra brystet på sekunder, slik at du unngår å bli klam – og deretter iskald.'
            accentColor='from-blue-600 to-indigo-600'
          />
        </div>
      </div>
    </section>
  )
}
function ChecklistItem({ text }: { text: string }) {
  return (
    <li className='flex items-start'>
      <Check className='h-5 w-5 text-blue-800 mr-3 flex-shrink-0 mt-1' />
      <span className='text-article-white'>
        {/* Tillater <strong>-tags i teksten */}
        {typeof text === 'string' ?
          <span dangerouslySetInnerHTML={{ __html: text }} />
        : text}
      </span>
    </li>
  )
}

function FunctionalityStep({
  icon,
  title,
  description
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    // =================================
    // HER ER FIKSEN:
    // `flex-col` er nå standard (mobil)
    // `sm:flex-row` bytter til rad-layout på sm-skjermer (640px) og oppover.
    // =================================
    <div className='flex flex-col sm:flex-row items-start gap-4'>
      <div className='flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 text-sky-400 border border-sky-500/30'>
        {icon}
      </div>
      <div>
        <h4 className='text-lg font-semibold text-foreground'>{title}</h4>
        <p className='text-article-white/80 mt-1'>{description}</p>
      </div>
    </div>
  )
}

function FeatureCard({
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
    <div className='group relative bg-background/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-sky-500/50'>
      {/* Accent gradient top border */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentColor} rounded-t-2xl`}
      ></div>

      {/* Icon container */}
      <div className='flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 text-sky-400 mb-4 group-hover:scale-110 transition-transform duration-300 border border-sky-500/30'>
        {icon}
      </div>

      {/* Content */}
      <h3 className='text-lg font-semibold text-foreground mb-3'>{title}</h3>
      <p className='text-sm text-article-white/80 leading-relaxed'>
        {description}
      </p>
    </div>
  )
}
