// Path: src/app/frakt-og-retur/components/ShippingReturnsInfo.tsx
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { shippingReturnsFaqItems } from '@/app/frakt-og-retur/data/shippingReturnsContent'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Mail, PackageCheck, ShieldCheck, Truck, Undo2 } from 'lucide-react'

export function ShippingReturnsInfo() {
  return (
    <section className='lg:col-span-8'>
      <div className='grid gap-8 md:grid-cols-2'>
        <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
          <Card className='h-full border-cloud-dancer/12 bg-ancient-water text-background shadow-[0_22px_62px_-50px_rgba(8,12,28,0.78)]'>
            <CardHeader>
              <CardTitle className='flex items-center gap-3 text-xl leading-[1.2]  '>
                <Truck className='size-7 text-background' />
                Frakt og levering
              </CardTitle>
              <CardDescription className='leading-[1.45] text-md mt-2 px-2 font-medium     text-background'>
                Vi sender alle bestillinger som gjøres før kl 16. samme dag, så du kan starte din utekos så
                raskt som mulig.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className='space-y-4 text-background'>
                <li className='flex items-start gap-3'>
                  <Clock className='mt-1 size-5 shrink-0 text-lg     text-background' />
                  <span className='leading-[1.45]  '>Leveringstid er normalt 2-5 virkedager.</span>
                </li>
                <li className='flex items-start gap-3'>
                  <Mail className='mt-1 size-5 shrink-0 text-lg     text-background' />
                  <span className='leading-[1.45]  '>
                    Sporing sendes på e-post så snart pakken er på vei.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </AnimatedBlock>

        <AnimatedBlock className='will-animate-fade-in-up' delay='0.4s'>
          <Card className='h-full border-cloud-dancer/2 bg-ancient-water'>
            <CardHeader>
              <CardTitle className='flex text-background items-center gap-3 text-xl leading-[1.2]  '>
                <Undo2 className='size-7 text-background' />
                Retur og angrerett
              </CardTitle>
              <CardDescription className='leading-[1.45] text-md mt-2 px-2 font-medium     text-background'>
                Du har 14 dagers angrerett fra dagen du mottar varen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className='space-y-4 text-background'>
                <li className='flex items-start gap-3'>
                  <ShieldCheck className='mt-1 size-5 shrink-0 text-background' />
                  <span className='leading-[1.45]  '>
                    Full trygghet for å kjenne på kvaliteten hjemme hos deg selv.
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <PackageCheck className='mt-1 size-5 shrink-0 text-background' />
                  <span className='leading-[1.45]  '>
                    Varen må være ubrukt, uten lukt og med alle merkelapper intakt for full refusjon.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </AnimatedBlock>
      </div>

      <AnimatedBlock className='will-animate-fade-in-up mt-12' delay='0.6s'>
        <h2 className='mb-4 text-2xl font-semibold font-google-sans leading-[1.15]   text-background'>
          Slik fungerer returprosessen
        </h2>
        <Accordion
          type='single'
          collapsible
          className='w-full [&_[data-slot=accordion-content]]:!animate-none'
        >
          {shippingReturnsFaqItems.map(item => (
            <AccordionItem key={item.id} value={item.id} className='border-background/90'>
              <AccordionTrigger
                data-track={`ShippingReturns-${item.id}-Click`}
                className='text-[1.1rem] leading-[1.45]     text-background transition-colors hover:text-background/80 hover:no-underline [&>svg]:text-background/90'
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='text-[1rem] leading-[1.45]     text-background'>
                {item.id === 'return-process' ?
                  <p>
                    Send en e-post til{' '}
                    <a
                      href='mailto:kundeservice@utekos.no'
                      data-track='ShippingReturnsEmailClick'
                      className='font-medium text-background/90 underline decoration-background/90 underline-offset-4 hover:text-background/80'
                    >
                      kundeservice@utekos.no
                    </a>{' '}
                    med fullt navn, adresse, ordrenummer og hvilke produkter returen gjelder. Pakk varen
                    forsvarlig og bruk en sendingsmetode med sporing.
                  </p>
                : <p>{item.answer}</p>}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AnimatedBlock>
    </section>
  )
}
