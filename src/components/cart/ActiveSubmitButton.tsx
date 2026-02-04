import { Button } from '@/components/ui/button'
import { useOptimisticCartOpen } from '@/hooks/useCartOptimisticOpen'

interface ActiveSubmitButtonProps {
  isPending: boolean
  isDisabled: boolean
}

export function ActiveSubmitButton({
  isPending,
  isDisabled
}: ActiveSubmitButtonProps) {
  const { openCartImmediately } = useOptimisticCartOpen()

  const handleInteraction = () => {
    if (!isDisabled && !isPending) {
      openCartImmediately()
    }
  }

  return (
    <Button
      type='submit'
      onClick={handleInteraction}
      data-track='ModalAddToCart'
      size='lg'
      disabled={isPending || isDisabled}
      aria-label='Legg i handlekurv'
      className='h-10 w-full bg-button text-access/40 hover:scale-105 hover:bg-button/90 md:w-[70%]'
    >
      {isPending ? 'Legger til...' : 'Legg i handlekurv'}
    </Button>
  )
}
