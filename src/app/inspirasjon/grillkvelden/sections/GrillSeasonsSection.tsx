import { Flame, Leaf, Snowflake, Sun } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function GrillSeasonsSection() {
  return (
    <section className='bg-sidebar-foreground py-24'>
      <div className='container mx-auto px-4'>
        <div className='mb-16 text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight'>
            Grilling i alle sesonger
          </h2>
        </div>

        <Tabs defaultValue='autumn' className='mx-auto max-w-4xl'>
          <TabsList className='grid w-full grid-cols-4 bg-background'>
            <TabsTrigger value='spring'>Vårgrilling</TabsTrigger>
            <TabsTrigger value='summer'>Sommerfest</TabsTrigger>
            <TabsTrigger value='autumn'>Høstglød</TabsTrigger>
            <TabsTrigger value='winter'>Vintergrill</TabsTrigger>
          </TabsList>

          <TabsContent value='spring' className='mt-8'>
            <Card className='border-neutral-800 bg-background'>
              <CardContent className='p-8'>
                <div className='mb-4 flex items-center gap-3'>
                  <Sun className='size-6 text-yellow-400' />
                  <h3 className='text-xl font-semibold'>Sesongstarten</h3>
                </div>
                <p className='text-muted-foreground'>
                  Vær den første i nabolaget til å dra frem grillen. Med Utekos
                  er ikke en kjølig vårkveld noen hindring for en vellykket
                  premiere.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='summer' className='mt-8'>
            <Card className='border-neutral-800 bg-background'>
              <CardContent className='p-8'>
                <div className='mb-4 flex items-center gap-3'>
                  <Flame className='size-6 text-orange-500' />
                  <h3 className='text-xl font-semibold'>
                    De lange sommerkveldene
                  </h3>
                </div>
                <p className='text-muted-foreground'>
                  Selv på sommeren blir det kaldt når solen går ned. Hold festen
                  i gang og la gjestene bli sittende i komfort til langt på
                  natt.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='autumn' className='mt-8'>
            <Card className='border-neutral-800 bg-background'>
              <CardContent className='p-8'>
                <div className='mb-4 flex items-center gap-3'>
                  <Leaf className='size-6 text-green-500' />
                  <h3 className='text-xl font-semibold'>
                    Høstens farger og smaker
                  </h3>
                </div>
                <p className='text-muted-foreground'>
                  Høsten er perfekt for grilling med rike smaker. Nyt den
                  skarpe, klare luften rundt grillen med venner, uten å tenke på
                  temperaturen.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='winter' className='mt-8'>
            <Card className='border-neutral-800 bg-background'>
              <CardContent className='p-8'>
                <div className='mb-4 flex items-center gap-3'>
                  <Snowflake className='size-6 text-blue-400' />
                  <h3 className='text-xl font-semibold'>
                    For de tøffeste grill entusiastene
                  </h3>
                </div>
                <p className='text-muted-foreground'>
                  Vintergrilling er en unik opplevelse. Utekos er essensielt for
                  å holde grillmesteren (og gjestene) varme mellom slagene.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
