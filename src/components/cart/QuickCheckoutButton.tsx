import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/className'
import { CreditCard } from 'lucide-react'

interface QuickCheckoutButtonProps {
  isPending: boolean
  isDisabled: boolean
  onClick: () => void
}

export function QuickCheckoutButton({ isPending, isDisabled, onClick }: QuickCheckoutButtonProps) {
  return (
    <Button
      type='button'
      variant='ghost'
      data-track='ModalGoToCheckout'
      disabled={isPending || isDisabled}
      aria-label='Gå til kassen'
      onClick={onClick}
      className={cn(
        'h-14 w-full min-w-0 gap-2 rounded-full border border-background/25 bg-iced-apricot px-3 py-4 text-sm font-semibold text-background shadow-[0_20px_42px_-28px_rgba(14,18,35,0.62)] ring-1 ring-background/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-iced-apricot hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-peri/70 focus-visible:ring-offset-2 focus-visible:ring-offset-overcast disabled:pointer-events-none disabled:opacity-55 sm:gap-3 sm:px-5 sm:text-base'
      )}
    >
      <CreditCard className='size-5 shrink-0 text-background' aria-hidden='true' />
      <span className='truncate'>{isPending ? 'Åpner...' : 'Gå til kassen'}</span>
    </Button>
  )
}
