import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function GaveGuideHero() {
  return (
    <section className='py-24 text-center bg-sidebar-foreground border-b border-neutral-800'>
      <div className='container mx-auto px-4'>
        <p className='font-semibold text-primary mb-2'>Gaveguiden</p>
        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
          Gaven som varmer. Lenge.
        </h1>
        <p className='mt-6 text-xl text-muted-foreground max-w-2xl mx-auto'>
          Gi bort mer enn bare en ting – gi bort komfort, kvalitetstid og
          utallige #utekosøyeblikk. Perfekt for den som har alt, men som
          fortjener det aller beste.
        </p>
        <div className='mt-8'>
          <Button asChild size='lg'>
            <Link href='/produkter'>Se alle produkter</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
