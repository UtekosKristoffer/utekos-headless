'use client'

import { motion } from 'framer-motion'

// Datastruktur for testimoniene
const testimonials = [
  {
    quote:
      'Har blitt min faste følgesvenn på hytta. Følelsen av å kunne sitte ute i en stjerneklar natt uten å tenke på kulden er rett og slett uvurderlig.',
    name: 'Kari L.',
    context: 'Hytteeier, Valdres'
  },
  {
    quote:
      'Endelig et plagg som forstår bobil-livet. Lett å slenge på seg og helt genial for å holde varmen på kjølige stopp underveis. Kvaliteten kjennes i hver søm.',
    name: 'Bjørn H.',
    context: 'Bobilentusiast'
  },
  {
    quote:
      'Kjøpte denne før sommeren, og den har forlenget utallige kvelder i båten med venner. Flere har spurt hvor den er fra. Verdt hver eneste krone.',
    name: 'Anne og Per',
    context: 'Båteiere'
  }
]

export function TestimonialConstellation() {
  return (
    <section className='py-24 mx-auto max-w-[95%] md:max-w-7xl sm:py-32'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Hva sier andre livsnytere?
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
            Ekte tilbakemeldinger fra kunder som, i likhet med deg, verdsetter
            komfort og kvalitetstid.
          </p>
        </div>

        <div className='relative'>
          {/* Horisontal "Databus"-linje */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
            viewport={{ once: true, amount: 0.5 }}
            className='absolute top-4 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-blue-500 via-pink-500 to-green-500'
          />

          {/* Grid for testimoniene */}
          <div className='grid grid-cols-1 gap-x-8 gap-y-16 pt-16 lg:grid-cols-3'>
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                className='relative flex flex-col'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                {/* Vertikal koblingslinje */}
                <div className='absolute -top-12 left-4 h-12 w-0.5'>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + i * 0.2,
                      ease: 'easeOut'
                    }}
                    className='h-full w-full origin-bottom bg-neutral-800'
                  />
                </div>

                <div className='flex h-full flex-col rounded-xl bg-sidebar-foreground p-8'>
                  <blockquote className='flex-grow text-base text-foreground/90'>
                    <p>&quot;{testimonial.quote}&quot;</p>
                  </blockquote>
                  <footer className='mt-6'>
                    <p className='font-semibold'>{testimonial.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      {testimonial.context}
                    </p>
                  </footer>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
