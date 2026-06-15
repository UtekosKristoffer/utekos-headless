import { InspirationSeasonsSection } from '../../components/InspirationSeasonsSection'
import { terraceSeasons } from '../utils/terraceSeasons'

export function SeasonsSection() {
  return (
    <InspirationSeasonsSection
      title='Terrassen i alle årstider'
      lead='Små grep som forlenger utesesongen — uansett vær.'
      seasons={terraceSeasons}
      defaultValue='summer'
      glowTokens={['var(--peach-fuzz)', 'var(--brandied-apricot)']}
      sectionClassName='bg-marsala'
      leadClassName='text-cloud-dancer'
      tabTriggerClassName='border-brandied-apricot bg-peach-fuzz text-background hover:bg-peach-fuzz data-active:bg-brandied-apricot data-active:text-background'
      tabActiveClassName='text-background'
      tabInactiveClassName='text-background'
      contentCardClassName='border-brandied-apricot bg-peach-fuzz'
      contentIconClassName='border-background/16 bg-cloud-dancer text-background'
      contentIconGlyphClassName='text-background'
      contentTitleClassName='text-background'
      contentTextClassName='text-background'
    />
  )
}
