// Path: src/app/frakt-og-retur/components/InfoSidebar.tsx
import { Button } from '@/components/ui/button'
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
      <Card className='sticky top-28 bg-sidebar-foreground border-neutral-700'>
        <CardHeader>
          <CardTitle>Dine trygghetsgarantier</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-4'>
            <li className='flex items-start gap-3'>
              <ShieldCheck className='mt-0.5 size-5 shrink-0 text-green-500' />
              <div>
                <h4 className='font-medium'>14 dagers angrerett</h4>
                <p className='text-sm text-muted-foreground'>
                  Lovfestet trygghet fra du mottar varen.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <Package className='mt-0.5 size-5 shrink-0 text-foreground/80' />
              <div>
                <h4 className='font-medium'>Fri frakt over 999 kr</h4>
                <p className='text-sm text-muted-foreground'>
                  Vi spanderer frakten på større bestillinger.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <BadgeCheck className='mt-0.5 size-5 shrink-0 text-rose-500' />
              <div>
                <h4 className='font-medium'>Enkel returprosess</h4>
                <p className='text-sm text-muted-foreground'>
                  Bare send oss en e-post, så er du i gang.
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
        <Separator className='my-2' />
        <CardFooter className='flex-col items-start'>
          <h4 className='font-medium'>Har du spørsmål?</h4>
          <p className='mt-1 mb-3 text-sm text-muted-foreground'>
            Vårt kundeserviceteam er klare til å hjelpe deg.
          </p>
          <Button asChild className='w-full'>
            <Link href='/kontaktskjema'>
              <Mail className='mr-2 size-4' /> Kontakt oss
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </aside>
  )
}
