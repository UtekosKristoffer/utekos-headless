import { tecDawnData } from './data'
import { Scale, StretchHorizontal, GitCommitVertical } from 'lucide-react'

const techDawnFeatures = [
  {
    Icon: Scale,
    title: 'Personlig passform',
    description:
      'En elegant silhuett som gir full bevegelsesfrihet uten unødvendig volum.'
  },
  {
    Icon: StretchHorizontal,
    title: 'Justerbar midje',
    description:
      'Innvendig snorstramming lar deg enkelt forme silhuetten og stenge den kalde trekken ute.'
  },
  {
    Icon: GitCommitVertical,
    title: 'Kvalitet i detaljene',
    description:
      'YKK®-glidelåser i verdensklasse garanterer langvarig og problemfri bruk.'
  }
]
export function TechDawnSizeGuide() {
  return (
    <section className='text-white bg-black' id='tech-dawn-size-guide'>
      <div className='container mx-auto px-4 py-12 text-center'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Utekos TechDawn™ - Presisjon i hver størrelse
          </h2>
          <p className='mt-4 text-lg text-neutral-300'>
            For livsnyteren som verdsetter både funksjon og form, er TechDawn
            designet med en mer kroppsnær passform. Dette gir deg suveren
            bevegelsesfrihet og effektiv varme, pakket inn i et nettere design –
            perfekt for et aktivt liv på hytten, i bobilen eller på kjølige
            kvelder på terrassen.
          </p>
        </div>

        <div className='mt-12 max-w-3xl mx-auto text-left space-y-6 text-neutral-300'>
          <p>
            TechDawn sine størrelser har en mer tradisjonell progresjon for å
            sikre at du finner en størrelse som passer perfekt til din
            kroppstype.
          </p>
          <p>
            Valget ditt bør baseres på hvordan du har tenkt til å bruke den og
            hvilken passform du foretrekker for tekniske plagg.
          </p>
        </div>

        <div className='mt-16 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3 max-w-6xl mx-auto'>
          <div className='bg-neutral-900/50 p-8 rounded-lg text-left'>
            <h3 className='text-xl font-semibold leading-7'>
              Velg Liten hvis...
            </h3>
            <ul className='mt-4 list-disc list-inside space-y-2 text-neutral-300'>
              <li>Du ønsker en mer kroppsnær passform som sitter pent.</li>
              <li>Du ser for deg å bruke den over en tynnere genser.</li>
              <li>Du vil ha en nettere silhuett uten overflødig volum.</li>
            </ul>
          </div>
          <div className='bg-neutral-900/50 p-8 rounded-lg text-left'>
            <h3 className='text-xl font-semibold leading-7'>
              Velg Medium hvis...
            </h3>
            <ul className='mt-4 list-disc list-inside space-y-2 text-neutral-300'>
              <li>Du ønsker en allsidig passform med litt ekstra plass.</li>
              <li>Du vil ha plass til en god og tykk strikkegenser under.</li>
              <li>Du vipper mellom to størrelser og prioriterer komfort.</li>
            </ul>
          </div>
          <div className='bg-neutral-900/50 p-8 rounded-lg text-left'>
            <h3 className='text-xl font-semibold leading-7'>
              Velg Large hvis...
            </h3>
            <ul className='mt-4 list-disc list-inside space-y-2 text-neutral-300'>
              <li>Du foretrekker en romslig og avslappet følelse.</li>
              <li>Du elsker å ha god plass til flere lag på kalde dager.</li>
              <li>Du verdsetter maksimal komfort og bevegelsesfrihet.</li>
            </ul>
          </div>
        </div>

        <div className='mt-20 max-w-4xl mx-auto'>
          <h3 className='text-2xl font-bold tracking-tight'>
            Gjennomtenkte detaljer for din komfort
          </h3>
          <div className='mt-8 grid grid-cols-1 gap-12 sm:grid-cols-3'>
            {techDawnFeatures.map(feature => (
              <div
                key={feature.title}
                className='flex flex-col items-center gap-4'
              >
                <div className='flex items-center justify-center h-12 w-12 rounded-full bg-neutral-900'>
                  <feature.Icon
                    className='h-6 w-6 text-sky-800'
                    aria-hidden='true'
                  />
                </div>
                <div className='text-center'>
                  <p className='font-semibold'>{feature.title}</p>
                  <p className='mt-1 text-sm text-neutral-400'>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-20 flow-root'>
          <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
              <div className='overflow-hidden border border-neutral-800 rounded-lg'>
                <table className='min-w-full divide-y divide-neutral-800 bg-neutral-950'>
                  <thead className='bg-neutral-900'>
                    <tr>
                      <th
                        scope='col'
                        className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6'
                      >
                        Måling
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-center text-sm font-semibold'
                      >
                        Liten
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-center text-sm font-semibold'
                      >
                        Middels
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-center text-sm font-semibold'
                      >
                        Stor
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-neutral-800'>
                    {tecDawnData.map(item => (
                      <tr key={item.measurement}>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm text-left font-medium sm:pl-6'>
                          {item.measurement}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-neutral-300 text-center'>
                          {item.liten}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-neutral-300 text-center'>
                          {item.middels}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-neutral-300 text-center'>
                          {item.stor}
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
    </section>
  )
}
