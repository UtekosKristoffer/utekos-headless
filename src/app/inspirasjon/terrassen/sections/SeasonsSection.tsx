import { GlassWater, Leaf, Snowflake, Sun } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function SeasonsSection() {
  return (
    <section className='bg-sidebar-foreground py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-4xl text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight'>
            Din uteplass gjennom året
          </h2>
        </div>

        <Tabs defaultValue='summer' className='mx-auto max-w-4xl'>
          <TabsList className='grid w-full grid-cols-4 bg-background'>
            <TabsTrigger className='btn-tab' value='spring'>
              Vår
            </TabsTrigger>
            <TabsTrigger className='btn-tab' value='summer'>
              Sommer
            </TabsTrigger>
            <TabsTrigger className='btn-tab' value='autumn'>
              Høst
            </TabsTrigger>
            <TabsTrigger className='btn-tab' value='winter'>
              Vinter
            </TabsTrigger>
          </TabsList>

          <TabsContent value='spring' className='mt-8'>
            <Card className='border-neutral-800 bg-background'>
              <CardContent className='p-8'>
                <div className='mb-4 flex items-center gap-3'>
                  <Sun className='size-6 text-yellow-400' />
                  <h3 className='text-xl font-semibold'>
                    Den første kaffen ute
                  </h3>
                </div>
                <p className='text-muted-foreground'>
                  Det er noe magisk med den første dagen det er varmt nok til å
                  sitte ute. Med Utekos kan den dagen komme uker tidligere.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='summer' className='mt-8'>
            <Card className='border-neutral-800 bg-background'>
              <CardContent className='p-8'>
                <div className='mb-4 flex items-center gap-3'>
                  <GlassWater className='size-6 text-cyan-400' />
                  <h3 className='text-xl font-semibold'>
                    Når duggfallet kommer
                  </h3>
                </div>
                <p className='text-muted-foreground'>
                  Ikke la den kjølige kveldsluften avslutte den gode samtalen.
                  Forleng de lyse sommerkveldene til langt etter at solen har
                  gått ned.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='autumn' className='mt-8'>
            <Card className='border-neutral-800 bg-background'>
              <CardContent className='p-8'>
                <div className='mb-4 flex items-center gap-3'>
                  <Leaf className='size-6 text-orange-500' />
                  <h3 className='text-xl font-semibold'>
                    Høstkvelder med klar luft
                  </h3>
                </div>
                <p className='text-muted-foreground'>
                  Pakk deg inn i komfort og nyt den skarpe, klare høstluften med
                  en kopp te og en god bok.
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
                    En kort pause i frisk luft
                  </h3>
                </div>
                <p className='text-muted-foreground'>
                  Noen ganger trenger man bare fem minutter ute, selv om det er
                  kaldt. Perfekt for en rask pause med gløgg eller kaffe på
                  vinteren.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
