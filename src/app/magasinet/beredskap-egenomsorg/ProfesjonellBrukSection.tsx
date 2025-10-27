// Path: src/app/magasinet/beredskap-egenomsorg/ProfesjonellBrukSection.tsx
// FARGEKORRIGERT VERSJON - Tilpasset mørkt tema
import { Building, RefreshCw, Shield } from 'lucide-react'

export function ProfesjonellBrukSection() {
  return (
    <section className='py-16 md:py-24 bg-background'>
      <div className='max-w-4xl mx-auto px-6'>
        {/* Header med accent */}
        <div className='mb-12 space-y-4'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-balance text-foreground'>
            En mer robust løsning for kommuner og bedrifter
          </h2>
          <div className='h-1 w-24 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full'></div>
        </div>

        {/* Intro text */}
        <div className='mb-10'>
          <p className='text-lg md:text-xl text-muted-foreground leading-relaxed'>
            For kommuner, frivillige organisasjoner, eller bedrifter (f.eks.
            utleiehytter) som håndterer et beredskapslager, er Utekos en
            langsiktig og økonomisk investering sammenlignet med engangstepper.
          </p>
        </div>

        {/* Feature boxes */}
        <div className='space-y-6'>
          <FeatureBox
            icon={<RefreshCw className='h-6 w-6' />}
            title='Bygget for gjenbruk'
            description='Alle Utekos-produktene er designet for enkelt vedlikehold og kan maskinvaskes. Dette betyr at de kan vaskes, komprimeres og lagres på nytt, klare for neste gangs bruk. Det gir en overlegen totaløkonomi.'
            accentColor='from-emerald-500 to-teal-500'
          />

          <FeatureBox
            icon={<Shield className='h-6 w-6' />}
            title='Robust og lagringsdyktig'
            description='Materialer som Luméa™-ytterstoffet på TechDawn™ er utviklet for å være ekstremt slitesterkt. Produktene tåler lagring over tid uten å miste funksjon, klare til å yte når behovet oppstår.'
            accentColor='from-sky-500 to-blue-500'
          />
        </div>

        {/* CTA or closing note - subtle */}
        <div className='mt-12 p-6 bg-sky-500/10 backdrop-blur-sm rounded-xl border border-sky-500/30'>
          <div className='flex items-start gap-4'>
            <Building className='h-6 w-6 text-sky-400 flex-shrink-0 mt-1' />
            <div>
              <p className='text-base text-foreground leading-relaxed'>
                <strong>Institusjonell kvalitet:</strong> Utekos tilbyr en
                bærekraftig løsning som reduserer både kostnader og
                miljøbelastning over tid, samtidig som den gir bedre komfort og
                funksjonalitet for sluttbrukeren.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Feature Box Component - tilpasset mørkt tema
function FeatureBox({
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
    <div className='group relative bg-sidebar-foreground rounded-2xl p-8 shadow-md hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 border border-border hover:border-sky-500/50'>
      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentColor} rounded-t-2xl`}
      ></div>

      <div className='flex items-start gap-6'>
        {/* Icon */}
        <div
          className={`flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br ${accentColor} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>

        {/* Content */}
        <div className='flex-1 pt-1'>
          <h3 className='text-xl font-semibold mb-3 text-foreground'>
            {title}
          </h3>
          <p className='text-base text-muted-foreground leading-relaxed'>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
