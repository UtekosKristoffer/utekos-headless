import { CustomerNetwork } from '@/components/frontpage/CustomerNetwork'
import { CustomerStory } from '@/components/frontpage/CustomerStory'
import { SocialProofHeader } from '@/components/frontpage/SocialProofHeader'

export async function SocialProofSection() {
  return (
    <article className='mx-auto mt-16 sm:mt-24'>
      <div className='mx-auto max-w-[95%] md:max-w-7xl'>
        <SocialProofHeader />

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          <div className='rounded-[1.75rem]  bg-[linear-gradient(180deg,color-mix(in_oklab,var(--dazzling-blue)_68%,var(--dusted-peri)_32%)_0%,color-mix(in_oklab,var(--havdyp)_76%,var(--maritime-darkest)_24%)_100%)] p-8 shadow-[0_26px_70px_-52px_rgba(22,37,48,0.35)]'>
            <CustomerNetwork />
          </div>
          <div className='rounded-[1.75rem] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--dazzling-blue)_68%,var(--dusted-peri)_32%)_0%,color-mix(in_oklab,var(--havdyp)_76%,var(--maritime-darkest)_24%)_100%)] p-8 shadow-[0_26px_70px_-52px_rgba(22,37,48,0.35)]'>
            <CustomerStory />
          </div>
        </div>
      </div>
    </article>
  )
}
