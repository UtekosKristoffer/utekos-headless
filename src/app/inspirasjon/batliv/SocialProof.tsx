import { Card, CardContent } from '@/components/ui/card'
export function SocialProof() {
  return (
    <article className='py-24 bg-background text-cloud-dancer'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='mb-8 pb-8'>Skippere elsker Utekos</h2>

          <Card className='border-foreground bg-heading-secondary/10'>
            <CardContent className='p-12'>
              <blockquote className='text-xl italic text-cloud-dancer mb-6'>
                &quot;Som mangeårig seiler er Utekos det beste båtutstyret jeg har kjøpt på lenge. Den er helt
                genial for kalde kvelder for anker og har i praksis utvidet sesongen vår med to måneder.&quot;
              </blockquote>
              <div className='flex items-center justify-center gap-4'>
                <div className='h-12 w-12 rounded-full bg-heading-secondary' />
                <div className='text-left'>
                  <p className='font-semibold'>Kjell-Arne Larsen</p>
                  <p className='text-sm text-muted-foreground'>Seilentusiast fra Tønsberg</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  )
}
