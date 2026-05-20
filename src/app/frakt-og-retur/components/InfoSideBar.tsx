// Path: src/app/frakt-og-retur/components/InfoSidebar.tsx
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BadgeCheck, Mail, Package, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export function InfoSidebar() {
  return (
    <aside className='lg:col-span-4'>
      <Card className='sticky top-28 border-cloud-dancer/12 bg-maritime-blue/24 text-cloud-dancer shadow-[0_24px_70px_-52px_rgba(8,12,28,0.88)]'>
        <CardHeader>
          <CardTitle className='text-xl leading-[1.15] tracking-normal'>
            Dine trygghetsgarantier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-4'>
            <li className='flex items-start gap-3'>
              <ShieldCheck className='mt-0.5 size-5 shrink-0 text-primary-button' />
              <div>
                <h4 className='font-medium leading-[1.35] tracking-normal'>
                  14 dagers angrerett
                </h4>
                <p className='text-sm leading-[1.45] tracking-normal text-cloud-dancer/80'>
                  Lovfestet trygghet fra du mottar varen.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <Package className='mt-0.5 size-5 shrink-0 text-ancient-water' />
              <div>
                <h4 className='font-medium leading-[1.35] tracking-normal'>
                  Fri frakt over 999 kr
                </h4>
                <p className='text-sm leading-[1.45] tracking-normal text-cloud-dancer/80'>
                  Vi spanderer frakten på større bestillinger.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <BadgeCheck className='mt-0.5 size-5 shrink-0 text-[var(--soft-warm)]' />
              <div>
                <h4 className='font-medium leading-[1.35] tracking-normal'>
                  Retur
                </h4>
                <p className='text-sm leading-[1.45] tracking-normal text-cloud-dancer/80'>
                  Send en e-post til kundeservice@utekos.no, så er du i gang.
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
        <Separator className='my-2 bg-cloud-dancer/12' />
        <CardFooter className='flex-col items-start'>
          <h4 className='font-medium leading-[1.35] tracking-normal'>
            Har du spørsmål?
          </h4>
          <p className='mt-1 mb-4 text-sm leading-[1.45] tracking-normal text-cloud-dancer/80'>
            Vårt kundeserviceteam er klare til å hjelpe deg.
          </p>
          <BrandBadge
            asChild
            backgroundColor='var(--primary-button)'
            textColor='var(--maritime-darkest)'
            className='min-h-12 w-full border border-primary-button/24 px-6 py-3 text-base leading-[1.4] font-bold tracking-normal shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105'
          >
            <Link
              href='/kontaktskjema'
              data-track='ShippingReturnsContactClick'
            >
              <Mail className='mr-2 size-4' />
              Kontakt oss
            </Link>
          </BrandBadge>
        </CardFooter>
      </Card>
    </aside>
  )
}
