import { Card, CardContent } from '@/components/ui/card'
export function SocialProof() {
  return (
    <section className='py-24 bg-sidebar-foreground'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-8'>
            Skippere elsker Utekos
          </h2>

          <Card className='border-neutral-800 bg-background'>
            <CardContent className='p-12'>
              <blockquote className='text-xl italic text-foreground/90 mb-6'>
                &quot;Som mangeårig seiler er Utekos det beste båtutstyret jeg
                har kjøpt på lenge. Den er helt genial for kalde kvelder for
                anker og har i praksis utvidet sesongen vår med to
                måneder.&quot;
              </blockquote>
              <div className='flex items-center justify-center gap-4'>
                <div className='h-12 w-12 rounded-full bg-sidebar-foreground' />
                <div className='text-left'>
                  <p className='font-semibold'>Kjell-Arne Larsen</p>
                  <p className='text-sm text-muted-foreground'>
                    Seilentusiast fra Tønsberg
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
