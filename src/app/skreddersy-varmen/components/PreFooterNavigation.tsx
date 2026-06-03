// Path: src/components/frontpage/PreFooterNavigation.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/className'
import { NavLinks } from './NavLinks'

export function PreFooterNavigation() {
  return (
    <section className='w-full max-w-full border-t border-cloud-dancer/5 bg-mountain-view py-16 text-foreground md:py-24'>
      <div className='max-w-5xl mx-auto px-6'>
        <div className='text-center mb-12'>
          <h2 className='text-5xl md:text-6xl font-google-sans font-semibold leading-heading-level-two text-almost-mauve! mb-4'>
            Utforsk mer av Utekos
          </h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {NavLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'group flex items-center justify-between p-6',
                'bg-chocolate-plum border border-cloud-dancer/80 rounded-sm',
                'hover:bg-plum-truffle hover:border-bright-white transition-all duration-300',
                index === 0 && 'md:col-span-2 lg:col-span-3',
                link.mdOnly && 'hidden md:flex'
              )}
            >
              <div className='flex items-center gap-4'>
                <div
                  className={cn(
                    'p-3 rounded-full bg-antier text-almost-mauve group-hover:bg-almost-mauve group-hover:text-foreground transition-colors duration-300'
                  )}
                >
                  {link.icon}
                </div>

                <div className='flex flex-col'>
                  <span className='text-xs font-google-sans text-foreground/80 uppercase tracking-widest font-medium mb-0.5 group-hover:text-foreground transition-colors'>
                    {link.description}
                  </span>
                  <span className='text-lg font-google-sans font-medium text-foreground group-hover:translate-x-1 transition-transform'>
                    {link.label}
                  </span>
                </div>
              </div>
              <ArrowRight className='size-5 text-foreground group-hover:text-dusted-peri group-hover:translate-x-2 transition-all duration-300' />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
