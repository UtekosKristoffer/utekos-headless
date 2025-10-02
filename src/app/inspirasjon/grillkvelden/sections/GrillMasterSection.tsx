import { Card, CardContent } from '@/components/ui/card'

export function GrillMasterSection() {
  return (
    <section className='bg-sidebar-foreground py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-fluid-display mb-8 font-bold tracking-tight'>
            Grillmestere elsker Utekos
          </h2>

          <Card className='border-neutral-800 bg-background'>
            <CardContent className='p-12'>
              <blockquote className='mb-6 text-xl italic text-foreground/90'>
                &quot;Jeg elsker å arrangere grillfester, men hatet at folk
                begynte å trekke inn så snart det ble litt kjølig. Utekos
                forandret alt. Nå er det alltid noen som har en på seg, og
                festen fortsetter ute der den hører hjemme – rundt
                grillen!&quot;
              </blockquote>
              <div className='flex items-center justify-center gap-4'>
                <div className='size-12 rounded-full bg-sidebar-foreground' />
                <div className='text-left'>
                  <p className='font-semibold'>
                    Morten &quot;Grill-Morten&quot; P.
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    Hobby-grillmester og livsnyter
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
