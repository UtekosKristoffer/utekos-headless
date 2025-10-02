'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { FlameIcon, LeafIcon, SnowflakeIcon, SunIcon } from 'lucide-react'
export function SeasonsSection() {
  return (
    <section className='bg-sidebar-foreground py-24'>
      <div className='container mx-auto px-4'>
        <div className='mb-16 text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight'>
            Hytteglede i alle sesonger
          </h2>
        </div>

        <Tabs defaultValue='autumn' className='mx-auto max-w-4xl'>
          <TabsList className='grid w-full grid-cols-4 bg-background'>
            <TabsTrigger value='spring'>Vår</TabsTrigger>
            <TabsTrigger value='summer'>Sommer</TabsTrigger>
            <TabsTrigger value='autumn'>Høst</TabsTrigger>
            <TabsTrigger value='winter'>Vinter</TabsTrigger>
          </TabsList>

          <TabsContent value='spring' className='mt-8'>
            <Card className='border-neutral-800 bg-background'>
              <CardContent className='p-8'>
                <div className='mb-4 flex items-center gap-3'>
                  <SunIcon className='size-6 text-yellow-400' />
                  <h3 className='text-xl font-semibold'>
                    Påskesol og Vårfornemmelser
                  </h3>
                </div>
                <p className='text-muted-foreground'>
                  Nyt de første varme solstrålene på terrassen uten å la den
                  kjølige luften stoppe deg. Perfekt for påskefjellet eller den
                  første helgen på sjøhytten.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='summer' className='mt-8'>
            <Card className='border-neutral-800 bg-background'>
              <CardContent className='p-8'>
                <div className='mb-4 flex items-center gap-3'>
                  <FlameIcon className='size-6 text-orange-500' />
                  <h3 className='text-xl font-semibold'>
                    Forleng sommerkveldene
                  </h3>
                </div>
                <p className='text-muted-foreground'>
                  Ikke la gåsehud avslutte den gode samtalen. Utekos er
                  hemmeligheten bak de uforglemmelige sommerkveldene som varer
                  til langt på natt.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='autumn' className='mt-8'>
            <Card className='border-neutral-800 bg-background'>
              <CardContent className='p-8'>
                <div className='mb-4 flex items-center gap-3'>
                  <LeafIcon className='size-6 text-green-500' />
                  <h3 className='text-xl font-semibold'>
                    Høstkos i høyoppløsning
                  </h3>
                </div>
                <p className='text-muted-foreground'>
                  Opplev høstens farger og den skarpe, klare luften i total
                  komfort. Perfekt for en kopp te på trappa eller rundt
                  bålpannen.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='winter' className='mt-8'>
            <Card className='border-neutral-800 bg-background'>
              <CardContent className='p-8'>
                <div className='mb-4 flex items-center gap-3'>
                  <SnowflakeIcon className='size-6 text-blue-400' />
                  <h3 className='text-xl font-semibold'>
                    Vintermagi og peiskos
                  </h3>
                </div>
                <p className='text-muted-foreground'>
                  Den ultimate følelsen etter en lang skitur. Eller når du
                  ankommer en kald hytte og trenger øyeblikkelig varme mens
                  peisen knitrer i gang.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
