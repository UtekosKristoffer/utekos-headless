export function TechDawnComparison() {
  return (
    <section className='bg-gradient-to-b from-gray-900/50 to-black pt-20'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-light pt-2 mb-4'>
            Hvilket Utekos-plagg passer deg best?
          </h2>
          <p className='text-gray-400 max-w-2xl mx-auto'>
            Alle våre plagg gir deg fantastisk komfort. Velg det som passer ditt
            bruksmønster.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-8'>
          {/* Utekos Dun */}
          <div
            className='relative bg-gradient-to-br from-blue-900/20 to-blue-900/10 
                        border border-blue-800/50 rounded-2xl p-8'
          >
            <div className='absolute top-4 right-4'>
              <span className='text-blue-400 text-sm uppercase tracking-wider'>
                Klassikerne
              </span>
            </div>

            <h3 className='text-2xl font-light mb-4'>
              Utekos Dun™ og Utekos Mikrofiber™
            </h3>

            <div className='space-y-4 mb-6'>
              <div className='flex items-start gap-3'>
                <span className='text-green-400 mt-1'>✓</span>
                <span className='text-gray-300'>
                  Uslåelig lett og luftig komfort
                </span>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-green-400 mt-1'>✓</span>
                <span className='text-gray-300'>
                  Perfekt for tørre kvelder på terrassen
                </span>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-green-400 mt-1'>✓</span>
                <span className='text-gray-300'>
                  Luksuriøs, naturlig isolasjon
                </span>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-yellow-400 mt-1'>○</span>
                <span className='text-gray-300'>Best i tørt vær</span>
              </div>
            </div>
          </div>

          {/* Utekos TechDawn */}
          <div
            className='relative bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 
                        border border-yellow-800/50 rounded-2xl p-8'
          >
            <div className='absolute top-4 right-4'>
              <span className='text-yellow-400 text-sm uppercase tracking-wider'>
                Nyheten
              </span>
            </div>

            <h3 className='text-2xl font-light mb-4'>Utekos TechDawn™</h3>

            <div className='space-y-4 mb-6'>
              <div className='flex items-start gap-3'>
                <span className='text-green-400 mt-1'>✓</span>
                <span className='text-gray-300'>
                  Dunlignende letthet og komfort
                </span>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-green-400 mt-1'>✓</span>
                <span className='text-gray-300'>
                  Bekymringsfri i fuktig vær
                </span>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-green-400 mt-1'>✓</span>
                <span className='text-gray-300'>Holder formen år etter år</span>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-green-400 mt-1'>✓</span>
                <span className='text-gray-300'>Fungerer i alt slags vær</span>
              </div>
            </div>
          </div>
        </div>

        <div className='text-center mt-12'>
          <p className='text-gray-400'>
            <span className='text-yellow-400'>Tips:</span> Mange av våre kunder
            har ulike modeller: Utekos Dun™, Utekos Mikrofiber™ eller Utekos
            TechDawn™ for de kaldeste kveldene, og Comfyrobe™ som sin
            hverdagslige følgesvenn!
          </p>
        </div>
      </div>
    </section>
  )
}
