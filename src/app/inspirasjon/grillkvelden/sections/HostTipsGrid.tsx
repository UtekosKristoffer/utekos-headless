import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { HostTip } from '../types'
import { Music, Thermometer, Lightbulb, UtensilsCrossed } from 'lucide-react'

export const hostTipsData: HostTip[] = [
  {
    name: 'Planlegg for komfort',
    highlight: 'Ha Utekos klar til gjestene',
    icon: Thermometer,
    color: 'text-orange-400'
  },
  {
    name: 'God belysning',
    highlight: 'Lysslynger skaper magi',
    icon: Lightbulb,
    color: 'text-yellow-400'
  },
  {
    name: 'Enkel servering',
    highlight: 'Fingermat og selvbetjening',
    icon: UtensilsCrossed,
    color: 'text-cyan-400'
  },
  {
    name: 'Riktig musikk',
    highlight: 'En rolig spilleliste setter tonen',
    icon: Music,
    color: 'text-rose-400'
  }
]

export function HostTipsGrid({ tips }: { tips: HostTip[] }) {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight'>
            Vertens sjekkliste
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
            Fire enkle tips for en uforglemmelig (og komfortabel) grillkveld.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {tips.map((tip, tipIndex) => (
            <AnimatedBlock
              className='will-animate-fade-in-up'
              delay={`${tipIndex * 0.1}s`}
              threshold={0.2}
              key={tip.name}
            >
              <Card className='group border-neutral-800 bg-sidebar-foreground transition-colors hover:bg-sidebar-foreground/80'>
                <CardContent className='p-6'>
                  <div className='mb-3 flex items-start justify-between'>
                    <h3 className='text-lg font-semibold'>{tip.name}</h3>
                    <tip.icon
                      className={`size-5 ${tip.color} transition-colors group-hover:text-primary`}
                    />
                  </div>
                  <p className='text-sm text-foreground/80'>{tip.highlight}</p>
                </CardContent>
              </Card>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
