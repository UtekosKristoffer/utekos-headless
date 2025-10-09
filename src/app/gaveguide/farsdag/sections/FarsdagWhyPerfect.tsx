import { CheckCircle2 } from 'lucide-react'

const reasons = [
  {
    title: 'En gave som blir brukt',
    description:
      'Dette er en praktisk og meningsfull gave som løser et reelt problem: å holde seg varm og komfortabel ute.'
  },
  {
    title: 'Vis at du bryr deg',
    description:
      'Du gir ikke bare et produkt, du gir bort en opplevelse av varme, omsorg og mer kvalitetstid.'
  },
  {
    title: 'Kvalitet som varer',
    description:
      'Laget for å tåle mange år med hygge. En investering i hans velvære og en gave som minner ham om deg, år etter år.'
  }
]

export function FarsdagWhyPerfect() {
  return (
    <section className='flex w-full flex-col items-center bg-background border-b border-neutral-800'>
      <div className='w-full max-w-4xl px-6 py-16 text-center lg:px-8 sm:py-24'>
        <h2 className='text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl'>
          Derfor er Utekos den perfekte farsdagsgaven
        </h2>
        <div className='mt-12 space-y-10 text-left'>
          {reasons.map(reason => (
            <div key={reason.title} className='relative flex'>
              <div className='flex-shrink-0'>
                <CheckCircle2
                  className='h-6 w-6 text-blue-600'
                  aria-hidden='true'
                />
              </div>
              <div className='ml-4'>
                <h3 className='text-lg font-semibold leading-6 text-primary-foreground'>
                  {reason.title}
                </h3>
                <p className='mt-2 text-base text-muted-foreground'>
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
