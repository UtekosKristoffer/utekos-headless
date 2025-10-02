'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SunIcon } from '@heroicons/react/24/outline'
import { Mountain, Sunrise, Wind } from 'lucide-react'
export function SeasonsSection() {
  return (
    <section className='bg-sidebar-foreground py-24'>
      <div className='container mx-auto px-4'>
        <div className='mb-16 text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight'>
            Tips for alle sesonger
          </h2>
        </div>

        <Tabs defaultValue='spring' className='mx-auto max-w-4xl'>
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
                  <Sunrise className='size-6 text-green-500' />
                  <h3 className='text-xl font-semibold'>
                    Vårcamping med Utekos
                  </h3>
                </div>
                <p className='mb-4 text-muted-foreground'>
                  Våren byr på fantastiske muligheter for bobilisten, men
                  temperaturene kan være uforutsigbare.
                </p>
                <ul className='flex flex-col gap-2 text-muted-foreground'>
                  <li className='flex items-start gap-2'>
                    <span className='mt-1 text-primary'>•</span>
                    <span>
                      Start dagen tidlig med Utekos og kaffe for å se naturen
                      våkne
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-1 text-primary'>•</span>
                    <span>
                      Perfekt for påskecamping i fjellet når kveldene fortsatt
                      er kjølige
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-1 text-primary'>•</span>
                    <span>
                      Nyt de første varme solstrålene uten å fryse i skyggen
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='summer' className='mt-8'>
            <Card className='border-neutral-800 bg-background'>
              <CardContent className='p-8'>
                <div className='mb-4 flex items-center gap-3'>
                  <SunIcon className='size-6 text-yellow-500' />
                  <h3 className='text-xl font-semibold'>
                    Sommerkvelder med stil
                  </h3>
                </div>
                <p className='mb-4 text-muted-foreground'>
                  Selv om sommeren er varm, blir kveldene ofte overraskende
                  kjølige, spesielt ved kysten.
                </p>
                <ul className='flex flex-col gap-2 text-muted-foreground'>
                  <li className='flex items-start gap-2'>
                    <span className='mt-1 text-primary'>•</span>
                    <span>
                      Forleng de lyse kveldene utendørs uten å pakke inn i
                      tepper
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-1 text-primary'>•</span>
                    <span>
                      Ideell ved kysten hvor vinden kan gjøre kveldene kjølige
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-1 text-primary'>•</span>
                    <span>Perfekt for sosiale samlinger på campingplassen</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='autumn' className='mt-8'>
            <Card className='border-neutral-800 bg-background'>
              <CardContent className='p-8'>
                <div className='mb-4 flex items-center gap-3'>
                  <Mountain className='size-6 text-orange-500' />
                  <h3 className='text-xl font-semibold'>
                    Høstens fargeprakt i komfort
                  </h3>
                </div>
                <p className='mb-4 text-muted-foreground'>
                  Høsten er mange bobilisters favoritt-sesong, og med Utekos kan
                  du nyte den fullt ut.
                </p>
                <ul className='flex flex-col gap-2 text-muted-foreground'>
                  <li className='flex items-start gap-2'>
                    <span className='mt-1 text-primary'>•</span>
                    <span>
                      Opplev de spektakulære høstfargene fra tidlig morgen til
                      sen kveld
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-1 text-primary'>•</span>
                    <span>
                      Hold varmen under nordlys-jakt på kjølige høstkvelder
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-1 text-primary'>•</span>
                    <span>
                      Nyt bålkosen uten å måtte sitte for nær flammene
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='winter' className='mt-8'>
            <Card className='border-neutral-800 bg-background'>
              <CardContent className='p-8'>
                <div className='mb-4 flex items-center gap-3'>
                  <Wind className='size-6 text-blue-400' />
                  <h3 className='text-xl font-semibold'>
                    Vintercamping for de modige
                  </h3>
                </div>
                <p className='mb-4 text-muted-foreground'>
                  For de som bruker bobilen året rundt, er Utekos den ultimate
                  følgesvennen.
                </p>
                <ul className='flex flex-col gap-2 text-muted-foreground'>
                  <li className='flex items-start gap-2'>
                    <span className='mt-1 text-primary'>•</span>
                    <span>Essensielt tilbehør for skiferier med bobil</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-1 text-primary'>•</span>
                    <span>
                      Hold varmen mens du venter på at bobilen varmes opp
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-1 text-primary'>•</span>
                    <span>
                      Perfekt for julecamping og nyttårsfeiring på fjellet
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
