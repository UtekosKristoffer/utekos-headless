'use cache'

import { CustomerNetwork } from '@/components/frontpage/CustomerNetwork'
import { CustomerStory } from '@/components/frontpage/CustomerStory'

export async function SocialProofSection() {
  return (
    <section className='mx-auto mb-16 pt-12 sm:py-12'>
      <div className='mx-auto md:max-w-7xl max-w-[95%]'>
        <div className='mb-16 text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Drevet av ekte opplevelser
          </h2>
          <p className='mx-auto mt-4 max-w-3xl text-lg text-accent/80'>
            Våre beste produktutviklere er kundene våre. Vi lytter, lærer og
            designer for å løse reelle behov – slik at du kan skape flere og
            bedre minner utendørs.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          <div className='rounded-xl border border-neutral-800 bg-sidebar-foreground p-8'>
            <CustomerNetwork />
          </div>
          <div className='rounded-xl border border-neutral-800 bg-sidebar-foreground p-8'>
            <CustomerStory />
          </div>
        </div>
      </div>
    </section>
  )
}
