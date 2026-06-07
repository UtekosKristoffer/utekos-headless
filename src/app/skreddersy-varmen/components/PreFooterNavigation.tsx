// Path: src/components/frontpage/PreFooterNavigation.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/className'
import { NavLinks } from './NavLinks'

export function PreFooterNavigation() {
  return (
    // Gradient-bakgrunnen blender sømløst over fra trekkspillet over, og ned i footeren under
    <section className='w-full max-w-full bg-linear-to-b from-maritime-darkest to-havdyp py-16 text-cloud-dancer md:py-24'>
      <div className='mx-auto max-w-5xl px-6'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-google-sans text-5xl font-semibold leading-heading-level-two text-cloud-dancer md:text-6xl'>
            Utforsk mer av Utekos
          </h2>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {NavLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'group flex items-center justify-between p-6',
                // Glass-effekt på kortene som slipper bakgrunnen subtilt igjennom
                'rounded-2xl border border-cloud-dancer/10 bg-maritime-darkest/30 backdrop-blur-sm',
                // Hover: Løftes frem med en elegant Very Peri-glød
                'transition-all duration-400 hover:border-very-peri/50 hover:bg-maritime-darkest/60 hover:shadow-lg hover:shadow-very-peri/5',
                index === 0 && 'md:col-span-2 lg:col-span-3',
                link.mdOnly && 'hidden md:flex'
              )}
            >
              <div className='flex items-center gap-4'>
                <div
                  className={cn(
                    // Ikon-sirkel: Starter mørk med Very Peri-ikon. På hover bytter den om!
                    'rounded-full border border-cloud-dancer/5 bg-maritime-darkest/80 p-3 text-very-peri shadow-sm transition-colors duration-400 group-hover:border-very-peri group-hover:bg-very-peri group-hover:text-cloud-dancer'
                  )}
                >
                  {link.icon}
                </div>

                <div className='flex flex-col'>
                  <span className='mb-0.5 font-google-sans text-xs font-medium uppercase tracking-widest text-cloud-dancer/50 transition-colors group-hover:text-cloud-dancer/90'>
                    {link.description}
                  </span>
                  <span className='font-google-sans text-lg font-medium text-cloud-dancer transition-transform duration-300 group-hover:translate-x-1'>
                    {link.label}
                  </span>
                </div>
              </div>

              {/* Pilen: Får den varme "Iced Apricot"-fargen på hover for å trigge et klikk */}
              <ArrowRight className='size-5 text-cloud-dancer/30 transition-all duration-400 group-hover:translate-x-2 group-hover:text-iced-apricot' />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
