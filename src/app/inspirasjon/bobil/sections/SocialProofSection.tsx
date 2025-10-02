import { Card, CardContent } from '@/components/ui/card'

export function SocialProofSection() {
  return (
    <section className='bg-sidebar-foreground py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-fluid-display mb-8 font-bold tracking-tight'>
            Bobilister elsker Utekos
          </h2>

          <Card className='border-neutral-800 bg-background'>
            <CardContent className='p-12'>
              <blockquote className='mb-6 text-xl italic text-foreground/90'>
                &quot;Vi har brukt bobilen i 15 år, men Utekos har virkelig
                forandret opplevelsen. Nå starter vi sesongen i mars og
                avslutter i november. De kjølige morgenene og kveldene er ikke
                lenger et problem - vi koser oss ute uansett temperatur!&quot;
              </blockquote>
              <div className='flex items-center justify-center gap-4'>
                <div className='size-12 rounded-full bg-sidebar-foreground' />
                <div className='text-left'>
                  <p className='font-semibold'>Anne & Per Olsen</p>
                  <p className='text-sm text-muted-foreground'>
                    Erfarne bobilister fra Bergen
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
