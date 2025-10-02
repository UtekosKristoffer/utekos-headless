import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs' // Antatt plassering for Tabs
import { ProductCareUtekosDun } from '../sections/ProductCareUtekosDun'
import { ProductCareUtekosMikrofiber } from '../sections/ProductCareUtekosMikrofiber'
import { ProductCareComfyrobe } from '../sections/ProductCareComfyrobe'

export function ProductCareBody() {
  return (
    <div className='mx-auto mt-12 max-w-4xl'>
      <Tabs defaultValue='dun' className='w-full'>
        <TabsList className='grid w-full grid-cols-3 bg-sidebar-foreground'>
          <TabsTrigger value='dun'>Utekos Dun</TabsTrigger>
          <TabsTrigger value='mikrofiber'>Utekos Mikrofiber</TabsTrigger>
          <TabsTrigger value='comfyrobe'>Comfyrobe™</TabsTrigger>
        </TabsList>
        <ProductCareUtekosDun />
        <ProductCareUtekosMikrofiber />
        <ProductCareComfyrobe />
      </Tabs>
    </div>
  )
}
