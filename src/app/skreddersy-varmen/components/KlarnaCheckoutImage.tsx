import { cn } from '@/lib/utils/className'

export function KlarnaCheckoutImage({ className }: { className?: string }) {
  return (
    <picture className={cn('block min-w-0 justify-self-end', className)}>
      <source media='(min-width: 1536px)' srcSet='/klarna/pay-with-klarna/white-secondary/970x90-Left.png' />
      <source
        media='(min-width: 900px)'
        srcSet='/klarna/choose-klarna-at-checkout/black-secondary/970x90-Left.png'
      />
      <source media='(min-width: 640px)' srcSet='/klarna/pay-with-klarna/white-secondary/728x90-Center.png' />
      <img
        src='/klarna/choose-klarna-at-checkout/white-secondary/320x50.png'
        alt='Velg Klarna i kassen'
        width={320}
        height={50}
        className='ml-auto block h-auto w-full max-w-[20rem] sm:max-w-[28rem] min-[1536px]:max-w-[30rem]'
      />
    </picture>
  )
}
