// Path: src/app/inspirasjon/isbading/sections/CTASection.tsx

import { getProducts } from '@/api/lib/products/getProducts'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { ComfyrobeQuickBuy } from './ComfyrobeQuickBuy'

export async function CTASection() {
  const response = await getProducts({ query: 'handle:comfyrobe' })
  const product =
    response.body?.find(p => p.handle === 'comfyrobe') ??
    response.body?.find(
      p => p.title.toLowerCase().includes('comfyrobe') && !p.title.toLowerCase().includes('dun')
    ) ??
    response.body?.[0]

  if (!product) {
    return null
  }

  return (
    <section className='relative overflow-hidden border-t border-cloud-dancer/12 bg-background py-24'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,var(--ancient-water)_0%,transparent_34%),radial-gradient(circle_at_85%_10%,var(--soft-warm)_0%,transparent_28%)] opacity-[0.18]' />

      <div className='container relative mx-auto px-4'>
        <AnimatedBlock className='will-animate-fade-in-scale mb-12 text-center'>
          <h2 className='mb-4 text-fluid-display font-bold leading-[0.95] tracking-normal text-cloud-dancer'>
            Sikre deg varmen nå
          </h2>
          <p className='mx-auto max-w-2xl text-xl leading-[1.45] tracking-normal text-overcast'>
            Gjør som hundrevis av andre isbadere. Bestill din Comfyrobe i dag og kjenn forskjellen.
          </p>
        </AnimatedBlock>

        <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
          <div className='mx-auto max-w-6xl rounded-3xl border border-cloud-dancer/12 bg-havdyp/18 p-6 shadow-2xl backdrop-blur-sm md:p-12'>
            <ComfyrobeQuickBuy product={product} />
          </div>
        </AnimatedBlock>
      </div>
    </section>
  )
}
