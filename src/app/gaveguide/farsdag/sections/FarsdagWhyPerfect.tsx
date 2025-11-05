// Path: src/app/gaveguide/farsdag/sections/FarsdagWhyPerfect.tsx

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
      <div className='w-full max-w-4xl px-6 py-20 sm:py-28'>
        <h2 className='text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-center mb-12'>
          Derfor er Utekos den perfekte farsdagsgaven
        </h2>

        <div className='space-y-8'>
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className='flex gap-6 p-6 rounded-lg bg-sidebar-foreground/30 hover:bg-sidebar-foreground/50 transition-colors'
            >
              <div className='flex-shrink-0 pt-1'>
                <CheckCircle2
                  className='h-6 w-6 text-green-500'
                  aria-hidden='true'
                />
              </div>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold leading-7 text-primary-foreground mb-2'>
                  {reason.title}
                </h3>
                <p className='text-base leading-relaxed text-muted-foreground'>
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
