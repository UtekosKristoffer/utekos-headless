import { Card, CardContent } from '@/components/ui/card'

export function SocialProof() {
  return (
    <section className='bg-sidebar-foreground py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-fluid-display mb-8 font-bold tracking-tight'>
            Hyttefolk elsker Utekos
          </h2>

          <Card className='border-neutral-800 bg-background'>
            <CardContent className='p-12'>
              <blockquote className='mb-6 text-xl italic text-foreground/90'>
                &quot;Utekos har blitt en &quot;hytte-uniform&quot;. Vi bruker
                den fra vi står opp til vi legger oss. Terrasssesongen vår
                starter nå i april i stedet for juni. Rett og slett
                uunnværlig!&quot;
              </blockquote>
              <div className='flex items-center justify-center gap-4'>
                <div className='size-12 rounded-full bg-sidebar-foreground' />
                <div className='text-left'>
                  <p className='font-semibold'>Erik & Maja Johansen</p>
                  <p className='text-sm text-muted-foreground'>
                    Hytteeiere i Trysil
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
