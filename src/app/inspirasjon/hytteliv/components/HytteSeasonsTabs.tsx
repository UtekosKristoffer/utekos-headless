// HytteSeasonsTabs.tsx (Server Component - statisk sesong-grid)

import { HytteSeasonsAnimator } from './HytteSeasonsAnimator'

const seasons = [
  { value: 'spring', label: 'Vår', title: 'Kjenn våren komme', description: 'Påskesol og vårfølelse' },
  { value: 'summer', label: 'Sommer', title: 'Lange, lyse kvelder', description: 'Senk skuldrene helt' },
  { value: 'autumn', label: 'Høst', title: 'Kaldt og vakkert', description: 'Klar for hyttekos' },
  { value: 'winter', label: 'Vinter', title: 'Vintervarme etter skituren', description: 'Få varme raskt' }
] as const

export function HytteSeasonsTabs() {
  return (
    <HytteSeasonsAnimator>
      <ul className='mx-auto grid max-w-lg sm:maw-w-xl md:max-w-2xl lg:max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 xl:max-w-7xl'>
        {seasons.map(season => (
          <li key={season.value} data-season={season.value} className='flex flex-col gap-3'>
            <figure className='m-0 flex flex-col gap-3'>
              <div className='hytte-season-card flex aspect-video items-center justify-center overflow-hidden rounded-2xl px-6 text-center'>
                {season.value === 'winter' && <span className='hytte-season-sheen' aria-hidden='true' />}
                <div className='hytte-season-motion'>
                  <h3 className='font-google-sans-grade [--gs-grad:100] text-balance text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-foreground text-center xl:text-[3.2rem]'>
                    {season.title}
                    <br />
                    <span className='hytte-season-accent font-google-sans-grade [--gs-grad:100] text-darkberry'>
                      {season.description}
                    </span>
                  </h3>
                </div>
              </div>
              <figcaption className='text-lg font-utekos-text-medium tracking-[-0.01em] text-maritime-darkest'>
                {season.label}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </HytteSeasonsAnimator>
  )
}
