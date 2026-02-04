import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

export function SoldOutButton() {
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
