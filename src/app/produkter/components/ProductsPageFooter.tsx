// Path: src/app/produkter/page.tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export function ProductsPageFooter() {
  return (
    <section>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 md:mt-2'>
        <Card className='border-neutral-800 bg-sidebar-foreground'>
          <CardContent className='p-8'>
            <h3 className='text-xl font-semibold'>Usikker på størrelsen?</h3>
            <p className='mt-2 text-muted-foreground'>
              Se vår størrelsesguide og finn den perfekte passformen for deg.
            </p>
            <Button asChild className='mt-4'>
              <Link href='/handlehjelp/storrelsesguide'>
                Til størrelsesguiden
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className='border-neutral-800 bg-sidebar-foreground'>
          <CardContent className='p-8'>
            <h3 className='text-xl font-semibold'>
              Nysgjerrig på teknologien?
            </h3>
            <p className='mt-2 text-muted-foreground'>
              Les om materialene og designfilosofien som holder deg varm.
            </p>
            <Button asChild className='mt-4'>
              <Link href='/handlehjelp/teknologi-materialer'>
                Utforsk materialene
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
