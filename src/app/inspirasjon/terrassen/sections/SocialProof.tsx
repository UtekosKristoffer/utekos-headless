import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image' // Importer Image-komponent

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
                <Image // Bruk Image-komponent her
                  src='/kristin.webp'
                  alt='Kristin'
                  width={48} // Matche size-12 (48px)
                  height={48} // Matche size-12 (48px)
                  className='size-12 rounded-full object-cover'
                />
                <div className='text-left'>
                  <p className='font-semibold'>Kristin</p>
                  <p className='text-sm text-muted-foreground'>
                    Eneboligeier fra Ulvik
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
