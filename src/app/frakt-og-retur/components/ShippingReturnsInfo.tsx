// Path: src/app/frakt-og-retur/components/ShippingReturnsInfo.tsx
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { shippingReturnsFaqItems } from '@/app/frakt-og-retur/data/shippingReturnsContent'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Clock,
  Mail,
  PackageCheck,
  ShieldCheck,
  Truck,
  Undo2
} from 'lucide-react'

export function ShippingReturnsInfo() {
  return (
    <section className='lg:col-span-8'>
      <div className='grid gap-8 md:grid-cols-2'>
        <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
          <Card className='h-full border-cloud-dancer/12 bg-maritime-blue/24 text-cloud-dancer shadow-[0_22px_62px_-50px_rgba(8,12,28,0.78)]'>
            <CardHeader>
              <CardTitle className='flex items-center gap-3 text-xl leading-[1.2] tracking-tight'>
                <Truck className='size-7 text-primary-button' />
                Frakt og levering
              </CardTitle>
              <CardDescription className='leading-[1.5] tracking-tight text-cloud-dancer'>
                Vi sender alle bestillinger som gjøres før kl 16. samme dag, så
                du kan starte din utekos så raskt som mulig.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className='space-y-4 text-cloud-dancer'>
                <li className='flex items-start gap-3'>
                  <Clock className='mt-1 size-5 shrink-0 text-primary-button' />
                  <span className='leading-[1.45] tracking-tight'>
                    <strong>Leveringstid</strong> er normalt 2-5 virkedager.
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <Mail className='mt-1 size-5 shrink-0 text-bleached-mauve' />
                  <span className='leading-[1.45] tracking-tight'>
                    <strong>Sporing</strong> sendes på e-post så snart pakken er
                    på vei.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </AnimatedBlock>

        <AnimatedBlock className='will-animate-fade-in-up' delay='0.4s'>
          <Card className='h-full border-cloud-dancer/12 bg-maritime-blue/24 text-cloud-dancer shadow-[0_22px_62px_-50px_rgba(8,12,28,0.78)]'>
            <CardHeader>
              <CardTitle className='flex items-center gap-3 text-xl leading-[1.2] tracking-tight'>
                <Undo2 className='size-7 text-ancient-water' />
                Retur og angrerett
              </CardTitle>
              <CardDescription className='leading-[1.5] tracking-tight text-cloud-dancer'>
                Du har 14 dagers angrerett fra dagen du mottar varen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className='space-y-4 text-cloud-dancer'>
                <li className='flex items-start gap-3'>
                  <ShieldCheck className='mt-1 size-5 shrink-0 text-primary-button' />
                  <span className='leading-[1.45] tracking-tight'>
                    <strong>Full trygghet</strong> for å kjenne på kvaliteten
                    hjemme hos deg selv.
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <PackageCheck className='mt-1 size-5 shrink-0 text-ancient-water' />
                  <span className='leading-[1.45] tracking-tight'>
                    Varen må være <strong>ubrukt</strong>, uten lukt og med alle
                    merkelapper intakt for full refusjon.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </AnimatedBlock>
      </div>

      <AnimatedBlock className='will-animate-fade-in-up mt-12' delay='0.6s'>
        <h2 className='mb-4 text-2xl font-semibold font-google-sans leading-[1.15] tracking-tight text-cloud-dancer'>
          Slik fungerer returprosessen
        </h2>
        <Accordion type='single' collapsible className='w-full'>
          {shippingReturnsFaqItems.map(item => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className='border-cloud-dancer/12'
            >
              <AccordionTrigger
                data-track={`ShippingReturns-${item.id}-Click`}
                className='text-base leading-[1.35] tracking-tight font-utekos-text text-cloud-dancer hover:text-primary-button hover:no-underline'
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='text-sm leading-[1.55] tracking-tight font-utekos-text text-cloud-dancer-90'>
                {item.id === 'return-process' ?
                  <p>
                    Send en e-post til{' '}
                    <a
                      href='mailto:kundeservice@utekos.no'
                      data-track='ShippingReturnsEmailClick'
                      className='font-medium text-cloud-dancer underline decoration-cloud-dancer/70 underline-offset-4 hover:text-primary-button'
                    >
                      kundeservice@utekos.no
                    </a>{' '}
                    med fullt navn, adresse, ordrenummer og hvilke produkter
                    returen gjelder. Pakk varen forsvarlig og bruk en
                    sendingsmetode med sporing.
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
