import { Expand, Footprints, GitCommitVertical, Pocket, Lightbulb, SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import ComfyFrontSkisse from '../../../../public/ComfyFrontSkisse.png'
import { comfyrobeData } from './data'

const comfyrobeFeatures = [
  {
    Icon: Expand,
    title: 'Romslig og beskyttende',
    description:
      'Den rektangulære unisex-passformen er bevisst romslig for å enkelt passe over alt fra våte klær til en tykk genser.'
  },
  {
    Icon: Footprints,
    title: 'Full bevegelsesfrihet',
    description:
      'Splitt i sidene og bak sikrer at du kan bevege deg fritt, enten du går tur, klatrer eller bare strekker deg etter kaffekoppen.'
  },
  {
    Icon: Pocket,
    title: 'Gjennomtenkt oppbevaring',
    description:
      'To varme, fôrede sidelommer holder hendene dine lune, mens en trygg innerlomme tar vare på verdisakene dine.'
  },
  {
    Icon: SlidersHorizontal,
    title: 'Justerbare ermekanter',
    description:
      'En solid borrelåsstropp lar deg stramme ermene for å holde været ute, eller for å tilpasse passformen perfekt over hansker.'
  },
  {
    Icon: GitCommitVertical,
    title: 'Toveis YKK®-glidelås',
    description:
      'Gir deg full kontroll over ventilasjon og gjør av- og påkledning enkelt, selv når du har hendene fulle.'
  }
]
export function ComfyrobeSizeGuide() {
  return (
    <section id='comfyrobe-size-guide' className='scroll-mt-28'>
      <div className='bg-overcast text-background'>
        <div className='container mx-auto px-4 py-16 sm:py-24'>
          <div className='mx-auto max-w-3xl text-center'>
            <BrandBadge
              label='Comfyrobe™'
              backgroundColor='var(--havdyp)'
              textColor='var(--cloud-dancer)'
              className='mb-5 px-4 py-2 text-sm'
            />
            <h2 className='text-3xl font-bold leading-[1.05]   text-background sm:text-5xl'>
              Størrelsesguide for Comfyrobe™
            </h2>
          </div>

          <div className='mt-12 max-w-4xl mx-auto text-left space-y-4 text-background'>
            <p>
              Comfyrobe™ er designet som ditt personlige, beskyttende skall. Den romslige, rektangulære
              passformen er ment å være omsluttende og komfortabel, ikke figurnær. Hensikten er at den enkelt
              skal kunne trekkes over alt du har på deg, samtidig som smarte detaljer sikrer deg full
              bevegelsesfrihet.
            </p>
          </div>

          <div className='mt-12 max-w-5xl mx-auto'>
            <div className='grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8'>
              {comfyrobeFeatures.map(feature => (
                <div key={feature.title} className='flex items-start gap-4'>
                  <div className='flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-havdyp text-cloud-dancer'>
                    <feature.Icon className='size-5' aria-hidden='true' />
                  </div>
                  <div>
                    <p className='font-semibold'>{feature.title}</p>
                    <p className='mt-1 text-sm text-background'>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='mx-auto mt-16 max-w-3xl rounded-lg border border-background/10 bg-havdyp p-6 shadow-[0_18px_44px_-36px_color-mix(in_oklab,var(--background)_72%,transparent)]'>
            <div className='flex items-start gap-4'>
              <Lightbulb className='size-8 flex-shrink-0 text-background' />
              <div>
                <h3 className='text-lg font-semibold text-cloud-dancer'>
                  Vårt beste tips for å velge riktig
                </h3>
                <p className='mt-1 text-cloud-dancer'>
                  Tenk på hvordan du vil bruke plagget. Ønsker du en passform som er romslig, men som følger
                  deg? Velg din normale størrelse. Ser du for deg maksimal plass til tykke lag under, eller en
                  bevisst overdimensjonert stil? Da kan du vurdere å gå opp en størrelse. Det er ingen fasit –
                  det viktigste er hva du føler deg mest komfortabel i.
                </p>
              </div>
            </div>
          </div>
          <div className='mt-12 flow-root'>
            <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                <div className='max-w-6xl mx-auto'>
                  <div className='mb-4 flex items-center justify-center rounded-lg border border-background/10 bg-havdyp p-4'>
                    <Image
                      src={ComfyFrontSkisse}
                      alt='Skisse av Comfyrobe med mål'
                      width={597}
                      height={503}
                      className='rounded-lg bg-cloud-dancer object-contain'
                    />
                  </div>
                  <div className='mt-12 overflow-hidden rounded-lg border border-background/10 shadow-[0_18px_44px_-36px_color-mix(in_oklab,var(--background)_72%,transparent)]'>
                    <table className='min-w-full divide-y divide-background/10 bg-cloud-dancer'>
                      <thead className='bg-havdyp text-cloud-dancer'>
                        <tr>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6'
                          >
                            Måling
                          </th>
                          <th scope='col' className='px-3 py-3.5 text-center text-sm font-semibold'>
                            Small
                          </th>
                          <th scope='col' className='px-3 py-3.5 text-center text-sm font-semibold'>
                            Medium
                          </th>
                          <th scope='col' className='px-3 py-3.5 text-center text-sm font-semibold'>
                            Large
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-background/10'>
                        {comfyrobeData.map(row => (
                          <tr key={row.measurement}>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm text-left font-medium sm:pl-6'>
                              {row.measurement}
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-background/78 text-center'>
                              {row.xs}
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-background/78 text-center'>
                              {row.ml}
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-background/78 text-center'>
                              {row.lxl}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
