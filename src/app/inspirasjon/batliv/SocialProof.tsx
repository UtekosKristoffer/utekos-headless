import { Card, CardContent } from '@/components/ui/card'
export function SocialProof() {
  return (
    <article className='py-24 bg-havdyp'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='mb-8'>Skippere elsker Utekos</h2>

          <Card className='border-cloud-dancer/12 bg-maritime-darkest'>
            <CardContent className='p-12'>
              <blockquote className='text-xl italic text-cloud-dancer/90 mb-6'>
                &quot;Som mangeårig seiler er Utekos det beste båtutstyret jeg har kjøpt på lenge. Den er helt
                genial for kalde kvelder for anker og har i praksis utvidet sesongen vår med to måneder.&quot;
              </blockquote>
              <div className='flex items-center justify-center gap-4'>
                <div className='h-12 w-12 rounded-full bg-havdyp/24' />
                <div className='text-left'>
                  <p className='font-semibold'>Kjell-Arne Larsen</p>
                  <p className='text-sm text-overcast'>Seilentusiast fra Tønsberg</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  )
}
