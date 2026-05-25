// Path: src/app/inspirasjon/terrassen/sections/SocialProof.tsx

import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'

export function SocialProof() {
  return (
    <section className='bg-overcast py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='mb-8 text-maritime-darkest'>
            <span className='inline-flex flex-wrap items-baseline justify-center gap-x-[0.22em] gap-y-2'>
              <span>Huseiere elsker</span>
              <UtekosWordmark className='inline-block -mb-2 h-[0.8em] w-auto -translate-y-[0.035em] text-maritime-darkest' />
            </span>
          </h2>

          <Card className='border-cloud-dancer/24 bg-mountain-view shadow-[0_28px_80px_-54px_color-mix(in_oklch,var(--maritime-darkest)_82%,transparent)]'>
            <CardContent className='p-8 sm:p-12'>
              <blockquote className='mb-6 text-xl leading-[1.45] tracking-tight font-utekos-text text-cloud-dancer'>
                &quot;Vi har doblet bruken av terrassen etter at vi fikk Utekos i hus. Den brukes av hele
                familien, fra tenåringen som vil sitte ute med venner, til oss voksne som endelig kan nyte
                kveldene ute uten å pakke oss inn i ti tepper.&quot;
              </blockquote>
              <div className='flex items-center justify-center gap-4'>
                <Image
                  src='/kristin.webp'
                  alt='Kristin'
                  width={48}
                  height={48}
                  sizes='48px'
                  className='size-12 rounded-full object-cover'
                />
                <div className='text-left'>
                  <p className='font-semibold leading-[1.25] tracking-[-0.01em] text-cloud-dancer'>Kristin</p>
                  <p className='text-sm leading-[1.45] tracking-[-0.01em] text-cloud-dancer/88'>
                    Eneboligeier fra Ulvik
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
