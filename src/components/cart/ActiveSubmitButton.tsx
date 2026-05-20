import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ShoppingBag } from 'lucide-react'

interface ActiveSubmitButtonProps {
  isPending: boolean
  isDisabled: boolean
}

export function ActiveSubmitButton({
  isPending,
  isDisabled
}: ActiveSubmitButtonProps) {
  return (
    <BrandBadge
      asChild
      backgroundColor='var(--maritime-darkest)'
      textColor='var(--cloud-dancer)'
      className='h-14 w-full gap-3 border border-cloud-dancer/14 px-8 py-4 text-base font-semibold shadow-[0_20px_42px_-26px_rgba(14,18,35,0.92)] ring-1 ring-cloud-dancer/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-maritime-blue hover:shadow-[0_26px_52px_-30px_rgba(14,18,35,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusted-peri/70 focus-visible:ring-offset-2 focus-visible:ring-offset-overcast disabled:pointer-events-none disabled:opacity-55 md:w-[70%]'
    >
      <button
        type='submit'
        data-track='ModalAddToCart'
        disabled={isPending || isDisabled}
        aria-label='Legg i handlekurv'
        className='cursor-pointer disabled:cursor-not-allowed'
      >
        <ShoppingBag className='size-5 shrink-0' aria-hidden='true' />
        <span>{isPending ? 'Legger til...' : 'Legg i handlekurv'}</span>
      </button>
    </BrandBadge>
  )
}
