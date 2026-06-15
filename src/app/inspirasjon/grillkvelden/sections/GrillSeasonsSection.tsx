import { InspirationSeasonsSection } from '../../components/InspirationSeasonsSection'
import { grillSeasons } from '../data/grillSeasons'
import { grillSeasonsCardTheme } from '../theme/grillInspirationTheme'
import { grillSectionSurfaces } from '../theme/sectionSurfaces'

const { light } = grillSectionSurfaces

export function GrillSeasonsSection() {
  return (
    <InspirationSeasonsSection
      title='Grilling i alle sesonger'
      lead='Hold varmen ved grillen — fra tidlig vår til sen høst.'
      seasons={grillSeasons}
      defaultValue='autumn'
      sectionClassName={light.section}
      titleClassName={light.heading}
      leadClassName={light.lead}
      showSectionGlow={false}
      showTabGlow={false}
      showCardGlow={false}
      {...grillSeasonsCardTheme}
    />
  )
}
