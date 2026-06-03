import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { Button } from '@/components/ui/button'
import { CreditCard } from 'lucide-react'

interface QuickCheckoutButtonProps {
  isPending: boolean
  isDisabled: boolean
  onClick: () => void
}

export function QuickCheckoutButton({ isPending, isDisabled, onClick }: QuickCheckoutButtonProps) {
  return (
    <BrandBadge
      asChild
      backgroundColor='var(--background)'
      textColor='var(--cloud-dancer)'
      className='h-14 w-full min-w-0 gap-2 border border-background/25 px-3 py-4 text-sm font-semibold text-foreground shadow-[0_20px_42px_-28px_rgba(14,18,35,0.62)] ring-1 ring-background/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cloud-dancer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusted-peri/70 focus-visible:ring-offset-2 focus-visible:ring-offset-overcast disabled:pointer-events-none disabled:opacity-55 sm:gap-3 sm:px-5 sm:text-base'
    >
      <Button
        type='button'
        data-track='ModalGoToCheckout'
        disabled={isPending || isDisabled}
        aria-label='Gå til kassen'
        onClick={onClick}
        className='cursor-pointer bg-background text-foreground hover:bg-background/40 disabled:cursor-not-allowed'
      >
        <CreditCard className='size-5 shrink-0 text-foreground' aria-hidden='true' />
        <span className='truncate'>{isPending ? 'Åpner...' : 'Gå til kassen'}</span>
      </Button>
    </BrandBadge>
  )
}
