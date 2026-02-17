import { CustomerNetwork } from '@/components/frontpage/sections/SocialProofSection/components/CustomerNetwork'
import { CustomerStory } from '@/components/frontpage/sections/SocialProofSection/components/CustomerStory'
import { SocialProofHeader } from '@/components/frontpage/sections/SocialProofSection/components/SocialProofHeader'

export async function SocialProofSection() {
  return (
    <section className='mx-auto mb-16 pt-12 sm:py-12'>
      <div className='mx-auto max-w-[95%] md:max-w-7xl'>
        <SocialProofHeader />

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
