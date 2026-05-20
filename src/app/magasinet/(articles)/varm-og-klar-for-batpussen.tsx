// Path: src/app/magasinet/(articles)/varm-og-klar-for-batpussen.tsx
import { Card, CardContent } from '@/components/ui/card'
import { Activity } from 'react'

export const BatpussArticle = () => {
  return (
    <article className='prose prose-invert prose-lg max-w-4xl mx-auto'>
      <Activity>
        <Card className='bg-ancient-water border-cloud-dancer/80 my-8'>
          <CardContent className='p-8 text-maritime-darkest font-semibold text-center'>
            <h2 className='mt-0'>Innhold kommer snart...</h2>
            <p className='text-maritime-darkest/80'>
              Denne artikkelen om komfort under vårpussen av båten er under
              utarbeidelse. Kom snart tilbake for tips og triks!
            </p>
          </CardContent>
        </Card>
      </Activity>
    </article>
  )
}
