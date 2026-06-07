// Path: src/app/inspirasjon/hytteliv/HytteSeasonsTabs.tsx
import { HytteSeasonsAnimator } from './HytteSeasonsAnimator'

// Vi utvider data-objektet med spesifikke farger fra premium-paletten din for hver sesong
const seasons = [
  {
    value: 'spring',
    label: 'Vår',
    title: 'Kjenn våren komme',
    description: 'Påskesol og vårfølelse',
    cardBg: 'bg-fairest-jade/30',
    borderColor: 'border-fairest-jade/50',
    accentColor: 'text-cloud-dancer/60'
  },
  {
    value: 'summer',
    label: 'Sommer',
    title: 'Lange, lyse kvelder',
    description: 'Senk skuldrene helt',
    cardBg: 'bg-iced-apricot/20',
    borderColor: 'border-iced-apricot/40',
    accentColor: 'text-cloud-dancer/60'
  },
  {
    value: 'autumn',
    label: 'Høst',
    title: 'Kaldt og vakkert',
    description: 'Klar for hyttekos',
    cardBg: 'bg-chai-tea/20',
    borderColor: 'border-chai-tea/40',
    accentColor: 'text-cloud-dancer/60'
  },
  {
    value: 'winter',
    label: 'Vinter',
    title: 'Varme etter skituren',
    description: 'Umiddelbar komfort',
    cardBg: 'bg-very-peri/15',
    borderColor: 'border-very-peri/30',
    accentColor: 'text-cloud-dancer/60'
  }
] as const

export function HytteSeasonsTabs() {
  return (
    // Pakker komponenten inn i en section med white-sand for å bryte mot den mørke seksjonen over
    <section className='w-full bg-white-sand py-24'>
      <div className='container mx-auto px-4'>
        {/* Overskrift for seksjonen for å lede kunden inn */}
        <div className='mx-auto mb-16 max-w-3xl text-center'>
          <h2 className='font-google-sans text-4xl font-bold tracking-tight text-maritime-darkest md:text-5xl'>
            En venn gjennom hele året
          </h2>
        </div>

        <HytteSeasonsAnimator>
          <ul className='mx-auto grid max-w-lg grid-cols-1 gap-6 sm:max-w-xl md:max-w-2xl sm:grid-cols-2 lg:max-w-4xl xl:max-w-6xl'>
            {seasons.map(season => (
              <li key={season.value} data-season={season.value} className='group flex flex-col gap-4'>
                <figure className='m-0 flex flex-col gap-4'>
                  {/* Kortet får sesongens unike farge som en soft glassmorphism-effekt */}
                  <div
                    className={`hytte-season-card relative flex aspect-4/3 md:aspect-video items-center justify-center overflow-hidden rounded-3xl border ${season.borderColor} px-8 text-center shadow-sm transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
                  >
                    {/* Glassmorphism tint overlay som legger seg over den mørke bakgrunnen */}
                    <div
                      className={`absolute inset-0 -z-10 mix-blend-overlay ${season.cardBg}`}
                      aria-hidden='true'
                    />

                    {/* Vinter-sheen effekten beholdes, men justert subtilt */}
                    {season.value === 'winter' && (
                      <span
                        className='hytte-season-sheen absolute inset-0 bg-linear-to-tr from-transparent via-cloud-dancer/40 to-transparent opacity-0 transition-opacity duration-1000 group-hover:opacity-100'
                        aria-hidden='true'
                      />
                    )}

                    <div className='hytte-season-motion'>
                      <h3 className='font-google-sans-grade [--gs-grad:100] text-balance text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-cloud-dancer md:text-4xl xl:text-[2.8rem]'>
                        {season.title}
                        <br />
                        <span
                          className={`hytte-season-accent mt-3 block text-xl font-medium tracking-normal ${season.accentColor}`}
                        >
                          {season.description}
                        </span>
                      </h3>
                    </div>
                  </div>

                  {/* Etiketten under kortet gjort stram og eksklusiv */}
                  <figcaption className='text-left font-utekos-text-medium text-sm font-bold tracking-[0.15em] text-maritime-darkest'>
                    {season.label}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </HytteSeasonsAnimator>
      </div>
    </section>
  )
}
