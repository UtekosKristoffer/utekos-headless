import { GridCross } from '@/components/legal/GridCross'
export const SectionWrapper = ({
  id,
  title,
  children
}: {
  id: string
  title: string
  children: React.ReactNode
}) => (
  <section id={id} className='relative py-12 scroll-mt-24'>
    <GridCross className='left-[-16px] top-[60px] hidden lg:block' />
    <GridCross className='right-[-16px] top-[60px] hidden lg:block' />
    <div className='absolute inset-x-0 top-[75px] h-px border-t border-dashed border-white/10 hidden lg:block' />
    <h2 className='text-2xl font-semibold sm:text-3xl'>{title}</h2>
    <div className='prose prose-invert mt-6 max-w-none text-foreground/80'>
      {children}
    </div>
  </section>
)
