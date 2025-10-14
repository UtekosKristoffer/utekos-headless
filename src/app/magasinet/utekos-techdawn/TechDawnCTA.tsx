import Link from 'next/link'

export function TechDawnCTA() {
  return (
    <section className='py-24 px-6'>
      <div className='max-w-4xl mx-auto text-center'>
        {/* Badge */}
        <div
          className='inline-flex items-center gap-2 bg-yellow-500/10 
                      border border-yellow-500/30 rounded-full px-4 py-2 mb-8'
        >
          <span className='text-yellow-400 text-sm'>🎉</span>
          <span className='text-yellow-400 text-sm uppercase tracking-wider'>
            Lansering
          </span>
        </div>

        {/* Heading */}
        <h2 className='text-4xl font-light mb-6'>
          Opplev den nye standarden for komfort
        </h2>

        {/* Description */}
        <p className='text-xl text-gray-400 mb-12 max-w-2xl mx-auto'>
          Utekos TechDawn™ er nå tilgjengelig. Bli med tusenvis av nordmenn som
          har forlenget utesesongen.
        </p>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/produkter/utekos-techdawn'
            className='inline-flex items-center justify-center px-8 py-4 
                     bg-white text-black font-medium rounded-lg
                     hover:bg-gray-100 transition-colors duration-200'
          >
            Utforsk TechDawn™
            <svg
              className='ml-2 w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </Link>

          <Link
            href='/produkter'
            className='inline-flex items-center justify-center px-8 py-4 
                     border border-gray-700 text-white font-medium rounded-lg
                     hover:bg-gray-900 transition-colors duration-200'
          >
            Se hele kolleksjonen
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className='mt-16 pt-16 border-t border-gray-800'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            <div>
              <div className='text-3xl font-light text-white mb-2'>2.000+</div>
              <div className='text-sm text-gray-500'>Fornøyde kunder</div>
            </div>
            <div>
              <div className='text-3xl font-light text-white mb-2'>
                Trygg handel
              </div>
              <div className='text-sm text-gray-500'>
                Vi tilbyr betaling med Klarna og Vipps
              </div>
            </div>
            <div>
              <div className='text-3xl font-light text-white mb-2'>
                Fri frakt
              </div>
              <div className='text-sm text-gray-500'>
                På bestillinger over 999kr
              </div>
            </div>
            <div>
              <div className='text-3xl font-light text-white mb-2'>
                Rask levering
              </div>
              <div className='text-sm text-gray-500'>2-5 dager</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
