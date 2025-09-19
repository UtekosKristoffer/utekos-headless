// Path: app/om-oss/page.tsx
import { AboutSwiper } from '@/components/about/AboutSwiper' // Importer klientkomponenten
import { Award, Leaf, Map, Mountain } from 'lucide-react'

const corePhilosophies = [
  {
    icon: Mountain,
    title: 'Lidenskap for natur',
    text: 'Utekos™ ble født ut av en dyp og varig lidenskap for den norske naturen. Fra de majestetiske fjellene til de dype, stille skogene, henter vi inspirasjon fra omgivelsene våre.'
  },
  {
    icon: Award,
    title: 'Kvalitet i hvert fiber',
    text: 'Vi inngår ingen kompromisser når det gjelder kvalitet. Hvert plagg er konstruert med nøye utvalgte, slitesterke materialer som tåler tidens tann og krevende bruk.'
  },
  {
    icon: Map,
    title: 'Designet i Norge',
    text: 'Alle våre produkter er designet og utviklet i Norge, for norske forhold. Dette sikrer funksjonalitet og passform som er skreddersydd for et aktivt liv i vårt varierte klima.'
  },
  {
    icon: Leaf,
    title: 'Bærekraft i fokus',
    text: 'Vi er forpliktet til å ta vare på naturen som inspirerer oss. Vi jobber kontinuerlig med å finne mer bærekraftige materialer og produksjonsmetoder for å redusere vårt fotavtrykk.'
  }
]

export default function AboutPage() {
  return (
    <main>
      {/* 1. Hero-seksjon */}
      <section className='py-24 text-center sm:py-32'>
        <div className='container'>
          <h1 className='text-5xl font-bold tracking-tight sm:text-6xl'>
            Utekos™
          </h1>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            Premium friluftsklær for krevende norske forhold.
          </p>
        </div>
      </section>

      <section className='container mx-auto max-w-6xl px-4 py-16'>
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4'>
          {corePhilosophies.map(item => (
            <div key={item.title} className='text-center'>
              <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary'>
                <item.icon className='h-6 w-6 text-primary-foreground' />
              </div>
              <h3 className='mt-6 text-xl font-semibold'>{item.title}</h3>
              <p className='mt-2 text-muted-foreground'>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='container mx-auto max-w-6xl px-4 py-16'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Et glimt av Utekos
          </h2>
          <p className='mt-4 text-lg leading-8 text-muted-foreground'>
            Kvalitet og design som tåler elementene.
          </p>
        </div>
        <div className='mt-12'>
          <AboutSwiper />
        </div>
      </section>

      <section className='py-24 sm:py-32'>
        <div className='container mx-auto max-w-3xl px-4 text-center'>
          <div className='rounded-lg border border-neutral-800 bg-[hsl(0,0%,4%,1)] p-12'>
            <h2 className='text-3xl font-bold tracking-tight'>Vårt Løfte</h2>
            <p className='mt-6 text-lg leading-8 text-muted-foreground'>
              Vårt løfte til deg er enkelt: å levere friluftsklær av ypperste
              kvalitet som forbedrer din naturopplevelse, uansett vær. Med
              Utekos™ er du alltid klar for eventyr.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
