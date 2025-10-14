import Image from 'next/image'

interface UseCase {
  title: string
  description: string
  image: string
  tip?: string
}

const useCases: UseCase[] = [
  {
    title: 'På terrassen',
    description:
      'Start dagen med kaffe ute, selv når duggen ligger tung. TechDawn™ holder deg varm og komfortabel.',
    image: '/magasinet/helene-marius.png',
    tip: 'Ha alltid TechDawn™ hengende ved terrassedøren'
  },
  {
    title: 'Kvelden ved bålet',
    description:
      'Forleng de gode stundene rundt bålet. Når flammene dør ut, tar TechDawn™ over varmen.',
    image: '/magasinet/utekos-balpanne.png',
    tip: 'Perfekt over ullgenseren når temperaturen faller'
  },
  {
    title: 'Båtturen i skumringen',
    description:
      'Fuktig sjøluft er ingen match for TechDawn™. Nyt solnedgangen fra dekk uten å fryse.',
    image: '/magasinet/bat.png',
    tip: 'Oppbevar en TechDawn™ permanent i båten'
  },
  {
    title: 'Ankomst til kald hytte',
    description:
      'Mens peisen varmer opp, holder TechDawn™ deg behagelig varm fra første sekund.',
    image: '/magasinet/1080-helfront-.png',
    tip: 'Bruk 3-i-1 funksjonen som teppe mens du venter'
  }
]

export function TechDawnUseCases() {
  return (
    <section className='py-20 bg-gradient-to-b from-black to-gray-900/30'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-light mb-4'>
            Fire øyeblikk, én løsning
          </h2>
          <p className='text-gray-400 max-w-2xl mx-auto'>
            Fra soloppgang til stjerneklar natt – TechDawn™ følger deg gjennom
            dagens beste stunder
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-12'>
          {useCases.map((useCase, index) => (
            <div key={index} className='group'>
              {/* Image Container */}
              <div className='relative aspect-[4/3] rounded-xl overflow-hidden mb-6'>
                <Image
                  src={useCase.image}
                  alt={useCase.title}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-700'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />

                {/* Number Badge */}
                <div
                  className='absolute top-4 left-4 w-10 h-10 rounded-full 
                              bg-black/50 backdrop-blur-sm border border-white/20 
                              flex items-center justify-center'
                >
                  <span className='text-white font-light'>{index + 1}</span>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className='text-xl font-semibold mb-3 text-white'>
                  {useCase.title}
                </h3>
                <p className='text-gray-400 mb-4'>{useCase.description}</p>

                {useCase.tip && (
                  <div className='flex items-start gap-2 text-sm'>
                    <span className='text-yellow-400 mt-0.5'>💡</span>
                    <span className='text-gray-500 italic'>
                      Tips: {useCase.tip}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className='text-center mt-16 p-8 bg-gradient-to-r from-gray-900/50 via-gray-800/30 to-gray-900/50 
                      rounded-2xl border border-gray-800'
        >
          <p className='text-lg text-gray-300 mb-2'>
            Klar for bekymringsfri komfort?
          </p>
          <p className='text-gray-500'>
            TechDawn™ – fordi de beste øyeblikkene fortjener den beste
            komforten
          </p>
        </div>
      </div>
    </section>
  )
}
