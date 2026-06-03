import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductCareUtekosDun } from './ProductCareUtekosDun'
import { ProductCareUtekosMikrofiber } from './ProductCareUtekosMikrofiber'
import { ProductCareComfyrobe } from './ProductCareComfyrobe'

export function ProductCareBody() {
  return (
    <section aria-labelledby='materialspesifikk-heading' className='mx-auto mt-20 max-w-4xl scroll-mt-24'>
      <div className='mb-8 text-center'>
        <h2 id='materialspesifikk-heading' className='text-2xl font-bold   text-background sm:text-3xl'>
          Materialspesifikk pleie
        </h2>
        <p className='mx-auto mt-3 max-w-2xl text-base   text-background/78'>
          Hvert materiale har sine egne styrker – og sine egne behov. Velg plagget ditt for detaljerte råd.
        </p>
      </div>

      <Tabs defaultValue='dun' className='w-full'>
        <TabsList className='grid h-auto w-full grid-cols-1 rounded-2xl border border-background/10 bg-cloud-dancer/72 p-1.5 shadow-[0_18px_46px_-40px_color-mix(in_oklab,var(--background)_72%,transparent)] sm:grid-cols-3'>
          <TabsTrigger
            value='dun'
            className='min-h-11 rounded-xl text-background data-[state=active]:bg-havdyp data-[state=active]:text-foreground'
          >
            Utekos Dun
          </TabsTrigger>
          <TabsTrigger
            value='mikrofiber'
            className='min-h-11 rounded-xl text-background data-[state=active]:bg-havdyp data-[state=active]:text-foreground'
          >
            Utekos Mikrofiber
          </TabsTrigger>
          <TabsTrigger
            value='comfyrobe'
            className='min-h-11 rounded-xl text-background data-[state=active]:bg-havdyp data-[state=active]:text-foreground'
          >
            Comfyrobe™
          </TabsTrigger>
        </TabsList>
        <ProductCareUtekosDun />
        <ProductCareUtekosMikrofiber />
        <ProductCareComfyrobe />
      </Tabs>
    </section>
  )
}
