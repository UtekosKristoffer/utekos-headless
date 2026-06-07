import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function SoldOutButton() {
  return (
    <TooltipProvider delay={100}>
      <Tooltip>
        <TooltipTrigger render={<Button size='lg' disabled className='h-12 w-full' />}>
          Utsolgt
        </TooltipTrigger>
        <TooltipContent>
          <p>Denne kombinasjonen er utsolgt.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
