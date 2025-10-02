import { Card, CardContent } from '@/components/ui/card'
export function SocialProofSection() {
  return (
    <section className='py-24 bg-sidebar-foreground'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto text-center'>
          <Card className='border-neutral-800 bg-background'>
            <CardContent className='p-12'>
              <blockquote className='text-xl italic text-foreground/90 mb-6'>
                &quot;Fikk Utekos i 50-årsgave av barna. Helt ærlig den beste
                gaven jeg har fått på årevis. Den brukes hver eneste helg på
                hytten, uansett vær. Anbefales!&quot;
              </blockquote>
              <div className='flex items-center justify-center gap-4'>
                <div className='h-12 w-12 rounded-full bg-sidebar-foreground' />
                <div className='text-left'>
                  <p className='font-semibold'>Bjørg H.</p>
                  <p className='text-sm text-muted-foreground'>
                    Fornøyd gavemottaker
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
