// Path: src/app/magasinet/beredskap-egenomsorg/HvorforUtekosSection.tsx
// FARGEKORRIGERT VERSJON - Tilpasset Utekos sitt mørke tema og OKLCH-farger
import { Zap, Shield, Thermometer } from 'lucide-react'

export function HvorforUtekosSection() {
  return (
    <section className='py-16 md:py-24 bg-sidebar-foreground'>
      <div className='max-w-4xl mx-auto px-6 space-y-12'>
        {/* Heading med subtle accent */}
        <div className='space-y-4'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-balance text-foreground'>
            Den glemte utfordringen: Å "leve" - ikke bare vente
          </h2>
          <div className='h-1 w-24 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full'></div>
        </div>

        {/* Ingress - tydelig separert med bakgrunn */}
        <div className='bg-background/40 backdrop-blur-sm p-8 rounded-2xl border border-border'>
          <p className='text-lg md:text-xl text-muted-foreground leading-relaxed'>
            Myndighetene (DSB) anbefaler oss å ha ullpledd, dyner og soveposer i
            beredskap. Det er et utmerket råd for å holde varmen passivt. Men
            hva skjer når strømbruddet varer, og du må forlate sofaen?
          </p>
        </div>

        {/* Kontekst-tekst - enklere styling */}
        <div className='space-y-6 text-lg text-muted-foreground max-w-3xl'>
          <p>
            Et pledd eller en dyne binder deg fast. Å hente ved, sjekke
            sikringsskapet eller lage mat på primus blir plutselig et kaldt og
            upraktisk prosjekt. Du blir en "sofa-fange" i ditt eget hjem.
          </p>
          <p className='text-sky-400 font-medium text-xl'>
            Det er her 3-i-1-funksjonaliteten til Utekos blir ditt avgjørende
            ess i ermet.
          </p>
        </div>

        {/* Feature cards - moderne kort-design */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 pt-8'>
          <FeatureCard
            icon={<Zap className='h-7 w-7' />}
            title='Bevar mobiliteten'
            description='Du går fra full tildekking til full bevegelsesfrihet på sekunder. Den smarte justeringen lar deg gå trygt rundt i huset uten snublefare, og uten å noensinne forlate varmen.'
            accentColor='from-sky-500 to-sky-600'
          />

          <FeatureCard
            icon={<Shield className='h-7 w-7' />}
            title='Bevar komforten (og klærne)'
            description='DSB ber oss planlegge for en uke, som ofte betyr en uke uten vaskemaskin. Utekos fungerer som et ytre "funksjonsskjold". Du kan ha vanlige, lette klær under, og du beskytter de indre lagene mot slitasje og smuss.'
            accentColor='from-sky-600 to-blue-600'
          />

          <FeatureCard
            icon={<Thermometer className='h-7 w-7' />}
            title='Smart temperaturregulering'
            description='En nødsituasjon er ikke statisk. Med de V-formede YKK-glidelåsene kan du enkelt lufte ved brystet hvis du fyrer i peisen, uten å måtte ta av deg hele plagget og bli kald igjen.'
            accentColor='from-blue-600 to-indigo-600'
          />
        </div>
      </div>
    </section>
  )
}

// Feature Card Component - tilpasset mørkt tema
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
      <p className='text-sm text-muted-foreground leading-relaxed'>
        {description}
      </p>
    </div>
  )
}
