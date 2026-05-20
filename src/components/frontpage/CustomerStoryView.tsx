import { Moon, Sun } from 'lucide-react'
import { StoryNodeView } from './StoryNodeView'

export function CustomerStoryView() {
  return (
    <div className='relative mx-auto flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-5 md:w-[80%]'>
      <StoryNodeView
        icon={Moon}
        tone='before'
        label='Før Utekos®:'
        description='Kulden satte en stopper for kosen.'
      />

      <StoryNodeView
        icon={Sun}
        tone='after'
        label='Etter Utekos®:'
        description='Nå varer de beste øyeblikkene lenger.'
      />
    </div>
  )
}
