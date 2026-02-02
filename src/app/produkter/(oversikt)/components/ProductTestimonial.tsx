import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Card, CardContent } from '@/components/ui/card'

export function ProductTestimonial() {
  return (
    <section className='mx-auto my-24 max-w-3xl'>
      <AnimatedBlock
        className='will-animate-fade-in-up'
        delay='0s'
        threshold={0.5}
      >
        <Card className='border-neutral-800 bg-sidebar-foreground'>
          <CardContent className='p-12 text-center'>
            <blockquote className='text-xl italic text-foreground/90'>
              &quot;Utekos har totalt forandret hvordan vi bruker hytten om
              høsten. Kvaliteten er helt fantastisk. Anbefales på det
              varmeste!&quot;
            </blockquote>
            <p className='mt-6 font-semibold'>- Anne, hytteeier</p>
          </CardContent>
        </Card>
      </AnimatedBlock>
    </section>
  )
}
