import { CustomerNetwork } from '@/components/frontpage/CustomerNetwork'
import { CustomerStory } from '@/components/frontpage/CustomerStory'
import { SocialProofHeader } from '@/components/frontpage/SocialProofHeader'

export async function SocialProofSection() {
  return (
    <section className='mx-auto mt-16 sm:mt-24'>
      <div className='mx-auto max-w-[95%] md:max-w-7xl'>
        <SocialProofHeader />

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          <div className='rounded-[1.75rem] border border-maritime-blue/10 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--ancient-water)_68%,var(--cloud-dancer)_32%)_0%,color-mix(in_oklab,var(--overcast)_76%,var(--soft-warm)_24%)_100%)] p-8 shadow-[0_26px_70px_-52px_rgba(22,37,48,0.35)]'>
            <CustomerNetwork />
          </div>
          <div className='rounded-[1.75rem] border border-maritime-blue/10 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--ancient-water)_68%,var(--cloud-dancer)_32%)_0%,color-mix(in_oklab,var(--overcast)_76%,var(--soft-warm)_24%)_100%)] p-8 shadow-[0_26px_70px_-52px_rgba(22,37,48,0.35)]'>
            <CustomerStory />
          </div>
        </div>
      </div>
    </section>
  )
}
