import { Card, CardContent } from '@/components/ui/card'

export const BatpussArticle = () => {
  return (
    <article className='prose prose-invert prose-lg max-w-4xl mx-auto'>
      <Card className='bg-sidebar-foreground border-neutral-800 my-8'>
        <CardContent className='p-8 text-center'>
          <h2 className='mt-0'>Innhold kommer snart...</h2>
          <p className='text-muted-foreground'>
            Denne artikkelen om komfort under vårpussen av båten er under
            utarbeidelse. Kom snart tilbake for tips og triks!
          </p>
        </CardContent>
      </Card>
    </article>
  )
}
