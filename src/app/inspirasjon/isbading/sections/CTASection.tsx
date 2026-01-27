// Path: src/app/inspirasjon/isbading/sections/CTASection.tsx

import { getProducts } from '@/api/lib/products/getProducts'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { ComfyrobeQuickBuy } from './ComfyrobeQuickBuy'

export async function CTASection() {
  const response = await getProducts({ query: 'handle:comfyrobe' })
  const product = response.body?.find(p => p.handle === 'comfyrobe')
  response.body?.find(
    p =>
      p.title.toLowerCase().includes('comfyrobe')
      && !p.title.toLowerCase().includes('dun')
  ) || response.body?.[0]

  if (!product) {
    return null
  }

  return (
    <section className='relative overflow-hidden py-24 bg-sidebar-foreground/50 border-t border-white/5'>
      <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none' />

      <div className='container relative mx-auto px-4'>
        <AnimatedBlock className='will-animate-fade-in-scale mb-12 text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight mb-4'>
            Sikre deg varmen nå
          </h2>
          <p className='mx-auto max-w-2xl text-xl text-muted-foreground'>
            Gjør som hundrevis av andre isbadere. Bestill din Comfyrobe i dag og
            kjenn forskjellen.
          </p>
        </AnimatedBlock>

        <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
          <div className='mx-auto max-w-6xl bg-background/50 backdrop-blur-sm rounded-3xl p-6 md:p-12 border border-white/10 shadow-2xl'>
            <ComfyrobeQuickBuy product={product} />
          </div>
        </AnimatedBlock>
      </div>
    </section>
  )
}
