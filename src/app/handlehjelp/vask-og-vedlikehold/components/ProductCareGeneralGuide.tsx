import { PackageOpen, WashingMachine, Wind, Archive } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface CareStep {
  id: string
  step: string
  title: string
  icon: LucideIcon
  content: ReactNode
}

const steps: CareStep[] = [
  {
    id: 'forberedelse',
    step: 'Steg 1',
    title: 'Forberedelse',
    icon: PackageOpen,
    content: (
      <>
        <p>
          Lukk alle glidelåser, fest borrelås og tøm lommer. Vreng plagget før vask – det skåner ytterstoffet
          og bevarer DWR-behandlingen som gjør at vann preller av.
        </p>
        <p className='opacity-90'>
          Sjekk vaskelappen for materialspesifikke detaljer. Hvert Utekos-plagg er merket med presise
          instruksjoner for nettopp den sammensetningen.
        </p>
      </>
    )
  },
  {
    id: 'vask',
    step: 'Steg 2',
    title: 'Vask',
    icon: WashingMachine,
    content: (
      <>
        <p>
          Vask på skånsomt program med kaldt eller lunkent vann og et mildt vaskemiddel uten optisk hvitt.
          Fyll trommelen halvfull – plagget trenger plass for å bli skikkelig rent.
        </p>
        <p className='opacity-90'>
          Unngå tøymykner. Det legger seg som en usynlig film over fibrene og reduserer både pusteegenskaper
          og isolasjon over tid.
        </p>
      </>
    )
  },
  {
    id: 'torking',
    step: 'Steg 3',
    title: 'Tørking',
    icon: Wind,
    content: (
      <>
        <p>
          For dun: tørketrommel på lav varme med tørkeballer eller rene tennisballer. Avbryt syklusen et par
          ganger og rist plagget for å løse opp eventuelle klumper.
        </p>
        <p className='opacity-90'>
          For mikrofiber: heng plagget luftig. Det tørker raskt og bevarer fiberstrukturen best uten
          varmebehandling. Plagget skal være 100 % gjennomtørt før neste steg.
        </p>
      </>
    )
  },
  {
    id: 'oppbevaring',
    step: 'Steg 4',
    title: 'Oppbevaring',
    icon: Archive,
    content: (
      <>
        <p>
          Heng plagget på en stødig henger i et tørt og luftig skap mellom sesongene. Dunet trenger luft for å
          bevare spensten som gir varmen.
        </p>
        <p className='opacity-90'>
          Unngå kompresjonsposer og plastomslag over lengre tid. Kortvarig pakking under reise er greit –
          langtidslagring komprimert er ikke.
        </p>
      </>
    )
  }
]

export function ProductCareGeneralGuide() {
  return (
    <section aria-labelledby='generell-guide-heading' className='mx-auto mt-16 max-w-4xl scroll-mt-24'>
      <div className='mb-10 text-center'>
        <h2 id='generell-guide-heading' className='text-2xl font-bold   text-maritime-darkest sm:text-3xl'>
          Slik tar du vare på plagget
        </h2>
        <p className='mx-auto mt-3 max-w-2xl text-base text-maritime-darkest/76'>
          Fire steg som gjelder for alle Utekos-plagg. Materialspesifikke detaljer finner du lenger ned.
        </p>
      </div>

      <ol className='grid gap-4 sm:gap-5'>
        {steps.map(({ id, step, title, icon: Icon, content }) => (
          <li
            key={id}
            id={id}
            className='scroll-mt-24 rounded-2xl border border-maritime-darkest/10 bg-cloud-dancer/68 p-5 shadow-[0_20px_54px_-46px_color-mix(in_oklab,var(--maritime-darkest)_72%,transparent)] sm:p-7'
          >
            <div className='flex items-start gap-4 sm:gap-5'>
              <span
                aria-hidden='true'
                className='flex size-11 shrink-0 items-center justify-center rounded-full border border-havdyp/30 bg-havdyp text-cloud-dancer sm:size-12'
              >
                <Icon className='size-5 sm:size-[1.375rem]' />
              </span>
              <div className='min-w-0 flex-1'>
                <p className='text-xs font-medium   text-maritime-darkest/62'>{step}</p>
                <h3 className='mt-1 text-xl font-semibold   text-maritime-darkest sm:text-2xl'>{title}</h3>
                <div className='mt-3 space-y-3 text-base leading-relaxed text-maritime-darkest/82'>
                  {content}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
