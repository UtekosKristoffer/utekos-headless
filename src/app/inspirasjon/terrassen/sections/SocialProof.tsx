import { Card, CardContent } from '@/components/ui/card'

export function SocialProof() {
  return (
    <section className='bg-sidebar-foreground py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-fluid-display mb-8 font-bold tracking-tight'>
            Huseiere elsker Utekos
          </h2>

          <Card className='border-neutral-800 bg-background'>
            <CardContent className='p-12'>
              <blockquote className='mb-6 text-xl italic text-foreground/90'>
                &quot;Vi har doblet bruken av terrassen etter at vi fikk Utekos
                i hus. Den brukes av hele familien, fra tenåringen som vil sitte
                ute med venner, til oss voksne som endelig kan nyte kveldene ute
                uten å pakke oss inn i ti tepper.&quot;
              </blockquote>
              <div className='flex items-center justify-center gap-4'>
                <div className='size-12 rounded-full bg-sidebar-foreground' />
                <div className='text-left'>
                  <p className='font-semibold'>Familien Nordmann</p>
                  <p className='text-sm text-muted-foreground'>
                    Eneboligeiere fra Asker
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
