// Path: src/app/kontaktskjema/Buttons/SupportPageButton.tsx

'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/className'
import { useCtaMotion } from './useCtaMotion'

type Props = Omit<React.ComponentProps<typeof Button>, 'variant' | 'size'> & {
  isBusy?: boolean
}

export function SupportPageButton({
  isBusy,
  className,
  children,
  ...props
}: Props) {
  const ref = useCtaMotion<HTMLButtonElement>()
  return (
    <Button
      ref={ref}
      variant='vercel'
      aria-busy={isBusy || undefined}
      className={cn('w-full select-none', className)}
      {...props}
    >
      <span aria-live='polite'>{children}</span>
    </Button>
  )
}
