// Path: src/components/cart/AddToCartButton/ModalSubmitButton.tsx

'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface ModalSubmitButtonProps {
  availableForSale: boolean
  isPending: boolean
  isDisabled: boolean
}
export function ModalSubmitButton({
  availableForSale,
  isPending,
  isDisabled
}: ModalSubmitButtonProps) {
  if (!availableForSale) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size='lg' disabled className='h-12 w-full'>
              Utsolgt
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Denne kombinasjonen er utsolgt.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Button
      type='submit'
      size='lg'
      disabled={isPending || isDisabled}
      aria-label='Legg i handlekurv'
      className='h-10 w-full md:w-[70%] bg-button text-access/40 hover:bg-button/90 hover:scale-105'
    >
      {isPending ? 'Legger til...' : 'Legg i handlekurv'}
    </Button>
  )
}
