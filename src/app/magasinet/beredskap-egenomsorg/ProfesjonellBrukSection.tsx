// Path: src/app/magasinet/beredskap-egenomsorg/ProfesjonellBrukSection.tsx
import { Building, RefreshCw, Archive } from 'lucide-react'

export function ProfesjonellBrukSection() {
  return (
    <section className='py-16 md:py-24 bg-background'>
      <div className='max-w-4xl mx-auto px-6'>
        <div className='mb-12 space-y-4'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-balance text-foreground'>
            En robust løsning for kommuner og bedrifter
          </h2>
          <div className='h-1 w-24 md:w-[17%] bg-gradient-to-r from-sky-900 to-sky-700 rounded-full'></div>
        </div>

        <div className='mb-10'>
          <p className='text-lg md:text-xl text-article-white leading-relaxed'>
            For kommuner, frivillige organisasjoner, eller bedrifter som
            håndterer et beredskapslager, er Utekos en langsiktig og økonomisk
            investering.
          </p>
        </div>

        <div className='space-y-6'>
          <FeatureBox
            icon={<RefreshCw className='h-6 w-6' />}
            title='Bygget for gjenbruk'
            description='Utekos™-serien er enkelt å vedlikeholde og kan maskinvaskes skånsomt. Kombinert med YKK®-glidelåser og slitesterke materialer er dette et produkt som er klart for neste gangs bruk.'
            accentColor='from-sky-900 to-sky-700'
          />

          <FeatureBox
            icon={<Archive className='h-6 w-6' />}
            title='Kompakt og lagringsdyktig'
            description=' Lagringsplass er en verdifull ressurs. Med Utekos Stapper™ kan plaggene komprimeres med over 50%, noe som reduserer lagringsvolumet drastisk og gjør logistikken enklere.'
            accentColor='from-sky-900 to-sky-700'
          />
        </div>

        <div className='mt-12 p-6 bg-sky-500/10 backdrop-blur-sm rounded-xl border border-sky-500/30'>
          <div className='flex flex-col sm:flex-row items-start gap-4'>
            <Building className='h-6 w-6 text-sky-400 flex-shrink-0 mt-1' />
            <div className='sm:flex-1 sm:min-w-0'>
              <p className='text-base text-foreground leading-relaxed'>
                <span className='block font-semibold text-sky-400'>
                  Institusjonell kvalitet
                </span>
                <span className='block'>
                  Utekos tilbyr en bærekraftig løsning som reduserer både
                  kostnader og miljøbelastning over tid, samtidig som den gir
                  bedre komfort og funksjonalitet for sluttbrukeren.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

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
    <div className='group relative bg-sidebar-foreground rounded-2xl p-8 shadow-md hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 border hover:border-border border-sky-500/50'>
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentColor} rounded-t-2xl`}
      ></div>
      <div className='flex flex-col sm:flex-row items-start gap-6'>
        <div
          className={`flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br ${accentColor} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>

        <div className='flex-1 pt-1'>
          <h3 className='text-xl font-semibold mb-3 text-foreground'>
            {title}
          </h3>
          <p className='text-base text-article-whiteleading-relaxed'>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
