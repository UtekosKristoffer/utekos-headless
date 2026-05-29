import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
interface ActiveSubmitButtonProps {
  isPending: boolean
  isDisabled: boolean
}

export function ActiveSubmitButton({ isPending, isDisabled }: ActiveSubmitButtonProps) {
  return (
    <BrandBadge
      asChild
      backgroundColor='var(--maritime-darkest)'
      textColor='var(--cloud-dancer)'
      className='h-14 w-full min-w-0 gap-2 border border-cloud-dancer/90 px-3 py-4 text-sm font-semibold shadow-[0_20px_42px_-26px_rgba(14,18,35,0.92)] ring-1 ring-cloud-dancer/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-havdyp hover:shadow-[0_26px_52px_-30px_rgba(14,18,35,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusted-peri/70 focus-visible:ring-offset-2 focus-visible:ring-offset-overcast disabled:pointer-events-none disabled:opacity-55 sm:gap-3 sm:px-5 sm:text-base'
    >
      <Button
        type='submit'
        data-track='ModalAddToCart'
        disabled={isPending || isDisabled}
        aria-label='Legg i handlekurv'
        className='cursor-pointer bg-primary-button text-maritime-darkest hover:bg-primary-button/60 disabled:cursor-not-allowed'
      >
        <ShoppingBag className='size-5 place-self-start text-left shrink-0' aria-hidden='true' />
        <span className='truncate'>{isPending ? 'Legger til...' : 'Legg i handlekurv'}</span>
      </Button>
    </BrandBadge>
  )
}
